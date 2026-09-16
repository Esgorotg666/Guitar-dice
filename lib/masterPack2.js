function n(string, fret, beats, pick, tech, group, role, label) {
  var o = { string: string, fret: fret, beats: beats == null ? 0.5 : beats, pick: pick || 'D', group: group, role: role || 'line' };
  if (tech && tech.length) o.tech = tech;
  if (label) o.groupLabel = label;
  return o;
}

function line(group, label, hits) {
  var out = [];
  hits.forEach(function (h, i) {
    out.push(n(h[0], h[1], h[2] == null ? 0.5 : h[2], h[3] || (i % 2 === 0 ? 'D' : 'U'), h[4] || null, group, 'line', i === 0 ? label : null));
  });
  return out;
}

function chordHits(group, label, dots, beat) {
  var out = [];
  var b = beat == null ? 2 : beat;
  dots.forEach(function (d, i) {
    out.push(n(d[0], d[1], i === 0 ? b : 0, 'D', null, group, 'chord', i === 0 ? label : null));
  });
  return out;
}

export const MASTER_PACK_2 = [
  {
    id: 'm2-enclose-am',
    title: 'Enclose Every Chord Tone Over Am-Dm-E7',
    level: 'master',
    style: 'lead',
    genre: 'jazz',
    folder: 'solo',
    track: 'study',
    key: 'Am',
    scaleMode: 'harmonic-minor',
    scaleRoot: 'A',
    bpm: 84,
    chords: ['Am', 'Dm', 'E7'],
    summary: 'Intermediate targeting hits the chord tone. Master targeting surrounds it: one scale step above, one chromatic below, then the tone on the downbeat.',
    watchFor: 'The chord tone is beat 1 of each new bar. If the enclosure lands late you missed the change.',
    goals: ['Name A, C, E on Am; D, F, A on Dm; E, G#, B, D on E7.', 'Approach from above then below.', 'G# only belongs to E7, then resolve to A.'],
    steps: ['Am enclosure into A (E5): B7 then G#4 then A5.', 'Dm enclosure into F (G6): G7 then E5 then F6.', 'E7 enclosure into G# (G5): A7 then G4 then G#5.', 'Last line walks E7 tones into held A.'],
    notes: []
      .concat(line(0, 'Into A', [[1,7,0.5,'D'],[1,4,0.5,'U'],[1,5,1,'D',['~']],[2,7,0.5,'U'],[3,5,0.5,'D'],[4,5,0.5,'U'],[5,5,0.5,'D']]))
      .concat(line(1, 'Into C', [[4,6,0.5,'D'],[4,4,0.5,'U'],[4,5,1,'D'],[3,5,0.5,'U'],[2,7,0.5,'D'],[1,7,0.5,'U'],[1,5,0.5,'D']]))
      .concat(line(2, 'Into F', [[3,7,0.5,'D'],[3,5,0.5,'U'],[3,6,1,'D'],[2,7,0.5,'U'],[2,3,0.5,'D'],[1,5,0.5,'U'],[1,0,0.5,'D']]))
      .concat(line(3, 'Into D', [[2,5,0.5,'D'],[2,2,0.5,'U'],[2,3,1,'D'],[3,2,0.5,'U'],[3,6,0.5,'D'],[4,6,0.5,'U'],[5,5,0.5,'D']]))
      .concat(line(4, 'Into G#', [[3,7,0.5,'D'],[3,4,0.5,'U'],[3,5,1,'D'],[4,5,0.5,'U'],[4,7,0.5,'D'],[5,7,0.5,'U'],[2,6,0.5,'D']]))
      .concat(line(5, 'E7 to A', [[2,6,0.5,'D'],[3,5,0.5,'U'],[4,5,0.5,'D'],[4,7,0.5,'U'],[3,5,0.5,'D'],[1,7,0.5,'U'],[1,5,0.5,'D'],[1,5,1,'U',['~']]]))
  },
  {
    id: 'm2-phryg-e',
    title: 'E Phrygian Dominant - Five Against the I',
    level: 'master',
    style: 'lead',
    genre: 'metal',
    folder: 'lead',
    track: 'study',
    key: 'E',
    scaleMode: 'phrygian-dominant',
    scaleRoot: 'E',
    bpm: 100,
    chords: ['E', 'F', 'E'],
    summary: 'Phrygian dominant is harmonic minor from the 5th: E F G# A B C D. The flat 2 (F) and major 3rd (G#) in the same scale is the Spanish/metal sound.',
    watchFor: 'G natural kills the scale. G# is fret 4 low E, fret 1 G, fret 9 B, fret 4 high E.',
    goals: ['Own E F G# A B C D in two positions.', 'Make F feel like tension, E like home.', 'Do not flatten G#.'],
    steps: ['Pos 1: E0 F1 G#4 A5 on low E, then D0 E2 F3 G#6 on D.', 'Pos 2 around fret 7-10.', 'Riff: E0 F1 E0 G#4 A5 F1 E0.', 'End on E with vibrato.'],
    notes: []
      .concat(line(0, 'Pos 1 low', [[0,0,0.5,'D'],[0,1,0.5,'U'],[0,4,0.5,'D'],[0,5,0.5,'U'],[1,2,0.5,'D'],[1,3,0.5,'U'],[1,7,0.5,'D'],[2,0,0.5,'U']]))
      .concat(line(1, 'Pos 1 mid', [[2,2,0.5,'D'],[2,3,0.5,'U'],[2,6,0.5,'D'],[3,1,0.5,'U'],[3,2,0.5,'D'],[3,4,0.5,'U'],[4,0,0.5,'D'],[4,1,0.5,'U']]))
      .concat(line(2, 'Pos 2', [[1,7,0.5,'D'],[1,9,0.5,'U'],[1,10,0.5,'D'],[2,7,0.5,'U'],[2,9,0.5,'D'],[3,7,0.5,'U'],[3,9,0.5,'D'],[4,8,0.5,'U']]))
      .concat(line(3, 'Pos 2 high', [[4,9,0.5,'D'],[4,10,0.5,'U'],[5,7,0.5,'D'],[5,9,0.5,'U'],[5,10,0.5,'D'],[5,12,0.5,'U'],[4,9,0.5,'D'],[3,9,0.5,'U']]))
      .concat(line(4, 'F to E riff', [[0,0,0.5,'D',['PM']],[0,1,0.5,'D'],[0,0,0.5,'D',['PM']],[0,4,0.5,'D'],[0,5,0.5,'D'],[0,1,0.5,'D'],[0,0,1,'D']]))
      .concat(line(5, 'Home E', [[2,6,0.5,'D'],[3,1,0.5,'U'],[0,4,0.5,'D'],[0,1,0.5,'U'],[0,0,0.5,'D'],[0,1,0.5,'U'],[0,0,1,'D',['~']]]))
  },
  {
    id: 'm2-sweep5-am',
    title: 'Five-String Am Sweep Through Inversions',
    level: 'master',
    style: 'lead',
    genre: 'metal',
    folder: 'arpeggio',
    track: 'study',
    key: 'Am',
    bpm: 88,
    chords: ['Am', 'C', 'E'],
    summary: 'Advanced used a three-string triad. Master uses five strings and three inversions, then a descending line so the sweep is not the whole trick.',
    watchFor: 'One roll per direction. Mute the string you just left. G# only on the E inversion.',
    goals: ['Sweep five strings without a rake.', 'Change inversion on beat 1.', 'Descend in A minor after the last sweep.'],
    steps: ['Am: A7 D7 G5 B5 e5.', 'C: A3 D5 G5 B5 e3.', 'E: A7 D6 G4 B5 e4.', 'Descend into A.'],
    notes: []
      .concat(line(0, 'Am sweep up', [[1,7,0.25,'D'],[2,7,0.25,'D'],[3,5,0.25,'D'],[4,5,0.25,'D'],[5,5,0.5,'D'],[5,5,0.25,'U'],[4,5,0.25,'U'],[3,5,0.25,'U'],[2,7,0.25,'U'],[1,7,0.5,'U']]))
      .concat(line(1, 'Am again', [[1,7,0.25,'D'],[2,7,0.25,'D'],[3,5,0.25,'D'],[4,5,0.25,'D'],[5,5,0.5,'D'],[5,5,0.25,'U'],[4,5,0.25,'U'],[3,5,0.25,'U'],[2,7,0.25,'U'],[1,7,0.5,'U']]))
      .concat(line(2, 'C sweep', [[1,3,0.25,'D'],[2,5,0.25,'D'],[3,5,0.25,'D'],[4,5,0.25,'D'],[5,3,0.5,'D'],[5,3,0.25,'U'],[4,5,0.25,'U'],[3,5,0.25,'U'],[2,5,0.25,'U'],[1,3,0.5,'U']]))
      .concat(line(3, 'E sweep', [[1,7,0.25,'D'],[2,6,0.25,'D'],[3,4,0.25,'D'],[4,5,0.25,'D'],[5,4,0.5,'D'],[5,4,0.25,'U'],[4,5,0.25,'U'],[3,4,0.25,'U'],[2,6,0.25,'U'],[1,7,0.5,'U']]))
      .concat(line(4, 'Descend', [[5,5,0.5,'D'],[4,5,0.5,'U'],[4,6,0.5,'D'],[3,5,0.5,'U'],[3,7,0.5,'D'],[2,7,0.5,'U'],[2,5,0.5,'D'],[1,7,0.5,'U']]))
      .concat(line(5, 'Home A', [[1,5,0.5,'D'],[0,8,0.5,'U'],[0,7,0.5,'D'],[0,5,2,'U',['~']]]))
  },
  {
    id: 'm2-tap-am',
    title: 'Tapped Am Arpeggio - Three Octaves',
    level: 'master',
    style: 'lead',
    genre: 'rock',
    folder: 'arpeggio',
    track: 'study',
    key: 'Am',
    bpm: 92,
    summary: 'Left hand hammers A and C. Right-hand tap hits E above. Same cell on G, then B, then high E.',
    watchFor: 'Tap is a finger, not a pick slap. Pull the tap off into the hammer.',
    goals: ['Even triplet cell A-C-E.', 'Move the cell up an octave twice.', 'End on a tapped E that rings.'],
    steps: ['G string: hammer 2, hammer 5, tap 9.', 'B string: 5-8-12.', 'High E: 5-8-12 then tap 17.'],
    notes: []
      .concat(line(0, 'G cell', [[3,2,0.33,'D',['H']],[3,5,0.33,'D',['H']],[3,9,0.33,'D',['TAP']],[3,5,0.33,'U',['P']],[3,2,0.33,'U',['P']],[3,5,0.33,'D',['H']],[3,9,0.33,'D',['TAP']],[3,5,0.33,'U',['P']]]))
      .concat(line(1, 'G again', [[3,2,0.33,'D',['H']],[3,5,0.33,'D',['H']],[3,9,0.33,'D',['TAP']],[3,5,0.33,'U',['P']],[3,2,0.33,'U',['P']],[3,5,0.33,'D',['H']],[3,9,0.33,'D',['TAP']],[3,2,0.33,'U',['P']]]))
      .concat(line(2, 'B cell', [[4,5,0.33,'D',['H']],[4,8,0.33,'D',['H']],[4,12,0.33,'D',['TAP']],[4,8,0.33,'U',['P']],[4,5,0.33,'U',['P']],[4,8,0.33,'D',['H']],[4,12,0.33,'D',['TAP']],[4,8,0.33,'U',['P']]]))
      .concat(line(3, 'e cell', [[5,5,0.33,'D',['H']],[5,8,0.33,'D',['H']],[5,12,0.33,'D',['TAP']],[5,8,0.33,'U',['P']],[5,5,0.33,'U',['P']],[5,8,0.33,'D',['H']],[5,12,0.33,'D',['TAP']],[5,8,0.33,'U',['P']]]))
      .concat(line(4, 'High tap', [[5,5,0.33,'D',['H']],[5,8,0.33,'D',['H']],[5,17,0.33,'D',['TAP']],[5,12,0.33,'U',['P']],[5,8,0.33,'U',['P']],[5,12,0.33,'D',['TAP']],[5,8,0.33,'U',['P']],[5,5,0.33,'U',['P']]]))
      .concat(line(5, 'Hold A', [[5,5,1,'D'],[4,5,0.5,'U'],[3,2,0.5,'D'],[3,5,2,'U',['~']]]))
  },
  {
    id: 'm2-lydian-g',
    title: 'G Lydian - #4 as the Color, Not a Mistake',
    level: 'master',
    style: 'lead',
    genre: 'jazz',
    folder: 'solo',
    track: 'study',
    key: 'G',
    scaleMode: 'lydian',
    scaleRoot: 'G',
    bpm: 88,
    chords: ['Gmaj7', 'Cmaj7#11'],
    summary: 'Intermediate G major uses C. Lydian raises it to C#. That #4 is the sound over Gmaj7.',
    watchFor: 'C natural is Ionian. C# is B-string 2 or G-string 6 or high E 9.',
    goals: ['Hear C# against G.', 'Do not treat C# as a wrong note to fix.', 'Land G, B, or D on the last downbeat.'],
    steps: ['G major reminder: G A B C D E F#.', 'G Lydian: G A B C# D E F#.', 'Phrase ends G or B, not C.'],
    notes: []
      .concat(line(0, 'Ionian first', [[2,5,0.5,'D'],[3,4,0.5,'U'],[3,5,0.5,'D'],[4,3,0.5,'U'],[4,5,0.5,'D'],[5,3,0.5,'U'],[5,5,0.5,'D'],[5,7,0.5,'U']]))
      .concat(line(1, 'Swap C#', [[2,5,0.5,'D'],[3,4,0.5,'U'],[3,6,0.5,'D'],[4,3,0.5,'U'],[4,5,0.5,'D'],[5,2,0.5,'U'],[5,3,0.5,'D'],[5,7,0.5,'U']]))
      .concat(line(2, 'Lean C#', [[3,6,1,'D',['~']],[4,5,0.5,'U'],[4,3,0.5,'D'],[3,6,0.5,'U'],[3,4,0.5,'D'],[2,5,0.5,'U'],[2,4,0.5,'D']]))
      .concat(line(3, 'Pos 7', [[2,5,0.5,'D'],[2,7,0.5,'U'],[3,6,0.5,'D'],[3,7,0.5,'U'],[4,7,0.5,'D'],[4,9,0.5,'U'],[5,7,0.5,'D'],[5,9,0.5,'U']]))
      .concat(line(4, 'C# to D', [[5,9,0.5,'D'],[4,8,0.5,'U'],[4,7,0.5,'D'],[3,6,0.5,'U'],[3,7,0.5,'D'],[2,5,0.5,'U'],[3,4,0.5,'D'],[2,5,0.5,'U']]))
      .concat(line(5, 'Land G', [[3,4,0.5,'D'],[4,3,0.5,'U'],[4,0,0.5,'D'],[3,0,0.5,'U'],[2,5,0.5,'D'],[3,4,0.5,'U'],[2,5,1,'D',['~']]]))
  },
  {
    id: 'm2-54-riff',
    title: 'Five-Four Riff in A - Count Past Four',
    level: 'master',
    style: 'rhythm',
    genre: 'metal',
    folder: 'rhythm',
    track: 'study',
    key: 'Am',
    bpm: 116,
    chords: ['A5', 'C5', 'G5'],
    summary: 'Count 1-2-3-4-5. Cell is five eighths: A A C A G. Intermediate gallop lived in 4/4. The extra hit is the point.',
    watchFor: 'Do not sneak a sixth eighth. The hole after 5 is the groove.',
    goals: ['Feel 5 without tapping in 4.', 'Palm mute 1-2-3, open 4-5.', 'Start the answer on C without rushing.'],
    steps: ['Cell on low E: 5, 5, 8, 5, 3.', 'Four cells.', 'Answer: 8, 8, 10, 8, 5.', 'Home on A.'],
    notes: []
      .concat(line(0, 'Cell A', [[0,5,0.5,'D',['PM']],[0,5,0.5,'D',['PM']],[0,8,0.5,'D'],[0,5,0.5,'D',['PM']],[0,3,0.5,'D']]))
      .concat(line(1, 'Cell A 2', [[0,5,0.5,'D',['PM']],[0,5,0.5,'D',['PM']],[0,8,0.5,'D'],[0,5,0.5,'D',['PM']],[0,3,0.5,'D']]))
      .concat(line(2, 'Cell A 3', [[0,5,0.5,'D',['PM']],[0,5,0.5,'D',['PM']],[0,8,0.5,'D'],[0,5,0.5,'D',['PM']],[0,3,0.5,'D']]))
      .concat(line(3, 'Cell A 4', [[0,5,0.5,'D',['PM']],[0,5,0.5,'D',['PM']],[0,8,0.5,'D'],[0,5,0.5,'D',['PM']],[0,3,0.5,'D']]))
      .concat(line(4, 'Answer C', [[0,8,0.5,'D',['PM']],[0,8,0.5,'D',['PM']],[0,10,0.5,'D'],[0,8,0.5,'D',['PM']],[0,5,0.5,'D']]))
      .concat(line(5, 'Answer 2', [[0,8,0.5,'D',['PM']],[0,8,0.5,'D',['PM']],[0,10,0.5,'D'],[0,8,0.5,'D',['PM']],[0,5,0.5,'D']]))
      .concat(line(6, 'Home A', [[0,5,0.5,'D',['PM']],[0,5,0.5,'D',['PM']],[0,8,0.5,'D'],[0,5,0.5,'D',['PM']],[0,5,1,'D']]))
  },
  {
    id: 'm2-chicken-g',
    title: 'Chicken Pick Double Stops Through G-C-D',
    level: 'master',
    style: 'acoustic',
    genre: 'country',
    folder: 'rh',
    track: 'study',
    key: 'G',
    bpm: 108,
    chords: ['G', 'C', 'D'],
    summary: 'Pick plays the bass. Fingers pop a double stop on 2 and 4. Intermediate hybrid was one treble note.',
    watchFor: 'Bass is pick only. Pop is fingers. If the double stop is late the groove died.',
    goals: ['Walk G-B, C-E, D-F# in the bass.', 'Pop the third above on 2 and 4.', 'Change chords without restarting the right hand.'],
    steps: ['G: pick low E3 then D0. Pop B0+e3.', 'C: pick A3 then D2. Pop B1+e0.', 'D: pick D0 then A0. Pop B3+e2.'],
    notes: []
      .concat(line(0, 'G', [[0,3,0.5,'D'],[4,0,0.25,'U'],[5,3,0.25,'U'],[2,0,0.5,'D'],[4,0,0.25,'U'],[5,3,0.25,'U'],[0,3,0.5,'D'],[4,0,0.5,'U']]))
      .concat(line(1, 'G bar 2', [[0,3,0.5,'D'],[4,0,0.25,'U'],[5,3,0.25,'U'],[2,0,0.5,'D'],[5,3,0.25,'U'],[4,0,0.25,'U'],[0,3,0.5,'D'],[2,0,0.5,'U']]))
      .concat(line(2, 'C', [[1,3,0.5,'D'],[4,1,0.25,'U'],[5,0,0.25,'U'],[2,2,0.5,'D'],[4,1,0.25,'U'],[5,0,0.25,'U'],[1,3,0.5,'D'],[4,1,0.5,'U']]))
      .concat(line(3, 'D', [[2,0,0.5,'D'],[4,3,0.25,'U'],[5,2,0.25,'U'],[1,0,0.5,'D'],[4,3,0.25,'U'],[5,2,0.25,'U'],[2,0,0.5,'D'],[5,2,0.5,'U']]))
      .concat(line(4, 'Walk back', [[0,3,0.5,'D'],[4,0,0.25,'U'],[5,3,0.25,'U'],[1,2,0.5,'D'],[4,0,0.25,'U'],[5,3,0.25,'U'],[1,3,0.5,'D'],[4,1,0.5,'U']]))
      .concat(line(5, 'Home G', [[2,0,0.5,'D'],[4,3,0.25,'U'],[5,2,0.25,'U'],[0,3,0.5,'D'],[4,0,0.25,'U'],[5,3,0.25,'U'],[0,3,1,'D']]))
  },
  {
    id: 'm2-walk-jazz',
    title: 'Walking Bass Under Gmaj7-Cmaj7-D7-G',
    level: 'master',
    style: 'rhythm',
    genre: 'jazz',
    folder: 'bridging',
    track: 'study',
    key: 'G',
    bpm: 96,
    chords: ['Gmaj7', 'Cmaj7', 'D7', 'Gmaj7'],
    summary: 'Bass walks four notes per bar. Chords punch on beat 1 only. Beat 4 approaches the next root.',
    watchFor: 'Beat 1 is a chord root or fifth. Beat 4 approaches the next root by half step or scale step.',
    goals: ['Bass line outlines G C D G.', 'Chord punches stay short.', 'Approach the next root.'],
    steps: ['G bar: G A B Bb into C.', 'C bar: C D E Eb into D.', 'D bar: D E F# F into G.', 'Hold Gmaj7.'],
    notes: []
      .concat(line(0, 'Walk G', [[0,3,0.5,'D'],[1,0,0.5,'U'],[1,2,0.5,'D'],[1,1,0.5,'U']]))
      .concat(chordHits(1, 'Gmaj7', [[2,4],[3,4],[4,3],[5,2]], 2))
      .concat(line(2, 'Walk C', [[1,3,0.5,'D'],[2,0,0.5,'U'],[2,2,0.5,'D'],[2,1,0.5,'U']]))
      .concat(chordHits(3, 'Cmaj7', [[2,5],[3,5],[4,5],[5,3]], 2))
      .concat(line(4, 'Walk D', [[2,0,0.5,'D'],[2,2,0.5,'U'],[2,4,0.5,'D'],[2,3,0.5,'U']]))
      .concat(chordHits(5, 'D7', [[2,4],[3,5],[4,3],[5,2]], 2))
      .concat(line(6, 'Walk home', [[0,3,0.5,'D'],[1,2,0.5,'U'],[2,0,0.5,'D'],[2,5,0.5,'U']]))
      .concat(chordHits(7, 'Gmaj7 hold', [[2,4],[3,4],[4,3],[5,2]], 2))
  },
  {
    id: 'm2-seq-c',
    title: 'C Major Sequences - Groups of Four Across Two Octaves',
    level: 'master',
    style: 'lead',
    genre: 'folk',
    folder: 'lead',
    track: 'study',
    key: 'C',
    scaleMode: 'ionian',
    scaleRoot: 'C',
    bpm: 104,
    summary: 'Intermediate C major was a scale run. Master C major is a sequence: 1-2-3-4, 2-3-4-5 through two octaves, then descend.',
    watchFor: 'Even 16ths. The first note of each four-note group is the new scale degree.',
    goals: ['Sequence up two octaves without stopping.', 'Descend the same pattern.', 'Fingering stays 3NPS after fret 5.'],
    steps: ['Start open-position C.', 'Sequence in fours.', 'Descend and land C.'],
    notes: []
      .concat(line(0, 'Open cell', [[2,3,0.25,'D'],[3,0,0.25,'U'],[3,2,0.25,'D'],[4,0,0.25,'U'],[3,0,0.25,'D'],[3,2,0.25,'U'],[4,0,0.25,'D'],[4,1,0.25,'U']]))
      .concat(line(1, 'Climb fours', [[4,1,0.25,'D'],[5,0,0.25,'U'],[5,1,0.25,'D'],[5,3,0.25,'U'],[5,0,0.25,'D'],[5,1,0.25,'U'],[5,3,0.25,'D'],[5,5,0.25,'U']]))
      .concat(line(2, '3NPS up', [[5,3,0.25,'D'],[5,5,0.25,'U'],[5,7,0.25,'D'],[5,8,0.25,'U'],[5,5,0.25,'D'],[5,7,0.25,'U'],[5,8,0.25,'D'],[4,8,0.25,'U']]))
      .concat(line(3, 'Across', [[4,5,0.25,'D'],[4,6,0.25,'U'],[4,8,0.25,'D'],[3,5,0.25,'U'],[3,7,0.25,'D'],[3,9,0.25,'U'],[2,7,0.25,'D'],[2,8,0.25,'U']]))
      .concat(line(4, 'Down fours', [[5,8,0.25,'D'],[5,7,0.25,'U'],[5,5,0.25,'D'],[5,3,0.25,'U'],[5,7,0.25,'D'],[5,5,0.25,'U'],[5,3,0.25,'D'],[5,1,0.25,'U']]))
      .concat(line(5, 'Land C', [[5,3,0.25,'D'],[5,1,0.25,'U'],[5,0,0.25,'D'],[4,3,0.25,'U'],[4,1,0.25,'D'],[3,2,0.25,'U'],[3,0,0.25,'D'],[2,3,1,'U',['~']]]))
  },
  {
    id: 'm2-prebend',
    title: 'Pre-Bend, Unison, Release - A Minor Phrase',
    level: 'master',
    style: 'lead',
    genre: 'blues',
    folder: 'lead',
    track: 'study',
    key: 'Am',
    scaleMode: 'minor-pent',
    scaleRoot: 'A',
    bpm: 72,
    summary: 'Master pre-bend: the string is already at pitch when you pick. Then a unison B8 against bent G7, then a release into a slide.',
    watchFor: 'Pre-bend is silent until the pick. If you hear the scoop you bent after the attack.',
    goals: ['Pre-bend G7 to A before the pick.', 'Hold B8 against that A.', 'Release into a slide, not a jump.'],
    steps: ['Silent bend G7 to 9 pitch. Pick. Hold.', 'Add B8. Both notes are A.', 'Release, pull 5, slide 5 to 7.', 'Home A5.'],
    notes: []
      .concat(line(0, 'Pre-bend A', [[3,7,1.5,'D',['B']],[4,8,0.5,'U'],[3,7,1,'D',['B']],[4,8,1,'U']]))
      .concat(line(1, 'Release', [[3,7,0.5,'D'],[3,5,0.5,'U',['P']],[3,5,0.5,'D'],[3,7,0.5,'U',['S']],[4,5,0.5,'D'],[4,8,0.5,'U'],[3,7,0.5,'D'],[3,5,0.5,'U']]))
      .concat(line(2, 'B pre-bend', [[4,8,1.5,'D',['B']],[4,8,0.5,'D'],[4,5,0.5,'U',['P']],[3,7,0.5,'D'],[3,5,0.5,'U'],[2,7,0.5,'D']]))
      .concat(line(3, 'Box 2', [[4,8,0.5,'D'],[5,5,0.5,'U'],[5,8,0.5,'D'],[4,8,0.5,'U'],[4,5,0.5,'D'],[3,7,0.5,'U'],[2,7,0.5,'D'],[3,5,0.5,'U']]))
      .concat(line(4, 'Unison again', [[3,7,1,'D',['B']],[4,8,1,'U'],[3,7,0.5,'D'],[3,5,0.5,'U',['P']],[1,7,0.5,'D'],[1,5,0.5,'U']]))
      .concat(line(5, 'Home A', [[3,7,0.5,'D'],[3,5,0.5,'U'],[2,7,0.5,'D'],[1,7,0.5,'U'],[1,5,0.5,'D'],[3,5,0.5,'U'],[1,5,1,'D',['~']]]))
  },
  {
    id: 'm2-harm-melody',
    title: 'Natural Harmonics Over a Moving Bass',
    level: 'master',
    style: 'acoustic',
    folder: 'harmonics',
    track: 'study',
    key: 'G',
    bpm: 66,
    chords: ['G', 'C', 'D', 'Em'],
    summary: 'Harmonics at 12 and 7 stay put. Bass walks G-C-D-Em underneath.',
    watchFor: 'Touch the harmonic node. Do not fret it. Bass changes on beat 1.',
    goals: ['Keep 12th-fret chimes ringing.', 'Change only the bass.', 'Hear G C D Em without strumming a chord.'],
    steps: ['Chime high E 12, B 12, G 12.', 'Bass: low E3, A3, D0, open E.', 'Second pass uses 7th-fret harmonics.'],
    notes: []
      .concat(line(0, 'G bed', [[0,3,2,'D'],[5,12,0.5,'U'],[4,12,0.5,'U'],[3,12,0.5,'U'],[4,12,0.5,'U']]))
      .concat(line(1, 'C bed', [[1,3,2,'D'],[5,12,0.5,'U'],[4,12,0.5,'U'],[3,12,0.5,'U'],[5,12,0.5,'U']]))
      .concat(line(2, 'D bed', [[2,0,2,'D'],[5,12,0.5,'U'],[4,12,0.5,'U'],[3,7,0.5,'U'],[4,7,0.5,'U']]))
      .concat(line(3, 'Em bed', [[0,0,2,'D'],[4,7,0.5,'U'],[3,7,0.5,'U'],[4,12,0.5,'U'],[5,12,0.5,'U']]))
      .concat(line(4, 'G then C', [[0,3,1,'D'],[5,12,0.5,'U'],[4,12,0.5,'U'],[1,3,1,'D'],[5,12,0.5,'U'],[4,12,0.5,'U']]))
      .concat(line(5, 'Home G', [[2,0,1,'D'],[4,7,0.5,'U'],[3,7,0.5,'U'],[0,3,1,'D'],[5,12,1,'U']]))
  },
  {
    id: 'm2-side-slip',
    title: 'Side-Slip a Whole Step and Come Home',
    level: 'master',
    style: 'lead',
    genre: 'jazz',
    folder: 'solo',
    track: 'study',
    key: 'Am',
    scaleMode: 'minor-pent',
    scaleRoot: 'A',
    bpm: 100,
    chords: ['Am'],
    summary: 'Am pent box 1 for two bars. Shift the box up two frets for two bars. Slide home on beat 1 of bar 5. Advanced outside was a half step. Master side-slip is a whole step.',
    watchFor: 'Home note on bar 5 beat 1 must be A, C, or E. If you land on B you are still outside.',
    goals: ['Keep the box shape while you move it.', 'Two bars away, then home.', 'Slide into the home tone.'],
    steps: ['Bars 1-2: Am pent at 5.', 'Bars 3-4: same fingering at 7.', 'Bar 5 beat 1: slide 7 back to 5.', 'Last line is Am only.'],
    notes: []
      .concat(line(0, 'Am box', [[1,5,0.5,'D'],[1,7,0.5,'U'],[2,7,0.5,'D'],[3,5,0.5,'U'],[3,7,0.5,'D'],[4,5,0.5,'U'],[4,8,0.5,'D'],[5,5,0.5,'U']]))
      .concat(line(1, 'Am down', [[5,5,0.5,'D'],[4,8,0.5,'U'],[4,5,0.5,'D'],[3,7,0.5,'U'],[3,5,0.5,'D'],[2,7,0.5,'U'],[1,7,0.5,'D'],[1,5,0.5,'U']]))
      .concat(line(2, 'Slip +2', [[1,7,0.5,'D'],[1,9,0.5,'U'],[2,9,0.5,'D'],[3,7,0.5,'U'],[3,9,0.5,'D'],[4,7,0.5,'U'],[4,10,0.5,'D'],[5,7,0.5,'U']]))
      .concat(line(3, 'Slip down', [[5,7,0.5,'D'],[4,10,0.5,'U'],[4,7,0.5,'D'],[3,9,0.5,'U'],[3,7,0.5,'D'],[2,9,0.5,'U'],[1,9,0.5,'D'],[1,7,0.5,'U']]))
      .concat(line(4, 'Slide home', [[1,7,0.5,'D'],[1,5,0.5,'U',['S']],[2,7,0.5,'D'],[3,5,0.5,'U'],[4,5,0.5,'D'],[5,5,0.5,'U'],[4,8,0.5,'D'],[3,5,0.5,'U']]))
      .concat(line(5, 'Am hold', [[3,7,0.5,'D'],[3,5,0.5,'U'],[2,7,0.5,'D'],[1,7,0.5,'U'],[1,5,0.5,'D'],[3,5,0.5,'U'],[1,5,1,'D',['~']]]))
  }
];
