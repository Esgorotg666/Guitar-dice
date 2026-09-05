function n(string, fret, beats, pick, tech, group, role, label) {
  var o = { string: string, fret: fret, beats: beats || 1, pick: pick || 'D', group: group, role: role || 'line' };
  if (tech && tech.length) o.tech = tech;
  if (label) o.groupLabel = label;
  return o;
}

function chord(frets, group, label, beats) {
  var b = beats || 4;
  return frets.map(function (fret, string) {
    if (fret === 'x' || fret === 'X') return null;
    return n(string, fret, b, 'D', ['L'], group, 'chord', string === 0 ? label : null);
  }).filter(Boolean);
}

var HOLD = {
  title: 'Hold the guitar',
  level: 'entry',
  genre: 'any',
  key: 'E',
  bpm: 60,
  summary: 'Day 1, step 1. Sit so the guitar does not slide. Fretting hand thumb behind the neck. Picking hand rests near the sound hole or pickups. No chords yet.',
  watchFor: 'Do not squeeze. Fingertips will get tender. That is normal. Pain in the wrist is not — stop and reset.',
  goals: ['Guitar stays put without a death grip.', 'Thumb behind the neck, not over the top.', 'Both feet on the floor, back reasonably straight.'],
  steps: [
    'Sit on a chair with no arms. Guitar waist on your right thigh if you play right-handed.',
    'Neck points slightly up, not at the floor.',
    'Left-hand thumb sits on the back of the neck, roughly behind fret 2.',
    'Right forearm rests on the guitar body. Shake the hand once. It should stay relaxed.',
    'Hold that for one minute. Put it down. That is the lesson.'
  ],
  notes: [
    n(0, 0, 2, 'D', ['L'], 0, 'line', 'Low E open — just rest'),
    n(5, 0, 2, 'D', ['L'], 1, 'line', 'High E open — just rest')
  ]
};

var STRINGS = {
  title: 'Name the six strings',
  level: 'entry',
  genre: 'any',
  key: 'E',
  bpm: 50,
  summary: 'Thickest string is 6, low E. Then A, D, G, B, high E. Say Eddie Ate Dynamite Good Bye Eddie, or any phrase you will remember.',
  watchFor: 'Pluck one string at a time. If two ring, rest a finger on the extra one.',
  goals: ['Point to each string and name it.', 'Hear low E vs high E.', 'Know string 6 is the fat one.'],
  steps: [
    'Low E (6), A (5), D (4), G (3), B (2), high E (1).',
    'Say the name out loud as you pluck.',
    'Go back down: high E, B, G, D, A, low E.',
    'Do it twice. Tomorrow you will still mix B and G. That is fine.'
  ],
  notes: [
    n(0, 0, 2, 'D', null, 0, 'line', 'Low E'),
    n(1, 0, 2, 'D', null, 1, 'line', 'A'),
    n(2, 0, 2, 'D', null, 2, 'line', 'D'),
    n(3, 0, 2, 'D', null, 3, 'line', 'G'),
    n(4, 0, 2, 'D', null, 4, 'line', 'B'),
    n(5, 0, 2, 'D', null, 5, 'line', 'High E')
  ]
};

var TUNE = {
  title: 'First tune-up',
  level: 'entry',
  genre: 'any',
  key: 'E',
  bpm: 40,
  summary: 'Open Tools and use the tuner. One string at a time. Tightening raises pitch. If you are lost, start on the fat E.',
  watchFor: 'Tiny turns. A full twist can snap a string. If the peg spins forever you are on the wrong peg.',
  goals: ['Find the tuner tab.', 'Get each open string near the letter.', 'Stop when it is close enough to play Em.'],
  steps: [
    'Open Tools → Tuner. Pluck low E. Turn its peg until the tuner says E.',
    'A, D, G, B, high E. Same idea.',
    'New strings drift. Check again after five minutes of playing.',
    'You do not need perfect cents today. You need six notes that are in the neighborhood.'
  ],
  notes: [
    n(0, 0, 2, 'D', null, 0, 'line', 'Tune E'),
    n(1, 0, 2, 'D', null, 1, 'line', 'Tune A'),
    n(2, 0, 2, 'D', null, 2, 'line', 'Tune D'),
    n(3, 0, 2, 'D', null, 3, 'line', 'Tune G'),
    n(4, 0, 2, 'D', null, 4, 'line', 'Tune B'),
    n(5, 0, 2, 'D', null, 5, 'line', 'Tune high E')
  ]
};

var EM = {
  title: 'First chord: Em',
  level: 'entry',
  genre: 'any',
  key: 'Em',
  bpm: 60,
  chords: ['Em'],
  summary: 'E minor. Middle finger A string fret 2. Ring finger D string fret 2. Strum all six strings. This is the kindest first chord on the guitar.',
  watchFor: 'Press with fingertips, just behind the fret. If it buzzes, press a little closer to the fret, not harder.',
  goals: ['See the two-finger shape.', 'All six strings ring.', 'Hold it for four beats without grabbing the neck.'],
  steps: [
    'Middle finger on the A string, fret 2.',
    'Ring finger on the D string, fret 2.',
    'Leave the other strings open.',
    'Strum from the fat string toward the floor, slow.',
    'If one string is dead, lift that fingertip up on its tip and try again.'
  ],
  notes: chord([0, 2, 2, 0, 0, 0], 0, 'Em', 4).concat(chord([0, 2, 2, 0, 0, 0], 1, 'Em again', 4))
};

var GCH = {
  title: 'Second chord: G',
  level: 'entry',
  genre: 'any',
  key: 'G',
  bpm: 56,
  chords: ['G'],
  summary: 'G major. Three fingers: low E fret 3, A fret 2, high E fret 3. It feels huge after Em. That is normal.',
  watchFor: 'Do not let the finger on high E mute the B string. Arch the knuckle.',
  goals: ['Place the three fingers.', 'Clear strum of six strings.', 'Take it off and put it back twice.'],
  steps: [
    'Ring finger: fat E string, fret 3.',
    'Middle finger: A string, fret 2.',
    'Pinky or index: thin E string, fret 3. Pinky is worth learning.',
    'Strum all six. Fix the first dead string. Stop. Do not grind for twenty minutes.'
  ],
  notes: chord([3, 2, 0, 0, 0, 3], 0, 'G', 4).concat(chord([3, 2, 0, 0, 0, 3], 1, 'G again', 4))
};

var SWITCH = {
  title: 'Em to G, four beats each',
  level: 'entry',
  genre: 'any',
  key: 'G',
  bpm: 52,
  chords: ['Em', 'G'],
  summary: 'The whole point of Day 1. Hold Em for four beats. Switch to G for four. Right hand keeps a slow downstrum on the beat. Gaps are allowed today. Stopping the right hand is not the goal yet — just survive the change.',
  watchFor: 'Move fingers together as a group, not one at a time if you can help it. Miss a beat? Land on 1 of the next bar and keep going.',
  goals: ['Two shapes in one minute.', 'Downstrum on beats 1 2 3 4.', 'Smile when it sounds ugly. Ugly plus time becomes music.'],
  steps: [
    'Metronome 52. Em for one bar, G for one bar.',
    'Count 1 2 3 4 out loud.',
    'Four switches. Put the guitar down.',
    'Tomorrow do this before any dice roll.'
  ],
  notes: chord([0, 2, 2, 0, 0, 0], 0, 'Em', 4).concat(chord([3, 2, 0, 0, 0, 3], 1, 'G', 4))
};

var TEMPLATES = [
  { base: 'day1-hold', skill: 'Sit and hold', data: HOLD },
  { base: 'day1-strings', skill: 'Name the strings', data: STRINGS },
  { base: 'day1-tune', skill: 'Use the tuner', data: TUNE },
  { base: 'day1-em', skill: 'First chord Em', data: EM },
  { base: 'day1-g', skill: 'Second chord G', data: GCH },
  { base: 'day1-switch', skill: 'Em to G', data: SWITCH }
];

var STYLES = ['lead', 'rhythm', 'acoustic'];

export const DAY_ONE_LESSONS = [];
STYLES.forEach(function (style) {
  TEMPLATES.forEach(function (t) {
    DAY_ONE_LESSONS.push(Object.assign({}, t.data, {
      id: t.base + '-' + style,
      style: style,
      track: 'day1',
      skill: t.skill
    }));
  });
});

export const DAY_ONE_PATH = {
  lead: TEMPLATES.map(function (t) { return { id: t.base + '-lead', skill: t.skill }; }),
  rhythm: TEMPLATES.map(function (t) { return { id: t.base + '-rhythm', skill: t.skill }; }),
  acoustic: TEMPLATES.map(function (t) { return { id: t.base + '-acoustic', skill: t.skill }; })
};
