import { useEffect, useState } from 'react';

export default function SignupNudge(props) {
  const signedIn = props.user && props.user.hasAccount;
  const [open, setOpen] = useState(false);

  useEffect(function () {
    if (signedIn) {
      setOpen(false);
      return;
    }
    const first = setTimeout(function () { setOpen(true); }, 15000);
    const loop = setInterval(function () { setOpen(true); }, 120000);
    return function () {
      clearTimeout(first);
      clearInterval(loop);
    };
  }, [signedIn]);

  if (signedIn || !open) return null;

  return (
    <div className="wallOverlay" style={{ zIndex: 80 }}>
      <div className="wallModal" style={{ maxWidth: 420 }}>
        <button className="wallClose" onClick={function () { setOpen(false); }} aria-label="Close">x</button>
        <h2 style={{ marginTop: 0 }}>Create a free account</h2>
        <p className="muted">
          Save your progress, rolls, and songs. Free takes about 20 seconds. This reminder stays until you sign up.
        </p>
        <button
          className="btn primary wide"
          onClick={function () {
            setOpen(false);
            if (props.onSignup) props.onSignup();
          }}
        >
          Sign up free
        </button>
        <button className="btn ghost wide" style={{ marginTop: 8 }} onClick={function () { setOpen(false); }}>
          Not now
        </button>
      </div>
    </div>
  );
}
