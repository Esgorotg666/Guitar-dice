function norm(v) {
  return String(v || '').trim().toLowerCase();
}

export function adminList() {
  const extra = String(process.env.ADMIN_EMAILS || process.env.ADMIN_USERNAMES || '')
    .split(/[,\s]+/)
    .map(norm)
    .filter(Boolean);
  const hard = [
    'midnightmechanix@icloud.com',
    'esgorotg666'
  ];
  const seen = {};
  const out = [];
  hard.concat(extra).forEach(function (x) {
    if (!x || seen[x]) return;
    seen[x] = true;
    out.push(x);
  });
  return out;
}

export function isAdminUser(user) {
  if (!user) return false;
  const list = adminList();
  const email = norm(user.email);
  const username = norm(user.username);
  return list.indexOf(email) >= 0 || list.indexOf(username) >= 0;
}
