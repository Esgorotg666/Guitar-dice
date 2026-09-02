import { NOTE_NAMES, FLAT_MAP } from './theory';

export const MODE_IVLS = {
  ionian: [0,2,4,5,7,9,11],
  major: [0,2,4,5,7,9,11],
  dorian: [0,2,3,5,7,9,10],
  phrygian: [0,1,3,5,7,8,10],
  lydian: [0,2,4,6,7,9,11],
  mixolydian: [0,2,4,5,7,9,10],
  aeolian: [0,2,3,5,7,8,10],
  minor: [0,2,3,5,7,8,10],
  locrian: [0,1,3,5,6,8,10],
  'major-pent': [0,2,4,7,9],
  'minor-pent': [0,3,5,7,10],
  blues: [0,3,5,6,7,10]
};

export const MODE_TITLE = {
  ionian: 'major',
  major: 'major',
  dorian: 'Dorian',
  phrygian: 'Phrygian',
  lydian: 'Lydian',
  mixolydian: 'Mixolydian',
  aeolian: 'natural minor',
  minor: 'natural minor',
  locrian: 'Locrian',
  'major-pent': 'major pentatonic',
  'minor-pent': 'minor pentatonic',
  blues: 'blues'
};

function rootPc(root) {
  const norm = FLAT_MAP[root] || root;
  const i = NOTE_NAMES.indexOf(norm);
  return i === -1 ? 0 : i;
}

export function scaleSpell(root, modeId) {
  const ivls = MODE_IVLS[modeId] || MODE_IVLS.ionian;
  const pc = rootPc(root);
  return ivls.map(function (step) { return NOTE_NAMES[(pc + step) % 12]; }).join(' ');
}

export function defaultScaleMode(lesson) {
  if (lesson && lesson.scaleMode) return lesson.scaleMode;
  const g = (lesson && lesson.genre) || '';
  if (g === 'blues') return 'mixolydian';
  if (g === 'metal' || g === 'neo-classical') return 'aeolian';
  if (g === 'jazz') return lesson && lesson.style === 'lead' ? 'dorian' : 'mixolydian';
  if (g === 'funk') return 'dorian';
  return 'ionian';
}

export function scaleCaption(lesson) {
  if (lesson && lesson.scaleLabel) return lesson.scaleLabel;
  const root = (lesson && (lesson.scaleRoot || lesson.key)) || 'C';
  const modeId = defaultScaleMode(lesson);
  const title = MODE_TITLE[modeId] || modeId;
  return root + ' ' + title + ' \u00b7 ' + scaleSpell(root, modeId);
}
