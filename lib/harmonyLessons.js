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

export const HARMONY_LESSONS = [
  {
    id: 'rhy-borrow-iv7',
    title: 'I iv bVII I in C',
    level: 'advanced',
    style: 'rhythm',
    genre: 'rock',
    key: 'C',
    bpm: 76,
    chords: ['C', 'Fm', 'Bb', 'C'],
    summary: 'Modal interchange. C stays home. Fm and Bb are stolen from C minor. Full shapes on 1, then a short walk that uses Ab and Bb.',
    watchFor: 'If beat 1 of the Fm bar still has an A natural, you did not borrow. You faked it.',
    goals: ['Hear iv as a flattened 3rd, not a new key.', 'Land Bb as bVII and walk back to C.', 'Keep the right hand moving through the color change.'],
    steps: [
      'C shape. Hold it. That is I.',
      'Fm: flatten the A to Ab. Same root family as F, darker 3rd.',
      'Bb barre or A-shape at 1. That is bVII from C Mixolydian / minor.',
      'Walk Ab-Bb-C into the last C so the line names the borrowed notes.',
      'Say I, iv, bVII, I on the changes.'
    ],
    notes: []
      .concat(chord(0, 'C I', [[1,3],[2,2],[3,0],[4,1],[5,0]], 2))
      .concat([
        n(4,1,0.5,'U',null,1,'line','Walk to iv'), n(3,0,0.5,'D',null,1,'line'), n(3,1,0.5,'U',['H'],1,'line'), n(2,3,0.5,'D',null,1,'line')
      ])
      .concat(chord(2, 'Fm iv', [[2,3],[3,1],[4,1],[5,1]], 2))
      .concat([
        n(5,1,0.5,'D',null,3,'line','To bVII'), n(4,3,0.5,'U',null,3,'line'), n(3,3,0.5,'D',null,3,'line')
      ])
      .concat(chord(4, 'Bb bVII', [[1,1],[2,3],[3,3],[4,3],[5,1]], 2))
      .concat([
        n(3,3,0.5,'D',null,5,'line','Home'), n(4,3,0.5,'U',null,5,'line'), n(5,3,1,'D',null,5,'line')
      ])
      .concat(chord(6, 'C I', [[1,3],[2,2],[3,0],[4,1],[5,0]], 2))
  },
  {
    id: 'rhy-b6-b7',
    title: 'bVI bVII I in C',
    level: 'advanced',
    style: 'rhythm',
    genre: 'rock',
    key: 'C',
    bpm: 80,
    chords: ['Ab', 'Bb', 'C'],
    summary: 'The other interchange highway. Ab and Bb are neighbors from C minor. They climb into C. Full shapes, then a connecting scale.',
    watchFor: 'Do not treat Ab as a new tonic. The sentence ends on C.',
    goals: ['Hear bVI to bVII as a ramp.', 'Land C as I, not as another borrowed color.', 'Move the same ramp to G later: Eb-F-G.'],
    steps: [
      'Ab shape (barre 4 or easier fragment on D-G-B).',
      'Bb one whole step up. Same grip family.',
      'C. That is home.',
      'Walk Ab-Bb-C on the B string so the line matches the chords.'
    ],
    notes: []
      .concat(chord(0, 'Ab bVI', [[2,6],[3,5],[4,4],[5,4]], 2))
      .concat([n(4,4,0.5,'D',null,1,'line','Ramp'), n(4,6,0.5,'U',null,1,'line')])
      .concat(chord(2, 'Bb bVII', [[1,1],[2,3],[3,3],[4,3],[5,1]], 2))
      .concat([n(4,3,0.5,'D',null,3,'line'), n(4,5,0.5,'U',null,3,'line'), n(5,3,0.5,'D',null,3,'line')])
      .concat(chord(4, 'C I', [[1,3],[2,2],[3,0],[4,1],[5,0]], 2))
  },
  {
    id: 'rhy-plane-5',
    title: 'Power-chord planing rail',
    level: 'advanced',
    style: 'rhythm',
    genre: 'metal',
    key: 'E',
    bpm: 96,
    chords: ['E5', 'F5', 'G5'],
    summary: 'Parallel harmony. Same 1+5 grip slides. Chromatic rail then a scale rail. The shape is the chord.',
    watchFor: 'Mute between hits. If the old root rings under the new one, you are not planing, you are smearing.',
    goals: ['Slide the same two-finger 5th.', 'Hear chromatic planing vs scale-step planing.', 'Palm mute stays on through the slide.'],
    steps: [
      'E5 open, F5 at 1, F#5 at 2. Half steps. Chromatic planing.',
      'Then E5, G5, A5. Scale steps in E minor / pent.',
      'Name the new root out loud on every hit.'
    ],
    notes: []
      .concat(chord(0, 'E5', [[0,0],[1,2]], 0.5))
      .concat(chord(1, 'F5', [[0,1],[1,3]], 0.5))
      .concat(chord(2, 'F#5', [[0,2],[1,4]], 0.5))
      .concat(chord(3, 'G5', [[0,3],[1,5]], 0.5))
      .concat([
        n(0,0,0.5,'D',['PM'],4,'line','Scale rail'), n(1,2,0,null,null,4,'chord'),
        n(0,3,0.5,'D',['PM'],5,'line'), n(1,5,0,null,null,5,'chord'),
        n(0,5,1,'D',null,6,'line'), n(1,7,0,null,null,6,'chord')
      ])
  },
  {
    id: 'rhy-plane-maj',
    title: 'Major-shape planing',
    level: 'advanced',
    style: 'rhythm',
    genre: 'rock',
    key: 'C',
    bpm: 84,
    chords: ['C', 'D', 'E'],
    summary: 'Same major quality, new root every two beats. C to D to E. This is chromatic-quality planing, not I-ii-iii.',
    watchFor: 'D here is major, not Dm. If you play a minor shape you fell back into diatonic planing.',
    goals: ['Keep the quality identical.', 'Name each new root.', 'Crash back to C so it still has a door home.'],
    steps: [
      'C shape. Hold.',
      'Same family two frets up for D, two more for E.',
      'Walk back down to C on the last bar.'
    ],
    notes: []
      .concat(chord(0, 'C', [[1,3],[2,2],[3,0],[4,1],[5,0]], 2))
      .concat(chord(1, 'D', [[1,5],[2,4],[3,2],[4,3],[5,2]], 2))
      .concat(chord(2, 'E', [[0,0],[1,2],[2,2],[3,1],[4,0],[5,0]], 2))
      .concat(chord(3, 'C home', [[1,3],[2,2],[3,0],[4,1],[5,0]], 2))
  },
  {
    id: 'lead-guide-251',
    title: 'Guide-tone line on ii V I',
    level: 'advanced',
    style: 'lead',
    genre: 'jazz',
    key: 'C',
    scaleMode: 'dorian',
    scaleRoot: 'D',
    bpm: 72,
    summary: 'Voice leading. Only 3rds and 7ths on beat 1. F+C, then F+B, then E+B. Roots are optional.',
    watchFor: 'If beat 1 is a scale run instead of the 3rd or 7th, you are not leading voices.',
    goals: ['Keep one common tone when you can.', 'Move the other voice by a step.', 'Hear ii want V want I from two notes.'],
    steps: [
      'Dm7: F on the D string (3) and C on the B string (1).',
      'G7: keep F, drop C to B (open B).',
      'Cmaj7: keep B, drop F to E (D string 2).',
      'Add a short scale walk only after those landings are automatic.'
    ],
    notes: [
      n(2,3,1,'D',null,0,'line','Dm7 3+7'), n(4,1,1,'U',null,0,'line'),
      n(2,3,0.5,'D',null,1,'line','walk'), n(2,5,0.5,'U',null,1,'line'),
      n(2,3,1,'D',null,2,'line','G7'), n(4,0,1,'U',null,2,'line'),
      n(3,0,0.5,'D',null,3,'line'), n(3,2,0.5,'U',null,3,'line'),
      n(2,2,1,'D',null,4,'line','Cmaj7'), n(4,0,1,'U',null,4,'line'),
      n(5,0,1,'D',null,5,'line','C')
    ]
  },
  {
    id: 'ac-pivot-camg',
    title: 'Common-tone C Am F G',
    level: 'advanced',
    style: 'acoustic',
    genre: 'folk',
    key: 'C',
    bpm: 76,
    chords: ['C', 'Am', 'F', 'G'],
    summary: 'Voice leading through a pop map. C and E stay when you can. One finger moves. That is oblique motion.',
    watchFor: 'Do not lift the whole shape on Am. C and E are already under your fingers.',
    goals: ['Keep shared tones ringing.', 'Change on beat 1 with no hole.', 'Bass can walk; the inner voice stays.'],
    steps: [
      'C: A 3, B 1, high E 0.',
      'Am: drop A 3 to open A. B 1 and high E stay.',
      'F: thumb or A 3, B 1, high E 1. E moved one fret.',
      'G: low E 3, B 0, high E 3.',
      'Roll the same right hand on every bar.'
    ],
    notes: [
      n(1,3,0.5,'D',null,0,'line','C'), n(4,1,0.5,'U',null,0,'line'), n(5,0,0.5,'D',null,0,'line'), n(4,1,0.5,'U',null,0,'line'),
      n(1,0,0.5,'D',null,1,'line','Am'), n(4,1,0.5,'U',null,1,'line'), n(5,0,0.5,'D',null,1,'line'), n(4,1,0.5,'U',null,1,'line'),
      n(1,3,0.5,'D',null,2,'line','F'), n(4,1,0.5,'U',null,2,'line'), n(5,1,0.5,'D',['H'],2,'line'), n(4,1,0.5,'U',null,2,'line'),
      n(0,3,0.5,'D',null,3,'line','G'), n(4,0,0.5,'U',null,3,'line'), n(5,3,0.5,'D',null,3,'line'), n(4,0,0.5,'U',null,3,'line')
    ]
  },
  {
    id: 'lead-chrom-approach',
    title: 'Chromatic approach into the 3rd',
    level: 'advanced',
    style: 'lead',
    genre: 'jazz',
    key: 'C',
    scaleMode: 'ionian',
    scaleRoot: 'C',
    bpm: 70,
    summary: 'Half-step paint into a guide tone. The chromatic note lives on the last 8th. Beat 1 is the real 3rd.',
    watchFor: 'If the sharp or flat sits on beat 1, you missed the landing.',
    goals: ['Approach G from F#.', 'Approach E from D# or F.', 'Keep a common tone above or below.'],
    steps: [
      'Hold C on the B string (1).',
      'On the G string walk E-F-F#-G into a G chord tone.',
      'Then approach E (D string 2) from D# (1) and resolve to C.'
    ],
    notes: [
      n(4,1,1,'D',null,0,'line','Hold C'),
      n(3,0,0.5,'U',null,1,'line','Inner climb'), n(3,2,0.5,'D',null,1,'line'), n(3,3,0.5,'U',null,1,'line'), n(3,4,1,'D',null,1,'line'),
      n(2,1,0.5,'D',null,2,'line','To E'), n(2,2,1,'U',null,2,'line'),
      n(1,3,1,'D',null,3,'line','C')
    ]
  },
  {
    id: 'rhy-chrom-cliche',
    title: 'Chromatic bass under Am',
    level: 'advanced',
    style: 'rhythm',
    genre: 'folk',
    key: 'Am',
    bpm: 72,
    chords: ['Am', 'Am', 'Am', 'Am'],
    summary: 'Line cliche. Upper grip stays Am color. Bass walks A-G#-G-F#. Half steps only in one voice.',
    watchFor: 'If the whole shape slides, that is planing. Only the bass should move.',
    goals: ['Oblique upper voices.', 'Name each bass note.', 'Do not rush the half steps.'],
    steps: [
      'Hold B 1 and high E 0 through the bar.',
      'Bass: open A, G# on low E 4, G on low E 3, F# on low E 2.',
      'Retune the ear to Am after the walk. Home is still A.'
    ],
    notes: [
      n(1,0,1,'D',null,0,'line','A'), n(4,1,0.5,'U',null,0,'line'), n(5,0,0.5,'U',null,0,'line'),
      n(0,4,1,'D',null,1,'line','G#'), n(4,1,0.5,'U',null,1,'line'), n(5,0,0.5,'U',null,1,'line'),
      n(0,3,1,'D',null,2,'line','G'), n(4,1,0.5,'U',null,2,'line'), n(5,0,0.5,'U',null,2,'line'),
      n(0,2,1,'D',null,3,'line','F#'), n(4,1,0.5,'U',null,3,'line'), n(5,0,0.5,'U',null,3,'line')
    ]
  }
];
