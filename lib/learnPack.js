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
    focus: (o.goals || []).slice(0, 3).join(' · '),
    advice: o.steps ? o.steps.slice(0, 4) : []
  };
  return o;
}

// Helper to build longer scale runs by repeating patterns
function scaleRun(stringsFrets, beats, group, label) {
  return stringsFrets.map(function (sf, i) {
    return n(sf[0], sf[1], beats || 0.5, i % 2 === 0 ? 'D' : 'U', null, group, 'line', i === 0 ? label : null);
  });
}

export const LEARN_PACK = [
  // ===== BEGINNER (entry) — Hal Leonard Book 1 style =====
  L({
    id: 'learn-open-strings',
    title: '1. Open strings — hear the guitar (Hal Leonard Book 1 start)',
    level: 'entry', style: 'acoustic', key: 'E', bpm: 50,
    summary: 'Pluck one string at a time and name it. This is how every method book begins. You cannot learn the neck until the open strings are clear.',
    goals: ['Name low E, A, D, G, B, high E out loud.', 'One string only — mute the others.', 'Hear thick vs thin.'],
    steps: ['Pluck low E and say “low E”.', 'A, D, G, B, high E the same way.', 'Go back down.', 'If two strings ring, rest a finger on the extra one.'],
    notes: [n(0,0,2,'D',null,0,'line','Low E'), n(1,0,2,'D',null,1,'line','A'), n(2,0,2,'D',null,2,'line','D'), n(3,0,2,'D',null,3,'line','G'), n(4,0,2,'D',null,4,'line','B'), n(5,0,2,'D',null,5,'line','High E')]
  }),
  L({
    id: 'learn-twinkle',
    title: '2. Twinkle Twinkle — first real melody (beginner song)',
    level: 'entry', style: 'acoustic', key: 'C', bpm: 60,
    summary: 'Classic beginner melody. Play it slowly on the high E and B strings. This is the kind of song every method book uses first.',
    goals: ['Play the whole melody without stopping.', 'Count the beats.', 'Hear the shape of the song.'],
    steps: ['High E: 0-0-7-7-9-9-7.', 'B: 5-5-4-4-2-2-0.', 'Repeat the first phrase.', 'End clean on the open high E.'],
    notes: [
      n(5,0,1,'D',null,0,'line','Twinkle'), n(5,0,1,'D',null,0,'line'), n(5,7,1,'D',null,0,'line'), n(5,7,1,'D',null,0,'line'),
      n(5,9,1,'D',null,0,'line'), n(5,9,1,'D',null,0,'line'), n(5,7,2,'D',null,0,'line'),
      n(4,5,1,'D',null,1,'line'), n(4,5,1,'D',null,1,'line'), n(4,4,1,'D',null,1,'line'), n(4,4,1,'D',null,1,'line'),
      n(4,2,1,'D',null,1,'line'), n(4,2,1,'D',null,1,'line'), n(5,0,2,'D',null,1,'line')
    ]
  }),
  L({
    id: 'learn-em-g-c',
    title: '3. Em G C — the first three chords that start songs',
    level: 'entry', style: 'acoustic', key: 'G', bpm: 60, chords: ['Em','G','C'],
    summary: 'Em is two fingers. G is three. C is three in a different place. Hold each for four beats. This is the open-chord foundation from Hal Leonard Book 1.',
    goals: ['Plant Em 022000 clean.', 'Plant G 320003 without muting B.', 'Plant C x32010 and move between all three.'],
    steps: ['Em: middle A2, ring D2. Strum six.', 'G: ring low E3, middle A2, pinky high E3.', 'C: ring A3, middle D2, index B1.', 'Em-G-C, four beats each, slow.'],
    notes: []
      .concat(chord(0, 'Em', [0,2,2,0,0,0], 4))
      .concat(chord(1, 'G', [3,2,0,0,0,3], 4))
      .concat(chord(2, 'C', [null,3,2,0,1,0], 4))
  }),
  L({
    id: 'learn-first-strum',
    title: '4. Downstrum on the beat — first real groove',
    level: 'entry', style: 'rhythm', key: 'G', bpm: 72, chords: ['G','Em'],
    summary: 'Right hand down only, once per click. Left hand changes on beat 1. This is how method books introduce rhythm.',
    goals: ['One downstrum per beat.', 'Change on the 1, not after it.', 'Keep the right hand moving even if the left is late.'],
    steps: ['Metronome 72. G for four downs.', 'Em for four downs.', 'Back to G.', 'Count 1 2 3 4 out loud.'],
    notes: []
      .concat(chord(0, 'G', [3,2,0,0,0,3], 1))
      .concat([n(0,3,1,'D',null,0,'line'), n(0,3,1,'D',null,0,'line'), n(0,3,1,'D',null,0,'line')])
      .concat(chord(1, 'Em', [0,2,2,0,0,0], 1))
      .concat([n(0,0,1,'D',null,1,'line'), n(0,0,1,'D',null,1,'line'), n(0,0,1,'D',null,1,'line')])
  }),
  L({
    id: 'learn-tetris',
    title: '5. Tetris theme — simple beginner melody across strings',
    level: 'entry', style: 'lead', key: 'C', bpm: 80,
    summary: 'The Korobeiniki theme simplified. Beginner-level song that moves across a few frets. Play it clean before you speed it up.',
    goals: ['Hit every note in time.', 'Alternate pick.', 'Finish the phrase cleanly.'],
    steps: ['Start on high E fret 7.', 'Move down the B and G strings.', 'Repeat the main motif.', 'End on the root.'],
    notes: [
      n(5,7,0.5,'D',null,0,'line','Tetris'), n(5,5,0.5,'U',null,0,'line'), n(5,7,0.5,'D',null,0,'line'), n(5,5,0.5,'U',null,0,'line'),
      n(4,5,0.5,'D',null,0,'line'), n(4,7,0.5,'U',null,0,'line'), n(4,5,0.5,'D',null,0,'line'), n(4,3,0.5,'U',null,0,'line'),
      n(3,5,0.5,'D',null,1,'line'), n(3,7,0.5,'U',null,1,'line'), n(3,5,0.5,'D',null,1,'line'), n(3,4,0.5,'U',null,1,'line'),
      n(4,3,1,'D',null,1,'line'), n(5,5,1,'D',null,1,'line')
    ]
  }),

  // ===== INTERMEDIATE — Hal Leonard Book 2/3 + Guitar Aerobics style =====
  L({
    id: 'learn-power-shape',
    title: '6. Power chords — one shape, three places (rock foundation)',
    level: 'entry', style: 'rhythm', key: 'E', bpm: 80,
    summary: 'Index and ring, two frets apart. Open E + A2 is E5. Same grip on the A string is A5. Same grip on D is D5. This is the core of rock rhythm.',
    goals: ['E5, A5, D5 from one grip.', 'Mute unused strings.', 'Move the shape without rebuilding it.'],
    steps: ['Low E open + A string fret 2.', 'Slide the same fingers to A string + D fret 2.', 'Slide to D string + G fret 2.', 'Play them in order, two beats each.'],
    notes: [
      n(0,0,1,'D',null,0,'line','E5'), n(1,2,1,'D',null,0,'line'),
      n(1,0,1,'D',null,1,'line','A5'), n(2,2,1,'D',null,1,'line'),
      n(2,0,1,'D',null,2,'line','D5'), n(3,2,1,'D',null,2,'line')
    ]
  }),
  L({
    id: 'learn-seven-nation',
    title: '7. Seven Nation Army style riff (intermediate rock)',
    level: 'intermediate', style: 'rhythm', key: 'E', bpm: 100,
    summary: 'Simple but driving riff in the style of Seven Nation Army. Power-chord based, strong rhythm, intermediate level.',
    goals: ['Lock the rhythm.', 'Keep the palm mute tight.', 'Feel the groove.'],
    steps: ['Low E open, then fret 7, 5, 3, 2, 0.', 'Palm mute the whole riff.', 'Repeat four times.', 'Add a slight accent on the first note.'],
    notes: [
      n(0,0,0.5,'D',['PM'],0,'line','7NA'), n(0,7,0.5,'U',['PM'],0,'line'),
      n(0,5,0.5,'D',['PM'],0,'line'), n(0,3,0.5,'U',['PM'],0,'line'),
      n(0,2,0.5,'D',['PM'],0,'line'), n(0,0,1,'U',['PM'],0,'line')
    ]
  }),
  L({
    id: 'learn-pent-box',
    title: '8. A minor pentatonic — full box up and down (first solo shape)',
    level: 'entry', style: 'lead', key: 'Am', bpm: 70,
    summary: 'Five notes, one position. Climb and descend the full box multiple times. This is the shape behind almost every rock solo.',
    goals: ['Two notes on every string.', 'Alternate pick down-up.', 'End on the A root so it feels finished.'],
    steps: ['Low E: 5 then 8.', 'A: 5 then 7. D: 5 then 7. G: 5 then 7.', 'B: 5 then 8. High E: 5 then 8.', 'Come back down the same frets. Repeat.'],
    notes: scaleRun([
      [0,5],[0,8],[1,5],[1,7],[2,5],[2,7],[3,5],[3,7],[4,5],[4,8],[5,5],[5,8],
      [5,8],[5,5],[4,8],[4,5],[3,7],[3,5],[2,7],[2,5],[1,7],[1,5],[0,8],[0,5]
    ], 0.5, 0, 'Am pent up-down')
  }),
  L({
    id: 'learn-strum-16',
    title: '9. Continuous 8th-note strum over G-C-D (real song feel)',
    level: 'entry', style: 'rhythm', key: 'G', bpm: 88, chords: ['G','C','D'],
    summary: 'Down-up-down-up continuous. Change chords on beat 1 without stopping the right hand. This is how songs actually feel.',
    goals: ['Right hand never stops.', 'Chord change lands on the 1.', 'Muted chucks stay short.'],
    steps: ['Count 1 & 2 & 3 & 4 &.', 'Down on the numbers, up on the &.', 'G for one bar, C for one, D for one.', 'Keep the wrist loose. Loop it.'],
    notes: []
      .concat(chord(0, 'G', [3,2,0,0,0,3], 0.5))
      .concat([n(0,3,0.5,'U',null,0,'line'), n(0,3,0.5,'D',null,0,'line'), n(0,3,0.5,'U',null,0,'line')])
      .concat(chord(1, 'C', [null,3,2,0,1,0], 0.5))
      .concat([n(1,3,0.5,'U',null,1,'line'), n(1,3,0.5,'D',null,1,'line'), n(1,3,0.5,'U',null,1,'line')])
      .concat(chord(2, 'D', [null,null,0,2,3,2], 0.5))
      .concat([n(2,0,0.5,'U',null,2,'line'), n(2,0,0.5,'D',null,2,'line'), n(2,0,1,'U',null,2,'line')])
  }),
  L({
    id: 'learn-hammer-pull',
    title: '10. Hammer-ons and pull-offs — legato technique',
    level: 'intermediate', style: 'lead', key: 'Am', bpm: 76,
    summary: 'Pick only the first note on each string. Hammer the next, pull back. If the hammer is quieter than the pick, slow down and hit the board harder.',
    goals: ['One pick per string.', 'Hammer as loud as the pick.', 'Pull-off sideways, not straight up.'],
    steps: ['Low E: pick 5, hammer 8, pull to 5.', 'Same idea on A, D, and G.', 'Record it. If the hammer is ghostly, do not speed up.', 'Extend into a short phrase.'],
    notes: [
      n(0,5,0.5,'D',null,0,'line'), n(0,8,0.5,'D',['H'],0,'line'), n(0,5,0.5,'D',['P'],0,'line'),
      n(1,5,0.5,'D',null,1,'line'), n(1,7,0.5,'D',['H'],1,'line'), n(1,5,0.5,'D',['P'],1,'line'),
      n(2,5,0.5,'D',null,2,'line'), n(2,7,0.5,'D',['H'],2,'line'), n(2,5,0.5,'D',['P'],2,'line'),
      n(3,5,0.5,'D',null,3,'line'), n(3,7,0.5,'D',['H'],3,'line'), n(3,5,1,'D',['P'],3,'line')
    ]
  }),
  L({
    id: 'learn-slide',
    title: '11. Slides — connecting notes cleanly',
    level: 'intermediate', style: 'lead', key: 'A', bpm: 72,
    summary: 'Slide from one fret to another on the same string. Keep pressure. This is how you connect ideas across the neck.',
    goals: ['Slide in time.', 'No extra noise.', 'Land on the target note.'],
    steps: ['Pick G string 5, slide to 7.', 'Slide back to 5.', 'Try it on other strings.', 'Combine with a short pentatonic phrase.'],
    notes: [
      n(3,5,0.5,'D',null,0,'line','Slide'), n(3,7,1,'D',['S'],0,'line'),
      n(3,7,0.5,'D',null,1,'line'), n(3,5,1,'D',['S'],1,'line'),
      n(2,5,0.5,'D',null,2,'line'), n(2,7,1,'D',['S'],2,'line')
    ]
  }),
  L({
    id: 'learn-key-walk',
    title: '12. Walk the chords of G major (key awareness)',
    level: 'intermediate', style: 'rhythm', key: 'G', bpm: 80, chords: ['G','Am','Bm','C','D','Em'],
    summary: 'Play the diatonic chords of G major in order. Hear how they fit together. This is the foundation of understanding keys.',
    goals: ['Know the chords of G.', 'Change cleanly.', 'Hear the resolution back to G.'],
    steps: ['G major: G-Am-Bm-C-D-Em-G.', 'Strum each for two beats.', 'Say the chord name out loud.', 'Loop it slowly.'],
    notes: []
      .concat(chord(0, 'G', [3,2,0,0,0,3], 2))
      .concat(chord(1, 'Am', [null,0,2,2,1,0], 2))
      .concat(chord(2, 'Bm', [null,2,4,4,3,2], 2))
      .concat(chord(3, 'C', [null,3,2,0,1,0], 2))
      .concat(chord(4, 'D', [null,null,0,2,3,2], 2))
      .concat(chord(5, 'Em', [0,2,2,0,0,0], 2))
  }),
  L({
    id: 'learn-palm-mute',
    title: '13. Palm muting and triplets (rock rhythm)',
    level: 'intermediate', style: 'rhythm', key: 'E', bpm: 90,
    summary: 'Rest the side of your palm on the strings near the bridge for a tight, chunky sound. Add triplets for drive.',
    goals: ['Mute stays consistent.', 'Triplets are even.', 'Groove does not rush.'],
    steps: ['E5 power chord, palm muted.', 'Play eighth-note triplets.', 'Keep the mute tight.', 'Change to A5 and back.'],
    notes: [
      n(0,0,0.33,'D',['PM'],0,'line','PM triplets'), n(1,2,0.33,'U',['PM'],0,'line'), n(0,0,0.33,'D',['PM'],0,'line'),
      n(0,0,0.33,'U',['PM'],0,'line'), n(1,2,0.33,'D',['PM'],0,'line'), n(0,0,0.33,'U',['PM'],0,'line')
    ]
  }),

  // ===== ADVANCED / EXPERT =====
  L({
    id: 'learn-g-major-full',
    title: '14. Full G major scale across the neck (position shifts)',
    level: 'advanced', style: 'lead', key: 'G', bpm: 76,
    summary: 'Play the full G major scale ascending and descending through multiple positions. This is what intermediate-to-advanced books teach for fretboard knowledge.',
    goals: ['Name the notes.', 'Shift positions smoothly.', 'Alternate pick evenly.'],
    steps: ['Start at low E fret 3 (G).', 'Climb through the scale.', 'Shift up the neck.', 'Descend back down.'],
    notes: scaleRun([
      [0,3],[0,5],[1,2],[1,3],[1,5],[2,2],[2,4],[2,5],[3,2],[3,4],[3,5],
      [4,3],[4,5],[5,3],[5,5],[5,7],
      [5,7],[5,5],[5,3],[4,5],[4,3],[3,5],[3,4],[3,2],[2,5],[2,4],[2,2],[1,5],[1,3],[1,2],[0,5],[0,3]
    ], 0.5, 0, 'G major full')
  }),
  L({
    id: 'learn-modes',
    title: '15. Modes — Dorian and Mixolydian over a static chord',
    level: 'advanced', style: 'lead', key: 'A', bpm: 80,
    summary: 'Play A Dorian and A Mixolydian. Hear the difference. Advanced books introduce modes after major and minor scales are solid.',
    goals: ['Hear the color of each mode.', 'Stay in position.', 'Land on chord tones.'],
    steps: ['A Dorian: 5-7-5-7-5-7-5-7-5-8-5-8.', 'A Mixolydian: 5-7-5-7-5-7-5-7-5-7-5-7.', 'Compare the sound.', 'Improvise a short phrase in each.'],
    notes: scaleRun([
      [0,5],[0,7],[1,5],[1,7],[2,5],[2,7],[3,5],[3,7],[4,5],[4,8],[5,5],[5,8]
    ], 0.5, 0, 'A Dorian')
  }),
  L({
    id: 'learn-sweep-yngwie',
    title: '16. 3-string sweep arpeggios (Yngwie style — expert)',
    level: 'advanced', style: 'lead', key: 'E', bpm: 90,
    summary: 'Sweep picking through minor triad inversions the way Yngwie does. Expert-level technique. Start very slow.',
    goals: ['Sweep motion is smooth.', 'Muting is clean.', 'Notes are even.'],
    steps: ['E minor triad on high three strings.', 'Sweep down, pull-off, sweep up.', 'Move the shape.', 'Connect two inversions.'],
    notes: [
      n(3,12,0.25,'D',null,0,'line','Sweep Em'), n(4,12,0.25,'D',null,0,'line'), n(5,12,0.25,'D',null,0,'line'),
      n(5,15,0.25,'U',['P'],0,'line'), n(4,15,0.25,'U',null,0,'line'), n(3,14,0.5,'U',null,0,'line')
    ]
  }),
  L({
    id: 'learn-nothing-else',
    title: '17. Nothing Else Matters style arpeggio pattern (advanced)',
    level: 'advanced', style: 'acoustic', key: 'Em', bpm: 70,
    summary: 'Fingerstyle arpeggio pattern in the spirit of Nothing Else Matters. Advanced acoustic technique.',
    goals: ['Thumb and fingers stay independent.', 'Pattern is steady.', 'Dynamics are controlled.'],
    steps: ['Thumb on bass, fingers on higher strings.', 'Em arpeggio.', 'Move to C and G.', 'Keep the pattern continuous.'],
    notes: [
      n(0,0,0.5,'D',null,0,'line','NEM style'), n(3,0,0.5,'U',null,0,'line'),
      n(4,0,0.5,'D',null,0,'line'), n(5,0,0.5,'U',null,0,'line'),
      n(4,0,0.5,'D',null,0,'line'), n(3,0,0.5,'U',null,0,'line')
    ]
  }),
  L({
    id: 'learn-tapping',
    title: '18. Single-hand and two-hand tapping (expert technique)',
    level: 'advanced', style: 'lead', key: 'A', bpm: 80,
    summary: 'Tap with the pick hand, pull off to the fretting hand. Expert-level. Yngwie and many shredders use this.',
    goals: ['Tap is clean.', 'Pull-off has volume.', 'Timing is even.'],
    steps: ['Tap high E fret 12, pull to 5.', 'Same on B string.', 'Try two-hand: fretting hand hammers while tapping.', 'Keep it slow.'],
    notes: [
      n(5,12,0.5,'D',['TAP'],0,'line','Tap'), n(5,5,0.5,'D',['P'],0,'line'),
      n(4,12,0.5,'D',['TAP'],1,'line'), n(4,5,0.5,'D',['P'],1,'line')
    ]
  }),
  L({
    id: 'learn-tremolo',
    title: '19. Tremolo picking (fast alternate picking)',
    level: 'advanced', style: 'lead', key: 'E', bpm: 100,
    summary: 'Rapid alternate picking on one note. This is the foundation for fast runs and is used in metal and classical guitar.',
    goals: ['Picking is even.', 'Wrist stays loose.', 'Note stays clean.'],
    steps: ['One note, 16th notes.', 'Start slow.', 'Increase speed only when even.', 'Move the note up the string.'],
    notes: [
      n(0,0,0.25,'D',null,0,'line','Tremolo'), n(0,0,0.25,'U',null,0,'line'),
      n(0,0,0.25,'D',null,0,'line'), n(0,0,0.25,'U',null,0,'line'),
      n(0,0,0.25,'D',null,0,'line'), n(0,0,0.25,'U',null,0,'line'),
      n(0,0,0.25,'D',null,0,'line'), n(0,0,0.25,'U',null,0,'line')
    ]
  }),
  L({
    id: 'learn-key-bridge',
    title: '20. Bridge from one key to another (modulation practice)',
    level: 'advanced', style: 'lead', key: 'G', bpm: 76,
    summary: 'Play a phrase in G major, then transition into D major. Advanced books teach how to connect keys smoothly.',
    goals: ['Hear the key change.', 'Use a common tone or pivot.', 'Land cleanly in the new key.'],
    steps: ['Phrase in G major.', 'Use the D note as a bridge.', 'Continue in D major.', 'Resolve.'],
    notes: scaleRun([
      [0,3],[0,5],[1,2],[1,3],[2,2],[2,4],
      [2,5],[3,2],[3,4],[4,3],[4,5]
    ], 0.5, 0, 'G to D')
  }),
  // ===== ADDITIONAL SCALE + PICKING LESSONS =====
  L({
    id: 'learn-c-major-scale',
    title: '21. C major scale — open position (beginner scale)',
    level: 'entry', style: 'lead', key: 'C', bpm: 60,
    summary: 'Classic open-position C major scale. Every method book teaches this early. Play it ascending and descending.',
    goals: ['Name every note.', 'Alternate pick.', 'End on C.'],
    steps: ['A string 3 (C), 5, D 2, 4, 5, G 2, 4, 5, B 3, 5.', 'Come back down.', 'Say the note names.', 'Loop it slowly.'],
    notes: scaleRun([
      [1,3],[1,5],[2,2],[2,4],[2,5],[3,2],[3,4],[3,5],[4,3],[4,5],
      [4,5],[4,3],[3,5],[3,4],[3,2],[2,5],[2,4],[2,2],[1,5],[1,3]
    ], 0.5, 0, 'C major open')
  }),
  L({
    id: 'learn-e-minor-pent',
    title: '22. E minor pentatonic — full box (classic rock solo shape)',
    level: 'intermediate', style: 'lead', key: 'Em', bpm: 72,
    summary: 'The most common rock solo shape. Climb and descend multiple times. Intermediate players live in this box.',
    goals: ['Two notes per string.', 'Even alternate picking.', 'Feel the root.'],
    steps: ['Low E 0-3, A 0-2, D 0-2, G 0-2, B 0-3, high E 0-3.', 'Descend.', 'Repeat four times.', 'End on low E.'],
    notes: scaleRun([
      [0,0],[0,3],[1,0],[1,2],[2,0],[2,2],[3,0],[3,2],[4,0],[4,3],[5,0],[5,3],
      [5,3],[5,0],[4,3],[4,0],[3,2],[3,0],[2,2],[2,0],[1,2],[1,0],[0,3],[0,0]
    ], 0.5, 0, 'Em pent')
  }),
  L({
    id: 'learn-alternate-pick',
    title: '23. Alternate picking drill — down-up consistency',
    level: 'intermediate', style: 'lead', key: 'A', bpm: 80,
    summary: 'Strict alternate picking on a single string and across strings. This is the foundation of clean lead playing.',
    goals: ['Down on the beat, up on the off-beat.', 'No extra noise.', 'Stay relaxed.'],
    steps: ['One string: 5-7-5-7 repeated.', 'Cross to next string without pausing.', 'Metronome at 80.', 'Increase only when perfect.'],
    notes: scaleRun([
      [0,5],[0,7],[0,5],[0,7],[1,5],[1,7],[1,5],[1,7],
      [2,5],[2,7],[2,5],[2,7],[3,5],[3,7],[3,5],[3,7]
    ], 0.25, 0, 'Alt pick drill')
  }),
  L({
    id: 'learn-string-skip',
    title: '24. String skipping — picking accuracy',
    level: 'intermediate', style: 'lead', key: 'Am', bpm: 70,
    summary: 'Skip strings cleanly. Intermediate technique that builds picking control.',
    goals: ['Mute the skipped string.', 'Even timing.', 'No extra noise.'],
    steps: ['Low E 5, skip A, D 5.', 'Repeat the pattern.', 'Move up the box.', 'Keep the pick path tight.'],
    notes: [
      n(0,5,0.5,'D',null,0,'line','Skip'), n(2,5,0.5,'U',null,0,'line'),
      n(0,8,0.5,'D',null,0,'line'), n(2,7,0.5,'U',null,0,'line'),
      n(1,5,0.5,'D',null,1,'line'), n(3,5,0.5,'U',null,1,'line'),
      n(1,7,0.5,'D',null,1,'line'), n(3,7,0.5,'U',null,1,'line')
    ]
  }),
  L({
    id: 'learn-economy-pick',
    title: '25. Economy picking — efficient motion',
    level: 'advanced', style: 'lead', key: 'G', bpm: 84,
    summary: 'Sweep through a string change when the direction continues. Advanced picking technique used by many shredders.',
    goals: ['Minimize pick motion.', 'Stay even.', 'Feel the economy.'],
    steps: ['Three notes on one string, then continue the direction to the next.', 'Practice the motion slowly.', 'Apply to a short scale fragment.'],
    notes: scaleRun([
      [0,3],[0,5],[1,2],[1,3],[1,5],[2,2],[2,4]
    ], 0.5, 0, 'Economy')
  }),
  L({
    id: 'learn-chromatic-drill',
    title: '26. Chromatic finger independence (technique builder)',
    level: 'intermediate', style: 'lead', key: 'any', bpm: 60,
    summary: '1-2-3-4 on each string. Classic exercise from every method book for finger strength and independence.',
    goals: ['Even volume.', 'No extra movement.', 'All four fingers work.'],
    steps: ['Low E: frets 1-2-3-4.', 'Same on every string.', 'Descend 4-3-2-1.', 'Loop slowly.'],
    notes: scaleRun([
      [0,1],[0,2],[0,3],[0,4],[1,1],[1,2],[1,3],[1,4],
      [2,1],[2,2],[2,3],[2,4],[3,1],[3,2],[3,3],[3,4],
      [4,1],[4,2],[4,3],[4,4],[5,1],[5,2],[5,3],[5,4]
    ], 0.5, 0, 'Chromatic')
  }),
  L({
    id: 'learn-a-major-scale',
    title: '27. A major scale — movable position',
    level: 'intermediate', style: 'lead', key: 'A', bpm: 72,
    summary: 'Movable A major scale shape. Once you own this, you can move it to any key.',
    goals: ['Memorize the shape.', 'Name the intervals.', 'Play it in another key.'],
    steps: ['Start on low E fret 5.', 'Climb the shape.', 'Descend.', 'Slide the whole shape up two frets for B major.'],
    notes: scaleRun([
      [0,5],[0,7],[1,4],[1,5],[1,7],[2,4],[2,6],[2,7],[3,4],[3,6],[3,7],[4,5],[4,7],[5,5],[5,7]
    ], 0.5, 0, 'A major')
  }),
  L({
    id: 'learn-double-stop',
    title: '28. Double stops — two notes at once',
    level: 'intermediate', style: 'lead', key: 'A', bpm: 70,
    summary: 'Play two notes together. Used in blues, country, and rock. Intermediate technique.',
    goals: ['Both notes ring.', 'Timing is together.', 'Mute the rest.'],
    steps: ['G and B strings, frets 5 and 5.', 'Move the pair.', 'Add a short phrase.', 'Hear the harmony.'],
    notes: [
      n(3,5,1,'D',null,0,'line','Double'), n(4,5,1,'D',null,0,'line'),
      n(3,7,1,'D',null,1,'line'), n(4,7,1,'D',null,1,'line'),
      n(2,5,1,'D',null,2,'line'), n(3,5,1,'D',null,2,'line')
    ]
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
