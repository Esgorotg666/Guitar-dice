import { applyVisit, emptyStreak } from '../../../lib/streakStore';

function readCookie(req, name) {
  const raw = String(req.headers.cookie || '');
  const parts = raw.split(';');
  for (var i = 0; i < parts.length; i++) {
    const p = parts[i].trim();
    if (p.indexOf(name + '=') === 0) return decodeURIComponent(p.slice(name.length + 1));
  }
  return '';
}

function cookie(name, value) {
  return name + '=' + encodeURIComponent(String(value)) + '; Path=/; Max-Age=31536000; SameSite=Lax';
}

export default function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    res.setHeader('Allow', 'POST, GET');
    return res.status(405).json({ message: 'POST or GET' });
  }
  const prev = {
    currentStreak: Number(readCookie(req, 'gd_streak')) || 0,
    lastDay: readCookie(req, 'gd_streak_day') || '',
    longest: Number(readCookie(req, 'gd_streak_best')) || 0
  };
  const next = applyVisit(prev || emptyStreak());
  res.setHeader('Set-Cookie', [
    cookie('gd_streak', next.currentStreak),
    cookie('gd_streak_day', next.lastDay),
    cookie('gd_streak_best', next.longest)
  ]);
  return res.status(200).json(next);
}
