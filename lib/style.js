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
  blues: ['7','9','m7','7#9','13'],
  country: ['','7','6','sus2','sus4','add9','m'],
  jazz: ['maj7','m7','9','m9','13','maj9','m11','7b9','7#5','6'],
  metal: ['m','dim','dim7','sus2','m7','7b5'],
  rock: ['','m','sus4','add9','7','6'],
  folk: ['','m','sus2','sus4','add9','maj7'],
  funk: ['9','m7','7','13','m9','m11'],
  'neo-classical': ['m','dim','dim7','aug','mmaj7','m7','maj7']
};
const GENRE_MODES = {
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
function clipChord(chord) {
  if (!chord) return chord;
  var next = Object.assign({}, chord);
  if (Array.isArray(next.positions) && next.positions.length > 6) next.positions = next.positions.slice(0, 6);
  return next;
}

export function suffixPool(style, genre, skill) {
  const fams = FAMILY_TIERS[skill] || FAMILY_TIERS.intermediate;
  const boost = (GENRE_BOOST[genre] || []).filter(function (s) { return fams.indexOf(s) !== -1; });
  return fams.concat(boost).concat(boost);
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

export function rollProgression(opts) {
  const chords = opts.chords;
  const count = opts.count || 4;
  const avoid = opts.avoid || [];
  const suffixes = suffixPool(opts.style, opts.genre, opts.skill);
  const out = [];
  const used = {};
  let guard = 0;
  while (out.length < count && guard < 600) {
    guard++;
    const relaxRoot = guard > 220 || count > ALL_ROOTS.length;
    const relaxAvoid = guard > 320;
    const root = pick(ALL_ROOTS);
    if (!relaxRoot && used[root]) continue;
    const key = pickVoicing(root, pick(suffixes), opts.style, chords);
    if (!key) continue;
    if (out.some(function (c) { return c.key === key; })) continue;
    if (!relaxAvoid && avoid.indexOf(key) !== -1) continue;
    used[root] = true;
    out.push(Object.assign({ key:key }, clipChord(chords[key])));
  }
  if (out.length >= 3 && out.every(function (c) { return fretOf(c) <= 2; })) {
    for (let i = out.length - 1; i >= 1; i--) {
      const bk = out[i].key + '_barre';
      if (chords[bk]) { out[i] = Object.assign({ key:bk }, clipChord(chords[bk])); break; }
    }
  }
  return out;
}

export function rollScale(opts) {
  const allowed = GENRE_MODES[opts.genre] || ['ionian','aeolian'];
  const pool = opts.skill === 'entry' ? allowed.slice(0,2) : allowed;
  const id = pick(pool);
  const mode = opts.modes.filter(function (m) { return m.id === id; })[0] || opts.modes[0];
  return { root:pick(ALL_ROOTS), mode:mode };
}
export function practiceTip(style) { return pick(STYLE_PRACTICE[style] || STYLE_PRACTICE.rhythm); }
