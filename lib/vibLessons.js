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

export const VIB_LESSONS = [
  {
    id: 'lead-vib-1',
    title: 'Hold Still, Then Shake',
    level: 'entry',
    style: 'lead',
    genre: 'rock',
    key: 'A',
    bpm: 66,
    summary: 'The first vibrato skill is delay. Land the pitch dead still, then start a medium shake so the note sings instead of twitching from the attack.',
    watchFor: 'Do not start the shake on the pick. Two beats still, two beats moving. Width stays the same every cycle.',
    goals: ['Hold a clean pitch with no motion.', 'Start vibrato after the note speaks.', 'Keep every cycle the same width.'],
    steps: [
      'Fret G-string 7 with ring finger. Support with the fingers behind it.',
      'Pick and hold two beats with no movement.',
      'Then rotate the wrist — string goes sharp and back, not a finger wiggle.',
      'Repeat on B-string 5 and resolve on A (G-string 2).'
    ],
    notes: [
      n(3,7,2,'D',null,0,'line','Hold still'),
      n(3,7,2,'D',['VD','~'],1,'line','Then shake'),
      n(4,5,1,'D',['VD','~'],2,'line'),
      n(3,2,2,'D',null,3,'line','Resolve A')
    ]
  },
  {
    id: 'lead-vib-wide',
    title: 'Slow Wide Vibrato',
    level: 'intermediate',
    style: 'lead',
    genre: 'blues',
    key: 'A',
    bpm: 60,
    summary: 'B.B. / SRV style: thumb over the neck, knuckle as a fulcrum, slow wide cycles. Vocal, not nervous.',
    watchFor: 'Down and back from the wrist. If cycle three is wider than cycle one, you lost the center.',
    goals: ['Use wrist rotation, not a fingertip pump.', 'Keep a slow rate (~2–3 Hz).', 'Stay centered on the written pitch.'],
    steps: [
      'Thumb over the top. First-finger knuckle on the side of the neck.',
      'G-string 7: pick, delay, then wide slow shake.',
      'Same on B-string 8, then walk down to A.'
    ],
    notes: [
      n(3,7,3,'D',['VW','~'],0,'line','Wide G'),
      n(4,8,2,'D',['VW','~'],1,'line','Wide B'),
      n(4,5,2,'D',['VD','~'],2,'line','A')
    ]
  },
  {
    id: 'lead-vib-tight',
    title: 'Tight Fast Vibrato',
    level: 'intermediate',
    style: 'lead',
    genre: 'metal',
    key: 'E',
    bpm: 72,
    summary: 'Narrow, fast shake for rock and metal. Starts sooner than blues vibrato but still after the attack. Width stays small so the note does not sound drunk.',
    watchFor: 'Fast is not wide. If it goes more than a quarter-step, shrink it.',
    goals: ['Shake at about 6 Hz.', 'Keep the width narrow.', 'Do not yank sharper as you speed up.'],
    steps: [
      'G-string 9, support fingers behind.',
      'Short hold, then tight fast cycles.',
      'Same idea on B-string 8, resolve E.'
    ],
    notes: [
      n(3,9,2,'D',['VF','~'],0,'line','Tight'),
      n(4,8,2,'D',['VF','~'],1,'line'),
      n(4,5,1.5,'D',['VD','~'],2,'line','E')
    ]
  },
  {
    id: 'ac-vib-classical',
    title: 'Classical Around-the-Pitch Vibrato',
    level: 'intermediate',
    style: 'acoustic',
    genre: 'folk',
    key: 'D',
    bpm: 58,
    summary: 'Push toward the nut and pull toward the bridge so the pitch goes flat and sharp around the written note. Arm pendulum, not a bend.',
    watchFor: 'Pressure stays on the string. The arm swings. Do not squeeze the neck dead.',
    goals: ['Move along the string, not across it.', 'Circle under and over the pitch.', 'Keep it narrow enough that the chord tone stays clear.'],
    steps: [
      'Fret B-string 3 (D).',
      'After the note speaks, rock the forearm toward the nut, then the bridge.',
      'Repeat on G-string 2 and high E 2.'
    ],
    notes: [
      n(4,3,3,'D',['VC','~'],0,'line','Around D'),
      n(3,2,2,'D',['VC','~'],1,'line'),
      n(5,2,2,'D',['VC','~'],2,'line')
    ]
  },
  {
    id: 'rhy-vib-chord',
    title: 'Chord Vibrato Without Breaking the Shape',
    level: 'advanced',
    style: 'rhythm',
    genre: 'folk',
    key: 'G',
    bpm: 64,
    chords: ['G', 'Em'],
    summary: 'You cannot bend three notes of a chord evenly with fingertips. Change neck tension against the picking arm so the whole shape breathes.',
    watchFor: 'Soft and slow. If one string goes more than the others, you are bending instead of moving the neck.',
    goals: ['Keep the chord shape planted.', 'Move pitch on all ringing strings together.', 'Use it on the last beat, not every strum.'],
    steps: [
      'Plant a full G. Let it ring.',
      'On the last two beats, press the neck slightly against the body so the chord shimmers.',
      'Same idea on Em, then back to G.'
    ],
    notes: []
      .concat(chord(0, 'G ring', [[0,3],[1,2],[2,0],[3,0],[4,0],[5,3]], 2))
      .concat([n(4,0,2,'D',['VC','~'],1,'line','Chord shimmer')])
      .concat(chord(2, 'Em ring', [[0,0],[1,2],[2,2],[3,0],[4,0],[5,0]], 2))
      .concat([n(4,0,2,'D',['VC','~'],3,'line')])
  }
];
