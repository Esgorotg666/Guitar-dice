import { currentUser, findCustomer, stripe, siteUrl } from '../../../lib/stripeBilling';

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ message: 'GET or POST' });
  }
  const user = await currentUser(req);
  if (!user) {
    res.writeHead(302, { Location: '/?tab=account' });
    return res.end();
  }
  try {
    const customer = await findCustomer(user);
    if (!customer) {
      return res.status(400).json({ message: 'No Stripe customer is attached to this account yet.' });
    }
    const portal = await stripe('/billing_portal/sessions', 'POST', {
      customer: customer.id,
      return_url: siteUrl() + '/?tab=plans'
    });
    res.writeHead(302, { Location: portal.url });
    return res.end();
  } catch (e) {
    return res.status(e.status || 500).json({ message: e.message || 'Could not open the billing portal.' });
  }
}
