import { bumpPresence, readPresence } from '../../../lib/presence';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const data = await readPresence();
    return res.status(200).json(data);
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, GET');
    return res.status(405).json({ message: 'POST or GET' });
  }
  const body = req.body || {};
  const result = await bumpPresence({
    sid: String(body.sid || ''),
    signedIn: !!body.signedIn,
    username: String(body.username || '')
  });
  return res.status(200).json(result);
}
