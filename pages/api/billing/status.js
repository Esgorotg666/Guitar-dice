import { currentUser, findCustomer, activeTierForCustomer, isLiveKey, secret } from '../../../lib/stripeBilling';
import { parseOwned } from '../../../lib/shopLayouts';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ message: 'GET only' });
  }
  const user = await currentUser(req);
  if (!user) {
    return res.status(200).json({ tier: 'free', hasAccount: false, live: isLiveKey(secret()), layouts: [] });
  }
  try {
    const customer = await findCustomer(user);
    const sub = await activeTierForCustomer(customer && customer.id);
    const layouts = parseOwned(customer && customer.metadata && customer.metadata.gd_layouts);
    const label = sub.tier === 'extreme' ? 'Extreme' : sub.tier === 'premium' ? 'Premium' : 'Free';
    return res.status(200).json({
      hasAccount: true,
      username: user.username,
      tier: sub.tier,
      tierLabel: label,
      customerId: sub.customerId,
      subscriptionId: sub.subscriptionId,
      layouts: layouts,
      live: isLiveKey(secret()),
      unlimitedRolls: sub.tier !== 'free',
      diceCount: sub.tier === 'extreme' ? 7 : sub.tier === 'premium' ? 4 : 2,
      loopPlayer: sub.tier !== 'free',
      exportSheets: sub.tier !== 'free'
    });
  } catch (e) {
    return res.status(200).json({
      hasAccount: true,
      username: user.username,
      tier: 'free',
      layouts: [],
      live: isLiveKey(secret()),
      message: e.message
    });
  }
}
