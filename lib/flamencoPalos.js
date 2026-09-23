function n(string, fret, beats, pick, tech, group, role, label) {
  var o = { string: string, fret: fret, beats: beats || 1, pick: pick || 'D', group: group, role: role || 'line' };
  if (tech && tech.length) o.tech = tech;
  if (label) o.groupLabel = label;
  return o;
}
function chord(frets, group, label, beats, tech) {
  var b = beats || 2;
  var t = tech || ['rasgueado'];
  return frets.map(function (fret, string) {
    if (fret === 'x' || fret === 'X') return null;
    return n(string, fret, b, 'D', t, group, 'chord', string === 0 ? label : null);
  }).filter(Boolean);
}

function palo(id, data) {
  return Object.assign({
    id: id,
    style: 'rhythm',
    genre: 'flamenco',
    track: 'flamenco',
    folder: 'flamenco',
    skill: data.palo || 'palo'
  }, data);
}

export const FLAMENCO_LESSONS = [
  palo('fla-clap-12', {
    title: 'Palmas: 12 vs 4',
    level: 'entry',
    palo: 'compas',
    key: 'none',
    bpm: 72,
    summary: 'No guitar. Clap four-count tangos, then the soleá 12: accents on 3, 6, 8, 10, 12. Group 3+3+2+2+2. This is the skeleton every later palo hangs on.',
    watchFor: 'Do not clap every beat the same volume. 3, 6, 8, 10, 12 are the hits.',
    goals: ['Hear 4-count vs 12-count.', 'Accents land without a guitar.', 'Count 12 out loud once per cycle.'],
    steps: [
      'Clap 1 2 3 4. Accent 2 and 4. That is tangos.',
      'Count 1 through 12 slowly. Clap only 3, 6, 8, 10, 12.',
      'Say the grouping: three, three, two, two, two.',
      'Four clean 12-cycles. If you lose 10, start over.'
    ],
    notes: [
      n(4, 0, 1, 'D', ['golpe'], 0, 'line', 'clap 3'),
      n(4, 0, 1, 'D', ['golpe'], 1, 'line', 'clap 6'),
      n(4, 0, 1, 'D', ['golpe'], 2, 'line', 'clap 8'),
      n(4, 0, 1, 'D', ['golpe'], 3, 'line', 'clap 10'),
      n(4, 0, 1, 'D', ['golpe'], 4, 'line', 'clap 12')
    ],
    failIf: 'All twelve beats get the same clap.'
  }),
  palo('fla-tangos-medio', {
    title: 'Tangos por medio',
    level: 'entry',
    palo: 'tangos',
    key: 'A phrygian',
    bpm: 108,
    chords: ['Dm', 'C', 'Bb', 'A'],
    summary: '4-count flamenco, not Argentine tango. Por medio cadence Dm–C–Bb–A. Short rasgueado on each chord. Accent 2 and 4.',
    watchFor: 'Do not turn this into a 4/4 rock strum on beat 1. 2 and 4 carry it.',
    goals: ['Por medio chords in order.', 'Rasgueado stays short.', 'Four cycles without rushing the A.'],
    steps: [
      'Shapes: Dm open, C open, Bb (A-shape at 1), A open or A add b9 (barre 0 + F on B).',
      'Two beats each chord. Down rasgueado, mute the leftover.',
      'Tap foot on 2 and 4.',
      'After four cycles, freeze on A. That is the I.'
    ],
    notes: chord(['x', 0, 2, 2, 1, 0], 0, 'Dm', 2)
      .concat(chord(['x', 3, 2, 0, 1, 0], 1, 'C', 2))
      .concat(chord(['x', 1, 3, 3, 3, 1], 2, 'Bb', 2))
      .concat(chord(['x', 0, 2, 2, 2, 0], 3, 'A', 2)),
    failIf: 'Accents land on 1 and 3.',
    diceHook: 'Roll tangos por medio. Play 4 cycles.'
  }),
  palo('fla-sevillanas', {
    title: 'Sevillanas copla pulse',
    level: 'entry',
    palo: 'sevillanas',
    key: 'E',
    bpm: 100,
    chords: ['E', 'B7', 'A'],
    summary: 'Folk 3/4 that sits next to flamenco. Four phrases of three. Rasgueado on the down of each bar. Not cante jondo — form and right hand only.',
    watchFor: 'Do not flatten it into 4/4. Each bar is three.',
    goals: ['Feel four groups of 3.', 'Rasgueado on beat 1 of each bar.', 'Change on the phrase, not mid-bar.'],
    steps: [
      'Count 1-2-3 four times. That is one copla skeleton.',
      'E for phrase 1, B7 for phrase 2, A then E for 3 and 4.',
      'Thumb plants the bass on 1. Fingers fill 2 and 3.',
      'Stop after one copla. Do not fake all four danced coplas yet.'
    ],
    notes: chord([0, 2, 2, 1, 0, 0], 0, 'E', 3)
      .concat(chord(['x', 2, 1, 2, 0, 2], 1, 'B7', 3))
      .concat(chord(['x', 0, 2, 2, 2, 0], 2, 'A', 3))
      .concat(chord([0, 2, 2, 1, 0, 0], 3, 'E', 3)),
    failIf: 'You count four in each bar.'
  }),
  palo('fla-solea-arriba', {
    title: 'Soleá por arriba — accents only',
    level: 'intermediate',
    palo: 'solea',
    key: 'E phrygian',
    bpm: 80,
    chords: ['Am', 'G', 'F', 'E'],
    summary: 'Mother 12-count. Por arriba: Am G F E(add b9). Guitar hits the accents 3-6-8-10-12. No falseta yet. Cierre is 10 then 12 on E.',
    watchFor: 'If you accent 1 like a waltz, it is not soleá.',
    goals: ['Accents 3 6 8 10 12.', 'Cadence ends on E, not Am.', 'E has the F on the G or B string (b9 color).'],
    steps: [
      'Hold Am. Count 1-2, hit on 3. Count 4-5, hit on 6.',
      'Walk Am (3) G (6) F (8) E (10) E (12).',
      'Add the b9: E chord plus F on the G string fret 3 or B string fret 1.',
      'Four cycles. Fail the take if beat 10 is late.'
    ],
    notes: chord(['x', 0, 2, 2, 1, 0], 0, 'Am @3', 3)
      .concat(chord([3, 2, 0, 0, 0, 3], 1, 'G @6', 3))
      .concat(chord([1, 3, 3, 2, 1, 1], 2, 'F @8', 2))
      .concat(chord([0, 2, 2, 1, 0, 0], 3, 'E @10', 2))
      .concat(chord([0, 2, 2, 3, 0, 0], 4, 'E b9 @12', 2)),
    failIf: 'Cierre misses beat 10.',
    diceHook: 'Roll solea + por arriba.'
  }),
  palo('fla-alegrias', {
    title: 'Alegrías — major 12 + silencio',
    level: 'intermediate',
    palo: 'alegrias',
    key: 'E major',
    bpm: 126,
    chords: ['E', 'B7', 'A', 'Am'],
    summary: 'Same 12-count as soleá, opposite color. Cádiz major. One cycle in E major, then one silencio bar in Am. Bright, then the dip.',
    watchFor: 'Do not play Phrygian F-E here. Alegrías lives in major until silencio.',
    goals: ['Major I-V on a 12 grid.', 'Silencio flips to Am for one cycle.', 'Come back to E without rushing 12.'],
    steps: [
      'E and B7 on the same 3-6-8-10-12 hits as soleá.',
      'Keep it major: E, B7, A, E.',
      'Next cycle: Am instead of E for the middle hits. That is silencio color.',
      'Last hit of the page is E again.'
    ],
    notes: chord([0, 2, 2, 1, 0, 0], 0, 'E', 3)
      .concat(chord(['x', 2, 1, 2, 0, 2], 1, 'B7', 3))
      .concat(chord(['x', 0, 2, 2, 2, 0], 2, 'A', 2))
      .concat(chord([0, 2, 2, 1, 0, 0], 3, 'E', 4))
      .concat(chord(['x', 0, 2, 2, 1, 0], 4, 'Am silencio', 4)),
    failIf: 'You use F major as if this were soleá.'
  }),
  palo('fla-fandango', {
    title: 'Fandango de Huelva — four threes',
    level: 'intermediate',
    palo: 'fandango',
    key: 'E',
    bpm: 132,
    chords: ['E', 'Am', 'G', 'F'],
    summary: 'Not 12-amalgama. Four phrases of 3. Folk-into-flamenco. Harmony can mix major and Phrygian; keep the four-times-three grid honest.',
    watchFor: 'Do not slide into soleá accents. This grid is 3+3+3+3.',
    goals: ['Four equal groups of 3.', 'Chord change on phrase starts.', 'Rasgueado short on 1 of each 3.'],
    steps: [
      'Count 123 123 123 123. Clap 1 of each group.',
      'Phrase 1 E, 2 Am, 3 G, 4 F then back toward E.',
      'Thumb bass on each 1.',
      'Two full cycles. Stop.'
    ],
    notes: chord([0, 2, 2, 1, 0, 0], 0, 'E', 3)
      .concat(chord(['x', 0, 2, 2, 1, 0], 1, 'Am', 3))
      .concat(chord([3, 2, 0, 0, 0, 3], 2, 'G', 3))
      .concat(chord([1, 3, 3, 2, 1, 1], 3, 'F', 3)),
    failIf: 'You accent 8 and 10 like soleá.'
  }),
  palo('fla-solea-falseta', {
    title: 'Soleá falseta + cierre',
    level: 'master',
    palo: 'solea',
    key: 'E phrygian',
    bpm: 84,
    chords: ['Am', 'G', 'F', 'E'],
    summary: 'One 12-cycle of rasgueado, one 4-bar thumb falseta, then cierre on 10-12. Master means the fill still lands on E at 10. Miss 10 and the cycle is trash.',
    watchFor: 'Falseta that blows past 10. Cut notes. Hit E.',
    goals: ['Rasgueado cycle stays in compás.', 'Pulgar falseta is even.', 'Cierre on 10 then 12.'],
    steps: [
      'Play one accent-only soleá cycle from the intermediate lesson.',
      'Falseta: pulgar on A and D strings, Am tones, four beats, then G-F walk.',
      'Beat 10 is E. Beat 12 is E with golpe.',
      'If 10 is late, loop only beats 8-12 ten times.'
    ],
    notes: [
      n(4, 0, 0.5, 'p', ['pulgar'], 0, 'line', 'A open'),
      n(3, 2, 0.5, 'p', ['pulgar'], 0, 'line', 'D2'),
      n(4, 2, 0.5, 'p', ['pulgar'], 0, 'line', 'A2'),
      n(3, 2, 0.5, 'p', ['pulgar'], 0, 'line', 'D2'),
      n(4, 0, 1, 'p', ['pulgar'], 1, 'line', 'A'),
      n(2, 0, 1, 'i', ['ligado'], 1, 'line', 'G open'),
      n(5, 1, 2, 'D', ['rasgueado'], 2, 'chord', 'F'),
      n(5, 0, 2, 'D', ['golpe'], 3, 'chord', 'E @10'),
      n(5, 0, 2, 'D', ['golpe'], 4, 'chord', 'E @12')
    ],
    failIf: 'Cierre misses beat 10.',
    diceHook: 'Roll two chords. Connect with Am G F E and land on 10.'
  }),
  palo('fla-bulerias', {
    title: 'Bulerías por medio from 12',
    level: 'master',
    palo: 'bulerias',
    key: 'A phrygian',
    bpm: 180,
    chords: ['A', 'Bb', 'C', 'Dm'],
    summary: 'Same 12 skeleton as soleá, twice as fast, counted from 12. Por medio. Golpe on the al-golpe hits. Party palo. If you cannot clap it, do not play it.',
    watchFor: 'Starting the count on 1 like a march. 12 is the downbeat.',
    goals: ['Count 12-1-2 as the pickup into 3.', 'Golpe without killing the chord.', 'Cierre still on 10-12.'],
    steps: [
      'Clap 12, 3, 6, 8, 10 at 180. No guitar.',
      'A add b9 is home. Bb and C are the climb. Dm is the iv.',
      'Golpe with the anular on the golpeador after the rasgueado on 3 and 10.',
      'Two cycles only. Speed without 10 is noise.'
    ],
    notes: chord(['x', 0, 2, 2, 2, 0], 0, 'A @12', 2, ['rasgueado', 'golpe'])
      .concat(chord(['x', 1, 3, 3, 3, 1], 1, 'Bb @3', 3, ['rasgueado']))
      .concat(chord(['x', 3, 2, 0, 1, 0], 2, 'C @6', 3, ['rasgueado']))
      .concat(chord(['x', 0, 2, 2, 1, 0], 3, 'Dm @8', 2, ['rasgueado']))
      .concat(chord(['x', 0, 2, 2, 2, 0], 4, 'A @10-12', 2, ['golpe'])),
    failIf: 'You accent 1 as the downbeat.',
    diceHook: 'Extreme: roll bulerias + por medio.'
  }),
  palo('fla-siguiriya', {
    title: 'Siguiriya — accent flip',
    level: 'master',
    palo: 'siguiriya',
    key: 'E phrygian',
    bpm: 70,
    chords: ['E', 'F', 'G', 'Am'],
    summary: 'Still 12, not soleá. Feel 2+2+3+3+2. Heavy silences. Tragic. If it sounds like slow soleá you failed the palo, not the tempo.',
    watchFor: 'Putting the big hit on 3-6-8-10-12. Siguiriya does not walk that way.',
    goals: ['Group 2+2+3+3+2.', 'Leave air in the long cells.', 'Resolve to E, not Am.'],
    steps: [
      'Tap: short short, long, long, short.',
      'Chords on the five cells: E, F, G, Am, E.',
      'Do not fill the long cells with extra rasgueado.',
      'One line. Stop. This palo is not a speed run.'
    ],
    notes: chord([0, 2, 2, 1, 0, 0], 0, 'E 2', 2)
      .concat(chord([1, 3, 3, 2, 1, 1], 1, 'F 2', 2))
      .concat(chord([3, 2, 0, 0, 0, 3], 2, 'G 3', 3))
      .concat(chord(['x', 0, 2, 2, 1, 0], 3, 'Am 3', 3))
      .concat(chord([0, 2, 2, 1, 0, 0], 4, 'E 2', 2)),
    failIf: 'You accent it like soleá.'
  }),
  palo('cap-flamenco', {
    title: 'Palo change: soleá into tangos',
    level: 'master',
    palo: 'mix',
    capstone: true,
    key: 'E to A',
    bpm: 96,
    chords: ['Am', 'G', 'F', 'E', 'Dm', 'A'],
    summary: 'Finale. Two 12-cycles por arriba, then drop into 4-count tangos por medio. Same left-hand cadence family, different grid. That is the test.',
    watchFor: 'Dragging 12-feel into the tangos. When you switch, 2 and 4 take over.',
    goals: ['Two palos, one sitting.', 'Grid change is obvious.', 'Both cierres land.'],
    steps: [
      'Soleá accents, two cycles, cierre on 10-12.',
      'Hard cut. Tangos at the same BPM feeling twice as wide.',
      'Por medio Dm C Bb A, four cycles.',
      'Record. If a friend cannot tell the switch, you failed.'
    ],
    notes: chord(['x', 0, 2, 2, 1, 0], 0, 'Am solea', 3)
      .concat(chord([3, 2, 0, 0, 0, 3], 1, 'G', 3))
      .concat(chord([1, 3, 3, 2, 1, 1], 2, 'F', 2))
      .concat(chord([0, 2, 2, 1, 0, 0], 3, 'E cierre', 4))
      .concat(chord(['x', 0, 2, 2, 1, 0], 4, 'Dm tangos', 2))
      .concat(chord(['x', 0, 2, 2, 2, 0], 5, 'A tangos', 2)),
    failIf: 'The 4-count still accents like 12.'
  })
];
