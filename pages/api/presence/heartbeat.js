import { bumpPresence, readPresence } from '../../../lib/presence';
import { checkRate, rateLimited } from '../../../lib/rateLimit';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const data = await readPresence();
    return res.status(200).json(data);
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, GET');
    return res.status(405).json({ message: 'POST or GET' });
  }
  const limit = checkRate(req, 'presence', 20, 60 * 1000);
  if (!limit.ok) return rateLimited(res, limit.retryAfter);
  const body = req.body || {};
  const result = await bumpPresence({
    sid: String(body.sid || ''),
    signedIn: !!body.signedIn,
    username: String(body.username || '').slice(0, 40)
  });
  return res.status(200).json(result);
}
