import { currentUser, findCustomer, activeTierForCustomer, isLiveKey, secret } from '../../../lib/stripeBilling';
import { parseOwned } from '../../../lib/shopLayouts';
import { readPromoGrant } from '../../../lib/promoCodes';
import { familyGrantFor } from '../../../lib/familyGrant';
import { bestTier, normalizeTier } from '../../../lib/entitlements';

function pack(tier, extra) {
  const t = normalizeTier(tier);
  return Object.assign({
    tier: t,
    tierLabel: t === 'extreme' ? 'Extreme' : t === 'premium' ? 'Premium' : 'Free',
    unlimitedRolls: t !== 'free',
    diceCount: t === 'extreme' ? 7 : t === 'premium' ? 4 : 2,
    loopPlayer: t !== 'free',
    exportSheets: t !== 'free'
  }, extra || {});
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ message: 'GET only' });
  }
  const user = await currentUser(req);
  if (!user) {
    return res.status(200).json(pack('free', { hasAccount: false, live: isLiveKey(secret()), layouts: [] }));
  }
  try {
    const family = familyGrantFor(user);
    const customer = await findCustomer(user);
    const sub = await activeTierForCustomer(customer && customer.id);
    const promo = readPromoGrant(customer);
    const tier = bestTier(sub.tier, promo && promo.tier, family && family.tier);
    const layouts = parseOwned(customer && customer.metadata && customer.metadata.gd_layouts);
    return res.status(200).json(pack(tier, {
      hasAccount: true,
      username: user.username,
      customerId: sub.customerId,
      subscriptionId: sub.subscriptionId,
      layouts: layouts,
      live: isLiveKey(secret()),
      promoUntil: promo ? promo.until : 0,
      promoCode: promo ? promo.code : '',
      family: !!family,
      source: family ? 'family' : (promo && bestTier(promo.tier, sub.tier) === promo.tier && promo.tier !== sub.tier ? 'promo' : 'subscription')
    }));
  } catch (e) {
    const family = familyGrantFor(user);
    return res.status(200).json(pack(family ? 'extreme' : 'free', {
      hasAccount: true,
      username: user.username,
      layouts: [],
      live: isLiveKey(secret()),
      family: !!family,
      source: family ? 'family' : 'subscription',
      message: e.message
    }));
  }
}
