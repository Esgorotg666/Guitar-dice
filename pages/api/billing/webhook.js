import crypto from 'crypto';
import { secret, stripe, tierForPrice } from '../../../lib/stripeBilling';
import { claimEvent, customerIdFrom, seenInMemory, markMemory } from '../../../lib/webhookIdempotency';

export const config = { api: { bodyParser: false } };

function rawBody(req) {
  return new Promise(function (resolve, reject) {
    const chunks = [];
    req.on('data', function (c) { chunks.push(c); });
    req.on('end', function () { resolve(Buffer.concat(chunks)); });
    req.on('error', reject);
  });
}

function parseSig(header) {
  const parts = { t: '', v1: [] };
  String(header || '').split(',').forEach(function (p) {
    const i = p.indexOf('=');
    if (i < 1) return;
    const k = p.slice(0, i);
    const v = p.slice(i + 1);
    if (k === 't') parts.t = v;
    if (k === 'v1') parts.v1.push(v);
  });
  return parts;
}

function verify(payload, header, whsec) {
  if (!header || !whsec) return null;
  const parts = parseSig(header);
  const age = Math.abs(Date.now() / 1000 - Number(parts.t));
  if (!parts.t || !parts.v1.length || age > 300) return null;
  const signed = parts.t + '.' + payload.toString('utf8');
  const want = crypto.createHmac('sha256', whsec).update(signed).digest('hex');
  const wantBuf = Buffer.from(want);
  const ok = parts.v1.some(function (got) {
    const b = Buffer.from(got);
    return b.length === wantBuf.length && crypto.timingSafeEqual(wantBuf, b);
  });
  if (!ok) return null;
  try { return JSON.parse(payload.toString('utf8')); } catch (e) { return null; }
}

async function liveEvent(id) {
  if (!id) return null;
  try { return await stripe('/events/' + id, 'GET'); } catch (e) { return null; }
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
        'metadata[gd_plan]': (obj.metadata && obj.metadata.gd_plan) || '',
        'metadata[gd_last_evt]': event.id
      });
    }
    return;
  }
  if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.deleted') {
    const price = obj.items && obj.items.data && obj.items.data[0] && obj.items.data[0].price;
    const tier = event.type === 'customer.subscription.deleted' ? 'free' : (tierForPrice(price && price.id) || 'free');
    if (obj.customer) {
      await stripe('/customers/' + obj.customer, 'POST', {
        'metadata[gd_tier]': tier,
        'metadata[gd_last_evt]': event.id
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
  const parsed = verify(buf, req.headers['stripe-signature'], whsec);
  if (!parsed || !parsed.id) return res.status(400).json({ message: 'Bad signature' });
  if (!secret()) return res.status(500).json({ message: 'No Stripe key' });

  if (seenInMemory(parsed.id)) {
    return res.status(200).json({ received: true, duplicate: true, via: 'memory', id: parsed.id });
  }
  markMemory(parsed.id);

  const event = (await liveEvent(parsed.id)) || parsed;
  const customerId = customerIdFrom(event);

  try {
    const claim = await claimEvent(event.id, customerId);
    if (claim.duplicate) {
      return res.status(200).json({ received: true, duplicate: true, via: claim.via, id: event.id });
    }
    await stamp(event);
    return res.status(200).json({ received: true, duplicate: false, type: event.type, id: event.id });
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Webhook failed' });
  }
}
