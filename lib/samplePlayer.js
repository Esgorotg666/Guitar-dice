// Sample player for DGCFAD tuning recordings
// Loads WAV samples and plays the closest match for string+fret

const SAMPLE_BASE = '/samples/';
let sampleCache = {};
let map = null;

async function loadMap() {
  if (map) return map;
  try {
    const r = await fetch(SAMPLE_BASE + 'map.json');
    if (!r.ok) return null;
    map = await r.json();
    return map;
  } catch (e) { return null; }
}

async function loadSample(file) {
  if (sampleCache[file]) return sampleCache[file];
  try {
    const r = await fetch(SAMPLE_BASE + file);
    if (!r.ok) return null;
    const buf = await r.arrayBuffer();
    const c = window.AudioContext || window.webkitAudioContext;
    if (!c) return null;
    const ctx = new c();
    const audio = await ctx.decodeAudioData(buf);
    sampleCache[file] = audio;
    return audio;
  } catch (e) { return null; }
}

export async function playSample(stringIdx, fret, when, dest) {
  const m = await loadMap();
  if (!m) return false;
  const hit = m.filter(function (x) { return x.string === stringIdx && x.fret === fret; })[0];
  if (!hit) return false;
  const audio = await loadSample(hit.file);
  if (!audio) return false;
  const c = dest && dest.context ? dest.context : (window.AudioContext && new window.AudioContext());
  if (!c) return false;
  const src = c.createBufferSource();
  src.buffer = audio;
  const g = c.createGain();
  g.gain.value = 0.7;
  src.connect(g);
  g.connect(dest || c.destination);
  src.start(when || c.currentTime);
  return true;
}

export async function hasSample(stringIdx, fret) {
  const m = await loadMap();
  if (!m) return false;
  return m.some(function (x) { return x.string === stringIdx && x.fret === fret; });
}
