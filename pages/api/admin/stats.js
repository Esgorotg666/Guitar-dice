import { currentUser, secret, isLiveKey, stripe, tierForPrice } from '../../../lib/stripeBilling';
import { isAdminUser } from '../../../lib/adminGate';
import { familyEmails, familyGrantFor } from '../../../lib/familyGrant';
import { readPromoGrant } from '../../../lib/promoCodes';
import { bestTier } from '../../../lib/entitlements';

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

async function listStripeCustomers() {
  const key = secret();
  if (!key) return { list: [], hasMore: false, live: false };
  const list = [];
  let starting = '';
  let hasMore = false;
  for (let i = 0; i < 5; i++) {
    const path = '/customers?limit=100' + (starting ? '&starting_after=' + starting : '');
    const body = await stripe(path, 'GET');
    const batch = body.data || [];
    batch.forEach(function (c) { list.push(c); });
    if (!body.has_more || !batch.length) { hasMore = !!body.has_more; break; }
    starting = batch[batch.length - 1].id;
    hasMore = true;
  }
  return { list: list, hasMore: hasMore, live: isLiveKey(key) };
}

function indexCustomers(list) {
  const byEmail = {};
  const byUser = {};
  list.forEach(function (c) {
    const email = String(c.email || '').trim().toLowerCase();
    const username = String((c.metadata && c.metadata.gd_username) || '').trim().toLowerCase();
    if (email) byEmail[email] = c;
    if (username) byUser[username] = c;
  });
  return { byEmail: byEmail, byUser: byUser };
}

function paidTierFromCustomer(customer) {
  const meta = (customer && customer.metadata) || {};
  if (meta.gd_tier === 'extreme' || meta.gd_tier === 'premium') return meta.gd_tier;
  return 'free';
}

function classify(row, customer) {
  const family = familyGrantFor({ email: row.email, username: row.username });
  const promo = readPromoGrant(customer);
  const paid = paidTierFromCustomer(customer);
  const tier = bestTier(paid, promo && promo.tier, family && family.tier);
  let source = 'free';
  if (family) source = 'family';
  else if (paid === 'extreme' || paid === 'premium') source = 'paid';
  else if (promo) source = 'promo';
  const expiredUntil = Number((customer && customer.metadata && customer.metadata.gd_promo_until) || 0);
  return {
    source: source,
    tier: tier,
    promoCode: promo ? promo.code : ((customer && customer.metadata && customer.metadata.gd_promo_code) || ''),
    promoUntil: promo ? promo.until : 0,
    promoExpired: !promo && expiredUntil > 0 && expiredUntil <= Date.now()
  };
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

  let stripePack = { list: [], hasMore: false, live: isLiveKey(secret()) };
  try {
    stripePack = await listStripeCustomers();
  } catch (e) {}
  const idx = indexCustomers(stripePack.list);

  const users = rows.map(function (row) {
    const email = String(row.email || '').trim().toLowerCase();
    const username = String(row.username || '').trim().toLowerCase();
    const customer = idx.byEmail[email] || idx.byUser[username] || null;
    const extra = classify(row, customer);
    return Object.assign({}, row, extra);
  });

  const counts = { free: 0, promo: 0, paid: 0, family: 0 };
  users.forEach(function (u) { counts[u.source] = (counts[u.source] || 0) + 1; });

  return res.status(200).json({
    ok: true,
    accounts: accounts,
    listed: users.length,
    users: users,
    counts: counts,
    family: familyEmails(),
    stripeCustomers: stripePack.list.length,
    stripeHasMore: !!stripePack.hasMore,
    stripeLive: !!stripePack.live,
    authError: authError || '',
    admin: user.username || user.email
  });
}
