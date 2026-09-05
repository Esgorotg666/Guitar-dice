export const DEFAULT_CODES = [];

function parseEnvCodes() {
  const raw = process.env.PROMO_CODES || '';
  if (!raw.trim()) return [];
  return raw.split(',').map(function (chunk) {
    const p = chunk.trim().split(':');
    if (!p[0]) return null;
    return {
      code: String(p[0]).toUpperCase().replace(/[^A-Z0-9]/g, ''),
      tier: (p[1] || 'extreme').toLowerCase() === 'premium' ? 'premium' : 'extreme',
      days: Math.max(1, Number(p[2]) || 7),
      max: Math.max(1, Number(p[3]) || 1),
      label: 'Custom'
    };
  }).filter(Boolean);
}

export function allPromoCodes() {
  const env = parseEnvCodes();
  const seen = {};
  const out = [];
  env.forEach(function (c) {
    if (seen[c.code]) return;
    seen[c.code] = true;
    out.push(c);
  });
  return out;
}

export function lookupPromo(raw) {
  const code = String(raw || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (!code) return null;
  return allPromoCodes().filter(function (c) { return c.code === code; })[0] || null;
}

export function readPromoGrant(customer) {
  const meta = (customer && customer.metadata) || {};
  const tier = meta.gd_promo_tier === 'premium' || meta.gd_promo_tier === 'extreme' ? meta.gd_promo_tier : null;
  const until = Number(meta.gd_promo_until || 0);
  if (!tier || !until || until <= Date.now()) return null;
  return {
    tier: tier,
    until: until,
    code: meta.gd_promo_code || '',
    source: 'promo'
  };
}
