export const FACE_ORDER = ['chord', 'scale', 'arpeggio', 'lick', 'rhythm', 'strum', 'solo', 'bridge'];

export const FACES = {
  chord:     { id: 'chord', label: 'Chord', color: '#e08a3c', pips: 1 },
  scale:     { id: 'scale', label: 'Scale', color: '#3b82f6', pips: 3 },
  arpeggio:  { id: 'arpeggio', label: 'Arpeggio', color: '#8b5cf6', pips: 5 },
  lick:      { id: 'lick', label: 'Lick', color: '#eab308', pips: 5 },
  rhythm:    { id: 'rhythm', label: 'Rhythm', color: '#6366f1', pips: 4 },
  strum:     { id: 'strum', label: 'Strum', color: '#0f766e', pips: 6 },
  solo:      { id: 'solo', label: 'Solo', color: '#0ea5e9', pips: 6 },
  bridge:    { id: 'bridge', label: 'Bridge', color: '#db2777', pips: 2 }
};

export function facesForTier(tier, allowBridge) {
  const t = String(tier || 'free').toLowerCase();
  if (t.indexOf('extreme') >= 0) return FACE_ORDER.filter(function (id) { return id !== 'bridge' || allowBridge; });
  if (t.indexOf('premium') >= 0) return ['chord', 'scale', 'rhythm', 'strum', 'lick'];
  return ['chord', 'scale'];
}

export function nextFace(current, allowed) {
  const list = allowed && allowed.length ? allowed : FACE_ORDER;
  const i = list.indexOf(current);
  return list[(i + 1) % list.length];
}

export function defaultTypedSlots(count, style) {
  const lead = ['chord', 'scale', 'lick', 'arpeggio', 'solo', 'lick', 'scale'];
  const rhy = ['chord', 'chord', 'rhythm', 'strum', 'chord', 'lick', 'rhythm'];
  const ac = ['chord', 'chord', 'strum', 'arpeggio', 'lick', 'rhythm', 'chord'];
  const pack = style === 'lead' ? lead : (style === 'acoustic' ? ac : rhy);
  const n = Math.max(2, count || 2);
  const out = [];
  for (let i = 0; i < n; i++) out.push(pack[i % pack.length]);
  return out;
}

const LICKS = {
  blues: ['Classic blues lick in A', 'Box 1 to box 2 connector', 'Minor pentatonic turnaround'],
  rock: ['Minor pent box 1 climb', 'Bend into the flat 7', 'Power-chord rake into a lick'],
  jazz: ['Enclosure into the 3rd', '1-2-3-5 on the ii', 'Chromatic approach to the 7th'],
  metal: ['Phrygian three-note cell', 'Tremolo on the 5th', 'Harmonic minor run down'],
  country: ['Chicken pickin\' 3rd-to-root', 'Open-G hammer lick', 'Double-stop 6ths'],
  funk: ['16th muted chuck into a fill', 'Dorian hex pickup', 'Ghost-note turn into the 9'],
  folk: ['Open-string hammer fill', 'Pentatonic walk between chords', 'Drone E pull-off'],
  'neo-classical': ['Harmonic minor sequence', 'Dim7 sweep cell', '3NPS three-string run']
};

const RHYTHMS = {
  blues: 'Shuffle 12/8, accent the and of 2',
  rock: 'Straight 8ths, palm mute the ands',
  metal: 'Down-picked 8ths, open on beat 1',
  funk: '16th mute, ghost everything but 2 and 4',
  jazz: 'Charleston: hit 1 and the and of 2',
  country: 'Boom-chick, bass on 1 and 3',
  folk: 'Bass-strum, thumb stays on roots',
  'neo-classical': 'Gallop 16ths on the low string'
};

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

export function matchLessons(lessons, kinds, genre) {
  const keys = {
    lick: ['lick', 'box', 'hammer', 'pull', 'bend', 'pent'],
    scale: ['scale', 'mode', 'box', 'neck', 'caged'],
    arpeggio: ['arpeggio', 'roll', 'sweep'],
    rhythm: ['rhythm', 'palm', 'chuck', 'mute', 'boom'],
    strum: ['strum', 'folk', 'acoustic'],
    solo: ['solo', 'lead', 'changes', '251', 'ii-v'],
    chord: ['chord', 'change', 'shape']
  };
  const g = String(genre || '').toLowerCase();
  const pool = (lessons || []).filter(function (l) { return !l.gate; });
  const hits = [];
  const seen = {};
  kinds.forEach(function (kind) {
    const words = keys[kind] || [kind];
    pool.forEach(function (l) {
      if (seen[l.id] || hits.length >= 3) return;
      const blob = ((l.title || '') + ' ' + (l.summary || '') + ' ' + (l.genre || '')).toLowerCase();
      const ok = words.some(function (w) { return blob.indexOf(w) !== -1; });
      const genreOk = !g || blob.indexOf(g) !== -1 || (l.genre || 'any') === 'any';
      if (ok && genreOk) {
        seen[l.id] = true;
        hits.push(l);
      }
    });
  });
  if (hits.length < 3) {
    pool.forEach(function (l) {
      if (!seen[l.id] && hits.length < 3) {
        seen[l.id] = true;
        hits.push(l);
      }
    });
  }
  return hits;
}

export function faceCopy(kind, genre) {
  const g = genre || 'rock';
  if (kind === 'lick') return pick(LICKS[g] || LICKS.rock);
  if (kind === 'rhythm' || kind === 'strum') return RHYTHMS[g] || RHYTHMS.rock;
  if (kind === 'solo') return '8 bars over the rolled chords. Land chord tones on beat 1.';
  if (kind === 'scale') return 'Play the rolled scale through the changes, then sequence it in 3s.';
  if (kind === 'arpeggio') return 'Chord tones only. 1-3-5-7 of each change, one octave.';
  return 'Hold the full shape. Name it out loud.';
}
