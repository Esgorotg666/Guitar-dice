import { useMemo, useState } from 'react';
import { UNITS, groupByUnit, filterLessons, levelAllowed, LEVELS } from '../lib/lessonCatalog';
import { lessonLockedReason, maxLessonLevel } from '../lib/entitlements';
import { isCleared } from '../lib/pathProgress';

const LEVEL_HINT = {
  entry: 'Free',
  intermediate: 'Premium',
  advanced: 'Extreme',
  master: 'Extreme'
};

export default function ClassroomFolders(props) {
  const all = props.lessons || [];
  const tier = props.tier || 'free';
  const progress = props.progress || { clears: {} };
  const allowedMax = maxLessonLevel(tier);
  const [level, setLevel] = useState(allowedMax === 'master' ? 'entry' : 'entry');
  const [openId, setOpenId] = useState('');

  const atLevel = useMemo(function () {
    return filterLessons(all, level);
  }, [all, level]);

  const groups = useMemo(function () {
    return groupByUnit(atLevel).map(function (g) {
      const lessons = g.lessons.filter(function (l) { return !l.capstone; });
      const caps = g.lessons.filter(function (l) { return l.capstone; });
      const done = lessons.filter(function (l) { return isCleared(progress, l.id); }).length;
      return Object.assign({}, g, { drills: lessons, finales: caps, done: done });
    }).filter(function (g) { return g.drills.length || g.finales.length; });
  }, [atLevel, progress]);

  return (
    <div className="classFolders">
      <p className="muted sm" style={{ margin: '0 0 8px' }}>
        Pick a level, open one folder, finish its lessons, then play the finale.
      </p>
      <div className="levelRow">
        {LEVELS.map(function (lv) {
          const ok = levelAllowed(lv, tier);
          return (
            <button
              key={lv}
              className={'chipBtn' + (level === lv ? ' on' : '') + (!ok ? ' lockedChip' : '')}
              onClick={function () {
                if (!ok) { if (props.onUpgrade) props.onUpgrade(); return; }
                setLevel(lv); setOpenId('');
              }}
            >
              {ok ? lv : lv + ' · ' + LEVEL_HINT[lv]}
            </button>
          );
        })}
      </div>
      {groups.map(function (g) {
        const open = openId === g.unit.id;
        const capReady = g.drills.length > 0 && g.done >= Math.max(1, g.drills.length - 0);
        return (
          <div key={g.unit.id} className="folderCard">
            <button className="folderHead" onClick={function () { setOpenId(open ? '' : g.unit.id); }}>
              <span>
                <strong>{g.unit.title}</strong>
                <small>{g.unit.blurb}</small>
              </span>
              <span className="folderMeta">{g.done}/{g.drills.length}{open ? ' ▲' : ' ▼'}</span>
            </button>
            {open ? (
              <div className="folderBody">
                {g.drills.map(function (l) {
                  const gate = lessonLockedReason(l, tier);
                  const cleared = isCleared(progress, l.id);
                  return (
                    <button
                      key={l.id}
                      className={'lessonItem' + (cleared ? ' cleared' : '')}
                      onClick={function () {
                        if (gate) { if (props.onUpgrade) props.onUpgrade(); return; }
                        props.onOpen(l);
                      }}
                    >
                      <div className="lessonTop">
                        <strong>{l.title}</strong>
                        <span className={'levelTag ' + (gate ? 'locked' : l.level)}>{gate ? 'upgrade' : (cleared ? 'done' : l.level)}</span>
                      </div>
                      <p className="lessonSummary">{l.summary}</p>
                    </button>
                  );
                })}
                {g.finales.map(function (l) {
                  const ready = capReady;
                  return (
                    <button
                      key={l.id}
                      className={'lessonItem finaleItem' + (!ready ? ' locked' : '')}
                      onClick={function () {
                        if (!ready) return;
                        props.onOpen(l);
                      }}
                    >
                      <div className="lessonTop">
                        <strong>Finale — {l.title}</strong>
                        <span className="levelTag">{ready ? 'play it' : 'locked'}</span>
                      </div>
                      <p className="lessonSummary">
                        {ready
                          ? l.summary
                          : 'Clear the lessons in this folder first. The finale uses all of them in one piece.'}
                      </p>
                    </button>
                  );
                })}
                {!g.finales.length ? (
                  <p className="muted sm">More finales for this folder are coming. Play the listed lessons as a set.</p>
                ) : null}
              </div>
            ) : null}
          </div>
        );
      })}
      {!groups.length ? <p className="muted sm">No lessons in this level yet for this style.</p> : null}
    </div>
  );
}
