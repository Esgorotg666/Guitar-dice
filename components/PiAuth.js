import { useEffect, useState } from 'react';

const APP_STUDIO_LOGIN = 'https://backend.appstudio-u7cm9zhmha0ruwv8.piappengine.com/pi/auth/v1/login';

export default function PiAuth() {
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    let attempts = 0;

    async function initPi() {
      if (typeof window === 'undefined') return;
      if (!window.Pi) {
        attempts += 1;
        if (attempts < 50) {
          setTimeout(initPi, 100);
        }
        return;
      }

      try {
        await window.Pi.init({ version: '2.0' });

        const onIncompletePaymentFound = (payment) => {
          console.log('Incomplete Pi payment:', payment);
        };

        const authResult = await window.Pi.authenticate(['username'], onIncompletePaymentFound);
        const accessToken = authResult && authResult.accessToken;

        if (!accessToken) {
          if (!cancelled) setError('No accessToken');
          return;
        }

        const res = await fetch(APP_STUDIO_LOGIN, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ accessToken })
        });

        if (!res.ok) {
          if (!cancelled) setError('App Studio login failed: ' + res.status);
          return;
        }

        const data = await res.json();
        if (!cancelled && data && data.user) {
          const sess = {
            sessionToken: data.sessionToken,
            uid: data.user.uid,
            username: data.user.username
          };
          setSession(sess);
          try {
            localStorage.setItem('pi_session', JSON.stringify(sess));
          } catch (e) {}
          if (typeof window !== 'undefined') {
            window.__piSession = sess;
          }
        }
      } catch (err) {
        if (!cancelled) {
          console.warn('Pi auth not available or cancelled:', err && err.message);
          setError(err && err.message ? err.message : 'Pi auth failed');
        }
      }
    }

    initPi();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
