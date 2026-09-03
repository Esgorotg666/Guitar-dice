import { genreLook } from '../lib/genreLook';

export default function FreeAdSlot(props) {
  if (props.paid) return null;
  const look = genreLook(props.genre);
  return (
    <aside className="adSlot" aria-label="Sponsored">
      <span className="adSlotMark">Ad · Free</span>
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
