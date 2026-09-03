import { useState } from 'react';
import { THEORY_GUIDES } from '../lib/theoryGuides';
import { TECH_GUIDES } from '../lib/techGuides';
import { guideLockedReason } from '../lib/entitlements';

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
  const tier = props.tier || 'free';
  const [openId, setOpenId] = useState(null);
  const open = list.filter(function (g) { return g.id === openId; })[0];

  if (open) {
    const gate = guideLockedReason(open, tier);
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
            ? 'Setup, tuning stability, Floyd Rose, pickup height, pots, toggles, and EMG. Entry pages are free. Wiring and Floyd/EMG are on paid plans.'
            : 'Notes, intervals, scales, chords, the circle, modes, and ii-V-I. Read a page, then use the matching classroom unit.'}
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
