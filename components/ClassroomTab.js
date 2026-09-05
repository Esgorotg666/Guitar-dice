import { useState } from 'react';
import LessonPlayer from './LessonPlayer';
import LessonAB from './LessonAB';
import PlayAlong from './PlayAlong';
import ChallengePath from './ChallengePath';
import ChordDiagram from './ChordDiagram';
import GuideShelf from './GuideShelf';
import DailySession from './DailySession';
import LessonPictures from './LessonPictures';
import { chordColor, voicingLabel } from '../lib/theory';
import { strumChord } from '../lib/audio';
import { PASS_SCORE } from '../lib/path';
import { recordAttempt } from '../lib/pathProgress';

export default function ClassroomTab(props) {
  const lessons = props.lessons || [];
  const lesson = props.lesson;
  const data = props.data;
  const style = props.style;
  const progress = props.progress;
  const setProgress = props.setProgress;
  const lessonFile = props.lessonFile || {};
  const [shelf, setShelf] = useState('path');

  const nav = (
    <div className="levelRow learnNav">
      <button className={'chipBtn' + (shelf === 'path' ? ' on' : '')} onClick={function () { setShelf('path'); }}>Path</button>
      <button className={'chipBtn' + (shelf === 'theory' ? ' on' : '')} onClick={function () { setShelf('theory'); }}>Theory</button>
      <button className={'chipBtn' + (shelf === 'tech' ? ' on' : '')} onClick={function () { setShelf('tech'); }}>Tech</button>
    </div>
  );

  if (lesson) {
    return (
      <div>
        <button className="backBtn" onClick={function () { props.onBack(); }}>Back to path</button>
        <div className="card">
          <div className="lessonTop">
            <strong style={{ fontSize:'1.1rem' }}>{lesson.title}</strong>
            <span className={'levelTag ' + lesson.level}>{lesson.level}</span>
          </div>
          <p className="lessonKey">Key: {lesson.key} - written at {lesson.bpm} BPM{lesson.genre && lesson.genre !== 'any' ? ' - ' + lesson.genre : ''}</p>
          <p className="lessonSummary">{lesson.summary}</p>
          <LessonPictures lesson={lesson} />
          {lesson.goals && lesson.goals.length ? (
            <div className="lessonGoals">
              <h3>What you will get from this</h3>
              <ul>{lesson.goals.map(function (g, i) { return <li key={i}>{g}</li>; })}</ul>
            </div>
          ) : null}
          <LessonPlayer notes={lesson.notes} bpm={lesson.bpm}
            legend={lessonFile.legend} legendOrder={lessonFile.legendOrder} />
          <LessonAB notes={lesson.notes} bpm={lesson.bpm} />
          <PlayAlong notes={lesson.notes} bpm={lesson.bpm} onResult={function (res) {
            const next = recordAttempt(progress, lesson.id, style, res.score);
            setProgress(next);
          }} />
          <div className="howto">
            <b>Pass the node:</b> loop the hard bar at 70%, then Play along. Tap timing or mic. {PASS_SCORE}% unlocks the next node.
          </div>
          <h3 style={{ marginTop:20 }}>How to play it</h3>
          <ol className="stepList">{(lesson.steps || []).map(function (s, i) { return <li key={i}>{s}</li>; })}</ol>
          {lesson.watchFor ? <div className="watchFor"><strong>Watch for</strong>{lesson.watchFor}</div> : null}
          {lesson.chords && data ? (
            <div style={{ marginTop:18 }}>
              <h3>Chord shapes used</h3>
              <div className="chordRow">
                {lesson.chords.map(function (k, i) {
                  const c = data.chords[k];
                  if (!c) return null;
                  const col = chordColor(i);
                  return (
                    <div key={k} className="chordCard" style={{ borderColor:col.dot }} onClick={function () { strumChord(c.positions, true); }}>
                      <strong>{c.name}</strong>
                      <span className="chordPos">{voicingLabel(c)}</span>
                      <ChordDiagram chord={c} accent={col} />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div>
      {nav}
      {shelf === 'theory' ? <GuideShelf kind="theory" tier={props.tier} onUpgrade={props.onUpgrade} /> : null}
      {shelf === 'tech' ? <GuideShelf kind="tech" tier={props.tier} onUpgrade={props.onUpgrade} /> : null}
      {shelf === 'path' ? (
        <div>
          <DailySession
            style={style}
            lessons={lessons}
            progress={progress}
            onOpenLesson={props.onOpen}
            onRoll={props.onGoRoll}
          />
          <ChallengePath
            style={style}
            lessons={lessons}
            progress={progress}
            pass={PASS_SCORE}
            onOpen={props.onOpen}
            onUpgrade={props.onUpgrade}
          />
        </div>
      ) : null}
    </div>
  );
}
