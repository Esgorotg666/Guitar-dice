import { useEffect, useState } from 'react';

const APP_STUDIO_LOGIN = 'https://backend.appstudio-u7cm9zhmha0ruwv8.piappengine.com/pi/auth/v1/login';

export default function PiAuth() {
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function initPi() {
      if (typeof window === 'undefined' || !window.Pi) {
        // SDK not loaded yet; retry shortly
        setTimeout(initPi, 100);
        return;
      }

      try {
        await window.Pi.init({ version: '2.0' });

        const onIncompletePaymentFound = (payment) => {
          console.log('Incomplete payment:', payment);
          // Handle incomplete payments if needed
        };

        const authResult = await window.Pi.authenticate(['username'], onIncompletePaymentFound);
        const accessToken = authResult.accessToken;

        if (!accessToken) {
          throw new Error('No accessToken from Pi.authenticate');
        }

        // Exchange with App Studio
        const res = await fetch(APP_STUDIO_LOGIN, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ accessToken })
        });

        if (!res.ok) {
          throw new Error('App Studio login failed: ' + res.status);
        }

        const data = await res.json();
        if (!cancelled) {
          // Trust only the identity from App Studio
          setSession({
            sessionToken: data.sessionToken,
            uid: data.user.uid,
            username: data.user.username
          });
          // Store in memory / localStorage for app use
          try {
            localStorage.setItem('pi_session', JSON.stringify({
              sessionToken: data.sessionToken,
              uid: data.user.uid,
              username: data.user.username
            }));
          } catch (e) {}
        }
      } catch (err) {
        if (!cancelled) {
          console.error('Pi auth error:', err);
          setError(err.message || 'Authentication failed');
        }
      }
    }

    initPi();

    return () => {
      cancelled = true;
    };
  }, []);

  // Optional: expose for debugging or app consumption
  if (typeof window !== 'undefined') {
    window.__piSession = session;
  }

  return null; // Silent auth; integrate with UI as needed
}
