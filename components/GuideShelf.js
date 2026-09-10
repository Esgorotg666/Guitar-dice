import { useEffect, useState } from 'react';
import { THEORY_GUIDES } from '../lib/theoryGuides';
import { TECH_GUIDES } from '../lib/techGuides';
import { guideLockedReason } from '../lib/entitlements';
import { fetchAppTier } from '../lib/resolveTier';
import LessonPlayer from './LessonPlayer';

function demoNotes(id) {
  if (id === 'th-notes' || id === 'th-major') {
    return [
      { string:4, fret:1, beats:0.5, pick:'D', group:0, role:'line', groupLabel:'C major' },
      { string:4, fret:3, beats:0.5, pick:'U', group:0, role:'line' },
      { string:5, fret:0, beats:0.5, pick:'D', group:0, role:'line' },
      { string:5, fret:1, beats:0.5, pick:'U', group:0, role:'line' },
      { string:5, fret:3, beats:0.5, pick:'D', group:0, role:'line' },
      { string:5, fret:5, beats:0.5, pick:'U', group:0, role:'line' },
      { string:5, fret:7, beats:0.5, pick:'D', group:0, role:'line' },
      { string:5, fret:8, beats:1, pick:'U', group:0, role:'line' }
    ];
  }
  if (id === 'th-intervals' || id === 'th-chords') {
    return [
      { string:0, fret:0, beats:1, pick:'D', group:0, role:'line', groupLabel:'Root E' },
      { string:0, fret:3, beats:1, pick:'D', group:1, role:'line', groupLabel:'Minor 3rd' },
      { string:0, fret:4, beats:1, pick:'D', group:2, role:'line', groupLabel:'Major 3rd' },
      { string:0, fret:7, beats:1, pick:'D', group:3, role:'line', groupLabel:'Fifth' }
    ];
  }
  if (id === 'th-circle' || id === 'th-diatonic') {
    return [
      { string:0, fret:3, beats:1, pick:'D', group:0, role:'line', groupLabel:'G' },
      { string:1, fret:3, beats:1, pick:'D', group:1, role:'line', groupLabel:'C' },
      { string:1, fret:5, beats:1, pick:'D', group:2, role:'line', groupLabel:'D' },
      { string:0, fret:3, beats:1, pick:'D', group:3, role:'line', groupLabel:'G home' }
    ];
  }
  return null;
}

function groupGuides(list) {
  const order = [];
  const map = {};
  (list || []).forEach(function (g) {
    const u = g.unit || 'Guides';
    if (!map[u]) { map[u] = []; order.push(u); }
    map[u].push(g);
  });
  return order.map(function (u) { return { unit: u, guides: map[u] }; });
}

export default function GuideShelf(props) {
  const kind = props.kind === 'tech' ? 'tech' : 'theory';
  const list = kind === 'tech' ? TECH_GUIDES : THEORY_GUIDES;
  const [tier, setTier] = useState(props.tier || 'free');
  const [openId, setOpenId] = useState(null);
  const open = list.filter(function (g) { return g.id === openId; })[0];

  useEffect(function () {
    fetchAppTier(props.tier).then(function (info) { setTier(info.tier); });
  }, [props.tier]);

  if (open) {
    const gate = guideLockedReason(open, tier);
    const demo = open.notes || demoNotes(open.id);
    return (
      <div>
        <button className="backBtn" onClick={function () { setOpenId(null); }}>Back to {kind === 'tech' ? 'tech' : 'theory'}</button>
        <div className="card">
          <div className="lessonTop">
            <strong style={{ fontSize:'1.1rem' }}>{open.title}</strong>
            <span className={'levelTag ' + open.level}>{open.level}</span>
          </div>
          <p className="lessonSummary">{open.summary}</p>
          {gate ? (
            <div className="lockNote">
              <b>{gate}</b>
              <div><button className="btn sm primary" style={{ marginTop:10 }} onClick={props.onUpgrade}>See plans</button></div>
            </div>
          ) : (
            <div>
              <ol className="stepList">{(open.steps || []).map(function (s, i) { return <li key={i}>{s}</li>; })}</ol>
              {open.watchFor ? <div className="watchFor"><strong>Watch for</strong>{open.watchFor}</div> : null}
              {demo ? (
                <div style={{ marginTop:16 }}>
                  <p className="muted sm">Play this on the board. This page is not only text.</p>
                  <LessonPlayer notes={demo} bpm={open.bpm || 72} />
                </div>
              ) : null}
              {kind === 'tech' ? (
                <p className="muted sm" style={{ marginTop:14 }}>
                  This is setup and wiring education for your own instrument. Unplug first. If a rod, knife edge, or solder joint feels wrong, stop and take it to a bench.
                </p>
              ) : null}
            </div>
          )}
        </div>
      </div>
    );
  }

  const groups = groupGuides(list);
  return (
    <div>
      <div className="card pathHero">
        <h3>{kind === 'tech' ? 'Guitar tech' : 'Music theory'}</h3>
        <p className="muted sm">
          {kind === 'tech'
            ? 'Setup, tuning stability, Floyd Rose, pickup height, pots, toggles, and EMG. Open a page and work the steps on your own guitar.'
            : 'Notes, intervals, scales, chords, circle of fifths, modes, ii-V-I, and jazz harmony. Open a page — foundations include a playable fretboard example.'}
        </p>
      </div>
      {groups.map(function (g) {
        return (
          <div key={g.unit} className="unitBlock">
            <div className="unitHead">
              <strong>{g.unit}</strong>
              <small>{g.guides.length} guide{g.guides.length === 1 ? '' : 's'}</small>
            </div>
            {g.guides.map(function (item) {
              const gate = guideLockedReason(item, tier);
              return (
                <button key={item.id} className="lessonItem" onClick={function () { setOpenId(item.id); }}>
                  <div className="lessonTop">
                    <strong>{item.title}</strong>
                    <span className={'levelTag ' + (gate ? 'locked' : item.level)}>{gate ? 'upgrade' : item.level}</span>
                  </div>
                  <p className="lessonSummary">{item.summary}</p>
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
