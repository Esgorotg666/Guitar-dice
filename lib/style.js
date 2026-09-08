export const STYLES = [
  { value:'lead', label:'Lead Guitar', description:'Solos, scales, and melodic playing', icon:'LEAD' },
  { value:'rhythm', label:'Rhythm Guitar', description:'Power chords, strumming, and backing', icon:'RHY' },
  { value:'acoustic', label:'Acoustic', description:'Open chords, fingerpicking, unplugged', icon:'AC' }
];
export const GENRES = [
  { value:'rock', label:'Rock' }, { value:'blues', label:'Blues' },
  { value:'country', label:'Country' }, { value:'metal', label:'Metal' },
  { value:'jazz', label:'Jazz' }, { value:'folk', label:'Folk' },
  { value:'funk', label:'Funk' }, { value:'neo-classical', label:'Neo-Classical' }
];
export const SKILLS = [
  { value:'entry', label:'Entry Level', description:'Majors, minors, sevenths and sus chords' },
  { value:'intermediate', label:'Intermediate', description:'Adds maj7, 6ths, add9, diminished and 9ths' },
  { value:'advanced', label:'Advanced', description:'Adds m9, maj9, dim7, augmented, 11ths and altered 7ths' },
  { value:'master', label:'Master', description:'Everything - 13ths, altered dominants, mMaj7' }
];
export const ALL_ROOTS = ['A','Bb','B','C','C#','D','Eb','E','F','F#','G','Ab'];

const FAMILY_TIERS = {
  entry: ['','m','7','m7','sus2','sus4'],
  intermediate: ['','m','7','m7','sus2','sus4','maj7','add9','6','m6','dim','9'],
  advanced: ['','m','7','m7','sus2','sus4','maj7','add9','6','m6','dim','9','m9','maj9','dim7','aug','11','m11','7#9','7b9'],
  master: ['','m','7','m7','sus2','sus4','maj7','add9','6','m6','dim','9','m9','maj9','dim7','aug','11','m11','7#9','7b9','13','m13','7#5','7b5','mmaj7']
};
const GENRE_BOOST = {
  blues: ['7','9','m7'],
  country: ['','7','6','sus4','m'],
  jazz: ['maj7','m7','9','6'],
  metal: ['m','','sus2','m7'],
  rock: ['','m','sus4','7','add9'],
  folk: ['','m','sus2','sus4','maj7'],
  funk: ['9','m7','7'],
  'neo-classical': ['m','maj7','m7','aug']
};
export const GENRE_MODES = {
  blues: ['mixolydian','dorian','aeolian'],
  country: ['ionian','mixolydian'],
  jazz: ['dorian','mixolydian','lydian','ionian'],
  metal: ['phrygian','aeolian','locrian'],
  rock: ['aeolian','mixolydian','ionian'],
  folk: ['ionian','mixolydian','dorian'],
  funk: ['dorian','mixolydian'],
  'neo-classical': ['aeolian','phrygian','lydian']
};
const OPEN_BIAS = { acoustic:0.7, rhythm:0.45, lead:0.3 };

const MODE_STEPS = {
  ionian: [0,2,4,5,7,9,11],
  dorian: [0,2,3,5,7,9,10],
  phrygian: [0,1,3,5,7,8,10],
  lydian: [0,2,4,6,7,9,11],
  mixolydian: [0,2,4,5,7,9,10],
  aeolian: [0,2,3,5,7,8,10],
  locrian: [0,1,3,5,6,8,10]
};
const MODE_QUAL = {
  ionian:     ['','m','m','','','m','dim'],
  dorian:     ['m','m','','','m','dim',''],
  phrygian:   ['m','','','m','dim','','m'],
  lydian:     ['','','m','dim','','m','m'],
  mixolydian: ['','m','dim','','m','m',''],
  aeolian:    ['m','dim','','m','m','',''],
  locrian:    ['dim','','m','m','','','m']
};
const NOTE_PC = { C:0,'C#':1,Db:1,D:2,'D#':3,Eb:3,E:4,F:5,'F#':6,Gb:6,G:7,'G#':8,Ab:8,A:9,'A#':10,Bb:10,B:11 };

export const STYLE_PRACTICE = {
  lead: [
    'Play the scale ascending and descending in one position, then shift up.',
    'Target a chord tone on every downbeat - the coloured dots show you where they are.',
    'Bend into the characteristic degree and hold the pitch.',
    'Sequence the scale in groups of three.',
    'Find the same chord tone on three different strings before you move on.'
  ],
  rhythm: [
    'Lock the changes to a metronome, accenting beats 2 and 4.',
    'Try a muted 16th-note strum with accents on the downbeats.',
    'Play it with power-chord voicings first, then the full shapes.',
    'Hold each chord for two bars, then cut it to one.',
    'Find the smallest possible move between the shapes - shift, do not jump.'
  ],
  acoustic: [
    'Fingerpick a Travis pattern through the progression.',
    'Play the same shapes with a capo up two frets.',
    'Let the open strings ring through the changes.',
    'Alternate bass notes with your thumb while picking the melody.',
    'Play it once hard with a pick, then again soft with your fingers.'
  ]
};

function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
function shuffle(a) {
  const out = a.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = out[i]; out[i] = out[j]; out[j] = t;
  }
  return out;
}
function clipChord(chord) {
  if (!chord) return chord;
  var next = Object.assign({}, chord);
  if (Array.isArray(next.positions) && next.positions.length > 6) next.positions = next.positions.slice(0, 6);
  return next;
}
function pcOf(root) {
  return NOTE_PC[root] == null ? 0 : NOTE_PC[root];
}
function rootFromPc(pc) {
  const n = ((pc % 12) + 12) % 12;
  for (let i = 0; i < ALL_ROOTS.length; i++) if (pcOf(ALL_ROOTS[i]) === n) return ALL_ROOTS[i];
  return 'C';
}
function parseSuffix(key) {
  return String(key || '').replace(/_barre$/, '').replace(/^[A-G][b#]?/, '');
}
function familyOf(suffix) {
  const s = String(suffix || '');
  if (s.indexOf('dim') === 0 || s === 'aug') return 'color';
  if (/7|9|11|13/.test(s)) return 'seventh';
  if (s.indexOf('sus') === 0) return 'sus';
  if (s.charAt(0) === 'm') return 'minor';
  return 'major';
}

export function diatonicPool(lockRoot, lockMode) {
  const mode = lockMode || 'ionian';
  const steps = MODE_STEPS[mode] || MODE_STEPS.ionian;
  const qual = MODE_QUAL[mode] || MODE_QUAL.ionian;
  const tonic = pcOf(lockRoot || 'C');
  return steps.map(function (step, i) {
    return { root: rootFromPc(tonic + step), suffix: qual[i] || '' };
  });
}

export function suffixPool(style, genre, skill, mixAll) {
  const fams = FAMILY_TIERS[skill] || FAMILY_TIERS.intermediate;
  if (mixAll) return fams.slice();
  const boost = (GENRE_BOOST[genre] || []).filter(function (s) { return fams.indexOf(s) !== -1; });
  return fams.concat(boost);
}
function pickVoicing(root, suffix, style, chords) {
  const o = root + suffix, b = o + '_barre';
  const ho = !!chords[o], hb = !!chords[b];
  if (!ho && !hb) return null;
  if (ho && !hb) return o;
  if (!ho && hb) return b;
  const bias = OPEN_BIAS[style] === undefined ? 0.45 : OPEN_BIAS[style];
  return Math.random() < bias ? o : b;
}
function fretOf(chord) {
  if (!chord) return 0;
  if (chord.fret) return chord.fret;
  const f = (chord.positions || []).filter(function (p) { return typeof p === 'number' && p > 0; });
  return f.length ? Math.min.apply(null, f) : 0;
}

function fromLibrary(opts) {
  const chords = opts.chords || {};
  const allowed = FAMILY_TIERS[opts.skill] || FAMILY_TIERS.master;
  const avoid = opts.avoid || [];
  const keys = Object.keys(chords).filter(function (k) {
    if (k.indexOf('_barre') !== -1 && Math.random() > 0.35) return false;
    const suf = parseSuffix(k);
    return allowed.indexOf(suf) !== -1;
  });
  const bag = shuffle(keys.filter(function (k) { return avoid.indexOf(k) === -1; }).concat(shuffle(keys)));
  const out = [];
  const usedRoot = {};
  const usedFam = { major:0, minor:0, seventh:0, sus:0, color:0 };
  const maxSeventh = Math.max(1, Math.ceil((opts.count || 4) / 3));
  const maxColor = 1;
  let i;
  for (i = 0; i < bag.length && out.length < (opts.count || 4); i++) {
    const key = bag[i];
    const suf = parseSuffix(key);
    const root = String(key).replace(/_barre$/, '').replace(suf, '') || key.charAt(0);
    const fam = familyOf(suf);
    if (usedRoot[root] && out.length < ALL_ROOTS.length) continue;
    if (fam === 'seventh' && usedFam.seventh >= maxSeventh) continue;
    if (fam === 'color' && usedFam.color >= maxColor) continue;
    if (out.some(function (c) { return c.key === key; })) continue;
    usedRoot[root] = true;
    usedFam[fam] = (usedFam[fam] || 0) + 1;
    out.push(Object.assign({ key: key }, clipChord(chords[key])));
  }
  return out;
}

export function rollProgression(opts) {
  const chords = opts.chords;
  const count = opts.count || 4;
  const mixAll = !!opts.mixAll || opts.skill === 'master' || opts.skill === 'advanced';
  const lockedRoot = opts.lockRoot || '';
  const lockedMode = opts.lockMode || '';
  if (mixAll && !lockedRoot && !lockedMode) {
    const lib = fromLibrary(opts);
    if (lib.length >= Math.min(count, 2)) return lib.slice(0, count);
  }
  const avoid = opts.avoid || [];
  const suffixes = suffixPool(opts.style, opts.genre, opts.skill, mixAll);
  const diatonic = (lockedRoot || lockedMode) ? diatonicPool(lockedRoot || pick(ALL_ROOTS), lockedMode || 'ionian') : null;
  const out = [];
  const used = {};
  const usedFam = { seventh:0, color:0 };
  let guard = 0;
  while (out.length < count && guard < 900) {
    guard++;
    const relaxRoot = guard > 220 || count > ALL_ROOTS.length;
    const relaxAvoid = guard > 320;
    let root, suffix;
    if (diatonic) {
      const deg = pick(diatonic);
      root = deg.root;
      suffix = deg.suffix;
      if (suffixes.indexOf(suffix) === -1) {
        if (suffix === 'dim' && suffixes.indexOf('m') !== -1) suffix = 'm';
        else if (suffixes.indexOf('') !== -1) suffix = '';
      }
    } else {
      root = pick(ALL_ROOTS);
      suffix = pick(suffixes);
    }
    const fam = familyOf(suffix);
    if (!relaxRoot && fam === 'seventh' && usedFam.seventh >= Math.max(1, Math.ceil(count / 3))) continue;
    if (!relaxRoot && fam === 'color' && usedFam.color >= 1) continue;
    if (!relaxRoot && used[root]) continue;
    const key = pickVoicing(root, suffix, opts.style, chords);
    if (!key) continue;
    if (out.some(function (c) { return c.key === key; })) continue;
    if (!relaxAvoid && avoid.indexOf(key) !== -1) continue;
    used[root] = true;
    usedFam[fam] = (usedFam[fam] || 0) + 1;
    out.push(Object.assign({ key:key }, clipChord(chords[key])));
  }
  return out;
}

export function rollScale(opts) {
  const allowed = GENRE_MODES[opts.genre] || ['ionian','aeolian'];
  const pool = opts.skill === 'entry' ? allowed.slice(0,2) : allowed;
  const id = opts.lockMode || pick(pool);
  const mode = (opts.modes || []).filter(function (m) { return m.id === id; })[0] || (opts.modes || [])[0];
  const root = opts.lockRoot || pick(ALL_ROOTS);
  return { root:root, mode:mode };
}
export function practiceTip(style) { return pick(STYLE_PRACTICE[style] || STYLE_PRACTICE.rhythm); }
