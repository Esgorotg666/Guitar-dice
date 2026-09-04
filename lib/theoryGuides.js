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
  },
  {
    id: 'th-interchange',
    title: 'Modal interchange',
    level: 'advanced',
    unit: 'Advanced harmony',
    summary: 'Borrow a chord from the parallel mode. Tonic stays. In C major you steal from C minor: Fm, Ab, Bb. You did not change key.',
    steps: [
      'Parallel of C major is C Aeolian: C D Eb F G Ab Bb.',
      'Useful steals: iv (Fm), bVI (Ab), bVII (Bb), bIII (Eb).',
      'I-iv-bVII-I in C is C-Fm-Bb-C. Same machine in G is G-Cm-F-G.',
      'bVI-bVII-I is Ab-Bb-C. Ramp into home, do not cadence in Ab.',
      'Play classroom rhy-borrow-iv7 and rhy-b6-b7 after this page.'
    ],
    watchFor: 'If you stay in Eb after the borrow, you modulated. Interchange comes home to the old I.'
  },
  {
    id: 'th-planing',
    title: 'Parallel harmony and planing',
    level: 'advanced',
    unit: 'Advanced harmony',
    summary: 'Slide one grip. Quality often stays. Function is optional. Power chords and major barres do this by default.',
    steps: [
      'Chromatic planing: same 1+5, every fret is legal. E5-F5-F#5.',
      'Diatonic planing: snap to the scale. Quality can flip (G, Am, Bm).',
      'Major-shape rail: C, D, E all major. That is not I-ii-iii.',
      'SATB calls parallel 5ths a fault. Rock uses them as the texture.',
      'Classroom rhy-plane-5 and rhy-plane-maj are this page on the guitar.'
    ],
    watchFor: 'Planing is not interchange. Interchange borrows one chord. Planing moves the whole stack.'
  },
  {
    id: 'th-quartal',
    title: 'Quartal planing',
    level: 'advanced',
    unit: 'Advanced harmony',
    summary: 'Stack perfect 4ths and slide the grip. No 3rd, so it floats until you pick a bass pedal.',
    steps: [
      'D-G-C on D G B is two 4ths. Slide two frets: E-A-D. Same stack, new floor.',
      'Chromatic quartal keeps every 4th perfect. Diatonic quartal will hit a tritone when the scale demands it.',
      'A 5th stack with a new floor is a 4th stack. Name the lowest note you mean.',
      'If you add a major 3rd on top you left quartal and went back to tertian.',
      'Classroom rhy-quartal-plane.'
    ],
    watchFor: 'Planing 4ths is not interchange and not a secondary dominant. It is a sliding pad.'
  },
  {
    id: 'th-voice',
    title: 'Voice leading',
    level: 'advanced',
    unit: 'Advanced harmony',
    summary: 'How each note walks to the next chord. Keep common tones. Move the rest by step. 3rd and 7th on beat 1.',
    steps: [
      'A grip is bass + guide tones (3 and 7) + optional color.',
      'Oblique motion: one finger stays. That is the guitar default.',
      'C to Am shares C and E. Only the bass needs to drop.',
      'ii-V-I guide tones in C: F+C, F+B, E+B. Two notes, three chords.',
      'Play lead-guide-251 and ac-pivot-camg. Do not arpeggiate one string at a time.'
    ],
    watchFor: 'Lifting the whole shape on every change kills the common tones. That is a catalog, not a progression.'
  },
  {
    id: 'th-chrom-voice',
    title: 'Chromatic voice leading',
    level: 'advanced',
    unit: 'Advanced harmony',
    summary: 'A voice walks by half step into a guide tone. The accidental lives on the and. Beat 1 is the real chord tone.',
    steps: [
      'Passing: connect two chord tones. Neighbor: leave and come home. Approach: last 8th into 3 or 7.',
      'Hold C, climb E-F-F#-G on the next string. F# is the paint.',
      'Line cliche: Am on top, bass A-G#-G-F#. Only one voice is chromatic.',
      'Two chromatic voices at once is planing. Different tool.',
      'Classroom lead-chrom-approach and rhy-chrom-cliche.'
    ],
    watchFor: 'If the sharp sits on beat 1, you missed the landing. Name the target before you play the extra fret.'
  },
  {
    id: 'th-sec-dom',
    title: 'Secondary dominants',
    level: 'advanced',
    unit: 'Jazz language',
    summary: 'V7 of a chord that is not I. In C, D7 points at G (V/V). E7 points at Am (V/vi). The extra note is a leading tone up into the target.',
    steps: [
      'V7/V in C is D7. F# leads to G.',
      'V7/vi is E7. G# leads to A.',
      'V7/IV is C7. Bb is the giveaway into F.',
      'This is not interchange. Interchange flattens color. Secondary raises a leading tone.',
      'Classroom rhy-sec-vofv and rhy-sec-vofvi.'
    ],
    watchFor: 'If the 7 has no leading tone, it is not pointing. Name five of whatever before you strum.'
  },
  {
    id: 'th-sec-min',
    title: 'Secondary dominants in minor',
    level: 'advanced',
    unit: 'Jazz language',
    summary: 'In A minor, E7 to Am is primary V, not secondary. Secondary points at iv, V, VI, III. A7 to Dm is V7/iv. B7 to E7 is V7/V.',
    steps: [
      'Harmonic minor already owns G# for E7. That is furniture.',
      'C# before Dm means you fired V7/iv.',
      'D# before E7 means you fired V7/V.',
      'G7 to C in an A minor tune is V7/III, the relative major, not a new home unless you stay.',
      'Classroom rhy-min-vofiv and rhy-min-vofv.'
    ],
    watchFor: 'Do not label E7-Am as secondary. Save that word for the extra arrows.'
  },
  {
    id: 'th-tritone-min',
    title: 'Tritone sub into i',
    level: 'advanced',
    unit: 'Jazz language',
    summary: 'Bb7 can stand in for E7 into Am. They share G#/Ab and D. Same squeeze, bass a tritone away. Bass often walks B-Bb-A.',
    steps: [
      'E7 and Bb7 share the tritone G#/Ab + D. That is why the swap works.',
      'Roman: subV or bII7. Not bVII. G is bVII. Bb is bII.',
      'iiø-subV-i is Bm7b5-Bb7-Am.',
      'Eb7 into Dm is the sub of V7/iv. F7 into E7 is the sub of V7/V.',
      'Classroom rhy-tritone-i and lead-tritone-251.'
    ],
    watchFor: 'A Bb triad without Ab is Phrygian color, not a tritone sub. The 7th and the resolution decide.'
  }
];
