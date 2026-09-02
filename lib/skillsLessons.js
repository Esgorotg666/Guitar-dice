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
    summary: 'The first box every rock player uses. Ascend with hammers, descend with pull-offs, then resolve on G.',
    watchFor: 'Only pick the first note of each hammer pair. Pull-offs stay in time.',
    goals: ['Know box 1 in G minor pentatonic.', 'Hammer two notes with one pick.', 'Pull off on the way down.', 'Land on the root, not a random scale tone.'],
    steps: [
      'E string 3 to 6 — pick 3, hammer 6.',
      'A string 5 to 3 — pick 5, pull off 3.',
      'Same idea up D, G, B, high E.',
      'Come back down with pull-offs and stop on G (low E fret 3).'
    ],
    notes: [
      n(0,3,0.5,'D',null,0,'line','Up'), n(0,6,0.5,'D',['H'],0,'line'),
      n(1,5,0.5,'D',null,0,'line'), n(1,3,0.5,'D',['P'],0,'line'),
      n(2,5,0.5,'D',null,0,'line'), n(2,3,0.5,'D',['P'],0,'line'),
      n(3,5,0.5,'U',null,0,'line'), n(3,3,0.5,'U',['P'],0,'line'),
      n(4,6,0.5,'U',null,0,'line'), n(4,3,0.5,'U',['P'],0,'line'),
      n(5,6,0.5,'U',null,0,'line'), n(5,3,1,'D',['P'],0,'line'),
      n(5,6,0.5,'D',null,1,'line','Down'), n(5,3,0.5,'D',['P'],1,'line'),
      n(4,6,0.5,'D',null,1,'line'), n(4,3,0.5,'D',['P'],1,'line'),
      n(0,3,1,'D',null,1,'line')
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
    summary: 'Slide from box 1 into box 2 so the lick moves up the neck instead of sitting in one shape.',
    watchFor: 'The slide is one motion. Do not pick the arrival note.',
    goals: ['Slide into a target fret.', 'Connect two pentatonic boxes.', 'Keep the right hand quiet during the slide.'],
    steps: [
      'Start A minor pentatonic at fret 5.',
      'Slide G-string 5 up to 7.',
      'Finish in the higher box and resolve on A.'
    ],
    notes: [
      n(2,5,0.5,'D',null,0,'line','Box 1'), n(2,7,0.5,'D',null,0,'line'), n(3,5,0.5,'D',null,0,'line'),
      n(3,7,1,'D',['S'],1,'line','Slide up'),
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
    summary: 'Bend G-string 7 up a whole step to A, hold the pitch, add vibrato, then resolve to E.',
    watchFor: 'The bend must reach the next scale tone. Flat bends sound drunk.',
    goals: ['Bend a whole step in tune.', 'Hold the pitch before you release.', 'Add vibrato only after the bend is in tune.'],
    steps: [
      'Fret G-string 7 with two supporting fingers behind it.',
      'Push to A (same pitch as B-string 10 or G-string 9).',
      'Shake the held note, then land E on B-string 5.'
    ],
    notes: [
      n(3,7,0.5,'D',null,0,'line','Setup'), n(3,9,1.5,'D',['B','~'],1,'line','Bend + vib'),
      n(4,5,1,'D',null,2,'line','Resolve E')
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
    summary: 'Strict down-up through E minor so the right hand does not stall when you change strings.',
    watchFor: 'Every other note is an upstroke. Do not reset to a downstroke on a new string.',
    goals: ['Alternate pick without looking at the hand.', 'Cross strings without an extra downstroke.', 'Keep the notes even.'],
    steps: [
      'E string 0-2-3 with D-U-D.',
      'A string 0-2-3 with U-D-U — do not restart.',
      'Same across D and G, then back down.'
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
    summary: 'Chug E5, move to G5 and A5. Muted notes stay short. Open the last hit of each bar.',
    watchFor: 'Palm sits on the bridge. If the chord rings, you are not muting.',
    goals: ['Palm-mute a power chord.', 'Move the shape without lifting the mute.', 'Open one hit so the riff has air.'],
    steps: [
      'E5 at frets 0-2 on E and A. Mute four hits, open the fifth.',
      'Same count on G5 (3-5) and A5 (5-7).'
    ],
    notes: []
      .concat(chord(0, 'E5 muted', [[0,0],[1,2]], 0.5))
      .concat([n(0,0,0.5,'D',['PM'],1,'line','Chug'), n(0,0,0.5,'D',['PM'],1,'line'), n(0,0,0.5,'D',['PM'],1,'line'), n(0,0,0.5,'D',null,1,'line')])
      .concat(chord(2, 'G5', [[0,3],[1,5]], 0.5))
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
    summary: '16th-note right hand on E9. Most hits are muted. Accents on 2 and 4 make it funk instead of static strumming.',
    watchFor: 'The hand never stops. Mute with the palm, not by pausing.',
    goals: ['Keep 16ths moving.', 'Accent 2 and 4.', 'Let one chord stab ring so the groove breathes.'],
    steps: [
      'Hold E9 (or E7 if that is all you have).',
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
    summary: 'Thumb plays C-G-Am bass. Fingers play a small melody on the high strings so both hands work at once.',
    watchFor: 'Thumb stays on the beat. Melody notes are quieter than the bass.',
    goals: ['Separate thumb and fingers.', 'Change bass when the chord changes.', 'Keep a three-note melody over the top.'],
    steps: [
      'C: thumb A-string 3, then high E 0 and 3.',
      'G: thumb low E 3, same melody.',
      'Am: thumb A open, melody 0-1-0 on B.'
    ],
    notes: [
      n(1,3,1,'D',null,0,'line','C bass'), n(5,0,0.5,'U',null,0,'line'), n(5,3,0.5,'U',null,0,'line'),
      n(0,3,1,'D',null,1,'line','G bass'), n(5,0,0.5,'U',null,1,'line'), n(5,3,0.5,'U',null,1,'line'),
      n(1,0,1,'D',null,2,'line','Am bass'), n(4,0,0.5,'U',null,2,'line'), n(4,1,0.5,'U',['H'],2,'line'), n(4,0,1,'U',['P'],2,'line')
    ]
  }
];
