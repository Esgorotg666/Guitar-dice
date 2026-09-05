/** Left-hand fingers: 1 index, 2 middle, 3 ring, 4 pinky. Array is E A D G B e. */
export const CHORD_FINGERS = {
  Em: [null, 2, 3, null, null, null],
  E: [null, 2, 3, 1, null, null],
  Am: [null, null, 2, 3, 1, null],
  A: [null, null, 1, 2, 3, null],
  C: [null, 3, 2, null, 1, null],
  D: [null, null, null, 1, 3, 2],
  G: [3, 2, null, null, null, 4],
  F: [1, 3, 4, 2, 1, 1],
  Dm: [null, null, null, 2, 3, 1],
  E7: [null, 2, null, 1, null, null],
  A7: [null, null, 1, null, 3, null],
  G7: [3, 2, null, null, null, 1],
  C7: [null, 3, 2, 4, 1, null],
  B7: [null, 2, 1, 3, null, 4]
};

export const FINGER_NAMES = {
  1: 'index',
  2: 'middle',
  3: 'ring',
  4: 'pinky'
};

export function fingersFor(chord) {
  if (!chord) return null;
  const key = chord.key || chord.name || '';
  if (CHORD_FINGERS[key]) return CHORD_FINGERS[key];
  const name = String(chord.name || '').trim();
  if (CHORD_FINGERS[name]) return CHORD_FINGERS[name];
  const short = name.replace(/major/i, '').replace(/minor/i, 'm').trim();
  return CHORD_FINGERS[short] || null;
}

export function placementLines(chord) {
  const fingers = fingersFor(chord);
  const positions = (chord && chord.positions) || [];
  const strings = ['low E', 'A', 'D', 'G', 'B', 'high E'];
  if (!fingers) return [];
  const lines = [];
  fingers.forEach(function (finger, i) {
    if (!finger) return;
    const fret = positions[i];
    lines.push(
      FINGER_NAMES[finger] + ' (' + finger + ') on the ' + strings[i] + ' string, fret ' + fret
    );
  });
  return lines;
}
