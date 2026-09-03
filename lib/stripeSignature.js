import crypto from 'crypto';

export const DEFAULT_TOLERANCE = 300;

function parseHeader(header) {
  const out = { t: '', v1: [] };
  String(header || '').split(',').forEach(function (part) {
    const i = part.indexOf('=');
    if (i < 1) return;
    const k = part.slice(0, i).trim();
    const v = part.slice(i + 1).trim();
    if (k === 't') out.t = v;
    if (k === 'v1') out.v1.push(v);
  });
  return out;
}

function hexToBuf(hex) {
  if (!/^[0-9a-fA-F]+$/.test(hex) || hex.length % 2 !== 0) return null;
  return Buffer.from(hex, 'hex');
}

function hmacHex(secret, t, rawBody) {
  const h = crypto.createHmac('sha256', secret);
  h.update(String(t) + '.');
  h.update(rawBody);
  return h.digest('hex');
}

function matches(expectedHex, gotHex) {
  const a = hexToBuf(expectedHex);
  const b = hexToBuf(gotHex);
  if (!a || !b || a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

/**
 * Stripe constructEvent equivalent without the SDK.
 * rawBody must be the exact bytes Stripe posted.
 * Returns { ok, event, error }.
 */
export function verifyStripeSignature(rawBody, header, secret, nowSec, tolerance) {
  const window = tolerance == null ? DEFAULT_TOLERANCE : Number(tolerance);
  if (!secret) return { ok: false, error: 'missing_secret' };
  if (!header) return { ok: false, error: 'missing_header' };
  if (!rawBody || !Buffer.isBuffer(rawBody)) return { ok: false, error: 'missing_body' };

  const parts = parseHeader(header);
  const ts = Number(parts.t);
  if (!parts.t || !Number.isFinite(ts) || ts <= 0) return { ok: false, error: 'bad_timestamp' };
  if (!parts.v1.length) return { ok: false, error: 'missing_v1' };

  const now = nowSec == null ? Date.now() / 1000 : nowSec;
  if (Math.abs(now - ts) > window) return { ok: false, error: 'timestamp_expired' };

  const expected = hmacHex(secret, parts.t, rawBody);
  const valid = parts.v1.some(function (sig) { return matches(expected, sig); });
  if (!valid) return { ok: false, error: 'bad_signature' };

  let event;
  try {
    event = JSON.parse(rawBody.toString('utf8'));
  } catch (e) {
    return { ok: false, error: 'bad_json' };
  }
  if (!event || !event.id || !event.type) return { ok: false, error: 'bad_event' };
  return { ok: true, event: event };
}
