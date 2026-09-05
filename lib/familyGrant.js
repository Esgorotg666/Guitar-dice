const HARD = [
  'frostyboy138@gmail.com',
  'frostyboy138'
];

function norm(value) {
  return String(value || '').trim().toLowerCase();
}

export function familyEmails() {
  const extra = String(process.env.FAMILY_EXTREME_EMAILS || '')
    .split(',')
    .map(norm)
    .filter(Boolean);
  const seen = {};
  const out = [];
  HARD.concat(extra).forEach(function (e) {
    if (!e || seen[e]) return;
    seen[e] = true;
    out.push(e);
  });
  return out;
}

export function familyGrantFor(user) {
  if (!user) return null;
  const email = norm(user.email);
  const username = norm(user.username);
  const list = familyEmails();
  const hit = list.indexOf(email) >= 0 || list.indexOf(username) >= 0;
  if (!hit) return null;
  return {
    tier: 'extreme',
    source: 'family',
    until: 0,
    email: email || username
  };
}
