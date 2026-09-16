const SUPA = 'https://fjwkfqmyfufulwjecjlf.supabase.co';

function key() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || '';
}

function headers() {
  const service = key();
  return {
    apikey: service,
    Authorization: 'Bearer ' + service,
    'Content-Type': 'application/json',
    Prefer: 'return=minimal'
  };
}

export async function logLessonEvent(row) {
  const service = key();
  if (!service) return { ok: false, reason: 'no-key' };
  const body = {
    user_id: String(row.userId || row.user_id || ''),
    email: String(row.email || '').trim().toLowerCase(),
    username: String(row.username || ''),
    lesson_id: String(row.lessonId || row.lesson_id || ''),
    title: String(row.title || ''),
    style: String(row.style || ''),
    level: String(row.level || ''),
    score: Number(row.score) || 0,
    passed: !!row.passed,
    created_at: new Date().toISOString()
  };
  if (!body.lesson_id) return { ok: false, reason: 'no-lesson' };
  const res = await fetch(SUPA + '/rest/v1/lesson_events', {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const err = await res.text().catch(function () { return ''; });
    const reason = (res.status === 404 || res.status === 400) ? 'no-table' : (err || String(res.status));
    return { ok: false, reason: reason };
  }
  return { ok: true };
}

export async function readLessonEvents(limit) {
  const service = key();
  if (!service) return { ok: false, reason: 'no-key', events: [], byEmail: {} };
  const n = Math.min(500, Math.max(20, Number(limit) || 200));
  const res = await fetch(
    SUPA + '/rest/v1/lesson_events?select=email,username,lesson_id,title,style,level,score,passed,created_at&order=created_at.desc&limit=' + n,
    { headers: { apikey: service, Authorization: 'Bearer ' + service } }
  );
  if (!res.ok) {
    return {
      ok: false,
      reason: res.status === 404 || res.status === 400 ? 'no-table' : String(res.status),
      events: [],
      byEmail: {}
    };
  }
  const list = await res.json().catch(function () { return []; });
  const events = Array.isArray(list) ? list : [];
  const byEmail = {};
  events.forEach(function (e) {
    const email = String(e.email || '').toLowerCase();
    if (!email) return;
    if (!byEmail[email]) byEmail[email] = { attempts: 0, passed: 0, lastAt: e.created_at, lastTitle: e.title || e.lesson_id };
    byEmail[email].attempts += 1;
    if (e.passed) byEmail[email].passed += 1;
  });
  return { ok: true, events: events, byEmail: byEmail };
}

export const LESSON_EVENTS_SQL = [
  'create table if not exists public.lesson_events (',
  '  id uuid primary key default gen_random_uuid(),',
  '  user_id text,',
  '  email text,',
  '  username text,',
  '  lesson_id text not null,',
  '  title text,',
  '  style text,',
  '  level text,',
  '  score int,',
  '  passed boolean,',
  '  created_at timestamptz default now()',
  ');',
  'create index if not exists lesson_events_email_idx on public.lesson_events (email, created_at desc);',
  'alter table public.lesson_events enable row level security;'
].join('\n');
