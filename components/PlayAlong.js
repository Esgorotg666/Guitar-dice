import { useEffect, useRef, useState } from 'react';
import { ensureAudio, playClick, playSequence } from '../lib/audio';
import { detectPitchInfo, matchesAnyPitch, CLARITY } from '../lib/pitch';
import { GOLD_SCORE, PASS_SCORE, scheduleNotes } from '../lib/path';

function windowMode(planned, songT) {
  var i, n;
  for (i = 0; i < planned.length; i++) {
    n = planned[i];
    if (songT < n.start - 0.12 || songT > n.start + n.window) continue;
    if (n.role === 'chord' || (n.freqs && n.freqs.length > 2)) return 'chord';
  }
  return 'lead';
}

export default function PlayAlong(props) {
  const notes = props.notes || [];
  const bpm = props.bpm || 80;
  const [mode, setMode] = useState('mic');
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
    if (phase !== 'play' || mode !== 'tap') return;
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
        setErr('This phone will not open a microphone. Use practice tap only — it does not pass the lesson.');
        return;
      }
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: { echoCancellation: false, autoGainControl: false, noiseSuppression: false }
        });
      } catch (e) {
        setErr('Allow the microphone. You have to play the guitar into the mic to pass this lesson.');
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
    let stopLesson = null;
    let musicTimer = 0;
    setTotal(planned.length);
    setLiveHits(0);
    setPhase('count');

    for (let b = 0; b < countIn; b++) {
      playClick(c, c.currentTime + 0.05 + b * spb, b === 0, 'click');
    }
    const musicStart = t0 + countIn * spb * 1000;
    musicStartRef.current = musicStart;
    const endAt = musicStart + (planned[planned.length - 1].end + 0.45) * 1000;
    const lastBeat = Math.ceil(planned[planned.length - 1].end / spb) + 1;
    for (let b = 0; b < lastBeat; b++) {
      playClick(c, c.currentTime + 0.05 + (countIn + b) * spb, b % 4 === 0, 'click');
    }

    musicTimer = setTimeout(function () {
      if (stopped) return;
      playSequence(notes, bpm, null, null, 0.22).then(function (stopFn) {
        if (stopped) { if (stopFn) stopFn(); return; }
        stopLesson = stopFn;
      });
    }, Math.max(0, musicStart - performance.now()));

    const tick = function () {
      if (stopped) return;
      const now = performance.now();
      if (now < musicStart) {
        setPhase('count');
      } else if (now < endAt) {
        setPhase('play');
        if (mode === 'mic' && analyser) {
          analyser.getFloatTimeDomainData(buf);
          const songT = (now - musicStart) / 1000;
          const kind = windowMode(planned, songT);
          const info = detectPitchInfo(buf, micCtx.sampleRate, kind);
          const f = info.freq;
          const need = (CLARITY[kind] || CLARITY.lead).min;
          if (f > 0 && info.clarity >= need) setHeard(Math.round(f) + ' Hz');
          planned.forEach(function (n, i) {
            if (hits[i] || f <= 0 || info.clarity < need) return;
            if (songT < n.start - 0.12 || songT > n.start + n.window) return;
            if (matchesAnyPitch(f, n.freqs || [n.freq], 70)) {
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
      clearTimeout(musicTimer);
      if (stopLesson) stopLesson();
      if (stream) stream.getTracks().forEach(function (t) { t.stop(); });
      try { if (micCtx) micCtx.close(); } catch (e) {}
      const hitN = hits.filter(Boolean).length;
      const score = Math.round((hitN / planned.length) * 100);
      const counts = mode === 'mic';
      const res = {
        score: score,
        passed: counts && score >= PASS_SCORE,
        gold: counts && score >= GOLD_SCORE,
        hits: hitN,
        total: planned.length,
        mode: mode,
        practiceOnly: !counts
      };
      setResult(res);
      setLiveHits(hitN);
      setPhase('done');
      stopRef.current = null;
      if (counts && props.onResult) props.onResult(res);
    }

    stopRef.current = function () {
      stopped = true;
      cancelAnimationFrame(raf);
      clearTimeout(musicTimer);
      if (stopLesson) stopLesson();
      if (stream) stream.getTracks().forEach(function (t) { t.stop(); });
      try { if (micCtx) micCtx.close(); } catch (e) {}
    };
    raf = requestAnimationFrame(tick);
  }

  return (
    <div className="playAlong skillTest">
      <p className="optLabel" style={{ margin: '0 0 6px' }}>Skill test</p>
      <div className="rowBetween">
        <h3>Play it on the guitar to move on</h3>
        {phase === 'idle' || phase === 'done' ? (
          <button className="btn primary sm" onClick={start}>{mode === 'mic' ? 'Start guitar test' : 'Practice tap'}</button>
        ) : (
          <button className="btn danger sm" onClick={halt}>Cancel</button>
        )}
      </div>
      <p className="muted sm">
        Guide track is quiet so the mic hears you. Play the guitar. {PASS_SCORE}% unlocks the next lesson.
      </p>
      <div className="optRow">
        <button className={'chipBtn' + (mode === 'mic' ? ' on' : '')} onClick={function () { setMode('mic'); }}>Guitar + mic (counts)</button>
        <button className={'chipBtn' + (mode === 'tap' ? ' on' : '')} onClick={function () { setMode('tap'); }}>Tap practice (no pass)</button>
      </div>
      {err ? <p className="warn">{err}</p> : null}
      {phase === 'count' ? <p className="okText">Count-in… get the guitar ready.</p> : null}
      {phase === 'play' && mode === 'mic' ? (
        <p className="okText">Listening to your guitar · {liveHits}/{total} · {heard}</p>
      ) : null}
      {phase === 'play' && mode === 'tap' ? (
        <button className="btn green wide" style={{ minHeight: 64, fontSize: '1.1rem' }} onClick={markTap}>
          Tap practice · {liveHits}/{total}
        </button>
      ) : null}
      {result ? (
        <div className={'pathResult' + (result.passed ? ' pass' : ' fail')}>
          <strong>{result.practiceOnly ? 'Practice ' + result.score + '%' : (result.passed ? 'Passed — ' + result.score + '%' : result.score + '%')}</strong>
          <span>{result.hits} of {result.total} {result.mode === 'mic' ? 'notes heard from the guitar' : 'practice taps'}</span>
          <span>{result.practiceOnly ? 'Tap practice does not unlock the next lesson.' : (result.passed ? 'You played it. Next lesson is open.' : 'Need ' + PASS_SCORE + '% from the guitar mic.')}</span>
        </div>
      ) : null}
    </div>
  );
}
