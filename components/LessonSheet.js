export default function LessonSheet(props) {
  const lesson = props.lesson;
  if (!lesson) return null;
  const sheet = lesson.sheet || {};
  const focus = sheet.focus || (lesson.goals || []).slice(0, 4).join(', ');
  const advice = sheet.advice || lesson.practicePlan || [];
  const groups = [];
  const seen = {};
  (lesson.notes || []).forEach(function (n) {
    if (n.group == null) return;
    if (seen[n.group] != null) return;
    seen[n.group] = true;
    groups.push({ id: n.group, label: n.groupLabel || (n.role === 'chord' ? 'Chord' : 'Line'), role: n.role || 'line' });
  });
  return (
    <div className="sheetHead">
      <p className="sheetKicker">Guitar lesson · {lesson.level}</p>
      <h2>{lesson.title}</h2>
      <div className="sheetMeta">
        <span>Level: {lesson.level}</span>
        <span>Focus: {focus}</span>
        <span>Key {lesson.key} · {lesson.bpm} BPM</span>
      </div>
      <p className="lessonSummary">{lesson.summary}</p>
      {groups.length ? (
        <ol className="sheetIndex">
          {groups.map(function (g, i) {
            return <li key={g.id}><b>{i + 1}.</b> {g.label}{g.role === 'chord' ? ' — hold the full shape' : ' — play the run in order'}</li>;
          })}
        </ol>
      ) : null}
      {advice.length ? (
        <div className="sheetAdvice">
          <strong>Practice advice</strong>
          <ul>{advice.map(function (a, i) { return <li key={i}>{a}</li>; })}</ul>
        </div>
      ) : null}
    </div>
  );
}
