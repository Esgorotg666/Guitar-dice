function n(string, fret, beats, pick, tech, group, role, label) {
  var o = { string: string, fret: fret, beats: beats == null ? 0.25 : beats, pick: pick || 'D', group: group, role: role || 'line' };
  if (tech && tech.length) o.tech = tech;
  if (label) o.groupLabel = label;
  return o;
}

function rollBar(group, label, bassStr, bassFret, mid) {
  var out = [];
  var hits = [
    [bassStr, bassFret],
    mid[0], mid[1], mid[2],
    mid[0], mid[1], mid[2],
    mid[0]
  ];
  hits.forEach(function (h, i) {
    out.push(n(h[0], h[1], 0.25, i % 2 === 0 ? 'D' : 'U', null, group, 'line', i === 0 ? label : null));
  });
  return out;
}

function arpBar(group, label, dots) {
  var out = [];
  dots.forEach(function (d, i) {
    out.push(n(d[0], d[1], d[2] || 0.5, i % 2 === 0 ? 'D' : 'U', d[3] || null, group, 'line', i === 0 ? label : null));
  });
  return out;
}

function tremBar(group, label, strings, frets, hits) {
  var out = [];
  for (var i = 0; i < hits; i++) {
    out.push(n(strings[i % strings.length], frets[i % frets.length], 0.25, i % 2 === 0 ? 'D' : 'U', null, group, 'line', i === 0 ? label : null));
  }
  return out;
}

function gallop(group, label, string, fret, cells) {
  var out = [];
  for (var c = 0; c < cells; c++) {
    out.push(n(string, fret, 0.5, 'D', ['PM'], group, 'line', c === 0 ? label : null));
    out.push(n(string, fret, 0.25, 'D', ['PM'], group, 'line'));
    out.push(n(string, fret, 0.25, 'D', ['PM'], group, 'line'));
  }
  return out;
}

var A_MID = [[3, 2], [4, 2], [5, 0]];
var E_MID = [[3, 1], [4, 0], [5, 0]];
var D_MID = [[3, 2], [4, 3], [5, 2]];

export const STUDY_LESSONS = [
  {
    id: 'study-aed-roll',
    title: 'A-E-D Rolling Study (16 bars)',
    level: 'intermediate',
    style: 'acoustic',
    genre: 'folk',
    folder: 'arpeggio',
    track: 'study',
    key: 'A',
    bpm: 84,
    chords: ['A', 'E', 'D'],
    summary: 'Thumb hits the bass on the beat. Fingers roll G-B-high E as 16ths. Sixteen bars: A A E E, A A E E, D D E E, A E D E A.',
    watchFor: 'Thumb is louder than the roll. Do not rake the chord as a strum.',
    goals: ['Keep one right-hand motor through A, E, and D.', 'Hear the bass change before the treble does.', 'Play eight bars clean at 70 before 84.'],
    steps: ['A: thumb open A, then G2 B2 high-E0.', 'E: thumb low E, G1 B0 high-E0.', 'D: thumb open D, G2 B3 high-E2.', 'Last line is A-E-D-E-A.'],
    notes: []
      .concat(rollBar(0, 'A', 1, 0, A_MID)).concat(rollBar(0, null, 1, 0, A_MID))
      .concat(rollBar(1, 'A', 1, 0, A_MID)).concat(rollBar(1, null, 1, 0, A_MID))
      .concat(rollBar(2, 'E', 0, 0, E_MID)).concat(rollBar(2, null, 0, 0, E_MID))
      .concat(rollBar(3, 'E', 0, 0, E_MID)).concat(rollBar(3, null, 0, 0, E_MID))
      .concat(rollBar(4, 'A', 1, 0, A_MID)).concat(rollBar(4, null, 1, 0, A_MID))
      .concat(rollBar(5, 'A', 1, 0, A_MID)).concat(rollBar(5, null, 1, 0, A_MID))
      .concat(rollBar(6, 'E', 0, 0, E_MID)).concat(rollBar(6, null, 0, 0, E_MID))
      .concat(rollBar(7, 'E', 0, 0, E_MID)).concat(rollBar(7, null, 0, 0, E_MID))
      .concat(rollBar(8, 'D', 2, 0, D_MID)).concat(rollBar(8, null, 2, 0, D_MID))
      .concat(rollBar(9, 'D', 2, 0, D_MID)).concat(rollBar(9, null, 2, 0, D_MID))
      .concat(rollBar(10, 'E', 0, 0, E_MID)).concat(rollBar(10, null, 0, 0, E_MID))
      .concat(rollBar(11, 'E', 0, 0, E_MID)).concat(rollBar(11, null, 0, 0, E_MID))
      .concat(rollBar(12, 'A', 1, 0, A_MID)).concat(rollBar(12, null, 1, 0, A_MID))
      .concat(rollBar(13, 'E', 0, 0, E_MID)).concat(rollBar(13, null, 0, 0, E_MID))
      .concat(rollBar(14, 'D', 2, 0, D_MID)).concat(rollBar(14, null, 2, 0, D_MID))
      .concat(rollBar(15, 'E then A', 0, 0, E_MID)).concat(rollBar(15, null, 1, 0, A_MID))
  },
  {
    id: 'study-arp-song',
    title: 'Open-Chord Arpeggio Song',
    level: 'entry',
    style: 'acoustic',
    genre: 'folk',
    folder: 'arpeggio',
    track: 'study',
    key: 'Am',
    bpm: 72,
    chords: ['Am', 'Dm', 'E', 'C', 'G7'],
    summary: 'A 16-bar study that changes chords. Thumb takes the bass of Am, Dm, E, C, G7. End on held Am.',
    watchFor: 'Name the chord on beat 1. If the bass is late the change failed.',
    goals: ['Arpeggiate five open shapes without stopping.', 'Keep even eighths.', 'Resolve to Am.'],
    steps: ['Am: A open, D2, G2, B1.', 'Dm: D open, G2, B3, high-E1.', 'E: low E, D2, G1, B0.', 'C: A3, D2, G0, B1.', 'G7: low E3, G0, B0, high-E1.'],
    notes: []
      .concat(arpBar(0, 'Am', [[1,0,0.5],[2,2,0.5],[3,2,0.5],[4,1,0.5],[3,2,0.5],[2,2,0.5],[1,0,0.5],[2,2,0.5]]))
      .concat(arpBar(1, 'Dm', [[2,0,0.5],[3,2,0.5],[4,3,0.5],[5,1,0.5],[4,3,0.5],[3,2,0.5],[2,0,0.5],[3,2,0.5]]))
      .concat(arpBar(2, 'E', [[0,0,0.5],[2,2,0.5],[3,1,0.5],[4,0,0.5],[3,1,0.5],[2,2,0.5],[3,1,0.5],[2,2,0.5]]))
      .concat(arpBar(3, 'Am', [[1,0,0.5],[2,2,0.5],[3,2,0.5],[4,1,0.5],[3,2,0.5],[2,2,0.5],[1,0,0.5],[2,2,0.5]]))
      .concat(arpBar(4, 'C', [[1,3,0.5],[2,2,0.5],[3,0,0.5],[4,1,0.5],[3,0,0.5],[2,2,0.5],[1,3,0.5],[2,2,0.5]]))
      .concat(arpBar(5, 'G7', [[0,3,0.5],[3,0,0.5],[4,0,0.5],[5,1,0.5],[4,0,0.5],[3,0,0.5],[4,0,0.5],[3,0,0.5]]))
      .concat(arpBar(6, 'C', [[1,3,0.5],[2,2,0.5],[3,0,0.5],[4,1,0.5],[5,0,0.5],[4,1,0.5],[3,0,0.5],[2,2,0.5]]))
      .concat(arpBar(7, 'Dm', [[2,0,0.5],[3,2,0.5],[4,3,0.5],[5,1,0.5],[4,3,0.5],[3,2,0.5],[4,3,0.5],[3,2,0.5]]))
      .concat(arpBar(8, 'G7', [[0,3,0.5],[3,0,0.5],[4,0,0.5],[5,1,0.5],[4,0,0.5],[3,0,0.5],[4,0,0.5],[3,0,0.5]]))
      .concat(arpBar(9, 'C', [[1,3,0.5],[2,2,0.5],[3,0,0.5],[4,1,0.5],[5,0,0.5],[4,1,0.5],[3,0,0.5],[2,2,0.5]]))
      .concat(arpBar(10, 'Am', [[1,0,0.5],[2,2,0.5],[3,2,0.5],[4,1,0.5],[5,0,0.5],[4,1,0.5],[3,2,0.5],[2,2,0.5]]))
      .concat(arpBar(11, 'E', [[0,0,0.5],[2,2,0.5],[3,1,0.5],[4,0,0.5],[5,0,0.5],[4,0,0.5],[3,1,0.5],[2,2,0.5]]))
      .concat(arpBar(12, 'Am hold', [[1,0,1],[2,2,1],[3,2,1],[4,1,1]]))
  },
  {
    id: 'study-bass-treble',
    title: 'Bass Against Treble in G',
    level: 'intermediate',
    style: 'acoustic',
    genre: 'folk',
    folder: 'rh',
    track: 'study',
    key: 'G',
    bpm: 66,
    chords: ['G', 'C', 'D', 'Em'],
    summary: 'Bass holds a dotted half while high strings play a moving eighth-note line. Eight phrases over G, C, D, and Em.',
    watchFor: 'Bass speaks on beat 1 and stays. Treble is quieter.',
    goals: ['Separate thumb duration from finger motion.', 'Change bass on the barline.', 'Keep eighths even at 66.'],
    steps: ['Bar 1: thumb low-E3 (G).', 'Bar 2: thumb A3 (C).', 'Bar 3: thumb open D.', 'Bar 4: thumb open E.', 'Repeat and come home to G.'],
    notes: [
      n(0,3,2,'D',null,0,'line','G bass'), n(5,3,0.5,'U',null,0,'line'), n(5,0,0.5,'U',null,0,'line'), n(4,1,0.5,'U',null,0,'line'), n(4,0,0.5,'U',null,0,'line'),
      n(1,3,2,'D',null,1,'line','C bass'), n(4,1,0.5,'U',null,1,'line'), n(4,3,0.5,'U',null,1,'line'), n(3,0,0.5,'U',null,1,'line'), n(2,2,0.5,'U',null,1,'line'),
      n(2,0,2,'D',null,2,'line','D bass'), n(3,2,0.5,'U',null,2,'line'), n(4,3,0.5,'U',null,2,'line'), n(5,2,0.5,'U',null,2,'line'), n(4,3,0.5,'U',null,2,'line'),
      n(0,0,2,'D',null,3,'line','Em bass'), n(4,0,0.5,'U',null,3,'line'), n(3,0,0.5,'U',null,3,'line'), n(2,2,0.5,'U',null,3,'line'), n(3,0,0.5,'U',null,3,'line'),
      n(0,3,2,'D',null,4,'line','G again'), n(5,3,0.5,'U',null,4,'line'), n(5,0,0.5,'U',null,4,'line'), n(4,3,0.5,'U',null,4,'line'), n(4,1,0.5,'U',null,4,'line'),
      n(1,3,2,'D',null,5,'line','C again'), n(5,0,0.5,'U',null,5,'line'), n(4,1,0.5,'U',null,5,'line'), n(3,0,0.5,'U',null,5,'line'), n(2,2,0.5,'U',null,5,'line'),
      n(2,0,2,'D',null,6,'line','D again'), n(5,2,0.5,'U',null,6,'line'), n(4,3,0.5,'U',null,6,'line'), n(3,2,0.5,'U',null,6,'line'), n(2,0,0.5,'U',null,6,'line'),
      n(0,3,2,'D',null,7,'line','Home G'), n(4,0,0.5,'U',null,7,'line'), n(3,0,0.5,'U',null,7,'line'), n(5,3,1,'U',null,7,'line')
    ]
  },
  {
    id: 'study-drone-hymn',
    title: 'Let-Ring Minor Hymn',
    level: 'advanced',
    style: 'acoustic',
    genre: 'metal',
    folder: 'arpeggio',
    track: 'study',
    key: 'Em',
    scaleMode: 'aeolian',
    scaleRoot: 'E',
    bpm: 80,
    chords: ['Em', 'D', 'C'],
    summary: 'Original let-ring study. Open G, B, and high E keep speaking while the bass walks Em-D-C-Em. Not a cover.',
    watchFor: 'Do not mute the open strings. Change only the bass on beat 1.',
    goals: ['Hold a drone under a moving bass.', 'Keep the right-hand order identical.', 'Make eight bars feel like one phrase.'],
    steps: ['Right hand: bass, G, B, high E.', 'Bars 1-2 open low E.', 'Bars 3-4 open D.', 'Bars 5-6 A-string 3.', 'Bars 7-8 return to E.'],
    notes: []
      .concat(arpBar(0, 'Em drone', [[0,0,0.5],[3,0,0.5],[4,0,0.5],[5,0,0.5],[0,0,0.5],[3,0,0.5],[4,0,0.5],[5,0,0.5]]))
      .concat(arpBar(1, 'Em', [[0,0,0.5],[3,0,0.5],[4,0,0.5],[5,0,0.5],[0,0,0.5],[3,0,0.5],[4,0,0.5],[5,0,0.5]]))
      .concat(arpBar(2, 'D drone', [[2,0,0.5],[3,0,0.5],[4,3,0.5],[5,0,0.5],[2,0,0.5],[3,0,0.5],[4,3,0.5],[5,0,0.5]]))
      .concat(arpBar(3, 'D', [[2,0,0.5],[3,0,0.5],[4,3,0.5],[5,0,0.5],[2,0,0.5],[3,0,0.5],[4,3,0.5],[5,0,0.5]]))
      .concat(arpBar(4, 'C drone', [[1,3,0.5],[3,0,0.5],[4,1,0.5],[5,0,0.5],[1,3,0.5],[3,0,0.5],[4,1,0.5],[5,0,0.5]]))
      .concat(arpBar(5, 'C', [[1,3,0.5],[3,0,0.5],[4,1,0.5],[5,0,0.5],[1,3,0.5],[3,0,0.5],[4,1,0.5],[5,0,0.5]]))
      .concat(arpBar(6, 'Em return', [[0,0,0.5],[3,0,0.5],[4,0,0.5],[5,0,0.5],[0,0,0.5],[3,2,0.5],[4,0,0.5],[5,0,0.5]]))
      .concat(arpBar(7, 'Em close', [[0,0,0.5],[3,0,0.5],[4,0,0.5],[5,0,0.5],[0,0,1],[3,0,1]]))
  },
  {
    id: 'study-drone-climb',
    title: 'Open-E Drone Climb',
    level: 'master',
    style: 'rhythm',
    genre: 'metal',
    folder: 'rhythm',
    track: 'study',
    key: 'Em',
    scaleMode: 'aeolian',
    scaleRoot: 'E',
    bpm: 100,
    summary: 'Low E stays open. A and D climb 7-9-10-12 in 16ths, then walk back. Original drone study.',
    watchFor: 'Open E has to speak on every downstroke. Wrist, not arm.',
    goals: ['Keep the drone under a moving line.', 'Shift 7 to 9 to 10 to 12 on the grid.', 'Descend without rushing.'],
    steps: ['Bars 1-2: E + A7.', 'Bars 3-4: E + A9.', 'Bar 5: E + D10. Bar 6: E + D12.', 'Walk 12-10-9-7 back to A7.', 'End on open E.'],
    notes: []
      .concat(tremBar(0, 'E+A7', [0, 1], [0, 7], 16))
      .concat(tremBar(1, 'E+A9', [0, 1], [0, 9], 16))
      .concat(tremBar(2, 'E+D10', [0, 2], [0, 10], 8))
      .concat(tremBar(3, 'E+D12', [0, 2], [0, 12], 8))
      .concat(tremBar(4, 'Walk down', [2, 0, 2, 0, 1, 0, 1, 0], [12, 0, 10, 0, 10, 0, 9, 0], 16))
      .concat(tremBar(5, 'E+A7 again', [0, 1], [0, 7], 8))
      .concat(tremBar(6, 'E+A9 again', [0, 1], [0, 9], 8))
      .concat([n(0, 0, 2, 'D', null, 7, 'line', 'Open E hold')])
  },
  {
    id: 'study-bm-trem',
    title: 'B Harmonic Minor Tremolo Grips',
    level: 'master',
    style: 'rhythm',
    genre: 'metal',
    folder: 'rhythm',
    track: 'study',
    key: 'Bm',
    scaleMode: 'harmonic-minor',
    scaleRoot: 'B',
    bpm: 120,
    chords: ['Bm', 'F#m'],
    summary: 'Eight bars of down-up 16ths through Bm, F#m color, G(b5), Em/G, then held Bm. Left hand changes once per bar.',
    watchFor: 'Change the grip on beat 1 with no extra mute click.',
    goals: ['Even 16ths at 80, then 120.', 'Hear B harmonic minor in the grips.', 'Hold the last Bm clean.'],
    steps: ['Bm: A2 D4 G4 B3.', 'F#m color: A2 D4 G4 B2.', 'G b5: A3 D5 G4.', 'Em/G: A3 D5 G5.', 'End on held Bm.'],
    notes: []
      .concat(tremBar(0, 'Bm', [1, 2, 3, 4], [2, 4, 4, 3], 16))
      .concat(tremBar(1, 'F#m color', [1, 2, 3, 4], [2, 4, 4, 2], 16))
      .concat(tremBar(2, 'G b5', [1, 2, 3], [3, 5, 4], 16))
      .concat(tremBar(3, 'Em/G', [1, 2, 3], [3, 5, 5], 16))
      .concat(tremBar(4, 'Gm color', [1, 2, 3], [3, 1, 4], 16))
      .concat(tremBar(5, 'F# no5', [1, 2], [2, 1], 16))
      .concat([n(1, 2, 2, 'D', null, 6, 'chord', 'Hold Bm'), n(2, 4, 0, null, null, 6, 'chord'), n(3, 4, 0, null, null, 6, 'chord'), n(4, 3, 0, null, null, 6, 'chord')])
  },
  {
    id: 'study-chrom-cell',
    title: 'Chromatic Cell Across the Neck',
    level: 'entry',
    style: 'lead',
    genre: 'rock',
    folder: 'fingering',
    track: 'study',
    key: 'G',
    bpm: 72,
    summary: 'Four-note cell 3-5-4-6 on every string, then one-note-per-string, then the same cell at frets 5-8-7-10.',
    watchFor: 'One finger per fret. Alternate pick. Do not roll one finger inside the cell.',
    goals: ['Plant 1-2-3-4 on four frets.', 'Cross strings without an extra downstroke.', 'Move the cell up two frets.'],
    steps: ['Low E 3-5-4-6, then the cell on every string.', 'One note per string climbing 3-4-5-6.', 'Shift to 5-8-7-10.', 'Home on low E 3.'],
    notes: [
      n(0,3,0.5,'D',null,0,'line','Cell E'), n(0,5,0.5,'U',null,0,'line'), n(0,4,0.5,'D',null,0,'line'), n(0,6,0.5,'U',null,0,'line'),
      n(1,4,0.5,'D',null,0,'line'), n(1,3,0.5,'U',null,0,'line'), n(1,6,0.5,'D',null,0,'line'), n(1,5,0.5,'U',null,0,'line'),
      n(2,6,0.5,'D',null,1,'line','Cell D/G'), n(2,3,0.5,'U',null,1,'line'), n(2,5,0.5,'D',null,1,'line'), n(2,4,0.5,'U',null,1,'line'),
      n(3,3,0.5,'D',null,1,'line'), n(3,6,0.5,'U',null,1,'line'), n(3,4,0.5,'D',null,1,'line'), n(3,5,0.5,'U',null,1,'line'),
      n(4,4,0.5,'D',null,2,'line','Cell B/e'), n(4,6,0.5,'U',null,2,'line'), n(4,3,0.5,'D',null,2,'line'), n(4,5,0.5,'U',null,2,'line'),
      n(5,6,0.5,'D',null,2,'line'), n(5,4,0.5,'U',null,2,'line'), n(5,5,0.5,'D',null,2,'line'), n(5,3,1,'U',null,2,'line'),
      n(0,3,0.5,'D',null,3,'line','One per string'), n(1,4,0.5,'U',null,3,'line'), n(2,5,0.5,'D',null,3,'line'), n(3,6,0.5,'U',null,3,'line'),
      n(1,3,0.5,'D',null,3,'line'), n(2,4,0.5,'U',null,3,'line'), n(3,5,0.5,'D',null,3,'line'), n(4,6,0.5,'U',null,3,'line'),
      n(2,3,0.5,'D',null,4,'line'), n(3,4,0.5,'U',null,4,'line'), n(4,5,0.5,'D',null,4,'line'), n(5,6,0.5,'U',null,4,'line'),
      n(0,5,0.5,'D',null,5,'line','Shift to 5'), n(0,8,0.5,'U',null,5,'line'), n(0,7,0.5,'D',null,5,'line'), n(0,10,0.5,'U',null,5,'line'),
      n(1,5,0.5,'D',null,5,'line'), n(1,7,0.5,'U',null,5,'line'), n(1,10,0.5,'D',null,5,'line'), n(1,8,0.5,'U',null,5,'line'),
      n(2,5,0.5,'D',null,6,'line'), n(2,10,0.5,'U',null,6,'line'), n(2,7,0.5,'D',null,6,'line'), n(2,8,0.5,'U',null,6,'line'),
      n(3,5,0.5,'D',null,6,'line'), n(3,8,0.5,'U',null,6,'line'), n(3,10,0.5,'D',null,6,'line'), n(3,7,0.5,'U',null,6,'line'),
      n(4,5,0.5,'D',null,7,'line'), n(4,10,0.5,'U',null,7,'line'), n(4,8,0.5,'D',null,7,'line'), n(4,7,0.5,'U',null,7,'line'),
      n(5,5,0.5,'D',null,7,'line'), n(5,8,0.5,'U',null,7,'line'), n(5,7,0.5,'D',null,7,'line'), n(5,10,1,'U',null,7,'line'),
      n(0,3,1,'D',null,8,'line','Home')
    ]
  },
  {
    id: 'study-pima',
    title: 'P-i-m-a-m-i Across Two Shapes',
    level: 'intermediate',
    style: 'acoustic',
    genre: 'folk',
    folder: 'rh',
    track: 'study',
    key: 'Em',
    bpm: 76,
    summary: 'Thumb-index-middle-ring-middle-index on an Em-shaped grip at fret 7, then the same order on a C-shaped grip at fret 3.',
    watchFor: 'Thumb plays the bass only. Same order when you shift.',
    goals: ['Lock P-i-m-a-m-i without looking.', 'Move the left-hand shape and keep the right hand identical.'],
    steps: ['Shape 1: A7 D9 G11 B8.', 'Repeat the cell four times.', 'Shape 2: A3 D5 G7 B5.', 'Do not restart the thumb when you shift.'],
    notes: []
      .concat(arpBar(0, 'Shape 7', [[1,7,0.33],[2,9,0.33],[3,11,0.33],[4,8,0.33],[3,11,0.33],[2,9,0.33],[1,7,0.33],[2,9,0.33],[3,11,0.33],[4,8,0.33],[3,11,0.33],[2,9,0.33]]))
      .concat(arpBar(1, 'Shape 7 again', [[1,7,0.33],[2,9,0.33],[3,11,0.33],[4,8,0.33],[3,11,0.33],[2,9,0.33],[1,7,0.33],[2,9,0.33],[3,11,0.33],[4,8,0.33],[3,11,0.33],[2,9,0.33]]))
      .concat(arpBar(2, 'Shape 3', [[1,3,0.33],[2,5,0.33],[3,7,0.33],[4,5,0.33],[3,7,0.33],[2,5,0.33],[1,3,0.33],[2,5,0.33],[3,7,0.33],[4,5,0.33],[3,7,0.33],[2,5,0.33]]))
      .concat(arpBar(3, 'Shape 3 again', [[1,3,0.33],[2,5,0.33],[3,7,0.33],[4,5,0.33],[3,7,0.33],[2,5,0.33],[1,3,0.33],[2,5,0.33],[3,7,0.33],[4,5,0.33],[3,7,0.33],[2,5,0.33]]))
  },
  {
    id: 'study-campanella',
    title: 'Open-String Campanella Study',
    level: 'advanced',
    style: 'acoustic',
    genre: 'folk',
    folder: 'arpeggio',
    track: 'study',
    key: 'G',
    bpm: 60,
    summary: 'Melody sits on a high fretted note while open B and G keep ringing. Four bars open position, four bars at 12-15.',
    watchFor: 'Let the open strings ring. Do not choke the high note.',
    goals: ['Keep open strings alive under a moving melody.', 'Shift the same idea up an octave.', 'Stay lento at 60 BPM.'],
    steps: ['High E 3 over open B and G, A2 in the bass.', 'Melody walks 3-2-0-2.', 'Same pattern starting high E 15 with D14 bass.'],
    notes: []
      .concat(arpBar(0, 'Open pos', [[5,3,1],[4,0,0.5],[3,0,0.5],[1,2,0.5],[4,0,0.5],[5,3,0.5],[4,0,0.5]]))
      .concat(arpBar(1, 'Walk 2', [[5,2,1],[4,0,0.5],[3,0,0.5],[1,2,0.5],[4,0,0.5],[5,2,0.5],[4,0,0.5]]))
      .concat(arpBar(2, 'Walk 0', [[4,0,1],[3,0,0.5],[2,0,0.5],[1,2,0.5],[3,0,0.5],[4,0,0.5],[3,0,0.5]]))
      .concat(arpBar(3, 'Walk 2 home', [[5,2,1],[4,0,0.5],[3,0,0.5],[1,2,0.5],[3,0,0.5],[4,0,0.5],[5,3,0.5]]))
      .concat(arpBar(4, 'Octave 15', [[5,15,1],[4,0,0.5],[3,0,0.5],[2,14,0.5],[4,0,0.5],[5,15,0.5],[4,0,0.5]]))
      .concat(arpBar(5, 'Octave 14', [[5,14,1],[4,0,0.5],[3,0,0.5],[2,14,0.5],[4,0,0.5],[5,14,0.5],[4,0,0.5]]))
      .concat(arpBar(6, 'Octave 12', [[5,12,1],[4,0,0.5],[3,0,0.5],[2,14,0.5],[4,0,0.5],[5,12,0.5],[4,0,0.5]]))
      .concat(arpBar(7, 'Octave 14 home', [[5,14,1],[4,0,0.5],[3,0,0.5],[2,14,0.5],[4,0,0.5],[5,14,0.5],[5,15,0.5]]))
  },
  {
    id: 'study-cmaj-run',
    title: 'C Major - Three Exercises, One Run',
    level: 'intermediate',
    style: 'lead',
    genre: 'folk',
    folder: 'lead',
    track: 'study',
    key: 'C',
    scaleMode: 'ionian',
    scaleRoot: 'C',
    bpm: 76,
    summary: 'Two-string cell, extend through 5-7-8, descend across G D A, then climb the open-position scale. Play as one piece.',
    watchFor: 'Open strings are still scale tones. Even eighths.',
    goals: ['Own C major on B and high E.', 'Extend past fret 5.', 'Cross four strings down and back up.'],
    steps: ['Cell on B and high E twice.', 'Extend 5-7-8 and back.', 'Descend across four strings.', 'Climb D 0-2-3, G 0-2, B 0-1.'],
    notes: [
      n(4,1,0.5,'D',null,0,'line','Two-string cell'), n(4,3,0.5,'U',null,0,'line'), n(5,0,0.5,'D',null,0,'line'), n(5,1,0.5,'U',null,0,'line'), n(5,3,0.5,'D',null,0,'line'), n(5,1,0.5,'U',null,0,'line'), n(5,0,0.5,'D',null,0,'line'), n(4,3,0.5,'U',null,0,'line'), n(4,1,1,'D',null,0,'line'),
      n(4,1,0.5,'D',null,1,'line','Cell again'), n(4,3,0.5,'U',null,1,'line'), n(5,0,0.5,'D',null,1,'line'), n(5,1,0.5,'U',null,1,'line'), n(5,3,0.5,'D',null,1,'line'), n(5,1,0.5,'U',null,1,'line'), n(5,0,0.5,'D',null,1,'line'), n(4,3,0.5,'U',null,1,'line'), n(4,1,1,'D',null,1,'line'),
      n(4,1,0.5,'D',null,2,'line','Extend'), n(4,3,0.5,'U',null,2,'line'), n(5,0,0.5,'D',null,2,'line'), n(5,1,0.5,'U',null,2,'line'), n(5,3,0.5,'D',null,2,'line'), n(5,5,0.5,'U',null,2,'line'), n(5,7,0.5,'D',null,2,'line'), n(5,8,0.5,'U',null,2,'line'), n(5,7,0.5,'D',null,2,'line'), n(5,5,0.5,'U',null,2,'line'), n(5,3,0.5,'D',null,2,'line'), n(5,0,1,'U',null,2,'line'),
      n(5,3,0.5,'D',null,3,'line','Cross down'), n(5,1,0.5,'U',null,3,'line'), n(5,0,0.5,'D',null,3,'line'), n(4,3,0.5,'U',null,3,'line'), n(4,1,0.5,'D',null,3,'line'), n(4,0,0.5,'U',null,3,'line'), n(3,2,0.5,'D',null,3,'line'), n(3,0,0.5,'U',null,3,'line'), n(2,3,0.5,'D',null,3,'line'), n(2,2,0.5,'U',null,3,'line'), n(2,0,0.5,'D',null,3,'line'), n(1,3,1,'U',null,3,'line'),
      n(2,0,0.5,'D',null,4,'line','Climb back'), n(2,2,0.5,'U',null,4,'line'), n(2,3,0.5,'D',null,4,'line'), n(3,0,0.5,'U',null,4,'line'), n(3,2,0.5,'D',null,4,'line'), n(4,0,0.5,'U',null,4,'line'), n(4,1,0.5,'D',null,4,'line'), n(5,0,1,'U',null,4,'line')
    ]
  },
  {
    id: 'study-gallop',
    title: 'Palm-Mute Gallop Workshop',
    level: 'intermediate',
    style: 'rhythm',
    genre: 'metal',
    folder: 'rhythm',
    track: 'study',
    key: 'Em',
    bpm: 112,
    chords: ['E5', 'G5', 'A5', 'C5'],
    summary: 'Original gallop study. Long-short-short on open E, then the same motor on E5 G5 A5 C5. Not a song transcription.',
    watchFor: 'Palm stays on the bridge. The long hit is a downstroke. Do not turn it into three even 8ths.',
    goals: ['Lock long-short-short at 80, then 112.', 'Move E5-G5-A5-C5 without lifting the mute.', 'Leave one open hit so the riff breathes.'],
    steps: ['Gallop on open E for two bars.', 'Same right hand on E5, G5, A5, C5.', 'Last bar: two gallops, one unmuted hit, hold.'],
    notes: []
      .concat(gallop(0, 'Open E gallop', 0, 0, 4))
      .concat(gallop(1, 'Open E again', 0, 0, 4))
      .concat(gallop(2, 'E5', 0, 0, 4))
      .concat(gallop(3, 'G5', 0, 3, 4))
      .concat(gallop(4, 'A5', 0, 5, 4))
      .concat(gallop(5, 'C5', 0, 8, 4))
      .concat(gallop(6, 'E5 home', 0, 0, 2))
      .concat([n(0, 0, 1, 'D', null, 6, 'line', 'Open hit'), n(0, 0, 1, 'D', null, 6, 'line', 'Hold')])
  },
  {
    id: 'study-legato-shift',
    title: 'Legato Cell Through Three Positions',
    level: 'master',
    style: 'lead',
    genre: 'rock',
    folder: 'legato',
    track: 'study',
    key: 'A',
    scaleMode: 'major-pent',
    scaleRoot: 'A',
    bpm: 72,
    summary: 'Pick once, pull off, cross strings, shift the same cell through frets 9, 5, and 14, then a vibrato hold.',
    watchFor: 'Only the first note of each slur gets a pick. If the pulled note dies, the fretting hand is late.',
    goals: ['Keep 16ths even while slurring.', 'Move one cell through three positions.', 'Land the last note with vibrato.'],
    steps: ['Pos 1: high E 9 pull 5, B7, G6.', 'Pos 2: high E 5 pull 2.', 'Pos 3: high E 14 pull 9.', 'End on B 19 with vibrato.'],
    notes: [
      n(5,9,0.25,'D',null,0,'line','Pos 1'), n(5,5,0.25,'U',['P'],0,'line'), n(4,7,0.25,'D',null,0,'line'), n(3,6,0.25,'U',null,0,'line'),
      n(4,7,0.25,'D',null,0,'line'), n(5,5,0.25,'U',null,0,'line'), n(5,9,0.25,'D',['H'],0,'line'), n(5,5,0.25,'U',['P'],0,'line'),
      n(5,9,0.25,'D',null,0,'line'), n(5,5,0.25,'U',['P'],0,'line'), n(4,7,0.25,'D',null,0,'line'), n(3,6,0.25,'U',null,0,'line'),
      n(5,5,0.25,'D',null,1,'line','Pos 2'), n(5,2,0.25,'U',['P'],1,'line'), n(4,2,0.25,'D',null,1,'line'), n(3,2,0.25,'U',null,1,'line'),
      n(4,2,0.25,'D',null,1,'line'), n(5,2,0.25,'U',null,1,'line'), n(5,5,0.25,'D',['H'],1,'line'), n(5,2,0.25,'U',['P'],1,'line'),
      n(5,5,0.25,'D',null,1,'line'), n(5,2,0.25,'U',['P'],1,'line'), n(4,2,0.25,'D',null,1,'line'), n(3,2,0.25,'U',null,1,'line'),
      n(5,14,0.25,'D',null,2,'line','Pos 3'), n(5,9,0.25,'U',['P'],2,'line'), n(4,10,0.25,'D',null,2,'line'), n(3,11,0.25,'U',null,2,'line'),
      n(4,10,0.25,'D',null,2,'line'), n(5,9,0.25,'U',null,2,'line'), n(5,14,0.25,'D',['H'],2,'line'), n(5,9,0.25,'U',['P'],2,'line'),
      n(5,17,0.25,'D',null,3,'line','Climb'), n(5,14,0.25,'U',['P'],3,'line'), n(5,21,0.25,'D',null,3,'line'), n(5,17,0.25,'U',['P'],3,'line'),
      n(4,19,2,'D',['~'],4,'line','Vibrato hold')
    ]
  }
];
