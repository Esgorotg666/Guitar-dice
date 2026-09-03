function n(string, fret, beats, pick, tech, group, role, label) {
  var o = { string:string, fret:fret, beats:beats || 0.5, pick:pick || 'D', group:group, role:role || 'line' };
  if (tech && tech.length) o.tech = tech;
  if (label) o.groupLabel = label;
  return o;
}

export const CIRCLE_LESSONS = [
  {
    id: 'lead-fifth-shape',
    title: 'A Fifth Two Ways',
    level: 'intermediate',
    style: 'lead',
    genre: 'any',
    key: 'G',
    scaleMode: 'ionian',
    scaleRoot: 'G',
    bpm: 72,
    summary: 'G to D is one hour clockwise on the circle. Play it on one string (7 frets) and across strings (2 strings up, 2 frets back). Same interval. Two grips.',
    watchFor: 'Sing the D before you fret it. If you only see the shape, you do not have the interval yet.',
    goals: ['Hear a fifth as a sound, not a poster.', 'Find it on one string and across strings.', 'Name the next hour from any root you start on.'],
    steps: [
      'Low E fret 3 is G. Same string fret 10 is D. That is 7 frets = a fifth.',
      'Now G on low E 3, D on A 5. Two strings up, two frets forward from a 3 — check: 3+2=5. Same D.',
      'Start on A (open A). Fifth up is E. Find it both ways.',
      'Say it: from this note, one fifth up is ____. Then play it.'
    ],
    notes: [
      n(0,3,1,'D',null,0,'line','G same string'), n(0,10,1,'U',null,0,'line'),
      n(0,3,1,'D',null,1,'line','G across'), n(1,5,1,'U',null,1,'line'),
      n(1,0,1,'D',null,2,'line','A same string'), n(1,7,1,'U',null,2,'line'),
      n(1,0,1,'D',null,3,'line','A across'), n(2,2,1,'U',null,3,'line')
    ]
  },
  {
    id: 'rhy-145-clock',
    title: 'I–IV–V From Three Hours',
    level: 'intermediate',
    style: 'rhythm',
    genre: 'rock',
    key: 'G',
    bpm: 88,
    chords: ['G', 'C', 'D'],
    summary: 'I–IV–V is the hour you are on, one hour back, one hour forward. G–C–D, then the same machine on D (D–G–A) and A (A–D–E).',
    watchFor: 'Full shapes. Change on beat 1. The right hand does not restart.',
    goals: ['See I–IV–V as neighbors on the circle.', 'Move the same three-chord job to a new hour.', 'Keep time through the key change.'],
    steps: [
      'Hour G: G is I, C is IV (one fifth down), D is V (one fifth up).',
      'Hour D: D, G, A.',
      'Hour A: A, D, E.',
      'Two strums each. Say I, IV, V out loud on the changes.'
    ],
    notes: [
      n(0,3,1,'D',null,0,'chord','G I'), n(1,2,0,null,null,0,'chord'), n(2,0,0,null,null,0,'chord'), n(3,0,0,null,null,0,'chord'), n(4,0,0,null,null,0,'chord'), n(5,3,0,null,null,0,'chord'),
      n(1,3,1,'D',null,1,'chord','C IV'), n(2,2,0,null,null,1,'chord'), n(3,0,0,null,null,1,'chord'), n(4,1,0,null,null,1,'chord'), n(5,0,0,null,null,1,'chord'),
      n(1,5,1,'D',null,2,'chord','D V'), n(2,4,0,null,null,2,'chord'), n(3,2,0,null,null,2,'chord'), n(4,3,0,null,null,2,'chord'), n(5,2,0,null,null,2,'chord'),
      n(1,5,1,'D',null,3,'chord','D I'), n(2,4,0,null,null,3,'chord'), n(3,2,0,null,null,3,'chord'), n(4,3,0,null,null,3,'chord'), n(5,2,0,null,null,3,'chord'),
      n(0,3,1,'D',null,4,'chord','G IV'), n(1,2,0,null,null,4,'chord'), n(2,0,0,null,null,4,'chord'), n(3,0,0,null,null,4,'chord'), n(4,0,0,null,null,4,'chord'), n(5,3,0,null,null,4,'chord'),
      n(1,0,1,'D',null,5,'chord','A V'), n(2,2,0,null,null,5,'chord'), n(3,2,0,null,null,5,'chord'), n(4,2,0,null,null,5,'chord'), n(5,0,0,null,null,5,'chord')
    ]
  },
  {
    id: 'ac-rel-minor',
    title: 'The Inner Ring: Relatives',
    level: 'intermediate',
    style: 'acoustic',
    genre: 'folk',
    key: 'G',
    bpm: 80,
    chords: ['G', 'Em', 'C', 'Am'],
    summary: 'Every hour on the circle has a relative minor three frets down from the root, or the inner ring on the poster. G lives with Em. C lives with Am. Same notes, darker door.',
    watchFor: 'Keep the roll going. Only the bass and one chord tone change.',
    goals: ['Hear G and Em as the same hour.', 'Hear C and Am the same way.', 'Switch major to relative without stopping the right hand.'],
    steps: [
      'G: bass low E 3, then B 0, high E 3.',
      'Em: bass low E 0, then B 0, high E 0.',
      'C: bass A 3, B 1, high E 0.',
      'Am: bass open A, B 1, high E 0.'
    ],
    notes: [
      n(0,3,0.5,'D',null,0,'line','G'), n(4,0,0.5,'U',null,0,'line'), n(5,3,0.5,'D',null,0,'line'), n(4,0,0.5,'U',null,0,'line'),
      n(0,0,0.5,'D',null,1,'line','Em'), n(4,0,0.5,'U',null,1,'line'), n(5,0,0.5,'D',null,1,'line'), n(4,0,0.5,'U',null,1,'line'),
      n(1,3,0.5,'D',null,2,'line','C'), n(4,1,0.5,'U',null,2,'line'), n(5,0,0.5,'D',null,2,'line'), n(4,1,0.5,'U',null,2,'line'),
      n(1,0,0.5,'D',null,3,'line','Am'), n(4,1,0.5,'U',null,3,'line'), n(5,0,0.5,'D',null,3,'line'), n(4,1,0.5,'U',null,3,'line')
    ]
  },
  {
    id: 'rhy-cycle-walk',
    title: 'Walk Five Hours: C G D A E',
    level: 'advanced',
    style: 'rhythm',
    genre: 'rock',
    key: 'C',
    bpm: 92,
    summary: 'Bass then power fifth, one bar per hour, clockwise. C–G–D–A–E is how keys actually move in songs. This is the circle under your picking hand.',
    watchFor: 'The fifth rings with the bass. Do not rush the bar line when the root jumps.',
    goals: ['Root plus fifth through five hours.', 'Change on 1 with no extra mute click.', 'Say the new key name before you land it.'],
    steps: [
      'C: A 3 + D 5.',
      'G: low E 3 + A 5.',
      'D: A 5 + D 7.',
      'A: open A + D 2.',
      'E: low E open + A 2.'
    ],
    notes: [
      n(1,3,0.5,'D',null,0,'line','C'), n(2,5,0.5,'U',null,0,'line'), n(1,3,0.5,'D',null,0,'line'), n(2,5,0.5,'U',null,0,'line'),
      n(0,3,0.5,'D',null,1,'line','G'), n(1,5,0.5,'U',null,1,'line'), n(0,3,0.5,'D',null,1,'line'), n(1,5,0.5,'U',null,1,'line'),
      n(1,5,0.5,'D',null,2,'line','D'), n(2,7,0.5,'U',null,2,'line'), n(1,5,0.5,'D',null,2,'line'), n(2,7,0.5,'U',null,2,'line'),
      n(1,0,0.5,'D',null,3,'line','A'), n(2,2,0.5,'U',null,3,'line'), n(1,0,0.5,'D',null,3,'line'), n(2,2,0.5,'U',null,3,'line'),
      n(0,0,0.5,'D',null,4,'line','E'), n(1,2,0.5,'U',null,4,'line'), n(0,0,0.5,'D',null,4,'line'), n(1,2,0.5,'U',null,4,'line')
    ]
  },
  {
    id: 'lead-251-clock',
    title: 'ii–V–I Around Two Hours',
    level: 'advanced',
    style: 'lead',
    genre: 'jazz',
    key: 'C',
    scaleMode: 'dorian',
    scaleRoot: 'D',
    bpm: 80,
    summary: 'ii–V–I is three adjacent hours used as a sentence. Dm–G–C, then slide the sentence to Am–D–G. Roots only first, then a short line that lands on the new I.',
    watchFor: 'The last note of each cell is the new tonic. If you miss that landing, the clock did not turn.',
    goals: ['Hear ii–V–I as a pull to I.', 'Move the sentence one hour.', 'Land on the tonic, do not wander off.'],
    steps: [
      'Roots: D (open D), G (low E 3), C (A 3).',
      'Then A (open A), D (open D), G (low E 3).',
      'Add one scale step before each root so it feels like a line, not a bass class.'
    ],
    notes: [
      n(2,2,0.5,'D',null,0,'line','to C'), n(2,0,0.5,'U',null,0,'line'),
      n(0,5,0.5,'D',null,0,'line'), n(0,3,0.5,'U',null,0,'line'),
      n(1,5,0.5,'D',null,0,'line'), n(1,3,1,'U',null,0,'line'),
      n(1,2,0.5,'D',null,1,'line','to G'), n(1,0,0.5,'U',null,1,'line'),
      n(2,2,0.5,'D',null,1,'line'), n(2,0,0.5,'U',null,1,'line'),
      n(0,5,0.5,'D',null,1,'line'), n(0,3,1,'U',null,1,'line')
    ]
  }
];
