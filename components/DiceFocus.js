import { ALL_ROOTS } from '../lib/style';
import { can } from '../lib/entitlements';

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
  const tier = (props.usage && props.usage.tier) || 'free';
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
        {!paid ? <span className="tagBlue">Premium</span> : <span className="muted sm">Paid</span>}
      </div>
      <p className="muted sm">
        {paid
          ? 'Leave these on Any and the dice still follow your genre. Lock one or both and every chord stays in that key and mode.'
          : 'Free rolls pick a random key and a mode that fits your genre. Locking a key or a mode is on Premium and Extreme.'}
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
        <button className="btn primary wide" style={{ marginTop:12 }} onClick={props.onUpgrade}>See paid plans</button>
      ) : null}
    </div>
  );
}
