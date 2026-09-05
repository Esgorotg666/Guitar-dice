import { pathFor } from './path';
import { isCleared } from './pathProgress';

const WARMUPS = {
  lead: 'Chromatic 1-2-3-4 on one string, 60 seconds, clean fretting.',
  rhythm: 'Muted 8th-note chuck on the E string, 60 seconds, even right hand.',
  acoustic: 'Open-string i-m alternation, 60 seconds, thumb stays on D-A-E.'
};

export function dailySession(opts) {
  const style = (opts && opts.style) || 'rhythm';
  const lessons = opts && opts.lessons || [];
  const progress = opts && opts.progress || { clears: {} };
  const steps = pathFor(style);
  let next = null;
  for (let i = 0; i < steps.length; i++) {
    const hit = lessons.filter(function (l) { return l.id === steps[i].id; })[0];
    if (hit && !hit.gate && !isCleared(progress, hit.id)) {
      next = hit;
      break;
    }
  }
  if (!next) {
    next = lessons.filter(function (l) { return !l.gate && !isCleared(progress, l.id); })[0] || lessons[0] || null;
  }
  const day1 = next && String(next.id || '').indexOf('day1-') === 0;
  const day = new Date().toISOString().slice(0, 10);
  return {
    day: day,
    minutes: day1 ? 12 : 8,
    warmup: day1 ? 'Sit, shake the picking hand out, check the tuner.' : (WARMUPS[style] || WARMUPS.rhythm),
    diceLine: day1 ? 'Skip the dice until Em and G both sound.' : 'Roll once in your genre. Play the changes for 2 minutes at a tempo you can keep.',
    lesson: next,
    blocks: day1 ? [
      { min: 2, title: 'Sit and tune', detail: 'Hold the guitar. Open Tools and tune if you have not today.' },
      { min: 8, title: next ? next.title : 'Day 1', detail: next ? (next.summary || 'One Day 1 step only.') : 'Open Class and start Hold the guitar.' },
      { min: 2, title: 'Stop', detail: 'Put the guitar down. Fingertips will be tender. That is enough.' }
    ] : [
      { min: 1, title: 'Warm-up', detail: WARMUPS[style] || WARMUPS.rhythm },
      { min: 2, title: 'Dice changes', detail: 'One roll. Loop it. Name the chords out loud.' },
      { min: 5, title: next ? next.title : 'Open classroom', detail: next ? (next.summary || 'Play along at 70%, then written speed.') : 'Open Class and take the next unlocked node.' }
    ]
  };
}
