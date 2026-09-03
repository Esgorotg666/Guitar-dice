const SITE = process.env.SITE_URL || 'https://guitar-dice.vercel.app';
const FN = 'https://fjwkfqmyfufulwjecjlf.supabase.co/functions/v1';

export const PRICE_TO_TIER = {
  premium: process.env.STRIPE_PRICE_PREMIUM || '',
  extreme: process.env.STRIPE_PRICE_EXTREME || ''
};

export function secret() {
  return process.env.STRIPE_SECRET_KEY || '';
}

export function isLiveKey(key) {
  return String(key || '').indexOf('sk_live_') === 0;
}

export function tierForPrice(priceId) {
  if (!priceId) return null;
  if (priceId === PRICE_TO_TIER.extreme) return 'extreme';
  if (priceId === PRICE_TO_TIER.premium) return 'premium';
  return null;
}

export function formBody(obj) {
  const p = new URLSearchParams();
  Object.keys(obj).forEach(function (k) {
    if (obj[k] === undefined || obj[k] === null || obj[k] === '') return;
    p.append(k, String(obj[k]));
  });
  return p.toString();
}

export async function stripe(path, method, body) {
  const key = secret();
  if (!key) {
    const err = new Error('STRIPE_SECRET_KEY is not set on Vercel');
    err.status = 500;
    throw err;
  }
  const res = await fetch('https://api.stripe.com/v1' + path, {
    method: method || 'GET',
    headers: {
      Authorization: 'Bearer ' + key,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: body ? formBody(body) : undefined
  });
  const data = await res.json().catch(function () { return {}; });
  if (!res.ok) {
    const err = new Error((data.error && data.error.message) || 'Stripe request failed');
    err.status = res.status;
    err.body = data;
    throw err;
  }
  return data;
}

export async function currentUser(req) {
  const cookie = req.headers.cookie || '';
  const res = await fetch(FN + '/api/auth/user', {
    headers: { cookie: cookie, accept: 'application/json' }
  });
  const body = await res.json().catch(function () { return {}; });
  if (!res.ok || !body || !body.hasAccount) return null;
  return {
    id: body.id || body.userId || body.username,
    username: body.username,
    email: body.email || ''
  };
}

export function siteUrl() {
  return SITE.replace(/\/$/, '');
}

export async function findCustomer(user) {
  if (user.email) {
    const byEmail = await stripe('/customers?email=' + encodeURIComponent(user.email) + '&limit=5', 'GET');
    if (byEmail.data && byEmail.data.length) return byEmail.data[0];
  }
  const q = "metadata['gd_username']:'" + String(user.username).replace(/'/g, '') + "'";
  try {
    const found = await stripe('/customers/search', 'GET');
    // search needs query param
  } catch (e) {}
  try {
    const found = await fetch(
      'https://api.stripe.com/v1/customers/search?query=' + encodeURIComponent(q),
      { headers: { Authorization: 'Bearer ' + secret() } }
    ).then(function (r) { return r.json(); });
    if (found.data && found.data.length) return found.data[0];
  } catch (e) {}
  return null;
}

export async function activeTierForCustomer(customerId) {
  if (!customerId) return { tier: 'free', customerId: null, subscriptionId: null };
  const list = await stripe('/subscriptions?customer=' + encodeURIComponent(customerId) + '&status=active&limit=10', 'GET');
  const subs = (list.data || []).concat();
  const extra = await stripe('/subscriptions?customer=' + encodeURIComponent(customerId) + '&status=trialing&limit=10', 'GET');
  (extra.data || []).forEach(function (s) { subs.push(s); });
  let tier = 'free';
  let subscriptionId = null;
  subs.forEach(function (s) {
    const price = s.items && s.items.data && s.items.data[0] && s.items.data[0].price;
    const t = tierForPrice(price && price.id);
    if (t === 'extreme') { tier = 'extreme'; subscriptionId = s.id; }
    else if (t === 'premium' && tier !== 'extreme') { tier = 'premium'; subscriptionId = s.id; }
  });
  return { tier: tier, customerId: customerId, subscriptionId: subscriptionId };
}
