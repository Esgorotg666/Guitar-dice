const TIER_KEY = 'gd-billing-tier-v1';

export function rememberTier(tier) {
  if (typeof window === 'undefined' || !tier) return tier;
  try { window.localStorage.setItem(TIER_KEY, tier); } catch (e) {}
  return tier;
}

export function cachedTier(tier) {
  if (tier) return rememberTier(tier);
  if (typeof window === 'undefined') return 'free';
  try { return window.localStorage.getItem(TIER_KEY) || 'free'; } catch (e) { return 'free'; }
}
