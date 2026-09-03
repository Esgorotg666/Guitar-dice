function n(string, fret, beats, pick, tech, group, role, label) {
  var o = { string:string, fret:fret, beats:beats || 0.25, pick:pick || 'D', group:group, role:role || 'line' };
  if (tech && tech.length) o.tech = tech;
  if (label) o.groupLabel = label;
  return o;
}

function du(string, fret, hits, group, label, beat) {
  var out = [];
  var b = beat || 0.25;
  for (var i = 0; i < hits; i++) {
    out.push(n(string, fret, b, i % 2 === 0 ? 'D' : 'U', null, group, 'line', i === 0 ? label : null));
  }
  return out;
}

function spiderOn(string, frets, group, label, beat) {
  var out = [];
  var b = beat || 0.5;
  frets.forEach(function (f, i) {
    out.push(n(string, f, b, i % 2 === 0 ? 'D' : 'U', null, group, 'line', i === 0 ? label : null));
  });
  return out;
}

export const HAND_DRILLS = [
  {
    id: 'lead-rh-open',
    title: 'Open-String Down-Up Motor',
    level: 'intermediate',
    style: 'lead',
    genre: 'any',
    key: 'E',
    bpm: 72,
    summary: 'No left hand. Open A, strict down-up sixteenths. If this wobbles, every lick after it is lying to you.',
    watchFor: 'Wrist, not elbow. The pick moves a few millimeters. Unused strings stay dead.',
    goals: ['Even D-U on one open string.', 'Same volume on the upstroke as the down.', 'Keep the grid when you rest.'],
    steps: [
      'Mute everything except the A string with the left hand lightly parked.',
      'Down on the beat, up on the e. Count 1 e & a.',
      'If an upstroke disappears, you are scooping. Flatten the pick path.',
      'Do not add fretted notes until eight loops are clean.'
    ],
    notes: du(1, 0, 16, 0, 'Open A motor', 0.25)
  },
  {
    id: 'lead-rh-2nps',
    title: 'Two Notes Per String, All Six',
    level: 'intermediate',
    style: 'lead',
    genre: 'any',
    key: 'E',
    bpm: 76,
    summary: 'Two picked notes on each string, walk E to high E and back. The string change is the lesson. The notes are just traffic cones.',
    watchFor: 'The first note on the new string must land on time. That is the escape, not a pause.',
    goals: ['Change strings without a hole.', 'Keep D-U through the crossing.', 'Same attack on every string.'],
    steps: [
      'Low E open twice, A open twice, D, G, B, high E.',
      'Walk back down the same way.',
      'Watch the pick: it has to clear the finished string before it hits the next one.'
    ],
    notes: []
      .concat(du(0,0,2,0,'Up the neck',0.25))
      .concat(du(1,0,2,0,null,0.25))
      .concat(du(2,0,2,0,null,0.25))
      .concat(du(3,0,2,0,null,0.25))
      .concat(du(4,0,2,0,null,0.25))
      .concat(du(5,0,2,0,null,0.25))
      .concat(du(4,0,2,1,'Back down',0.25))
      .concat(du(3,0,2,1,null,0.25))
      .concat(du(2,0,2,1,null,0.25))
      .concat(du(1,0,2,1,null,0.25))
      .concat(du(0,0,2,1,null,0.25))
  },
  {
    id: 'lead-rh-outside',
    title: 'Outside Picking Cell',
    level: 'advanced',
    style: 'lead',
    genre: 'rock',
    key: 'A',
    bpm: 80,
    summary: 'Down on the lower string, up on the higher one. The pick approaches the pair from the outside. This is the crossing most rock lines actually use.',
    watchFor: 'Do not rake both strings on the downstroke. Hit A, then B — two attacks.',
    goals: ['Outside D on A, U on G.', 'Loop the cell without a click between strings.', 'Keep the pick small.'],
    steps: [
      'A string fret 7 down, G string fret 7 up. Repeat.',
      'Then A 9 down, G 9 up.',
      'That is one outside cell moved. Same right hand both times.'
    ],
    notes: [
      n(1,7,0.25,'D',null,0,'line','Outside 7'), n(3,7,0.25,'U',null,0,'line'),
      n(1,7,0.25,'D',null,0,'line'), n(3,7,0.25,'U',null,0,'line'),
      n(1,7,0.25,'D',null,0,'line'), n(3,7,0.25,'U',null,0,'line'),
      n(1,7,0.25,'D',null,0,'line'), n(3,7,0.25,'U',null,0,'line'),
      n(1,9,0.25,'D',null,1,'line','Outside 9'), n(3,9,0.25,'U',null,1,'line'),
      n(1,9,0.25,'D',null,1,'line'), n(3,9,0.25,'U',null,1,'line'),
      n(1,9,0.25,'D',null,1,'line'), n(3,9,0.25,'U',null,1,'line'),
      n(1,9,0.25,'D',null,1,'line'), n(3,9,0.25,'U',null,1,'line')
    ]
  },
  {
    id: 'lead-rh-inside',
    title: 'Inside Picking Cell',
    level: 'advanced',
    style: 'lead',
    genre: 'rock',
    key: 'A',
    bpm: 80,
    summary: 'Up on the lower string, down on the higher one. The pick works in the gap. If outside felt easy and this feels trapped, that is the point.',
    watchFor: 'The upstroke on A has to clear before the down on G. If you click the D string you are inside and sloppy.',
    goals: ['Inside U on A, D on G.', 'Same cell as the outside lesson, opposite escape.', 'Know which crossing you are on.'],
    steps: [
      'A 7 up, G 7 down. That feels backwards. Good.',
      'Loop eight times before you move the cell to 9.',
      'Play the outside lesson right after this. The difference should be obvious in the wrist.'
    ],
    notes: [
      n(1,7,0.25,'U',null,0,'line','Inside 7'), n(3,7,0.25,'D',null,0,'line'),
      n(1,7,0.25,'U',null,0,'line'), n(3,7,0.25,'D',null,0,'line'),
      n(1,7,0.25,'U',null,0,'line'), n(3,7,0.25,'D',null,0,'line'),
      n(1,7,0.25,'U',null,0,'line'), n(3,7,0.25,'D',null,0,'line'),
      n(1,9,0.25,'U',null,1,'line','Inside 9'), n(3,9,0.25,'D',null,1,'line'),
      n(1,9,0.25,'U',null,1,'line'), n(3,9,0.25,'D',null,1,'line'),
      n(1,9,0.25,'U',null,1,'line'), n(3,9,0.25,'D',null,1,'line'),
      n(1,9,0.25,'U',null,1,'line'), n(3,9,0.25,'D',null,1,'line')
    ]
  },
  {
    id: 'lead-rh-odds',
    title: 'Odd Groupings on One String',
    level: 'advanced',
    style: 'lead',
    genre: 'rock',
    key: 'A',
    bpm: 84,
    summary: 'Three notes, then five, still strict D-U. The downstroke will not always land on beat 1. That is how you stop only picking downs when it feels important.',
    watchFor: 'Do not restart the pick on every group. The motor keeps running across the bar line.',
    goals: ['Groups of 3 stay D-U-D, next group starts on an up.', 'Groups of 5 do not get a secret extra down.', 'The click still lines up.'],
    steps: [
      'A string fret 5: three 16ths, rest, three 16ths, rest.',
      'Then five 16ths, rest, five 16ths.',
      'Say the pick out loud: down up down, up down up.'
    ],
    notes: [
      n(1,5,0.25,'D',null,0,'line','Threes'), n(1,5,0.25,'U',null,0,'line'), n(1,5,0.25,'D',null,0,'line'),
      n(1,5,0.25,'U',null,0,'line'), n(1,5,0.25,'D',null,0,'line'), n(1,5,0.25,'U',null,0,'line'),
      n(1,7,0.25,'D',null,1,'line','Fives'), n(1,7,0.25,'U',null,1,'line'), n(1,7,0.25,'D',null,1,'line'), n(1,7,0.25,'U',null,1,'line'), n(1,7,0.25,'D',null,1,'line'),
      n(1,7,0.25,'U',null,1,'line'), n(1,7,0.25,'D',null,1,'line'), n(1,7,0.25,'U',null,1,'line'), n(1,7,0.25,'D',null,1,'line'), n(1,7,0.25,'U',null,1,'line')
    ]
  },
  {
    id: 'lead-spider-134',
    title: '1-3-2-4 Spider on Each String',
    level: 'advanced',
    style: 'lead',
    genre: 'any',
    key: 'G',
    bpm: 60,
    summary: 'Frets 3-5-4-6. Fingers 1-3-2-4. Index and middle want to pair. Ring and pinky want to pair. This order breaks both on purpose.',
    watchFor: 'Every note the same volume. A dead 4 means the pinky is late, not that the drill is too fast.',
    goals: ['1-3-2-4 clean on one string.', 'Walk the cell up all six strings.', 'Unused fingers hover, they do not fist.'],
    steps: [
      'One finger per fret: 3=1, 5=3, 4=2, 6=4.',
      'Low E, then A, D, G, B, high E. Same four frets.',
      'If the ring finger lifts the index, stop and do only 3 then 5 until it stays planted.'
    ],
    notes: []
      .concat(spiderOn(0, [3,5,4,6], 0, 'Low E', 0.5))
      .concat(spiderOn(1, [3,5,4,6], 1, 'A', 0.5))
      .concat(spiderOn(2, [3,5,4,6], 2, 'D', 0.5))
      .concat(spiderOn(3, [3,5,4,6], 3, 'G', 0.5))
      .concat(spiderOn(4, [3,5,4,6], 4, 'B', 0.5))
      .concat(spiderOn(5, [3,5,4,6], 5, 'High E', 0.5))
  },
  {
    id: 'lead-spider-stagger',
    title: 'Staggered Spider Across Strings',
    level: 'master',
    style: 'lead',
    genre: 'any',
    key: 'G',
    bpm: 56,
    summary: 'Same 3-5-4-6 order, but each finger lands on the next string. Now a finger has to leave while another stays. That is independence that survives a lick.',
    watchFor: 'No squeak when you leave a string. Lift, do not drag.',
    goals: ['Cross strings inside the 1-3-2-4 order.', 'Keep one finger down while the next plays.', 'Even eighths at a crawl.'],
    steps: [
      'Low E 3, A 5, D 4, G 6.',
      'Then A 3, D 5, G 4, B 6.',
      'Then D 3, G 5, B 4, high E 6.',
      'Slow enough that you can name the finger out loud.'
    ],
    notes: [
      n(0,3,0.5,'D',null,0,'line','Climb 1'), n(1,5,0.5,'U',null,0,'line'), n(2,4,0.5,'D',null,0,'line'), n(3,6,0.5,'U',null,0,'line'),
      n(1,3,0.5,'D',null,1,'line','Climb 2'), n(2,5,0.5,'U',null,1,'line'), n(3,4,0.5,'D',null,1,'line'), n(4,6,0.5,'U',null,1,'line'),
      n(2,3,0.5,'D',null,2,'line','Climb 3'), n(3,5,0.5,'U',null,2,'line'), n(4,4,0.5,'D',null,2,'line'), n(5,6,0.5,'U',null,2,'line')
    ]
  },
  {
    id: 'lead-spider-wide',
    title: 'Wide 1-3-2-4 Stretch',
    level: 'master',
    style: 'lead',
    genre: 'any',
    key: 'A',
    bpm: 52,
    summary: 'Frets 5-8-7-10. Same finger order, bigger stretch. If the wrist folds, move it down. Do not force a 10th-fret pinky with a collapsed hand.',
    watchFor: 'Thumb behind the neck, not over the top. Pain is a stop, not a badge.',
    goals: ['1-3-2-4 at a wider span.', 'Walk it across three strings only.', 'Stay relaxed. Stretch comes from placement, not squeeze.'],
    steps: [
      'Low E 5-8-7-10.',
      'A 5-8-7-10.',
      'D 5-8-7-10.',
      'Stop if a knuckle locks. Shift the whole shape toward the nut and try again tomorrow.'
    ],
    notes: []
      .concat(spiderOn(0, [5,8,7,10], 0, 'Low E wide', 0.5))
      .concat(spiderOn(1, [5,8,7,10], 1, 'A wide', 0.5))
      .concat(spiderOn(2, [5,8,7,10], 2, 'D wide', 0.5))
  },
  {
    id: 'ac-im-open',
    title: 'i-m Alternation on One String',
    level: 'intermediate',
    style: 'acoustic',
    genre: 'folk',
    key: 'G',
    bpm: 66,
    summary: 'Index and middle take turns on open G. Never i then i. This is the fingerstyle twin of down-up. The app still marks D/U so you hear the grid; on the guitar use i then m.',
    watchFor: 'Match tone. If i is loud and m is thin you do not have alternation, you have a favorite finger.',
    goals: ['i-m on one string with even tone.', 'Prepare the next finger before the current one finishes.', 'Thumb parked on a bass string as an anchor.'],
    steps: [
      'Rest the thumb on open D and leave it there.',
      'Index plays open G, middle plays open G. Repeat.',
      'As i plays, m is already moving out. Scissor, not two pokes.'
    ],
    notes: du(3, 0, 16, 0, 'i-m on G', 0.5)
  },
  {
    id: 'ac-am-roll',
    title: 'Am Dm E C Finger Roll',
    level: 'advanced',
    style: 'acoustic',
    genre: 'folk',
    key: 'Am',
    bpm: 76,
    chords: ['Am', 'Dm', 'E', 'C'],
    summary: 'Same right-hand order on every bar: thumb bass, then G, B, high E. Only the left-hand chord changes. Original study of the beginner arpeggio-song idea — not that arrangement.',
    watchFor: 'Thumb on 1 and 3. Fingers fill the ands. Do not rake.',
    goals: ['One right-hand pattern through four chords.', 'Change on beat 1 with no hole.', 'Bass louder than the roll.'],
    steps: [
      'Am: thumb open A, G 2, B 1, high E 0.',
      'Dm: thumb open D, G 2, B 3, high E 1.',
      'E: thumb low E, G 1, B 0, high E 0.',
      'C: thumb A 3, G 0, B 1, high E 0.'
    ],
    notes: [
      n(1,0,0.25,'D',null,0,'line','Am'), n(3,2,0.25,'U',null,0,'line'), n(4,1,0.25,'D',null,0,'line'), n(5,0,0.25,'U',null,0,'line'),
      n(1,0,0.25,'D',null,0,'line'), n(3,2,0.25,'U',null,0,'line'), n(4,1,0.25,'D',null,0,'line'), n(5,0,0.25,'U',null,0,'line'),
      n(2,0,0.25,'D',null,1,'line','Dm'), n(3,2,0.25,'U',null,1,'line'), n(4,3,0.25,'D',null,1,'line'), n(5,1,0.25,'U',null,1,'line'),
      n(2,0,0.25,'D',null,1,'line'), n(3,2,0.25,'U',null,1,'line'), n(4,3,0.25,'D',null,1,'line'), n(5,1,0.25,'U',null,1,'line'),
      n(0,0,0.25,'D',null,2,'line','E'), n(3,1,0.25,'U',null,2,'line'), n(4,0,0.25,'D',null,2,'line'), n(5,0,0.25,'U',null,2,'line'),
      n(0,0,0.25,'D',null,2,'line'), n(3,1,0.25,'U',null,2,'line'), n(4,0,0.25,'D',null,2,'line'), n(5,0,0.25,'U',null,2,'line'),
      n(1,3,0.25,'D',null,3,'line','C'), n(3,0,0.25,'U',null,3,'line'), n(4,1,0.25,'D',null,3,'line'), n(5,0,0.25,'U',null,3,'line'),
      n(1,3,0.25,'D',null,3,'line'), n(3,0,0.25,'U',null,3,'line'), n(4,1,0.25,'D',null,3,'line'), n(5,0,0.25,'U',null,3,'line')
    ]
  }
];
