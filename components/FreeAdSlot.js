import { useEffect } from 'react';
import { genreLook } from '../lib/genreLook';

export default function FreeAdSlot(props) {
  if (props.paid) return null;
  const look = genreLook(props.genre);

  useEffect(function () {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }, []);

  return (
    <aside className="adSlot" aria-label="Sponsored">
      <span className="adSlotMark">Ad · Free</span>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minHeight: 90 }}
        data-ad-client="ca-pub-4798049989357665"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <div className="adSlotBody">
        <b>{look.label} players go further on Premium</b>
        <p>{look.line}</p>
      </div>
      <div className="adSlotActions">
        {props.onUpgrade ? <button className="btn primary sm" onClick={props.onUpgrade}>Upgrade</button> : null}
        {props.onWatchAd ? <button className="btn ghost sm" onClick={props.onWatchAd}>Watch ad +3</button> : null}
      </div>
    </aside>
  );
}
