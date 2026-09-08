import { OPEN_PC, pitchClass } from './theory';

export function scaleRunNotes(root, mode) {
  if (!mode || !mode.intervals) return [];
  const rp = pitchClass(root || 'A');
  const notes = [];
  const want = {};
  mode.intervals.forEach(function (iv) { want[iv % 12] = true; });
  OPEN_PC.forEach(function (open, s) {
    var found = 0;
    var f;
    for (f = 0; f <= 14 && found < 2; f++) {
      const iv = (open + f - rp + 120) % 12;
      if (!want[iv]) continue;
      notes.push({ string: s, fret: f, beats: 0.5, role: 'line' });
      found += 1;
    }
  });
  return notes;
}

export function moveItem(list, from, dir) {
  const next = (list || []).slice();
  const to = from + dir;
  if (from < 0 || to < 0 || to >= next.length) return next;
  const tmp = next[from];
  next[from] = next[to];
  next[to] = tmp;
  return next;
}
