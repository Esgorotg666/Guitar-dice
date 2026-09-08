import { emptyStreak } from '../../../lib/streakStore';

function readCookie(req, name) {
  const raw = String(req.headers.cookie || '');
  const parts = raw.split(';');
  for (var i = 0; i < parts.length; i++) {
    const p = parts[i].trim();
    if (p.indexOf(name + '=') === 0) return decodeURIComponent(p.slice(name.length + 1));
  }
  return '';
}

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ message: 'GET only' });
  }
  const count = Number(readCookie(req, 'gd_streak')) || 0;
  const lastDay = readCookie(req, 'gd_streak_day') || '';
  const longest = Number(readCookie(req, 'gd_streak_best')) || count;
  const body = count ? { currentStreak: count, lastDay: lastDay, longest: longest } : emptyStreak();
  return res.status(200).json(body);
}
