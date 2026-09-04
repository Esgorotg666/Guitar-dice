import { dailySession } from '../lib/dailySession';

export default function DailySession(props) {
  const ses = dailySession({
    style: props.style,
    lessons: props.lessons || [],
    progress: props.progress
  });

  return (
    <div className="card pathHero">
      <div className="rowBetween">
        <h3>Today — 8 minutes</h3>
        <span className="tagAmber">{ses.day}</span>
      </div>
      <p className="muted sm">Warm-up, one dice loop, one path lesson. That is a full session.</p>
      <ol className="stepList">
        {ses.blocks.map(function (b, i) {
          return (
            <li key={i}>
              <b>{b.min} min · {b.title}.</b> {b.detail}
            </li>
          );
        })}
      </ol>
      <div className="playRow" style={{ marginTop: 12 }}>
        <button className="btn primary" onClick={function () { if (props.onRoll) props.onRoll(); }}>
          Start with a roll
        </button>
        {ses.lesson ? (
          <button className="btn green" onClick={function () {
            if (props.onOpenLesson) props.onOpenLesson(ses.lesson.id);
          }}>
            Open {ses.lesson.title}
          </button>
        ) : null}
      </div>
    </div>
  );
}
