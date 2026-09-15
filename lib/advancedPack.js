function n(string, fret, beats, pick, tech, group, role, label) {
  var o = { string: string, fret: fret, beats: beats == null ? 0.25 : beats, pick: pick || 'D', group: group, role: role || 'line' };
  if (tech && tech.length) o.tech = tech;
  if (label) o.groupLabel = label;
  return o;
}

function cell(group, label, hits) {
  var out = [];
  hits.forEach(function (h, i) {
    out.push(n(h[0], h[1], h[2] == null ? 0.5 : h[2], h[3] || (i % 2 === 0 ? 'D' : 'U'), h[4] || null, group, 'line', i === 0 ? label : null));
  });
  return out;
}

export const ADVANCED_PACK = [
  {
    id: 'adv-dorian-am',
    title: 'A Dorian Box and F# Target',
    level: 'advanced',
    style: 'lead',
    genre: 'rock',
    folder: 'solo',
    track: 'study',
    key: 'Am',
    scaleMode: 'dorian',
    scaleRoot: 'A',
    bpm: 88,
    summary: 'A Dorian is A minor with a raised 6th (F#). Play the 5th-fret box, hit F# on purpose over D, then resolve to A.',
    watchFor: 'F# is B-string 7 or D-string 4. If you play F natural you are back in Aeolian.',
    goals: ['Hear Dorian as minor plus F#.', 'Land F# on the D chord.', 'Close on A with vibrato.'],
    steps: ['Box: A5 C7 D7 E5 G7 A7 B5 C8.', 'Over D: walk to F# on B-string 7.', 'Resolve A7 then A5 with vibrato.'],
    notes: []
      .concat(cell(0, 'Dorian box', [[1,5,0.5],[1,7,0.5],[2,7,0.5],[3,5,0.5],[3,7,0.5],[4,5,0.5],[4,7,0.5],[5,5,0.5]]))
      .concat(cell(1, 'Up the box', [[5,5,0.5],[5,7,0.5],[5,8,0.5],[4,7,0.5],[4,5,0.5],[3,7,0.5],[3,5,0.5],[2,7,0.5]]))
      .concat(cell(2, 'F# over D', [[4,7,0.5],[5,5,0.5],[5,7,0.5],[4,7,0.5],[4,7,0.5,'D',['~']],[3,7,0.5],[2,7,0.5],[2,4,0.5]]))
      .concat(cell(3, 'Resolve A', [[3,5,0.5],[4,5,0.5],[4,7,0.5],[5,5,0.5],[5,7,0.5],[4,5,0.5],[3,7,0.5],[3,5,1,'D',['~']]]))
      .concat(cell(4, 'Box again', [[1,5,0.5],[1,7,0.5],[2,5,0.5],[2,7,0.5],[3,5,0.5],[3,7,0.5],[4,5,0.5],[4,7,0.5]]))
      .concat(cell(5, 'F# then home', [[5,5,0.5],[5,7,0.5],[4,7,0.5],[4,5,0.5],[3,7,0.5],[2,4,0.5],[1,7,0.5],[1,5,1,'D',['~']]]))
  },
  {
    id: 'adv-mixo-g',
    title: 'G Mixolydian Over G7',
    level: 'advanced',
    style: 'lead',
    genre: 'blues',
    folder: 'solo',
    track: 'study',
    key: 'G',
    scaleMode: 'mixolydian',
    scaleRoot: 'G',
    bpm: 92,
    summary: 'Mixolydian is major with a flat 7. Over G7 that note is F, not F#. Play G major tones, then F as the color, then resolve to G.',
    watchFor: 'F lives at D-string 3, G-string 5, B-string 6, high E 1. Do not play F#.',
    goals: ['Own G Mixolydian in two positions.', 'Make F sound like a chord tone of G7.', 'Land G, not A.'],
    steps: ['Open-position Mixo including high E 1 (F).', 'F is the color tone of G7.', 'Shift the same idea at fret 7-10.'],
    notes: []
      .concat(cell(0, 'Open Mixo', [[2,5,0.5],[3,4,0.5],[3,5,0.5],[4,3,0.5],[4,5,0.5],[5,3,0.5],[5,1,0.5],[5,3,0.5]]))
      .concat(cell(1, 'F color', [[5,1,0.5],[4,3,0.5],[3,5,0.5],[3,4,0.5],[2,5,0.5],[2,3,0.5],[3,5,0.5],[4,6,0.5]]))
      .concat(cell(2, 'Pos 7', [[2,5,0.5],[2,7,0.5],[3,7,0.5],[3,9,0.5],[4,8,0.5],[4,10,0.5],[5,8,0.5],[5,10,0.5]]))
      .concat(cell(3, 'F at 8', [[5,8,0.5],[4,8,0.5],[3,7,0.5],[3,9,0.5],[2,8,0.5],[2,5,0.5],[3,7,0.5],[2,5,1]]))
      .concat(cell(4, 'Walk home', [[3,5,0.5],[4,6,0.5],[4,8,0.5],[5,7,0.5],[5,8,0.5],[4,8,0.5],[3,7,0.5],[3,4,0.5]]))
      .concat(cell(5, 'G7 land', [[2,5,0.5],[3,4,0.5],[3,5,0.5],[4,3,0.5],[4,6,0.5],[5,3,0.5],[5,1,0.5],[2,5,1,'D',['~']]]))
  },
  {
    id: 'adv-boxes-a',
    title: 'Connect A Minor Pent Boxes 1 and 2',
    level: 'advanced',
    style: 'lead',
    genre: 'rock',
    folder: 'solo',
    track: 'study',
    key: 'Am',
    scaleMode: 'minor-pent',
    scaleRoot: 'A',
    bpm: 96,
    summary: 'Box 1 at fret 5 and box 2 at fret 7-8 are one scale. Play each box, then a linking slide, then one phrase that uses both.',
    watchFor: 'The link is G-string 5 slide to 7, or B-string 5 slide to 8. Do not jump and guess.',
    goals: ['Play box 1 and box 2 without stopping.', 'Slide the link on the beat.', 'End with a phrase that lives in both boxes.'],
    steps: ['Box 1 at fret 5.', 'Slide G5 to G7.', 'Box 2 at 7-10.', 'One combined lick down to A5.'],
    notes: []
      .concat(cell(0, 'Box 1', [[1,5,0.5],[1,7,0.5],[2,7,0.5],[3,5,0.5],[3,7,0.5],[4,5,0.5],[4,8,0.5],[5,5,0.5]]))
      .concat(cell(1, 'Box 1 down', [[5,5,0.5],[4,8,0.5],[4,5,0.5],[3,7,0.5],[3,5,0.5],[2,7,0.5],[1,7,0.5],[1,5,0.5]]))
      .concat(cell(2, 'Slide link', [[3,5,0.5],[3,7,0.5,'U',['S']],[4,5,0.5],[4,8,0.5,'U',['S']],[5,5,0.5],[5,8,0.5],[4,8,0.5],[3,7,0.5]]))
      .concat(cell(3, 'Box 2', [[2,7,0.5],[2,9,0.5],[3,7,0.5],[3,9,0.5],[4,8,0.5],[4,10,0.5],[5,8,0.5],[5,10,0.5]]))
      .concat(cell(4, 'Combined', [[5,8,0.5],[4,10,0.5],[4,8,0.5],[3,9,0.5],[3,7,0.5],[2,9,0.5],[2,7,0.5],[3,5,0.5]]))
      .concat(cell(5, 'Home A', [[4,5,0.5],[3,7,0.5],[3,5,0.5],[2,7,0.5],[1,7,0.5],[1,5,0.5],[3,5,0.5],[1,5,1,'D',['~']]]))
  },
  {
    id: 'adv-thirds-g',
    title: 'G Major Thirds Moving Up the Neck',
    level: 'advanced',
    style: 'lead',
    genre: 'country',
    folder: 'lead',
    track: 'study',
    key: 'G',
    scaleMode: 'ionian',
    scaleRoot: 'G',
    bpm: 80,
    summary: 'Play G major as double-stop thirds on G and B, then B and high E. Move each pair up the scale.',
    watchFor: 'Both notes must speak. If the lower string dies you are rolling one finger instead of two tips.',
    goals: ['Hear G major in thirds.', 'Keep both notes even.', 'Move the pair without looking.'],
    steps: ['G/B thirds up the neck.', 'Same intervals on B and high E.', 'Walk back to open G.'],
    notes: []
      .concat(cell(0, 'G+B thirds', [[3,0,0.5],[4,0,0.5],[3,2,0.5],[4,1,0.5],[3,4,0.5],[4,3,0.5],[3,5,0.5],[4,5,0.5]]))
      .concat(cell(1, 'Higher G+B', [[3,7,0.5],[4,7,0.5],[3,9,0.5],[4,8,0.5],[3,11,0.5],[4,10,0.5],[3,12,0.5],[4,12,0.5]]))
      .concat(cell(2, 'B+e thirds', [[4,0,0.5],[5,3,0.5],[4,1,0.5],[5,3,0.5],[4,3,0.5],[5,5,0.5],[4,5,0.5],[5,7,0.5]]))
      .concat(cell(3, 'Higher B+e', [[4,7,0.5],[5,8,0.5],[4,8,0.5],[5,10,0.5],[4,10,0.5],[5,12,0.5],[4,12,0.5],[5,15,0.5]]))
      .concat(cell(4, 'Back down', [[4,12,0.5],[3,12,0.5],[4,10,0.5],[3,11,0.5],[4,8,0.5],[3,9,0.5],[4,7,0.5],[3,7,0.5]]))
      .concat(cell(5, 'Home G', [[4,5,0.5],[3,5,0.5],[4,3,0.5],[3,4,0.5],[4,1,0.5],[3,2,0.5],[4,0,0.5],[3,0,1]]))
  },
  {
    id: 'adv-skip-em',
    title: 'E Minor Pentatonic String Skips',
    level: 'advanced',
    style: 'lead',
    genre: 'rock',
    folder: 'lead',
    track: 'study',
    key: 'Em',
    scaleMode: 'minor-pent',
    scaleRoot: 'E',
    bpm: 90,
    summary: 'Skip a string inside the Em pentatonic box. Low E to G, A to B, D to high E.',
    watchFor: 'Mute the skipped string. A ringing middle string ruins the skip.',
    goals: ['Clean skips at 70, then 90.', 'Keep the box while the pick jumps.', 'Do not rake the skipped string.'],
    steps: ['Skip low E to G.', 'Skip A to B.', 'Skip D to high E.', 'Mix all three.'],
    notes: []
      .concat(cell(0, 'E to G', [[0,0,0.5],[0,3,0.5],[3,0,0.5],[3,2,0.5],[0,3,0.5],[3,2,0.5],[0,0,0.5],[3,0,0.5]]))
      .concat(cell(1, 'A to B', [[1,2,0.5],[1,0,0.5],[4,0,0.5],[4,3,0.5],[1,2,0.5],[4,3,0.5],[1,0,0.5],[4,0,0.5]]))
      .concat(cell(2, 'D to e', [[2,2,0.5],[2,0,0.5],[5,0,0.5],[5,3,0.5],[2,2,0.5],[5,3,0.5],[2,0,0.5],[5,0,0.5]]))
      .concat(cell(3, 'Mix down', [[0,3,0.5],[3,2,0.5],[1,2,0.5],[4,3,0.5],[2,2,0.5],[5,3,0.5],[3,0,0.5],[5,0,0.5]]))
      .concat(cell(4, 'Mix up', [[5,3,0.5],[2,2,0.5],[4,3,0.5],[1,2,0.5],[3,2,0.5],[0,3,0.5],[4,0,0.5],[1,0,0.5]]))
      .concat(cell(5, 'Home E', [[3,2,0.5],[0,3,0.5],[3,0,0.5],[0,0,0.5],[2,2,0.5],[0,3,0.5],[1,2,0.5],[0,0,1,'D',['~']]]))
  },
  {
    id: 'adv-hybrid-c',
    title: 'Hybrid Pick C-Am-F-G',
    level: 'advanced',
    style: 'acoustic',
    genre: 'country',
    folder: 'rh',
    track: 'study',
    key: 'C',
    bpm: 84,
    chords: ['C', 'Am', 'F', 'G'],
    summary: 'Pick plays the bass. Middle and ring pluck two treble strings. Same right-hand engine on C, Am, F, and G.',
    watchFor: 'Bass is pick only. Treble is fingers. If it sounds like a strum you are raking.',
    goals: ['Separate pick bass from finger treble.', 'Change chords on beat 1.', 'Keep eighths even at 84.'],
    steps: ['C: pick A3, fingers G0 and B1.', 'Am: pick A0, fingers G2 and B1.', 'F: pick D3, fingers G2 and B1.', 'G: pick low E3, fingers B0 and high E3.'],
    notes: []
      .concat(cell(0, 'C', [[1,3,0.5],[3,0,0.25],[4,1,0.25],[1,3,0.5],[3,0,0.25],[4,1,0.25],[1,3,0.5],[4,1,0.5]]))
      .concat(cell(1, 'C bar 2', [[1,3,0.5],[3,0,0.25],[4,1,0.25],[1,3,0.5],[5,0,0.25],[4,1,0.25],[3,0,0.5],[1,3,0.5]]))
      .concat(cell(2, 'Am', [[1,0,0.5],[3,2,0.25],[4,1,0.25],[1,0,0.5],[3,2,0.25],[4,1,0.25],[1,0,0.5],[4,1,0.5]]))
      .concat(cell(3, 'Am bar 2', [[1,0,0.5],[3,2,0.25],[4,1,0.25],[1,0,0.5],[5,0,0.25],[4,1,0.25],[3,2,0.5],[1,0,0.5]]))
      .concat(cell(4, 'F', [[2,3,0.5],[3,2,0.25],[4,1,0.25],[2,3,0.5],[3,2,0.25],[4,1,0.25],[2,3,0.5],[4,1,0.5]]))
      .concat(cell(5, 'G then C', [[0,3,0.5],[4,0,0.25],[5,3,0.25],[0,3,0.5],[4,0,0.25],[5,3,0.25],[1,3,0.5],[3,0,0.5]]))
  },
  {
    id: 'adv-funk-e9',
    title: 'E9 Funk 16ths',
    level: 'advanced',
    style: 'rhythm',
    genre: 'funk',
    folder: 'rhythm',
    track: 'study',
    key: 'E',
    bpm: 96,
    chords: ['E9'],
    summary: 'E9 grip at fret 6-7. Most 16ths are muted chucks. The chord speaks only on the written hits.',
    watchFor: 'Muted hits stay short. Do not let E9 ring on every 16th.',
    goals: ['Chuck 16ths with the palm.', 'Open E9 only where written.', 'Keep the right hand moving when the left hand mutes.'],
    steps: ['Grip: D6 G7 B7 high E7 (E9).', 'Count 1 e and a 2 e and a.', 'Chord on 1 and selected ands. Everything else is mute.'],
    notes: []
      .concat(cell(0, 'E9 hits', [[2,6,0.25],[3,7,0.25],[4,7,0.25],[5,7,0.25],[2,6,0.25,'U',['PM']],[3,7,0.25,'D',['PM']],[4,7,0.25,'U',['PM']],[5,7,0.25,'D',['PM']]]))
      .concat(cell(1, 'Chuck bar', [[2,6,0.25,'D',['PM']],[3,7,0.25,'U',['PM']],[2,6,0.25],[4,7,0.25],[2,6,0.25,'D',['PM']],[3,7,0.25,'U',['PM']],[4,7,0.25],[5,7,0.25]]))
      .concat(cell(2, 'E9 hits 2', [[2,6,0.25],[3,7,0.25],[4,7,0.25],[5,7,0.25],[2,6,0.25,'U',['PM']],[3,7,0.25,'D',['PM']],[4,7,0.25,'U',['PM']],[5,7,0.25,'D',['PM']]]))
      .concat(cell(3, 'Chuck 2', [[2,6,0.25,'D',['PM']],[3,7,0.25,'U',['PM']],[2,6,0.25],[4,7,0.25],[2,6,0.25,'D',['PM']],[5,7,0.25],[4,7,0.25,'U',['PM']],[3,7,0.25,'D',['PM']]]))
      .concat(cell(4, 'Hold then chuck', [[2,6,0.5],[3,7,0],[4,7,0],[5,7,0],[2,6,0.25,'U',['PM']],[3,7,0.25,'D',['PM']],[4,7,0.25,'U',['PM']],[5,7,0.25,'D',['PM']]]))
      .concat(cell(5, 'Close E9', [[2,6,0.25],[3,7,0.25],[4,7,0.25],[5,7,0.25],[2,6,0.25,'D',['PM']],[4,7,0.25],[5,7,0.5],[2,6,1]]))
  },
  {
    id: 'adv-251-c',
    title: 'ii-V-I Line in C',
    level: 'advanced',
    style: 'lead',
    genre: 'jazz',
    folder: 'bridging',
    track: 'study',
    key: 'C',
    scaleMode: 'ionian',
    scaleRoot: 'C',
    bpm: 72,
    chords: ['Dm7', 'G7', 'Cmaj7'],
    summary: 'One chorus of ii-V-I. Dm7 arpeggio, G7 with F and B, Cmaj7 with B and E.',
    watchFor: 'Chord tones on beat 1 of each bar. Approach notes are the ands, not the downbeats.',
    goals: ['Outline Dm7, G7, Cmaj7 without a chord chart.', 'Put F on G7 and B on Cmaj7.', 'Resolve to C, not D.'],
    steps: ['Dm7: D F A C.', 'G7: G B D F (F on high E 1).', 'Cmaj7: C E G B.'],
    notes: []
      .concat(cell(0, 'Dm7', [[2,0,0.5],[2,3,0.5],[3,2,0.5],[3,5,0.5],[4,3,0.5],[4,6,0.5],[5,5,0.5],[5,8,0.5]]))
      .concat(cell(1, 'Dm7 down', [[5,5,0.5],[4,6,0.5],[4,3,0.5],[3,5,0.5],[3,2,0.5],[2,3,0.5],[2,0,0.5],[3,2,0.5]]))
      .concat(cell(2, 'G7', [[3,0,0.5],[3,4,0.5],[4,3,0.5],[4,6,0.5],[5,3,0.5],[5,1,0.5],[4,3,0.5],[3,4,0.5]]))
      .concat(cell(3, 'G7 F color', [[5,1,0.5],[4,3,0.5],[4,0,0.5],[3,4,0.5],[3,0,0.5],[2,5,0.5],[2,3,0.5],[3,4,0.5]]))
      .concat(cell(4, 'Cmaj7', [[2,3,0.5],[3,0,0.5],[3,4,0.5],[4,1,0.5],[4,5,0.5],[5,0,0.5],[5,3,0.5],[4,0,0.5]]))
      .concat(cell(5, 'Resolve C', [[5,3,0.5],[4,5,0.5],[4,1,0.5],[3,4,0.5],[3,0,0.5],[2,3,0.5],[4,1,0.5],[5,3,1,'D',['~']]]))
  },
  {
    id: 'adv-economy-a',
    title: 'Economy Pick A Major 3NPS',
    level: 'advanced',
    style: 'lead',
    genre: 'rock',
    folder: 'lead',
    track: 'study',
    key: 'A',
    scaleMode: 'ionian',
    scaleRoot: 'A',
    bpm: 100,
    summary: 'Three notes per string in A major. Sweep the string change: two downs when you climb, two ups when you descend.',
    watchFor: 'Do not alternate across the string change. Two strokes in the same direction on the shift.',
    goals: ['3NPS A major from the 4th fret.', 'Economy pick the crossings.', 'Even 16ths at 80 before 100.'],
    steps: ['A 4-5-7, D 4-6-7, G 4-6-7, B 5-7-9, high E 4-5-7.', 'Climb with down-down on each new string.', 'Descend with up-up on each new string.'],
    notes: []
      .concat(cell(0, 'Climb A-D', [[1,4,0.25,'D'],[1,5,0.25,'U'],[1,7,0.25,'D'],[2,4,0.25,'D'],[2,6,0.25,'U'],[2,7,0.25,'D'],[3,4,0.25,'D'],[3,6,0.25,'U']]))
      .concat(cell(1, 'Climb G-e', [[3,7,0.25,'D'],[4,5,0.25,'D'],[4,7,0.25,'U'],[4,9,0.25,'D'],[5,4,0.25,'D'],[5,5,0.25,'U'],[5,7,0.25,'D'],[5,5,0.25,'U']]))
      .concat(cell(2, 'Turn', [[5,4,0.25,'D'],[4,9,0.25,'U'],[4,7,0.25,'D'],[4,5,0.25,'U'],[3,7,0.25,'U'],[3,6,0.25,'D'],[3,4,0.25,'U'],[2,7,0.25,'U']]))
      .concat(cell(3, 'Descend', [[2,6,0.25,'D'],[2,4,0.25,'U'],[1,7,0.25,'U'],[1,5,0.25,'D'],[1,4,0.25,'U'],[2,4,0.25,'D'],[3,4,0.25,'U'],[4,5,0.25,'D']]))
      .concat(cell(4, 'Climb again', [[1,4,0.25,'D'],[1,5,0.25,'U'],[1,7,0.25,'D'],[2,4,0.25,'D'],[2,6,0.25,'U'],[2,7,0.25,'D'],[3,6,0.25,'D'],[3,7,0.25,'U']]))
      .concat(cell(5, 'Land A', [[4,5,0.25,'D'],[4,7,0.25,'U'],[5,4,0.25,'D'],[5,5,0.25,'U'],[5,7,0.5,'D'],[4,5,0.5],[2,7,0.5],[1,4,1,'D',['~']]]))
  },
  {
    id: 'adv-bend-phrase',
    title: 'A Minor Bend Phrase With Slide Exit',
    level: 'advanced',
    style: 'lead',
    genre: 'blues',
    folder: 'lead',
    track: 'study',
    key: 'Am',
    scaleMode: 'minor-pent',
    scaleRoot: 'A',
    bpm: 76,
    summary: 'A real lick, not a single bend. Bend G to A, release, pull off, slide into box 2, then a second bend on the B string.',
    watchFor: 'Bend reaches pitch before vibrato. A half-finished bend is a wrong note.',
    goals: ['Bend G7 up a whole step to A.', 'Release into a pull-off.', 'Exit with a slide, not a jump.'],
    steps: ['G-string 7 bend to 9 pitch, release, pull off 5.', 'Slide 5 to 7 on G, then B 8 bend.', 'Finish A5 with vibrato.'],
    notes: []
      .concat(cell(0, 'Bend G', [[3,7,1,'D',['B']],[3,7,0.5,'D'],[3,5,0.5,'U',['P']],[4,5,0.5],[4,8,0.5],[3,7,0.5],[3,5,0.5]]))
      .concat(cell(1, 'Again', [[3,7,1,'D',['B']],[3,7,0.5],[3,5,0.5,'U',['P']],[2,7,0.5],[3,5,0.5],[3,7,0.5],[4,5,0.5]]))
      .concat(cell(2, 'Slide out', [[3,5,0.5],[3,7,0.5,'U',['S']],[4,8,1,'D',['B']],[4,8,0.5],[4,5,0.5],[3,7,0.5],[3,5,0.5]]))
      .concat(cell(3, 'Box 2 color', [[4,8,0.5],[5,5,0.5],[5,8,0.5],[4,8,0.5],[4,5,0.5],[3,7,0.5],[2,7,0.5],[3,5,0.5]]))
      .concat(cell(4, 'Second bend', [[4,8,1,'D',['B']],[4,8,0.5],[4,5,0.5,'U',['P']],[3,7,0.5],[3,5,0.5],[1,7,0.5],[1,5,0.5]]))
      .concat(cell(5, 'Home A', [[3,7,0.5],[3,5,0.5],[2,7,0.5],[1,7,0.5],[1,5,0.5],[3,5,0.5],[4,5,0.5],[1,5,1,'D',['~']]]))
  },
  {
    id: 'adv-gallop-am',
    title: 'Am to C Gallop With Open A',
    level: 'advanced',
    style: 'rhythm',
    genre: 'metal',
    folder: 'rhythm',
    track: 'study',
    key: 'Am',
    bpm: 112,
    chords: ['Am', 'C'],
    summary: 'Palm-muted gallop on A (long-short-short). Two bars Am, two bars C on A-string 3, then a release chord.',
    watchFor: 'Gallop is down-down-down, not down-up-down. Palm mute until the release.',
    goals: ['Even gallop at 90, then 112.', 'Change Am to C on the barline.', 'Open the last chord so the mute contrast is obvious.'],
    steps: ['Am: open A string, gallop.', 'C: A-string 3, same gallop.', 'Release Am chord: A0 D2 G2 B1.'],
    notes: []
      .concat(cell(0, 'Am gallop', [[1,0,0.5,'D',['PM']],[1,0,0.25,'D',['PM']],[1,0,0.25,'D',['PM']],[1,0,0.5,'D',['PM']],[1,0,0.25,'D',['PM']],[1,0,0.25,'D',['PM']],[1,0,0.5,'D',['PM']],[1,0,0.25,'D',['PM']]]))
      .concat(cell(1, 'Am bar 2', [[1,0,0.25,'D',['PM']],[1,0,0.5,'D',['PM']],[1,0,0.25,'D',['PM']],[1,0,0.25,'D',['PM']],[1,0,0.5,'D',['PM']],[1,0,0.25,'D',['PM']],[1,0,0.25,'D',['PM']],[1,0,0.5,'D',['PM']]]))
      .concat(cell(2, 'C gallop', [[1,3,0.5,'D',['PM']],[1,3,0.25,'D',['PM']],[1,3,0.25,'D',['PM']],[1,3,0.5,'D',['PM']],[1,3,0.25,'D',['PM']],[1,3,0.25,'D',['PM']],[1,3,0.5,'D',['PM']],[1,3,0.25,'D',['PM']]]))
      .concat(cell(3, 'C bar 2', [[1,3,0.25,'D',['PM']],[1,3,0.5,'D',['PM']],[1,3,0.25,'D',['PM']],[1,3,0.25,'D',['PM']],[1,3,0.5,'D',['PM']],[1,3,0.25,'D',['PM']],[1,3,0.25,'D',['PM']],[1,3,0.5,'D',['PM']]]))
      .concat(cell(4, 'Am again', [[1,0,0.5,'D',['PM']],[1,0,0.25,'D',['PM']],[1,0,0.25,'D',['PM']],[1,0,0.5,'D',['PM']],[1,0,0.25,'D',['PM']],[1,0,0.25,'D',['PM']],[1,0,0.5,'D',['PM']],[1,0,0.25,'D',['PM']]]))
      .concat([
        n(1,0,1,'D',null,5,'chord','Release Am'),
        n(2,2,0,null,null,5,'chord'),
        n(3,2,0,null,null,5,'chord'),
        n(4,1,0,null,null,5,'chord')
      ])
  },
  {
    id: 'adv-travis-g',
    title: 'Travis Bass Through G-C-D-Em',
    level: 'advanced',
    style: 'acoustic',
    genre: 'folk',
    folder: 'rh',
    track: 'study',
    key: 'G',
    bpm: 88,
    chords: ['G', 'C', 'D', 'Em'],
    summary: 'Thumb alternates two bass notes. Fingers pinch a treble on beats 2 and 4. Same motor on G, C, D, and Em.',
    watchFor: 'Thumb never plays the high strings. If the bass and pinch land together on 1 you broke Travis.',
    goals: ['Alternate bass on every chord.', 'Pinch only on 2 and 4.', 'Change shapes without restarting the thumb.'],
    steps: ['G: thumb low E3 then D0. Pinch B0.', 'C: thumb A3 then D2. Pinch B1.', 'D: thumb D0 then A0. Pinch high E2.', 'Em: thumb E0 then D2. Pinch B0.'],
    notes: []
      .concat(cell(0, 'G Travis', [[0,3,0.5],[4,0,0.5],[2,0,0.5],[4,0,0.5],[0,3,0.5],[4,0,0.5],[2,0,0.5],[4,0,0.5]]))
      .concat(cell(1, 'G bar 2', [[0,3,0.5],[5,3,0.5],[2,0,0.5],[4,0,0.5],[0,3,0.5],[4,0,0.5],[2,0,0.5],[5,3,0.5]]))
      .concat(cell(2, 'C Travis', [[1,3,0.5],[4,1,0.5],[2,2,0.5],[4,1,0.5],[1,3,0.5],[4,1,0.5],[2,2,0.5],[4,1,0.5]]))
      .concat(cell(3, 'D Travis', [[2,0,0.5],[5,2,0.5],[1,0,0.5],[5,2,0.5],[2,0,0.5],[4,3,0.5],[1,0,0.5],[5,2,0.5]]))
      .concat(cell(4, 'Em Travis', [[0,0,0.5],[4,0,0.5],[2,2,0.5],[4,0,0.5],[0,0,0.5],[3,0,0.5],[2,2,0.5],[4,0,0.5]]))
      .concat(cell(5, 'Home G', [[0,3,0.5],[4,0,0.5],[2,0,0.5],[5,3,0.5],[0,3,0.5],[4,0,0.5],[2,0,0.5],[0,3,1]]))
  }
];
