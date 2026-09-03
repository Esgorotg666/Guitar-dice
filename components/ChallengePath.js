import { BADGES, GOLD_SCORE, pathFor } from '../lib/path';
import { bestScore, earnedBadges, isCleared, isUnlocked, unlockedIndex } from '../lib/pathProgress';

export default function ChallengePath(props) {
  const style = props.style || 'rhythm';
  const lessons = props.lessons || [];
  const progress = props.progress || { clears: {}, best: {}, badges: {} };
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

  function openLesson(lesson) {
    if (lesson.gate) { if (props.onUpgrade) props.onUpgrade(); return; }
    if (!isUnlocked(progress, style, lesson.id, lesson.gate) && !isCleared(progress, lesson.id)) return;
    if (props.onOpen) props.onOpen(lesson.id);
  }

  return (
    <div>
      <div className="card pathHero">
        <h3>Challenge path</h3>
        <p className="muted sm">
          Clear each node by playing along at {props.pass || 80}% or better. Skills stack: the next lesson expects the last one.
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

      <ol className="pathList">
        {steps.map(function (s, i) {
          const l = s.lesson;
          const cleared = isCleared(progress, l.id);
          const unlocked = isUnlocked(progress, style, l.id, l.gate);
          const score = bestScore(progress, l.id);
          const current = i === open && !cleared && unlocked && !l.gate;
          const cls = 'pathNode' + (cleared ? ' cleared' : '') + (current ? ' current' : '') + ((!unlocked || l.gate) ? ' locked' : '');
          return (
            <li key={l.id}>
              <button className={cls} onClick={function () { openLesson(l); }}>
                <span className="pathIdx">{cleared ? '✓' : (i + 1)}</span>
                <span className="pathBody">
                  <strong>{l.title}</strong>
                  <small>{s.skill} · {l.level}{score ? ' · best ' + score + '%' : ''}{score >= GOLD_SCORE ? ' gold' : ''}</small>
                </span>
                <span className="pathLock">{l.gate ? 'upgrade' : (!unlocked ? 'locked' : (cleared ? 'replay' : 'play'))}</span>
              </button>
            </li>
          );
        })}
      </ol>

      {extra.length ? (
        <div className="card">
          <h3>Practice room</h3>
          <p className="muted sm">Not on this path. Still playable if your plan allows it. They do not gate the path.</p>
          {extra.map(function (l) {
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
}
