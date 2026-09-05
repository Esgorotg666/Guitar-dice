import { useState } from 'react';

export default function PromoCode(props) {
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [ok, setOk] = useState('');

  function redeem() {
    setErr(''); setOk('');
    if (!props.hasAccount) {
      setErr('Sign in first so the free week stays on the account.');
      if (props.onNeedAccount) props.onNeedAccount();
      return;
    }
    const trimmed = code.trim();
    if (!trimmed) { setErr('Enter a code.'); return; }
    setBusy(true);
    fetch('/api/billing/promo', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: trimmed })
    })
      .then(function (r) { return r.json().then(function (b) { return { ok: r.ok, b: b }; }); })
      .then(function (res) {
        setBusy(false);
        if (res.b.needsAccount) {
          setErr(res.b.message || 'Sign in first.');
          if (props.onNeedAccount) props.onNeedAccount();
          return;
        }
        if (!res.ok) { setErr(res.b.message || 'Could not redeem that code.'); return; }
        setOk(res.b.message || 'Extreme unlocked for a week.');
        setCode('');
        if (props.onRedeemed) props.onRedeemed(res.b);
      })
      .catch(function () { setBusy(false); setErr('Could not reach the server.'); });
  }

  return (
    <div className="card">
      <h3>Have a promo code?</h3>
      <p className="muted sm">
        If you were given a code, sign in and enter it here. Codes are private and limited.
      </p>
      {props.promoUntil ? (
        <p className="okText sm">Trial active until {new Date(props.promoUntil).toLocaleDateString()}.</p>
      ) : null}
      <label className="fieldLabel">Code</label>
      <input
        className="field"
        value={code}
        autoCapitalize="characters"
        autoCorrect="off"
        placeholder="Enter code"
        onChange={function (e) { setCode(e.target.value.toUpperCase()); }}
        onKeyDown={function (e) { if (e.key === 'Enter') redeem(); }}
      />
      {err ? <p className="warn">{err}</p> : null}
      {ok ? <p className="okText sm">{ok}</p> : null}
      <button className="btn primary wide" disabled={busy} onClick={redeem}>
        {busy ? 'Checking...' : 'Redeem code'}
      </button>
    </div>
  );
}
