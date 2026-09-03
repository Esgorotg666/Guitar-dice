import crypto from 'crypto';
import { secret, stripe, tierForPrice } from '../../../lib/stripeBilling';

export const config = { api: { bodyParser: false } };

function rawBody(req) {
  return new Promise(function (resolve, reject) {
    const chunks = [];
    req.on('data', function (c) { chunks.push(c); });
    req.on('end', function () { resolve(Buffer.concat(chunks)); });
    req.on('error', reject);
  });
}

function verify(payload, header, whsec) {
  if (!header || !whsec) return null;
  const parts = {};
  String(header).split(',').forEach(function (p) {
    const i = p.indexOf('=');
    if (i > 0) parts[p.slice(0, i)] = p.slice(i + 1);
  });
  const signed = 't=' + parts.t + '.' + payload;
  const age = Math.abs(Date.now() / 1000 - Number(parts.t));
  if (!parts.t || age > 300) return null;
  const want = crypto.createHmac('sha256', whsec).update(signed).digest('hex');
  const got = parts.v1 || '';
  const a = Buffer.from(want);
  const b = Buffer.from(got);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try { return JSON.parse(payload.toString('utf8')); } catch (e) { return null; }
}

async function stamp(event) {
  const obj = event.data && event.data.object;
  if (!obj) return;
  if (event.type === 'checkout.session.completed') {
    const username = (obj.metadata && obj.metadata.gd_username) || obj.client_reference_id;
    const customer = obj.customer;
    if (customer && username) {
      await stripe('/customers/' + customer, 'POST', {
        'metadata[gd_username]': username,
        'metadata[gd_plan]': (obj.metadata && obj.metadata.gd_plan) || ''
      });
    }
    return;
  }
  if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.deleted') {
    const price = obj.items && obj.items.data && obj.items.data[0] && obj.items.data[0].price;
    const tier = event.type === 'customer.subscription.deleted' ? 'free' : (tierForPrice(price && price.id) || 'free');
    if (obj.customer) {
      await stripe('/customers/' + obj.customer, 'POST', {
        'metadata[gd_tier]': tier
      });
    }
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end();
  }
  const buf = await rawBody(req);
  const whsec = process.env.STRIPE_WEBHOOK_SECRET || '';
  const event = verify(buf, req.headers['stripe-signature'], whsec);
  if (!event) return res.status(400).json({ message: 'Bad signature' });
  if (!secret()) return res.status(500).json({ message: 'No Stripe key' });
  try {
    await stamp(event);
    return res.status(200).json({ received: true, type: event.type });
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Webhook failed' });
  }
}
