import { useEffect, useState } from 'react';
import { genreLook } from '../lib/genreLook';

export default function RewardedAd(props) {
  const look = genreLook(props.genre);
  const [left, setLeft] = useState(8);
  const [done, setDone] = useState(false);

  useEffect(function () {
    if (done) return;
    const t = setInterval(function () {
      setLeft(function (n) {
        if (n <= 1) { clearInterval(t); setDone(true); return 0; }
        return n - 1;
      });
    }, 1000);
    return function () { clearInterval(t); };
  }, [done]);

  return (
    <div className="wallOverlay">
      <div className="wallModal adModal">
        <button className="wallClose" onClick={props.onClose} aria-label="Close">x</button>
        <p className="adKicker">Free tier · {look.tag}</p>
        <h2>Guitar Dice {look.label}</h2>
        <p className="muted">{look.line}</p>
        <div className="adPoster">
          <strong>Premium drops the ads</strong>
          <span>Unlimited rolls, extra dice, loop player, and the full lesson path.</span>
        </div>
        {!done ? (
          <p className="muted sm">Unlock +3 rolls in {left}s…</p>
        ) : (
          <button className="btn green wide" onClick={props.onComplete}>Collect +3 rolls</button>
        )}
        {props.onUpgrade ? (
          <button className="btn ghost wide" onClick={props.onUpgrade}>See plans instead</button>
        ) : null}
      </div>
    </div>
  );
}
