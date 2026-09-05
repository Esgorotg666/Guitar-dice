const HARD = [
  'frostyboy138@gmail.com'
];

function norm(email) {
  return String(email || '').trim().toLowerCase();
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
  const email = norm(user && (user.email || user.username));
  if (!email) return null;
  if (familyEmails().indexOf(email) < 0) return null;
  return {
    tier: 'extreme',
    source: 'family',
    until: 0,
    email: email
  };
}
