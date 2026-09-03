function n(string, fret, beats, pick, tech, group, role, label) {
  var o = { string:string, fret:fret, beats:beats || 0.25, pick:pick || 'D', group:group, role:role || 'line' };
  if (tech && tech.length) o.tech = tech;
  if (label) o.groupLabel = label;
  return o;
}

function slurCell(group, label, pairs) {
  var out = [];
  pairs.forEach(function (p, i) {
    out.push(n(p[0], p[1], 0.25, i === 0 ? 'D' : 'U', p[2], group, 'line', i === 0 ? label : null));
  });
  return out;
}

export const EXPERT_LESSONS = [
  {
    id: 'lead-legato-neck',
    title: 'Legato Sequence Across the Neck',
    level: 'master',
    style: 'lead',
    genre: 'rock',
    key: 'A',
    scaleMode: 'major-pent',
    scaleRoot: 'A',
    bpm: 72,
    summary: 'Pick once, pull off, cross strings, then shift the same cell up the neck. This is the difference between a pentatonic box and a lead player.',
    watchFor: 'Only the first note of each slur gets a pick. If the pulled note dies, the fretting hand is late or light.',
    goals: [
      'Keep 16ths even while slurring.',
      'Move the same cell through three positions.',
      'Land the last note with vibrato, not a thud.'
    ],
    steps: [
      'Position 1: high E 9 pull off 5, B 7, G 6, B 7. That cell is A major pentatonic.',
      'Repeat the cell starting 5-9-5, then 10-7.',
      'Shift the same shape down to 7-4, then 5-2.',
      'Shift it up to 14-9 and 17-14. Same right-hand rule.',
      'End on B-string 19 and shake it.'
    ],
    notes: []
      .concat(slurCell(0, 'Pos 1', [
        [5,9,null],[5,5,['P']],[4,7,null],[3,6,null],[4,7,null],
        [5,5,null],[5,9,['H']],[5,5,['P']],[5,10,null],[5,7,['P']],[4,7,null]
      ]))
      .concat(slurCell(1, 'Pos 2', [
        [5,7,null],[5,4,['P']],[4,6,null],[3,7,null],[4,6,null],
        [5,4,null],[5,7,['H']],[5,4,['P']]
      ]))
      .concat(slurCell(2, 'Pos 3', [
        [5,5,null],[5,2,['P']],[4,2,null],[3,2,null],[4,2,null],
        [5,2,null],[5,5,['H']],[5,2,['P']]
      ]))
      .concat(slurCell(3, 'High shift', [
        [5,14,null],[5,9,['P']],[4,10,null],[3,11,null],[4,10,null],
        [5,17,null],[5,14,['P']],[5,21,null],[5,17,['P']],[4,19,null]
      ]))
      .concat([n(4,19,2,'D',['~'],4,'line','Vibrato hold')])
  },
  {
    id: 'ac-roll-aed',
    title: 'A–E–D Rolling Arpeggios',
    level: 'advanced',
    style: 'acoustic',
    genre: 'folk',
    key: 'A',
    bpm: 84,
    chords: ['A', 'E', 'D'],
    summary: 'Thumb hits the bass on the beat. Fingers roll the chord tones as 16ths. Change A to E to D without breaking the right-hand motor.',
    watchFor: 'Thumb is louder than the roll. Do not rake all four strings as a strum.',
    goals: [
      'Separate thumb bass from finger roll.',
      'Keep the same right-hand order on A, E, and D.',
      'Change chords on beat 1 with no hole in the pattern.'
    ],
    steps: [
      'A: thumb open A, then G 2, B 2, high E open. Repeat.',
      'E: thumb low E, then G 1, B open, high E open.',
      'D: thumb open D, then G 2, B 3, high E 2.',
      'Two bars each. Count 1 e & a out loud until the change is invisible.'
    ],
    notes: [
      n(1,0,0.25,'D',null,0,'line','A roll'), n(3,2,0.25,'U',null,0,'line'), n(4,2,0.25,'D',null,0,'line'), n(5,0,0.25,'U',null,0,'line'),
      n(1,0,0.25,'D',null,0,'line'), n(3,2,0.25,'U',null,0,'line'), n(4,2,0.25,'D',null,0,'line'), n(5,0,0.25,'U',null,0,'line'),
      n(0,0,0.25,'D',null,1,'line','E roll'), n(3,1,0.25,'U',null,1,'line'), n(4,0,0.25,'D',null,1,'line'), n(5,0,0.25,'U',null,1,'line'),
      n(0,0,0.25,'D',null,1,'line'), n(3,1,0.25,'U',null,1,'line'), n(4,0,0.25,'D',null,1,'line'), n(5,0,0.25,'U',null,1,'line'),
      n(2,0,0.25,'D',null,2,'line','D roll'), n(3,2,0.25,'U',null,2,'line'), n(4,3,0.25,'D',null,2,'line'), n(5,2,0.25,'U',null,2,'line'),
      n(2,0,0.25,'D',null,2,'line'), n(3,2,0.25,'U',null,2,'line'), n(4,3,0.25,'D',null,2,'line'), n(5,2,0.25,'U',null,2,'line')
    ]
  },
  {
    id: 'lead-cmaj-work',
    title: 'C Major Across Two Strings, Then the Neck',
    level: 'advanced',
    style: 'lead',
    genre: 'folk',
    key: 'C',
    scaleMode: 'ionian',
    scaleRoot: 'C',
    bpm: 76,
    summary: 'Three original C-major drills: a two-string cell, the cell extended, then a descent that crosses onto G, D, and A. Not a box to memorize — a map to move.',
    watchFor: 'Even eighths. The open strings are still scale tones; do not rush them.',
    goals: [
      'Play C major on B and high E without looking.',
      'Extend the cell past the 5th fret.',
      'Descend the open-position scale across four strings.'
    ],
    steps: [
      'Cell: B 1-3, high E 0-1-3, back down.',
      'Extend the same two strings through 5-7-8, then back.',
      'Cross: finish the descent G 0-2, D 0-2-3, A 3.',
      'Then climb mid-neck C major: D 0-2-3, G 0-2, B 0-1.'
    ],
    notes: []
      .concat([
        n(4,1,0.5,'D',null,0,'line','Two-string cell'), n(4,3,0.5,'U',null,0,'line'),
        n(5,0,0.5,'D',null,0,'line'), n(5,1,0.5,'U',null,0,'line'), n(5,3,0.5,'D',null,0,'line'),
        n(5,1,0.5,'U',null,0,'line'), n(5,0,0.5,'D',null,0,'line'), n(4,3,0.5,'U',null,0,'line'), n(4,1,1,'D',null,0,'line')
      ])
      .concat([
        n(4,1,0.5,'D',null,1,'line','Extended'), n(4,3,0.5,'U',null,1,'line'),
        n(5,0,0.5,'D',null,1,'line'), n(5,1,0.5,'U',null,1,'line'), n(5,3,0.5,'D',null,1,'line'),
        n(5,5,0.5,'U',null,1,'line'), n(5,7,0.5,'D',null,1,'line'), n(5,8,0.5,'U',null,1,'line'),
        n(5,7,0.5,'D',null,1,'line'), n(5,5,0.5,'U',null,1,'line'), n(5,3,0.5,'D',null,1,'line'), n(5,0,1,'U',null,1,'line')
      ])
      .concat([
        n(5,3,0.5,'D',null,2,'line','Cross strings'), n(5,1,0.5,'U',null,2,'line'), n(5,0,0.5,'D',null,2,'line'),
        n(4,3,0.5,'U',null,2,'line'), n(4,1,0.5,'D',null,2,'line'), n(4,0,0.5,'U',null,2,'line'),
        n(3,2,0.5,'D',null,2,'line'), n(3,0,0.5,'U',null,2,'line'),
        n(2,3,0.5,'D',null,2,'line'), n(2,2,0.5,'U',null,2,'line'), n(2,0,0.5,'D',null,2,'line'), n(1,3,1,'D',null,2,'line')
      ])
  },
  {
    id: 'rhy-aed-drive',
    title: 'A E D as a Driving Rhythm',
    level: 'advanced',
    style: 'rhythm',
    genre: 'rock',
    key: 'A',
    bpm: 100,
    chords: ['A', 'E', 'D'],
    summary: 'Same three chords as the roll, but now it is a backbeat. Mute the ands, open the 2 and 4. This is how a paying rhythm player makes A–E–D move.',
    watchFor: 'The muted hits stay short. Chord changes land on beat 1, not late.',
    goals: ['Drive A–E–D with a backbeat.', 'Mute on the ands.', 'Keep the right hand moving through the change.'],
    steps: [
      'A: down, mute, down, mute.',
      'E: same right hand, new bass.',
      'D: same right hand. Do not look at the fretting hand after the first loop.'
    ],
    notes: [
      n(1,0,0.5,'D',null,0,'line','A'), n(3,2,0.25,'U',['PM'],0,'line'), n(4,2,0.5,'D',null,0,'line'), n(5,0,0.25,'U',['PM'],0,'line'),
      n(0,0,0.5,'D',null,1,'line','E'), n(3,1,0.25,'U',['PM'],1,'line'), n(4,0,0.5,'D',null,1,'line'), n(5,0,0.25,'U',['PM'],1,'line'),
      n(2,0,0.5,'D',null,2,'line','D'), n(3,2,0.25,'U',['PM'],2,'line'), n(4,3,0.5,'D',null,2,'line'), n(5,2,0.25,'U',['PM'],2,'line')
    ]
  }
];
