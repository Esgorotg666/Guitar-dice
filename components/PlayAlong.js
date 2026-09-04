import { useEffect, useRef, useState } from 'react';
import { ensureAudio, playClick } from '../lib/audio';
import { detectPitch, centsOff } from '../lib/pitch';
import { GOLD_SCORE, PASS_SCORE, scheduleNotes } from '../lib/path';

export default function PlayAlong(props) {
  const notes = props.notes || [];
  const bpm = props.bpm || 80;
  const [mode, setMode] = useState('tap');
  const [phase, setPhase] = useState('idle');
  const [heard, setHeard] = useState('--');
  const [liveHits, setLiveHits] = useState(0);
  const [total, setTotal] = useState(0);
  const [result, setResult] = useState(null);
  const [err, setErr] = useState('');
  const stopRef = useRef(null);
  const plannedRef = useRef([]);
  const hitsRef = useRef([]);
  const musicStartRef = useRef(0);

  useEffect(function () {
    return function () { if (stopRef.current) stopRef.current(); };
  }, []);

  function halt() {
    if (stopRef.current) stopRef.current();
    stopRef.current = null;
    setPhase('idle');
  }

  function markTap() {
    if (phase !== 'play') return;
    const planned = plannedRef.current;
    const hits = hitsRef.current;
    const songT = (performance.now() - musicStartRef.current) / 1000;
    let best = -1;
    let bestAbs = 99;
    planned.forEach(function (n, i) {
      if (hits[i]) return;
      const delta = Math.abs(songT - n.start);
      if (delta <= n.window && delta < bestAbs) {
        best = i;
        bestAbs = delta;
      }
    });
    if (best >= 0) {
      hits[best] = true;
      setLiveHits(hits.filter(Boolean).length);
    }
  }

  async function start() {
    setErr(''); setResult(null);
    const planned = scheduleNotes(notes, bpm);
    if (!planned.length) {
      setErr('This lesson has no playable notes to score.');
      return;
    }
    const c = await ensureAudio();
    if (!c) {
      setErr('Tap the screen once, then start again so audio can unlock.');
      return;
    }

    let stream = null;
    let micCtx = null;
    let analyser = null;
    let buf = null;
    if (mode === 'mic') {
      if (typeof navigator === 'undefined' || !navigator.mediaDevices) {
        setErr('No microphone here. Use Tap timing instead.');
        return;
      }
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: { echoCancellation: false, autoGainControl: false, noiseSuppression: false }
        });
      } catch (e) {
        setErr('Mic blocked. Switch to Tap timing — same 80% pass.');
        return;
      }
      const C = window.AudioContext || window.webkitAudioContext;
      micCtx = new C();
      if (micCtx.state === 'suspended') await micCtx.resume();
      const src = micCtx.createMediaStreamSource(stream);
      analyser = micCtx.createAnalyser();
      analyser.fftSize = 2048;
      src.connect(analyser);
      buf = new Float32Array(analyser.fftSize);
    }

    const hits = planned.map(function () { return false; });
    plannedRef.current = planned;
    hitsRef.current = hits;
    const spb = 60 / bpm;
    const countIn = 4;
    const t0 = performance.now() + 80;
    let raf = 0;
    let stopped = false;
    setTotal(planned.length);
    setLiveHits(0);
    setPhase('count');

    for (let b = 0; b < countIn; b++) {
      playClick(c, c.currentTime + 0.05 + b * spb, b === 0, 'click');
    }
    const musicStart = t0 + countIn * spb * 1000;
    musicStartRef.current = musicStart;
    const endAt = musicStart + (planned[planned.length - 1].end + 0.35) * 1000;
    const lastBeat = Math.ceil(planned[planned.length - 1].end / spb) + 1;
    for (let b = 0; b < lastBeat; b++) {
      playClick(c, c.currentTime + 0.05 + (countIn + b) * spb, b % 4 === 0, 'click');
    }

    const tick = function () {
      if (stopped) return;
      const now = performance.now();
      if (now < musicStart) {
        setPhase('count');
      } else if (now < endAt) {
        setPhase('play');
        if (mode === 'mic' && analyser) {
          analyser.getFloatTimeDomainData(buf);
          const f = detectPitch(buf, micCtx.sampleRate);
          if (f > 0) setHeard(f.toFixed(0) + ' Hz');
          const songT = (now - musicStart) / 1000;
          planned.forEach(function (n, i) {
            if (hits[i] || f <= 0) return;
            if (songT < n.start - 0.08 || songT > n.start + n.window) return;
            if (Math.abs(centsOff(f, n.freq)) <= 55) {
              hits[i] = true;
              setLiveHits(hits.filter(Boolean).length);
            }
          });
        }
      } else {
        finish();
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    function finish() {
      if (stopped) return;
      stopped = true;
      cancelAnimationFrame(raf);
      if (stream) stream.getTracks().forEach(function (t) { t.stop(); });
      try { if (micCtx) micCtx.close(); } catch (e) {}
      const hitN = hits.filter(Boolean).length;
      const score = Math.round((hitN / planned.length) * 100);
      const res = {
        score: score,
        passed: score >= PASS_SCORE,
        gold: score >= GOLD_SCORE,
        hits: hitN,
        total: planned.length,
        mode: mode
      };
      setResult(res);
      setLiveHits(hitN);
      setPhase('done');
      stopRef.current = null;
      if (props.onResult) props.onResult(res);
    }

    stopRef.current = function () {
      stopped = true;
      cancelAnimationFrame(raf);
      if (stream) stream.getTracks().forEach(function (t) { t.stop(); });
      try { if (micCtx) micCtx.close(); } catch (e) {}
    };
    raf = requestAnimationFrame(tick);
  }

  return (
    <div className="playAlong">
      <div className="rowBetween">
        <h3>Play along to pass</h3>
        {phase === 'idle' || phase === 'done' ? (
          <button className="btn primary sm" onClick={start}>Play along</button>
        ) : (
          <button className="btn danger sm" onClick={halt}>Cancel</button>
        )}
      </div>
      <div className="optRow">
        <button className={'chipBtn' + (mode === 'tap' ? ' on' : '')} onClick={function () { setMode('tap'); }}>
          Tap timing
        </button>
        <button className={'chipBtn' + (mode === 'mic' ? ' on' : '')} onClick={function () { setMode('mic'); }}>
          Mic pitch
        </button>
      </div>
      <p className="muted sm">
        {mode === 'tap'
          ? 'Count-in, then tap the big button on every note or chord change. Timing only. ' + PASS_SCORE + '% passes the node.'
          : 'Mic scores pitch in the beat window. Use tap if the room is loud. 92% is gold.'}
      </p>
      {err ? <p className="warn">{err}</p> : null}
      {phase === 'count' ? <p className="okText">Count-in… get ready.</p> : null}
      {phase === 'play' && mode === 'mic' ? (
        <p className="okText">Listening · {liveHits}/{total} · {heard}</p>
      ) : null}
      {phase === 'play' && mode === 'tap' ? (
        <button className="btn green wide" style={{ minHeight: 64, fontSize: '1.1rem' }} onClick={markTap}>
          Tap · {liveHits}/{total}
        </button>
      ) : null}
      {result ? (
        <div className={'pathResult' + (result.passed ? ' pass' : ' fail')}>
          <strong>{result.score}%</strong>
          <span>{result.hits} of {result.total} {result.mode === 'tap' ? 'taps in time' : 'notes in time'}</span>
          <span>{result.gold ? 'Gold clear' : (result.passed ? 'Path unlocked' : 'Under ' + PASS_SCORE + '% — loop it slower and retry')}</span>
        </div>
      ) : null}
    </div>
  );
}
