import { useEffect, useState } from 'react';
import PromoCode from './PromoCode';

export default function UpgradeWall(props) {
  const usage = props.usage || {};
  const [plans, setPlans] = useState(null);
  const [busy, setBusy] = useState('');
  const [err, setErr] = useState('');

  useEffect(function () {
    fetch('/api/plans', { credentials:'include' })
      .then(function (r) { return r.json(); })
      .then(function (d) { setPlans(d.plans || []); })
      .catch(function () { setPlans([]); });
  }, []);

  function startCheckout(plan) {
    if (!usage.hasAccount) {
      setErr('');
      if (props.onNeedAccount) props.onNeedAccount();
      return;
    }
    setBusy(plan); setErr('');
    fetch('/api/billing/checkout', {
      method:'POST', credentials:'include',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify({ plan:plan })
    })
      .then(function (r) { return r.json().then(function (b) { return { ok:r.ok, b:b }; }); })
      .then(function (res) {
        if (res.ok && res.b.url) { window.location.href = res.b.url; return; }
        setBusy('');
        if (res.b.needsAccount) { setErr(''); if (props.onNeedAccount) props.onNeedAccount(); return; }
        setErr(res.b.message || 'Payment did not finish. Try again.');
      })
      .catch(function () { setErr('Could not reach the payment service.'); setBusy(''); });
  }

  const current = usage.tier || 'free';
  const adsLeft = usage.adsRemaining || 0;
  const hasAccount = !!usage.hasAccount;

  return (
    <div className={props.modal ? 'wallOverlay' : ''}>
      <div className={props.modal ? 'wallModal' : ''}>
        {props.modal ? <button className="wallClose" onClick={props.onClose} aria-label="Close">x</button> : null}
        {props.outOfRolls ? (
          <div className="wallHead">
            <h2>Out of rolls today</h2>
            <p className="muted">Watch 15 seconds for 3 rolls, or pick a plan.</p>
            {adsLeft > 0 ? <button className="btn green wide" onClick={props.onWatchAd}>Watch 15 seconds for 3 rolls</button>
              : <p className="muted sm">No ad rewards left today.</p>}
            <div className="wallOr"><span>or</span></div>
          </div>
        ) : (
          <div className="wallHead">
            <h2>Pick a plan</h2>
            <p className="muted">Free has daily rolls and entry lessons. Premium adds folders and the loop. Extreme is everything.</p>
          </div>
        )}
        {!hasAccount ? (
          <div className="acctNote">
            <b>Sign in to keep rolls and progress.</b>
            {props.onNeedAccount ? <button className="linkBtn" onClick={props.onNeedAccount}>Create one now</button> : null}
          </div>
        ) : null}
        {!plans ? <p className="muted">Loading plans…</p> : null}
        <div className="planGrid">
          {(plans || []).map(function (p) {
            const isCurrent = p.tier === current;
            const paid = p.tier !== 'free';
            return (
              <div key={p.tier} className={'planCard' + (p.tier === 'extreme' ? ' best' : '') + (isCurrent ? ' current' : '')}>
                {p.tier === 'extreme' ? <span className="planFlag">Everything</span> : null}
                <h3>{p.label}</h3>
                <div className="planPrice">
                  {p.price === 0 ? 'Free' : '$' + p.price.toFixed(2)}
                  {p.price === 0 ? null : <small>/month</small>}
                </div>
                <div className="planDice">{p.diceCount} dice per roll</div>
                <ul className="planFeatures">
                  {(p.features || []).map(function (f, i) { return <li key={i}>{f}</li>; })}
                </ul>
                {isCurrent ? <button className="btn ghost wide" disabled>Your current plan</button>
                  : paid ? (
                    <button className={'btn ' + (p.tier === 'extreme' ? 'green' : 'primary') + ' wide'}
                      disabled={busy === p.tier || !hasAccount} onClick={function () { startCheckout(p.tier); }}>
                      {!hasAccount ? 'Sign in to buy' : (busy === p.tier ? 'Opening checkout…' : 'Get ' + p.label)}
                    </button>
                  ) : null}
              </div>
            );
          })}
        </div>
        {err ? <p className="warn">{err}</p> : null}
        <PromoCode
          hasAccount={hasAccount}
          promoUntil={props.promoUntil || usage.promoUntil}
          onNeedAccount={props.onNeedAccount}
          onRedeemed={function (body) {
            if (props.onRedeemed) props.onRedeemed(body);
            else if (typeof window !== 'undefined') window.location.reload();
          }}
        />
        <p className="muted sm" style={{ marginTop:14 }}>Cancel any time. Card details stay with Stripe.</p>
        {current !== 'free' ? <p style={{ marginTop:8 }}><a href="/api/billing/portal">Manage billing</a></p> : null}
      </div>
    </div>
  );
}
