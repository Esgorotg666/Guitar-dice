import { readTraffic } from '../../../lib/siteTraffic';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ message: 'GET only' });
  }
  const data = await readTraffic();
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({
    views: data.totalViews || 0,
    uniques: data.totalUniques || 0,
    today: data.today || ''
  });
}
