var LEVELS = ['entry', 'intermediate', 'advanced', 'master'];

var UNITS = [
  { id: 'rh', title: 'Right hand', blurb: 'Pick stroke, i-m, inside and outside.', test: /lead-alt|lead-rh-|ac-im-|ac-finger/ },
  { id: 'spider', title: 'Finger independence', blurb: '1-3-2-4 spiders and stretches.', test: /spider/ },
  { id: 'legato', title: 'Legato and slides', blurb: 'Hammer-ons, pull-offs, position shifts.', test: /lead-pent|lead-slide|lead-legato|lead-fifth/ },
  { id: 'vib', title: 'Vibrato and bends', blurb: 'Delay, width, and shake after the note.', test: /vib|lead-bend/ },
  { id: 'circle', title: 'Circle of fifths', blurb: 'I-IV-V, relatives, and ii-V-I.', test: /145-clock|251-clock|cycle-walk|rel-minor|circle/ },
  { id: 'changes', title: 'Playing the changes', blurb: 'Arpeggios and lines that follow chords.', test: /lead-a7|lead-cmaj|am-roll|aed|roll-aed/ },
  { id: 'groove', title: 'Groove and mute', blurb: 'Palm mute, 16ths, boom-chick, chuck.', test: /rhy-pm|rhy-funk|rhy-country|rhy-folk|ac-2|harm-min|drone/ },
  { id: 'chords', title: 'Chord changes', blurb: 'Full shapes and connecting scale.', test: /^ac-1$|ac-e4|rhy-aed/ },
  { id: 'neck', title: 'Neck systems', blurb: 'CAGED, 3NPS, and position work.', test: /^neck-|caged|3nps|cmaj-work/ },
  { id: 'micro', title: 'Ear and microtones', blurb: 'Quarter-tone and interval drills.', test: /micro|quarter|interval/ }
];

export function unitFor(lesson) {
  var id = String((lesson && lesson.id) || lesson || '');
  var blob = id + ' ' + String((lesson && lesson.title) || '') + ' ' + String((lesson && lesson.skill) || '');
  for (var i = 0; i < UNITS.length; i++) {
    if (UNITS[i].test.test(blob) || UNITS[i].test.test(id)) return UNITS[i];
  }
  return { id: 'more', title: 'More practice', blurb: 'Useful work that does not sit on a named track yet.' };
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

export { UNITS, LEVELS };
