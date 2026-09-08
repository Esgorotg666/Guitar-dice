export const FACE_ORDER = ['intro', 'verse', 'pre', 'chorus', 'solo', 'bridge', 'turn', 'outro'];

export const FACES = {
  intro:   { id: 'intro', label: 'Intro', color: '#64748b', pips: 1 },
  verse:   { id: 'verse', label: 'Verse', color: '#e08a3c', pips: 2 },
  pre:     { id: 'pre', label: 'Pre', color: '#d97706', pips: 3 },
  chorus:  { id: 'chorus', label: 'Chorus', color: '#0f766e', pips: 4 },
  solo:    { id: 'solo', label: 'Solo', color: '#0ea5e9', pips: 5 },
  bridge:  { id: 'bridge', label: 'Bridge', color: '#db2777', pips: 3 },
  turn:    { id: 'turn', label: 'Turnaround', color: '#8b5cf6', pips: 4 },
  outro:   { id: 'outro', label: 'Outro', color: '#334155', pips: 6 },
  chord:   { id: 'verse', label: 'Verse', color: '#e08a3c', pips: 2 },
  scale:   { id: 'solo', label: 'Solo', color: '#0ea5e9', pips: 5 },
  lick:    { id: 'verse', label: 'Verse', color: '#e08a3c', pips: 2 },
  rhythm:  { id: 'verse', label: 'Verse', color: '#e08a3c', pips: 2 },
  strum:   { id: 'chorus', label: 'Chorus', color: '#0f766e', pips: 4 },
  arpeggio:{ id: 'pre', label: 'Pre', color: '#d97706', pips: 3 }
};

const ALIAS = {
  chord: 'verse',
  scale: 'solo',
  lick: 'verse',
  rhythm: 'verse',
  strum: 'chorus',
  arpeggio: 'pre'
};

export function normaliseFace(id) {
  const raw = String(id || 'verse');
  if (ALIAS[raw]) return ALIAS[raw];
  if (FACES[raw] && FACE_ORDER.indexOf(raw) >= 0) return raw;
  return 'verse';
}

export function facesForTier(tier, allowAll) {
  const t = String(tier || 'free').toLowerCase();
  if (t.indexOf('extreme') >= 0 || allowAll) return FACE_ORDER.slice();
  if (t.indexOf('premium') >= 0) return ['verse', 'chorus', 'solo', 'bridge', 'outro'];
  return ['verse', 'chorus'];
}

export function nextFace(current, allowed) {
  const list = allowed && allowed.length ? allowed : FACE_ORDER;
  const cur = normaliseFace(current);
  const i = list.indexOf(cur);
  if (i < 0) return list[0];
  return list[(i + 1) % list.length];
}

export function defaultTypedSlots(count, style) {
  const lead = ['verse', 'chorus', 'solo', 'chorus', 'verse', 'solo', 'outro'];
  const rhy = ['intro', 'verse', 'chorus', 'verse', 'chorus', 'bridge', 'outro'];
  const ac = ['intro', 'verse', 'chorus', 'verse', 'chorus', 'turn', 'outro'];
  const pack = style === 'lead' ? lead : (style === 'acoustic' ? ac : rhy);
  const n = Math.max(2, count || 2);
  const out = [];
  for (let i = 0; i < n; i++) out.push(pack[i % pack.length]);
  return out;
}

export function matchLessons(lessons, kinds, genre) {
  const g = String(genre || '').toLowerCase();
  const pool = (lessons || []).filter(function (l) { return !l.gate; });
  const hits = [];
  const seen = {};
  pool.forEach(function (l) {
    if (hits.length >= 3 || seen[l.id]) return;
    const blob = ((l.title || '') + ' ' + (l.summary || '') + ' ' + (l.genre || '')).toLowerCase();
    const genreOk = !g || blob.indexOf(g) !== -1 || (l.genre || 'any') === 'any';
    if (genreOk) {
      seen[l.id] = true;
      hits.push(l);
    }
  });
  return hits;
}

export function faceCopy(kind) {
  const k = normaliseFace(kind);
  if (k === 'solo') return 'Play the scale over this chord. Tap the die to hear the run.';
  if (k === 'chorus') return 'Biggest shape. Land on beat 1.';
  if (k === 'bridge') return 'Change the feel. Hold, then return to the chorus.';
  if (k === 'turn') return 'Walk back to the top of the form.';
  return 'Hold the full shape. Name it out loud.';
}
