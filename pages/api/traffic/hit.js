import { bumpTraffic } from '../../../lib/siteTraffic';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'POST only' });
  }
  const unique = !!(req.body && req.body.unique);
  const result = await bumpTraffic(unique);
  return res.status(200).json(result);
}
