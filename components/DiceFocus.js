import { useEffect, useState } from 'react';
import { ALL_ROOTS } from '../lib/style';
import { can, bestTier } from '../lib/entitlements';

export const MODE_CHOICES = [
  { id:'', label:'Any mode' },
  { id:'ionian', label:'Ionian (major)' },
  { id:'dorian', label:'Dorian' },
  { id:'phrygian', label:'Phrygian' },
  { id:'lydian', label:'Lydian' },
  { id:'mixolydian', label:'Mixolydian' },
  { id:'aeolian', label:'Aeolian (minor)' },
  { id:'locrian', label:'Locrian' }
];

export default function DiceFocus(props) {
  const usageTier = (props.usage && props.usage.tier) || 'free';
  const [live, setLive] = useState(usageTier);
  useEffect(function () {
    var alive = true;
    fetch('/api/billing/status', { credentials: 'include' })
      .then(function (r) { return r.json(); })
      .then(function (b) { if (alive) setLive(bestTier(usageTier, b && b.tier)); })
      .catch(function () {});
    return function () { alive = false; };
  }, [usageTier]);
  const tier = bestTier(usageTier, live);
  const paid = can(tier, 'lockKey');
  const key = props.rollKey || '';
  const mode = props.rollMode || '';

  function tapKey(v) {
    if (!paid) { if (props.onUpgrade) props.onUpgrade(); return; }
    props.onKey(v === key ? '' : v);
  }
  function tapMode(v) {
    if (!paid) { if (props.onUpgrade) props.onUpgrade(); return; }
    props.onMode(v === mode ? '' : v);
  }

  return (
    <div className="card">
      <div className="rowBetween">
        <h3>Key and mode</h3>
        {!paid ? <span className="tagBlue">Premium</span> : <span className="muted sm">Unlocked</span>}
      </div>
      <p className="muted sm">
        {paid
          ? 'Leave on Any and the dice follow your genre. Lock a key or mode if you want every chord in that box.'
          : 'Free rolls pick a random key. Locking a key or mode is on Premium and Extreme.'}
      </p>
      <span className="optLabel">Key signature</span>
      <div className="optRow">
        <button className={'chipBtn' + (!key ? ' on' : '')} onClick={function () { tapKey(''); }}>Any</button>
        {ALL_ROOTS.map(function (r) {
          return <button key={r} className={'chipBtn' + (key === r ? ' on' : '')} onClick={function () { tapKey(r); }}>{r}</button>;
        })}
      </div>
      <span className="optLabel" style={{ marginTop:12 }}>Mode</span>
      <div className="optRow">
        {MODE_CHOICES.map(function (m) {
          return <button key={m.id || 'any'} className={'chipBtn' + (mode === m.id ? ' on' : '')} onClick={function () { tapMode(m.id); }}>{m.label}</button>;
        })}
      </div>
      {!paid ? (
        <button className="btn primary wide" style={{ marginTop:12 }} onClick={props.onUpgrade}>See plans</button>
      ) : null}
    </div>
  );
}
