import { useEffect } from 'react';

export default function TrafficPing() {
  useEffect(function () {
    try {
      const day = new Date().toISOString().slice(0, 10);
      const key = 'gd-visit-' + day;
      const unique = !window.sessionStorage.getItem(key);
      if (unique) window.sessionStorage.setItem(key, '1');
      fetch('/api/traffic/hit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ unique: unique }),
        keepalive: true
      }).catch(function () {});
    } catch (e) {}
  }, []);
  return null;
}
