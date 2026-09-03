import { useEffect, useRef, useState } from 'react';
import { ensureAudio, playClick } from '../lib/audio';
import { detectPitch, centsOff } from '../lib/pitch';
import { GOLD_SCORE, PASS_SCORE, scheduleNotes } from '../lib/path';

export default function PlayAlong(props) {
  const notes = props.notes || [];
  const bpm = props.bpm || 80;
  const [phase, setPhase] = useState('idle');
  const [heard, setHeard] = useState('--');
  const [liveHits, setLiveHits] = useState(0);
  const [total, setTotal] = useState(0);
  const [result, setResult] = useState(null);
  const [err, setErr] = useState('');
  const stopRef = useRef(null);

  useEffect(function () {
    return function () { if (stopRef.current) stopRef.current(); };
  }, []);

  function halt() {
    if (stopRef.current) stopRef.current();
    stopRef.current = null;
    setPhase('idle');
  }

  async function start() {
    setErr(''); setResult(null);
    if (typeof navigator === 'undefined' || !navigator.mediaDevices) {
      setErr('This browser will not give the page a microphone.');
      return;
    }
    const planned = scheduleNotes(notes, bpm);
    if (!planned.length) {
      setErr('This lesson has no playable notes to score.');
      return;
    }
    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: false, autoGainControl: false, noiseSuppression: false }
      });
    } catch (e) {
      setErr(e && e.name === 'NotAllowedError'
        ? 'Allow the microphone, then try Play along again.'
        : 'Could not open the microphone.');
      return;
    }
    const c = await ensureAudio();
    if (!c) {
      stream.getTracks().forEach(function (t) { t.stop(); });
      setErr('Tap the screen once, then start again so audio can unlock.');
      return;
    }
    const C = window.AudioContext || window.webkitAudioContext;
    const micCtx = new C();
    if (micCtx.state === 'suspended') await micCtx.resume();
    const src = micCtx.createMediaStreamSource(stream);
    const analyser = micCtx.createAnalyser();
    analyser.fftSize = 2048;
    src.connect(analyser);
    const buf = new Float32Array(analyser.fftSize);
    const hits = planned.map(function () { return false; });
    const spb = 60 / bpm;
    const countIn = 4;
    const t0 = performance.now() + 80;
    let raf = 0;
    let stopped = false;
    setTotal(planned.length);
    setLiveHits(0);
    setPhase('count');

    const audioC = c;
    for (let b = 0; b < countIn; b++) {
      playClick(audioC, audioC.currentTime + 0.05 + b * spb, b === 0, 'click');
    }
    const musicStart = t0 + countIn * spb * 1000;
    const endAt = musicStart + (planned[planned.length - 1].end + 0.35) * 1000;

    function beatClicks() {
      const lastBeat = Math.ceil(planned[planned.length - 1].end / spb) + 1;
      for (let b = 0; b < lastBeat; b++) {
        playClick(audioC, audioC.currentTime + 0.05 + (countIn + b) * spb, b % 4 === 0, 'click');
      }
    }
    beatClicks();

    const tick = function () {
      if (stopped) return;
      const now = performance.now();
      if (now < musicStart) {
        setPhase('count');
      } else if (now < endAt) {
        setPhase('play');
        analyser.getFloatTimeDomainData(buf);
        const f = detectPitch(buf, micCtx.sampleRate);
        if (f > 0) setHeard(f.toFixed(0) + ' Hz');
        const songT = (now - musicStart) / 1000;
        planned.forEach(function (n, i) {
          if (hits[i] || f <= 0) return;
          if (songT < n.start - 0.08 || songT > n.start + n.window) return;
          if (Math.abs(centsOff(f, n.freq)) <= 55) {
            hits[i] = true;
            const count = hits.filter(Boolean).length;
            setLiveHits(count);
          }
        });
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
      stream.getTracks().forEach(function (t) { t.stop(); });
      try { micCtx.close(); } catch (e) {}
      const hitN = hits.filter(Boolean).length;
      const score = Math.round((hitN / planned.length) * 100);
      const passed = score >= PASS_SCORE;
      const gold = score >= GOLD_SCORE;
      const res = { score: score, passed: passed, gold: gold, hits: hitN, total: planned.length };
      setResult(res);
      setLiveHits(hitN);
      setPhase('done');
      stopRef.current = null;
      if (props.onResult) props.onResult(res);
    }

    stopRef.current = function () {
      stopped = true;
      cancelAnimationFrame(raf);
      stream.getTracks().forEach(function (t) { t.stop(); });
      try { micCtx.close(); } catch (e) {}
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
      <p className="muted sm">
        Count-in, then play the lesson with a click. The mic scores pitch in time. You need {PASS_SCORE}% to unlock the next node. 92% is gold. The app does not play the guitar sound during a run so the speakers cannot cheat.
      </p>
      {err ? <p className="warn">{err}</p> : null}
      {phase === 'count' ? <p className="okText">Count-in… get ready.</p> : null}
      {phase === 'play' ? (
        <p className="okText">Listening · {liveHits}/{total} · {heard}</p>
      ) : null}
      {result ? (
        <div className={'pathResult' + (result.passed ? ' pass' : ' fail')}>
          <strong>{result.score}%</strong>
          <span>{result.hits} of {result.total} notes in time</span>
          <span>{result.gold ? 'Gold clear' : (result.passed ? 'Path unlocked' : 'Under ' + PASS_SCORE + '% — loop it slower and retry')}</span>
        </div>
      ) : null}
    </div>
  );
}
