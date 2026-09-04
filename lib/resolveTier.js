import { bestTier, normalizeTier } from './entitlements';

export function readTierFromBody(body) {
  if (!body) return 'free';
  return normalizeTier(body.tier || body.tierLabel || body.plan || 'free');
}

export function fetchAppTier(fallback) {
  const start = normalizeTier(fallback || 'free');
  return Promise.all([
    fetch('/api/usage/status', { credentials: 'include' }).then(function (r) { return r.json().catch(function () { return {}; }); }).catch(function () { return {}; }),
    fetch('/api/billing/status', { credentials: 'include' }).then(function (r) { return r.json().catch(function () { return {}; }); }).catch(function () { return {}; })
  ]).then(function (pair) {
    return {
      tier: bestTier(start, readTierFromBody(pair[0]), readTierFromBody(pair[1])),
      layouts: (pair[1] && pair[1].layouts) || [],
      usage: pair[0] || {},
      billing: pair[1] || {}
    };
  });
}
