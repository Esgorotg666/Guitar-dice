import { useEffect, useState } from 'react';
import LessonPlayer from './LessonPlayer';
import PlayAlong from './PlayAlong';
import ChallengePath from './ChallengePath';
import ChordDiagram from './ChordDiagram';
import GuideShelf from './GuideShelf';
import LessonPictures from './LessonPictures';
import LessonSheet from './LessonSheet';
import ClassroomFolders from './ClassroomFolders';
import { chordColor, voicingLabel } from '../lib/theory';
import { placementLines } from '../lib/chordFingers';
import { strumChord } from '../lib/audio';
import { PASS_SCORE } from '../lib/path';
import { recordAttempt } from '../lib/pathProgress';
import { bestTier } from '../lib/entitlements';

export default function ClassroomTab(props) {
  const lessons = props.lessons || [];
  const lesson = props.lesson;
  const data = props.data;
  const style = props.style;
  const progress = props.progress;
  const setProgress = props.setProgress;
  const lessonFile = props.lessonFile || {};
  const [shelf, setShelf] = useState('class');
  const [showSteps, setShowSteps] = useState(false);
  const [liveTier, setLiveTier] = useState(props.tier || 'free');

  useEffect(function () {
    var alive = true;
    fetch('/api/billing/status', { credentials: 'include' })
      .then(function (r) { return r.json(); })
      .then(function (b) {
        if (!alive) return;
        setLiveTier(bestTier(props.tier, b && b.tier));
      })
      .catch(function () {});
    return function () { alive = false; };
  }, [props.tier]);

  const tier = bestTier(props.tier, liveTier);

  const nav = (
    <div className="levelRow learnNav">
      <button className={'chipBtn' + (shelf === 'class' ? ' on' : '')} onClick={function () { setShelf('class'); }}>Classroom</button>
      <button className={'chipBtn' + (shelf === 'theory' ? ' on' : '')} onClick={function () { setShelf('theory'); }}>Theory</button>
      <button className={'chipBtn' + (shelf === 'tech' ? ' on' : '')} onClick={function () { setShelf('tech'); }}>Tech</button>
      <button className={'chipBtn' + (shelf === 'path' ? ' on' : '')} onClick={function () { setShelf('path'); }}>Challenge</button>
    </div>
  );

  if (lesson) {
    return (
      <div>
        <button className="backBtn" onClick={function () { props.onBack(); }}>Back to folders</button>
        <div className="card sheetCard">
          <LessonSheet lesson={lesson} />
          <LessonPictures lesson={lesson} />
          <LessonPlayer notes={lesson.notes} bpm={lesson.bpm}
            legend={lessonFile.legend} legendOrder={lessonFile.legendOrder} />
          {lesson.chords && data ? (
            <div className="chordRow" style={{ marginTop: 12 }}>
              {lesson.chords.map(function (k, i) {
                const c = data.chords[k] ? Object.assign({ key: k }, data.chords[k]) : null;
                if (!c) return null;
                const col = chordColor(i);
                const lines = placementLines(c);
                return (
                  <div key={k} className="chordCard" style={{ borderColor:col.dot }} onClick={function () { strumChord(c.positions, true); }}>
                    <strong>{c.name}</strong>
                    <span className="chordPos">{voicingLabel(c)}</span>
                    <ChordDiagram chord={c} accent={col} />
                    {lines.length ? (
                      <ul className="muted sm" style={{ textAlign:'left', marginTop:8 }}>
                        {lines.slice(0, 4).map(function (line) { return <li key={line}>{line}</li>; })}
                      </ul>
                    ) : null}
                  </div>
                );
              })}
            </div>
          ) : null}
          <PlayAlong notes={lesson.notes} bpm={lesson.bpm} onResult={function (res) {
            const next = recordAttempt(progress, lesson.id, style, res.score);
            setProgress(next);
          }} />
          <button className="btn ghost wide" style={{ marginTop: 10 }} onClick={function () { setShowSteps(!showSteps); }}>
            {showSteps ? 'Hide steps' : 'How to practice this'}
          </button>
          {showSteps ? (
            <div>
              <ol className="stepList">{(lesson.steps || []).map(function (s, i) { return <li key={i}>{s}</li>; })}</ol>
              {lesson.watchFor ? <div className="watchFor"><strong>Watch for</strong>{lesson.watchFor}</div> : null}
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div>
      {nav}
      {shelf === 'theory' ? <GuideShelf kind="theory" tier={tier} onUpgrade={props.onUpgrade} /> : null}
      {shelf === 'tech' ? <GuideShelf kind="tech" tier={tier} onUpgrade={props.onUpgrade} /> : null}
      {shelf === 'path' ? (
        <ChallengePath
          style={style}
          skill={props.skill}
          lessons={lessons}
          progress={progress}
          pass={PASS_SCORE}
          onOpen={props.onOpen}
          onUpgrade={props.onUpgrade}
        />
      ) : null}
      {shelf === 'class' ? (
        <ClassroomFolders
          lessons={lessons}
          tier={tier}
          progress={progress}
          onOpen={props.onOpen}
          onUpgrade={props.onUpgrade}
        />
      ) : null}
    </div>
  );
}
