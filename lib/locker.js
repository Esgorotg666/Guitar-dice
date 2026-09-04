import { cachedTier, rememberTier } from './tierCache';

const KEY = 'gd-locker-v1';

export const SKINS = [
  { id: 'fair', label: 'Fair', fill: '#f3c7a5' },
  { id: 'tan', label: 'Tan', fill: '#c8895b' },
  { id: 'deep', label: 'Deep', fill: '#6b3d24' }
];

export const HAIR = [
  { id: 'none', label: 'Buzz', need: 0 },
  { id: 'short', label: 'Short', need: 1 },
  { id: 'mop', label: 'Mop', need: 3 },
  { id: 'bun', label: 'Bun', need: 5 }
];

export const HATS = [
  { id: 'none', label: 'No hat', need: 0 },
  { id: 'cap', label: 'Cap', need: 3 },
  { id: 'beanie', label: 'Beanie', need: 8 }
];

export const SHIRTS = [
  { id: 'black', label: 'Black', fill: '#1b1f24', need: 0 },
  { id: 'red', label: 'Stage red', fill: '#9b2c2c', need: 1 },
  { id: 'teal', label: 'Teal', fill: '#1f6f6a', need: 5 },
  { id: 'gold', label: 'Gold night', fill: '#8a6a1f', badge: 'gold-ear' }
];

export const BODIES = [
  { id: 'natural', label: 'Natural', wood: '#7a4a28', edge: '#3a2414', need: 0 },
  { id: 'black', label: 'Matte black', wood: '#1a1d21', edge: '#0b0c0e', need: 1 },
  { id: 'sunburst', label: 'Sunburst', wood: '#8b3a16', edge: '#1a0c06', need: 3 },
  { id: 'seafoam', label: 'Seafoam', wood: '#3d7a6e', edge: '#16332e', need: 5 },
  { id: 'candy', label: 'Candy', wood: '#8e1d2c', edge: '#3a0b12', badge: 'path-rhythm' },
  { id: 'ivory', label: 'Ivory', wood: '#d7c7a2', edge: '#6d5c3c', badge: 'path-lead' }
];

export const GUARDS = [
  { id: 'none', label: 'No guard', fill: null, need: 0 },
  { id: 'tortoise', label: 'Tortoise', fill: '#6b3a22', need: 3 },
  { id: 'mint', label: 'Mint', fill: '#7fb8a8', need: 8 }
];

export const HARDWARE = [
  { id: 'chrome', label: 'Chrome', fill: '#c5d0da', need: 0 },
  { id: 'black', label: 'Black', fill: '#2a3036', need: 5 },
  { id: 'gold', label: 'Gold', fill: '#c9a227', badge: 'gold-ear' }
];

export const INLAYS = [
  { id: 'dots', label: 'Dots', need: 0 },
  { id: 'blocks', label: 'Blocks', need: 8 }
];

export const LAYOUTS = [
  { id: 'dots', label: 'Standard dots', shop: null, price: 'Free', blurb: 'Classic 3-5-7-9-12 markers.' },
  { id: 'blocks', label: 'Block markers', shop: null, need: 8, price: '8 clears', blurb: 'Wide blocks at the same frets.' },
  { id: 'blank', label: 'Blank board', shop: 'premium', price: 'Premium', blurb: 'No inlays. Read the neck by notes only.' },
  { id: 'birds', label: 'Bird markers', shop: 'premium', price: 'Premium', blurb: 'Teardrop birds on 3-5-7-9-12.' },
  { id: 'split', label: 'Split blocks', shop: 'premium', price: 'Premium', blurb: 'Offset rectangles, two per 12.' },
  { id: 'shark', label: 'Shark fins', shop: 'extreme', price: 'Extreme', blurb: 'Triangles pointing toward the nut.' },
  { id: 'glow', label: 'Glow dots', shop: 'extreme', price: 'Extreme', blurb: 'Bright side-dot glow on every marker.' }
];

export const SHOP_PACKS = [
  {
    id: 'pack-board-premium',
    title: 'Fretboard pack',
    price: 'Included with Premium',
    tier: 'premium',
    items: ['blank', 'birds', 'split'],
    blurb: 'Blank, bird, and split-block layouts on every roll and lesson board.'
  },
  {
    id: 'pack-board-extreme',
    title: 'Stage board pack',
    price: 'Included with Extreme',
    tier: 'extreme',
    items: ['shark', 'glow'],
    blurb: 'Shark fins and glow dots. Premium layouts stay unlocked too.'
  }
];

export function defaults() {
  return {
    avatar: { skin: 'tan', hair: 'none', hat: 'none', shirt: 'black' },
    guitar: { body: 'natural', guard: 'none', hardware: 'chrome', inlay: 'dots', layout: 'dots' }
  };
}

export function clearCount(progress) {
  return Object.keys((progress && progress.clears) || {}).length;
}

function optionOpen(opt, progress) {
  if (!opt) return false;
  if (opt.badge) return !!(progress && progress.badges && progress.badges[opt.badge]);
  return clearCount(progress) >= (opt.need || 0);
}

export function hasTier(tier, min) {
  const order = ['free', 'premium', 'extreme'];
  return order.indexOf(tier || 'free') >= order.indexOf(min || 'free');
}

export function isOpen(kind, id, progress, tier) {
  const lists = { skin: SKINS, hair: HAIR, hat: HATS, shirt: SHIRTS, body: BODIES, guard: GUARDS, hardware: HARDWARE, inlay: INLAYS, layout: LAYOUTS };
  const list = lists[kind] || [];
  const opt = list.filter(function (x) { return x.id === id; })[0];
  if (!opt) return false;
  if (kind === 'skin') return true;
  if (kind === 'layout') {
    if (!opt.shop) return optionOpen(opt, progress) || !opt.need;
    return hasTier(cachedTier(tier), opt.shop);
  }
  return optionOpen(opt, progress);
}

export function lockHint(opt, progress, tier) {
  if (!opt) return '';
  if (opt.shop) {
    if (hasTier(cachedTier(tier), opt.shop)) return '';
    return opt.shop === 'extreme' ? 'Buy Extreme to unlock' : 'Buy Premium to unlock';
  }
  if (optionOpen(opt, progress)) return '';
  if (opt.badge === 'gold-ear') return 'Clear any lesson at 95%+';
  if (opt.badge === 'path-rhythm') return 'Finish the rhythm challenge path';
  if (opt.badge === 'path-lead') return 'Finish the lead challenge path';
  const have = clearCount(progress);
  return 'Clear ' + opt.need + ' challenges (' + have + '/' + opt.need + ')';
}

export function nextUnlocks(progress) {
  const pools = HAIR.concat(HATS, SHIRTS, BODIES, GUARDS, HARDWARE, INLAYS);
  const have = clearCount(progress);
  return pools.filter(function (o) { return !optionOpen(o, progress); }).sort(function (a, b) {
    const an = a.need != null ? a.need : 99;
    const bn = b.need != null ? b.need : 99;
    return an - bn;
  }).slice(0, 3).map(function (o) {
    return { id: o.id, label: o.label, hint: lockHint(o, progress), need: o.need, have: have };
  });
}

export function sanitize(raw, progress, tier) {
  const t = cachedTier(tier);
  const base = defaults();
  const a = (raw && raw.avatar) || {};
  const g = (raw && raw.guitar) || {};
  function pick(list, kind, val, fallback) {
    const hit = list.filter(function (x) { return x.id === val; })[0];
    if (hit && isOpen(kind, hit.id, progress, t)) return hit.id;
    return fallback;
  }
  const layout = pick(LAYOUTS, 'layout', g.layout || g.inlay, base.guitar.layout);
  return {
    avatar: {
      skin: pick(SKINS, 'skin', a.skin, base.avatar.skin),
      hair: pick(HAIR, 'hair', a.hair, base.avatar.hair),
      hat: pick(HATS, 'hat', a.hat, base.avatar.hat),
      shirt: pick(SHIRTS, 'shirt', a.shirt, base.avatar.shirt)
    },
    guitar: {
      body: pick(BODIES, 'body', g.body, base.guitar.body),
      guard: pick(GUARDS, 'guard', g.guard, base.guitar.guard),
      hardware: pick(HARDWARE, 'hardware', g.hardware, base.guitar.hardware),
      inlay: pick(INLAYS, 'inlay', g.inlay, base.guitar.inlay),
      layout: layout
    }
  };
}

export function loadLocker(progress, tier) {
  if (typeof window === 'undefined') return sanitize(defaults(), progress, tier);
  try {
    const raw = window.localStorage.getItem(KEY);
    return sanitize(raw ? JSON.parse(raw) : defaults(), progress, tier);
  } catch (e) {
    return sanitize(defaults(), progress, tier);
  }
}

export function saveLocker(next, progress, tier) {
  rememberTier(tier);
  const clean = sanitize(next, progress, tier);
  if (typeof window !== 'undefined') {
    try { window.localStorage.setItem(KEY, JSON.stringify(clean)); } catch (e) {}
  }
  return clean;
}

export function bodyLook(id) {
  return BODIES.filter(function (b) { return b.id === id; })[0] || BODIES[0];
}

export function hardwareLook(id) {
  return HARDWARE.filter(function (b) { return b.id === id; })[0] || HARDWARE[0];
}

export function guardLook(id) {
  return GUARDS.filter(function (b) { return b.id === id; })[0] || GUARDS[0];
}

export function skinLook(id) {
  return SKINS.filter(function (b) { return b.id === id; })[0] || SKINS[1];
}

export function shirtLook(id) {
  return SHIRTS.filter(function (b) { return b.id === id; })[0] || SHIRTS[0];
}

export function layoutLook(id) {
  return LAYOUTS.filter(function (b) { return b.id === id; })[0] || LAYOUTS[0];
}

export function guitarTitle(locker) {
  const b = bodyLook(locker && locker.guitar && locker.guitar.body);
  const lay = layoutLook(locker && locker.guitar && locker.guitar.layout);
  return ((b && b.label) || 'Natural') + ' \u00b7 ' + ((lay && lay.label) || 'dots');
}
