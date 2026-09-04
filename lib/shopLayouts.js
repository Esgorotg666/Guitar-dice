export const LAYOUT_SKUS = [
  { id: 'blank', label: 'Blank board', cents: 199, blurb: 'No inlays. Read the neck by notes only.' },
  { id: 'birds', label: 'Bird markers', cents: 299, blurb: 'Teardrop birds on 3-5-7-9-12.' },
  { id: 'split', label: 'Split blocks', cents: 299, blurb: 'Offset rectangles, two at the octave.' },
  { id: 'shark', label: 'Shark fins', cents: 399, blurb: 'Triangles pointing toward the nut.' },
  { id: 'glow', label: 'Glow dots', cents: 399, blurb: 'Bright side-dot glow on every marker.' },
  { id: 'pack-all', label: 'All layouts', cents: 799, blurb: 'Every paid layout, one payment. Cheaper than buying three.', grants: ['blank', 'birds', 'split', 'shark', 'glow'] }
];

export function skuById(id) {
  return LAYOUT_SKUS.filter(function (s) { return s.id === id; })[0] || null;
}

export function formatUsd(cents) {
  return '$' + (Number(cents) / 100).toFixed(2);
}

export function envPriceId(id) {
  const key = 'STRIPE_PRICE_LAYOUT_' + String(id || '').replace(/-/g, '_').toUpperCase();
  return process.env[key] || '';
}

export function parseOwned(raw) {
  const ids = String(raw || '')
    .split(',')
    .map(function (s) { return s.trim(); })
    .filter(Boolean);
  const out = {};
  ids.forEach(function (id) {
    out[id] = true;
    const sku = skuById(id);
    if (sku && sku.grants) sku.grants.forEach(function (g) { out[g] = true; });
  });
  return Object.keys(out);
}

export function mergeOwned(prevRaw, skuId) {
  const have = parseOwned(prevRaw);
  const next = {};
  have.forEach(function (id) { next[id] = true; });
  next[skuId] = true;
  const sku = skuById(skuId);
  if (sku && sku.grants) sku.grants.forEach(function (g) { next[g] = true; });
  return Object.keys(next).join(',');
}
