import { useState } from 'react';
import { BADGES, GOLD_SCORE, pathFor } from '../lib/path';
import { bestScore, earnedBadges, isCleared, isUnlocked, unlockedIndex } from '../lib/pathProgress';
import { LEVELS, filterLessons, groupByUnit, planFor, unitFor } from '../lib/lessonCatalog';

function UnitPlanCard(props) {
  const plan = planFor(props.unit);
  if (!plan) return null;
  const start = props.startLesson;
  return (
    <div className="unitPlan">
      <div className="unitPlanMeta">
        <span>{plan.minutes} min</span>
        <span>{plan.bpm} BPM</span>
      </div>
      <ol>
        {(plan.blocks || []).map(function (b, i) {
          return <li key={i}>{b}</li>;
        })}
      </ol>
      {plan.stop ? <p className="unitPlanStop">{plan.stop}</p> : null}
      {start && props.onStart ? (
        <button className="btn sm ghost unitPlanGo" onClick={function () { props.onStart(start); }}>
          Start with {start.title}
        </button>
      ) : null}
    </div>
  );
}

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

  function startLessonFor(unit, fallbackList) {
    const plan = planFor(unit);
    if (plan && plan.startId && byId[plan.startId]) return byId[plan.startId];
    const list = fallbackList || [];
    return list[0] && list[0].lesson ? list[0].lesson : list[0];
  }

  function openLesson(lesson) {
    if (!lesson) return;
    if (lesson.gate) { if (props.onUpgrade) props.onUpgrade(); return; }
    if (!isUnlocked(progress, style, lesson.id, lesson.gate) && !isCleared(progress, lesson.id)) return;
    if (props.onOpen) props.onOpen(lesson.id);
  }

  function renderNode(s) {
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
          <span className="pathIdx">{cleared ? '\u2713' : (idx + 1)}</span>
          <span className="pathBody">
            <strong>{l.title}</strong>
            <small>{s.skill} \u00b7 {l.level}{score ? ' \u00b7 best ' + score + '%' : ''}{score >= GOLD_SCORE ? ' gold' : ''}</small>
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
          Units run in order. Each header is a 12-minute session. Clear a node at {props.pass || 80}% to unlock the next one.
          Paid gates still apply.
        </p>
        <div className="badgeRow">
          {BADGES.map(function (b) {
            const on = !!(progress.badges && progress.badges[b.id]);
            return (
              <span key={b.id} className={'badgeChip' + (on ? ' on' : '')} title={b.hint}>
                {on ? '\u2605' : '\u25cb'} {b.name}
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
            <UnitPlanCard
              unit={block.unit}
              startLesson={startLessonFor(block.unit, block.steps)}
              onStart={openLesson}
            />
            <ol className="pathList">
              {block.steps.map(function (s) { return renderNode(s); })}
            </ol>
          </div>
        );
      })}

      {extra.length ? (
        <div className="card">
          <h3>Practice room</h3>
          <p className="muted sm">Same units, extra drills. They do not gate the path.</p>
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
            const shown = openUnit === g.unit.id || extraGroups.length === 1;
            return (
              <div key={g.unit.id} className="unitFold">
                <button className="unitToggle" onClick={function () { setOpenUnit(shown && extraGroups.length > 1 ? null : g.unit.id); }}>
                  <span>
                    <strong>{g.unit.title}</strong>
                    <small>{g.lessons.length} lesson{g.lessons.length === 1 ? '' : 's'} \u00b7 {g.unit.blurb}</small>
                  </span>
                  <span className="pathLock">{shown ? 'hide' : 'show'}</span>
                </button>
                {shown ? (
                  <div>
                    <UnitPlanCard
                      unit={g.unit}
                      startLesson={startLessonFor(g.unit, g.lessons)}
                      onStart={openLesson}
                    />
                    {g.lessons.map(function (l) {
                      return (
                        <button key={l.id} className="lessonItem" onClick={function () { openLesson(l); }}>
                          <div className="lessonTop">
                            <strong>{l.title}</strong>
                            <span className={'levelTag ' + (l.gate ? 'locked' : l.level)}>{l.gate ? 'upgrade' : l.level}</span>
                          </div>
                          <p className="lessonSummary">{l.summary}</p>
                        </button>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
