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

export const SKILL_LESSONS = [
  {
    id: 'lead-pent-1',
    title: 'G Minor Pentatonic Box 1',
    level: 'entry',
    style: 'lead',
    genre: 'rock',
    key: 'G',
    scaleMode: 'minor-pent',
    scaleRoot: 'G',
    bpm: 72,
    summary: 'Box 1, root on low E fret 3. Go up every string low-to-high with hammers. Come down with pull-offs. Stop on G.',
    watchFor: 'On the way up you hammer toward the body (3 then 5 or 6). Do not pull off while you are still climbing.',
    goals: ['Know the six-string box: 3-6, 3-5, 3-5, 3-5, 3-6, 3-6.', 'Pick only the first note of each pair.', 'End on the root G, not Bb.'],
    steps: [
      'Low E: pick 3, hammer 6 (G to Bb).',
      'A: pick 3, hammer 5 (C to D). Same idea on D and G (3 to 5).',
      'B: pick 3, hammer 6. High E: pick 3, hammer 6.',
      'Descend the same frets with pull-offs. Last note is low E fret 3 — G.'
    ],
    notes: [
      n(0,3,0.5,'D',null,0,'line','Up'), n(0,6,0.5,'D',['H'],0,'line'),
      n(1,3,0.5,'D',null,0,'line'), n(1,5,0.5,'D',['H'],0,'line'),
      n(2,3,0.5,'D',null,0,'line'), n(2,5,0.5,'D',['H'],0,'line'),
      n(3,3,0.5,'U',null,0,'line'), n(3,5,0.5,'U',['H'],0,'line'),
      n(4,3,0.5,'U',null,0,'line'), n(4,6,0.5,'U',['H'],0,'line'),
      n(5,3,0.5,'U',null,0,'line'), n(5,6,1,'D',['H'],0,'line'),
      n(5,6,0.5,'D',null,1,'line','Down'), n(5,3,0.5,'D',['P'],1,'line'),
      n(4,6,0.5,'D',null,1,'line'), n(4,3,0.5,'D',['P'],1,'line'),
      n(3,5,0.5,'D',null,1,'line'), n(3,3,0.5,'D',['P'],1,'line'),
      n(2,5,0.5,'D',null,1,'line'), n(2,3,0.5,'D',['P'],1,'line'),
      n(1,5,0.5,'D',null,1,'line'), n(1,3,0.5,'D',['P'],1,'line'),
      n(0,6,0.5,'D',null,1,'line'), n(0,3,1,'D',['P'],1,'line')
    ]
  },
  {
    id: 'lead-slide-1',
    title: 'Slides That Connect Positions',
    level: 'intermediate',
    style: 'lead',
    genre: 'blues',
    key: 'A',
    scaleMode: 'minor-pent',
    scaleRoot: 'A',
    bpm: 76,
    summary: 'A minor pentatonic. Start in box 1 (fret 5). Slide the G string 5 to 7 to enter box 2. Do not pick the note you slide into.',
    watchFor: 'The slide is one motion. If you pick fret 7, you missed the point.',
    goals: ['Slide into a target fret.', 'Connect two pentatonic boxes.', 'Keep the right hand quiet during the slide.'],
    steps: [
      'Box 1: D string 5-7 (G-A), G string 5 (C).',
      'Slide G string 5 up to 7 (C to D). Leave that 7 unpicked.',
      'Box 2: B string 8-5, land A on high E fret 5.'
    ],
    notes: [
      n(2,5,0.5,'D',null,0,'line','Box 1'), n(2,7,0.5,'D',null,0,'line'), n(3,5,0.5,'D',null,0,'line'),
      n(3,7,1,'D',['S'],1,'line','Slide to box 2'),
      n(4,8,0.5,'U',null,2,'line','Box 2'), n(4,5,0.5,'U',['P'],2,'line'), n(5,5,1,'D',null,2,'line')
    ]
  },
  {
    id: 'lead-bend-1',
    title: 'Bend to Pitch, Then Shake It',
    level: 'intermediate',
    style: 'lead',
    genre: 'rock',
    key: 'E',
    scaleMode: 'minor-pent',
    scaleRoot: 'E',
    bpm: 68,
    summary: 'G string fret 7 is the note D. Bend it a whole step to E (the same pitch as G string fret 9, or B string fret 5). Hold that E, add vibrato, then play E on the B string.',
    watchFor: 'If the bent note is short of E it sounds drunk. Match the target string before you shake.',
    goals: ['Bend D up to E in tune.', 'Hold the pitch before you release.', 'Add vibrato only after the bend is in tune.'],
    steps: [
      'Fret G-string 7 with ring. Index and middle behind it for support.',
      'Push to E. Check against G-string 9 or B-string 5.',
      'Shake the held E, then play B-string 5 (E) as the resolve.'
    ],
    notes: [
      n(3,7,0.5,'D',null,0,'line','D'), n(3,9,1.5,'D',['B','~'],1,'line','Bend to E'),
      n(4,5,1,'D',null,2,'line','E')
    ]
  },
  {
    id: 'lead-alt-1',
    title: 'Alternate Picking Across Strings',
    level: 'entry',
    style: 'lead',
    genre: 'metal',
    key: 'E',
    scaleMode: 'aeolian',
    scaleRoot: 'E',
    bpm: 80,
    summary: 'E natural minor: E F# G, A B C, D E F#, G A B. Strict down-up. Do not restart with a downstroke on a new string.',
    watchFor: 'Every other note is an upstroke. The D and G strings use fret 4 (F# and B), not fret 3.',
    goals: ['Alternate pick without looking at the hand.', 'Cross strings without an extra downstroke.', 'Keep the notes even.'],
    steps: [
      'Low E 0-2-3 with D-U-D (E F# G).',
      'A 0-2-3 with U-D-U (A B C) — do not restart.',
      'D 0-2-4 and G 0-2-4. Fret 4 is F# / B in this key.'
    ],
    notes: [
      n(0,0,0.5,'D',null,0,'line','Across'), n(0,2,0.5,'U',null,0,'line'), n(0,3,0.5,'D',null,0,'line'),
      n(1,0,0.5,'U',null,0,'line'), n(1,2,0.5,'D',null,0,'line'), n(1,3,0.5,'U',null,0,'line'),
      n(2,0,0.5,'D',null,0,'line'), n(2,2,0.5,'U',null,0,'line'), n(2,4,0.5,'D',null,0,'line'),
      n(3,0,0.5,'U',null,0,'line'), n(3,2,0.5,'D',null,0,'line'), n(3,4,1,'U',null,0,'line')
    ]
  },
  {
    id: 'rhy-pm-1',
    title: 'Palm-Muted Power Chords',
    level: 'entry',
    style: 'rhythm',
    genre: 'metal',
    key: 'E',
    bpm: 92,
    chords: ['E5', 'G5', 'A5'],
    summary: 'Root-fifth power chords. E5 is open E plus A fret 2. G5 is E3 + A5. A5 is E5 + A7. Mute stays on while you move.',
    watchFor: 'Palm sits on the bridge. If the chord rings, you are not muting.',
    goals: ['Palm-mute a power chord.', 'Move the shape without lifting the mute.', 'Open one hit so the riff has air.'],
    steps: [
      'E5: low E open, A fret 2. Mute four hits, open the last.',
      'Slide the two-finger shape to G5 (3 and 5), then A5 (5 and 7).'
    ],
    notes: []
      .concat(chord(0, 'E5', [[0,0],[1,2]], 1))
      .concat([n(0,0,0.5,'D',['PM'],1,'line','Chug'), n(0,0,0.5,'D',['PM'],1,'line'), n(0,0,0.5,'D',['PM'],1,'line'), n(0,0,0.5,'D',null,1,'line')])
      .concat(chord(2, 'G5', [[0,3],[1,5]], 1))
      .concat([n(0,3,0.5,'D',['PM'],3,'line'), n(0,3,0.5,'D',['PM'],3,'line'), n(0,3,0.5,'D',null,3,'line')])
      .concat(chord(4, 'A5', [[0,5],[1,7]], 1))
  },
  {
    id: 'rhy-funk-1',
    title: 'Muted 16th-Note Strum',
    level: 'intermediate',
    style: 'rhythm',
    genre: 'funk',
    key: 'E',
    bpm: 96,
    chords: ['E9'],
    summary: '16th-note right hand on E9 (D1 G2 B0 e0 is enough). Most hits are muted. Accents on 2 and 4 make it funk.',
    watchFor: 'The hand never stops. Mute with the palm, not by pausing.',
    goals: ['Keep 16ths moving.', 'Accent 2 and 4.', 'Let one chord stab ring so the groove breathes.'],
    steps: [
      'Hold E9: D fret 1, G fret 2, B and high E open. Mute low E and A.',
      'Down-up-down-up every beat.',
      'Mute all but the and-of-2 and beat 4.'
    ],
    notes: [
      n(2,1,0.25,'D',['PM'],0,'line','16ths'), n(3,2,0.25,'U',['PM'],0,'line'), n(4,0,0.25,'D',['PM'],0,'line'), n(5,0,0.25,'U',['PM'],0,'line'),
      n(2,1,0.25,'D',null,1,'line','Stab'), n(3,2,0.25,'U',['PM'],1,'line'), n(4,0,0.25,'D',['PM'],1,'line'), n(5,0,0.25,'U',['PM'],1,'line'),
      n(2,1,0.25,'D',['PM'],2,'line'), n(3,2,0.25,'U',['PM'],2,'line'), n(4,0,0.25,'D',null,2,'line'), n(5,0,0.25,'U',['PM'],2,'line')
    ]
  },
  {
    id: 'ac-finger-1',
    title: 'Thumb Bass Against Finger Melody',
    level: 'intermediate',
    style: 'acoustic',
    genre: 'folk',
    key: 'C',
    bpm: 76,
    chords: ['C', 'G', 'Am'],
    summary: 'Thumb plays the bass of C, G, then Am. Fingers play a small high-string melody so both hands work at once.',
    watchFor: 'Thumb stays on the beat. Melody notes are quieter than the bass.',
    goals: ['Separate thumb and fingers.', 'Change bass when the chord changes.', 'Keep a three-note melody over the top.'],
    steps: [
      'C: thumb A-string 3 (C), then high E 0 and 3 (E and G).',
      'G: thumb low E 3 (G), same melody.',
      'Am: thumb A open (A), melody B 0-1-0 (B-C-B).'
    ],
    notes: [
      n(1,3,1,'D',null,0,'line','C bass'), n(5,0,0.5,'U',null,0,'line'), n(5,3,0.5,'U',null,0,'line'),
      n(0,3,1,'D',null,1,'line','G bass'), n(5,0,0.5,'U',null,1,'line'), n(5,3,0.5,'U',null,1,'line'),
      n(1,0,1,'D',null,2,'line','Am bass'), n(4,0,0.5,'U',null,2,'line'), n(4,1,0.5,'U',['H'],2,'line'), n(4,0,1,'U',['P'],2,'line')
    ]
  }
];
