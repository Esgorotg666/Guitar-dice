export function sanitiseMusic(data) {
  if (!data || !data.chords) return data;
  const chords = {};
  Object.keys(data.chords).forEach(function (key) {
    const src = data.chords[key] || {};
    const next = {
      name: src.name,
      positions: Array.isArray(src.positions) ? src.positions.slice(0, 6) : src.positions
    };
    if (src.fret != null) next.fret = src.fret;
    chords[key] = next;
  });
  return { chords: chords, modes: data.modes || [] };
}
