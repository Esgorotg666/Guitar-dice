import { bumpTraffic } from '../../../lib/siteTraffic';
import { checkRate, rateLimited } from '../../../lib/rateLimit';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'POST only' });
  }
  const limit = checkRate(req, 'traffic', 30, 60 * 1000);
  if (!limit.ok) return rateLimited(res, limit.retryAfter);
  const unique = !!(req.body && req.body.unique);
  const result = await bumpTraffic(unique);
  return res.status(200).json(result);
}
