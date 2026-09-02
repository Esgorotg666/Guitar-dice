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
    steps: [
      'This is the E-shape C barre, played as single notes. Low E string 8 is C — that is the root.',
      'Say the chord tones as you play: C, G, C, E, G, C going up. Coming down is the same notes backwards.',
      'First finger lives on fret 8. Third finger takes the 10s. Middle finger takes G-string 9.',
      'Keep the left hand in one position. Do not hop.',
      'After the shape is clean, play only the roots (both 8th-fret E strings and D-string 10).',
      'The A-shape C lives down at fret 3 on the A string. Same chord, different address.'
    ],
    watchFor: 'Muting the unused strings. An E-shape arpeggio that lets the A string ring open is a different chord.',
    goals: ['Name every note in the E-shape C arpeggio.', 'Keep the hand planted at fret 8.', 'Know this grip moved is every major chord on the low E string.'],
    practicePlan: ['2 min — freeze the 8th-fret shape.', '4 min — 36 BPM up and down, saying C-G-C-E-G-C.', '4 min — 54 then 72 BPM.', '2 min — roots only, then one full pass.']
  },
  {
    id: 'neck-6-caged-a',
    title: 'CAGED Map — A-shape C Arpeggio',
    level: 'advanced', style: 'lead', genre: 'any', key: 'C major', bpm: 72,
    summary: 'Same C chord as the E-shape, different address. Root sits on the A string at fret 3. This is the open-A grip moved up to C.',
    notes: [
      n(1, 3, 0.5, 'D'), n(2, 5, 0.5, 'U'), n(3, 5, 0.5, 'D'),
      n(4, 5, 0.5, 'U'), n(5, 3, 1, 'D'),
      n(5, 3, 0.5, 'U'), n(4, 5, 0.5, 'D'), n(3, 5, 0.5, 'U'),
      n(2, 5, 0.5, 'D'), n(1, 3, 1, 'U'),
      n(1, 3, 1, 'D'), n(3, 5, 1, 'U')
    ],
    steps: [
      'Mute the low E. The root is A-string 3 — that C is home for this shape.',
      'Going up the tones are C, G, C, E, G. Last two notes are the two C roots (A 3 and G 5).',
      'First finger bars fret 3 on A and high E. Ring finger covers D, G, and B at fret 5.',
      'Do not let the low E ring.',
      'Move this whole grip to fret 5 and it is D major.',
      'Shared C with E-shape: G-string 5 here, D-string 10 in the E-shape.'
    ],
    watchFor: 'A floppy barre at fret 3 that kills the high E, or a ringing low E.',
    goals: ['Point to the C root on the A string.', 'Play the five-note arpeggio in one position.', 'Shift two frets and name the new major chord.'],
    practicePlan: ['2 min — plant A-shape C. Mute low E.', '4 min — 36 BPM saying C-G-C-E-G.', '4 min — 54 then 72 BPM.', '2 min — slide to D at fret 5, back to C.']
  },
  {
    id: 'neck-7-caged-g',
    title: 'CAGED Map — G-shape C Arpeggio',
    level: 'advanced', style: 'lead', genre: 'any', key: 'C major', bpm: 70,
    summary: 'The stretchy one. Open-G grip moved so both E strings hold C at fret 8 and the middle strings sit at fret 5.',
    notes: [
      n(0, 8, 0.5, 'D'), n(1, 7, 0.5, 'U'), n(2, 5, 0.5, 'D'),
      n(3, 5, 0.5, 'U'), n(4, 5, 0.5, 'D'), n(5, 8, 1, 'U'),
      n(5, 8, 0.5, 'D'), n(4, 5, 0.5, 'U'), n(3, 5, 0.5, 'D'),
      n(2, 5, 0.5, 'U'), n(1, 7, 0.5, 'D'), n(0, 8, 1, 'U')
    ],
    steps: [
      'Shape is 8-7-5-5-5-8. Both E strings are C. A-string 7 is E. The three 5s are G, C, E.',
      'Do not force a full six-string barre. 8s with finger 3 or 4, A 7 with finger 2, fret 5 with finger 1.',
      'Tones: C, E, G, C, E, C. Two roots on the outside strings mark G-shape anywhere.',
      'It sits between A-shape at fret 3 and E-shape at fret 8.',
      'If the stretch hurts, play only A 7 and the three 5s first.',
      'Move the grip down two frets and you are in Bb.'
    ],
    watchFor: 'Collapsing the 8-to-5 stretch and buzzing fret 5. This is a reach, not a speed drill.',
    goals: ['Recognize G-shape by two C roots on the E strings.', 'Keep fret 5 clean while the 8s stay down.', 'See this as the bridge between A-shape and E-shape.'],
    practicePlan: ['2 min — inside four notes only.', '4 min — add both C roots at 35 BPM.', '4 min — 52 then 70 BPM.', '2 min — name every tone once and stop.']
  },
  {
    id: 'neck-8-caged-d',
    title: 'CAGED Map — D-shape C Arpeggio',
    level: 'advanced', style: 'lead', genre: 'any', key: 'C major', bpm: 72,
    summary: 'Highest of the five C addresses before the neck repeats. Root is D-string 10. This is the open-D grip moved to C.',
    notes: [
      n(2, 10, 0.5, 'D'), n(3, 12, 0.5, 'U'), n(4, 13, 0.5, 'D'), n(5, 12, 1, 'U'),
      n(5, 12, 0.5, 'D'), n(4, 13, 0.5, 'U'), n(3, 12, 0.5, 'D'), n(2, 10, 1, 'U'),
      n(1, 10, 1, 'D'), n(2, 10, 1, 'U'),
      n(2, 10, 0.5, 'D'), n(5, 8, 1, 'U')
    ],
    steps: [
      'Skip the low E. Core D-shape is D 10 (C), G 12 (G), B 13 (C), high E 12 (E).',
      'That is open D slid up 10 frets. Finger 1 on D, 2 on G and high E, 3 or 4 on B 13.',
      'Tones going up: C, G, C, E. A-string 10 is an optional G.',
      'Last two notes jump from D-string C to high-E 8 — the E-shape C root. D-shape into E-shape.',
      'Above fret 12 the five shapes start over.',
      'Slide this grip two frets up and you are in D major.'
    ],
    watchFor: 'B-string 13 going sharp from squeezing. Place it, do not crush it.',
    goals: ['Know the D-shape root lives on the D string.', 'Play C-G-C-E in this position.', 'Connect the last note to E-shape C at high E 8.'],
    practicePlan: ['2 min — four core notes only.', '4 min — full example at 36 BPM.', '4 min — 54 then 72 BPM.', '2 min — D-shape C then E-shape C, no pause.']
  },
  {
    id: 'neck-2-five-box',
    title: 'Five-Box Tour — A Minor Pentatonic',
    level: 'advanced', style: 'lead', genre: 'any', key: 'A minor', bpm: 80,
    summary: 'Box 1 is not the pentatonic. Walk Box 1 into Box 2 so the five-note scale has more than one address.',
    notes: [
      n(0, 5, 0.5, 'D'), n(0, 8, 0.5, 'U'), n(1, 5, 0.5, 'D'), n(1, 7, 0.5, 'U'),
      n(2, 5, 0.5, 'D'), n(2, 7, 0.5, 'U'), n(3, 5, 0.5, 'D'), n(3, 7, 0.5, 'U'),
      n(3, 7, 0.5, 'D', ['S']), n(3, 9, 0.5, 'U'),
      n(4, 8, 0.5, 'D'), n(4, 10, 0.5, 'U'), n(5, 8, 0.5, 'D'), n(5, 10, 1, 'U')
    ],
    steps: [
      'First eight notes are Box 1 in A.',
      'The slide on G from 7 to 9 is the door into Box 2. Do not lift. Slide.',
      'Box 2 continues B 8-10 and high E 8-10.',
      'Always know which note is A.',
      'Play once as written, once starting from the slide.',
      'Box 3 waits until 1-2 is automatic.'
    ],
    watchFor: 'Rushing the slide so the two boxes sound like two licks.',
    goals: ['Connect Box 1 and Box 2 without stopping.', 'Point to the root A in both positions.', 'Treat the boxes as one scale.'],
    practicePlan: ['2 min — Box 1 only.', '4 min — add the slide at 40 BPM.', '4 min — 60 then 80 BPM.', '2 min — start at the slide, end on A.']
  },
  {
    id: 'neck-3-3nps',
    title: '3NPS Highway — G Major',
    level: 'advanced', style: 'lead', genre: 'any', key: 'G major', bpm: 76,
    summary: 'Three notes on every string. One fingering, twelve keys.',
    notes: [
      n(0, 3, 0.5, 'D'), n(0, 5, 0.5, 'U'), n(0, 7, 0.5, 'D'),
      n(1, 3, 0.5, 'U'), n(1, 5, 0.5, 'D'), n(1, 7, 0.5, 'U'),
      n(2, 4, 0.5, 'D'), n(2, 5, 0.5, 'U'), n(2, 7, 1, 'D'),
      n(2, 7, 0.5, 'U'), n(2, 5, 0.5, 'D'), n(2, 4, 0.5, 'U'),
      n(1, 7, 0.5, 'D'), n(1, 5, 0.5, 'U'), n(1, 3, 0.5, 'D'),
      n(0, 7, 0.5, 'U'), n(0, 5, 0.5, 'D'), n(0, 3, 1, 'U')
    ],
    steps: [
      'Fingering is 1-2-4. Pinky plays every 7.',
      'Strict alternate picking across string changes.',
      'G is the root: low E 3 and D 5. Land on a G when you stop.',
      'If fret 7 dies, drop the tempo.',
      'Same spacing two frets up is A major.',
      'Add the top three strings only after this version is clean.'
    ],
    watchFor: 'Pinky collapse on fret 7 and resetting to a downstroke on every string.',
    goals: ['Even time, three notes per string.', 'Keep 1-2-4 fingering.', 'Shift the grip two frets to change key.'],
    practicePlan: ['2 min — one string at a time.', '4 min — three strings at 38 BPM.', '4 min — 57 then 76 BPM.', '2 min — shift to A once, back to G.']
  },
  {
    id: 'neck-4-octaves',
    title: 'Octave Grid — Finding A Everywhere',
    level: 'advanced', style: 'lead', genre: 'any', key: 'A minor', bpm: 70,
    summary: 'Same pitch, different string. Once octaves are automatic the neck turns into coordinates.',
    notes: [
      n(0, 5, 1, 'D'), n(1, 0, 1, 'D'), n(1, 12, 1, 'D'), n(2, 7, 1, 'D'),
      n(3, 2, 1, 'D'), n(4, 10, 1, 'D'), n(5, 5, 1, 'D'),
      n(5, 5, 0.5, 'D'), n(3, 2, 0.5, 'U'), n(2, 7, 0.5, 'D'), n(0, 5, 1, 'U')
    ],
    steps: [
      'Every note in this lesson is A.',
      'Octave rule on E/D and A/G pairs: two strings over, two frets up. B string is three frets.',
      'This is navigation, not a lick.',
      'Last four notes bounce between octave pairs.',
      'Add the fifth (E) after the octaves are automatic.',
      'Pick any fret, name it, play its octave.'
    ],
    watchFor: 'Guessing from a box instead of from the interval.',
    goals: ['Find A on every string.', 'Use the octave rule plus the B-string exception.', 'Treat the neck as repeating octaves.'],
    practicePlan: ['2 min — point at each A.', '4 min — written octaves at 35 BPM.', '4 min — 52 then 70 BPM.', '2 min — eyes closed, three As.']
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
    steps: [
      'Start in Box 1: A, C, E — an A minor triad.',
      'Slide D-string 7 to 9. That is the position shift.',
      'Climb into Box 2 and drop to high E 5 — that last note is A.',
      'Ending on C or D sounds unfinished over Am.',
      'Later, play this only over Am in an Am-G-F-E loop.',
      'Move the phrase two frets up for B minor.'
    ],
    watchFor: 'The last A going flat, and rushing the slide.',
    goals: ['Shift position inside a line.', 'End on a named chord tone.', 'Move the phrase two frets and still land on the new root.'],
    practicePlan: ['2 min — first five notes.', '4 min — full line at 42 BPM, freeze on A.', '4 min — 63 then 84 BPM.', '2 min — one recorded take.']
  }
];
