import { useEffect, useState } from 'react';

function when(v) {
  if (!v) return '—';
  try { return new Date(v).toLocaleString(); } catch (e) { return String(v); }
}

function until(v) {
  if (!v) return '—';
  try { return new Date(v).toLocaleDateString(); } catch (e) { return String(v); }
}

export default function AdminPanel() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState('');

  useEffect(function () {
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
  }, []);

  if (err) return <div className="card"><p className="warn">{err}</p></div>;
  if (!data) return null;
  const c = data.counts || {};

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
                <th style={{ padding: '4px 8px' }}>Source</th>
                <th style={{ padding: '4px 8px' }}>Tier</th>
                <th style={{ padding: '4px 8px' }}>Promo until</th>
                <th style={{ padding: '4px 8px' }}>Created</th>
                <th style={{ padding: '4px 0 4px 8px' }}>Last sign-in</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map(function (u) {
                const src = u.source || 'free';
                return (
                  <tr key={u.id}>
                    <td style={{ padding: '4px 8px 4px 0' }}>{u.username || '—'}</td>
                    <td style={{ padding: '4px 8px' }}>{u.email || '—'}</td>
                    <td style={{ padding: '4px 8px' }}>
                      {src}{u.promoCode ? ' (' + u.promoCode + ')' : ''}{u.promoExpired ? ' expired' : ''}
                    </td>
                    <td style={{ padding: '4px 8px' }}>{u.tier || 'free'}</td>
                    <td style={{ padding: '4px 8px' }}>{u.promoUntil ? until(u.promoUntil) : '—'}</td>
                    <td style={{ padding: '4px 8px' }}>{when(u.created)}</td>
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
