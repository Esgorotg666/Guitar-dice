export const NOTE_NAMES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
export const FLAT_MAP = { Db:'C#', Eb:'D#', Gb:'F#', Ab:'G#', Bb:'A#' };
export const OPEN_PC = [4,9,2,7,11,4];
export const LIB_ROOTS = ['A','Bb','B','C','C#','D','Eb','E','F','F#','G','Ab'];

export const CHORD_COLORS = [
  { name:'blue', dot:'#3b9dff', dim:'#1b4a75', text:'#04121f' },
  { name:'green', dot:'#35c46b', dim:'#1a5c36', text:'#04160c' },
  { name:'red', dot:'#ff5f5f', dim:'#7a2a2a', text:'#200404' },
  { name:'amber', dot:'#ffc65c', dim:'#7a5a1e', text:'#1f1503' },
  { name:'violet', dot:'#b57cff', dim:'#4d2f7a', text:'#150a24' },
  { name:'cyan', dot:'#4fd8e8', dim:'#1a5f68', text:'#04191c' },
  { name:'pink', dot:'#ff7ac0', dim:'#7a2f58', text:'#210714' }
];
export function chordColor(i) { return CHORD_COLORS[i % CHORD_COLORS.length]; }

export function pitchClass(root) {
  const norm = FLAT_MAP[root] || root;
  const i = NOTE_NAMES.indexOf(norm);
  return i === -1 ? 0 : i;
}
export function rootFromPc(pc) {
  const t = ((pc % 12) + 12) % 12;
  for (let i = 0; i < LIB_ROOTS.length; i++) if (pitchClass(LIB_ROOTS[i]) === t) return LIB_ROOTS[i];
  return null;
}
export function parseChordKey(key) {
  const clean = String(key || '').replace('_barre','');
  const m = clean.match(/^([A-G][b#]?)(.*)$/);
  if (!m) return { root:'C', suffix:'' };
  return { root:m[1], suffix:m[2] || '' };
}

const SCALE_MAP = {
  '': { mode:'ionian' }, 'maj7': { mode:'ionian' },
  'maj9': { mode:'lydian', note:'Lydian gives the bright #11 colour these voicings like.' },
  '6': { mode:'ionian' }, 'add9': { mode:'ionian' },
  'sus2': { mode:'mixolydian' }, 'sus4': { mode:'mixolydian' },
  'm': { mode:'aeolian' },
  'm7': { mode:'dorian', note:'Dorian is the standard choice - the natural 6th keeps it from sounding sad.' },
  'm9': { mode:'dorian' }, 'm11': { mode:'dorian' }, 'm13': { mode:'dorian' },
  'm6': { mode:'dorian', note:'The 6th in the chord is exactly what Dorian gives you.' },
  'mmaj7': { mode:'aeolian', note:'Melodic minor is the exact fit; Aeolian is close - raise the 7th as you play.' },
  '7': { mode:'mixolydian', note:'Mixolydian is the dominant sound - major with a flat 7th.' },
  '9': { mode:'mixolydian' }, '11': { mode:'mixolydian' }, '13': { mode:'mixolydian' },
  '7b9': { mode:'phrygian', note:'Phrygian dominant is the true fit; this shows the b9 clearly. Raise the 3rd.' },
  '7#9': { mode:'mixolydian', note:'The Hendrix chord. Mix in the minor 3rd as a blues note over this.' },
  '7#5': { mode:'mixolydian', note:'Whole tone is the exact match; use this and raise the 5th.' },
  '7b5': { mode:'locrian', note:'Approximate - keep the major 3rd from the chord itself.' },
  'dim': { mode:'locrian' },
  'dim7': { mode:'locrian', note:'The diminished scale is the exact fit; Locrian is the closest of the seven modes.' },
  'aug': { mode:'lydian', note:'Whole tone is the exact match; Lydian is close - raise the 5th as you play.' }
};

export function scaleForChord(key, modes) {
  const p = parseChordKey(key);
  const e = SCALE_MAP[p.suffix] || { mode:'ionian' };
  const mode = (modes || []).filter(function (m) { return m.id === e.mode; })[0];
  if (!mode) return null;
  return { root:p.root, mode:mode, note:e.note || null, suffix:p.suffix };
}

export function chordPitchClasses(positions) {
  const set = {};
  (positions || []).forEach(function (p, s) {
    if (p === 'X' || p === 'x' || p === undefined || p === null) return;
    set[(OPEN_PC[s] + p) % 12] = true;
  });
  return set;
}
function pcList(c) {
  const o = chordPitchClasses(c ? c.positions : []);
  return Object.keys(o).map(Number);
}

export function bridgeScale(prevChord, bridgeChord, nextChord, modes) {
  if (!bridgeChord || !modes || !modes.length) return null;
  const groups = [];
  if (prevChord) groups.push({ pcs:pcList(prevChord), weight:1 });
  groups.push({ pcs:pcList(bridgeChord), weight:3 });
  if (nextChord) groups.push({ pcs:pcList(nextChord), weight:2 });
  const bRoot = parseChordKey(bridgeChord.key).root;
  let best = null;
  LIB_ROOTS.forEach(function (root) {
    const rp = pitchClass(root);
    modes.forEach(function (mode) {
      const inS = {};
      mode.intervals.forEach(function (iv) { inS[(rp + iv) % 12] = true; });
      let score = 0, covers = true;
      groups.forEach(function (g) {
        if (!g.pcs.length) return;
        const hit = g.pcs.filter(function (pc) { return inS[pc]; }).length;
        score += g.weight * (hit / g.pcs.length);
        if (g.weight === 3 && hit < g.pcs.length) covers = false;
      });
      const cand = { root:root, mode:mode, score:score, coversBridge:covers, rootMatch:root === bRoot };
      if (!best) { best = cand; return; }
      if (cand.coversBridge !== best.coversBridge) { if (cand.coversBridge) best = cand; return; }
      if (Math.abs(cand.score - best.score) > 0.001) { if (cand.score > best.score) best = cand; return; }
      if (cand.rootMatch && !best.rootMatch) best = cand;
    });
  });
  if (!best) return null;
  const total = groups.reduce(function (s, g) { return s + g.weight; }, 0);
  best.fit = Math.round((best.score / total) * 100);
  best.note = best.coversBridge ? null
    : 'This chord sits outside any single seven-note scale, so treat the bridge chord tones as the target and use the scale for the notes around them.';
  return best;
}

export function songScale(chords, modes) {
  if (!chords || !chords.length || !modes || !modes.length) return null;
  const groups = chords.filter(Boolean).map(function (c) { return pcList(c); });
  let best = null;
  LIB_ROOTS.forEach(function (root) {
    const rp = pitchClass(root);
    modes.forEach(function (mode) {
      const inS = {};
      mode.intervals.forEach(function (iv) { inS[(rp + iv) % 12] = true; });
      let score = 0;
      groups.forEach(function (pcs) {
        if (!pcs.length) return;
        score += pcs.filter(function (pc) { return inS[pc]; }).length / pcs.length;
      });
      if (!best || score > best.score) best = { root:root, mode:mode, score:score };
    });
  });
  if (!best) return null;
  best.fit = Math.round((best.score / groups.length) * 100);
  return best;
}

export function noteAt(stringIdx, fret) { return NOTE_NAMES[(OPEN_PC[stringIdx] + fret) % 12]; }
export const SINGLE_INLAYS = [3,5,7,9,15,17,19,21];
export const DOUBLE_INLAYS = [12,24];

export function voicingLabel(chord) {
  if (!chord) return '';
  if (chord.fret && chord.fret > 1) return 'barre - ' + chord.fret + 'fr';
  const f = (chord.positions || []).filter(function (p) { return typeof p === 'number' && p > 0; });
  if (!f.length) return 'open';
  const max = Math.max.apply(null, f);
  return max <= 4 ? 'open position' : 'position ' + Math.min.apply(null, f) + 'fr';
}

// Tuner presets. offsets are semitones from standard, low E first.
export const TUNINGS = [
  { id:'standard', label:'Standard', notes:['E','A','D','G','B','E'], offsets:[0,0,0,0,0,0] },
  { id:'dropd', label:'Drop D', notes:['D','A','D','G','B','E'], offsets:[-2,0,0,0,0,0] },
  { id:'halfdown', label:'Half step down', notes:['Eb','Ab','Db','Gb','Bb','Eb'], offsets:[-1,-1,-1,-1,-1,-1] },
  { id:'fulldown', label:'Full step down', notes:['D','G','C','F','A','D'], offsets:[-2,-2,-2,-2,-2,-2] },
  { id:'dropc', label:'Drop C', notes:['C','G','C','F','A','D'], offsets:[-4,-2,-2,-2,-2,-2] },
  { id:'opend', label:'Open D', notes:['D','A','D','F#','A','D'], offsets:[-2,0,0,-1,-2,-2] },
  { id:'openg', label:'Open G', notes:['D','G','D','G','B','D'], offsets:[-2,-2,0,0,0,-2] },
  { id:'dadgad', label:'DADGAD', notes:['D','A','D','G','A','D'], offsets:[-2,0,0,0,-2,-2] }
];

const STD_FREQ = [82.41, 110.0, 146.83, 196.0, 246.94, 329.63];

// Build the six target strings for a preset.
export function tuningStrings(id) {
  const t = TUNINGS.filter(function (x) { return x.id === id; })[0] || TUNINGS[0];
  return t.offsets.map(function (off, i) {
    return {
      name: t.notes[i],
      label: (i === 0 ? t.notes[i] + ' (low)' : (i === 5 ? t.notes[i].toLowerCase() + ' (high)' : t.notes[i])),
      freq: Math.round(STD_FREQ[i] * Math.pow(2, off / 12) * 100) / 100,
      string: 6 - i,
      idx: i,
      offset: off
    };
  });
}

export function analysePitch(freq) {
  if (!freq || freq <= 0) return null;
  const midi = 69 + 12 * Math.log2(freq / 440);
  const nearest = Math.round(midi);
  return { freq:freq, note:NOTE_NAMES[((nearest % 12) + 12) % 12], octave:Math.floor(nearest/12)-1, cents:Math.round((midi - nearest) * 100), midi:nearest };
}

// Nearest string within the CURRENT tuning, not just standard.
export function nearestInTuning(freq, strings) {
  let best = null, bestDist = Infinity;
  (strings || []).forEach(function (t) {
    const d = Math.abs(12 * Math.log2(freq / t.freq));
    if (d < bestDist) { bestDist = d; best = t; }
  });
  return bestDist <= 3 ? best : null;
}

// Cents away from the nearest string in this tuning (what the needle shows).
export function centsFromString(freq, str) {
  if (!str) return 0;
  return Math.round(1200 * Math.log2(freq / str.freq));
}

export function chordSheet(items, meta) {
  const lines = ['GUITAR DICE - ' + (meta.style || '') + ' / ' + (meta.genre || '')];
  if (meta.scale) lines.push('Scale: ' + meta.scale);
  lines.push('');
  items.forEach(function (it, i) {
    const c = it.chord || it;
    lines.push((i+1) + '. ' + (it.part ? it.part + ' - ' : '') + c.name + (it.kind === 'bridge' ? '  (bridge)' : '') + '   [' + voicingLabel(c) + ']');
    if (it.why) lines.push('   ' + it.why);
    const pos = (c.positions || []).map(function (p) { return (p === 'X' || p === 'x') ? 'x' : String(p); });
    lines.push('   E A D G B e');
    lines.push('   ' + pos.join(' '));
    lines.push('');
  });
  lines.push('guitar-dice.vercel.app');
  return lines.join('\n');
}
