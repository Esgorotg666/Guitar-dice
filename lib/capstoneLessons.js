function n(string, fret, beats, pick, tech, group, role, label, finger) {
  var o = { string: string, fret: fret, beats: beats || 0.5, pick: pick || 'D', group: group, role: role || 'line' };
  if (tech && tech.length) o.tech = tech;
  if (label) o.groupLabel = label;
  if (finger) o.finger = finger;
  return o;
}
function chord(group, label, dots, beats) {
  return dots.map(function (d, i) {
    return n(d[0], d[1], i === 0 ? (beats || 2) : 0, 'D', d[2], group, 'chord', i === 0 ? label : null, d[3]);
  });
}

function pack(base, data) {
  var out = [];
  ['lead', 'rhythm', 'acoustic'].forEach(function (style) {
    out.push(Object.assign({}, data, {
      id: base + '-' + style,
      style: style,
      capstone: true,
      skill: data.skill || 'Finale'
    }));
  });
  return out;
}

var START = {
  title: 'Day 1 finale: Em and G in time',
  level: 'entry',
  genre: 'any',
  folder: 'start',
  key: 'G',
  bpm: 56,
  chords: ['Em', 'G'],
  summary: 'Put the whole Day 1 folder into one piece. Hold Em four beats, switch to G four beats, twice. No walk yet. Just the two shapes and a steady downstrum.',
  watchFor: 'If the change eats beat 1, slow down. The test is landing on 1, not pretty tone.',
  goals: ['Both shapes in one minute.', 'Downstrum on every beat.', 'No pause in the right hand.'],
  steps: [
    'Metronome 56. Count 1 2 3 4 out loud.',
    'Em one bar, G one bar, Em, G.',
    'Record one pass. That is the folder test.'
  ],
  notes: chord(0, 'Em', [[0,0],[1,2,null,2],[2,2,null,3],[3,0],[4,0],[5,0]], 4)
    .concat(chord(1, 'G', [[0,3,null,3],[1,2,null,2],[2,0],[3,0],[4,0],[5,3,null,4]], 4))
    .concat(chord(2, 'Em', [[0,0],[1,2,null,2],[2,2,null,3],[3,0],[4,0],[5,0]], 4))
    .concat(chord(3, 'G', [[0,3,null,3],[1,2,null,2],[2,0],[3,0],[4,0],[5,3,null,4]], 4))
};

var CHORDS = {
  title: 'Open-chord finale: G C D with walks',
  level: 'entry',
  genre: 'folk',
  folder: 'chords',
  key: 'G',
  bpm: 72,
  chords: ['G', 'C', 'D'],
  summary: 'This is the folder test. Full G, walk G-F#-E-D-C into C, slide E-F# into D, resolve G. Every walk lands on a chord tone.',
  watchFor: 'Do not pick the chord one string at a time. Hold the shape, then walk.',
  goals: ['Three full shapes.', 'Walks land on C and D.', 'One clean recorded pass.'],
  steps: [
    'Plant G 320003.',
    'Walk high E 3-2-0, B 3-1, plant C.',
    'Slide D-string 2 to 4, plant D, back to G.'
  ],
  notes: chord(0, 'G', [[0,3,null,3],[1,2,null,2],[2,0],[3,0],[4,0],[5,3,null,4]], 2)
    .concat([n(5,3,0.5,'D',null,1,'line','To C'), n(5,2,0.5,'D',null,1,'line'), n(5,0,0.5,'D',['P'],1,'line'), n(4,3,0.5,'D',null,1,'line'), n(4,1,0.5,'D',null,1,'line')])
    .concat(chord(2, 'C', [[1,3,null,3],[2,2,null,2],[3,0],[4,1,null,1],[5,0]], 2))
    .concat([n(2,2,0.5,'D',null,3,'line','To D'), n(2,4,0.5,'D',['S'],3,'line')])
    .concat(chord(4, 'D', [[2,0],[3,2,null,1],[4,3,null,3],[5,2,null,2]], 2))
    .concat(chord(5, 'G', [[0,3,null,3],[1,2,null,2],[2,0],[3,0],[4,0],[5,3,null,4]], 2))
};

var LEGATO = {
  title: 'Legato finale: box 1 up and down',
  level: 'entry',
  genre: 'rock',
  folder: 'legato',
  key: 'G',
  scaleMode: 'minor-pent',
  scaleRoot: 'G',
  bpm: 72,
  summary: 'Folder test for hammers and pull-offs. G minor pent box 1: hammer every pair on the way up, pull off on the way down, stop on G.',
  watchFor: 'Pick only the first note of each pair.',
  goals: ['Correct box 1 frets.', 'Hammers up, pull-offs down.', 'Last note is G.'],
  steps: ['Low E 3-6, A 3-5, D 3-5, G 3-5, B 3-6, high E 3-6.', 'Reverse with pull-offs.', 'Stop on low E 3.'],
  notes: [
    n(0,3,0.5,'D',null,0,'line','Up'), n(0,6,0.5,'D',['H'],0,'line'),
    n(1,3,0.5,'D',null,0,'line'), n(1,5,0.5,'D',['H'],0,'line'),
    n(2,3,0.5,'D',null,0,'line'), n(2,5,0.5,'D',['H'],0,'line'),
    n(3,3,0.5,'U',null,0,'line'), n(3,5,0.5,'U',['H'],0,'line'),
    n(4,3,0.5,'U',null,0,'line'), n(4,6,0.5,'U',['H'],0,'line'),
    n(5,3,0.5,'U',null,0,'line'), n(5,6,1,'D',['H'],0,'line'),
    n(5,6,0.5,'D',null,1,'line','Down'), n(5,3,0.5,'D',['P'],1,'line'),
    n(4,6,0.5,'D',null,1,'line'), n(4,3,0.5,'D',['P'],1,'line'),
    n(0,3,1,'D',null,1,'line')
  ]
};

var RHYTHM = {
  title: 'Rhythm finale: mute then open',
  level: 'entry',
  genre: 'rock',
  folder: 'rhythm',
  key: 'E',
  bpm: 92,
  chords: ['E5', 'G5', 'A5'],
  summary: 'Folder test. Palm-mute E5-G5-A5. Mute stays on through the move. Open the last hit of each chord.',
  watchFor: 'If it rings, the palm left the bridge.',
  goals: ['Mute through the shift.', 'One open hit per chord.', 'Even eighths.'],
  steps: ['E5 muted hits then one open.', 'Same on G5 and A5.'],
  notes: chord(0, 'E5', [[0,0],[1,2]], 1)
    .concat([n(0,0,0.5,'D',['PM'],1,'line','Chug'), n(0,0,0.5,'D',['PM'],1,'line'), n(0,0,0.5,'D',null,1,'line')])
    .concat(chord(2, 'G5', [[0,3],[1,5]], 1))
    .concat([n(0,3,0.5,'D',['PM'],3,'line'), n(0,3,0.5,'D',null,3,'line')])
    .concat(chord(4, 'A5', [[0,5],[1,7]], 1))
};

var BARRE = {
  title: 'Barre finale: F then G, same grip',
  level: 'intermediate',
  genre: 'any',
  folder: 'barre',
  key: 'G',
  bpm: 50,
  chords: ['F', 'G'],
  summary: 'Folder test. Build F at fret 1. Slide the whole grip to fret 3 for G. Four beats each.',
  watchFor: 'Slide the hand. Do not rebuild finger by finger.',
  goals: ['Same shape, two roots.', 'Name the low-E note.', 'Four beats each.'],
  steps: ['F at 1.', 'Slide to 3. That is G.', 'Two bars each.'],
  notes: chord(0, 'F', [[1,1],[1,3,null,3],[2,3,null,4],[3,2,null,2],[4,1],[5,1]], 4)
    .concat(chord(1, 'G barre', [[3,3],[1,5,null,3],[2,5,null,4],[3,4,null,2],[4,3],[5,3]], 4))
};

export const CAPSTONE_LESSONS = []
  .concat(pack('cap-start', START))
  .concat(pack('cap-chords', CHORDS))
  .concat(pack('cap-legato', LEGATO))
  .concat(pack('cap-rhythm', RHYTHM))
  .concat(pack('cap-barre', BARRE));
