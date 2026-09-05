import { useEffect, useState } from 'react';
import { displayNameFor } from '../lib/familyGrant';

export default function WelcomeBanner(props) {
  const name = displayNameFor(props.user);
  const [hide, setHide] = useState(false);
  const key = name ? ('gd-hi-' + name.toLowerCase()) : '';

  useEffect(function () {
    if (!key || typeof window === 'undefined') return;
    setHide(window.sessionStorage.getItem(key) === '1');
  }, [key]);

  if (!name || hide) return null;

  function dismiss() {
    try { window.sessionStorage.setItem(key, '1'); } catch (e) {}
    setHide(true);
  }

  return (
    <div className="card" style={{ marginBottom: 12, borderColor: '#35c46b' }}>
      <div className="rowBetween">
        <div>
          <h3 style={{ margin: 0 }}>Welcome Forest</h3>
          <p className="muted sm" style={{ margin: '6px 0 0' }}>
            Extreme is on for you. Roll, open Class, and play.
          </p>
        </div>
        <button className="btn ghost sm" onClick={dismiss}>Got it</button>
      </div>
    </div>
  );
}
