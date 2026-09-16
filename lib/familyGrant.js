import { isAdminUser } from './adminGate';

const HARD = [
  'frostyboy138@gmail.com',
  'frostyboy138',
  'midnightmechanix@icloud.com',
  'midnightmechanix',
  'esgorotg666',
  'esgorotg666@gmail.com',
  'esgorotg666@icloud.com'
];

const NAMES = {
  'frostyboy138@gmail.com': 'Forest',
  'frostyboy138': 'Forest'
};

function norm(value) {
  return String(value || '').trim().toLowerCase();
}

function localPart(value) {
  const s = norm(value);
  const at = s.indexOf('@');
  return at > 0 ? s.slice(0, at) : s;
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

export function displayNameFor(user) {
  if (!user) return '';
  const email = norm(user.email);
  const username = norm(user.username);
  return NAMES[email] || NAMES[username] || '';
}

function ownerHit(user) {
  if (!user) return false;
  const email = norm(user.email);
  const username = norm(user.username);
  const local = localPart(email) || localPart(username);
  if (local === 'midnightmechanix' || local === 'esgorotg666') return true;
  const list = familyEmails();
  return list.indexOf(email) >= 0 || list.indexOf(username) >= 0 || list.indexOf(local) >= 0;
}

export function familyGrantFor(user) {
  if (!user) return null;
  if (isAdminUser(user) || ownerHit(user)) {
    const email = norm(user.email) || norm(user.username);
    const admin = isAdminUser(user) || localPart(email) === 'midnightmechanix' || localPart(email) === 'esgorotg666';
    return {
      tier: 'extreme',
      source: admin ? 'admin' : 'family',
      until: 0,
      email: email,
      name: displayNameFor(user) || user.username || (admin ? 'Admin' : 'Forest')
    };
  }
  return null;
}
