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
    summary: 'The E-shape is one of the five CAGED addresses for the same C chord.',
    notes: [n(0,8,0.5,'D'),n(1,10,0.5,'U'),n(2,10,0.5,'D'),n(3,9,0.5,'U'),n(4,8,0.5,'D'),n(5,8,1,'U'),n(5,8,0.5,'D'),n(4,8,0.5,'U'),n(3,9,0.5,'D'),n(2,10,0.5,'U'),n(1,10,0.5,'D'),n(0,8,1,'U')],
    steps: ['Low E 8 is C.', 'Tones: C, G, C, E, G, C.', 'Stay in one position.', 'Roots: both E 8s and D 10.', 'A-shape C is A-string 3.', 'Mute unused strings.'],
    watchFor: 'An open A under this shape is a different chord.',
    goals: ['Name the E-shape C tones.', 'Keep the hand at fret 8.', 'Move the grip to any major on the low E.'],
    practicePlan: ['2 min — freeze.', '4 min — 36 BPM.', '4 min — 54 then 72.', '2 min — roots, then one pass.']
  },
  {
    id: 'neck-6-caged-a',
    title: 'CAGED Map — A-shape C Arpeggio',
    level: 'advanced', style: 'lead', genre: 'any', key: 'C major', bpm: 72,
    summary: 'Root on A-string 3. Same C, different address.',
    notes: [n(1,3,0.5,'D'),n(2,5,0.5,'U'),n(3,5,0.5,'D'),n(4,5,0.5,'U'),n(5,3,1,'D'),n(5,3,0.5,'U'),n(4,5,0.5,'D'),n(3,5,0.5,'U'),n(2,5,0.5,'D'),n(1,3,1,'U'),n(1,3,1,'D'),n(3,5,1,'U')],
    steps: ['Mute low E. Root is A 3.', 'Tones: C, G, C, E, G.', 'Barre fret 3 on A and high E.', 'Fret 5 is D major.', 'Shared C with E-shape: G 5.', 'Do not let low E ring.'],
    watchFor: 'Floppy barre or ringing low E.',
    goals: ['Point to C on the A string.', 'One-position arpeggio.', 'Shift two frets, name the chord.'],
    practicePlan: ['2 min — plant, mute.', '4 min — 36 BPM.', '4 min — 54 then 72.', '2 min — slide to D.']
  },
  {
    id: 'neck-7-caged-g',
    title: 'CAGED Map — G-shape C Arpeggio',
    level: 'advanced', style: 'lead', genre: 'any', key: 'C major', bpm: 70,
    summary: 'Stretch shape 8-7-5-5-5-8. Both E strings are C.',
    notes: [n(0,8,0.5,'D'),n(1,7,0.5,'U'),n(2,5,0.5,'D'),n(3,5,0.5,'U'),n(4,5,0.5,'D'),n(5,8,1,'U'),n(5,8,0.5,'D'),n(4,5,0.5,'U'),n(3,5,0.5,'D'),n(2,5,0.5,'U'),n(1,7,0.5,'D'),n(0,8,1,'U')],
    steps: ['8-7-5-5-5-8.', 'No full barre. Finger 1 on the 5s.', 'Tones: C, E, G, C, E, C.', 'Between A-shape at 3 and E-shape at 8.', 'Inside four notes first if it hurts.', 'Down two frets is Bb.'],
    watchFor: 'Collapsing the 8-to-5 stretch.',
    goals: ['Spot G-shape by two C roots on the E strings.', 'Keep fret 5 clean.', 'Use it as the bridge shape.'],
    practicePlan: ['2 min — inside notes.', '4 min — add roots at 35.', '4 min — 52 then 70.', '2 min — name tones and stop.']
  },
  {
    id: 'neck-8-caged-d',
    title: 'CAGED Map — D-shape C Arpeggio',
    level: 'advanced', style: 'lead', genre: 'any', key: 'C major', bpm: 72,
    summary: 'Root on D-string 10. Last new C address before fret 12.',
    notes: [n(2,10,0.5,'D'),n(3,12,0.5,'U'),n(4,13,0.5,'D'),n(5,12,1,'U'),n(5,12,0.5,'D'),n(4,13,0.5,'U'),n(3,12,0.5,'D'),n(2,10,1,'U'),n(1,10,1,'D'),n(2,10,1,'U'),n(2,10,0.5,'D'),n(5,8,1,'U')],
    steps: ['D 10 C, G 12 G, B 13 C, e 12 E.', 'Open D up 10 frets.', 'Last jump into E-shape C at high E 8.', 'A 10 is optional G.', 'Two frets up is D major.', 'Skip low E.'],
    watchFor: 'B 13 going sharp.',
    goals: ['D-shape root is on the D string.', 'Play C-G-C-E.', 'Walk into E-shape C.'],
    practicePlan: ['2 min — four core notes.', '4 min — 36 BPM.', '4 min — 54 then 72.', '2 min — D-shape then E-shape.']
  },
  {
    id: 'neck-2-five-box',
    title: 'Five-Box Tour — A Minor Boxes 1-2',
    level: 'advanced', style: 'lead', genre: 'any', key: 'A minor', bpm: 80,
    summary: 'Walk Box 1 into Box 2.',
    notes: [n(0,5,0.5,'D'),n(0,8,0.5,'U'),n(1,5,0.5,'D'),n(1,7,0.5,'U'),n(2,5,0.5,'D'),n(2,7,0.5,'U'),n(3,5,0.5,'D'),n(3,7,0.5,'U'),n(3,7,0.5,'D',['S']),n(3,9,0.5,'U'),n(4,8,0.5,'D'),n(4,10,0.5,'U'),n(5,8,0.5,'D'),n(5,10,1,'U')],
    steps: ['First eight notes are Box 1.', 'Slide G 7 to 9 into Box 2.', 'Box 2 is B 8-10 and e 8-10.', 'Know which note is A.', 'Play from the top and from the slide.', 'Boxes 3-5 are separate lessons.'],
    watchFor: 'Rushing the slide.',
    goals: ['Connect 1 and 2.', 'Point to A in both.', 'One scale, two addresses.'],
    practicePlan: ['2 min — Box 1.', '4 min — slide at 40.', '4 min — 60 then 80.', '2 min — start at the slide.']
  },
  {
    id: 'neck-10-box3',
    title: 'Five-Box Tour — A Minor Box 3',
    level: 'advanced', style: 'lead', genre: 'any', key: 'A minor', bpm: 76,
    summary: 'Box 3 around frets 9-12.',
    notes: [n(2,10,0.5,'D'),n(2,12,0.5,'U'),n(3,9,0.5,'D'),n(3,12,0.5,'U'),n(4,10,0.5,'D'),n(4,13,0.5,'U'),n(5,10,0.5,'D'),n(5,12,1,'U'),n(5,12,0.5,'D'),n(5,10,0.5,'U'),n(4,13,0.5,'D'),n(4,10,0.5,'U'),n(3,12,0.5,'D'),n(3,9,1,'U')],
    steps: ['D 10-12, G 9-12, B 10-13, e 10-12.', 'A is at D 12 and e 12.', 'B 10 to 13 is 1 and 4.', 'Shares the 10th fret wall with Box 2.', 'Join Box 2 to Box 3 on e 10.', 'Do not slide the 10-13 stretch.'],
    watchFor: 'B 13 sharp from a squeezed pinky.',
    goals: ['Own Box 3.', 'Find A at 12.', 'Join Box 2 to 3.'],
    practicePlan: ['2 min — four strings.', '4 min — 38 BPM.', '4 min — 57 then 76.', '2 min — 2 into 3.']
  },
  {
    id: 'neck-11-box4',
    title: 'Five-Box Tour — A Minor Box 4',
    level: 'advanced', style: 'lead', genre: 'any', key: 'A minor', bpm: 72,
    summary: 'Box 4 at 12-15. Twelfth-fret A is home.',
    notes: [n(2,12,0.5,'D'),n(2,14,0.5,'U'),n(3,12,0.5,'D'),n(3,14,0.5,'U'),n(4,13,0.5,'D'),n(4,15,0.5,'U'),n(5,12,0.5,'D'),n(5,15,1,'U'),n(5,15,0.5,'D'),n(5,12,0.5,'U'),n(4,15,0.5,'D'),n(4,13,0.5,'U'),n(3,14,0.5,'D'),n(3,12,1,'U')],
    steps: ['D 12-14, G 12-14, B 13-15, e 12-15.', 'A at D 12 and e 12.', '15 is C, not a new scale.', 'Walk off Box 3 e 12 into this.', 'Tight position. No death-grip.', 'Stay at 12 today.'],
    watchFor: 'Notes dying above 12 because the hand slid sharp.',
    goals: ['Stay in the 12th-fret window.', 'A at 12 is home.', 'Connect Box 3 to 4.'],
    practicePlan: ['2 min — 12 and 14 on D and G.', '4 min — 36 BPM.', '4 min — 54 then 72.', '2 min — 3 into 4.']
  },
  {
    id: 'neck-12-box5',
    title: 'Five-Box Tour — A Minor Box 5',
    level: 'advanced', style: 'lead', genre: 'any', key: 'A minor', bpm: 76,
    summary: 'Box 5 behind Box 1: frets 2-5.',
    notes: [n(0,3,0.5,'D'),n(0,5,0.5,'U'),n(1,3,0.5,'D'),n(1,5,0.5,'U'),n(2,2,0.5,'D'),n(2,5,0.5,'U'),n(3,2,0.5,'D'),n(3,5,0.5,'U'),n(4,3,0.5,'D'),n(4,5,0.5,'U'),n(5,3,0.5,'D'),n(5,5,1,'U')],
    steps: ['E 3-5, A 3-5, D 2-5, G 2-5, B 3-5, e 3-5.', 'Shares fret 5 with Box 1.', 'A at E 5, G 2, e 5.', 'D 2 / G 2 is the b7. Keep it.', 'Walk into Box 1 at fret 5.', 'Same shape at 15-17 later.'],
    watchFor: 'Skipping D 2 / G 2.',
    goals: ['Own the area below Box 1.', 'Name the three As.', 'Box 5 into Box 1 with no gap.'],
    practicePlan: ['2 min — six strings.', '4 min — 38 BPM.', '4 min — 57 then 76.', '2 min — 5 into 1.']
  },
  {
    id: 'neck-3-3nps',
    title: '3NPS Highway — G Major (3 strings)',
    level: 'advanced', style: 'lead', genre: 'any', key: 'G major', bpm: 76,
    summary: 'Three notes on the low three strings.',
    notes: [n(0,3,0.5,'D'),n(0,5,0.5,'U'),n(0,7,0.5,'D'),n(1,3,0.5,'U'),n(1,5,0.5,'D'),n(1,7,0.5,'U'),n(2,4,0.5,'D'),n(2,5,0.5,'U'),n(2,7,1,'D'),n(2,7,0.5,'U'),n(2,5,0.5,'D'),n(2,4,0.5,'U'),n(1,7,0.5,'D'),n(1,5,0.5,'U'),n(1,3,0.5,'D'),n(0,7,0.5,'U'),n(0,5,0.5,'D'),n(0,3,1,'U')],
    steps: ['1-2-4. Pinky on every 7.', 'Alternate pick the string changes.', 'G is E 3 and D 5.', 'Drop tempo if 7 dies.', 'Two frets up is A major.', 'Six-string version next.'],
    watchFor: 'Pinky collapse; resetting to a downstroke every string.',
    goals: ['Even time.', 'Keep 1-2-4.', 'Shift two frets.'],
    practicePlan: ['2 min — one string.', '4 min — 38 BPM.', '4 min — 57 then 76.', '2 min — shift to A.']
  },
  {
    id: 'neck-9-3nps-full',
    title: '3NPS Highway — G Major (6 strings)',
    level: 'master', style: 'lead', genre: 'any', key: 'G major', bpm: 72,
    summary: 'Three notes on every string. The B string switches to 5-7-8.',
    notes: [n(0,3,0.5,'D'),n(0,5,0.5,'U'),n(0,7,0.5,'D'),n(1,3,0.5,'U'),n(1,5,0.5,'D'),n(1,7,0.5,'U'),n(2,4,0.5,'D'),n(2,5,0.5,'U'),n(2,7,0.5,'D'),n(3,4,0.5,'U'),n(3,5,0.5,'D'),n(3,7,0.5,'U'),n(4,5,0.5,'D'),n(4,7,0.5,'U'),n(4,8,0.5,'D'),n(5,5,0.5,'U'),n(5,7,0.5,'D'),n(5,8,1,'U')],
    steps: ['Low strings 3-5-7 / 3-5-7 / 4-5-7. G 4-5-7. B and e 5-7-8.', 'Finger 1 moves to fret 5 on the B string.', 'Count groups of three.', 'High E 8 is C. G roots: E 3, D 5, B 8.', 'Learn the climb before the descent.', 'Shift the 18 notes to A.'],
    watchFor: 'B string falling back to 4-5-7 out of habit.',
    goals: ['Six strings, three notes each.', 'B-string fingering change.', 'Move the full grip two frets.'],
    practicePlan: ['2 min — strings 6-4.', '4 min — add G-B-e at 36.', '4 min — 54 then 72.', '2 min — one A-major climb.']
  },
  {
    id: 'neck-4-octaves',
    title: 'Octave Grid — Finding A Everywhere',
    level: 'advanced', style: 'lead', genre: 'any', key: 'A minor', bpm: 70,
    summary: 'Same pitch, different string. Lead navigation.',
    notes: [n(0,5,1,'D'),n(1,0,1,'D'),n(1,12,1,'D'),n(2,7,1,'D'),n(3,2,1,'D'),n(4,10,1,'D'),n(5,5,1,'D'),n(5,5,0.5,'D'),n(3,2,0.5,'U'),n(2,7,0.5,'D'),n(0,5,1,'U')],
    steps: ['Every note is A.', 'Two strings over, two frets up. B string is three frets.', 'Navigation, not a lick.', 'Last four notes bounce pairs.', 'Add the fifth later.', 'Name a fret, play its octave.'],
    watchFor: 'Guessing from a box.',
    goals: ['A on every string.', 'Octave rule plus B-string exception.', 'Neck as repeating octaves.'],
    practicePlan: ['2 min — point.', '4 min — 35 BPM.', '4 min — 52 then 70.', '2 min — eyes closed.']
  },
  {
    id: 'neck-13-octaves-rhythm',
    title: 'Octave Grid — Rhythm Hits in A',
    level: 'advanced', style: 'rhythm', genre: 'any', key: 'A minor', bpm: 88,
    summary: 'Muted low A, octave answers, downstrokes.',
    notes: [n(0,5,0.5,'D',['PM']),n(2,7,0.5,'D'),n(0,5,0.5,'D',['PM']),n(2,7,0.5,'D'),n(0,5,0.5,'D',['PM']),n(1,12,0.5,'D'),n(0,5,0.5,'D',['PM']),n(5,5,1,'D'),n(0,5,0.5,'D',['PM']),n(2,7,0.5,'D'),n(0,5,0.5,'D',['PM']),n(2,7,1,'D')],
    steps: ['Low note E 5 muted. Answer is an octave.', 'Pair 1: E 5 + D 7.', 'Pair 2: E 5 + A 12.', 'Pair 3: E 5 + high E 5.', 'Downstrokes. Mute is the groove.', 'Move the riff to G when A is solid.'],
    watchFor: 'Muted string blooming, or the octave landing early.',
    goals: ['Octaves in a downstroke groove.', 'Two different pairs in time.', 'Mute on purpose.'],
    practicePlan: ['2 min — E 5 muted on the click.', '4 min — add D 7 at 44.', '4 min — 66 then 88.', '2 min — move to G.']
  },
  {
    id: 'neck-14-octaves-acoustic',
    title: 'Octave Grid — Acoustic Thumb and Finger',
    level: 'advanced', style: 'acoustic', genre: 'any', key: 'A minor', bpm: 66,
    summary: 'Thumb on the low A, finger on the octave, let ring.',
    notes: [n(0,5,1,'D',['L']),n(5,5,1,'U',['L']),n(1,0,1,'D',['L']),n(3,2,1,'U',['L']),n(2,7,1,'D',['L']),n(5,5,1,'U',['L']),n(0,5,1,'D',['L']),n(3,2,1,'U',['L']),n(1,0,1,'D',['L']),n(5,5,1,'U',['L']),n(0,5,1,'D',['L']),n(5,5,1,'U',['L'])],
    steps: ['Thumb = downstroke mark. Finger takes the octave.', 'E 5 with high E 5.', 'Open A with G 2.', 'D 7 with high E 5.', 'Two events, not one pinch.', 'Drop the pairs under a held Am.'],
    watchFor: 'Pinching both notes at once, or killing the ring.',
    goals: ['Split thumb and finger.', 'Let the octave ring.', 'Three pairs in one pass.'],
    practicePlan: ['2 min — thumb only.', '4 min — add octave at 33.', '4 min — 50 then 66.', '2 min — over Am.']
  },
  {
    id: 'neck-5-diagonal',
    title: 'Diagonal Phrase — Land on the Chord Tone',
    level: 'master', style: 'lead', genre: 'any', key: 'A minor', bpm: 84,
    summary: 'Box 1 into Box 2, end on A.',
    notes: [n(0,5,0.5,'D'),n(0,8,0.5,'U'),n(1,7,0.5,'D'),n(2,5,0.5,'U'),n(2,7,0.5,'D',['S']),n(2,9,0.5,'U'),n(3,7,0.5,'D'),n(3,9,0.5,'U'),n(4,8,0.5,'D'),n(4,10,0.5,'U'),n(5,8,0.5,'D'),n(5,5,1,'U')],
    steps: ['Start A-C-E.', 'Slide D 7 to 9.', 'End high E 5 — A.', 'C or D as a last note fails over Am.', 'Use only over Am later.', 'Two frets up is Bm.'],
    watchFor: 'Last A going flat; rushing the slide.',
    goals: ['Shift inside a line.', 'End on a named chord tone.', 'Move the phrase two frets.'],
    practicePlan: ['2 min — first five notes.', '4 min — 42 BPM, freeze on A.', '4 min — 63 then 84.', '2 min — one take.']
  },
  {
    id: 'neck-15-guide-tones',
    title: 'Jazz — Guide Tones on a ii-V-I',
    level: 'advanced', style: 'lead', genre: 'jazz', key: 'C major', bpm: 70,
    summary: 'Dm7-G7-Cmaj7 using only 3rds and 7ths. The line is the changes. Everything else is filler.',
    notes: [
      n(2,3,1,'D'), n(3,5,1,'U'),
      n(2,3,1,'D'), n(3,4,1,'U'),
      n(2,2,1,'D'), n(3,4,1,'U'),
      n(2,3,1,'D'), n(3,5,1,'U'),
      n(3,4,1,'D'), n(2,3,1,'U'),
      n(2,2,1,'D'), n(3,4,1,'U')
    ],
    steps: [
      'Two bars of thinking: Dm7 is F and C. G7 is B and F. Cmaj7 is E and B.',
      'On this neck: D 3 = F, G 5 = C, G 4 = B, D 2 = E. Stay on D and G strings.',
      'First pair is Dm7 (F then C). Second pair is G7 (F then B). Third is Cmaj7 (E then B).',
      'F is the common tone from Dm7 into G7. Do not jump off it early. That shared F is the glue.',
      'Say the chord name before each pair. If you cannot name it, you are running fingers.',
      'When the six notes are automatic, play one note per bar only: F, B, E. That is the skeleton solo.'
    ],
    watchFor: 'Turning this into a scale run. If a note is not 3 or 7 of the chord under it, skip it.',
    goals: ['Name 3 and 7 of Dm7, G7, and Cmaj7.', 'Keep F as a common tone into G7.', 'Solo with one guide tone per bar.'],
    practicePlan: ['2 min — point at F, C, B, E on D and G.', '4 min — written pairs at 35 BPM.', '4 min — 52 then 70.', '2 min — F, B, E only, one per bar.']
  },
  {
    id: 'neck-16-bebop',
    title: 'Jazz — G7 Bebop Scale Into C',
    level: 'advanced', style: 'lead', genre: 'jazz', key: 'C major', bpm: 72,
    summary: 'G A B C D E F F# G, descending. The extra F# puts chord tones on the beat so the line falls into C.',
    notes: [
      n(4,8,0.5,'D'), n(4,7,0.5,'U'), n(4,6,0.5,'D'), n(4,5,0.5,'U'),
      n(4,3,0.5,'D'), n(3,5,0.5,'U'), n(3,4,0.5,'D'), n(3,2,0.5,'U'),
      n(3,0,1,'D'),
      n(3,5,1,'U'),
      n(4,8,0.5,'D'), n(4,7,0.5,'U'), n(4,6,0.5,'D'), n(3,5,1,'U')
    ],
    steps: [
      'G7 mixolydian plus F#. Descending from B 8 (G): G, F#, F, E, D, C, B, A, G.',
      'F# is B 7. It is not decoration. It is there so G, E, C, A can sit on the beats.',
      'After the long descent, the isolated G 5 is C — that is the resolution. Freeze it.',
      'Last four notes are a short version: G, F#, F, C. Use that when eight notes are too many.',
      'Play this only while G7 is ringing, then stop on C when Cmaj7 hits.',
      'Ascending bebop is homework. The language is mostly falling lines.'
    ],
    watchFor: 'Skipping F# or landing the run on D. D is fine as a passing tone, not as the last note over C.',
    goals: ['Include F# every descent.', 'Put chord tones on the beat.', 'Resolve the run to C.'],
    practicePlan: ['2 min — name G F# F E on the B string.', '4 min — full descent at 36 BPM, freeze on C.', '4 min — 54 then 72.', '2 min — short G-F#-F-C only.']
  },
  {
    id: 'neck-17-sideslip',
    title: 'Jazz — Side-Slip Off G7, Resolve to C',
    level: 'master', style: 'lead', genre: 'jazz', key: 'C major', bpm: 80,
    summary: 'Play the lick a half step too high for two beats, then slam back. Outside is only legal if C is the last note.',
    notes: [
      n(0,4,0.5,'D'), n(1,6,0.5,'U'), n(2,4,0.5,'D'),
      n(0,3,0.5,'U'), n(1,5,0.5,'D'), n(2,3,0.5,'U'),
      n(3,4,0.5,'D'), n(3,5,1,'U'),
      n(0,4,0.5,'D'), n(1,6,0.5,'U'),
      n(0,3,0.5,'D'), n(3,5,1,'U')
    ],
    steps: [
      'First three notes are Ab (E 4, A 6, D 4). That is G shifted up one fret — the side slip.',
      'Next three notes drop one fret: E 3, A 5, D 3. You are back on G.',
      'G 4 is B (3rd of G7). G 5 is C. That is the resolution. Do not skip it.',
      'Second half is the short version: slip pair, home pair, land on C.',
      'Two beats outside, then home. If you stay on Ab for a full bar it stops being a slip.',
      'Same move two frets up is A7 side-slip into D. The muscle is the half-step shift, not these frets.'
    ],
    watchFor: 'Ending on the Ab shape. If the last note is not C, the lick is a mistake with confidence.',
    goals: ['Shift a G shape up one fret and back.', 'Keep the outside short.', 'Resolve to C you can name.'],
    practicePlan: ['2 min — G shape at fret 3, then fret 4, no tempo.', '4 min — written line at 40 BPM, freeze on C.', '4 min — 60 then 80.', '2 min — one take. Last note must be C.']
  },
  {
    id: 'neck-18-motif',
    title: 'Jazz — One Motif Across a ii-V-I',
    level: 'master', style: 'lead', genre: 'jazz', key: 'C major', bpm: 76,
    summary: 'A 3-note cell (1-2-3 of the chord) moved onto Dm7, then G7, then Cmaj7. Same idea, new root.',
    notes: [
      n(1,5,0.5,'D'), n(1,7,0.5,'U'), n(1,8,1,'D'),
      n(0,3,0.5,'U'), n(0,5,0.5,'D'), n(0,7,1,'U'),
      n(1,3,0.5,'D'), n(1,5,0.5,'U'), n(1,7,1,'D'),
      n(1,5,0.5,'U'), n(1,7,0.5,'D'), n(1,8,1,'U')
    ],
    steps: [
      'Cell is root, 2, 3. Dm7: A 5 = D, A 7 = E, A 8 = F.',
      'G7: low E 3 = G, E 5 = A, E 7 = B. Same spacing, new string.',
      'Cmaj7: A 3 = C, A 5 = D, A 7 = E.',
      'Last three notes repeat the Dm7 cell so you hear it as a theme, not three unrelated licks.',
      'Keep the rhythm identical on every chord. The ear tracks the rhythm more than the pitches.',
      'Homework: invert the cell to 3-2-1 and run the same three chords.'
    ],
    watchFor: 'Changing the rhythm when you change chords. That kills the motif.',
    goals: ['Play 1-2-3 of each chord.', 'Keep one rhythm.', 'Hear one idea, three addresses.'],
    practicePlan: ['2 min — Dm7 cell only.', '4 min — add G7 and C at 38 BPM.', '4 min — 57 then 76.', '2 min — invert to 3-2-1 once.']
  },
  {
    id: 'neck-19-guidetone-comp',
    title: 'Jazz — Guide-Tone Comping (3 and 7)',
    level: 'advanced', style: 'rhythm', genre: 'jazz', key: 'C major', bpm: 80,
    summary: 'Two notes per chord on the middle strings. 3rd plus 7th. This is the skeleton under a solo, not a full grip.',
    notes: [
      n(2,3,0.5,'D',['2']), n(3,5,1,'D',['2','L']),
      n(2,3,0.5,'D',['2']), n(3,4,1,'D',['2','L']),
      n(2,2,0.5,'D',['2']), n(3,4,1,'D',['2','L']),
      n(2,3,0.5,'D',['2']), n(3,5,1,'D',['2','L']),
      n(2,3,0.5,'D',['2']), n(3,4,1,'D',['2','L']),
      n(2,2,0.5,'D',['2']), n(3,4,1,'D',['2','L'])
    ],
    steps: [
      'Player hears these as pairs. Dm7: D 3 (F) + G 5 (C). G7: D 3 (F) + G 4 (B). Cmaj7: D 2 (E) + G 4 (B).',
      'Hold the second note. The first is the grab, the second is the ring. On a real guitar they speak together.',
      'One stab per bar is enough. Freddie Green is the same idea with fuller chords. This is the inside of that stab.',
      'Voice leading: F stays into G7, C drops to B, then F drops to E into Cmaj7. One finger moves at a time.',
      'Mute the E strings. These two notes are the whole arrangement.',
      'When it is clean, play the pairs on beats 2 and 4 only. That is the jazz rhythm-guitar clock.'
    ],
    watchFor: 'Strumming six strings, or letting the pair turn into an arpeggio. Two notes. Stop.',
    goals: ['Grab 3+7 of each chord.', 'Move one finger between chords.', 'Stab on 2 and 4 later.'],
    practicePlan: ['2 min — plant each pair, no tempo.', '4 min — one pair per bar at 40 BPM.', '4 min — 60 then 80.', '2 min — pairs on 2 and 4 only.']
  }
];
