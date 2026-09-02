import { useEffect, useRef, useState } from 'react';
import { startLoop, CLICK_SOUNDS } from '../lib/audio';

export default function LoopPlayer(props) {
  const chords = (props.chords || []).filter(Boolean);
  const [bpm, setBpm] = useState(90);
  const [bars, setBars] = useState(1);
  const [click, setClick] = useState(true);
  const [sound, setSound] = useState('click');
  const [running, setRunning] = useState(false);
  const [current, setCurrent] = useState(-1);
  const [blocked, setBlocked] = useState(false);
  const stopRef = useRef(null);
  const genRef = useRef(0);

  function hardStop() {
    genRef.current++;
    if (stopRef.current) { stopRef.current(); stopRef.current = null; }
    setCurrent(-1);
  }
  useEffect(function () { return function () { hardStop(); }; }, []);

  useEffect(function () {
    if (!running) return;
    const gen = ++genRef.current;
    if (stopRef.current) { stopRef.current(); stopRef.current = null; }
    startLoop(chords, bpm, bars, click, function (i) {
      if (genRef.current === gen) setCurrent(i);
    }, sound, 4).then(function (stop) {
      if (genRef.current !== gen) { if (stop) stop(); return; }
      if (!stop) { setRunning(false); setBlocked(true); return; }
      stopRef.current = stop;
    });
  }, [running, bpm, bars, click, sound]);

  function toggle() {
    if (running) { setRunning(false); hardStop(); return; }
    setBlocked(false); setRunning(true);
  }

  if (!chords.length) return null;

  return (
    <div className="card">
      <div className="rowBetween">
        <h3>{props.title || 'Loop player'}</h3>
        <button className={running ? 'btn danger' : 'btn green'} onClick={toggle}>{running ? 'Stop' : 'Start loop'}</button>
      </div>
      <p className="muted sm">{props.subtitle || 'Loops the progression so you can solo over it. The chord playing right now lights up.'}</p>
      <div className="loopChords">
        {chords.map(function (c, i) {
          return <span key={c.key + i} className={'loopChip' + (current === i ? ' on' : '')}>{c.name}</span>;
        })}
      </div>
      <div className="bpmRow" style={{ marginTop:14 }}>
        <button className="btn ghost sm" onClick={function () { setBpm(Math.max(40, bpm-5)); }}>-</button>
        <div className="bpmVal"><strong>{bpm}</strong><span>BPM</span></div>
        <button className="btn ghost sm" onClick={function () { setBpm(Math.min(200, bpm+5)); }}>+</button>
      </div>
      <input className="slider" type="range" min={40} max={200} value={bpm}
        onChange={function (e) { setBpm(Number(e.target.value)); }} />
      <div className="loopOpts">
        <button className={'btn ghost sm' + (bars===1?' onToggle':'')} onClick={function () { setBars(1); }}>1 bar each</button>
        <button className={'btn ghost sm' + (bars===2?' onToggle':'')} onClick={function () { setBars(2); }}>2 bars each</button>
        <button className={'btn ghost sm' + (click?' onToggle':'')} onClick={function () { setClick(!click); }}>Click {click?'on':'off'}</button>
      </div>
      {click ? (
        <div className="optRow" style={{ marginTop:10 }}>
          {CLICK_SOUNDS.map(function (s) {
            return <button key={s.value} className={'chipBtn' + (sound===s.value?' on':'')} onClick={function () { setSound(s.value); }}>{s.label}</button>;
          })}
        </div>
      ) : null}
      {blocked ? <p className="warn">No sound? On iPhone the side silent switch mutes web audio - flick it to ring mode and try again.</p> : null}
    </div>
  );
}
