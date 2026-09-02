import { useEffect, useRef, useState } from 'react';
import { ensureAudio, playClick, CLICK_SOUNDS } from '../lib/audio';

const TIME_SIGS = [
  { beats:2, label:'2/4' }, { beats:3, label:'3/4' }, { beats:4, label:'4/4' },
  { beats:5, label:'5/4' }, { beats:6, label:'6/8' }, { beats:7, label:'7/8' }
];
const SUBDIVISIONS = [
  { value:1, label:'Quarter' }, { value:2, label:'Eighth' },
  { value:3, label:'Triplet' }, { value:4, label:'Sixteenth' }
];

export default function Metronome(props) {
  const paid = !!props.paid;
  const [bpm, setBpm] = useState(90);
  const [beats, setBeats] = useState(4);
  const [sub, setSub] = useState(1);
  const [sound, setSound] = useState('click');
  const [running, setRunning] = useState(false);
  const [beat, setBeat] = useState(-1);
  const [blocked, setBlocked] = useState(false);
  const ctxRef = useRef(null);
  const timerRef = useRef(null);
  const nextRef = useRef(0);
  const countRef = useRef(0);

  async function toggle() {
    if (running) { setRunning(false); return; }
    setBlocked(false);
    const ctx = await ensureAudio();
    if (!ctx) { setBlocked(true); return; }
    ctxRef.current = ctx;
    countRef.current = 0;
    nextRef.current = ctx.currentTime + 0.12;
    setRunning(true);
  }

  useEffect(function () {
    if (!running) { clearInterval(timerRef.current); setBeat(-1); return; }
    const ctx = ctxRef.current;
    if (!ctx) return;
    const stepsPerBar = beats * sub;
    timerRef.current = setInterval(function () {
      const stepLen = (60 / bpm) / sub;
      while (nextRef.current < ctx.currentTime + 0.14) {
        const step = countRef.current % stepsPerBar;
        const isBeat = step % sub === 0;
        if (isBeat || sub > 1) playClick(ctx, nextRef.current, step === 0, isBeat ? sound : 'hat');
        if (isBeat) {
          const shown = step / sub;
          const delay = Math.max(0, (nextRef.current - ctx.currentTime) * 1000);
          setTimeout(function () { setBeat(shown); }, delay);
        }
        countRef.current++;
        nextRef.current += stepLen;
      }
    }, 25);
    return function () { clearInterval(timerRef.current); };
  }, [running, bpm, beats, sub, sound]);

  const dots = [];
  for (let i = 0; i < beats; i++) dots.push(i);

  return (
    <div className="card">
      <div className="rowBetween">
        <h3>Metronome</h3>
        <button className={running ? 'btn danger' : 'btn primary'} onClick={toggle}>{running ? 'Stop' : 'Start'}</button>
      </div>
      <div className="beats">
        {dots.map(function (i) {
          return <span key={i} className={'beatDot' + (running && beat === i ? ' on' : '') + (i === 0 ? ' accent' : '')} />;
        })}
      </div>
      <div className="bpmRow">
        <button className="btn ghost sm" onClick={function () { setBpm(Math.max(40, bpm-5)); }}>-</button>
        <div className="bpmVal"><strong>{bpm}</strong><span>BPM</span></div>
        <button className="btn ghost sm" onClick={function () { setBpm(Math.min(240, bpm+5)); }}>+</button>
      </div>
      <input className="slider" type="range" min={40} max={240} value={bpm}
        onChange={function (e) { setBpm(Number(e.target.value)); }} />
      {blocked ? <p className="warn">No sound? On iPhone the silent switch on the side of the phone mutes web audio. Flick it to ring mode, turn the volume up, then press Start again.</p> : null}
      {paid ? (
        <div className="metroOpts">
          <div className="optGroup">
            <span className="optLabel">Time signature</span>
            <div className="optRow">
              {TIME_SIGS.map(function (t) {
                return <button key={t.label} className={'chipBtn' + (beats===t.beats?' on':'')} onClick={function () { setBeats(t.beats); }}>{t.label}</button>;
              })}
            </div>
          </div>
          <div className="optGroup">
            <span className="optLabel">Count</span>
            <div className="optRow">
              {SUBDIVISIONS.map(function (s) {
                return <button key={s.value} className={'chipBtn' + (sub===s.value?' on':'')} onClick={function () { setSub(s.value); }}>{s.label}</button>;
              })}
            </div>
          </div>
          <div className="optGroup">
            <span className="optLabel">Sound</span>
            <div className="optRow">
              {CLICK_SOUNDS.map(function (s) {
                return (
                  <button key={s.value} className={'chipBtn' + (sound===s.value?' on':'')}
                    onClick={function () {
                      setSound(s.value);
                      ensureAudio().then(function (c) { if (c) playClick(c, c.currentTime + 0.02, true, s.value); });
                    }}>{s.label}</button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="lockNote">
          <b>On Premium and Extreme:</b> time signatures from 2/4 to 7/8, eighth, triplet and sixteenth counts, and six click sounds - wood block, snare, rimshot, cowbell and hi-hat.
          {props.onUpgrade ? <button className="linkBtn" onClick={props.onUpgrade}>See plans</button> : null}
        </div>
      )}
    </div>
  );
}
