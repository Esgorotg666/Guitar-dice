function n(string, fret, beats, pick, tech, group, role, label, finger) {
  var o = { string:string, fret:fret, beats:beats || 0.5, pick:pick || 'D', group:group, role:role || 'line' };
  if (tech && tech.length) o.tech = tech;
  if (label) o.groupLabel = label;
  if (finger) o.finger = finger;
  return o;
}
function chord(group, label, dots, beats) {
  return dots.map(function (d, i) {
    var note = n(d[0], d[1], i === 0 ? (beats || 2) : 0, 'D', d[2], group, 'chord', i === 0 ? label : null, d[3]);
    return note;
  });
}

export const CRAFTED_LESSONS = [
  {
    id: 'ac-1',
    title: 'G to C to D Changes',
    level: 'entry',
    style: 'acoustic',
    genre: 'folk',
    key: 'G',
    bpm: 72,
    chords: ['G', 'C', 'D'],
    summary: 'Hold a full open G, walk G-F#-E-D-C into a full C, then E-F# into D. Every walk ends on a chord tone of the chord you are going to.',
    watchFor: 'Do not pick the G shape one string at a time. The walk is glue. The chord is the picture.',
    goals: [
      'Hold full G (320003), C (x32010), and D (xx0232).',
      'Walk G major down to C and land on C, not a random scale tone.',
      'Slide D-string 2 to 4 (E to F#) and plant D.'
    ],
    steps: [
      'Plant open G: ring on low E3, middle on A2, pinky on high E3.',
      'From high E3 (G) walk E2 (F#), E0 (E), B3 (D), B1 (C). That C is the next chord.',
      'Plant C: ring A3, middle D2, index B1. Low E stays muted.',
      'Walk D-string 2 to 4 (E slide F#) and plant D: index G2, ring B3, middle high E2.',
      'Palm-mute open D once, then let D ring and return to G.'
    ],
    notes: []
      .concat(chord(0, 'G', [[0,3,null,3],[1,2,null,2],[2,0],[3,0],[4,0],[5,3,null,4]], 2))
      .concat([
        n(5,3,0.5,'D',null,1,'line','Walk to C'),
        n(5,2,0.5,'D',null,1,'line'),
        n(5,0,0.5,'D',['P'],1,'line'),
        n(4,3,0.5,'D',null,1,'line'),
        n(4,1,0.5,'D',null,1,'line')
      ])
      .concat(chord(2, 'C', [[1,3,null,3],[2,2,null,2],[3,0],[4,1,null,1],[5,0]], 2))
      .concat([
        n(2,2,0.5,'D',null,3,'line','Walk to D'),
        n(2,4,0.5,'D',['S'],3,'line'),
        n(3,2,0.5,'D',null,3,'line')
      ])
      .concat(chord(4, 'D', [[2,0],[3,2,null,1],[4,3,null,3],[5,2,null,2]], 2))
      .concat([
        n(2,0,0.5,'D',['PM'],5,'line','Muted D bass'),
        n(3,2,0.5,'D',null,5,'line'),
        n(4,3,0.5,'U',null,5,'line')
      ])
      .concat(chord(6, 'Back to G', [[0,3,null,3],[1,2,null,2],[2,0],[3,0],[4,0],[5,3,null,4]], 2))
  },
  {
    id: 'ac-e4',
    title: 'Changing Chords Without Stopping',
    level: 'entry',
    style: 'acoustic',
    genre: 'rock',
    key: 'G',
    bpm: 80,
    chords: ['Em', 'C', 'G', 'D'],
    summary: 'Em-C-G-D. Two chord-tone walk-ups between shapes. Right hand never stops.',
    watchFor: 'Keep the right hand moving through the change. The scale notes are glue, not a solo.',
    goals: [
      'Change Em to C without killing the beat.',
      'Use two scale notes as a bridge into the next chord.',
      'Add a palm-muted scratch so the part has dynamics.'
    ],
    steps: [
      'Hold Em (022000). Scratch the low strings muted on the and of 2, then ring the chord.',
      'Walk B-string 0 to 1 (B to C) and plant C.',
      'From C, hammer G-string 0 to 2 (G to A) and land on G.',
      'Slide D-string 0 to 2 (D to E) and land on D.'
    ],
    notes: []
      .concat(chord(0, 'Em', [[0,0],[1,2,null,2],[2,2,null,3],[3,0],[4,0],[5,0]], 2))
      .concat([n(0,0,0.5,'D',['PM'],1,'line','Scratch'), n(1,2,0.5,'D',null,1,'line'), n(4,0,0.5,'D',null,1,'line'), n(4,1,0.5,'D',['H'],1,'line')])
      .concat(chord(2, 'C', [[1,3,null,3],[2,2,null,2],[3,0],[4,1,null,1],[5,0]], 2))
      .concat([n(3,0,0.5,'D',null,3,'line','Into G'), n(3,2,0.5,'D',['H'],3,'line')])
      .concat(chord(4, 'G', [[0,3,null,3],[1,2,null,2],[2,0],[3,0],[4,0],[5,3,null,4]], 2))
      .concat([n(2,0,0.5,'D',null,5,'line','Into D'), n(2,2,0.5,'D',['S'],5,'line')])
      .concat(chord(6, 'D', [[2,0],[3,2,null,1],[4,3,null,3],[5,2,null,2]], 2))
  },
  {
    id: 'ac-2',
    title: 'The Strumming Pattern That Fits Everything',
    level: 'entry',
    style: 'acoustic',
    genre: 'folk',
    key: 'G',
    bpm: 88,
    chords: ['G', 'C', 'D', 'Em'],
    summary: 'Down, muted chuck, up on G C D Em. Fill into Em with G major pentatonic on the B string (D-B-D).',
    watchFor: 'The muted chuck is shorter than the ringing strums. Fill notes stay inside G major pentatonic.',
    goals: ['Keep downstrokes on the beat.', 'Chuck (PM) on the and.', 'Fill into Em with three pentatonic notes.'],
    steps: [
      'G: down, muted chuck, up.',
      'Same right hand on C and D.',
      'Into Em play B-string 3, open, 3 (D-B-D) then plant Em.'
    ],
    notes: []
      .concat(chord(0, 'G', [[0,3,null,3],[1,2,null,2],[2,0],[3,0],[4,0],[5,3,null,4]], 1))
      .concat([n(1,2,0.5,'D',['PM'],1,'line','Chuck'), n(4,0,0.5,'U',null,1,'line')])
      .concat(chord(2, 'C', [[1,3,null,3],[2,2,null,2],[3,0],[4,1,null,1],[5,0]], 1))
      .concat([n(1,3,0.5,'D',['PM'],3,'line'), n(4,1,0.5,'U',null,3,'line')])
      .concat(chord(4, 'D', [[2,0],[3,2,null,1],[4,3,null,3],[5,2,null,2]], 1))
      .concat([n(4,3,0.5,'D',null,5,'line','Fill'), n(4,0,0.5,'D',['P'],5,'line'), n(4,3,0.5,'U',null,5,'line')])
      .concat(chord(6, 'Em', [[0,0],[1,2,null,2],[2,2,null,3],[3,0],[4,0],[5,0]], 2))
  },
  {
    id: 'rhy-folk-1',
    title: 'Bass-Strum Alternating Pattern',
    level: 'intermediate',
    style: 'rhythm',
    genre: 'folk',
    key: 'G',
    bpm: 84,
    chords: ['G', 'C', 'D'],
    summary: 'Thumb the bass, strum the high strings, then walk the bass into the next chord.',
    watchFor: 'Bass notes are longer. High-string strums stay light.',
    goals: ['Separate thumb bass from the strum.', 'Walk bass G-A-B into C.', 'Palm-mute the walking bass if it gets sloppy.'],
    steps: [
      'G: bass on low E fret 3, then a light downstrum on D-G-B-e.',
      'Walk A-string 2 to 0 to C bass (A-string 3).',
      'C: bass then strum. Walk D-string 0-2 into D.'
    ],
    notes: []
      .concat([n(0,3,1,'D',null,0,'line','G bass'), n(2,0,0.5,'D',null,0,'line'), n(3,0,0.5,'D',null,0,'line'), n(4,0,0.5,'U',null,0,'line')])
      .concat([n(1,2,0.5,'D',['PM'],1,'line','Walk'), n(1,0,0.5,'D',['PM'],1,'line'), n(1,3,1,'D',null,1,'line')])
      .concat(chord(2, 'C', [[1,3,null,3],[2,2,null,2],[3,0],[4,1,null,1],[5,0]], 1))
      .concat([n(2,0,0.5,'D',['PM'],3,'line','To D'), n(2,2,0.5,'D',['H'],3,'line')])
      .concat(chord(4, 'D', [[2,0],[3,2,null,1],[4,3,null,3],[5,2,null,2]], 2))
  },
  {
    id: 'rhy-country-1',
    title: 'The Boom-Chick Rhythm',
    level: 'entry',
    style: 'rhythm',
    genre: 'country',
    key: 'G',
    bpm: 96,
    chords: ['G', 'C', 'D'],
    summary: 'Boom on the bass, chick on the high strings. Add a hammer-on chick and a sliding bass into D.',
    watchFor: 'Boom is one bass string. Chick is muted-ish high strings, not a full six-string smash.',
    goals: ['Lock boom-chick to a two-beat feel.', 'Hammer the chick on C.', 'Slide the bass into D.'],
    steps: [
      'G boom: low E fret 3. Chick: B and high e.',
      'C boom: A-string 3. Chick: hammer B-string 0 to 1.',
      'Slide D-string 0 to 2, then D chick.'
    ],
    notes: [
      n(0,3,1,'D',null,0,'line','G boom'), n(4,0,0.5,'U',null,0,'line'), n(5,3,0.5,'U',null,0,'line'),
      n(1,3,1,'D',null,1,'line','C boom'), n(4,0,0.5,'D',null,1,'line'), n(4,1,0.5,'D',['H'],1,'line'),
      n(2,0,0.5,'D',null,2,'line','To D'), n(2,2,0.5,'D',['S'],2,'line'), n(4,3,0.5,'U',null,2,'line'), n(5,2,0.5,'U',null,2,'line')
    ]
  },
  {
    id: 'lead-a7',
    title: 'Playing Over Changes, Not Through Them',
    level: 'advanced',
    style: 'lead',
    genre: 'jazz',
    key: 'C',
    bpm: 70,
    chords: ['Dm7', 'G7', 'Cmaj7'],
    summary: 'ii-V-I in C. Land F or A on Dm7, B on G7, E on Cmaj7. The line changes color with the chord.',
    watchFor: 'The note on beat 1 of each bar should belong to that chord.',
    goals: ['Land a chord tone when the chord changes.', 'Enclose B on G7.', 'Resolve to E (3rd of C).'],
    steps: [
      'Dm7: D string 3, 2, 0 (F-E-D) is safer than climbing past the chord.',
      'G7: slide into B on G string 4, play A and C around it, land B.',
      'Cmaj7: high E 3 pull off to open E and stop.'
    ],
    notes: [
      n(2,3,0.5,'D',null,0,'line','Dm7'), n(2,2,0.5,'D',null,0,'line'), n(2,0,0.5,'D',null,0,'line'), n(3,2,0.5,'U',null,0,'line'),
      n(3,4,0.5,'D',['S'],1,'line','G7'), n(3,2,0.5,'D',null,1,'line'), n(3,5,0.5,'D',null,1,'line'), n(3,4,1,'D',null,1,'line'),
      n(5,3,0.5,'D',null,2,'line','Cmaj7'), n(5,0,1,'D',['P'],2,'line')
    ]
  }
];
