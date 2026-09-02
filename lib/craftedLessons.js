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
    summary: 'Strum a full G, walk G major into C, then slide into D. The lesson is the change and the connecting scale, not how long you sit with a timer.',
    watchFor: 'Do not pick the G shape one string at a time. Hammer-ons stay in time. Palm-muted D bass stays short.',
    goals: [
      'Hold a full G, C, and D shape.',
      'Connect G to C with a G-major walk, not a jump.',
      'Use a pull-off, a hammer-on, a slide, and a palm-muted bass hit in one phrase.'
    ],
    steps: [
      'Put down a full open G. All six strings ring together.',
      'From the high G (thin string, fret 3) pull off to open E, then walk G major down into C.',
      'Plant C. Then slide the D-string 2 up to 4 (E to F#) and land on D.',
      'On D, palm-mute the open D string once, then let the chord ring.',
      'Resolve back to a full G.'
    ],
    notes: []
      .concat(chord(0, 'G chord', [[0,3],[1,2],[2,0],[3,0],[4,0],[5,3]], 2))
      .concat([
        n(5,3,0.5,'D',null,1,'line','G scale walk'),
        n(5,0,0.5,'D',['P'],1,'line'),
        n(4,3,0.5,'D',null,1,'line'),
        n(4,0,0.5,'D',null,1,'line'),
        n(3,0,0.5,'D',null,1,'line'),
        n(3,2,0.5,'D',['H'],1,'line')
      ])
      .concat(chord(2, 'C chord', [[1,3],[2,2],[3,0],[4,1],[5,0]], 2))
      .concat([
        n(2,2,0.5,'D',null,3,'line','Walk to D'),
        n(2,4,0.5,'D',['S'],3,'line'),
        n(3,0,0.5,'U',null,3,'line'),
        n(3,2,0.5,'D',null,3,'line'),
        n(4,1,0.5,'D',null,3,'line'),
        n(4,3,0.5,'D',null,3,'line')
      ])
      .concat(chord(4, 'D chord', [[2,0],[3,2],[4,3],[5,2]], 2))
      .concat([
        n(2,0,0.5,'D',['PM'],5,'line','Muted bass'),
        n(3,2,0.5,'D',null,5,'line'),
        n(4,3,0.5,'U',null,5,'line')
      ])
      .concat(chord(6, 'Back to G', [[0,3],[1,2],[2,0],[3,0],[4,0],[5,3]], 2))
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
    summary: 'Em–C–G–D with a scale stitch between each chord and a muted scratch on the and of 2.',
    watchFor: 'Keep the right hand moving through the change. The scale notes are glue, not a solo.',
    goals: [
      'Change Em to C without killing the beat.',
      'Use two scale notes as a bridge into the next chord.',
      'Add a palm-muted scratch so the part has dynamics.'
    ],
    steps: [
      'Hold Em. Scratch the low strings muted on the and of 2, then ring the chord.',
      'Walk B-string 0 to 1 into C.',
      'From C, hammer G-string 0 to 2 and land on G.',
      'Slide D-string 0 to 2 and land on D, then resolve Em.'
    ],
    notes: []
      .concat(chord(0, 'Em', [[0,0],[1,2],[2,2],[3,0],[4,0],[5,0]], 2))
      .concat([n(0,0,0.5,'D',['PM'],1,'line','Scratch'), n(1,2,0.5,'D',null,1,'line'), n(4,0,0.5,'D',null,1,'line'), n(4,1,0.5,'D',['H'],1,'line')])
      .concat(chord(2, 'C', [[1,3],[2,2],[3,0],[4,1],[5,0]], 2))
      .concat([n(3,0,0.5,'D',null,3,'line','Into G'), n(3,2,0.5,'D',['H'],3,'line')])
      .concat(chord(4, 'G', [[0,3],[1,2],[2,0],[3,0],[4,0],[5,3]], 2))
      .concat([n(2,0,0.5,'D',null,5,'line','Into D'), n(2,2,0.5,'D',['S'],5,'line')])
      .concat(chord(6, 'D', [[2,0],[3,2],[4,3],[5,2]], 2))
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
    summary: 'Down-up groove on G C D Em with a muted chuck and a small pentatonic fill into Em.',
    watchFor: 'The muted chuck is shorter than the ringing strums. Fill notes stay inside G major pentatonic.',
    goals: ['Keep downstrokes on the beat.', 'Chuck (PM) on the and.', 'Fill into Em with three pentatonic notes.'],
    steps: [
      'G: down, muted chuck, up.',
      'Same right hand on C and D.',
      'Into Em play B-string 3, open, 3 — G pentatonic — then plant Em.'
    ],
    notes: []
      .concat(chord(0, 'G', [[0,3],[1,2],[2,0],[3,0],[4,0],[5,3]], 1))
      .concat([n(1,2,0.5,'D',['PM'],1,'line','Chuck'), n(4,0,0.5,'U',null,1,'line')])
      .concat(chord(2, 'C', [[1,3],[2,2],[3,0],[4,1],[5,0]], 1))
      .concat([n(1,3,0.5,'D',['PM'],3,'line'), n(4,1,0.5,'U',null,3,'line')])
      .concat(chord(4, 'D', [[2,0],[3,2],[4,3],[5,2]], 1))
      .concat([n(4,3,0.5,'D',null,5,'line','Fill'), n(4,0,0.5,'D',['P'],5,'line'), n(4,3,0.5,'U',null,5,'line')])
      .concat(chord(6, 'Em', [[0,0],[1,2],[2,2],[3,0],[4,0],[5,0]], 2))
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
    goals: ['Separate thumb bass from the strum.', 'Walk bass G–A–B into C.', 'Palm-mute the walking bass if it gets sloppy.'],
    steps: [
      'G: bass on low E fret 3, then a light downstrum on D-G-B-e.',
      'Walk A-string 2 to 0 to C bass (A-string 3).',
      'C: bass then strum. Walk D-string 0-2 into D.'
    ],
    notes: []
      .concat([n(0,3,1,'D',null,0,'line','G bass'), n(2,0,0.5,'D',null,0,'line'), n(3,0,0.5,'D',null,0,'line'), n(4,0,0.5,'U',null,0,'line')])
      .concat([n(1,2,0.5,'D',['PM'],1,'line','Walk'), n(1,0,0.5,'D',['PM'],1,'line'), n(1,3,1,'D',null,1,'line')])
      .concat(chord(2, 'C', [[1,3],[2,2],[3,0],[4,1],[5,0]], 1))
      .concat([n(2,0,0.5,'D',['PM'],3,'line','To D'), n(2,2,0.5,'D',['H'],3,'line')])
      .concat(chord(4, 'D', [[2,0],[3,2],[4,3],[5,2]], 2))
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
      'G boom: low E fret 3. Chick: B and high e open.',
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
    summary: 'A short line that changes color on each chord: Dorian on Dm7, mixolydian enclosure on G7, resolve to E on Cmaj7.',
    watchFor: 'The note on beat 1 of each bar should belong to that chord. Slides and enclosures are the approach, not the target.',
    goals: ['Land a chord tone when the chord changes.', 'Enclose B on G7.', 'Resolve to E (3rd of C).'],
    steps: [
      'Dm7: D-string 0, 2, 3 — F-G-A — then hammer 3 to 5 on G-string if it stays clean.',
      'G7: slide into B, play A-C around it, land B.',
      'Cmaj7: pull off G to E on the high string and stop on E.'
    ],
    notes: [
      n(2,0,0.5,'D',null,0,'line','Dm7'), n(2,2,0.5,'D',null,0,'line'), n(2,3,0.5,'D',null,0,'line'), n(3,2,0.5,'U',['H'],0,'line'),
      n(3,4,0.5,'D',['S'],1,'line','G7'), n(3,2,0.5,'D',null,1,'line'), n(3,5,0.5,'D',null,1,'line'), n(3,4,1,'D',null,1,'line'),
      n(5,3,0.5,'D',null,2,'line','Cmaj7'), n(5,0,1,'D',['P'],2,'line')
    ]
  }
];
