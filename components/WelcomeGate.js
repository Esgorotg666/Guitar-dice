import { useEffect, useState } from 'react';
import WelcomeBanner from './WelcomeBanner';

export default function WelcomeGate() {
  const [user, setUser] = useState(null);
  useEffect(function () {
    fetch('/api/auth/user', { credentials: 'include' })
      .then(function (r) { return r.json().catch(function () { return null; }); })
      .then(function (body) { setUser(body); })
      .catch(function () {});
  }, []);
  if (!user || !user.hasAccount) return null;
  return (
    <div style={{ maxWidth: 720, margin: '12px auto 0', padding: '0 16px' }}>
      <WelcomeBanner user={user} />
    </div>
  );
}
