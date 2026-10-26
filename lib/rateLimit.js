// Simple in-memory rate limiter for public API routes.
// Works within a single serverless instance. Not a hard global limit,
// but stops casual spam and accidental loops.

const buckets = new Map();

function keyOf(req, name) {
  const xf = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  const ip = xf || req.headers['x-real-ip'] || req.socket?.remoteAddress || 'unknown';
  return name + ':' + ip;
}

export function checkRate(req, name, max, windowMs) {
  const now = Date.now();
  const key = keyOf(req, name);
  let b = buckets.get(key);
  if (!b || now - b.start > windowMs) {
    b = { start: now, count: 0 };
    buckets.set(key, b);
  }
  b.count += 1;
  if (b.count > max) {
    return { ok: false, retryAfter: Math.ceil((windowMs - (now - b.start)) / 1000) };
  }
  return { ok: true };
}

export function rateLimited(res, retryAfter) {
  res.setHeader('Retry-After', String(retryAfter || 60));
  return res.status(429).json({ message: 'Too many requests. Try again shortly.' });
}
