import { useEffect } from 'react';

function sid() {
  try {
    var k = 'gd-sid-v1';
    var cur = window.localStorage.getItem(k);
    if (cur) return cur;
    var next = Math.random().toString(36).slice(2) + Date.now().toString(36);
    window.localStorage.setItem(k, next);
    return next;
  } catch (e) {
    return 'anon';
  }
}

export default function PresencePing(props) {
  useEffect(function () {
    var id = sid();
    function ping() {
      var body = {
        sid: id,
        signedIn: !!(props.user && props.user.hasAccount),
        username: (props.user && props.user.username) || ''
      };
      fetch('/api/presence/heartbeat', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        keepalive: true
      }).catch(function () {});
    }
    ping();
    var t = setInterval(ping, 30000);
    return function () { clearInterval(t); };
  }, [props.user && props.user.hasAccount, props.user && props.user.username]);
  return null;
}
