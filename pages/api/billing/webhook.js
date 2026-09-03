import crypto from 'crypto';
import { secret, stripe, tierForPrice } from '../../../lib/stripeBilling';
import { alreadyStored, persistEventId, customerIdFrom, seenInMemory } from '../../../lib/webhookIdempotency';

export const config = { api: { bodyParser: false } };

const PAID_SESSION = { complete: 1, paid: 1 };
const LIVE_SUB = { active: 1, trialing: 1 };

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

function payable(event) {
  const obj = event.data && event.data.object;
  if (!obj) return { ok: false, reason: 'no object' };
  if (event.type === 'checkout.session.completed') {
    const status = String(obj.status || '');
    const pay = String(obj.payment_status || '');
    if (PAID_SESSION[status] || PAID_SESSION[pay]) return { ok: true };
    return { ok: false, reason: 'session not paid (' + status + '/' + pay + ')' };
  }
  if (event.type === 'customer.subscription.updated') {
    const st = String(obj.status || '');
    if (LIVE_SUB[st]) return { ok: true };
    return { ok: false, reason: 'subscription not live (' + st + ')' };
  }
  if (event.type === 'customer.subscription.deleted') return { ok: true };
  return { ok: true };
}

async function stamp(event) {
  const obj = event.data && event.data.object;
  if (!obj) return;
  const customerId = customerIdFrom(event);
  if (event.type === 'checkout.session.completed') {
    const username = (obj.metadata && obj.metadata.gd_username) || obj.client_reference_id;
    if (customerId && username) {
      await persistEventId(event.id, customerId, {
        gd_username: username,
        gd_plan: (obj.metadata && obj.metadata.gd_plan) || ''
      });
    }
    return;
  }
  if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.deleted') {
    const price = obj.items && obj.items.data && obj.items.data[0] && obj.items.data[0].price;
    const tier = event.type === 'customer.subscription.deleted' ? 'free' : (tierForPrice(price && price.id) || 'free');
    if (customerId) {
      await persistEventId(event.id, customerId, { gd_tier: tier });
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

  let event;
  try {
    event = await stripe('/events/' + parsed.id, 'GET');
  } catch (e) {
    return res.status(500).json({ message: 'Could not retrieve event from Stripe' });
  }
  if (!event || event.id !== parsed.id) {
    return res.status(500).json({ message: 'Could not retrieve event from Stripe' });
  }

  const customerId = customerIdFrom(event);
  try {
    const seen = await alreadyStored(event.id, customerId);
    if (seen.duplicate) {
      return res.status(200).json({ received: true, duplicate: true, via: seen.via, id: event.id });
    }
    const pay = payable(event);
    if (!pay.ok) {
      return res.status(200).json({ received: true, ignored: true, reason: pay.reason, id: event.id });
    }
    await stamp(event);
    return res.status(200).json({ received: true, duplicate: false, type: event.type, id: event.id });
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Webhook failed' });
  }
}
