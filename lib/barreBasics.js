function n(string, fret, beats, pick, tech, group, role, label) {
  var o = { string: string, fret: fret, beats: beats || 1, pick: pick || 'D', group: group, role: role || 'line' };
  if (tech && tech.length) o.tech = tech;
  if (label) o.groupLabel = label;
  return o;
}
function chord(frets, group, label, beats) {
  var b = beats || 4;
  return frets.map(function (fret, string) {
    if (fret === 'x' || fret === 'X') return null;
    return n(string, fret, b, 'D', ['L'], group, 'chord', string === 0 ? label : null);
  }).filter(Boolean);
}

var INDEX = {
  title: 'Barre: index only',
  level: 'entry',
  genre: 'any',
  key: 'F',
  bpm: 48,
  summary: 'Lay the index finger flat across fret 1. No other fingers. Thumb behind fret 1, not over the top. Pluck one string at a time. This is the whole secret of barre chords.',
  watchFor: 'The side of the index, slightly rolled toward the headstock, works better than the soft pad. Wrist pain means stop.',
  goals: ['Index covers all six strings at fret 1.', 'Each string makes a pitch, even if it is thin.', 'Thumb stays behind the neck.'],
  steps: [
    'Point the thumb at the ceiling, behind fret 1.',
    'Index lies across fret 1, just behind the metal.',
    'Roll it a few degrees so the bony edge does the work.',
    'Pluck low E, A, D, G, B, high E. Fix the first dead one. Do not squeeze the whole hand.'
  ],
  notes: chord([1, 1, 1, 1, 1, 1], 0, 'Index barre', 4)
};

var MINI = {
  title: 'Mini F (three strings)',
  level: 'entry',
  genre: 'any',
  key: 'F',
  bpm: 52,
  chords: ['F'],
  summary: 'Skip the fat strings. Index bars high E and B at fret 1. Middle on G fret 2. That is a tiny F you can use in songs while the full barre is still ugly.',
  watchFor: 'Do not grab low E yet. Small F first.',
  goals: ['Hear F on the top three strings.', 'Index stays flat on two strings.', 'Middle finger stands on its tip.'],
  steps: [
    'Index: fret 1 on B and high E.',
    'Middle: G string, fret 2.',
    'Strum only those three strings.',
    'When that is clean, add ring on D fret 3 — still skip low E and A.'
  ],
  notes: chord(['x', 'x', 3, 2, 1, 1], 0, 'Mini F', 4)
};

var FULLF = {
  title: 'Full F barre',
  level: 'intermediate',
  genre: 'any',
  key: 'F',
  bpm: 50,
  chords: ['F'],
  summary: 'E-shape moved to fret 1. Index bars all six. Ring on A fret 3, pinky on D fret 3, middle on G fret 2. Same grip as open E, one fret up, with a barre.',
  watchFor: 'If B or high E dies, roll the index. If low E dies, the barre is too close to the middle of the fret.',
  goals: ['See F as E-shape plus barre.', 'Six strings speak, even quietly.', 'Hold four beats, then shake the hand out.'],
  steps: [
    'Make open E first. Freeze that shape.',
    'Slide it to fret 1 and drop the index across the fret.',
    'Fingers: 1 barre, 2 on G2, 3 on A3, 4 on D3.',
    'Four slow strums. Put it down. Barre endurance is days, not one night.'
  ],
  notes: chord([1, 3, 3, 2, 1, 1], 0, 'F barre', 4)
};

var BM = {
  title: 'Bm barre (A-shape)',
  level: 'intermediate',
  genre: 'any',
  key: 'Bm',
  bpm: 50,
  chords: ['Bm'],
  summary: 'A-minor shape moved to fret 2. Index bars from the A string across at fret 2. Ring, pinky, middle pile on fret 4. Skip low E or mute it.',
  watchFor: 'Do not barre low E if it buzzes. x on the fat string is legal.',
  goals: ['Bm as Am moved two frets.', 'Mute or skip low E.', 'Change from G or D into Bm slowly.'],
  steps: [
    'Play open Am. That grip is the upper half of Bm.',
    'Slide it to fret 2. Index now bars fret 2.',
    'Fingers at fret 4: ring on D, pinky on G, middle on B — or a three-finger barre if your hand allows.',
    'Strum five strings. Four beats. Rest.'
  ],
  notes: chord(['x', 2, 4, 4, 3, 2], 0, 'Bm', 4)
};

var MOVE = {
  title: 'Move the E-shape: F then G',
  level: 'intermediate',
  genre: 'any',
  key: 'G',
  bpm: 48,
  chords: ['F', 'G'],
  summary: 'Same barre grip. Fret 1 is F. Fret 3 is G. The guitar is a ruler. Once F speaks, every major chord on the low E string is that same shape.',
  watchFor: 'Slide the whole hand. Do not rebuild finger by finger at the new fret.',
  goals: ['F at 1, G at 3, same shape.', 'Name the root on the low E string.', 'Four beats each.'],
  steps: [
    'Build F at fret 1.',
    'Slide the whole grip to fret 3. That is G.',
    'Say the low-E note: 1=F, 3=G, 5=A, 8=C.',
    'Two bars each. Stop before the hand cramps.'
  ],
  notes: chord([1, 3, 3, 2, 1, 1], 0, 'F', 4).concat(chord([3, 5, 5, 4, 3, 3], 1, 'G barre', 4))
};

var TEMPLATES = [
  { base: 'barre-index', skill: 'Index barre', data: INDEX },
  { base: 'barre-mini', skill: 'Mini F', data: MINI },
  { base: 'barre-f', skill: 'Full F', data: FULLF },
  { base: 'barre-bm', skill: 'Bm barre', data: BM },
  { base: 'barre-move', skill: 'Move the E-shape', data: MOVE }
];

var STYLES = ['lead', 'rhythm', 'acoustic'];
export const BARRE_LESSONS = [];
export const BARRE_PATH = { lead: [], rhythm: [], acoustic: [] };
STYLES.forEach(function (style) {
  TEMPLATES.forEach(function (t) {
    BARRE_LESSONS.push(Object.assign({}, t.data, {
      id: t.base + '-' + style,
      style: style,
      track: 'barre',
      skill: t.skill
    }));
    BARRE_PATH[style].push({ id: t.base + '-' + style, skill: t.skill });
  });
});
