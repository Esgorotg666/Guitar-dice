import { useEffect, useState } from 'react';
import PromoCode from './PromoCode';
import WelcomeBanner from './WelcomeBanner';

function api(path, opts) {
  const o = Object.assign({ credentials:'include' }, opts || {});
  return fetch('/api/' + path, o).then(function (r) {
    return r.json().catch(function () { return {}; }).then(function (b) { return { ok:r.ok, status:r.status, body:b }; });
  });
}

export default function Account(props) {
  const user = props.user;
  const signedIn = user && user.hasAccount;
  const [mode, setMode] = useState('signin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [recovery, setRecovery] = useState('');
  const [sessions, setSessions] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(function () {
    if (!signedIn) return;
    api('auth/sessions').then(function (r) { if (r.ok) setSessions(r.body.sessions || []); });
  }, [signedIn]);

  function reset() { setErr(''); setMsg(''); }

  function doRegister() {
    reset();
    if (password !== password2) { setErr('The two passwords do not match.'); return; }
    setBusy(true);
    api('auth/register', { method:'POST', headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify({ username:username.trim(), password:password, email:email.trim() || null }) })
      .then(function (r) {
        setBusy(false);
        if (!r.ok) { setErr(r.body.message || 'Could not create the account.'); return; }
        setRecovery(r.body.recoveryCode || '');
        setPassword(''); setPassword2('');
        if (props.onChange) props.onChange();
      });
  }
  function doLogin() {
    reset(); setBusy(true);
    api('auth/login', { method:'POST', headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify({ username:username.trim(), password:password }) })
      .then(function (r) {
        setBusy(false);
        if (!r.ok) { setErr(r.body.message || 'Could not sign in.'); return; }
        setPassword('');
        if (props.onChange) props.onChange();
      });
  }
  function doRecover() {
    reset();
    if (password !== password2) { setErr('The two passwords do not match.'); return; }
    setBusy(true);
    api('auth/recover', { method:'POST', headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify({ username:username.trim(), recoveryCode:code.trim(), newPassword:password }) })
      .then(function (r) {
        setBusy(false);
        if (!r.ok) { setErr(r.body.message || 'Could not reset the password.'); return; }
        setMsg(r.body.message || 'Password reset.');
        setPassword(''); setPassword2(''); setCode('');
        if (props.onChange) props.onChange();
      });
  }
  function doLogout() { api('auth/logout', { method:'POST' }).then(function () { if (props.onChange) props.onChange(); }); }
  function doChangePassword() {
    reset();
    if (password !== password2) { setErr('The two new passwords do not match.'); return; }
    setBusy(true);
    api('auth/change-password', { method:'POST', headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify({ currentPassword:code, newPassword:password }) })
      .then(function (r) {
        setBusy(false);
        if (!r.ok) { setErr(r.body.message || 'Could not change the password.'); return; }
        setMsg(r.body.message || 'Password changed.');
        setPassword(''); setPassword2(''); setCode('');
        api('auth/sessions').then(function (s) { if (s.ok) setSessions(s.body.sessions || []); });
      });
  }
  function doLogoutAll() {
    api('auth/logout-all', { method:'POST' }).then(function (r) {
      setMsg(r.body.message || 'Signed out everywhere else.');
      api('auth/sessions').then(function (s) { if (s.ok) setSessions(s.body.sessions || []); });
    });
  }
  function doDelete() {
    reset(); setBusy(true);
    api('auth/account', { method:'DELETE', headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify({ password:code }) })
      .then(function (r) {
        setBusy(false);
        if (!r.ok) { setErr(r.body.message || 'Could not delete the account.'); return; }
        if (props.onChange) props.onChange();
      });
  }

  if (recovery) {
    return (
      <div className="card">
        <h3>Save your recovery code</h3>
        <p className="muted sm">There is no email reset yet, so this code is the only way back into your account if you forget your password. It is shown once.</p>
        <div className="recoveryBox">{recovery}</div>
        <button className="btn ghost wide" onClick={function () {
          if (navigator.clipboard) navigator.clipboard.writeText(recovery);
          setMsg('Copied.');
        }}>Copy code</button>
        {msg ? <p className="okText sm">{msg}</p> : null}
        <button className="btn primary wide" onClick={function () { setRecovery(''); }}>I have saved it</button>
      </div>
    );
  }

  if (!signedIn) {
    return (
      <div className="card">
        <h3>{mode === 'signup' ? 'Create an account' : mode === 'recover' ? 'Reset your password' : 'Sign in'}</h3>
        <p className="muted sm">
          {mode === 'signup' ? 'An account keeps your progress, your songs and any subscription with you, not with this browser.'
            : mode === 'recover' ? 'Enter the recovery code you saved when you signed up.' : 'Welcome back.'}
        </p>
        <label className="fieldLabel">Username</label>
        <input className="field" value={username} autoCapitalize="none" autoCorrect="off"
          onChange={function (e) { setUsername(e.target.value); }} placeholder="your username" />
        {mode === 'signup' ? (
          <div>
            <label className="fieldLabel">Email (optional)</label>
            <input className="field" value={email} type="email" autoCapitalize="none"
              onChange={function (e) { setEmail(e.target.value); }} placeholder="for receipts only" />
          </div>
        ) : null}
        {mode === 'recover' ? (
          <div>
            <label className="fieldLabel">Recovery code</label>
            <input className="field" value={code} autoCapitalize="characters"
              onChange={function (e) { setCode(e.target.value); }} placeholder="XXXXX-XXXXX-XXXXX-XXXXX" />
          </div>
        ) : null}
        <label className="fieldLabel">{mode === 'recover' ? 'New password' : 'Password'}</label>
        <input className="field" value={password} type="password"
          onChange={function (e) { setPassword(e.target.value); }} placeholder="at least 8 characters" />
        {mode !== 'signin' ? (
          <div>
            <label className="fieldLabel">Repeat password</label>
            <input className="field" value={password2} type="password" onChange={function (e) { setPassword2(e.target.value); }} />
          </div>
        ) : null}
        {err ? <p className="warn">{err}</p> : null}
        {msg ? <p className="okText sm">{msg}</p> : null}
        <button className="btn primary wide" disabled={busy}
          onClick={mode === 'signup' ? doRegister : mode === 'recover' ? doRecover : doLogin}>
          {busy ? 'Working...' : mode === 'signup' ? 'Create account' : mode === 'recover' ? 'Reset password' : 'Sign in'}
        </button>
        <div className="authSwitch">
          {mode !== 'signin' ? <button className="linkBtn" onClick={function () { setMode('signin'); reset(); }}>Sign in</button> : null}
          {mode !== 'signup' ? <button className="linkBtn" onClick={function () { setMode('signup'); reset(); }}>Create an account</button> : null}
          {mode !== 'recover' ? <button className="linkBtn" onClick={function () { setMode('recover'); reset(); }}>Forgot password</button> : null}
        </div>
      </div>
    );
  }

  return (
    <div>
      <WelcomeBanner user={user} />
      <div className="card">
        <div className="rowBetween">
          <h3>Signed in as {user.username}</h3>
          <button className="btn ghost sm" onClick={doLogout}>Sign out</button>
        </div>
        {user.email ? <p className="muted sm">{user.email}</p> : null}
      </div>
      <PromoCode
        hasAccount={true}
        promoUntil={props.promoUntil}
        onRedeemed={function () { if (props.onChange) props.onChange(); }}
      />
      <div className="card">
        <h3>Change password</h3>
        <label className="fieldLabel">Current password</label>
        <input className="field" type="password" value={code} onChange={function (e) { setCode(e.target.value); }} />
        <label className="fieldLabel">New password</label>
        <input className="field" type="password" value={password} onChange={function (e) { setPassword(e.target.value); }} />
        <label className="fieldLabel">Repeat new password</label>
        <input className="field" value={password2} type="password" onChange={function (e) { setPassword2(e.target.value); }} />
        {err ? <p className="warn">{err}</p> : null}
        {msg ? <p className="okText sm">{msg}</p> : null}
        <button className="btn primary wide" disabled={busy} onClick={doChangePassword}>Change password</button>
        <p className="muted sm" style={{ marginTop:8 }}>Changing your password signs out every other device.</p>
      </div>
      <div className="card">
        <div className="rowBetween">
          <h3>Where you are signed in</h3>
          <button className="btn ghost sm" onClick={doLogoutAll}>Sign out others</button>
        </div>
        {!sessions ? <p className="muted sm">Loading...</p> : null}
        {(sessions || []).map(function (s) {
          return (
            <div key={s.id} className="sessionRow">
              <span><b>{s.device}</b>{s.current ? <span className="nowTag">this device</span> : null}</span>
              <span className="muted sm">{new Date(s.lastUsed).toLocaleDateString()}</span>
            </div>
          );
        })}
      </div>
      <div className="card danger">
        <h3>Delete account</h3>
        <p className="muted sm">Permanently removes your account, saved progressions, songs, preferences and streaks. Cancel any subscription first.</p>
        {!confirmDelete ? (
          <button className="btn ghost wide" onClick={function () { setConfirmDelete(true); }}>Delete my account</button>
        ) : (
          <div>
            <label className="fieldLabel">Type your password to confirm</label>
            <input className="field" type="password" value={code} onChange={function (e) { setCode(e.target.value); }} />
            {err ? <p className="warn">{err}</p> : null}
            <button className="btn danger wide" disabled={busy} onClick={doDelete}>Permanently delete</button>
            <button className="btn ghost wide" onClick={function () { setConfirmDelete(false); reset(); }}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
}
