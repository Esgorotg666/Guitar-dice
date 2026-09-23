import { useEffect, useRef, useState } from 'react';
import { FACES, FACE_ORDER, facesForTier, nextFace, matchLessons } from '../lib/diceFaces';
import { scaleMenu, findScale, SCALE_ROOTS, randomScalePattern } from '../lib/scaleRun';
import { playSequence } from '../lib/audio';

const STORE = 'gd-dice-slots-v2';
const SCALE_STORE = 'gd-dice-scale-v1';

function loadSaved(fallback) {
  if (typeof window === 'undefined') return fallback || [];
  try {
    const raw = window.localStorage.getItem(STORE);
    const parsed = raw ? JSON.parse(raw) : null;
    if (Array.isArray(parsed) && parsed.length) return parsed;
  } catch (e) {}
  return fallback || [];
}

function saveSlots(slots) {
  try { window.localStorage.setItem(STORE, JSON.stringify(slots)); } catch (e) {}
}

function loadScalePick() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(SCALE_STORE);
    return raw ? JSON.parse(raw) : null;
  } catch (e) { return null; }
}

function saveScalePick(root, id) {
  try { window.localStorage.setItem(SCALE_STORE, JSON.stringify({ root:root, id:id })); } catch (e) {}
}

function Pips(props) {
  const n = props.n || 1;
  return (
    <span className="diePips" aria-hidden="true">
      {Array.from({ length: n }).map(function (_, i) { return <i key={i} />; })}
    </span>
  );
}

export default function DiceConfig(props) {
  const max = props.max || 2;
  const count = Math.max(2, props.count || 2);
  const allowed = facesForTier(props.tier || (props.allowBridge ? 'extreme' : 'free'), true);
  const [ownLessons, setOwnLessons] = useState([]);
  const [active, setActive] = useState(0);
  const [slots, setSlots] = useState(function () { return loadSaved(props.slots || []); });
  const lessons = (props.lessons && props.lessons.length) ? props.lessons : ownLessons;
  const nums = [];
  for (let i = 2; i <= max; i++) nums.push(i);

  const saved = loadScalePick();
  const [modes, setModes] = useState(props.modes || []);
  const [scaleRoot, setScaleRoot] = useState((saved && saved.root) || 'A');
  const [scaleId, setScaleId] = useState((saved && saved.id) || 'minor-pentatonic');
  const [pattern, setPattern] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [bpm, setBpm] = useState(90);
  const [audioWarn, setAudioWarn] = useState(false);
  const stopRef = useRef(null);

  const menu = scaleMenu(modes);
  const chosen = findScale(menu, scaleId);

  const shown = slots.slice(0, count);
  while (shown.length < count) shown.push('chord');
  const line = matchLessons(lessons, shown, props.genre);
  const activeFace = FACES[shown[active]] || FACES.chord;

  useEffect(function () {
    if (props.lessons && props.lessons.length) return;
    fetch('/data/lessons-v2.json').then(function (r) { return r.json(); }).then(function (d) {
      setOwnLessons((d && d.lessons) || []);
    }).catch(function () {});
  }, [props.lessons]);

  useEffect(function () {
    if (props.modes && props.modes.length) { setModes(props.modes); return; }
    fetch('/data/musicdata.json').then(function (r) { return r.json(); }).then(function (d) {
      setModes((d && d.modes) || []);
    }).catch(function () {});
  }, [props.modes]);

  useEffect(function () {
    return function () { if (stopRef.current) stopRef.current(); };
  }, []);

  function commit(next) {
    setSlots(next);
    saveSlots(next);
    if (props.onSlot) {
      next.forEach(function (s, i) {
        if (!props.slots || props.slots[i] !== s) props.onSlot(i, s);
      });
    }
  }

  function cycle(i) {
    const next = shown.slice();
    next[i] = nextFace(next[i], allowed);
    setActive(i);
    commit(next);
  }

  function setFace(id) {
    const i = Math.max(0, Math.min(active, shown.length - 1));
    const next = shown.slice();
    next[i] = id;
    commit(next);
  }

  function chooseScale(root, id) {
    setScaleRoot(root);
    setScaleId(id);
    saveScalePick(root, id);
    setPattern(null);
    if (stopRef.current) { stopRef.current(); stopRef.current = null; setPlaying(false); }
  }

  function rollScaleDie() {
    const root = SCALE_ROOTS[Math.floor(Math.random() * SCALE_ROOTS.length)];
    const s = menu[Math.floor(Math.random() * menu.length)];
    chooseScale(root, s.id);
  }

  async function playPattern() {
    if (playing) {
      if (stopRef.current) stopRef.current();
      stopRef.current = null;
      setPlaying(false);
      return;
    }
    if (!chosen) return;
    const res = randomScalePattern(scaleRoot, chosen, { bars: 4 });
    setPattern(res);
    if (!res.notes.length) return;
    setPlaying(true);
    setAudioWarn(false);
    const stop = await playSequence(res.notes, bpm, null, function (ok) {
      setPlaying(false);
      stopRef.current = null;
      if (!ok) setAudioWarn(true);
    });
    if (!stop) { setPlaying(false); setAudioWarn(true); return; }
    stopRef.current = stop;
  }

  return (
    <div className="card diceTray">
      <div className="rowBetween">
        <span className="optLabel">How many dice</span>
        <span className="muted sm">{count} of {max}</span>
      </div>
      <div className="optRow">
        {nums.map(function (n) {
          return (
            <button key={n} type="button" className={'chipBtn' + (count === n ? ' on' : '')} onClick={function () { props.onCount(n); }}>
              {n}
            </button>
          );
        })}
      </div>
      <div className="notice" style={{ marginTop: 10 }}>
        <span>
          Tap a die to select it, then tap it again to change the type — or pick a chip below.
          Die {active + 1} is set to <b>{activeFace.label}</b>.
        </span>
      </div>
      <div className="diceGrid">
        {shown.map(function (s, i) {
          const face = FACES[s] || FACES.chord;
          return (
            <button
              key={'die-' + i}
              type="button"
              className={'dieFace' + (active === i ? ' on' : '')}
              style={{ background: face.color }}
              onClick={function () { cycle(i); }}
            >
              <Pips n={face.pips} />
              <small>{face.label}</small>
            </button>
          );
        })}
      </div>
      <span className="optLabel" style={{ marginTop: 12, display: 'block' }}>Set die {active + 1}</span>
      <div className="optRow">
        {FACE_ORDER.filter(function (id) { return allowed.indexOf(id) >= 0; }).map(function (id) {
          const face = FACES[id];
          const on = shown[active] === id;
          return (
            <button
              key={id}
              type="button"
              className={'chipBtn' + (on ? ' on' : '')}
              style={{ borderColor: face.color }}
              onClick={function () { setFace(id); }}
            >
              {face.label}
            </button>
          );
        })}
      </div>

      <div className="scaleDie">
        <div className="rowBetween" style={{ marginTop: 18 }}>
          <span className="optLabel" style={{ margin: 0 }}>Scale</span>
          <button type="button" className="btn ghost sm" onClick={rollScaleDie}>Roll a scale</button>
        </div>
        <p className="muted sm" style={{ marginTop: 4 }}>
          Pick a scale, then hear it as a different random phrase every time. Practising a scale
          in a shape you cannot predict is what turns it from a pattern into something you actually know.
        </p>

        <span className="optLabel">Root</span>
        <div className="optRow">
          {SCALE_ROOTS.map(function (r) {
            return (
              <button key={r} type="button" className={'chipBtn' + (scaleRoot === r ? ' on' : '')}
                onClick={function () { chooseScale(r, scaleId); }}>{r}</button>
            );
          })}
        </div>

        <span className="optLabel">Scale</span>
        <div className="optRow">
          {menu.map(function (s) {
            return (
              <button key={s.id} type="button" className={'chipBtn' + (scaleId === s.id ? ' on' : '')}
                onClick={function () { chooseScale(scaleRoot, s.id); }}>{s.name}</button>
            );
          })}
        </div>

        {chosen ? (
          <div className="howto" style={{ marginTop: 10 }}>
            <b>{scaleRoot} {chosen.name}</b>
            {chosen.description ? ' — ' + chosen.description : ''}
            {chosen.degrees && chosen.degrees.length ? (
              <div className="degRow" style={{ marginTop: 8 }}>
                {chosen.degrees.map(function (dg) { return <span key={dg} className="deg">{dg}</span>; })}
              </div>
            ) : null}
          </div>
        ) : null}

        <div className="playRow">
          <button type="button" className={playing ? 'btn danger' : 'btn primary'} onClick={playPattern}>
            {playing ? 'Stop' : 'Play a random phrase'}
          </button>
          <div className="tempoBox">
            <button type="button" className="btn ghost sm" onClick={function () { setBpm(Math.max(50, bpm - 5)); }}>-</button>
            <span className="tempoVal"><b>{bpm}</b> BPM</span>
            <button type="button" className="btn ghost sm" onClick={function () { setBpm(Math.min(180, bpm + 5)); }}>+</button>
          </div>
        </div>

        {pattern && pattern.devices.length ? (
          <p className="muted sm" style={{ marginTop: 8 }}>
            That phrase used: {pattern.devices.join(', ')} — {pattern.notes.length} notes, landing on {scaleRoot}.
            Press again for a different one.
          </p>
        ) : null}
        {audioWarn ? <p className="warn">No sound? On iPhone the side silent switch mutes web audio — flick it to ring and try again.</p> : null}
      </div>

      {line.length ? (
        <div className="lessonLine">
          <span className="optLabel">Lesson line</span>
          {line.map(function (l) {
            const kind = shown.filter(function (s) { return s !== 'chord'; })[0] || 'lick';
            const face = FACES[kind] || FACES.lick;
            return (
              <button key={l.id} type="button" className="lessonLineItem" onClick={function () { if (props.onOpenLesson) props.onOpenLesson(l.id); }}>
                <span className="lessonLineIcon" style={{ background: face.color }}>{l.bpm || 80}</span>
                <span>
                  <strong>{l.title}</strong>
                  <p>{l.summary}</p>
                </span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
