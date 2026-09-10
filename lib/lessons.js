import { CRAFTED_LESSONS } from './craftedLessons';
import { SKILL_LESSONS } from './skillsLessons';
import { VIB_LESSONS } from './vibLessons';
import { EXPERT_LESSONS } from './expertLessons';
import { HAND_DRILLS } from './handDrills';
import { CIRCLE_LESSONS } from './circleLessons';
import { HARMONY_LESSONS } from './harmonyLessons';
import { DOMINANT_LESSONS } from './dominantLessons';
import { DAY_ONE_LESSONS } from './dayOne';
import { BARRE_LESSONS } from './barreBasics';
import { CAPSTONE_LESSONS } from './capstoneLessons';
import { SHEET_LESSONS } from './sheetLessons';
import { PATH_CURRICULUM } from './pathCurriculum';
import { STUDY_LESSONS } from './studySheets';
import { BANK_LESSONS } from './catalogBank';
import { scaleCaption } from './scaleNotation';

const ORDER = ['entry','intermediate','advanced','master'];
const MIN_BEATS = 32;

const STYLE_GOALS = {
  lead: [
    'Get the shape under your fingers without looking at the board.',
    'Keep alternate picking even when you change strings.',
    'Make every note speak — no dead notes, no extra noise.'
  ],
  rhythm: [
    'Lock the right hand to a click so the groove does not drift.',
    'Change chords on time, not after the beat.',
    'Mute anything you are not supposed to hear.'
  ],
  acoustic: [
    'Keep the pattern going through the chord changes.',
    'Balance bass notes and treble so the guitar sounds full.',
    'Play it quietly and cleanly before you play it hard.'
  ]
};

function cloneNotes(notes) {
  return (notes || []).map(function (n) { return Object.assign({}, n); });
}

function fillBeats(notes, style) {
  return cloneNotes(notes).map(function (n) {
    if (n.beats === undefined) n.beats = style === 'lead' ? 0.5 : 1;
    return n;
  });
}

function sumBeats(notes) {
  var s = 0;
  (notes || []).forEach(function (n) { s += Number(n.beats) || 0; });
  return s;
}

function maxGroup(notes) {
  var m = 0;
  (notes || []).forEach(function (n) {
    if (n.group != null && n.group > m) m = n.group;
  });
  return m;
}

function shiftGroups(notes, by) {
  if (!by) return cloneNotes(notes);
  return (notes || []).map(function (n) {
    if (n.group == null) return Object.assign({}, n);
    return Object.assign({}, n, { group: n.group + by });
  });
}

function loopToMinBeats(notes, style) {
  var phrase = fillBeats(notes, style);
  if (!phrase.length) return phrase;
  var out = cloneNotes(phrase);
  var span = maxGroup(phrase) + 1;
  var guard = 0;
  while (sumBeats(out) < MIN_BEATS && guard < 8) {
    guard++;
    out = out.concat(shiftGroups(phrase, span * guard));
  }
  return out;
}

function extraSteps(lesson) {
  var bpm = lesson.bpm || 80;
  var half = Math.max(40, Math.round(bpm * 0.5));
  var threeQ = Math.max(50, Math.round(bpm * 0.75));
  var title = lesson.title || 'this';
  var key = lesson.key ? ' (written in ' + lesson.key + ')' : '';
  return [
    'Set a metronome to ' + half + ' BPM (half the written tempo) and play the example four times in a row with no stops.',
    'Say the beat out loud — 1, 2, 3, 4 — while you play. If you cannot talk and play, the part is not solid yet.',
    'Loop only the hardest two beats of the example until that slice is automatic, then put the whole phrase back together.',
    'When it is clean at half speed, move to ' + threeQ + ' BPM, then the written ' + bpm + ' BPM. Never jump more than 5–8 BPM at a time.',
    'Take ' + title + ' into one nearby key or position so you own the idea, not just these frets' + key + '.',
    'Record one pass on your phone. Listen for rushed notes, buzzing frets, and strings that keep ringing when they should be muted.',
    'Play the example once as written, then once with your own small variation — a rest, a repeat, or a different ending — so it starts to sound like music.'
  ];
}

function practicePlan(lesson) {
  var bpm = lesson.bpm || 80;
  return [
    '2 min — hands only, no tempo. Find every note and the fingering.',
    '4 min — metronome at ' + Math.max(40, Math.round(bpm * 0.5)) + ' BPM. Four clean loops.',
    '4 min — ' + Math.max(50, Math.round(bpm * 0.75)) + ' BPM, then written ' + bpm + ' BPM if it stays clean.',
    '2 min — one recorded take. Fix the first mistake you hear, then stop. Do not grind.'
  ];
}

function isGrouped(notes) {
  return (notes || []).some(function (n) { return n && n.group != null; });
}

function isChordChangeLesson(lesson) {
  return lesson && lesson.style !== 'lead' && Array.isArray(lesson.chords) && lesson.chords.length >= 2 && !isGrouped(lesson.notes);
}

function isStarter(lesson) {
  return lesson && (lesson.track === 'day1' || lesson.track === 'barre' || lesson.track === 'sheet' || lesson.track === 'path' || lesson.track === 'study' || lesson.capstone);
}

function soundingCount(lesson) {
  return ((lesson && lesson.notes) || []).filter(function (n) { return (Number(n.beats) || 0) > 0; }).length;
}

export function isThinLesson(lesson) {
  if (!lesson) return true;
  if (isStarter(lesson)) return false;
  if (isGrouped(lesson.notes)) return soundingCount(lesson) < 10;
  return soundingCount(lesson) < 12;
}

export function isDayOneLesson(lesson) {
  var id = String((lesson && lesson.id) || '');
  return (lesson && lesson.track === 'day1') || id.indexOf('day1-') === 0 || id.indexOf('cap-start') === 0;
}

export function enrichLesson(lesson) {
  if (!lesson) return lesson;
  var style = lesson.style || 'rhythm';
  var grouped = isGrouped(lesson.notes);
  var change = isChordChangeLesson(lesson);
  var cap = scaleCaption(lesson);
  var summary = (lesson.summary || '').replace(/\.+$/, '.');
  if (cap && summary.indexOf(cap) === -1) summary = cap + '. ' + summary;
  var extra = grouped
    ? ''
    : (change
      ? ' Hold each full chord shape, then change on the beat. Do not pick the dots one string at a time.'
      : ' Work this as a 10–12 minute block: learn the notes, loop them slow, then put the technique into a real phrase.');
  if (isStarter(lesson)) extra = '';
  if (extra && summary.indexOf('10–12 minute block') === -1 && summary.indexOf('full chord shape') === -1) summary += extra;
  var watch = lesson.watchFor || '';
  if (watch && watch.indexOf('drop the tempo') === -1 && !isStarter(lesson)) {
    watch = watch.replace(/\.+$/, '') + '. If a note dies or a string squeals, drop the tempo before you add speed.';
  }
  var seen = {};
  var steps = [];
  (lesson.steps || []).concat((grouped || isStarter(lesson)) ? [] : extraSteps(lesson)).forEach(function (s) {
    var k = String(s || '').trim().toLowerCase();
    if (!k || seen[k]) return;
    seen[k] = true;
    steps.push(s);
  });
  var notes = (lesson.track === 'sheet' || lesson.track === 'path' || lesson.track === 'study' || grouped)
    ? fillBeats(lesson.notes || [], style)
    : loopToMinBeats(lesson.notes || [], style);
  if (change && !grouped && notes[0]) notes[0] = Object.assign({}, notes[0], { chordKeys: lesson.chords.slice() });
  var beats = sumBeats(notes);
  var secs = Math.round(beats * 60 / (lesson.bpm || 80));
  return Object.assign({}, lesson, {
    summary: summary,
    notes: notes,
    steps: steps,
    watchFor: watch || lesson.watchFor,
    goals: lesson.goals && lesson.goals.length ? lesson.goals : (STYLE_GOALS[style] || STYLE_GOALS.rhythm),
    practicePlan: lesson.practicePlan && lesson.practicePlan.length ? lesson.practicePlan : practicePlan(lesson),
    scaleLabel: cap,
    runBeats: beats,
    runSeconds: secs
  });
}

export function mergeLessonLists(base, extra) {
  var map = {};
  var order = [];
  (base || []).concat(extra || []).concat(DAY_ONE_LESSONS).concat(BARRE_LESSONS).concat(PATH_CURRICULUM).concat(SHEET_LESSONS).concat(STUDY_LESSONS).concat(BANK_LESSONS).concat(CRAFTED_LESSONS).concat(SKILL_LESSONS).concat(VIB_LESSONS).concat(EXPERT_LESSONS).concat(HAND_DRILLS).concat(CIRCLE_LESSONS).concat(HARMONY_LESSONS).concat(DOMINANT_LESSONS).concat(CAPSTONE_LESSONS).forEach(function (l) {
    if (!l || !l.id) return;
    if (!map[l.id]) order.push(l.id);
    map[l.id] = l;
  });
  return order.map(function (id) { return map[id]; });
}

export function lessonsFor(all, style, genre, skill) {
  var mine = (all || []).filter(function (l) { return l.style === style; });
  mine = mine.filter(function (l) { return !isThinLesson(l); });
  if (skill && skill !== 'entry') {
    mine = mine.filter(function (l) { return !isDayOneLesson(l); });
  }
  const maxIdx = Math.max(0, ORDER.indexOf(skill));
  function rank(l) {
    const lvl = ORDER.indexOf(l.level);
    const id = String(l.id || '');
    const day1 = id.indexOf('day1-') === 0 ? 0 : (id.indexOf('barre-') === 0 ? 1 : 2);
    const path = id.indexOf('path-') === 0 || id.indexOf('sheet-') === 0 || id.indexOf('study-') === 0 ? 0 : 1;
    const neck = id.indexOf('neck-') === 0 ? 0 : 1;
    const crafted = isGrouped(l.notes) ? 0 : 1;
    return {
      reach: lvl > maxIdx ? 1 : 0,
      day1: day1,
      genre: l.genre === genre ? 0 : ((l.genre === 'any' || !l.genre) ? 1 : 2),
      neck: neck,
      path: path,
      crafted: crafted,
      lvl: lvl
    };
  }
  return mine.slice().sort(function (a, b) {
    const ra = rank(a), rb = rank(b);
    if (ra.day1 !== rb.day1) return ra.day1 - rb.day1;
    if (ra.path !== rb.path) return ra.path - rb.path;
    if (ra.reach !== rb.reach) return ra.reach - rb.reach;
    if (ra.crafted !== rb.crafted) return ra.crafted - rb.crafted;
    if (ra.neck !== rb.neck) return ra.neck - rb.neck;
    if (ra.genre !== rb.genre) return ra.genre - rb.genre;
    return ra.lvl - rb.lvl;
  });
}
export function isStretch(lesson, skill) {
  return ORDER.indexOf(lesson.level) > Math.max(0, ORDER.indexOf(skill));
}

export { sanitiseMusic } from './music';
