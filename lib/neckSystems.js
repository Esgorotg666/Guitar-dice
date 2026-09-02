// Neck Systems pack — incremental Classroom add-on.
// string: 0 = low E … 5 = high e

function n(string, fret, beats, pick, tech) {
  var note = { string: string, fret: fret, beats: beats || 0.5 };
  if (pick) note.pick = pick;
  if (tech && tech.length) note.tech = tech;
  return note;
}

export const NECK_SYSTEM_LESSONS = [
  {
    id: 'neck-1-caged',
    title: 'CAGED Map — E-shape C Arpeggio',
    level: 'advanced', style: 'lead', genre: 'any', key: 'C major', bpm: 72,
    summary: 'The E-shape is one of the five CAGED addresses for the same C chord. Learn this arpeggio at the 8th fret so you can find C, E, and G without hunting.',
    notes: [
      n(0, 8, 0.5, 'D'), n(1, 10, 0.5, 'U'), n(2, 10, 0.5, 'D'),
      n(3, 9, 0.5, 'U'), n(4, 8, 0.5, 'D'), n(5, 8, 1, 'U'),
      n(5, 8, 0.5, 'D'), n(4, 8, 0.5, 'U'), n(3, 9, 0.5, 'D'),
      n(2, 10, 0.5, 'U'), n(1, 10, 0.5, 'D'), n(0, 8, 1, 'U')
    ],
    steps: ['Low E 8 is C — the root.', 'Tones up: C, G, C, E, G, C.', 'First finger on fret 8, third on the 10s, middle on G 9.', 'Stay in one position.', 'Roots: both E-string 8s and D 10.', 'A-shape C is A-string 3 — same chord, other address.'],
    watchFor: 'An open A string under this shape is a different chord.',
    goals: ['Name every note in the E-shape C arpeggio.', 'Keep the hand at fret 8.', 'Move this grip to play any major chord on the low E string.'],
    practicePlan: ['2 min — freeze the shape.', '4 min — 36 BPM saying C-G-C-E-G-C.', '4 min — 54 then 72 BPM.', '2 min — roots, then one full pass.']
  },
  {
    id: 'neck-6-caged-a',
    title: 'CAGED Map — A-shape C Arpeggio',
    level: 'advanced', style: 'lead', genre: 'any', key: 'C major', bpm: 72,
    summary: 'Same C chord, different address. Root sits on the A string at fret 3.',
    notes: [
      n(1, 3, 0.5, 'D'), n(2, 5, 0.5, 'U'), n(3, 5, 0.5, 'D'),
      n(4, 5, 0.5, 'U'), n(5, 3, 1, 'D'),
      n(5, 3, 0.5, 'U'), n(4, 5, 0.5, 'D'), n(3, 5, 0.5, 'U'),
      n(2, 5, 0.5, 'D'), n(1, 3, 1, 'U'),
      n(1, 3, 1, 'D'), n(3, 5, 1, 'U')
    ],
    steps: ['Mute the low E. Root is A-string 3.', 'Tones: C, G, C, E, G. Last two notes are both C roots.', 'Barre fret 3 on A and high E. Fret 5 on D, G, B.', 'Move to fret 5 and it is D major.', 'Shared C with E-shape: G 5 here, D 10 there.', 'Do not let the low E ring.'],
    watchFor: 'Floppy barre at fret 3, or a ringing low E.',
    goals: ['Point to C on the A string.', 'Play the arpeggio in one position.', 'Shift two frets and name the new chord.'],
    practicePlan: ['2 min — plant the shape, mute low E.', '4 min — 36 BPM.', '4 min — 54 then 72.', '2 min — slide to D, back to C.']
  },
  {
    id: 'neck-7-caged-g',
    title: 'CAGED Map — G-shape C Arpeggio',
    level: 'advanced', style: 'lead', genre: 'any', key: 'C major', bpm: 70,
    summary: 'The stretchy CAGED shape: 8-7-5-5-5-8. Both E strings hold C.',
    notes: [
      n(0, 8, 0.5, 'D'), n(1, 7, 0.5, 'U'), n(2, 5, 0.5, 'D'),
      n(3, 5, 0.5, 'U'), n(4, 5, 0.5, 'D'), n(5, 8, 1, 'U'),
      n(5, 8, 0.5, 'D'), n(4, 5, 0.5, 'U'), n(3, 5, 0.5, 'D'),
      n(2, 5, 0.5, 'U'), n(1, 7, 0.5, 'D'), n(0, 8, 1, 'U')
    ],
    steps: ['8-7-5-5-5-8. Outside strings are C.', 'No full six-string barre. Finger 1 on the 5s.', 'Tones: C, E, G, C, E, C.', 'Sits between A-shape at 3 and E-shape at 8.', 'If it hurts, play A 7 and the three 5s first.', 'Down two frets is Bb.'],
    watchFor: 'Collapsing the 8-to-5 stretch. This is a reach, not a speed drill.',
    goals: ['Spot G-shape by two C roots on the E strings.', 'Keep fret 5 clean.', 'See it as the bridge between A-shape and E-shape.'],
    practicePlan: ['2 min — inside four notes.', '4 min — add the C roots at 35 BPM.', '4 min — 52 then 70.', '2 min — name every tone and stop.']
  },
  {
    id: 'neck-8-caged-d',
    title: 'CAGED Map — D-shape C Arpeggio',
    level: 'advanced', style: 'lead', genre: 'any', key: 'C major', bpm: 72,
    summary: 'Root on D-string 10. Last new C address before the neck repeats at 12.',
    notes: [
      n(2, 10, 0.5, 'D'), n(3, 12, 0.5, 'U'), n(4, 13, 0.5, 'D'), n(5, 12, 1, 'U'),
      n(5, 12, 0.5, 'D'), n(4, 13, 0.5, 'U'), n(3, 12, 0.5, 'D'), n(2, 10, 1, 'U'),
      n(1, 10, 1, 'D'), n(2, 10, 1, 'U'),
      n(2, 10, 0.5, 'D'), n(5, 8, 1, 'U')
    ],
    steps: ['Core: D 10 C, G 12 G, B 13 C, e 12 E.', 'Open D slid up 10 frets.', 'Last jump is D-string C to high-E 8 — E-shape C.', 'A-string 10 is an optional G.', 'Two frets up is D major.', 'Skip the low E.'],
    watchFor: 'B 13 going sharp from squeezing.',
    goals: ['Know the D-shape root is on the D string.', 'Play C-G-C-E here.', 'Walk into E-shape C at high E 8.'],
    practicePlan: ['2 min — four core notes.', '4 min — 36 BPM.', '4 min — 54 then 72.', '2 min — D-shape then E-shape, no pause.']
  },
  {
    id: 'neck-2-five-box',
    title: 'Five-Box Tour — A Minor Boxes 1-2',
    level: 'advanced', style: 'lead', genre: 'any', key: 'A minor', bpm: 80,
    summary: 'Walk Box 1 into Box 2 so the pentatonic has more than one address.',
    notes: [
      n(0, 5, 0.5, 'D'), n(0, 8, 0.5, 'U'), n(1, 5, 0.5, 'D'), n(1, 7, 0.5, 'U'),
      n(2, 5, 0.5, 'D'), n(2, 7, 0.5, 'U'), n(3, 5, 0.5, 'D'), n(3, 7, 0.5, 'U'),
      n(3, 7, 0.5, 'D', ['S']), n(3, 9, 0.5, 'U'),
      n(4, 8, 0.5, 'D'), n(4, 10, 0.5, 'U'), n(5, 8, 0.5, 'D'), n(5, 10, 1, 'U')
    ],
    steps: ['First eight notes are Box 1.', 'Slide G 7 to 9 — that is the door into Box 2.', 'Box 2 is B 8-10 and high E 8-10.', 'Know which note is A.', 'Play once from the top, once from the slide.', 'Boxes 3-5 are separate lessons. Do those after this is clean.'],
    watchFor: 'Rushing the slide so the two boxes sound like two licks.',
    goals: ['Connect Box 1 and Box 2.', 'Point to A in both positions.', 'Treat the boxes as one scale.'],
    practicePlan: ['2 min — Box 1 only.', '4 min — add the slide at 40 BPM.', '4 min — 60 then 80.', '2 min — start at the slide, end on A.']
  },
  {
    id: 'neck-10-box3',
    title: 'Five-Box Tour — A Minor Box 3',
    level: 'advanced', style: 'lead', genre: 'any', key: 'A minor', bpm: 76,
    summary: 'Box 3 sits around frets 9-12. Same five notes as Box 1, one more address up the neck.',
    notes: [
      n(2, 10, 0.5, 'D'), n(2, 12, 0.5, 'U'),
      n(3, 9, 0.5, 'D'), n(3, 12, 0.5, 'U'),
      n(4, 10, 0.5, 'D'), n(4, 13, 0.5, 'U'),
      n(5, 10, 0.5, 'D'), n(5, 12, 1, 'U'),
      n(5, 12, 0.5, 'D'), n(5, 10, 0.5, 'U'),
      n(4, 13, 0.5, 'D'), n(4, 10, 0.5, 'U'),
      n(3, 12, 0.5, 'D'), n(3, 9, 1, 'U')
    ],
    steps: ['Box 3 in A: D 10-12, G 9-12, B 10-13, high E 10-12.', 'Root A is at D 12 and high E 12 (and A 12 if you add the A string).',
      'The wide stretch is B 10 to B 13. Use 1 and 4. Do not slide that interval.',
      'Coming down is the same notes backwards so the shape prints in both directions.',
      'Box 2 ends at high E 10. Box 3 starts on that same fret. They share a wall, they are not a gap.',
      'When this is clean, play Box 2 into Box 3 with no stop on high E 10.'],
    watchFor: 'B 13 sharp from a squeezed pinky. Place it.',
    goals: ['Own Box 3 as a real position, not a blur above Box 2.', 'Find A at D 12 and high E 12.', 'Join Box 2 to Box 3 on the shared 10th fret.'],
    practicePlan: ['2 min — four strings, no tempo.', '4 min — 38 BPM up and down.', '4 min — 57 then 76.', '2 min — Box 2 into Box 3 once.']
  },
  {
    id: 'neck-11-box4',
    title: 'Five-Box Tour — A Minor Box 4',
    level: 'advanced', style: 'lead', genre: 'any', key: 'A minor', bpm: 72,
    summary: 'Box 4 lives at 12-14. You are on top of the 12th-fret repeat. Same A minor pentatonic, smaller window.',
    notes: [
      n(2, 12, 0.5, 'D'), n(2, 14, 0.5, 'U'),
      n(3, 12, 0.5, 'D'), n(3, 14, 0.5, 'U'),
      n(4, 13, 0.5, 'D'), n(4, 15, 0.5, 'U'),
      n(5, 12, 0.5, 'D'), n(5, 15, 1, 'U'),
      n(5, 15, 0.5, 'D'), n(5, 12, 0.5, 'U'),
      n(4, 15, 0.5, 'D'), n(4, 13, 0.5, 'U'),
      n(3, 14, 0.5, 'D'), n(3, 12, 1, 'U')
    ],
    steps: ['Box 4: D 12-14, G 12-14, B 13-15, high E 12-15.', 'A is at D 12 and high E 12 — same two roots you just learned in Box 3, now as the floor of Box 4.',
      'B 15 and high E 15 are C. Do not treat 15 as a new scale.',
      'This position is tight. Keep the thumb behind the neck. No death-grip.',
      'Box 3 high E 12 is Box 4 high E 12. Walk off Box 3 straight into this.',
      'Two frets up from here starts to feel like Box 5 at the 15th fret. Today we stay here.'],
    watchFor: 'Notes dying above 12 because the hand slid sharp. Look at the fret, then play.',
    goals: ['Play Box 4 without leaving the 12th-fret area.', 'Keep A at the 12th fret as home.', 'Connect Box 3 into Box 4.'],
    practicePlan: ['2 min — find 12 and 14 on D and G only.', '4 min — 36 BPM.', '4 min — 54 then 72.', '2 min — Box 3 last note into Box 4 first note.']
  },
  {
    id: 'neck-12-box5',
    title: 'Five-Box Tour — A Minor Box 5',
    level: 'advanced', style: 'lead', genre: 'any', key: 'A minor', bpm: 76,
    summary: 'Box 5 is the one behind Box 1: frets 2-5. Learn it low so you also own it at 14-17 later.',
    notes: [
      n(0, 3, 0.5, 'D'), n(0, 5, 0.5, 'U'),
      n(1, 3, 0.5, 'D'), n(1, 5, 0.5, 'U'),
      n(2, 2, 0.5, 'D'), n(2, 5, 0.5, 'U'),
      n(3, 2, 0.5, 'D'), n(3, 5, 0.5, 'U'),
      n(4, 3, 0.5, 'D'), n(4, 5, 0.5, 'U'),
      n(5, 3, 0.5, 'D'), n(5, 5, 1, 'U')
    ],
    steps: ['Box 5 in A: E 3-5, A 3-5, D 2-5, G 2-5, B 3-5, high E 3-5.', 'Box 1 starts at fret 5. Box 5 ends at fret 5. They share that wall.',
      'Root A is at low E 5, G 2, and high E 5.',
      'The odd fret is D 2 / G 2 — that is G, the b7. Do not skip it just because 2 looks early.',
      'Play Box 5 into Box 1 by landing on fret 5 and continuing the Box 1 pattern.',
      'Same shape at 15-17 is Box 5 an octave up. Learn it here first.'],
    watchFor: 'Playing this like an open-position C shape and missing D 2 / G 2.',
    goals: ['Own the area below Box 1.', 'Name A at E 5, G 2, and high E 5.', 'Walk Box 5 into Box 1 with no gap.'],
    practicePlan: ['2 min — six strings, no tempo.', '4 min — 38 BPM.', '4 min — 57 then 76.', '2 min — Box 5 into Box 1 once.']
  },
  {
    id: 'neck-3-3nps',
    title: '3NPS Highway — G Major (3 strings)',
    level: 'advanced', style: 'lead', genre: 'any', key: 'G major', bpm: 76,
    summary: 'Three notes on the low three strings. One fingering, twelve keys.',
    notes: [
      n(0, 3, 0.5, 'D'), n(0, 5, 0.5, 'U'), n(0, 7, 0.5, 'D'),
      n(1, 3, 0.5, 'U'), n(1, 5, 0.5, 'D'), n(1, 7, 0.5, 'U'),
      n(2, 4, 0.5, 'D'), n(2, 5, 0.5, 'U'), n(2, 7, 1, 'D'),
      n(2, 7, 0.5, 'U'), n(2, 5, 0.5, 'D'), n(2, 4, 0.5, 'U'),
      n(1, 7, 0.5, 'D'), n(1, 5, 0.5, 'U'), n(1, 3, 0.5, 'D'),
      n(0, 7, 0.5, 'U'), n(0, 5, 0.5, 'D'), n(0, 3, 1, 'U')
    ],
    steps: ['1-2-4 fingering. Pinky on every 7.', 'Alternate pick across string changes.', 'G is low E 3 and D 5.', 'If fret 7 dies, drop the tempo.', 'Two frets up is A major.', 'The six-string version is the next lesson. Earn it here first.'],
    watchFor: 'Pinky collapse, and resetting to a downstroke on every string.',
    goals: ['Even time, three notes per string.', 'Keep 1-2-4.', 'Shift two frets to change key.'],
    practicePlan: ['2 min — one string at a time.', '4 min — 38 BPM.', '4 min — 57 then 76.', '2 min — shift to A once.']
  },
  {
    id: 'neck-9-3nps-full',
    title: '3NPS Highway — G Major (6 strings)',
    level: 'master', style: 'lead', genre: 'any', key: 'G major', bpm: 72,
    summary: 'The full position: three notes on every string. This is the highway, not a box.',
    notes: [
      n(0, 3, 0.5, 'D'), n(0, 5, 0.5, 'U'), n(0, 7, 0.5, 'D'),
      n(1, 3, 0.5, 'U'), n(1, 5, 0.5, 'D'), n(1, 7, 0.5, 'U'),
      n(2, 4, 0.5, 'D'), n(2, 5, 0.5, 'U'), n(2, 7, 0.5, 'D'),
      n(3, 4, 0.5, 'U'), n(3, 5, 0.5, 'D'), n(3, 7, 0.5, 'U'),
      n(4, 5, 0.5, 'D'), n(4, 7, 0.5, 'U'), n(4, 8, 0.5, 'D'),
      n(5, 5, 0.5, 'U'), n(5, 7, 0.5, 'D'), n(5, 8, 1, 'U')
    ],
    steps: ['Low strings stay 3-5-7 / 3-5-7 / 4-5-7. G string is 4-5-7. B and high E switch to 5-7-8.',
      'That B-string shift is the whole lesson. Finger 1 moves from fret 4 up to fret 5. Do not drag it.',
      'Eighteen notes, one position. Count groups of three out loud.',
      'Top note high E 8 is C. Root G is low E 3, D 5, B 8, and high E 3 (not in this climb).',
      'Coming down is homework, not this tab. Learn the climb first so the string changes stay honest.',
      'Shift the whole 18 notes to A (start at fret 5). Same muscles, new key.'],
    watchFor: 'The B-string 5-7-8 turning into 4-5-7 out of habit. Look before that string.',
    goals: ['Play all six strings, three notes each, in one position.', 'Handle the B-string fingering change.', 'Move the full grip two frets.'],
    practicePlan: ['2 min — strings 6-4 only (you already have these).', '4 min — add G-B-e at 36 BPM.', '4 min — 54 then 72.', '2 min — one climb to A major, stop.']
  },
  {
    id: 'neck-4-octaves',
    title: 'Octave Grid — Finding A Everywhere',
    level: 'advanced', style: 'lead', genre: 'any', key: 'A minor', bpm: 70,
    summary: 'Same pitch, different string. Lead version: navigation.',
    notes: [
      n(0, 5, 1, 'D'), n(1, 0, 1, 'D'), n(1, 12, 1, 'D'), n(2, 7, 1, 'D'),
      n(3, 2, 1, 'D'), n(4, 10, 1, 'D'), n(5, 5, 1, 'D'),
      n(5, 5, 0.5, 'D'), n(3, 2, 0.5, 'U'), n(2, 7, 0.5, 'D'), n(0, 5, 1, 'U')
    ],
    steps: ['Every note is A.', 'Rule: two strings over, two frets up. B string is three frets.', 'Navigation, not a lick.', 'Last four notes bounce between pairs.', 'Add the fifth (E) after octaves are automatic.', 'Pick any fret, name it, play its octave.'],
    watchFor: 'Guessing from a box instead of the interval.',
    goals: ['Find A on every string.', 'Use the octave rule plus the B-string exception.', 'Treat the neck as repeating octaves.'],
    practicePlan: ['2 min — point at each A.', '4 min — 35 BPM.', '4 min — 52 then 70.', '2 min — eyes closed, three As.']
  },
  {
    id: 'neck-13-octaves-rhythm',
    title: 'Octave Grid — Rhythm Hits in A',
    level: 'advanced', style: 'rhythm', genre: 'any', key: 'A minor', bpm: 88,
    summary: 'Octaves as a groove, not a map. Low A then its octave, downstrokes, palm mute on the low note.',
    notes: [
      n(0, 5, 0.5, 'D', ['PM']), n(2, 7, 0.5, 'D'),
      n(0, 5, 0.5, 'D', ['PM']), n(2, 7, 0.5, 'D'),
      n(0, 5, 0.5, 'D', ['PM']), n(1, 12, 0.5, 'D'),
      n(0, 5, 0.5, 'D', ['PM']), n(5, 5, 1, 'D'),
      n(0, 5, 0.5, 'D', ['PM']), n(2, 7, 0.5, 'D'),
      n(0, 5, 0.5, 'D', ['PM']), n(2, 7, 1, 'D')
    ],
    steps: ['Every pitch is still A. The low note is E-string 5, muted. The answer is an octave higher.',
      'Pair 1: E 5 then D 7. That is the classic rock octave shape (two strings over, two frets up).',
      'Pair 2: E 5 then A 12 — same pitch as D 7, different string. Prove the grid in time.',
      'Pair 3: E 5 then high E 5. Same letter, two octaves apart.',
      'Downstrokes only. The mute is the groove. If the low A rings like a lead note, it is not this lesson.',
      'Move the whole riff to G (low E 3 + D 5) when A is solid. Same right hand.'],
    watchFor: 'Letting the muted string bloom, or rushing the octave so it lands early.',
    goals: ['Lock octaves to a downstroke groove.', 'Use two different octave pairs in time.', 'Mute the low note on purpose.'],
    practicePlan: ['2 min — E 5 muted only, on the click.', '4 min — add D 7 at 44 BPM.', '4 min — 66 then 88.', '2 min — move the riff to G once.']
  },
  {
    id: 'neck-14-octaves-acoustic',
    title: 'Octave Grid — Acoustic Thumb and Finger',
    level: 'advanced', style: 'acoustic', genre: 'any', key: 'A minor', bpm: 66,
    summary: 'Thumb plays the low A, a finger plays the octave. Let both ring. This is how octaves sit in fingerstyle.',
    notes: [
      n(0, 5, 1, 'D', ['L']), n(5, 5, 1, 'U', ['L']),
      n(1, 0, 1, 'D', ['L']), n(3, 2, 1, 'U', ['L']),
      n(2, 7, 1, 'D', ['L']), n(5, 5, 1, 'U', ['L']),
      n(0, 5, 1, 'D', ['L']), n(3, 2, 1, 'U', ['L']),
      n(1, 0, 1, 'D', ['L']), n(5, 5, 1, 'U', ['L']),
      n(0, 5, 1, 'D', ['L']), n(5, 5, 1, 'U', ['L'])
    ],
    steps: ['Thumb (shown as a downstroke) takes the low string. Index or middle takes the octave and lets it ring.',
      'Pair 1: low E 5 with high E 5. Two octaves. Do not choke the high string.',
      'Pair 2: open A with G 2. That is the A/G string-set octave (two strings, two frets — G 2 is A).',
      'Pair 3: D 7 with high E 5. Same A, different color.',
      'Keep the thumb independent. If both notes fire as one grab, slow down until they are two events.',
      'When it is clean, hold an Am shape and drop these octave pairs under it as a bass line.'],
    watchFor: 'Pinching both notes at the same instant, or killing the ring with the palm.',
    goals: ['Split thumb and finger on two As.', 'Let the octave ring.', 'Use three different octave pairs in one pass.'],
    practicePlan: ['2 min — thumb only on E 5 and open A.', '4 min — add the octave at 33 BPM.', '4 min — 50 then 66.', '2 min — one pass over a held Am.']
  },
  {
    id: 'neck-5-diagonal',
    title: 'Diagonal Phrase — Land on the Chord Tone',
    level: 'master', style: 'lead', genre: 'any', key: 'A minor', bpm: 84,
    summary: 'Leave Box 1 on a diagonal, arrive in Box 2, and end on A.',
    notes: [
      n(0, 5, 0.5, 'D'), n(0, 8, 0.5, 'U'), n(1, 7, 0.5, 'D'),
      n(2, 5, 0.5, 'U'), n(2, 7, 0.5, 'D', ['S']), n(2, 9, 0.5, 'U'),
      n(3, 7, 0.5, 'D'), n(3, 9, 0.5, 'U'),
      n(4, 8, 0.5, 'D'), n(4, 10, 0.5, 'U'),
      n(5, 8, 0.5, 'D'), n(5, 5, 1, 'U')
    ],
    steps: ['Start A-C-E — an A minor triad.', 'Slide D 7 to 9.', 'End on high E 5 — A.', 'C or D as a last note sounds unfinished over Am.', 'Play this only over Am in an Am-G-F-E loop later.', 'Two frets up is B minor.'],
    watchFor: 'The last A going flat, and rushing the slide.',
    goals: ['Shift position inside a line.', 'End on a named chord tone.', 'Move the phrase two frets.'],
    practicePlan: ['2 min — first five notes.', '4 min — 42 BPM, freeze on A.', '4 min — 63 then 84.', '2 min — one recorded take.']
  }
];
