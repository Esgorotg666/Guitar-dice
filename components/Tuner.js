import { useEffect, useRef, useState } from 'react';
import { TUNINGS, tuningStrings, analysePitch, nearestInTuning, centsFromString } from '../lib/theory';
import { playFreq } from '../lib/audio';
import { detectPitchInfo } from '../lib/pitch';

export default function Tuner(props) {
  const startId = props.tuningId || 'standard';
  const a4 = Number(props.a4) > 0 ? Number(props.a4) : 440;
  const [tuningId, setTuningId] = useState(startId);
  const [listening, setListening] = useState(false);
  const [err, setErr] = useState('');
  const [reading, setReading] = useState(null);
  const [target, setTarget] = useState(null);
  const [cents, setCents] = useState(0);
  const [held, setHeld] = useState(0);
  const [doneStrings, setDoneStrings] = useState({});
  const streamRef = useRef(null);
  const ctxRef = useRef(null);
  const rafRef = useRef(null);
  const holdRef = useRef(0);
  const tuningRef = useRef(tuningStrings(startId, a4));

  useEffect(function () {
    if (props.tuningId && props.tuningId !== tuningId) setTuningId(props.tuningId);
  }, [props.tuningId]);

  const strings = tuningStrings(tuningId, a4);
  useEffect(function () { tuningRef.current = tuningStrings(tuningId, a4); setDoneStrings({}); }, [tuningId, a4]);
  useEffect(function () { return function () { stop(); }; }, []);

  function stop() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(function (t) { t.stop(); });
      streamRef.current = null;
    }
    if (ctxRef.current) { try { ctxRef.current.close(); } catch (e) {} ctxRef.current = null; }
    setListening(false); setReading(null); setTarget(null); setCents(0);
    holdRef.current = 0; setHeld(0);
  }

  async function start() {
    setErr('');
    if (typeof navigator === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setErr('This browser will not give the page microphone access.');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation:false, autoGainControl:false, noiseSuppression:false }
      });
      streamRef.current = stream;
      const C = window.AudioContext || window.webkitAudioContext;
      const c = new C();
      if (c.state === 'suspended') await c.resume();
      ctxRef.current = c;
      const src = c.createMediaStreamSource(stream);
      const analyser = c.createAnalyser();
      analyser.fftSize = 2048;
      src.connect(analyser);
      const buf = new Float32Array(analyser.fftSize);
      setListening(true);
      const tick = function () {
        analyser.getFloatTimeDomainData(buf);
        const info = detectPitchInfo(buf, c.sampleRate, 'tuner');
        if (info.freq > 0 && info.clarity >= 0.9) {
          const f = info.freq;
          setReading(analysePitch(f, a4));
          const str = nearestInTuning(f, tuningRef.current);
          setTarget(str);
          const cts = centsFromString(f, str);
          setCents(cts);
          if (str && Math.abs(cts) <= 5) {
            holdRef.current = Math.min(holdRef.current + 1, 40);
            if (holdRef.current > 15) {
              setDoneStrings(function (p) {
                if (p[str.idx]) return p;
                const n = Object.assign({}, p);
                n[str.idx] = true;
                return n;
              });
            }
          } else holdRef.current = 0;
          setHeld(holdRef.current);
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      tick();
    } catch (e) {
      const name = e && e.name ? e.name : '';
      if (name === 'NotAllowedError') setErr('Microphone permission was denied. Allow it in your browser settings and try again.');
      else if (name === 'NotFoundError') setErr('No microphone found on this device.');
      else setErr('Could not start the microphone. ' + (e && e.message ? e.message : ''));
      stop();
    }
  }

  const inTune = target && Math.abs(cents) <= 5;
  const needlePct = 50 + Math.max(-50, Math.min(50, cents));
  const preset = TUNINGS.filter(function (t) { return t.id === tuningId; })[0] || TUNINGS[0];
  const tunedCount = Object.keys(doneStrings).length;

  return (
    <div className="card">
      <div className="rowBetween">
        <h3>Tuner</h3>
        <button className={listening ? 'btn danger' : 'btn primary'} onClick={listening ? stop : start}>
          {listening ? 'Stop' : 'Start tuner'}
        </button>
      </div>

      <span className="optLabel">Tuning</span>
      <div className="optRow">
        {TUNINGS.map(function (t) {
          return (
            <button key={t.id} className={'chipBtn' + (tuningId === t.id ? ' on' : '')}
              onClick={function () { setTuningId(t.id); if (props.onTuning) props.onTuning(t.id); }}>{t.label}</button>
          );
        })}
      </div>
      <p className="muted sm" style={{ marginTop:8 }}>
        {preset.notes.join(' - ')}{tuningId !== 'standard' ? ' - low to high' : ''}
        {listening && tunedCount ? ' - ' + tunedCount + ' of 6 in tune' : ''}
      </p>

      {!listening && !err ? <p className="muted sm">Uses your microphone. The needle only moves on a clear single string (clarity 0.90).</p> : null}
      {err ? <p className="warn">{err}</p> : null}

      {listening ? (
        <div className="tuner">
          <div className={'tunerNote' + (inTune ? ' inTune' : '')}>
            {target ? target.name : (reading ? reading.note : '--')}
            {reading ? <small>{reading.octave}</small> : null}
          </div>
          <div className="tunerMeter">
            <div className="tunerZone" />
            <div className="tunerTicks">
              <span style={{ left:'0%' }}>-50</span><span style={{ left:'25%' }}>-25</span>
              <span style={{ left:'50%' }}>0</span><span style={{ left:'75%' }}>+25</span>
              <span style={{ left:'100%' }}>+50</span>
            </div>
            <div className={'tunerNeedle' + (inTune ? ' inTune' : '')} style={{ left:needlePct + '%' }} />
          </div>
          <div className="tunerStatus">
            {!reading ? <span className="muted">Play a single string...</span>
              : inTune ? <span className="okText">In tune{held > 12 ? ' - holding steady' : ''}</span>
                : <span className={cents < 0 ? 'flatText' : 'sharpText'}>
                    {cents < 0 ? 'Flat - tune up' : 'Sharp - tune down'} ({cents > 0 ? '+' : ''}{cents} cents)
                  </span>}
          </div>
          {reading ? (
            <p className="muted sm tunerHz">
              {reading.freq.toFixed(1)} Hz{target ? ' - target ' + target.label + ' at ' + target.freq + ' Hz' : ''}
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="stringRow">
        {strings.map(function (t) {
          const active = listening && target && target.idx === t.idx;
          const ok = doneStrings[t.idx];
          return (
            <button key={t.idx} className={'stringBtn' + (active ? ' active' : '') + (ok ? ' tuned' : '')}
              onClick={function () { playFreq(t.freq, t.idx, 3); }}>
              <b>{t.name}</b><small>{t.offset ? (t.offset > 0 ? '+' : '') + t.offset : 'std'}</small>
            </button>
          );
        })}
      </div>
      <p className="muted sm" style={{ marginTop:8 }}>Tap a string to hear its target pitch. Strings you get in tune stay marked green.</p>
    </div>
  );
}
