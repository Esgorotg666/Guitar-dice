function n(string, fret, beats, pick, tech, group, role, label) {
  var o = { string: string, fret: fret, beats: beats == null ? 1 : beats, pick: pick || 'D', group: group, role: role || 'line' };
  if (tech && tech.length) o.tech = tech;
  if (label) o.groupLabel = label;
  return o;
}
function chord(group, label, frets, beats) {
  var b = beats || 2;
  return frets.map(function (fret, string) {
    if (fret === 'x' || fret === 'X' || fret == null) return null;
    return n(string, fret, string === 0 ? b : 0, 'D', ['L'], group, 'chord', string === 0 ? label : null);
  }).filter(Boolean);
}
function L(o) {
  o.track = 'learn';
  o.genre = o.genre || 'any';
  o.sheet = o.sheet || {
    focus: (o.goals || []).slice(0, 3).join(' \u00b7 '),
    advice: o.steps ? o.steps.slice(0, 4) : []
  };
  return o;
}

export const LEARN_PACK = [
  L({
    id: 'learn-open-strings',
    title: '1. Open strings \u2014 hear the guitar',
    level: 'entry', style: 'acoustic', key: 'E', bpm: 50,
    summary: 'Pluck one string at a time. Name it. This is the only way the rest of the neck makes sense.',
    goals: ['Name low E, A, D, G, B, high E out loud.', 'One string only \u2014 mute the others.', 'Hear thick vs thin.'],
    steps: ['Pluck low E and say \u201clow E\u201d.', 'A, D, G, B, high E the same way.', 'Go back down.', 'If two strings ring, rest a finger on the extra one.'],
    notes: [n(0,0,2,'D',null,0,'line','Low E'), n(1,0,2,'D',null,1,'line','A'), n(2,0,2,'D',null,2,'line','D'), n(3,0,2,'D',null,3,'line','G'), n(4,0,2,'D',null,4,'line','B'), n(5,0,2,'D',null,5,'line','High E')]
  }),
  L({
    id: 'learn-em-g-c',
    title: '2. Three chords that start songs: Em G C',
    level: 'entry', style: 'acoustic', key: 'G', bpm: 60, chords: ['Em','G','C'],
    summary: 'Em is two fingers. G is three. C is three in a different place. Hold each for four beats, then change.',
    goals: ['Plant Em 022000 clean.', 'Plant G 320003 without muting B.', 'Plant C x32010 and move between all three.'],
    steps: ['Em: middle A2, ring D2. Strum six.', 'G: ring low E3, middle A2, pinky high E3.', 'C: ring A3, middle D2, index B1.', 'Em-G-C, four beats each, slow.'],
    notes: []
      .concat(chord(0, 'Em', [0,2,2,0,0,0], 4))
      .concat(chord(1, 'G', [3,2,0,0,0,3], 4))
      .concat(chord(2, 'C', [null,3,2,0,1,0], 4))
  }),
  L({
    id: 'learn-first-strum',
    title: '3. Downstrum on the beat',
    level: 'entry', style: 'rhythm', key: 'G', bpm: 72, chords: ['G','Em'],
    summary: 'Right hand down only, once per click. The left hand changes on beat 1. This is the first real groove.',
    goals: ['One downstrum per beat.', 'Change on the 1, not after it.', 'Keep the right hand moving even if the left is late.'],
    steps: ['Metronome 72. G for four downs.', 'Em for four downs.', 'Back to G.', 'Count 1 2 3 4 out loud.'],
    notes: []
      .concat(chord(0, 'G', [3,2,0,0,0,3], 1))
      .concat([n(0,3,1,'D',null,0,'line'), n(0,3,1,'D',null,0,'line'), n(0,3,1,'D',null,0,'line')])
      .concat(chord(1, 'Em', [0,2,2,0,0,0], 1))
      .concat([n(0,0,1,'D',null,1,'line'), n(0,0,1,'D',null,1,'line'), n(0,0,1,'D',null,1,'line')])
  }),
  L({
    id: 'learn-power-shape',
    title: '4. One power-chord shape, three places',
    level: 'entry', style: 'rhythm', key: 'E', bpm: 80,
    summary: 'Index and ring, two frets apart. Open E + A2 is E5. Same grip on the A string is A5. Same grip on D is D5.',
    goals: ['E5, A5, D5 from one grip.', 'Mute unused strings.', 'Move the shape without rebuilding it.'],
    steps: ['Low E open + A string fret 2.', 'Slide the same fingers to A string + D fret 2.', 'Slide to D string + G fret 2.', 'Play them in order, two beats each.'],
    notes: [
      n(0,0,1,'D',null,0,'line','E5'), n(1,2,1,'D',null,0,'line'),
      n(1,0,1,'D',null,1,'line','A5'), n(2,2,1,'D',null,1,'line'),
      n(2,0,1,'D',null,2,'line','D5'), n(3,2,1,'D',null,2,'line')
    ]
  }),
  L({
    id: 'learn-pent-box',
    title: '5. A minor pentatonic \u2014 the first solo box',
    level: 'entry', style: 'lead', key: 'Am', bpm: 70,
    summary: 'Five notes, one position. Index stays on fret 5. This is the shape behind almost every rock solo.',
    goals: ['Two notes on every string.', 'Alternate pick down-up.', 'End on the A root so it feels finished.'],
    steps: ['Low E: 5 then 8.', 'A: 5 then 7. D: 5 then 7. G: 5 then 7.', 'B: 5 then 8. High E: 5 then 8.', 'Come back down the same frets.'],
    notes: [
      n(0,5,0.5,'D',null,0,'line','Up'), n(0,8,0.5,'U',null,0,'line'),
      n(1,5,0.5,'D',null,0,'line'), n(1,7,0.5,'U',null,0,'line'),
      n(2,5,0.5,'D',null,0,'line'), n(2,7,0.5,'U',null,0,'line'),
      n(3,5,0.5,'D',null,0,'line'), n(3,7,0.5,'U',null,0,'line'),
      n(4,5,0.5,'D',null,0,'line'), n(4,8,0.5,'U',null,0,'line'),
      n(5,5,0.5,'D',null,0,'line'), n(5,8,1,'U',null,0,'line')
    ]
  }),
  L({
    id: 'learn-barre-f',
    title: '6. The F barre \u2014 one shape that moves',
    level: 'intermediate', style: 'rhythm', key: 'F', bpm: 66, chords: ['F','G'],
    summary: 'Index bars fret 1. The rest is an E shape. Slide the whole grip to fret 3 and it becomes G. No rebuilding.',
    goals: ['Clean F at fret 1.', 'Slide the grip to G at fret 3.', 'Hear that the low E note names the chord.'],
    steps: ['Index flat across all strings at fret 1, rolled onto the bony side.', 'Middle, ring, pinky make the E shape above it.', 'Pick string by string. Fix the first buzz.', 'Slide everything to fret 3 \u2014 that is G.'],
    notes: []
      .concat(chord(0, 'F', [1,3,3,2,1,1], 4))
      .concat(chord(1, 'G', [3,5,5,4,3,3], 4))
  }),
  L({
    id: 'learn-down-up',
    title: '7. Down-up-down-up with a mute',
    level: 'intermediate', style: 'rhythm', key: 'A', bpm: 84,
    summary: 'Down on the beat, up on the and. Palm mute the \u201cand\u201d so the groove breathes. Same pattern on A and D.',
    goals: ['Down on 1 and 3, up on the ands.', 'Muted chuck is short.', 'Pattern survives a chord change.'],
    steps: ['Down, muted up, down, muted up on A.', 'Same on D.', 'Back to A.', 'Keep the right hand moving through the change.'],
    notes: [
      n(1,0,0.5,'D',null,0,'line','A'), n(1,0,0.5,'U',['PM'],0,'line'),
      n(1,0,0.5,'D',null,0,'line'), n(1,0,0.5,'U',['PM'],0,'line'),
      n(2,2,0.5,'D',null,1,'line','D'), n(2,2,0.5,'U',['PM'],1,'line'),
      n(2,2,0.5,'D',null,1,'line'), n(2,2,0.5,'U',['PM'],1,'line')
    ]
  }),
  L({
    id: 'learn-bend',
    title: '8. Whole-step bend that is in tune',
    level: 'intermediate', style: 'lead', key: 'A', bpm: 70,
    summary: 'Bend the G string 7 up until it matches the pitch of fret 9. Check it. Then release. This is the first real blues move.',
    goals: ['Match fret 9 in pitch.', 'Support the bend with two fingers.', 'Release without a clunk.'],
    steps: ['Play G string fret 9 \u2014 that is the target.', 'Bend fret 7 to that pitch.', 'Hold it, then release to 7.', 'Add a little vibrato only after the bend is in tune.'],
    notes: [
      n(3,9,2,'D',null,0,'line','Target'),
      n(3,7,2,'D',['B'],1,'line','Bend'),
      n(3,7,1,'D',null,2,'line','Release'),
      n(3,7,2,'D',['~'],3,'line','Vibrato')
    ]
  }),
  L({
    id: 'learn-hammer-pull',
    title: '9. Hammer and pull \u2014 fewer picks, same volume',
    level: 'intermediate', style: 'lead', key: 'Am', bpm: 76,
    summary: 'Pick only the first note on each string. Hammer the next, pull back. If the hammer is quieter than the pick, slow down and hit the board harder.',
    goals: ['One pick per string.', 'Hammer as loud as the pick.', 'Pull-off sideways, not straight up.'],
    steps: ['Low E: pick 5, hammer 8, pull to 5.', 'Same idea on A, D, and G.', 'Record it. If the hammer is ghostly, do not speed up.'],
    notes: [
      n(0,5,0.5,'D',null,0,'line'), n(0,8,0.5,'D',['H'],0,'line'), n(0,5,0.5,'D',['P'],0,'line'),
      n(1,5,0.5,'D',null,1,'line'), n(1,7,0.5,'D',['H'],1,'line'), n(1,5,0.5,'D',['P'],1,'line'),
      n(2,5,0.5,'D',null,2,'line'), n(2,7,0.5,'D',['H'],2,'line'), n(2,5,0.5,'D',['P'],2,'line'),
      n(3,5,0.5,'D',null,3,'line'), n(3,7,0.5,'D',['H'],3,'line'), n(3,5,1,'D',['P'],3,'line')
    ]
  }),
  L({
    id: 'learn-fingerstyle',
    title: '10. Thumb + fingers on G',
    level: 'intermediate', style: 'acoustic', key: 'G', bpm: 72, chords: ['G'],
    summary: 'Thumb plays the bass note. Index, middle, and ring play the higher strings. This is the start of fingerstyle.',
    goals: ['Thumb on the bass string only.', 'i-m-a stay even.', 'Pattern continues while you hold G.'],
    steps: ['Thumb: low E fret 3.', 'Index: G string open. Middle: B open. Ring: high E fret 3.', 'Loop p-i-m-a four times.', 'Keep the left hand still.'],
    notes: [
      n(0,3,0.5,'D',null,0,'line','Thumb'), n(3,0,0.5,'U',null,0,'line','i'),
      n(4,0,0.5,'D',null,0,'line','m'), n(5,3,0.5,'U',null,0,'line','a'),
      n(0,3,0.5,'D',null,1,'line'), n(3,0,0.5,'U',null,1,'line'),
      n(4,0,0.5,'D',null,1,'line'), n(5,3,1,'U',null,1,'line')
    ]
  }),
  L({
    id: 'learn-12bar',
    title: '11. 12-bar blues skeleton in E',
    level: 'advanced', style: 'rhythm', key: 'E', bpm: 80, chords: ['E7','A7','B7'],
    summary: 'Four bars of E, two of A, two of E, one B, one A, two E. Shuffle feel. This is the map almost every blues song uses.',
    goals: ['Hear the 12-bar form.', 'Change on the bar, not inside it.', 'Keep a steady shuffle.'],
    steps: ['E7 for four bars.', 'A7 for two, E7 for two.', 'B7 one bar, A7 one bar, E7 two bars.', 'Loop it. The form is the lesson.'],
    notes: []
      .concat(chord(0, 'E7', [0,2,0,1,0,0], 4))
      .concat(chord(1, 'A7', [null,0,2,0,2,0], 2))
      .concat(chord(2, 'E7', [0,2,0,1,0,0], 2))
      .concat(chord(3, 'B7', [null,2,1,2,0,2], 2))
  }),
  L({
    id: 'learn-target-notes',
    title: '12. Land on chord tones, not just scales',
    level: 'advanced', style: 'lead', key: 'Am', bpm: 78,
    summary: 'Play Am pentatonic, but land on A, C, or E when the chord changes. The notes in between are just travel.',
    goals: ['Know A, C, E inside the box.', 'Land on one of them on beat 1.', 'Hear the difference when you miss.'],
    steps: ['Find A (low E5), C (A5 or D5), E (A7 or D7).', 'Play a short phrase that ends on A.', 'Play one that ends on C.', 'The landing note is what the listener remembers.'],
    notes: [
      n(0,5,1,'D',null,0,'line','Land A'),
      n(1,5,0.5,'D',null,1,'line'), n(1,7,0.5,'U',null,1,'line'), n(2,5,1,'D',null,1,'line','Land C'),
      n(2,7,0.5,'D',null,2,'line'), n(3,5,0.5,'U',null,2,'line'), n(3,7,1,'D',null,2,'line','Land E')
    ]
  }),
  L({
    id: 'learn-song-form',
    title: '13. Verse and chorus with the same four chords',
    level: 'advanced', style: 'acoustic', key: 'G', bpm: 74, chords: ['G','C','Em','D'],
    summary: 'Same chords, two different jobs. Verse is quiet and steady. Chorus is louder and fuller. Form is what makes a song, not more notes.',
    goals: ['Verse: soft downstrums.', 'Chorus: bigger strums, same chords.', 'You can tell which section you are in without looking.'],
    steps: ['G-C-Em-D quiet for the verse.', 'Same chords, louder and with more strings for the chorus.', 'Play verse-chorus-verse.', 'The dynamics are the lesson.'],
    notes: []
      .concat(chord(0, 'G verse', [3,2,0,0,0,3], 2))
      .concat(chord(1, 'C', [null,3,2,0,1,0], 2))
      .concat(chord(2, 'Em', [0,2,2,0,0,0], 2))
      .concat(chord(3, 'D', [null,null,0,2,3,2], 2))
  })
];

var STYLES = ['lead', 'rhythm', 'acoustic'];
export const LEARN_LESSONS = [];
LEARN_PACK.forEach(function (base) {
  STYLES.forEach(function (style) {
    LEARN_LESSONS.push(Object.assign({}, base, {
      id: base.id + '-' + style,
      style: style,
      track: 'learn'
    }));
  });
});
