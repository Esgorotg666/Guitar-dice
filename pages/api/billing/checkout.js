import { currentUser, PRICE_TO_TIER, secret, isLiveKey, stripe, findCustomer, siteUrl } from '../../../lib/stripeBilling';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'POST only' });
  }
  const user = await currentUser(req);
  if (!user || !user.username) {
    return res.status(401).json({ needsAccount: true, message: 'Create an account first so this purchase follows you.' });
  }
  if (!secret()) {
    return res.status(500).json({ message: 'Stripe is not configured on the server yet.' });
  }
  const plan = String((req.body && req.body.plan) || '').toLowerCase();
  const price = PRICE_TO_TIER[plan];
  if (!price) {
    return res.status(400).json({
      message: plan === 'premium' || plan === 'extreme'
        ? 'Set STRIPE_PRICE_' + plan.toUpperCase() + ' on Vercel to the Live price id.'
        : 'Unknown plan.'
    });
  }
  try {
    let customerId = null;
    const existing = await findCustomer(user);
    if (existing) customerId = existing.id;
    else {
      const created = await stripe('/customers', 'POST', {
        email: user.email || undefined,
        name: user.username,
        'metadata[gd_username]': user.username,
        'metadata[gd_user_id]': user.id || user.username
      });
      customerId = created.id;
    }
    const session = await stripe('/checkout/sessions', 'POST', {
      mode: 'subscription',
      customer: customerId,
      client_reference_id: user.username,
      success_url: siteUrl() + '/?billing=success',
      cancel_url: siteUrl() + '/?billing=cancel',
      'line_items[0][price]': price,
      'line_items[0][quantity]': '1',
      'metadata[gd_username]': user.username,
      'metadata[gd_plan]': plan,
      'subscription_data[metadata][gd_username]': user.username,
      'subscription_data[metadata][gd_plan]': plan
    });
    return res.status(200).json({
      url: session.url,
      live: isLiveKey(secret()),
      username: user.username
    });
  } catch (e) {
    return res.status(e.status || 500).json({ message: e.message || 'Could not start checkout.' });
  }
}
