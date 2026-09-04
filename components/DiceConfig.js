import { useEffect, useState } from 'react';
import { FACES, facesForTier, nextFace, matchLessons } from '../lib/diceFaces';

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
  const count = props.count || 2;
  const slots = props.slots || [];
  const allowed = facesForTier(props.tier || (props.allowBridge ? 'extreme' : 'free'), props.allowBridge);
  const [ownLessons, setOwnLessons] = useState([]);
  const lessons = (props.lessons && props.lessons.length) ? props.lessons : ownLessons;
  const nums = [];
  for (let i = 2; i <= max; i++) nums.push(i);
  const line = matchLessons(lessons, slots, props.genre);

  useEffect(function () {
    if (props.lessons && props.lessons.length) return;
    fetch('/data/lessons-v2.json').then(function (r) { return r.json(); }).then(function (d) {
      setOwnLessons((d && d.lessons) || []);
    }).catch(function () {});
  }, [props.lessons]);

  return (
    <div className="card diceTray">
      <div className="rowBetween">
        <span className="optLabel">How many dice</span>
        <span className="muted sm">{count} of {max}</span>
      </div>
      <div className="optRow">
        {nums.map(function (n) {
          return (
            <button key={n} className={'chipBtn' + (count === n ? ' on' : '')} onClick={function () { props.onCount(n); }}>
              {n}
            </button>
          );
        })}
      </div>
      <div className="diceGrid">
        {slots.map(function (s, i) {
          const face = FACES[s] || FACES.chord;
          return (
            <button
              key={i}
              className="dieFace"
              style={{ background: face.color }}
              onClick={function () { props.onSlot(i, nextFace(s, allowed)); }}
            >
              <Pips n={face.pips} />
              <small>{face.label}</small>
            </button>
          );
        })}
      </div>
      <p className="muted sm" style={{ marginTop: 10 }}>
        Tap a die to change what it rolls — chord, scale, arpeggio, lick, rhythm, strum, solo. The lesson line under the tray follows those faces.
      </p>
      {line.length ? (
        <div className="lessonLine">
          <span className="optLabel">Lesson line</span>
          {line.map(function (l) {
            const kind = slots.filter(function (s) { return s !== 'chord'; })[0] || 'lick';
            const face = FACES[kind] || FACES.lick;
            return (
              <button key={l.id} className="lessonLineItem" onClick={function () { if (props.onOpenLesson) props.onOpenLesson(l.id); }}>
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
