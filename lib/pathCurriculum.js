function n(string, fret, beats, pick, tech, group, role, label, finger) {
  var o = { string: string, fret: fret, beats: beats == null ? 0.5 : beats, pick: pick || 'D', group: group, role: role || 'line' };
  if (tech && tech.length) o.tech = tech;
  if (label) o.groupLabel = label;
  if (finger) o.finger = finger;
  return o;
}
function chord(group, label, dots, beats) {
  return dots.map(function (d, i) {
    return n(d[0], d[1], i === 0 ? (beats || 2) : 0, 'D', d[2], group, 'chord', i === 0 ? label : null, d[3]);
  });
}
function lesson(o) {
  o.track = o.track || 'path';
  o.sheet = o.sheet || {
    focus: (o.goals || []).slice(0, 4).join(', '),
    advice: [
      'Slow until every note is clean.',
      'Use the metronome before you add speed.',
      'Record one pass. Fix the first mistake.',
      'Then play it as music, not as a drill.'
    ]
  };
  return o;
}

export const PATH_CURRICULUM = [
  lesson({
    id: 'path-em-g-c-d',
    title: 'First four chords: Em G C D',
    level: 'entry', style: 'acoustic', genre: 'folk', key: 'G', bpm: 72,
    folder: 'chords', chords: ['Em', 'G', 'C', 'D'],
    summary: 'Hold each full shape two bars. Walk two notes into the next chord so the change is music, not a stop.',
    watchFor: 'Do not pick the chord one string at a time. Plant every finger, then strum.',
    goals: ['Plant full Em, G, C, D.', 'Walk two scale notes into the next chord.', 'Keep the right hand moving through the change.'],
    steps: [
      'Em 022000. Ring it two bars.',
      'Walk B open to B1 (B to C) and plant C x32010.',
      'Hammer G0 to G2 and plant G 320003.',
      'Slide D0 to D2 and plant D xx0232. Back to Em.'
    ],
    notes: []
      .concat(chord(0, 'Em', [[0,0],[1,2,null,2],[2,2,null,3],[3,0],[4,0],[5,0]], 2))
      .concat([n(4,0,0.5,'D',null,1,'line','Walk to C'), n(4,1,0.5,'D',['H'],1,'line')])
      .concat(chord(2, 'C', [[1,3,null,3],[2,2,null,2],[3,0],[4,1,null,1],[5,0]], 2))
      .concat([n(3,0,0.5,'D',null,3,'line','Walk to G'), n(3,2,0.5,'D',['H'],3,'line')])
      .concat(chord(4, 'G', [[0,3,null,3],[1,2,null,2],[2,0],[3,0],[4,0],[5,3,null,4]], 2))
      .concat([n(2,0,0.5,'D',null,5,'line','Walk to D'), n(2,2,0.5,'D',['S'],5,'line')])
      .concat(chord(6, 'D', [[2,0],[3,2,null,1],[4,3,null,3],[5,2,null,2]], 2))
  }),
  lesson({
    id: 'path-down-up-g',
    title: 'Down up chuck: the first groove',
    level: 'entry', style: 'rhythm', genre: 'folk', key: 'G', bpm: 88,
    folder: 'rhythm', chords: ['G', 'C', 'D', 'Em'],
    summary: 'Down on the beat, muted chuck on the and, up on the next and. Same right hand on G C D Em.',
    watchFor: 'The chuck is short. Do not turn it into another full strum.',
    goals: ['Downstrokes stay on 1 and 3.', 'Chuck is palm muted.', 'Fill three pentatonic notes into Em.'],
    steps: ['G: down, chuck, up.', 'Same pattern on C and D.', 'Into Em play B3, open B, B3 then plant Em.'],
    notes: []
      .concat(chord(0, 'G', [[0,3,null,3],[1,2,null,2],[2,0],[3,0],[4,0],[5,3,null,4]], 1))
      .concat([n(1,2,0.5,'D',['PM'],1,'line','Chuck'), n(4,0,0.5,'U',null,1,'line')])
      .concat(chord(2, 'C', [[1,3,null,3],[2,2,null,2],[3,0],[4,1,null,1],[5,0]], 1))
      .concat([n(1,3,0.5,'D',['PM'],3,'line'), n(4,1,0.5,'U',null,3,'line')])
      .concat(chord(4, 'D', [[2,0],[3,2,null,1],[4,3,null,3],[5,2,null,2]], 1))
      .concat([n(4,3,0.5,'D',null,5,'line','Fill'), n(4,0,0.5,'D',['P'],5,'line'), n(4,3,0.5,'U',null,5,'line')])
      .concat(chord(6, 'Em', [[0,0],[1,2,null,2],[2,2,null,3],[3,0],[4,0],[5,0]], 2))
  }),
  lesson({
    id: 'path-g-major-1oct',
    title: 'G major one octave — first scale',
    level: 'entry', style: 'lead', genre: 'any', key: 'G', bpm: 70,
    folder: 'lead',
    summary: 'G A B C D E F# G from low E3 up to G3 on the D string. Alternate pick. Then walk back down.',
    watchFor: 'One note per click. Missed strings mean the tempo is too fast.',
    goals: ['Name G A B C D E F# G out loud.', 'Alternate pick D U D U.', 'Come down the same path.'],
    steps: ['Low E3 G, E5 A.', 'A2 B, A3 C, A5 D.', 'D2 E, D4 F#, D5 G. Reverse.'],
    notes: [
      n(0,3,1,'D',null,0,'line','G major up'), n(0,5,1,'U',null,0,'line'),
      n(1,2,1,'D',null,0,'line'), n(1,3,1,'U',null,0,'line'), n(1,5,1,'D',null,0,'line'),
      n(2,2,1,'U',null,0,'line'), n(2,4,1,'D',null,0,'line'), n(2,5,2,'U',null,0,'line'),
      n(2,5,1,'D',null,1,'line','Back down'), n(2,4,1,'U',null,1,'line'), n(2,2,1,'D',null,1,'line'),
      n(1,5,1,'U',null,1,'line'), n(1,3,1,'D',null,1,'line'), n(1,2,1,'U',null,1,'line'),
      n(0,5,1,'D',null,1,'line'), n(0,3,2,'U',null,1,'line')
    ]
  }),
  lesson({
    id: 'path-am-pent-box1',
    title: 'A minor pentatonic box 1',
    level: 'entry', style: 'lead', genre: 'rock', key: 'Am', bpm: 80,
    folder: 'solo',
    summary: 'The first box every rock player owns. Two notes per string, 5th fret. Climb, descend, then a three-note lick.',
    watchFor: 'Index stays in fret 5. Pinky takes fret 8. Do not collapse the wrist.',
    goals: ['Two notes on every string.', 'Alternate pick.', 'End on A (low E5) so the box has a home.'],
    steps: ['E5-8, A5-7, D5-7, G5-7, B5-8, e5-8.', 'Descend the same frets.', 'Lick: e8-5, B8, G7, D7, A5.'],
    notes: [
      n(0,5,0.5,'D',null,0,'line','Box 1 up'), n(0,8,0.5,'U',null,0,'line'),
      n(1,5,0.5,'D',null,0,'line'), n(1,7,0.5,'U',null,0,'line'),
      n(2,5,0.5,'D',null,0,'line'), n(2,7,0.5,'U',null,0,'line'),
      n(3,5,0.5,'D',null,0,'line'), n(3,7,0.5,'U',null,0,'line'),
      n(4,5,0.5,'D',null,0,'line'), n(4,8,0.5,'U',null,0,'line'),
      n(5,5,0.5,'D',null,0,'line'), n(5,8,1,'U',null,0,'line'),
      n(5,8,0.5,'D',null,1,'line','Box 1 down'), n(5,5,0.5,'U',null,1,'line'),
      n(4,8,0.5,'D',null,1,'line'), n(4,5,0.5,'U',null,1,'line'),
      n(3,7,0.5,'D',null,1,'line'), n(3,5,0.5,'U',null,1,'line'),
      n(2,7,0.5,'D',null,1,'line'), n(2,5,0.5,'U',null,1,'line'),
      n(1,7,0.5,'D',null,1,'line'), n(1,5,0.5,'U',null,1,'line'),
      n(0,8,0.5,'D',null,1,'line'), n(0,5,1,'U',null,1,'line'),
      n(5,8,0.5,'D',null,2,'line','First lick'), n(5,5,0.5,'U',['P'],2,'line'),
      n(4,8,0.5,'D',null,2,'line'), n(3,7,0.5,'U',null,2,'line'),
      n(2,7,0.5,'D',null,2,'line'), n(1,5,1,'U',null,2,'line')
    ]
  }),
  lesson({
    id: 'path-spider-1234',
    title: 'Spider 1-2-3-4 across the neck',
    level: 'entry', style: 'lead', genre: 'any', key: 'C', bpm: 66,
    folder: 'fingering',
    summary: 'Index middle ring pinky on frets 5-6-7-8, one finger per fret, every string. This is finger independence, not a song.',
    watchFor: 'Fingers stay hovering. Do not collapse unused fingers into the board.',
    goals: ['One finger owns one fret.', 'Even time.', 'No extra string noise.'],
    steps: ['Start on high e: 5 6 7 8.', 'Same frets on B G D A E.', 'Then reverse 8 7 6 5 back up.'],
    notes: [
      n(5,5,0.5,'D',null,0,'line','Spider down'), n(5,6,0.5,'U',null,0,'line'), n(5,7,0.5,'D',null,0,'line'), n(5,8,0.5,'U',null,0,'line'),
      n(4,5,0.5,'D',null,0,'line'), n(4,6,0.5,'U',null,0,'line'), n(4,7,0.5,'D',null,0,'line'), n(4,8,0.5,'U',null,0,'line'),
      n(3,5,0.5,'D',null,0,'line'), n(3,6,0.5,'U',null,0,'line'), n(3,7,0.5,'D',null,0,'line'), n(3,8,0.5,'U',null,0,'line'),
      n(2,5,0.5,'D',null,0,'line'), n(2,6,0.5,'U',null,0,'line'), n(2,7,0.5,'D',null,0,'line'), n(2,8,0.5,'U',null,0,'line'),
      n(1,5,0.5,'D',null,0,'line'), n(1,6,0.5,'U',null,0,'line'), n(1,7,0.5,'D',null,0,'line'), n(1,8,0.5,'U',null,0,'line'),
      n(0,5,0.5,'D',null,0,'line'), n(0,6,0.5,'U',null,0,'line'), n(0,7,0.5,'D',null,0,'line'), n(0,8,1,'U',null,0,'line')
    ]
  }),
  lesson({
    id: 'path-power-e5',
    title: 'Power chords E5 A5 D5',
    level: 'entry', style: 'rhythm', genre: 'rock', key: 'E', bpm: 96,
    folder: 'rhythm', chords: ['E5', 'A5', 'D5'],
    summary: 'Root and fifth only. Palm mute the eighths, open up on beat 3. This is the door into rock and metal.',
    watchFor: 'Mute the unused strings. Two notes, not a sloppy six-string smash.',
    goals: ['E5 at open + A2. A5 at A0 + D2. D5 at D0 + G2.', 'Palm mute moving notes.', 'Let beat 3 ring.'],
    steps: ['Index + ring: low E open and A2 is E5.', 'Slide the same grip to A string = A5.', 'Same grip on D string = D5.', 'Mute eighths, ring the 3.'],
    notes: [
      n(0,0,0.5,'D',['PM'],0,'line','E5 mute'), n(1,2,0,'D',['PM'],0,'chord','E5'),
      n(0,0,0.5,'D',['PM'],0,'line'), n(1,2,0,'D',['PM'],0,'chord'),
      n(0,0,1,'D',null,0,'line'), n(1,2,0,null,null,0,'chord'),
      n(1,0,0.5,'D',['PM'],1,'line','A5 mute'), n(2,2,0,'D',['PM'],1,'chord','A5'),
      n(1,0,0.5,'D',['PM'],1,'line'), n(2,2,0,'D',['PM'],1,'chord'),
      n(1,0,1,'D',null,1,'line'), n(2,2,0,null,null,1,'chord'),
      n(2,0,0.5,'D',['PM'],2,'line','D5 mute'), n(3,2,0,'D',['PM'],2,'chord','D5'),
      n(2,0,0.5,'D',['PM'],2,'line'), n(3,2,0,'D',['PM'],2,'chord'),
      n(2,0,1,'D',null,2,'line'), n(3,2,0,null,null,2,'chord')
    ]
  }),
  lesson({
    id: 'path-first-bend',
    title: 'First whole-step bend',
    level: 'entry', style: 'lead', genre: 'blues', key: 'A', bpm: 70,
    folder: 'lead',
    summary: 'Bend G-string 7 up to the pitch of G9. Check against a fretted 9. Then release and add a little shake.',
    watchFor: 'Push with ring finger, support with middle. Listen. If it is flat, push more, do not pick harder.',
    goals: ['Match fret 9 in pitch.', 'Release without a clunk.', 'Add vibrato only after the bend is in tune.'],
    steps: ['Play G9 as the target.', 'Bend G7 to that pitch.', 'Release to 7.', 'Shake 7 a little (~).'],
    notes: [
      n(3,9,2,'D',null,0,'line','Target pitch'),
      n(3,7,2,'D',['B'],1,'line','Bend 7 to 9'),
      n(3,7,1,'D',null,2,'line','Release'),
      n(3,7,2,'D',['~'],3,'line','Vibrato')
    ]
  }),

  lesson({
    id: 'path-blues-shuffle',
    title: '12-feel shuffle in E',
    level: 'intermediate', style: 'rhythm', genre: 'blues', key: 'E', bpm: 92,
    folder: 'rhythm', chords: ['E7', 'A7', 'B7'],
    summary: 'E7 shuffle on the A and D strings, move it to A7, then B7. Long-short swing. This is the 12-bar engine.',
    watchFor: 'The second note of each pair is shorter. If both notes are even you are not swinging.',
    goals: ['E7: A2 to A4 hammer.', 'Same grip two frets up is F# — do not go there. A7 lives on D2-4.', 'Turnaround walks E D C# B.'],
    steps: ['A-string 2, hammer 4. Repeat.', 'D-string 2 hammer 4 for A7.', 'E-string 2 hammer 4 for B7.', 'Walk bass E2 A0 A2 A4 into the I.'],
    notes: [
      n(1,2,0.75,'D',null,0,'line','E7 shuffle'), n(1,4,0.25,'D',['H'],0,'line'),
      n(1,2,0.75,'D',null,0,'line'), n(1,4,0.25,'D',['H'],0,'line'),
      n(2,2,0.75,'D',null,1,'line','A7 shuffle'), n(2,4,0.25,'D',['H'],1,'line'),
      n(2,2,0.75,'D',null,1,'line'), n(2,4,0.25,'D',['H'],1,'line'),
      n(0,2,0.75,'D',null,2,'line','B7 shuffle'), n(0,4,0.25,'D',['H'],2,'line'),
      n(0,2,0.75,'D',null,2,'line'), n(0,4,0.25,'D',['H'],2,'line'),
      n(0,0,0.5,'D',null,3,'line','Turnaround'), n(1,0,0.5,'D',null,3,'line'), n(1,2,0.5,'D',null,3,'line'), n(1,4,0.5,'D',null,3,'line')
    ]
  }),
  lesson({
    id: 'path-pent-box12',
    title: 'Connect pentatonic boxes 1 and 2',
    level: 'intermediate', style: 'lead', genre: 'rock', key: 'Am', bpm: 88,
    folder: 'solo',
    summary: 'Box 1 at fret 5, slide into box 2 at fret 7-8, play a line that uses both, slide home.',
    watchFor: 'The slide is one motion. Do not pick the fret you slide into.',
    goals: ['Leave box 1 on G7.', 'Slide G7 to G9.', 'Play box 2 on B8-10 and e8-10.', 'Slide back to box 1 A.'],
    notes: [
      n(0,5,0.5,'D',null,0,'line','Box 1'), n(0,8,0.5,'U',null,0,'line'),
      n(1,5,0.5,'D',null,0,'line'), n(1,7,0.5,'U',null,0,'line'),
      n(2,5,0.5,'D',null,0,'line'), n(2,7,0.5,'U',null,0,'line'),
      n(3,5,0.5,'D',null,0,'line'), n(3,7,0.5,'U',['S'],1,'line','Slide to box 2'), n(3,9,0.5,'D',null,1,'line'),
      n(4,8,0.5,'U',null,1,'line'), n(4,10,0.5,'D',null,1,'line'),
      n(5,8,0.5,'U',null,1,'line'), n(5,10,1,'D',['~'],1,'line'),
      n(5,8,0.5,'U',null,2,'line','Home'), n(4,10,0.5,'D',null,2,'line'),
      n(3,9,0.5,'U',['S'],2,'line'), n(3,7,0.5,'D',null,2,'line'),
      n(2,7,0.5,'U',null,2,'line'), n(1,5,1,'D',null,2,'line')
    ]
  }),
  lesson({
    id: 'path-legato-box',
    title: 'Hammer and pull inside the box',
    level: 'intermediate', style: 'lead', genre: 'rock', key: 'Am', bpm: 84,
    folder: 'legato',
    summary: 'Same Am box, but most notes are hammer-ons and pull-offs. Pick only the first note of each string.',
    watchFor: 'The hammer must be as loud as the pick. If it is ghostly, drop the tempo and hit the board harder with the finger.',
    goals: ['Pick once per string.', 'Hammer 5 to 8 / 5 to 7.', 'Pull back to 5 evenly.'],
    notes: [
      n(0,5,0.5,'D',['H'],0,'line','Low E legato'), n(0,8,0.5,'D',['P'],0,'line'), n(0,5,0.5,'D',null,0,'line'),
      n(1,5,0.5,'D',['H'],1,'line','A string'), n(1,7,0.5,'D',['P'],1,'line'), n(1,5,0.5,'D',null,1,'line'),
      n(2,5,0.5,'D',['H'],2,'line','D string'), n(2,7,0.5,'D',['P'],2,'line'), n(2,5,0.5,'D',null,2,'line'),
      n(3,5,0.5,'D',['H'],3,'line','G string'), n(3,7,0.5,'D',['P'],3,'line'), n(3,5,0.5,'D',null,3,'line'),
      n(4,5,0.5,'D',['H'],4,'line','B string'), n(4,8,0.5,'D',['P'],4,'line'), n(4,5,0.5,'D',null,4,'line'),
      n(5,5,0.5,'D',['H'],5,'line','High E'), n(5,8,0.5,'D',['P'],5,'line'), n(5,5,1,'D',['~'],5,'line')
    ]
  }),
  lesson({
    id: 'path-barre-f-g',
    title: 'Move the F barre to G',
    level: 'intermediate', style: 'rhythm', genre: 'rock', key: 'F', bpm: 76,
    folder: 'barre', chords: ['F', 'G', 'C', 'Bb'],
    summary: 'Full E-shape barre at fret 1 is F. Same grip at fret 3 is G. Low E names the chord.',
    watchFor: 'Index stays barre. Slide the whole grip. Do not rebuild the chord in the air.',
    goals: ['Clean F at fret 1.', 'Slide to G at fret 3 without noise.', 'Same grip at fret 8 is C, fret 6 is Bb.'],
    notes: []
      .concat(chord(0, 'F barre', [[0,1,null,1],[1,3,null,3],[2,3,null,4],[3,2,null,2],[4,1,null,1],[5,1,null,1]], 2))
      .concat([n(0,1,0.5,'D',['S'],1,'line','Slide grip'), n(0,3,0.5,'D',null,1,'line')])
      .concat(chord(2, 'G barre', [[0,3,null,1],[1,5,null,3],[2,5,null,4],[3,4,null,2],[4,3,null,1],[5,3,null,1]], 2))
      .concat(chord(3, 'C barre', [[0,8,null,1],[1,10,null,3],[2,10,null,4],[3,9,null,2],[4,8,null,1],[5,8,null,1]], 2))
      .concat(chord(4, 'Bb barre', [[0,6,null,1],[1,8,null,3],[2,8,null,4],[3,7,null,2],[4,6,null,1],[5,6,null,1]], 2))
  }),
  lesson({
    id: 'path-finger-pima',
    title: 'Thumb plus i-m-a on G',
    level: 'intermediate', style: 'acoustic', genre: 'folk', key: 'G', bpm: 80,
    folder: 'rh', chords: ['G', 'C', 'D', 'Em'],
    summary: 'Thumb plays the bass of the chord. Index middle ring play G B e. Pattern p-i-m-a on every change.',
    watchFor: 'Thumb stays on the bass string of that chord. Do not let it wander to the high strings.',
    goals: ['G bass is low E3. C bass is A3. D bass is D open. Em bass is low E open.', 'i-m-a stay even.', 'Change chords without stopping the pattern.'],
    notes: [
      n(0,3,0.5,'D',null,0,'line','G pima'), n(3,0,0.5,'U',null,0,'line'), n(4,0,0.5,'D',null,0,'line'), n(5,3,0.5,'U',null,0,'line'),
      n(1,3,0.5,'D',null,1,'line','C pima'), n(3,0,0.5,'U',null,1,'line'), n(4,1,0.5,'D',null,1,'line'), n(5,0,0.5,'U',null,1,'line'),
      n(2,0,0.5,'D',null,2,'line','D pima'), n(3,2,0.5,'U',null,2,'line'), n(4,3,0.5,'D',null,2,'line'), n(5,2,0.5,'U',null,2,'line'),
      n(0,0,0.5,'D',null,3,'line','Em pima'), n(3,0,0.5,'U',null,3,'line'), n(4,0,0.5,'D',null,3,'line'), n(5,0,1,'U',null,3,'line')
    ]
  }),
  lesson({
    id: 'path-caged-g',
    title: 'CAGED G — five shapes, one chord',
    level: 'intermediate', style: 'lead', genre: 'any', key: 'G', bpm: 72,
    folder: 'theory', chords: ['G'],
    summary: 'G as an E-shape at 3, D-shape around 5, C-shape around 7, A-shape at 10, G-shape at 12. Same chord, five addresses.',
    watchFor: 'The root G is the landmark. Find G first, then hang the shape on it.',
    goals: ['Name the shape before you play it.', 'Hit the G root in each grip.', 'Connect two shapes with a scale walk.'],
    notes: []
      .concat(chord(0, 'G as E-shape', [[0,3,null,1],[1,5,null,3],[2,5,null,4],[3,4,null,2],[4,3,null,1],[5,3,null,1]], 2))
      .concat([n(0,3,0.5,'D',null,1,'line','Walk'), n(0,5,0.5,'U',null,1,'line'), n(1,5,0.5,'D',null,1,'line')])
      .concat(chord(2, 'G as D-shape', [[2,5],[3,7,null,2],[4,8,null,3],[5,7,null,1]], 2))
      .concat(chord(3, 'G as A-shape', [[1,10,null,1],[2,12,null,3],[3,12,null,4],[4,12,null,2],[5,10,null,1]], 2))
  }),
  lesson({
    id: 'path-harmonics-5712',
    title: 'Natural harmonics 5, 7, 12',
    level: 'intermediate', style: 'lead', genre: 'any', key: 'E', bpm: 60,
    folder: 'harmonics',
    summary: 'Touch the string directly over the fretwire at 12, 7, and 5. Do not press down. Chime, then lift.',
    watchFor: 'If you hear a dull thud you pressed. Hover. Right hand picks near the bridge for a clearer chime.',
    goals: ['12th fret octave chime on every string.', '7th fret fifth.', '5th fret double octave.'],
    notes: [
      n(0,12,1,'D',null,0,'line','12th chimes'), n(1,12,1,'D',null,0,'line'), n(2,12,1,'D',null,0,'line'),
      n(3,12,1,'D',null,0,'line'), n(4,12,1,'D',null,0,'line'), n(5,12,2,'D',null,0,'line'),
      n(0,7,1,'D',null,1,'line','7th chimes'), n(1,7,1,'D',null,1,'line'), n(2,7,1,'D',null,1,'line'), n(3,7,2,'D',null,1,'line'),
      n(0,5,1,'D',null,2,'line','5th chimes'), n(1,5,1,'D',null,2,'line'), n(2,5,2,'D',null,2,'line')
    ]
  }),

  lesson({
    id: 'path-3nps-g',
    title: 'G major three notes per string',
    level: 'advanced', style: 'lead', genre: 'any', key: 'G', bpm: 100,
    folder: 'theory',
    summary: 'Three notes on every string through two octaves. This is the modern shred position system.',
    watchFor: 'The position shift happens after the third note. Do not drag the previous finger.',
    goals: ['Three notes, every string.', 'Even alternate picking.', 'Shift on time.'],
    notes: [
      n(0,3,0.5,'D',null,0,'line','3NPS G'), n(0,5,0.5,'U',null,0,'line'), n(0,7,0.5,'D',null,0,'line'),
      n(1,3,0.5,'U',null,0,'line'), n(1,5,0.5,'D',null,0,'line'), n(1,7,0.5,'U',null,0,'line'),
      n(2,4,0.5,'D',null,0,'line'), n(2,5,0.5,'U',null,0,'line'), n(2,7,0.5,'D',null,0,'line'),
      n(3,4,0.5,'U',null,0,'line'), n(3,5,0.5,'D',null,0,'line'), n(3,7,0.5,'U',null,0,'line'),
      n(4,5,0.5,'D',null,0,'line'), n(4,7,0.5,'U',null,0,'line'), n(4,8,0.5,'D',null,0,'line'),
      n(5,5,0.5,'U',null,0,'line'), n(5,7,0.5,'D',null,0,'line'), n(5,8,1,'U',null,0,'line')
    ]
  }),
  lesson({
    id: 'path-dorian-d',
    title: 'D Dorian over Dm',
    level: 'advanced', style: 'lead', genre: 'jazz', key: 'Dm', bpm: 88,
    folder: 'theory', chords: ['Dm7', 'G7', 'Cmaj7'],
    summary: 'D E F G A B C D. The B natural is what makes it Dorian, not D minor. Land B on G7, C on Cmaj7.',
    watchFor: 'If you play Bb you left Dorian and entered Aeolian. Hear the B against Dm.',
    goals: ['Play D Dorian two octaves.', 'Target F on Dm7, B on G7, E on Cmaj7.', 'Resolve, do not wander.'],
    notes: [
      n(0,5,0.5,'D',null,0,'line','D Dorian'), n(0,7,0.5,'U',null,0,'line'), n(0,8,0.5,'D',null,0,'line'),
      n(1,5,0.5,'U',null,0,'line'), n(1,7,0.5,'D',null,0,'line'), n(1,9,0.5,'U',null,0,'line'),
      n(2,5,0.5,'D',null,0,'line'), n(2,7,0.5,'U',null,0,'line'), n(2,9,1,'D',null,0,'line'),
      n(2,7,0.5,'U',null,1,'line','Into G7'), n(2,9,0.5,'D',null,1,'line'), n(3,7,1,'U',null,1,'line'),
      n(3,9,0.5,'D',null,2,'line','Resolve C'), n(4,8,0.5,'U',null,2,'line'), n(5,7,2,'D',['~'],2,'line')
    ]
  }),
  lesson({
    id: 'path-251-c',
    title: 'ii-V-I line in C',
    level: 'advanced', style: 'lead', genre: 'jazz', key: 'C', bpm: 72,
    folder: 'bridging', chords: ['Dm7', 'G7', 'Cmaj7'],
    summary: 'Land chord tones on beat 1 of each bar. F or A on Dm7, B or F on G7, E or G on Cmaj7.',
    watchFor: 'The note on beat one must belong to that chord. Scale filler lives on the ands.',
    goals: ['Dm7 color on beat 1.', 'Enclose B on G7.', 'Resolve to E, the 3rd of C.'],
    notes: [
      n(2,3,0.5,'D',null,0,'line','Dm7'), n(2,2,0.5,'U',null,0,'line'), n(2,0,0.5,'D',null,0,'line'), n(3,2,0.5,'U',null,0,'line'),
      n(3,4,0.5,'D',['S'],1,'line','G7'), n(3,2,0.5,'U',null,1,'line'), n(3,5,0.5,'D',null,1,'line'), n(3,4,1,'U',null,1,'line'),
      n(5,3,0.5,'D',null,2,'line','Cmaj7'), n(5,0,1.5,'D',['P'],2,'line')
    ]
  }),
  lesson({
    id: 'path-sweep-am',
    title: 'A minor triad sweep',
    level: 'advanced', style: 'lead', genre: 'metal', key: 'Am', bpm: 96,
    folder: 'arpeggio',
    summary: 'One pick direction across A C E A C. Rest-stroke each string. This is not alternate picking.',
    watchFor: 'Mute the string you just left. A sweep with five strings ringing is a chord, not an arpeggio.',
    goals: ['Ascending rake.', 'Descending rake.', 'Plant A as the start and end.'],
    notes: [
      n(1,0,0.5,'D',null,0,'line','Sweep up'), n(2,2,0.5,'D',null,0,'line'), n(3,2,0.5,'D',null,0,'line'), n(4,1,0.5,'D',null,0,'line'), n(5,0,1,'D',null,0,'line'),
      n(5,0,0.5,'U',null,1,'line','Sweep down'), n(4,1,0.5,'U',null,1,'line'), n(3,2,0.5,'U',null,1,'line'), n(2,2,0.5,'U',null,1,'line'), n(1,0,1,'U',null,1,'line')
    ]
  }),
  lesson({
    id: 'path-hybrid-g',
    title: 'Hybrid pick: pick plus middle',
    level: 'advanced', style: 'country', genre: 'country', key: 'G', bpm: 108,
    folder: 'rh', chords: ['G', 'C', 'D'],
    summary: 'Pick plays the bass. Middle finger snaps a high string. Chicken pick on G C D.',
    watchFor: 'The snap is louder than the bass. That is the point.',
    goals: ['Bass on beat.', 'High snap on the and.', 'Keep it going through G C D.'],
    notes: [
      n(0,3,0.5,'D',null,0,'line','G hybrid'), n(4,0,0.5,'U',null,0,'line'), n(0,3,0.5,'D',null,0,'line'), n(5,3,0.5,'U',null,0,'line'),
      n(1,3,0.5,'D',null,1,'line','C hybrid'), n(4,1,0.5,'U',null,1,'line'), n(1,3,0.5,'D',null,1,'line'), n(5,0,0.5,'U',null,1,'line'),
      n(2,0,0.5,'D',null,2,'line','D hybrid'), n(4,3,0.5,'U',null,2,'line'), n(2,0,0.5,'D',null,2,'line'), n(5,2,1,'U',null,2,'line')
    ]
  }),
  lesson({
    id: 'path-odd-7',
    title: 'Riff in 7/8',
    level: 'advanced', style: 'rhythm', genre: 'metal', key: 'E', bpm: 120,
    folder: 'rhythm',
    summary: 'Count 1-2-3-4-5-6-7. Palm-muted E power, accent 1 and 5. The missing eighth is the whole point.',
    watchFor: 'Do not add an extra beat to make it 4/4. Sit in the 7.',
    goals: ['Count out loud.', 'Mute six, ring one.', 'Loop four bars without drifting to 8.'],
    notes: [
      n(0,0,0.5,'D',['PM'],0,'line','7/8 riff'), n(1,2,0,'D',['PM'],0,'chord'),
      n(0,0,0.5,'D',['PM'],0,'line'), n(1,2,0,null,['PM'],0,'chord'),
      n(0,0,0.5,'D',['PM'],0,'line'), n(1,2,0,null,['PM'],0,'chord'),
      n(0,0,0.5,'D',['PM'],0,'line'), n(1,2,0,null,['PM'],0,'chord'),
      n(0,0,0.5,'D',null,0,'line'), n(1,2,0,null,null,0,'chord'),
      n(0,3,0.5,'D',['PM'],0,'line'), n(0,2,0.5,'D',['PM'],0,'line')
    ]
  }),

  lesson({
    id: 'path-alt-dom',
    title: 'Altered dominant into tonic',
    level: 'master', style: 'lead', genre: 'jazz', key: 'C', bpm: 80,
    folder: 'theory', chords: ['G7alt', 'Cmaj7'],
    summary: 'G altered: Ab Bb B Db Eb F over G7, then land E or G on Cmaj7. Tension that pays rent on the I.',
    watchFor: 'Do not sit on the altered notes after the chord has changed. Resolve on beat 1 of C.',
    goals: ['Play b9 #9 b5 #5 on G7.', 'Resolve to a C chord tone.', 'Leave space after the resolve.'],
    notes: [
      n(3,4,0.5,'D',null,0,'line','G7alt'), n(3,3,0.5,'U',null,0,'line'), n(3,6,0.5,'D',null,0,'line'), n(3,5,0.5,'U',null,0,'line'),
      n(4,4,0.5,'D',null,0,'line'), n(4,6,0.5,'U',null,0,'line'), n(5,4,0.5,'D',null,0,'line'), n(5,6,0.5,'U',null,0,'line'),
      n(5,3,2,'D',['~'],1,'line','Cmaj7 E')
    ]
  }),
  lesson({
    id: 'path-outside-am',
    title: 'Outside then inside over Am',
    level: 'master', style: 'lead', genre: 'jazz', key: 'Am', bpm: 100,
    folder: 'solo',
    summary: 'Two bars inside A minor pentatonic, two bars a half-step up (Bb minor pent), slam back to A. Out, then home.',
    watchFor: 'The outside bar has to be confident. Tentative outside just sounds wrong.',
    goals: ['Inside box at 5.', 'Shift the whole box up one fret.', 'Land on A when you return.'],
    notes: [
      n(0,5,0.5,'D',null,0,'line','Inside Am'), n(0,8,0.5,'U',null,0,'line'), n(1,5,0.5,'D',null,0,'line'), n(1,7,0.5,'U',null,0,'line'),
      n(2,5,0.5,'D',null,0,'line'), n(2,7,0.5,'U',null,0,'line'), n(3,5,0.5,'D',null,0,'line'), n(3,7,0.5,'U',null,0,'line'),
      n(0,6,0.5,'D',null,1,'line','Outside Bbm'), n(0,9,0.5,'U',null,1,'line'), n(1,6,0.5,'D',null,1,'line'), n(1,8,0.5,'U',null,1,'line'),
      n(2,6,0.5,'D',null,1,'line'), n(2,8,0.5,'U',null,1,'line'), n(3,6,0.5,'D',null,1,'line'), n(3,8,0.5,'U',null,1,'line'),
      n(0,5,2,'D',['~'],2,'line','Home A')
    ]
  }),
  lesson({
    id: 'path-neo-seq',
    title: 'Neo-classical four-note sequence',
    level: 'master', style: 'lead', genre: 'metal', key: 'Am', bpm: 112,
    folder: 'lead',
    summary: 'Descending fours in A harmonic minor. 1-2-3-1 shape moving down the scale. Even 16ths.',
    watchFor: 'The grouping is four. If you accent every three you flipped the meter.',
    goals: ['A harmonic minor: G# is the raised 7th.', 'Four-note cells.', 'Land on A.'],
    notes: [
      n(5,8,0.25,'D',null,0,'line','Fours'), n(5,7,0.25,'U',null,0,'line'), n(5,5,0.25,'D',null,0,'line'), n(4,8,0.25,'U',null,0,'line'),
      n(5,7,0.25,'D',null,0,'line'), n(5,5,0.25,'U',null,0,'line'), n(4,8,0.25,'D',null,0,'line'), n(4,6,0.25,'U',null,0,'line'),
      n(5,5,0.25,'D',null,0,'line'), n(4,8,0.25,'U',null,0,'line'), n(4,6,0.25,'D',null,0,'line'), n(4,5,0.25,'U',null,0,'line'),
      n(4,8,0.25,'D',null,0,'line'), n(4,6,0.25,'U',null,0,'line'), n(4,5,0.25,'D',null,0,'line'), n(3,7,0.25,'U',null,0,'line'),
      n(3,5,1,'D',['~'],1,'line','A')
    ]
  }),
  lesson({
    id: 'path-drop2-voice',
    title: 'Drop-2 voice leading G-C-D',
    level: 'master', style: 'rhythm', genre: 'jazz', key: 'G', bpm: 76,
    folder: 'bridging', chords: ['Gmaj7', 'Cmaj7', 'D7'],
    summary: 'Close four-note grips that move as little as possible. Common tones stay. Moving voices walk a step.',
    watchFor: 'Do not jump to a new neck position if a closer inversion exists.',
    goals: ['Keep one common tone.', 'Move other voices by step.', 'Name the top note of each grip.'],
    notes: []
      .concat(chord(0, 'Gmaj7 drop2', [[2,4],[3,4],[4,3],[5,2]], 2))
      .concat(chord(1, 'Cmaj7 drop2', [[2,5],[3,4],[4,5],[5,3]], 2))
      .concat(chord(2, 'D7 drop2', [[2,4],[3,5],[4,3],[5,2]], 2))
      .concat(chord(3, 'Gmaj7 home', [[2,4],[3,4],[4,3],[5,2]], 2))
  }),
  lesson({
    id: 'path-thump',
    title: 'Thump and pop groove',
    level: 'master', style: 'rhythm', genre: 'funk', key: 'E', bpm: 104,
    folder: 'rhythm',
    summary: 'Thumb slaps the low E. Index pops the G or B. Sixteenth mute in between. Funk rhythm at master level.',
    watchFor: 'The slap is a bounce, not a nail into the string. Pop with the side of the index.',
    goals: ['Slap on 1 and 3.', 'Pop on the ands.', 'Mute everything else.'],
    notes: [
      n(0,0,0.5,'D',['PM'],0,'line','Slap E'), n(3,0,0.5,'U',null,0,'line'),
      n(0,0,0.5,'D',['PM'],0,'line'), n(4,0,0.5,'U',null,0,'line'),
      n(0,3,0.5,'D',['PM'],1,'line','Slap G'), n(3,0,0.5,'U',null,1,'line'),
      n(0,0,0.5,'D',['PM'],1,'line'), n(4,0,1,'U',null,1,'line')
    ]
  })
];
