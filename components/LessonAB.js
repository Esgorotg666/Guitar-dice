import { useEffect, useRef, useState } from 'react';
import { ensureAudio, playClick, playSequence } from '../lib/audio';

export default function LessonAB(props) {
  const notes = props.notes || [];
  const written = props.bpm || 80;
  const [a, setA] = useState(0);
  const [b, setB] = useState(Math.max(0, notes.length - 1));
  const [pct, setPct] = useState(100);
  const [countIn, setCountIn] = useState(true);
  const [playing, setPlaying] = useState(false);
  const stopRef = useRef(null);

  useEffect(function () {
    setA(0);
    setB(Math.max(0, (props.notes || []).length - 1));
  }, [props.notes]);

  useEffect(function () {
    return function () { if (stopRef.current) stopRef.current(); };
  }, []);

  function slice() {
    const start = Math.max(0, Math.min(a, b));
    const end = Math.min(notes.length - 1, Math.max(a, b));
    return notes.slice(start, end + 1);
  }

  async function run() {
    if (playing) {
      if (stopRef.current) stopRef.current();
      stopRef.current = null;
      setPlaying(false);
      return;
    }
    const part = slice();
    if (!part.length) return;
    const bpm = Math.max(30, Math.round(written * pct / 100));
    const ctx = await ensureAudio();
    if (!ctx) return;
    setPlaying(true);
    const spb = 60 / bpm;
    if (countIn) {
      for (let i = 0; i < 4; i++) playClick(ctx, ctx.currentTime + 0.05 + i * spb, i === 0, 'click');
    }
    const delay = countIn ? 4 * spb * 1000 : 0;
    const t = setTimeout(function () {
      playSequence(part, bpm, null, function () {
        setPlaying(false);
        stopRef.current = null;
      }).then(function (stop) { stopRef.current = stop; });
    }, delay);
    stopRef.current = function () { clearTimeout(t); };
  }

  if (!notes.length) return null;

  return (
    <div className="playAlong">
      <div className="rowBetween">
        <h3>A-B loop</h3>
        <button className={playing ? 'btn danger sm' : 'btn green sm'} onClick={run}>
          {playing ? 'Stop loop' : 'Loop phrase'}
        </button>
      </div>
      <p className="muted sm">Set start and end, drop the speed, count in, then loop only that slice.</p>
      <div className="optRow">
        <span className="optLabel">A {a + 1}</span>
        <input className="slider" type="range" min={0} max={Math.max(0, notes.length - 1)} value={a}
          onChange={function (e) { setA(Number(e.target.value)); }} />
        <span className="optLabel">B {b + 1}</span>
        <input className="slider" type="range" min={0} max={Math.max(0, notes.length - 1)} value={b}
          onChange={function (e) { setB(Number(e.target.value)); }} />
      </div>
      <div className="tempoPresets">
        <button className={'chipBtn' + (pct === 70 ? ' on' : '')} onClick={function () { setPct(70); }}>70%</button>
        <button className={'chipBtn' + (pct === 85 ? ' on' : '')} onClick={function () { setPct(85); }}>85%</button>
        <button className={'chipBtn' + (pct === 100 ? ' on' : '')} onClick={function () { setPct(100); }}>100%</button>
        <button className={'chipBtn' + (countIn ? ' on' : '')} onClick={function () { setCountIn(!countIn); }}>
          Count-in {countIn ? 'on' : 'off'}
        </button>
      </div>
      <p className="muted sm">Looping notes {Math.min(a, b) + 1}–{Math.max(a, b) + 1} at {Math.round(written * pct / 100)} BPM.</p>
    </div>
  );
}
