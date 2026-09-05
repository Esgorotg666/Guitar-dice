import { useEffect, useState } from 'react';
import { FACES, FACE_ORDER, facesForTier, nextFace, matchLessons } from '../lib/diceFaces';

const STORE = 'gd-dice-slots-v2';

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

  const shown = slots.slice(0, count);
  while (shown.length < count) shown.push('chord');
  const line = matchLessons(lessons, shown, props.genre);

  useEffect(function () {
    if (props.lessons && props.lessons.length) return;
    fetch('/data/lessons-v2.json').then(function (r) { return r.json(); }).then(function (d) {
      setOwnLessons((d && d.lessons) || []);
    }).catch(function () {});
  }, [props.lessons]);

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
      <p className="muted sm" style={{ marginTop: 10 }}>Tap a die to cycle it. Or tap a type below to set the highlighted die.</p>
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
              onClick={function () { setActive(active); setFace(id); }}
            >
              {face.label}
            </button>
          );
        })}
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
