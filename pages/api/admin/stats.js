import { currentUser, secret, isLiveKey } from '../../../lib/stripeBilling';
import { isAdminUser } from '../../../lib/adminGate';
import { familyEmails } from '../../../lib/familyGrant';

const SUPA = 'https://fjwkfqmyfufulwjecjlf.supabase.co';

async function listAuthUsers(serviceKey) {
  const users = [];
  let page = 1;
  for (;;) {
    const url = SUPA + '/auth/v1/admin/users?page=' + page + '&per_page=200';
    const res = await fetch(url, {
      headers: {
        apikey: serviceKey,
        Authorization: 'Bearer ' + serviceKey
      }
    });
    const body = await res.json().catch(function () { return {}; });
    if (!res.ok) {
      const err = new Error((body && body.message) || 'Supabase auth list failed (' + res.status + ')');
      err.status = res.status;
      err.body = body;
      throw err;
    }
    const batch = body.users || body || [];
    if (!Array.isArray(batch) || !batch.length) break;
    batch.forEach(function (u) { users.push(u); });
    if (batch.length < 200) break;
    page += 1;
    if (page > 20) break;
  }
  return users;
}

async function stripeCustomerCount() {
  const key = secret();
  if (!key) return { count: 0, skipped: true };
  const res = await fetch('https://api.stripe.com/v1/customers?limit=100',
    { headers: { Authorization: 'Bearer ' + key } });
  const body = await res.json().catch(function () { return {}; });
  if (!res.ok) return { count: 0, error: (body.error && body.error.message) || 'stripe failed' };
  return { count: (body.data || []).length, hasMore: !!body.has_more, live: isLiveKey(key) };
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ message: 'GET only' });
  }
  const user = await currentUser(req);
  if (!user || !isAdminUser(user)) {
    return res.status(403).json({ message: 'Admin only' });
  }
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || '';
  let accounts = null;
  let rows = [];
  let authError = '';
  if (serviceKey) {
    try {
      const raw = await listAuthUsers(serviceKey);
      accounts = raw.length;
      rows = raw.map(function (u) {
        const meta = u.user_metadata || {};
        return {
          id: u.id,
          email: u.email || meta.email || '',
          username: meta.username || meta.user_name || (u.email ? u.email.split('@')[0] : ''),
          lastSignIn: u.last_sign_in_at || u.last_sign_in || null,
          created: u.created_at || null,
          confirmed: !!u.email_confirmed_at
        };
      });
    } catch (e) {
      authError = e.message || 'Could not list Auth users';
    }
  } else {
    authError = 'Add SUPABASE_SERVICE_ROLE_KEY on Vercel Production, then redeploy.';
  }
  const stripe = await stripeCustomerCount();
  return res.status(200).json({
    ok: true,
    accounts: accounts,
    listed: rows.length,
    users: rows,
    family: familyEmails(),
    stripeCustomers: stripe.count,
    stripeHasMore: !!stripe.hasMore,
    stripeLive: !!stripe.live,
    authError: authError || '',
    admin: user.username || user.email
  });
}
