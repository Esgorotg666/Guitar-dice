const SUPA = 'https://fjwkfqmyfufulwjecjlf.supabase.co';

function key() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || '';
}

function todayUtc() {
  return new Date().toISOString().slice(0, 10);
}

export async function bumpTraffic(isUnique) {
  const service = key();
  if (!service) return { ok: false, reason: 'no-key' };
  const day = todayUtc();
  const headers = {
    apikey: service,
    Authorization: 'Bearer ' + service,
    'Content-Type': 'application/json',
    Prefer: 'return=representation'
  };
  const get = await fetch(SUPA + '/rest/v1/site_stats?day=eq.' + day + '&select=day,views,uniques',
    { headers: headers });
  if (get.status === 404 || get.status === 400) {
    return { ok: false, reason: 'no-table' };
  }
  const rows = await get.json().catch(function () { return []; });
  const cur = Array.isArray(rows) && rows[0] ? rows[0] : null;
  const views = (cur ? Number(cur.views) : 0) + 1;
  const uniques = (cur ? Number(cur.uniques) : 0) + (isUnique ? 1 : 0);
  const body = { day: day, views: views, uniques: uniques, updated_at: new Date().toISOString() };
  const res = await fetch(SUPA + '/rest/v1/site_stats',
    {
      method: 'POST',
      headers: Object.assign({}, headers, { Prefer: 'resolution=merge-duplicates,return=minimal' }),
      body: JSON.stringify(body)
    });
  if (!res.ok) {
    const err = await res.text().catch(function () { return ''; });
    return { ok: false, reason: err || String(res.status) };
  }
  return { ok: true, day: day, views: views, uniques: uniques };
}

export async function readTraffic() {
  const service = key();
  if (!service) return { ok: false, reason: 'no-key', days: [], totalViews: 0, totalUniques: 0 };
  const headers = {
    apikey: service,
    Authorization: 'Bearer ' + service
  };
  const res = await fetch(SUPA + '/rest/v1/site_stats?select=day,views,uniques&order=day.desc&limit=30',
    { headers: headers });
  if (!res.ok) {
    return { ok: false, reason: res.status === 404 || res.status === 400 ? 'no-table' : String(res.status), days: [], totalViews: 0, totalUniques: 0 };
  }
  const days = await res.json().catch(function () { return []; });
  const list = Array.isArray(days) ? days : [];
  let totalViews = 0;
  let totalUniques = 0;
  list.forEach(function (d) {
    totalViews += Number(d.views) || 0;
    totalUniques += Number(d.uniques) || 0;
  });
  return { ok: true, days: list, totalViews: totalViews, totalUniques: totalUniques, today: todayUtc() };
}
