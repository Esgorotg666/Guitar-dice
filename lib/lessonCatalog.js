var LEVELS = ['entry', 'intermediate', 'advanced', 'master'];

var UNITS = [
  { id: 'rh', title: 'Right hand', blurb: 'Pick stroke, i-m, inside and outside.', test: /lead-alt|lead-rh-|ac-im-|ac-finger/ },
  { id: 'spider', title: 'Finger independence', blurb: '1-3-2-4 spiders and stretches.', test: /spider/ },
  { id: 'legato', title: 'Legato and slides', blurb: 'Hammer-ons, pull-offs, position shifts.', test: /lead-pent|lead-slide|lead-legato|lead-fifth/ },
  { id: 'vib', title: 'Vibrato and bends', blurb: 'Delay, width, and shake after the note.', test: /vib|lead-bend/ },
  { id: 'circle', title: 'Circle of fifths', blurb: 'I-IV-V, relatives, and ii-V-I.', test: /145-clock|251-clock|cycle-walk|rel-minor|circle/ },
  { id: 'harmony', title: 'Advanced harmony', blurb: 'Interchange, planing, dominants, and voice leading.', test: /borrow|b6-b7|plane-|guide-251|pivot-camg|chrom-approach|chrom-cliche|sec-vof|min-vof|tritone|quartal/ },
  { id: 'changes', title: 'Playing the changes', blurb: 'Arpeggios and lines that follow chords.', test: /lead-a7|lead-cmaj|am-roll|aed|roll-aed/ },
  { id: 'groove', title: 'Groove and mute', blurb: 'Palm mute, 16ths, boom-chick, chuck.', test: /rhy-pm|rhy-funk|rhy-country|rhy-folk|ac-2|harm-min|drone/ },
  { id: 'chords', title: 'Chord changes', blurb: 'Full shapes and connecting scale.', test: /^ac-1$|ac-e4|rhy-aed/ },
  { id: 'neck', title: 'Neck systems', blurb: 'CAGED, 3NPS, and position work.', test: /^neck-|caged|3nps|cmaj-work/ },
  { id: 'micro', title: 'Ear and microtones', blurb: 'Quarter-tone and interval drills.', test: /micro|quarter|interval/ }
];

var UNIT_PLANS = {
  rh: {
    minutes: 12,
    bpm: 72,
    startId: 'lead-rh-open',
    blocks: [
      '4 min — Open-string D-U motor at 72. Eight clean loops before you fret anything.',
      '4 min — Two notes per string up and back. The crossing is the lesson.',
      '4 min — Outside cell, then the same frets as an inside cell. Feel the wrist change.'
    ],
    stop: 'If an upstroke disappears, stay on the motor. Do not jump to odd groupings today.'
  },
  spider: {
    minutes: 12,
    bpm: 56,
    startId: 'lead-spider-134',
    blocks: [
      '6 min — 1-3-2-4 on each string, frets 3-5-4-6, at 56. Name the finger out loud.',
      '4 min — Staggered spider across strings if the close cell is even.',
      '2 min — Stop. Stretch only if the wrist is flat and nothing hurts.'
    ],
    stop: 'A dead pinky means slow down, not skip ahead to the wide stretch.'
  },
  legato: {
    minutes: 12,
    bpm: 72,
    startId: 'lead-pent-1',
    blocks: [
      '5 min — G minor pent box 1. Pick only the first note of each hammer pair.',
      '4 min — Slide that connects box 1 to box 2. Do not pick the arrival.',
      '3 min — Fifth two ways: same string, then across strings. Sing the target first.'
    ],
    stop: 'If hammers thud, drop 8 BPM before you add the slide.'
  },
  vib: {
    minutes: 12,
    bpm: 66,
    startId: 'lead-vib-1',
    blocks: [
      '4 min — Hold still two beats, then shake two beats. Width stays the same.',
      '4 min — Bend G7 a whole step to A. Vibrato only after the bend is in tune.',
      '4 min — One pass wide blues, one pass tight rock. Do not mix the rates.'
    ],
    stop: 'If the shake starts on the pick, go back to the hold-still lesson.'
  },
  circle: {
    minutes: 12,
    bpm: 80,
    startId: 'rhy-145-clock',
    blocks: [
      '4 min — I-IV-V at three hours: G-C-D, then D-G-A. Say I, IV, V on the change.',
      '4 min — Inner ring: G with Em, C with Am. Right hand never stops.',
      '4 min — Walk C-G-D-A-E root plus fifth, or ii-V-I if those hours are clean.'
    ],
    stop: 'Miss the new tonic on beat 1 and the clock did not turn. Fix the landing.'
  },
  harmony: {
    minutes: 12,
    bpm: 76,
    startId: 'rhy-sec-vofv',
    blocks: [
      '4 min — D7 to G or E7 to Am. The leading tone must speak.',
      '4 min — In Am: A7 to Dm or B7 to E7. E7 home is primary, not secondary.',
      '4 min — Bb7 for E7, or the D-G-C quartal rail. One tool.'
    ],
    stop: 'If the 7 has no leading tone (or Ab on a subV), you played a triad with a new name. Fix the inner notes.'
  },
  changes: {
    minutes: 12,
    bpm: 76,
    startId: 'ac-am-roll',
    blocks: [
      '5 min — One right-hand roll through Am Dm E C. Change on 1 with no hole.',
      '4 min — A E D driving rhythm or rolling arpeggios. Chord tones on the beat.',
      '3 min — Play the changes line if unlocked. Land the chord tone, walk between.'
    ],
    stop: 'Scale notes are the walk. If beat 1 is a random scale tone, you missed the change.'
  },
  groove: {
    minutes: 12,
    bpm: 92,
    startId: 'rhy-pm-1',
    blocks: [
      '5 min — Palm-muted E5-G5-A5. Mute stays on through the move. Open the last hit.',
      '4 min — Funk 16ths on E9. Accents on 2 and 4. The hand never pauses.',
      '3 min — Boom-chick or bass-strum if that path is open. Bass on 1 and 3.'
    ],
    stop: 'If the chord rings when it should chug, fix the palm before you add 16ths.'
  },
  chords: {
    minutes: 12,
    bpm: 80,
    startId: 'ac-1',
    blocks: [
      '5 min — Full G, C, D shapes. Hold the chord, then a connecting scale into the next one.',
      '4 min — Change without stopping the right hand.',
      '3 min — One recorded pass. Fix the first late change, then stop.'
    ],
    stop: 'Do not pick the chord one string at a time. That is not the lesson.'
  },
  neck: {
    minutes: 12,
    bpm: 70,
    startId: 'lead-cmaj-work',
    blocks: [
      '5 min — One C major position until you can name every note.',
      '4 min — Shift to the next position with a slide or shared note.',
      '3 min — Same idea in the key you rolled today, not only C.'
    ],
    stop: 'If you are hunting dots, stay in one box. Do not run the whole neck dirty.'
  },
  micro: {
    minutes: 12,
    bpm: 60,
    startId: null,
    blocks: [
      '4 min — Play the written pitch, then a quarter-step above, then back.',
      '4 min — Match the app tone. If you cannot hear the in-between, stop adding width.',
      '4 min — Resolve to a scale tone so the ear has a home.'
    ],
    stop: 'This is ear work. Speed is not the point.'
  },
  more: {
    minutes: 12,
    bpm: 72,
    startId: null,
    blocks: [
      '4 min — Hands only, no tempo, on the first unlocked lesson in this folder.',
      '5 min — Half the written BPM, four clean loops.',
      '3 min — Written tempo if it stayed clean. Record one pass.'
    ],
    stop: 'One folder today. Do not sample five lessons for thirty seconds each.'
  }
};

export function unitFor(lesson) {
  var id = String((lesson && lesson.id) || lesson || '');
  var blob = id + ' ' + String((lesson && lesson.title) || '') + ' ' + String((lesson && lesson.skill) || '');
  for (var i = 0; i < UNITS.length; i++) {
    if (UNITS[i].test.test(blob) || UNITS[i].test.test(id)) return UNITS[i];
  }
  return { id: 'more', title: 'More practice', blurb: 'Useful work that does not sit on a named track yet.' };
}

export function planFor(unit) {
  var id = (unit && unit.id) || unit || 'more';
  return UNIT_PLANS[id] || UNIT_PLANS.more;
}

export function groupByUnit(list) {
  var buckets = {};
  var order = UNITS.map(function (u) { return u.id; }).concat(['more']);
  (list || []).forEach(function (l) {
    var u = unitFor(l);
    if (!buckets[u.id]) buckets[u.id] = { unit: u, lessons: [] };
    buckets[u.id].lessons.push(l);
  });
  return order.filter(function (id) { return buckets[id]; }).map(function (id) { return buckets[id]; });
}

export function filterLessons(list, level) {
  if (!level || level === 'all') return list || [];
  return (list || []).filter(function (l) { return l.level === level; });
}

export { UNITS, LEVELS, UNIT_PLANS };
