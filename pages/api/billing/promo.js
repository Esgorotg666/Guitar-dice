import { currentUser, secret, stripe, findCustomer } from '../../../lib/stripeBilling';
import { lookupPromo, readPromoGrant } from '../../../lib/promoCodes';

const LEDGER_EMAIL = 'promo-ledger@guitar-dice.app';

async function ledgerCustomer() {
  const list = await stripe('/customers?email=' + encodeURIComponent(LEDGER_EMAIL) + '&limit=3', 'GET');
  if (list.data && list.data[0]) return list.data[0];
  return stripe('/customers', 'POST', {
    email: LEDGER_EMAIL,
    name: 'Guitar Dice promo ledger',
    'metadata[app]': 'guitar-dice'
  });
}

async function takeSeat(code, max) {
  const ledger = await ledgerCustomer();
  const key = 'uses_' + code;
  const used = Number((ledger.metadata && ledger.metadata[key]) || 0);
  if (used >= max) {
    const err = new Error('That code has already been used up.');
    err.status = 409;
    throw err;
  }
  await stripe('/customers/' + ledger.id, 'POST', { ['metadata[' + key + ']']: String(used + 1) });
  return used + 1;
}

async function ensureCustomer(user) {
  const existing = await findCustomer(user);
  if (existing) return existing;
  return stripe('/customers', 'POST', {
    email: user.email || undefined,
    name: user.username,
    'metadata[gd_username]': user.username,
    'metadata[gd_user_id]': user.id || user.username
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'POST only' });
  }
  const user = await currentUser(req);
  if (!user || !user.username) {
    return res.status(401).json({ needsAccount: true, message: 'Sign in first so the free week stays on your account.' });
  }
  if (!secret()) {
    return res.status(500).json({ message: 'Promo redeem needs Stripe configured on the server.' });
  }
  const found = lookupPromo(req.body && req.body.code);
  if (!found) {
    return res.status(400).json({ message: 'That code is not valid.' });
  }
  try {
    const customer = await ensureCustomer(user);
    const already = readPromoGrant(customer);
    if (already && already.tier === 'extreme') {
      return res.status(200).json({
        ok: true,
        already: true,
        tier: already.tier,
        until: already.until,
        message: 'Extreme is already active on this account until ' + new Date(already.until).toLocaleDateString() + '.'
      });
    }
    await takeSeat(found.code, found.max);
    const until = Date.now() + found.days * 24 * 60 * 60 * 1000;
    await stripe('/customers/' + customer.id, 'POST', {
      'metadata[gd_promo_tier]': found.tier,
      'metadata[gd_promo_until]': String(until),
      'metadata[gd_promo_code]': found.code
    });
    return res.status(200).json({
      ok: true,
      tier: found.tier,
      tierLabel: found.tier === 'extreme' ? 'Extreme' : 'Premium',
      until: until,
      days: found.days,
      message: 'Extreme is unlocked for ' + found.days + ' days. Reload and play.'
    });
  } catch (e) {
    return res.status(e.status || 500).json({ message: e.message || 'Could not redeem that code.' });
  }
}
