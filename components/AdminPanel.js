import { useEffect, useState } from 'react';

function when(v) {
  if (!v) return '—';
  try { return new Date(v).toLocaleString(); } catch (e) { return String(v); }
}

function usedLabel(u) {
  if (u.lastSignIn) return 'Yes — ' + when(u.lastSignIn);
  if (u.created) return 'Account only — never signed in after create';
  return 'No activity yet';
}

export default function AdminPanel() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState('');
  const [live, setLive] = useState(null);

  function load() {
    fetch('/api/admin/stats', { credentials: 'include' })
      .then(function (r) {
        return r.json().catch(function () { return {}; }).then(function (b) {
          return { ok: r.ok, status: r.status, body: b };
        });
      })
      .then(function (r) {
        if (r.status === 403) return;
        if (!r.ok) { setErr(r.body.message || 'Could not load admin stats'); return; }
        setData(r.body);
      })
      .catch(function () { setErr('Could not load admin stats'); });
    fetch('/api/presence/heartbeat', { credentials: 'include' })
      .then(function (r) { return r.json(); })
      .then(function (b) { setLive(b); })
      .catch(function () {});
  }

  useEffect(function () {
    load();
    var t = setInterval(load, 30000);
    return function () { clearInterval(t); };
  }, []);

  if (err) return <div className="card"><p className="warn">{err}</p></div>;
  if (!data) return null;
  const c = data.counts || {};
  const t = data.traffic || {};
  const L = data.lessons || {};
  const todayRow = (t.days || []).filter(function (d) { return d.day === t.today; })[0];
  const forest = (data.users || []).filter(function (u) {
    const e = String(u.email || '').toLowerCase();
    const n = String(u.username || '').toLowerCase();
    return e.indexOf('frostyboy138') >= 0 || n.indexOf('frostyboy138') >= 0 || n === 'forest';
  })[0];

  return (
    <div className="card">
      <h3>Admin — accounts</h3>
      <p className="muted sm">Signed in as admin: {data.admin}</p>
      <p style={{ fontSize: '1.4rem', margin: '8px 0' }}>
        <b>{data.accounts == null ? '—' : data.accounts}</b> accounts
      </p>
      <p className="muted sm">
        Free {c.free || 0} · Promo {c.promo || 0} · Paid {c.paid || 0} · Family {c.family || 0}
      </p>

      <h4 style={{ margin: '16px 0 6px' }}>Live right now</h4>
      {live && live.reason === 'no-table' ? (
        <p className="warn">Create table <b>presence</b> in Supabase (SQL below) so live users show.</p>
      ) : live ? (
        <p>
          <b>{live.active || 0}</b> active in the last 2 min
          {' · '}{live.signedIn || 0} signed in
          {' · '}{live.guests || 0} guests
        </p>
      ) : (
        <p className="muted sm">Checking live users…</p>
      )}
      {live && live.recent && live.recent.length ? (
        <ul className="muted sm">
          {live.recent.slice(0, 8).map(function (r, i) {
            return <li key={i}>{r.signed_in ? (r.username || 'signed in') : 'guest'} — {when(r.seen_at)}</li>;
          })}
        </ul>
      ) : null}
      {live && live.reason === 'no-table' ? (
        <pre className="muted sm" style={{ whiteSpace: 'pre-wrap' }}>{
`create table if not exists presence (
  sid text primary key,
  signed_in boolean default false,
  username text,
  seen_at timestamptz default now()
);`}</pre>
      ) : null}

      <h4 style={{ margin: '16px 0 6px' }}>Forest</h4>
      {forest ? (
        <p>
          <b>{forest.email || forest.username}</b>
          {' — '}tier <b>{forest.tier}</b>
          {' · '}{forest.source}
          {' · '}{usedLabel(forest)}
          {' · '}lessons {forest.passed || 0} passed / {forest.attempts || 0} tries
          {forest.lastLesson ? ' · last: ' + forest.lastLesson : ''}
        </p>
      ) : (
        <p className="muted sm">frostyboy138@gmail.com is not in Auth yet, or the service key cannot list users.</p>
      )}
      <h4 style={{ margin: '16px 0 6px' }}>Visits</h4>
      {t.reason === 'no-table' ? (
        <p className="warn">Create table <b>site_stats</b> in Supabase so visits can be stored.</p>
      ) : (
        <p className="muted sm">
          Today: <b>{todayRow ? todayRow.views : 0}</b> views / <b>{todayRow ? todayRow.uniques : 0}</b> people
          {' · '}Last 30 days: <b>{t.totalViews || 0}</b> views / <b>{t.totalUniques || 0}</b> people
        </p>
      )}
      {L.reason === 'no-table' ? (
        <div>
          <p className="warn">Create table <b>lesson_events</b> in Supabase (SQL editor), then hard-refresh.</p>
          {L.sql ? <pre className="muted sm" style={{ whiteSpace: 'pre-wrap' }}>{L.sql}</pre> : null}
        </div>
      ) : null}
      {L.recent && L.recent.length ? (
        <div>
          <h4 style={{ margin: '16px 0 6px' }}>Recent skill tests</h4>
          <ul className="muted sm">
            {L.recent.slice(0, 8).map(function (e, i) {
              return (
                <li key={i}>
                  {(e.email || e.username || 'user') + ' — ' + (e.title || e.lesson_id) + ' — ' + e.score + '%' + (e.passed ? ' pass' : ' miss')}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
      <p className="muted sm">
        Stripe customers: {data.stripeCustomers}
        {data.stripeHasMore ? '+' : ''}{data.stripeLive ? ' · live' : ''}
      </p>
      {data.authError ? <p className="warn">{data.authError}</p> : null}
      {data.users && data.users.length ? (
        <div style={{ marginTop: 12, overflowX: 'auto' }}>
          <table className="muted sm" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: '4px 8px 4px 0' }}>User</th>
                <th style={{ padding: '4px 8px' }}>Email</th>
                <th style={{ padding: '4px 8px' }}>Tier</th>
                <th style={{ padding: '4px 8px' }}>Passed</th>
                <th style={{ padding: '4px 8px' }}>Tries</th>
                <th style={{ padding: '4px 8px' }}>Last lesson</th>
                <th style={{ padding: '4px 0 4px 8px' }}>Last sign-in</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map(function (u) {
                const highlight = String(u.email || '').toLowerCase().indexOf('frostyboy138') >= 0;
                return (
                  <tr key={u.id} style={highlight ? { background: 'rgba(201,162,39,0.12)' } : undefined}>
                    <td style={{ padding: '4px 8px 4px 0' }}>{u.username || '—'}</td>
                    <td style={{ padding: '4px 8px' }}>{u.email || '—'}</td>
                    <td style={{ padding: '4px 8px' }}>{u.tier || 'free'}</td>
                    <td style={{ padding: '4px 8px' }}>{u.passed || 0}</td>
                    <td style={{ padding: '4px 8px' }}>{u.attempts || 0}</td>
                    <td style={{ padding: '4px 8px' }}>{u.lastLesson || '—'}</td>
                    <td style={{ padding: '4px 0 4px 8px' }}>{when(u.lastSignIn)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
