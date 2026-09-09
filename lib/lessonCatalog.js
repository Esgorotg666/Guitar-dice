var LEVELS = ['entry', 'intermediate', 'advanced', 'master'];

var LEVEL_TIER = {
  entry: 'free',
  intermediate: 'premium',
  advanced: 'extreme',
  master: 'extreme'
};

var UNITS = [
  { id: 'start', title: 'Day 1 setup', blurb: 'Hold, strings, tune, Em and G.', test: /day1-/, capstone: 'cap-start', minLevel: 'entry' },
  { id: 'fingering', title: 'Fingering techniques', blurb: 'Independence, spiders, crossovers.', test: /spider|hand-|cross|stretch|study-chrom/, capstone: 'cap-fingering', minLevel: 'entry' },
  { id: 'chords', title: 'Open chords and changes', blurb: 'Full shapes plus a connecting walk.', test: /^ac-1$|ac-e4|day1-em|day1-g|day1-switch/, capstone: 'cap-chords', minLevel: 'entry' },
  { id: 'barre', title: 'Barre chords', blurb: 'Index barre, mini F, full F, Bm.', test: /barre-/, capstone: 'cap-barre', minLevel: 'entry' },
  { id: 'legato', title: 'Hammer-ons, pull-offs, slides', blurb: 'Legato that connects boxes.', test: /lead-pent|lead-slide|lead-legato|lead-fifth|study-legato/, capstone: 'cap-legato', minLevel: 'entry' },
  { id: 'rhythm', title: 'Rhythm skills', blurb: 'Palm mute, chuck, boom-chick, 16ths.', test: /rhy-pm|rhy-funk|rhy-country|rhy-folk|ac-2|study-gallop|study-drone-climb|study-bm-trem/, capstone: 'cap-rhythm', minLevel: 'entry' },
  { id: 'lead', title: 'Lead guitar skills', blurb: 'Alternate picking, bends, vibrato.', test: /lead-alt|lead-bend|vib|lead-rh-|study-cmaj/, capstone: 'cap-lead', minLevel: 'entry' },
  { id: 'progressions', title: 'Chord progressions', blurb: 'I-IV-V, relatives, circle of fifths.', test: /145-clock|251-clock|cycle-walk|rel-minor|circle/, capstone: 'cap-progressions', minLevel: 'entry' },
  { id: 'bridging', title: 'Bridging and voice leading', blurb: 'Walks that land on the next chord.', test: /bridge|walk|guide-251|chrom-approach|chrom-cliche/, capstone: 'cap-bridging', minLevel: 'intermediate' },
  { id: 'arpeggio', title: 'Arpeggios and rolls', blurb: 'Broken chords that follow the change.', test: /am-roll|aed|roll-aed|lead-a7|lead-cmaj|arpeg|study-aed|study-arp|study-drone-hymn|study-campanella/, capstone: 'cap-arpeggio', minLevel: 'intermediate' },
  { id: 'harmonics', title: 'Harmonics', blurb: 'Natural chimes at 5, 7, and 12.', test: /harmonic/, capstone: 'cap-harmonics', minLevel: 'intermediate' },
  { id: 'solo', title: 'Solo building', blurb: 'Box, target tone, then a full chorus.', test: /solo|pent-1|lead-slide/, capstone: 'cap-solo', minLevel: 'intermediate' },
  { id: 'theory', title: 'Music theory on the neck', blurb: 'Modes, interchange, dominants, planing.', test: /borrow|b6-b7|plane-|pivot|sec-vof|min-vof|tritone|quartal|neck-|caged|3nps/, capstone: 'cap-theory', minLevel: 'advanced' },
  { id: 'rh', title: 'Right hand', blurb: 'Pick stroke, i-m, inside and outside.', test: /lead-rh-|ac-im-|ac-finger|study-pima|study-bass-treble/, capstone: 'cap-lead', minLevel: 'entry' }
];

var UNIT_PLANS = {
  more: {
    minutes: 12,
    bpm: 72,
    startId: null,
    blocks: [
      'Open one folder. Finish its lessons before you hop.',
      'Play the finale only after the folder lessons are clean.',
      'Record the finale once. That is the test.'
    ],
    stop: 'One folder today.'
  }
};

export function unitFor(lesson) {
  var id = String((lesson && lesson.id) || lesson || '');
  if (String((lesson && lesson.folder) || '')) {
    var forced = UNITS.filter(function (u) { return u.id === lesson.folder; })[0];
    if (forced) return forced;
  }
  var blob = id + ' ' + String((lesson && lesson.title) || '') + ' ' + String((lesson && lesson.skill) || '');
  for (var i = 0; i < UNITS.length; i++) {
    if (UNITS[i].test.test(blob) || UNITS[i].test.test(id)) return UNITS[i];
  }
  return { id: 'more', title: 'More practice', blurb: 'Useful work that does not sit on a named track yet.', capstone: null };
}

export function planFor(unit) {
  return UNIT_PLANS[(unit && unit.id) || unit] || UNIT_PLANS.more;
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

export function levelAllowed(level, tier) {
  var need = LEVEL_TIER[level] || 'extreme';
  if (need === 'free') return true;
  var t = String(tier || 'free').toLowerCase();
  if (need === 'premium') return t === 'premium' || t === 'extreme';
  return t === 'extreme';
}

export { UNITS, LEVELS, UNIT_PLANS, LEVEL_TIER };
