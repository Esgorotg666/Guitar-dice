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

export const MASTER_PACK_1 = [
  {
    id: 'master-alt-dom-c',
    title: 'G7alt into Cmaj7 \u2014 play the landing',
    level: 'master',
    style: 'lead',
    genre: 'jazz',
    folder: 'solo',
    track: 'study',
    key: 'C',
    scaleMode: 'altered',
    scaleRoot: 'G',
    bpm: 80,
    chords: ['Dm7', 'G7', 'Cmaj7'],
    summary: 'Eight bars. Dm7 arpeggio names the ii. G7alt uses b9 #9 b5 #5. Beat 1 of bar 7 is E or B \u2014 the 3rd or 7th of C. If beat 1 is a random scale tone you missed the change.',
    watchFor: 'Ab and Bb belong to G7alt. They do not sit on beat 1 of C. Name the target before the last eighth.',
    goals: ['Land E or B on bar 7 beat 1.', 'Hear Ab as b9 of G, not as a new key.', 'Play the eight bars at 60 before 80.'],
    steps: [
      'Bars 1\u20132: Dm7. A5 D7 G5 B6 \u2014 D F A C spelled as an arpeggio.',
      'Bars 3\u20136: G7alt. B6 (F, the 7th) then e4 (Ab b9), e6 (Bb #9), e7 (B 3rd), e9 (Db b5), e11 (Eb #5), back to B6 (F).',
      'Bar 7: e8 (C) is only a passing tone. Land B5 (E, the 3rd of C) or e7 (B, the 7th).',
      'Bar 8: hold Cmaj7 tones e8 B8 B5. Do not add Ab.'
    ],
    notes: []
      .concat(line(0, 'Dm7', [[1,5,0.5,'D'],[2,7,0.5,'U'],[3,5,0.5,'D'],[4,6,0.5,'U'],[3,5,0.5,'D'],[2,7,0.5,'U'],[1,5,0.5,'D'],[2,7,0.5,'U']]))
      .concat(line(1, 'Dm7 again', [[1,5,0.5,'D'],[2,7,0.5,'U'],[3,5,0.5,'D'],[4,6,0.5,'U'],[5,5,0.5,'D'],[4,6,0.5,'U'],[3,7,0.5,'D'],[2,7,0.5,'U']]))
      .concat(line(2, 'G7alt b9 #9', [[4,6,0.5,'D'],[5,4,0.5,'U'],[5,6,0.5,'D'],[5,7,0.5,'U'],[5,6,0.5,'D'],[5,4,0.5,'U'],[4,6,0.5,'D'],[3,4,0.5,'U']]))
      .concat(line(3, 'G7alt b5 #5', [[5,7,0.5,'D'],[5,9,0.5,'U'],[5,11,0.5,'D'],[5,9,0.5,'U'],[5,7,0.5,'D'],[4,6,0.5,'U'],[3,4,0.5,'D'],[4,6,0.5,'U']]))
      .concat(line(4, 'Approach C', [[5,6,0.5,'D'],[5,4,0.5,'U'],[4,6,0.5,'D'],[5,7,0.5,'U'],[5,8,0.25,'D'],[5,7,0.25,'U'],[4,5,1,'D',['~']]]))
      .concat(line(5, 'Cmaj7 hold', [[4,5,1,'D'],[5,7,1,'U'],[5,8,1,'D'],[4,8,1,'U']]))
  },
  {
    id: 'master-outside-am',
    title: 'Outside then inside over Am',
    level: 'master',
    style: 'lead',
    genre: 'jazz',
    folder: 'solo',
    track: 'study',
    key: 'Am',
    scaleMode: 'aeolian',
    scaleRoot: 'A',
    bpm: 96,
    chords: ['Am'],
    summary: 'Four bars sit on Am pentatonic box 1. Four bars walk a half-step above (Bbm pent color) and come home on beat 1 of bar 7. Outside is a visit. Inside is the address.',
    watchFor: 'If the last note of the outside cell is not a half-step into A, C, or E, you did not resolve.',
    goals: ['Keep the Am box under your fingers while you leave it.', 'Four outside bars max, then home.', 'Home note is A, C, or E on a downbeat.'],
    steps: [
      'Bars 1\u20132: A minor pent box 1. E5 A7 D7 G5 B5 e5.',
      'Bars 3\u20134: same box, end on A (E5 or e5).',
      'Bars 5\u20136: shift every finger one fret up. That is Bbm color \u2014 outside.',
      'Bar 7 beat 1: slide or release back to E5 (A) or e8 (C). Hold.'
    ],
    notes: []
      .concat(line(0, 'Am box', [[0,5,0.5,'D'],[0,8,0.5,'U'],[1,5,0.5,'D'],[1,7,0.5,'U'],[2,5,0.5,'D'],[2,7,0.5,'U'],[3,5,0.5,'D'],[3,7,0.5,'U']]))
      .concat(line(1, 'Am climb', [[4,5,0.5,'D'],[4,8,0.5,'U'],[5,5,0.5,'D'],[5,8,0.5,'U'],[5,5,0.5,'D'],[4,8,0.5,'U'],[4,5,0.5,'D'],[3,5,0.5,'U']]))
      .concat(line(2, 'Outside +1', [[0,6,0.5,'D'],[0,9,0.5,'U'],[1,6,0.5,'D'],[1,8,0.5,'U'],[2,6,0.5,'D'],[2,8,0.5,'U'],[3,6,0.5,'D'],[3,8,0.5,'U']]))
      .concat(line(3, 'Outside high', [[4,6,0.5,'D'],[4,9,0.5,'U'],[5,6,0.5,'D'],[5,9,0.5,'U'],[5,6,0.5,'D'],[4,9,0.5,'U'],[4,6,0.5,'D'],[3,6,0.5,'U']]))
      .concat(line(4, 'Home A', [[0,6,0.25,'D'],[0,5,0.25,'U',['P']],[0,5,1.5,'D',['~']],[1,7,0.5,'U'],[2,7,0.5,'D'],[3,5,0.5,'U'],[4,5,0.5,'D'],[5,5,1,'U',['~']]]))
  },
  {
    id: 'master-neo-aharm',
    title: 'A harmonic minor \u2014 four-note cells, three rooms',
    level: 'master',
    style: 'lead',
    genre: 'metal',
    folder: 'lead',
    track: 'study',
    key: 'Am',
    scaleMode: 'harmonic-minor',
    scaleRoot: 'A',
    bpm: 112,
    summary: 'Four-note cell 5-8-7-5 on the low E (A C B A), then the same shape on D and B. Shift the cell to fret 8 and fret 12. Last bar is G# to A. This is A harmonic minor, not pentatonic.',
    watchFor: 'G# is fret 4 on the low E, fret 6 on D, fret 8 on B, fret 16 on high E. If you play G natural you left harmonic minor.',
    goals: ['One finger per note in the cell.', 'Shift rooms without restarting the right hand.', 'End on A after G#.'],
    steps: [
      'Room 1 (fret 5): E5-8-7-5, A7-8-7-5, D6-7-6-7 (G# A G# A).',
      'Room 2 (fret 8): E8-12-10-8. Same right-hand order.',
      'Room 3 (fret 12): E12-15-13-12.',
      'Cadence: B8 (G#) to e5 or E5 (A). Hold A.'
    ],
    notes: []
      .concat(line(0, 'Room 5', [[0,5,0.25,'D'],[0,8,0.25,'U'],[0,7,0.25,'D'],[0,5,0.25,'U'],[1,7,0.25,'D'],[1,8,0.25,'U'],[1,7,0.25,'D'],[1,5,0.25,'U'],[2,6,0.25,'D'],[2,7,0.25,'U'],[2,6,0.25,'D'],[2,7,0.25,'U'],[3,5,0.25,'D'],[3,7,0.25,'U'],[3,9,0.25,'D'],[3,7,0.25,'U']]))
      .concat(line(1, 'Room 5 high', [[4,5,0.25,'D'],[4,6,0.25,'U'],[4,8,0.25,'D'],[4,6,0.25,'U'],[5,5,0.25,'D'],[5,8,0.25,'U'],[5,7,0.25,'D'],[5,5,0.25,'U'],[4,8,0.25,'D'],[4,6,0.25,'U'],[4,5,0.25,'D'],[3,5,0.25,'U'],[2,7,0.5,'D'],[0,5,0.5,'U']]))
      .concat(line(2, 'Room 8', [[0,8,0.25,'D'],[0,12,0.25,'U'],[0,10,0.25,'D'],[0,8,0.25,'U'],[1,10,0.25,'D'],[1,12,0.25,'U'],[1,10,0.25,'D'],[1,8,0.25,'U'],[2,9,0.25,'D'],[2,10,0.25,'U'],[2,9,0.25,'D'],[2,10,0.25,'U'],[3,9,0.25,'D'],[3,10,0.25,'U'],[3,12,0.25,'D'],[3,10,0.25,'U']]))
      .concat(line(3, 'Room 12', [[0,12,0.25,'D'],[0,15,0.25,'U'],[0,13,0.25,'D'],[0,12,0.25,'U'],[1,14,0.25,'D'],[1,15,0.25,'U'],[1,14,0.25,'D'],[1,12,0.25,'U'],[2,14,0.25,'D'],[2,13,0.25,'U'],[4,13,0.25,'D'],[4,16,0.25,'U'],[5,17,0.5,'D'],[5,16,0.5,'U',['P']]]))
      .concat(line(4, 'G# to A', [[4,16,0.5,'D'],[5,17,0.5,'U'],[4,16,0.5,'D'],[0,5,2,'U',['~']]]))
  },
  {
    id: 'master-drop2-gcd',
    title: 'Drop-2 voice leading G C D',
    level: 'master',
    style: 'rhythm',
    genre: 'jazz',
    folder: 'chords',
    track: 'study',
    key: 'G',
    bpm: 76,
    chords: ['Gmaj7', 'Cmaj7', 'D7'],
    summary: 'Three drop-2 grips. Common tones stay. Only the moving voices walk. This is harmony on the guitar, not a catalog of shapes.',
    watchFor: 'If every finger lifts on the change you are not voice-leading. Keep at least one finger down.',
    goals: ['Name 3 and 7 in each grip.', 'Move to the next grip by step.', 'Hold each chord two beats, then the line that connects them.'],
    steps: [
      'Gmaj7 drop-2: D5 G4 B3 e2 = G B D F#.',
      'Cmaj7: D5 G5 B5 e3 = G C E G. D5 stays from Gmaj7.',
      'D7: D4 G5 B3 e2 = F# C D F#. G5 stays from C. Resolve back to Gmaj7.'
    ],
    notes: []
      .concat(chordHits(0, 'Gmaj7', [[2,5],[3,4],[4,3],[5,2]], 2))
      .concat(line(1, 'Walk to C', [[5,2,0.5,'D'],[5,3,0.5,'U'],[4,3,0.5,'D'],[4,5,0.5,'U']]))
      .concat(chordHits(2, 'Cmaj7', [[2,5],[3,5],[4,5],[5,3]], 2))
      .concat(line(3, 'Walk to D7', [[5,3,0.5,'D'],[5,2,0.5,'U'],[4,5,0.5,'D'],[4,3,0.5,'U']]))
      .concat(chordHits(4, 'D7', [[2,4],[3,5],[4,3],[5,2]], 2))
      .concat(line(5, 'Back toward G', [[5,2,0.5,'D'],[4,3,0.5,'U'],[3,5,0.5,'D'],[3,4,0.5,'U']]))
      .concat(chordHits(6, 'Gmaj7 home', [[2,5],[3,4],[4,3],[5,2]], 2))
      .concat(chordHits(7, 'Cmaj7 again', [[2,5],[3,5],[4,5],[5,3]], 2))
      .concat(chordHits(8, 'D7 again', [[2,4],[3,5],[4,3],[5,2]], 2))
      .concat(chordHits(9, 'Gmaj7 hold', [[2,5],[3,4],[4,3],[5,2]], 2))
  },
  {
    id: 'master-thump-e',
    title: 'Thump and pop on E7',
    level: 'master',
    style: 'rhythm',
    genre: 'funk',
    folder: 'rhythm',
    track: 'study',
    key: 'E',
    bpm: 104,
    chords: ['E7'],
    summary: 'Muted 16ths on the low E (thump), then a popped E7 chord on beat 3 of bars 2 and 4. Eight bars. The groove is the lesson.',
    watchFor: 'Thump is palm on the bridge, not a dead click. Pop is a short chord, not a full ring unless the last bar.',
    goals: ['16ths stay even at 90 then 104.', 'Chord hits only where written.', 'Do not let the open A ring during the thump.'],
    steps: [
      'Bars 1, 3, 5, 7: sixteen muted 16ths on open E.',
      'Bars 2 and 4: eight thumps, then E7 (020130 \u2014 B string at 3 for the D). Two short pops.',
      'Bars 6 and 8: same as 2, last pop may ring.',
      'Count 1-e-and-a out loud the first four bars.'
    ],
    notes: []
      .concat(line(0, 'Thump 1', [[0,0,0.25,'D',['PM']],[0,0,0.25,'D',['PM']],[0,0,0.25,'D',['PM']],[0,0,0.25,'D',['PM']],[0,0,0.25,'D',['PM']],[0,0,0.25,'D',['PM']],[0,0,0.25,'D',['PM']],[0,0,0.25,'D',['PM']],[0,0,0.25,'D',['PM']],[0,0,0.25,'D',['PM']],[0,0,0.25,'D',['PM']],[0,0,0.25,'D',['PM']],[0,0,0.25,'D',['PM']],[0,0,0.25,'D',['PM']],[0,0,0.25,'D',['PM']],[0,0,0.25,'D',['PM']]]))
      .concat(line(1, 'Thump then pop', [[0,0,0.25,'D',['PM']],[0,0,0.25,'D',['PM']],[0,0,0.25,'D',['PM']],[0,0,0.25,'D',['PM']],[0,0,0.25,'D',['PM']],[0,0,0.25,'D',['PM']],[0,0,0.25,'D',['PM']],[0,0,0.25,'D',['PM']]]))
      .concat(chordHits(2, 'E7 pop', [[0,0],[1,2],[2,0],[3,1],[4,3],[5,0]], 1))
      .concat(chordHits(3, 'E7 pop 2', [[0,0],[1,2],[2,0],[3,1],[4,3],[5,0]], 1))
      .concat(line(4, 'Thump 3', [[0,0,0.25,'D',['PM']],[0,0,0.25,'D',['PM']],[0,0,0.25,'D',['PM']],[0,0,0.25,'D',['PM']],[0,0,0.25,'D',['PM']],[0,0,0.25,'D',['PM']],[0,0,0.25,'D',['PM']],[0,0,0.25,'D',['PM']],[0,0,0.25,'D',['PM']],[0,0,0.25,'D',['PM']],[0,0,0.25,'D',['PM']],[0,0,0.25,'D',['PM']],[0,0,0.25,'D',['PM']],[0,0,0.25,'D',['PM']],[0,0,0.25,'D',['PM']],[0,0,0.25,'D',['PM']]]))
      .concat(line(5, 'Thump 4', [[0,0,0.25,'D',['PM']],[0,0,0.25,'D',['PM']],[0,0,0.25,'D',['PM']],[0,0,0.25,'D',['PM']],[0,0,0.25,'D',['PM']],[0,0,0.25,'D',['PM']],[0,0,0.25,'D',['PM']],[0,0,0.25,'D',['PM']]]))
      .concat(chordHits(6, 'E7 hold', [[0,0],[1,2],[2,0],[3,1],[4,3],[5,0]], 2))
  },
  {
    id: 'master-trit-am',
    title: 'ii\u00f8\u2013subV\u2013i in A minor',
    level: 'master',
    style: 'lead',
    genre: 'jazz',
    folder: 'solo',
    track: 'study',
    key: 'Am',
    scaleMode: 'harmonic-minor',
    scaleRoot: 'A',
    bpm: 80,
    chords: ['Bm7b5', 'Bb7', 'Am'],
    summary: 'Bm7b5 is ii\u00f8 in A minor. Bb7 stands in for E7. They share G#/Ab and D. Bass walks B\u2013Bb\u2013A. Line hits those guide tones on beat 1.',
    watchFor: 'A Bb triad without Ab is Phrygian color, not a tritone sub. The 7th (Ab) and the resolution to A decide.',
    goals: ['Beat 1 of each bar is a chord tone.', 'Hear Bb7 squeeze into Am.', 'Do not stay in Bb after the sub.'],
    steps: [
      'Bar 1\u20132 Bm7b5: A2 D3 G2 B3 = B D F A.',
      'Bar 3\u20134 Bb7: A1 D3 G1 B3 = Bb D Ab D. Ab is the 7th.',
      'Bar 5\u20138 Am: A0 D2 G2 B1. Line lands A or C on beat 1.',
      'Last bar hold Am. No extra Bb.'
    ],
    notes: []
      .concat(line(0, 'Bm7b5', [[1,2,0.5,'D'],[2,3,0.5,'U'],[3,2,0.5,'D'],[4,3,0.5,'U'],[3,2,0.5,'D'],[2,3,0.5,'U'],[1,2,0.5,'D'],[2,3,0.5,'U']]))
      .concat(line(1, 'Bm7b5 line', [[4,3,0.5,'D'],[3,2,0.5,'U'],[2,3,0.5,'D'],[1,2,0.5,'U'],[0,2,0.5,'D'],[1,2,0.5,'U'],[2,0,0.5,'D'],[2,3,0.5,'U']]))
      .concat(line(2, 'Bb7 Ab', [[1,1,0.5,'D'],[2,3,0.5,'U'],[3,1,0.5,'D'],[4,3,0.5,'U'],[3,1,0.5,'D'],[2,3,0.5,'U'],[1,1,0.5,'D'],[3,1,0.5,'U']]))
      .concat(line(3, 'Bb7 to A', [[4,3,0.5,'D'],[3,1,0.5,'U'],[2,3,0.5,'D'],[1,1,0.5,'U'],[1,0,0.5,'D'],[2,2,0.5,'U'],[3,2,0.5,'D'],[4,1,0.5,'U']]))
      .concat(line(4, 'Am home', [[1,0,1,'D'],[2,2,0.5,'U'],[3,2,0.5,'D'],[4,1,1,'U'],[3,2,0.5,'D'],[2,2,0.5,'U']]))
      .concat(chordHits(5, 'Am hold', [[1,0],[2,2],[3,2],[4,1],[5,0]], 2))
  },
  {
    id: 'master-78-e',
    title: 'Seven-eight riff in E \u2014 original cell',
    level: 'master',
    style: 'rhythm',
    genre: 'metal',
    folder: 'rhythm',
    track: 'study',
    key: 'E',
    bpm: 120,
    chords: ['E5', 'G5', 'A5'],
    summary: 'Count 1-2-3-4-5-6-7. Cell is E5 E5 E5 G5 E5 A5 G5 as seven eighths. Four cells, then the same cell starting on G5. Not a cover. Palm mute the first five, last two open.',
    watchFor: 'Do not add an eighth and turn it into 4/4. The hole after 7 is the point.',
    goals: ['Feel 7 without tapping your foot in 4.', 'Mute stays consistent.', 'Second line starts on G5 without rushing.'],
    steps: [
      'Cell: low E open, open, open, 3, open, 5, 3.',
      'Play four cells.',
      'Answer cell: G3 G3 G3 A5 G3 B7 A5 (still on low E / A).',
      'End on open E, one full 7-count of rest in your head.'
    ],
    notes: []
      .concat(line(0, 'Cell E', [[0,0,0.5,'D',['PM']],[0,0,0.5,'D',['PM']],[0,0,0.5,'D',['PM']],[0,3,0.5,'D',['PM']],[0,0,0.5,'D',['PM']],[0,5,0.5,'D'],[0,3,0.5,'D']]))
      .concat(line(1, 'Cell E 2', [[0,0,0.5,'D',['PM']],[0,0,0.5,'D',['PM']],[0,0,0.5,'D',['PM']],[0,3,0.5,'D',['PM']],[0,0,0.5,'D',['PM']],[0,5,0.5,'D'],[0,3,0.5,'D']]))
      .concat(line(2, 'Cell E 3', [[0,0,0.5,'D',['PM']],[0,0,0.5,'D',['PM']],[0,0,0.5,'D',['PM']],[0,3,0.5,'D',['PM']],[0,0,0.5,'D',['PM']],[0,5,0.5,'D'],[0,3,0.5,'D']]))
      .concat(line(3, 'Cell E 4', [[0,0,0.5,'D',['PM']],[0,0,0.5,'D',['PM']],[0,0,0.5,'D',['PM']],[0,3,0.5,'D',['PM']],[0,0,0.5,'D',['PM']],[0,5,0.5,'D'],[0,3,0.5,'D']]))
      .concat(line(4, 'Answer G', [[0,3,0.5,'D',['PM']],[0,3,0.5,'D',['PM']],[0,3,0.5,'D',['PM']],[0,5,0.5,'D',['PM']],[0,3,0.5,'D',['PM']],[0,7,0.5,'D'],[0,5,0.5,'D']]))
      .concat(line(5, 'Answer G 2', [[0,3,0.5,'D',['PM']],[0,3,0.5,'D',['PM']],[0,3,0.5,'D',['PM']],[0,5,0.5,'D',['PM']],[0,3,0.5,'D',['PM']],[0,7,0.5,'D'],[0,5,0.5,'D']]))
      .concat(line(6, 'Home E', [[0,0,0.5,'D',['PM']],[0,0,0.5,'D',['PM']],[0,0,0.5,'D',['PM']],[0,3,0.5,'D',['PM']],[0,0,0.5,'D',['PM']],[0,0,1,'D']]))
  },
  {
    id: 'master-sweep-am',
    title: 'A minor triad sweep \u2014 three strings, then a line',
    level: 'master',
    style: 'lead',
    genre: 'metal',
    folder: 'arpeggio',
    track: 'study',
    key: 'Am',
    bpm: 96,
    summary: 'Sweep Am (G5 B5 e5 = C E A) down and back, then the same triad at fret 8 (G9 B10 e8 = E A C), then a descending A minor line. Sweeps are one motion. The line proves you still own the key.',
    watchFor: 'Do not pick every string separately and call it a sweep. Mute the string you just left.',
    goals: ['One roll per triad direction.', 'Shift to the inversion without a hitch.', 'Descend in time after the last sweep.'],
    steps: [
      'Shape 1: G5 B5 e5. Downsweep e-B-G, upsweep G-B-e. Repeat.',
      'Shape 2: G9 B10 e8.',
      'Descend: e8 e5 B5 B6 G5 G7 D7 D5 A7 A5 E8 E5.',
      'End on A (E5).'
    ],
    notes: []
      .concat(line(0, 'Sweep 1 up', [[3,5,0.5,'D'],[4,5,0.5,'D'],[5,5,1,'D'],[5,5,0.5,'U'],[4,5,0.5,'U'],[3,5,1,'U']]))
      .concat(line(1, 'Sweep 1 again', [[3,5,0.5,'D'],[4,5,0.5,'D'],[5,5,1,'D'],[5,5,0.5,'U'],[4,5,0.5,'U'],[3,5,1,'U']]))
      .concat(line(2, 'Sweep 2', [[3,9,0.5,'D'],[4,10,0.5,'D'],[5,8,1,'D'],[5,8,0.5,'U'],[4,10,0.5,'U'],[3,9,1,'U']]))
      .concat(line(3, 'Descend Am', [[5,8,0.5,'D'],[5,5,0.5,'U'],[4,5,0.5,'D'],[4,6,0.5,'U'],[3,5,0.5,'D'],[3,7,0.5,'U'],[2,7,0.5,'D'],[2,5,0.5,'U']]))
      .concat(line(4, 'Home A', [[1,7,0.5,'D'],[1,5,0.5,'U'],[0,8,0.5,'D'],[0,5,2,'U',['~']]]))
  },
  {
    id: 'master-quartal-d',
    title: 'Quartal plane from D \u2014 two rooms',
    level: 'master',
    style: 'rhythm',
    genre: 'jazz',
    folder: 'chords',
    track: 'study',
    key: 'D',
    bpm: 88,
    chords: ['D', 'E', 'F'],
    summary: 'Stack perfect 4ths. D0 G0 B1 = D G C. Slide two frets: E A D. Then F Bb Eb. Room 2 starts at fret 5. Pedal open D under the last two grips so it is a pad, not only a slide.',
    watchFor: 'If you add a major 3rd on top you left quartal. Keep perfect 4ths until the written tritone in room 2.',
    goals: ['Same right-hand roll on every grip.', 'Name the lowest note as the floor.', 'Pedal D on the last line.'],
    steps: [
      'Grip A: D0 G0 B1 = D G C.',
      'Grip B: D2 G2 B3 = E A D.',
      'Grip C: D3 G3 B4 = F Bb Eb.',
      'Room 2: D5 G5 B6, D7 G7 B8, then D open under G5 B6.'
    ],
    notes: []
      .concat(line(0, 'D G C', [[2,0,0.5,'D'],[3,0,0.5,'U'],[4,1,1,'D'],[4,1,0.5,'U'],[3,0,0.5,'D'],[2,0,1,'U']]))
      .concat(line(1, 'E A D', [[2,2,0.5,'D'],[3,2,0.5,'U'],[4,3,1,'D'],[4,3,0.5,'U'],[3,2,0.5,'D'],[2,2,1,'U']]))
      .concat(line(2, 'F Bb Eb', [[2,3,0.5,'D'],[3,3,0.5,'U'],[4,4,1,'D'],[4,4,0.5,'U'],[3,3,0.5,'D'],[2,3,1,'U']]))
      .concat(line(3, 'Room 5', [[2,5,0.5,'D'],[3,5,0.5,'U'],[4,6,1,'D'],[2,7,0.5,'D'],[3,7,0.5,'U'],[4,8,1,'D']]))
      .concat(line(4, 'Pedal D', [[2,0,1,'D'],[3,5,0.5,'U'],[4,6,0.5,'D'],[2,0,1,'D'],[3,7,0.5,'U'],[4,8,0.5,'D']]))
      .concat(chordHits(5, 'Floor D', [[2,0],[3,0],[4,1]], 2))
  },
  {
    id: 'master-harm-gallop',
    title: 'E harmonic minor \u2014 gallop then answer',
    level: 'master',
    style: 'rhythm',
    genre: 'metal',
    folder: 'rhythm',
    track: 'study',
    key: 'Em',
    scaleMode: 'harmonic-minor',
    scaleRoot: 'E',
    bpm: 108,
    chords: ['Em', 'B7'],
    summary: 'E harmonic minor is E F# G A B C D#. Gallop E0 / G3 / F#2 / B7 as long-short-short. Then a lead answer using D# (G8 or e11) into E.',
    watchFor: 'D# is the leading tone. G natural is the minor 3rd. Do not flatten D# to D or you are in natural minor.',
    goals: ['Gallop stays long-short-short.', 'Answer line contains D# resolving to E.', 'Four gallop bars, two answer bars, gallop home.'],
    steps: [
      'Gallop cell: E0 (quarter) E0 (8th) E0 (8th), then G3 same rhythm, then F#2, then B7.',
      'Repeat the four cells.',
      'Answer: G8 (D#) G9 (E) B8 (G) B7 (F#) e7 (B) e8 (C) e11 (D#) e12 (E).',
      'Last two bars: gallop E0 only, end open E.'
    ],
    notes: []
      .concat(line(0, 'Gallop E', [[0,0,0.5,'D',['PM']],[0,0,0.25,'D',['PM']],[0,0,0.25,'D',['PM']],[0,3,0.5,'D',['PM']],[0,3,0.25,'D',['PM']],[0,3,0.25,'D',['PM']],[0,2,0.5,'D',['PM']],[0,2,0.25,'D',['PM']],[0,2,0.25,'D',['PM']],[0,7,0.5,'D'],[0,7,0.25,'D',['PM']],[0,7,0.25,'D',['PM']]]))
      .concat(line(1, 'Gallop again', [[0,0,0.5,'D',['PM']],[0,0,0.25,'D',['PM']],[0,0,0.25,'D',['PM']],[0,3,0.5,'D',['PM']],[0,3,0.25,'D',['PM']],[0,3,0.25,'D',['PM']],[0,2,0.5,'D',['PM']],[0,2,0.25,'D',['PM']],[0,2,0.25,'D',['PM']],[0,7,0.5,'D'],[0,7,0.25,'D',['PM']],[0,7,0.25,'D',['PM']]]))
      .concat(line(2, 'Answer D#', [[3,8,0.5,'D'],[3,9,0.5,'U'],[4,8,0.5,'D'],[4,7,0.5,'U'],[5,7,0.5,'D'],[5,8,0.5,'U'],[5,11,0.5,'D'],[5,12,0.5,'U']]))
      .concat(line(3, 'Answer down', [[5,12,0.5,'D'],[5,11,0.5,'U',['P']],[5,8,0.5,'D'],[5,7,0.5,'U'],[4,8,0.5,'D'],[3,9,0.5,'U'],[3,8,0.5,'D'],[0,0,0.5,'U']]))
      .concat(line(4, 'Gallop home', [[0,0,0.5,'D',['PM']],[0,0,0.25,'D',['PM']],[0,0,0.25,'D',['PM']],[0,0,0.5,'D',['PM']],[0,0,0.25,'D',['PM']],[0,0,0.25,'D',['PM']],[0,0,2,'D']]))
  }
];
