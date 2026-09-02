export default function DiceConfig(props) {
  const max = props.max || 2;
  const count = props.count;
  const slots = props.slots;
  const nums = [];
  for (let i = 2; i <= max; i++) nums.push(i);

  return (
    <div className="card">
      <div className="rowBetween">
        <h3>Your dice</h3>
        <span className="muted sm">{count} of {max}</span>
      </div>
      <span className="optLabel">How many dice</span>
      <div className="optRow">
        {nums.map(function (n) {
          return <button key={n} className={'chipBtn' + (count===n?' on':'')} onClick={function () { props.onCount(n); }}>{n}</button>;
        })}
      </div>
      {props.allowBridge ? (
        <div style={{ marginTop:16 }}>
          <span className="optLabel">What each die rolls</span>
          <div className="slotRow">
            {slots.map(function (s, i) {
              return (
                <button key={i} className={'slotBtn ' + s}
                  onClick={function () { props.onSlot(i, s === 'chord' ? 'bridge' : 'chord'); }}>
                  <b>{i+1}</b><span>{s === 'chord' ? 'Chord' : 'Bridge'}</span>
                </button>
              );
            })}
          </div>
          <p className="muted sm" style={{ marginTop:10 }}>
            Tap a die to switch it. A bridge die works out how to get from the chord before it to the chord after it, gives you the scale that links all three, and tells you why the move works.
          </p>
        </div>
      ) : (
        <div className="lockNote">
          <b>On Extreme:</b> add bridge dice between your chords - a V7 setup, a tritone slide, a diminished approach - plus the scale that carries you through all three.
          {props.onUpgrade ? <button className="linkBtn" onClick={props.onUpgrade}>See plans</button> : null}
        </div>
      )}
    </div>
  );
}
