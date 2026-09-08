import { rollProgression, rollScale } from './style';
import { scaleForChord } from './theory';
import { normaliseFace, FACES } from './diceFaces';
import { scaleRunNotes, moveItem } from './scaleRun';

export { moveItem, scaleRunNotes };

export function partLabel(face) {
  const id = normaliseFace(face);
  return (FACES[id] && FACES[id].label) || 'Verse';
}

export function assembleRoll(opts) {
  const slots = (opts.slots || []).map(normaliseFace);
  const n = Math.max(2, slots.length || opts.count || 4);
  while (slots.length < n) slots.push('verse');
  const rolled = rollProgression({
    style: opts.style,
    genre: opts.genre,
    skill: opts.skill,
    chords: opts.chords || {},
    count: n,
    avoid: opts.avoid || [],
    lockRoot: opts.lockRoot || '',
    lockMode: opts.lockMode || '',
    mixAll: true
  });
  const out = [];
  slots.forEach(function (face, i) {
    const c = rolled[i] || rolled[i % Math.max(1, rolled.length)];
    if (!c) return;
    const item = {
      kind: face === 'solo' ? 'solo' : 'chord',
      part: face,
      label: partLabel(face),
      chord: c,
      key: c.key
    };
    if (face === 'solo') {
      item.scale = scaleForChord(c.key, opts.modes) || rollScale({
        genre: opts.genre,
        skill: opts.skill,
        modes: opts.modes,
        lockRoot: opts.lockRoot,
        lockMode: opts.lockMode
      });
      item.run = item.scale ? scaleRunNotes(item.scale.root, item.scale.mode) : [];
    }
    out.push(item);
  });
  return out;
}

export function leadScaleFor(items, opts) {
  const solo = (items || []).filter(function (it) { return it.kind === 'solo' && it.scale; })[0];
  if (solo) return solo.scale;
  if (opts && opts.style === 'lead') {
    return rollScale({
      genre: opts.genre,
      skill: opts.skill,
      modes: opts.modes,
      lockRoot: opts.lockRoot,
      lockMode: opts.lockMode
    });
  }
  return null;
}
