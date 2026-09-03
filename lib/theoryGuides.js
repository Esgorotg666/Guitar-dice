export const THEORY_GUIDES = [
  {
    id: 'th-notes',
    title: 'Notes on the neck',
    level: 'entry',
    unit: 'Foundations',
    summary: 'Every fret is a half step. Same letter names as the piano, just stacked on six strings.',
    steps: [
      'Open strings low to high: E A D G B E. Memorize that first. It is the map.',
      'One fret up is one half step. E to F has no sharp between them. B to C has no sharp between them. Everything else does.',
      'The 12th fret is the octave of the open string. Same letter, higher pitch.',
      'Find G on every string: low E 3, A 10, D 5, G open, B 8, high E 3. That is one note, six addresses.',
      'Use the Tuner tab at 440 and check that 12th-fret harmonic matches the fretted 12th. If it does not, that is setup, not theory.'
    ],
    watchFor: 'Do not only learn dots in one box. Name the note you are on.'
  },
  {
    id: 'th-intervals',
    title: 'Intervals you actually use',
    level: 'entry',
    unit: 'Foundations',
    summary: 'An interval is the distance between two notes. Chords and scales are just stacks of these.',
    steps: [
      'Unison = same pitch. Octave = 12 frets or the same letter next register.',
      'Minor 2nd = 1 fret. Major 2nd = 2 frets. Minor 3rd = 3. Major 3rd = 4.',
      'Perfect 4th = 5 frets. Tritone = 6. Perfect 5th = 7. That fifth is the power-chord shape.',
      'Minor 6th = 8, major 6th = 9, minor 7th = 10, major 7th = 11.',
      'On one string, count frets. Across strings, power chord is root plus fifth two strings up, two frets forward from a 3 — check on E and A: 3 and 5.'
    ],
    watchFor: 'Sing the higher note before you fret it. Shape without sound is not an interval yet.'
  },
  {
    id: 'th-major',
    title: 'Major scale formula',
    level: 'entry',
    unit: 'Scales',
    summary: 'W W H W W W H. Whole, whole, half, whole, whole, whole, half. That is every major key.',
    steps: [
      'Start on C. C D E F G A B C. No sharps. The half steps land at E-F and B-C.',
      'Start on G. G A B C D E F# G. One sharp, because you must keep the same step sizes.',
      'Degrees: 1 2 3 4 5 6 7. Chords are built by stacking every other degree.',
      'Play C major on the B string starting at fret 1: 1-3-5 then shift. Say the formula while you walk.'
    ],
    watchFor: 'If you skip the half steps the key signature is wrong even if the box looks familiar.'
  },
  {
    id: 'th-chords',
    title: 'How chords are built',
    level: 'entry',
    unit: 'Harmony',
    summary: 'A major triad is 1-3-5. Minor is 1-b3-5. That is the whole first year of harmony.',
    steps: [
      'C major: C E G. E is a major 3rd above C (4 frets). G is a 5th (7 frets).',
      'C minor: C Eb G. Flatten the 3rd one fret.',
      'Dominant 7: 1-3-5-b7. C7 is C E G Bb. That b7 wants to resolve.',
      'Minor 7: 1-b3-5-b7. Major 7: 1-3-5-7. Power chord: 1 and 5 only, no 3rd, so it is neither major nor minor.',
      'When the classroom says hold the full shape, you are sounding those chord tones together, not one string at a time.'
    ],
    watchFor: 'If you only pick the tab dots, you are not playing the chord. You are arpeggiating it by accident.'
  },
  {
    id: 'th-circle',
    title: 'Circle of fifths on the guitar',
    level: 'intermediate',
    unit: 'Harmony',
    summary: 'Clockwise is up a fifth. I-IV-V are neighbors. Relative minor lives three frets down from the major root.',
    steps: [
      'From G, one fifth up is D, one fifth down is C. That is G-C-D, the I-IV-V in G.',
      'Move the same machine: D-G-A, then A-D-E. Same job, new hour.',
      'Relative minor of G is Em. Of C is Am. Same notes, darker door.',
      'ii-V-I in C is Dm-G-C. That sentence is three adjacent hours used as gravity toward I.',
      'Classroom Circle unit is this page with a guitar in your hands. Read this, then play those lessons.'
    ],
    watchFor: 'Do not memorize a poster. Name the next hour from the note you are on.'
  },
  {
    id: 'th-diatonic',
    title: 'Diatonic chords and numbers',
    level: 'intermediate',
    unit: 'Harmony',
    summary: 'In a major key the seven chords are I ii iii IV V vi vii dim. Numbers let you move a song to a new key without new shapes in your head.',
    steps: [
      'C major: C Dm Em F G Am Bdim.',
      'G major: G Am Bm C D Em F#dim. Same quality order, new roots.',
      'I, IV, V are major. ii, iii, vi are minor. vii is diminished.',
      'A pop map is I-V-vi-IV. In C that is C-G-Am-F. In G it is G-D-Em-C.',
      'When you lock a key on the dice, you are choosing I. The roll then picks neighbors from this list.'
    ],
    watchFor: 'Calling every minor chord "sad" hides the job. vi is home-adjacent. ii wants V.'
  },
  {
    id: 'th-modes',
    title: 'Modes in plain English',
    level: 'intermediate',
    unit: 'Scales',
    summary: 'A mode is the major-scale formula started on a different degree. The parent notes stay. The home note changes.',
    steps: [
      'Ionian = major. Dorian = 2nd degree, minor with a raised 6. Mixolydian = 5th degree, major with a flat 7.',
      'Aeolian = natural minor. Phrygian = minor with a flat 2. Lydian = major with a sharp 4. Locrian = diminished home.',
      'Over a static G riff, G Mixolydian (G A B C D E F) sounds like rock. G Dorian (G A Bb C D E F) sounds like funk or Santana.',
      'Do not play a mode as a box with no chord under it. The mode is the scale that matches the chord quality.',
      'Dice mode lock picks this on purpose. Classroom lead lines should name the mode in the header.'
    ],
    watchFor: 'A mode is not a mood sticker. It is which degree is tonic.'
  },
  {
    id: 'th-251',
    title: 'ii-V-I and playing the changes',
    level: 'advanced',
    unit: 'Jazz language',
    summary: 'ii wants V, V wants I. A line that lands chord tones on beat 1 is playing the changes. A scale run that ignores the landing is not.',
    steps: [
      'In C: Dm7 - G7 - Cmaj7. Roots D, G, C.',
      'On ii, think Dorian or minor 7 arpeggio. On V, Mixolydian or dominant 7 arpeggio. On I, Ionian or major 7.',
      'Target the 3rd and 7th of each chord on beat 1. Those two notes tell the ear the quality.',
      'Move the sentence to G: Am7 - D7 - Gmaj7. Same gravity, new hour.',
      'Classroom lesson lead-251-clock is the guitar version of this page.'
    ],
    watchFor: 'If beat 1 is a random scale tone, the clock did not turn.'
  }
];
