// Neck Systems pack — incremental Classroom add-on.
// These lessons live in the repo so they ship with the app even while
// lessons-v2.json still loads from storage.
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
    level: 'advanced',
    style: 'lead',
    genre: 'any',
    key: 'C major',
    bpm: 72,
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
      'First finger lives on fret 8 (both E strings and the B string). Third finger takes the 10s. Middle finger takes G-string 9.',
      'Keep the left hand in one position. Do not hop. CAGED is five addresses, not five jumps.',
      'After the shape is clean, play only the roots (both 8th-fret E strings and D-string 10). Those three Cs are how you find this shape in the dark.',
      'The A-shape C lives down at fret 3 on the A string. Same chord, different address. Do not mix the two in this block.'
    ],
    watchFor: 'Muting the unused strings. An E-shape arpeggio that lets the A string ring open is a different chord.',
    goals: [
      'Name every note in the E-shape C arpeggio without looking at a chart.',
      'Keep the hand planted at fret 8 for the whole phrase.',
      'Know that this same grip, moved, is every major chord on the low E string.'
    ],
    practicePlan: [
      '2 min — freeze the 8th-fret barre shape. No tempo. Touch each note.',
      '4 min — metronome at 36 BPM. Up and down, saying C-G-C-E-G-C.',
      '4 min — 54 then 72 BPM if every note speaks.',
      '2 min — play only the three C roots, then the full arpeggio once and stop.'
    ]
  },
  {
    id: 'neck-2-five-box',
    title: 'Five-Box Tour — A Minor Pentatonic',
    level: 'advanced',
    style: 'lead',
    genre: 'any',
    key: 'A minor',
    bpm: 80,
    summary: 'Box 1 is not the pentatonic. Walk Box 1 into Box 2 into Box 3 so the five-note scale has three addresses under your hand.',
    notes: [
      n(0, 5, 0.5, 'D'), n(0, 8, 0.5, 'U'),
      n(1, 5, 0.5, 'D'), n(1, 7, 0.5, 'U'),
      n(2, 5, 0.5, 'D'), n(2, 7, 0.5, 'U'),
      n(3, 5, 0.5, 'D'), n(3, 7, 0.5, 'U'),
      n(3, 7, 0.5, 'D', ['S']), n(3, 9, 0.5, 'U'),
      n(4, 8, 0.5, 'D'), n(4, 10, 0.5, 'U'),
      n(5, 8, 0.5, 'D'), n(5, 10, 1, 'U')
    ],
    steps: [
      'First eight notes are Box 1 in A: low E 5-8, A 5-7, D 5-7, G 5-7.',
      'The slide on G from 7 to 9 is the door into Box 2. Do not lift. Slide.',
      'Box 2 continues B 8-10 and high E 8-10. You are now one position higher, same five notes.',
      'Box 3 would start at D-string 10 / G-string 9-10. Stop at Box 2 today unless Box 1-2 is automatic.',
      'The root A sits at low E 5, G 7, and high E 5 (not used here) and high E 17. Always know which note is A.',
      'Play the line once as written, once starting from the slide so Box 2 feels like home too.'
    ],
    watchFor: 'Rushing the slide. If G-string 9 is sharp or late, the two boxes sound like two licks instead of one scale.',
    goals: [
      'Connect Box 1 and Box 2 without stopping the right hand.',
      'Point to the root A in both positions.',
      'Treat the five boxes as one scale, not five songs.'
    ],
    practicePlan: [
      '2 min — Box 1 only, no slide.',
      '4 min — add the G-string slide at 40 BPM. Four clean loops.',
      '4 min — 60 then 80 BPM.',
      '2 min — start the phrase at the slide and end on A (G-string 7 or low E 5).'
    ]
  },
  {
    id: 'neck-3-3nps',
    title: '3NPS Highway — G Major',
    level: 'advanced',
    style: 'lead',
    genre: 'any',
    key: 'G major',
    bpm: 76,
    summary: 'Three notes on every string. One fingering, twelve keys. This is the modern way to run a major scale without living in one box.',
    notes: [
      n(0, 3, 0.5, 'D'), n(0, 5, 0.5, 'U'), n(0, 7, 0.5, 'D'),
      n(1, 3, 0.5, 'U'), n(1, 5, 0.5, 'D'), n(1, 7, 0.5, 'U'),
      n(2, 4, 0.5, 'D'), n(2, 5, 0.5, 'U'), n(2, 7, 1, 'D'),
      n(2, 7, 0.5, 'U'), n(2, 5, 0.5, 'D'), n(2, 4, 0.5, 'U'),
      n(1, 7, 0.5, 'D'), n(1, 5, 0.5, 'U'), n(1, 3, 0.5, 'D'),
      n(0, 7, 0.5, 'U'), n(0, 5, 0.5, 'D'), n(0, 3, 1, 'U')
    ],
    steps: [
      'Fingering is 1-2-4 on the E and A strings (frets 3-5-7), then 1-2-4 on the D string (4-5-7). Pinky plays every 7.',
      'Strict alternate picking. The hard part is the string change: last note of one string is a down or up, next string continues the sequence.',
      'G is the root: low E 3, D 5, and later B 8 / high E 3. Land on a G when you stop.',
      'Do not flatten the 4-5-7 stretch on the D string. If fret 7 dies, drop the tempo. Stretch first, speed last.',
      'Same spacing two frets up is A major. That is the point of 3NPS — move the whole grip, keep the muscle memory.',
      'When this three-string version is clean, add G 4-5-7, B 5-7-8, high E 5-7-8 for the full position.'
    ],
    watchFor: 'Pinky collapse on fret 7 and picking that resets to a downstroke on every string. Both make 3NPS sound like three separate boxes.',
    goals: [
      'Play three notes per string with even time.',
      'Keep 1-2-4 fingering — no sliding the first finger to fake the stretch.',
      'Know you can shift this grip two frets to change key.'
    ],
    practicePlan: [
      '2 min — one string at a time, 3-5-7, no tempo.',
      '4 min — three strings at 38 BPM, alternate picking.',
      '4 min — 57 then 76 BPM.',
      '2 min — shift the whole thing to A (start at fret 5) once, then back to G.'
    ]
  },
  {
    id: 'neck-4-octaves',
    title: 'Octave Grid — Finding A Everywhere',
    level: 'advanced',
    style: 'lead',
    genre: 'any',
    key: 'A minor',
    bpm: 70,
    summary: 'Same pitch, different string. Once octaves are automatic the neck turns into coordinates instead of boxes.',
    notes: [
      n(0, 5, 1, 'D'),
      n(1, 0, 1, 'D'),
      n(1, 12, 1, 'D'),
      n(2, 7, 1, 'D'),
      n(3, 2, 1, 'D'),
      n(4, 10, 1, 'D'),
      n(5, 5, 1, 'D'),
      n(5, 5, 0.5, 'D'), n(3, 2, 0.5, 'U'),
      n(2, 7, 0.5, 'D'), n(0, 5, 1, 'U')
    ],
    steps: [
      'Every note in this lesson is A. Low E 5, open A, A 12, D 7, G 2, B 10, high E 5.',
      'The octave rule on E/D and A/G pairs: two strings toward the floor, two frets toward the body. B string breaks the rule — it is three frets, not two.',
      'Play each A, let it ring, then find the next one. This is navigation, not a lick.',
      'The last four notes bounce between two octave pairs so you feel the grid, not a list.',
      'Add the fifth above A (E) later: low E 0 or 12, A 7, D 2, G 9, B 5, high E 0. Fifths plus octaves are the skeleton of every power chord and every major/minor triad.',
      'Pick any random fret. Name it, then play its octave on a neighboring string set.'
    ],
    watchFor: 'Guessing from a box instead of from the interval. If you cannot find the next A without thinking "pentatonic," the grid is not in yet.',
    goals: [
      'Find A on every string without a scale shape.',
      'Use the +2 strings / +2 frets octave rule, and remember the B-string exception.',
      'Treat the neck as repeating octaves, not as five cages.'
    ],
    practicePlan: [
      '2 min — point at each A on the board. No picking yet.',
      '4 min — play the written octaves at 35 BPM. One note per click.',
      '4 min — 52 then 70 BPM.',
      '2 min — close your eyes, play three different As, open and check.'
    ]
  },
  {
    id: 'neck-5-diagonal',
    title: 'Diagonal Phrase — Land on the Chord Tone',
    level: 'master',
    style: 'lead',
    genre: 'any',
    key: 'A minor',
    bpm: 84,
    summary: 'Leave Box 1 on a diagonal, arrive in Box 2, and end on A. A pattern is only music when the last note belongs to the chord.',
    notes: [
      n(0, 5, 0.5, 'D'), n(0, 8, 0.5, 'U'),
      n(1, 7, 0.5, 'D'),
      n(2, 5, 0.5, 'U'), n(2, 7, 0.5, 'D', ['S']), n(2, 9, 0.5, 'U'),
      n(3, 7, 0.5, 'D'), n(3, 9, 0.5, 'U'),
      n(4, 8, 0.5, 'D'), n(4, 10, 0.5, 'U'),
      n(5, 8, 0.5, 'D'), n(5, 5, 1, 'U')
    ],
    steps: [
      'Start in Box 1: A (low E 5), C (low E 8), E (A 7). That is an A minor triad already.',
      'Slide D-string 7 to 9. That slide is the position shift. The phrase must not stop before or after it.',
      'Keep climbing: G 7-9, B 8-10, high E 8, then drop to high E 5 — that last note is A, the root.',
      'If you end on C or D it will sound unfinished over an A minor chord. The assignment is the landing, not the run.',
      'Pick a simple Am–G–F–E loop later and play this phrase only over Am. Silence on the other chords.',
      'When it is clean, start the same diagonal two frets higher (B minor) so the move is a system, not a memorized lick.'
    ],
    watchFor: 'The last note going flat because you yanked the high E. Relax and place high E 5. Also do not rush the slide — it is the bar line between positions.',
    goals: [
      'Shift position inside a line instead of finishing a box first.',
      'End on a chord tone you can name.',
      'Move the whole phrase by two frets and still land on the new root.'
    ],
    practicePlan: [
      '2 min — first five notes only (the Box 1 triad + start of the slide).',
      '4 min — full line at 42 BPM. Freeze on the last A.',
      '4 min — 63 then 84 BPM.',
      '2 min — record one take. If the last note is not A, throw the take out and do one more.'
    ]
  }
];
