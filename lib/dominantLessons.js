function n(string, fret, beats, pick, tech, group, role, label) {
  var o = { string:string, fret:fret, beats:beats || 0.5, pick:pick || 'D', group:group, role:role || 'line' };
  if (tech && tech.length) o.tech = tech;
  if (label) o.groupLabel = label;
  return o;
}
function chord(group, label, dots, beats) {
  return dots.map(function (d, i) {
    return n(d[0], d[1], i === 0 ? (beats || 2) : 0, 'D', d[2], group, 'chord', i === 0 ? label : null);
  });
}

export const DOMINANT_LESSONS = [
  {
    id: 'rhy-sec-vofv',
    title: 'V7 of V in C: D7 to G',
    level: 'advanced',
    style: 'rhythm',
    genre: 'jazz',
    key: 'C',
    bpm: 80,
    chords: ['C', 'D7', 'G', 'C'],
    summary: 'Secondary dominant. D7 is V7 of G, not a borrow from D major. F# must speak, then land G.',
    watchFor: 'If D7 has no F#, it is a vague D. The leading tone is the technique.',
    goals: ['Point at G with D7.', 'Walk F# into G on beat 1.', 'Come home to C so it is still in C.'],
    steps: [
      'C full shape.',
      'D7: show F# (G string 7 or D string 4).',
      'G on beat 1. F# is gone unless you hang it on purpose.',
      'Say five of five, then five, then one.'
    ],
    notes: []
      .concat(chord(0, 'C I', [[1,3],[2,2],[3,0],[4,1],[5,0]], 2))
      .concat(chord(1, 'D7 V/V', [[1,5],[2,4],[3,5],[4,3],[5,2]], 2))
      .concat([n(3,4,0.5,'D',null,2,'line','F# to G'), n(3,5,0.5,'U',null,2,'line')])
      .concat(chord(3, 'G V', [[0,3],[1,2],[2,0],[3,0],[4,0],[5,3]], 2))
      .concat(chord(4, 'C I', [[1,3],[2,2],[3,0],[4,1],[5,0]], 2))
  },
  {
    id: 'rhy-sec-vofvi',
    title: 'V7 of vi in C: E7 to Am',
    level: 'advanced',
    style: 'rhythm',
    genre: 'jazz',
    key: 'C',
    bpm: 80,
    chords: ['C', 'E7', 'Am', 'F'],
    summary: 'E7 points at Am. G# is the leading tone. This is not interchange and not a key change to E.',
    watchFor: 'Open E7 already has G#. If you play Em, you missed the secondary.',
    goals: ['Hear E7 as an arrow at Am.', 'Land A on beat 1 of the minor chord.', 'Keep C as home after the side trip.'],
    steps: [
      'C.',
      'E7. Name G#.',
      'Am. G# resolves to A.',
      'F to remind you the key is still C.'
    ],
    notes: []
      .concat(chord(0, 'C', [[1,3],[2,2],[3,0],[4,1],[5,0]], 2))
      .concat(chord(1, 'E7 V/vi', [[0,0],[1,2],[2,0],[3,1],[4,0],[5,0]], 2))
      .concat([n(4,0,0.5,'D',null,2,'line','G# to A'), n(4,1,0.5,'U',null,2,'line')])
      .concat(chord(3, 'Am', [[1,0],[2,2],[3,2],[4,1],[5,0]], 2))
      .concat(chord(4, 'F', [[1,3],[2,3],[3,2],[4,1],[5,1]], 2))
  },
  {
    id: 'rhy-min-vofiv',
    title: 'V7 of iv in Am: A7 to Dm',
    level: 'advanced',
    style: 'rhythm',
    genre: 'jazz',
    key: 'Am',
    bpm: 76,
    chords: ['Am', 'A7', 'Dm', 'E7', 'Am'],
    summary: 'Minor-key secondary. A7 is V7 of Dm. C# is the extra note. E7 after that is primary V, not secondary.',
    watchFor: 'Do not call E7 secondary. G# is furniture in harmonic minor.',
    goals: ['C# into D.', 'Then G# into A on the last Am.', 'Name five of four vs five of one.'],
    steps: [
      'Am.',
      'A7 with C# (B string 2).',
      'Dm on 1.',
      'E7 primary, then Am.'
    ],
    notes: []
      .concat(chord(0, 'Am i', [[1,0],[2,2],[3,2],[4,1],[5,0]], 2))
      .concat(chord(1, 'A7 V/iv', [[1,0],[2,2],[3,0],[4,2],[5,0]], 2))
      .concat([n(4,2,0.5,'D',null,2,'line','C# to D'), n(2,0,0.5,'U',null,2,'line')])
      .concat(chord(3, 'Dm iv', [[2,0],[3,2],[4,3],[5,1]], 2))
      .concat(chord(4, 'E7 V', [[0,0],[1,2],[2,0],[3,1],[4,0],[5,0]], 2))
      .concat(chord(5, 'Am i', [[1,0],[2,2],[3,2],[4,1],[5,0]], 2))
  },
  {
    id: 'rhy-min-vofv',
    title: 'V7 of V in Am: B7 to E7',
    level: 'advanced',
    style: 'rhythm',
    genre: 'jazz',
    key: 'Am',
    bpm: 76,
    chords: ['Am', 'B7', 'E7', 'Am'],
    summary: 'B7 is secondary (D# into E). E7 is primary (G# into A). Two arrows, only one is secondary.',
    watchFor: 'If B7 has no D#, it is not V of V.',
    goals: ['D# into E.', 'G# into A.', 'Keep the chain pointed home.'],
    steps: [
      'Am.',
      'B7. D# on D string 1 or G string 8.',
      'E7.',
      'Am.'
    ],
    notes: []
      .concat(chord(0, 'Am', [[1,0],[2,2],[3,2],[4,1],[5,0]], 2))
      .concat(chord(1, 'B7 V/V', [[1,2],[2,1],[3,2],[4,0],[5,2]], 2))
      .concat([n(2,1,0.5,'D',null,2,'line','D# to E'), n(2,2,0.5,'U',null,2,'line')])
      .concat(chord(3, 'E7 V', [[0,0],[1,2],[2,0],[3,1],[4,0],[5,0]], 2))
      .concat(chord(4, 'Am', [[1,0],[2,2],[3,2],[4,1],[5,0]], 2))
  },
  {
    id: 'rhy-tritone-i',
    title: 'Bb7 for E7 into Am',
    level: 'advanced',
    style: 'rhythm',
    genre: 'jazz',
    key: 'Am',
    bpm: 72,
    chords: ['Am', 'Bb7', 'Am'],
    summary: 'Tritone sub of primary V. Bb7 shares G#/Ab and D with E7. Bass is Bb walking to A.',
    watchFor: 'If Bb7 has no Ab, it is a chubby Bb, not a subV.',
    goals: ['Sound Ab and D on the 7.', 'Bass Bb to A.', 'Same job as E7, different floor.'],
    steps: [
      'Am.',
      'Bb7: A 1, D 3, Ab on G 1.',
      'Walk Ab or bass into A.',
      'Play the same phrase with E7 after this so the swap is obvious.'
    ],
    notes: []
      .concat(chord(0, 'Am', [[1,0],[2,2],[3,2],[4,1],[5,0]], 2))
      .concat(chord(1, 'Bb7 subV', [[1,1],[2,3],[3,1],[4,3],[5,1]], 2))
      .concat([n(3,1,0.5,'D',null,2,'line','Ab to A'), n(1,0,0.5,'U',null,2,'line')])
      .concat(chord(3, 'Am', [[1,0],[2,2],[3,2],[4,1],[5,0]], 2))
  },
  {
    id: 'lead-tritone-251',
    title: 'iiø subV i in Am',
    level: 'advanced',
    style: 'lead',
    genre: 'jazz',
    key: 'Am',
    scaleMode: 'locrian',
    scaleRoot: 'B',
    bpm: 70,
    summary: 'Bm7b5 to Bb7 to Am. Bass B-Bb-A. Guide tones D and Ab still do the V job.',
    watchFor: 'Beat 1 of Bb7 is Ab or D, not a random A-minor scale tone.',
    goals: ['Walk the bass down a half step.', 'Keep the shared tritone.', 'Land A or C on Am.'],
    steps: [
      'Bm7b5 fragment: A 2, D 3, G 2.',
      'Bb7: drop the bass to A 1, Ab on G 1.',
      'Am: open A, C on B 1.'
    ],
    notes: [
      n(1,2,1,'D',null,0,'line','Bm7b5'), n(2,3,0.5,'U',null,0,'line'), n(3,2,0.5,'D',null,0,'line'),
      n(1,1,1,'D',null,1,'line','Bb7'), n(3,1,1,'U',null,1,'line'),
      n(2,3,0.5,'D',null,2,'line','D stays'), n(4,3,0.5,'U',null,2,'line'),
      n(1,0,1,'D',null,3,'line','Am'), n(4,1,1,'U',null,3,'line')
    ]
  },
  {
    id: 'rhy-quartal-plane',
    title: 'Quartal planing D G C',
    level: 'advanced',
    style: 'rhythm',
    genre: 'jazz',
    key: 'D',
    bpm: 72,
    summary: 'Stack two 4ths and slide the grip. No 3rd, so it is not major or minor until you pick a pedal.',
    watchFor: 'If you add F# on top you left quartal. Mute extra strings.',
    goals: ['Keep every slide a perfect 4th.', 'Name the new bass.', 'Plant a D or Am after the rail so it still has a door.'],
    steps: [
      'D-G-C on D G B: open D, open G, B 1.',
      'Slide two frets: E-A-D.',
      'Slide to 5: G-C-F.',
      'Back to the D grip or an Am shape.'
    ],
    notes: []
      .concat(chord(0, 'D G C', [[2,0],[3,0],[4,1]], 2))
      .concat(chord(1, 'E A D', [[2,2],[3,2],[4,3]], 2))
      .concat(chord(2, 'F Bb Eb', [[2,3],[3,3],[4,4]], 2))
      .concat(chord(3, 'G C F', [[2,5],[3,5],[4,6]], 2))
      .concat(chord(4, 'D G C home', [[2,0],[3,0],[4,1]], 2))
  }
];
