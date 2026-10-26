const SUPA = 'https://fjwkfqmyfufulwjecjlf.supabase.co';

function key() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || '';
}

export async function bumpPresence(row) {
  const service = key();
  if (!service || !row || !row.sid) return { ok: false, reason: 'no-key' };
  const headers = {
    apikey: service,
    Authorization: 'Bearer ' + service,
    'Content-Type': 'application/json',
    Prefer: 'resolution=merge-duplicates,return=minimal'
  };
  const body = {
    sid: String(row.sid).slice(0, 64),
    signed_in: !!row.signedIn,
    username: String(row.username || '').slice(0, 80),
    seen_at: new Date().toISOString()
  };
  const res = await fetch(SUPA + '/rest/v1/presence', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    return { ok: false, reason: res.status === 404 || res.status === 400 ? 'no-table' : String(res.status) };
  }
  return { ok: true };
}

export async function readPresence() {
  const service = key();
  if (!service) return { ok: false, reason: 'no-key', active: 0, signedIn: 0, guests: 0, recent: [] };
  const cutoff = new Date(Date.now() - 2 * 60 * 1000).toISOString();
  const headers = {
    apikey: service,
    Authorization: 'Bearer ' + service
  };
  const res = await fetch(
    SUPA + '/rest/v1/presence?seen_at=gte.' + encodeURIComponent(cutoff) + '&select=sid,signed_in,username,seen_at&order=seen_at.desc&limit=100',
    { headers: headers }
  );
  if (!res.ok) {
    return { ok: false, reason: res.status === 404 || res.status === 400 ? 'no-table' : String(res.status), active: 0, signedIn: 0, guests: 0, recent: [] };
  }
  const rows = await res.json().catch(function () { return []; });
  const list = Array.isArray(rows) ? rows : [];
  var signedIn = 0;
  list.forEach(function (r) { if (r.signed_in) signedIn += 1; });
  return {
    ok: true,
    active: list.length,
    signedIn: signedIn,
    guests: list.length - signedIn,
    recent: list.slice(0, 20)
  };
}
