import { useState, useEffect } from 'react';
import { practiceTip } from '../lib/style';

export default function PracticeWorkout(props) {
  const { style, skill, lessons, onOpenLesson, onGoRoll, streak } = props;
  const [today] = useState(new Date().toDateString());
  const [done, setDone] = useState(false);

  useEffect(function () {
    try {
      const raw = localStorage.getItem('gd-workout-' + today);
      if (raw) setDone(JSON.parse(raw).done);
    } catch (e) {}
  }, [today]);

  const tip = practiceTip(style);
  const nextLesson = (lessons || []).filter(function (l) { return l.level === skill || l.level === 'entry'; })[0];

  function markDone() {
    setDone(true);
    try { localStorage.setItem('gd-workout-' + today, JSON.stringify({ done: true, at: Date.now() })); } catch (e) {}
  }

  if (done) {
    return (
      <div className="card" style={{ borderColor: '#35c46b' }}>
        <h3>Today\u2019s practice \u2014 done</h3>
        <p className="muted sm">Nice work. Come back tomorrow or roll more chords if you want extra time.</p>
        <button className="btn ghost" onClick={function () { setDone(false); }}>Redo</button>
      </div>
    );
  }

  return (
    <div className="card">
      <h3>Today\u2019s practice</h3>
      <p className="muted sm">
        {streak && streak.currentStreak > 1 ? streak.currentStreak + '-day streak. ' : ''}
        10\u201315 minutes. One focused block beats an hour of noodling.
      </p>
      <ol className="stepList">
        <li><b>Warm-up (2 min)</b> \u2014 Open strings or spider 1-2-3-4. No tempo yet.</li>
        <li>
          <b>Lesson (5\u20137 min)</b> \u2014 {nextLesson
            ? <button className="linkish" onClick={function () { if (onOpenLesson) onOpenLesson(nextLesson); }}>Open: {nextLesson.title}</button>
            : 'Pick any Learn lesson in Classroom.'}
        </li>
        <li>
          <b>Apply with dice (5 min)</b> \u2014 Roll a progression. Strum it clean, then solo over it with the suggested scale.
          <button className="btn sm primary" style={{ marginLeft: 8 }} onClick={onGoRoll}>Go roll</button>
        </li>
        <li><b>Record one pass</b> \u2014 Phone only. Listen for the first mistake, fix it once, stop.</li>
      </ol>
      <p className="muted sm">{tip}</p>
      <button className="btn primary" onClick={markDone}>Mark today\u2019s practice done</button>
    </div>
  );
}
