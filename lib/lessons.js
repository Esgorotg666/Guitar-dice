const ORDER = ['entry','intermediate','advanced','master'];

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

function expandNotes(notes, style) {
  var phrase = fillBeats(notes, style);
  if (!phrase.length) return phrase;
  var built = cloneNotes(phrase);
  if (built.length < 16) built = built.concat(cloneNotes(phrase));
  if (style === 'lead' && phrase.length >= 5) {
    var rev = cloneNotes(phrase).reverse();
    var last = built[built.length - 1];
    if (rev.length && last && rev[0].string === last.string && rev[0].fret === last.fret) rev = rev.slice(1);
    var extra = built.concat(rev);
    if (extra.length <= 36) built = extra;
  }
  if (built.length < 12) built = built.concat(cloneNotes(phrase));
  return built.slice(0, 36);
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

export function enrichLesson(lesson) {
  if (!lesson) return lesson;
  var style = lesson.style || 'rhythm';
  var summary = (lesson.summary || '').replace(/\.+$/, '.');
  var extra = ' Work this as a 10–12 minute block: learn the notes, loop them slow, then put the technique into a real phrase.';
  if (summary.indexOf('10–12 minute block') === -1) summary += extra;
  var watch = lesson.watchFor || '';
  if (watch && watch.indexOf('drop the tempo') === -1) {
    watch = watch.replace(/\.+$/, '') + '. If a note dies or a string squeals, drop the tempo before you add speed.';
  }
  var seen = {};
  var steps = [];
  (lesson.steps || []).concat(extraSteps(lesson)).forEach(function (s) {
    var k = String(s || '').trim().toLowerCase();
    if (!k || seen[k]) return;
    seen[k] = true;
    steps.push(s);
  });
  return Object.assign({}, lesson, {
    summary: summary,
    notes: expandNotes(lesson.notes || [], style),
    steps: steps,
    watchFor: watch || lesson.watchFor,
    goals: lesson.goals && lesson.goals.length ? lesson.goals : (STYLE_GOALS[style] || STYLE_GOALS.rhythm),
    practicePlan: lesson.practicePlan && lesson.practicePlan.length ? lesson.practicePlan : practicePlan(lesson)
  });
}

export function lessonsFor(all, style, genre, skill) {
  const mine = (all || []).filter(function (l) { return l.style === style; });
  const maxIdx = Math.max(0, ORDER.indexOf(skill));
  function rank(l) {
    const lvl = ORDER.indexOf(l.level);
    return {
      reach: lvl > maxIdx ? 1 : 0,
      genre: l.genre === genre ? 0 : ((l.genre === 'any' || !l.genre) ? 1 : 2),
      lvl: lvl
    };
  }
  return mine.slice().sort(function (a, b) {
    const ra = rank(a), rb = rank(b);
    if (ra.reach !== rb.reach) return ra.reach - rb.reach;
    if (ra.genre !== rb.genre) return ra.genre - rb.genre;
    return ra.lvl - rb.lvl;
  });
}
export function isStretch(lesson, skill) {
  return ORDER.indexOf(lesson.level) > Math.max(0, ORDER.indexOf(skill));
}
