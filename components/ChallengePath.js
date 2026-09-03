import { useState } from 'react';
import { BADGES, GOLD_SCORE, pathFor } from '../lib/path';
import { bestScore, earnedBadges, isCleared, isUnlocked, unlockedIndex } from '../lib/pathProgress';
import { LEVELS, filterLessons, groupByUnit, unitFor } from '../lib/lessonCatalog';

export default function ChallengePath(props) {
  const style = props.style || 'rhythm';
  const lessons = props.lessons || [];
  const progress = props.progress || { clears: {}, best: {}, badges: {} };
  const [level, setLevel] = useState('all');
  const [openUnit, setOpenUnit] = useState(null);
  const byId = {};
  lessons.forEach(function (l) { byId[l.id] = l; });
  const steps = pathFor(style).map(function (s) {
    const lesson = byId[s.id];
    return Object.assign({}, s, { lesson: lesson });
  }).filter(function (s) { return s.lesson; });
  const open = unlockedIndex(progress, style);
  const badges = earnedBadges(progress);
  const extra = lessons.filter(function (l) {
    return !steps.some(function (s) { return s.id === l.id; });
  });
  const visibleExtra = filterLessons(extra, level);
  const extraGroups = groupByUnit(visibleExtra);

  const pathBlocks = [];
  steps.forEach(function (s) {
    const u = unitFor(Object.assign({}, s.lesson, { skill: s.skill }));
    const last = pathBlocks[pathBlocks.length - 1];
    if (!last || last.unit.id !== u.id) pathBlocks.push({ unit: u, steps: [s] });
    else last.steps.push(s);
  });

  function openLesson(lesson) {
    if (lesson.gate) { if (props.onUpgrade) props.onUpgrade(); return; }
    if (!isUnlocked(progress, style, lesson.id, lesson.gate) && !isCleared(progress, lesson.id)) return;
    if (props.onOpen) props.onOpen(lesson.id);
  }

  function renderNode(s, i) {
    const l = s.lesson;
    const cleared = isCleared(progress, l.id);
    const unlocked = isUnlocked(progress, style, l.id, l.gate);
    const score = bestScore(progress, l.id);
    const idx = steps.indexOf(s);
    const current = idx === open && !cleared && unlocked && !l.gate;
    const cls = 'pathNode' + (cleared ? ' cleared' : '') + (current ? ' current' : '') + ((!unlocked || l.gate) ? ' locked' : '');
    return (
      <li key={l.id}>
        <button className={cls} onClick={function () { openLesson(l); }}>
          <span className="pathIdx">{cleared ? '✓' : (idx + 1)}</span>
          <span className="pathBody">
            <strong>{l.title}</strong>
            <small>{s.skill} · {l.level}{score ? ' · best ' + score + '%' : ''}{score >= GOLD_SCORE ? ' gold' : ''}</small>
          </span>
          <span className="pathLock">{l.gate ? 'upgrade' : (!unlocked ? 'locked' : (cleared ? 'replay' : 'play'))}</span>
        </button>
      </li>
    );
  }

  return (
    <div>
      <div className="card pathHero">
        <h3>Challenge path</h3>
        <p className="muted sm">
          Units run in order. Clear a node at {props.pass || 80}% to unlock the next one on this path.
          Paid gates still apply.
        </p>
        <div className="badgeRow">
          {BADGES.map(function (b) {
            const on = !!(progress.badges && progress.badges[b.id]);
            return (
              <span key={b.id} className={'badgeChip' + (on ? ' on' : '')} title={b.hint}>
                {on ? '★' : '○'} {b.name}
              </span>
            );
          })}
        </div>
        {badges.length ? <p className="muted sm">{badges.length} of {BADGES.length} badges earned on this device.</p> : null}
      </div>

      {pathBlocks.map(function (block) {
        return (
          <div key={block.unit.id} className="unitBlock">
            <div className="unitHead">
              <strong>{block.unit.title}</strong>
              <small>{block.unit.blurb}</small>
            </div>
            <ol className="pathList">
              {block.steps.map(function (s) { return renderNode(s); })}
            </ol>
          </div>
        );
      })}

      {extra.length ? (
        <div className="card">
          <h3>Practice room</h3>
          <p className="muted sm">Grouped by skill. These do not gate the path.</p>
          <div className="levelRow">
            <button className={'chipBtn' + (level === 'all' ? ' on' : '')} onClick={function () { setLevel('all'); }}>All</button>
            {LEVELS.map(function (lv) {
              return (
                <button key={lv} className={'chipBtn' + (level === lv ? ' on' : '')} onClick={function () { setLevel(lv); }}>
                  {lv}
                </button>
              );
            })}
          </div>
          {extraGroups.map(function (g) {
            const open = openUnit === g.unit.id || extraGroups.length === 1;
            return (
              <div key={g.unit.id} className="unitFold">
                <button className="unitToggle" onClick={function () { setOpenUnit(open && extraGroups.length > 1 ? null : g.unit.id); }}>
                  <span>
                    <strong>{g.unit.title}</strong>
                    <small>{g.lessons.length} lesson{g.lessons.length === 1 ? '' : 's'} · {g.unit.blurb}</small>
                  </span>
                  <span className="pathLock">{open ? 'hide' : 'show'}</span>
                </button>
                {open ? g.lessons.map(function (l) {
                  return (
                    <button key={l.id} className="lessonItem" onClick={function () { openLesson(l); }}>
                      <div className="lessonTop">
                        <strong>{l.title}</strong>
                        <span className={'levelTag ' + (l.gate ? 'locked' : l.level)}>{l.gate ? 'upgrade' : l.level}</span>
                      </div>
                      <p className="lessonSummary">{l.summary}</p>
                    </button>
                  );
                }) : null}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
