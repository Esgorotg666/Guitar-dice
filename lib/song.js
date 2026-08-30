const TEMPLATES = [
  { id:'classic', name:'Classic', parts:['Intro','Verse','Chorus','Verse','Chorus','Bridge','Chorus','Outro'] },
  { id:'anthem', name:'Anthem', parts:['Intro','Verse','Pre-Chorus','Chorus','Verse','Pre-Chorus','Chorus','Solo','Chorus','Outro'] },
  { id:'simple', name:'Simple', parts:['Intro','Verse','Chorus','Verse','Chorus','Outro'] },
  { id:'blues', name:'Blues Set', parts:['Intro','Verse','Turnaround','Verse','Solo','Verse','Outro'] },
  { id:'ballad', name:'Ballad', parts:['Intro','Verse','Chorus','Verse','Chorus','Bridge','Solo','Chorus','Outro'] },
  { id:'jam', name:'Jam', parts:['Intro','Groove A','Groove B','Solo','Groove A','Breakdown','Outro'] },
  { id:'shortcut', name:'Straight In', parts:['Verse','Chorus','Verse','Chorus','Bridge','Chorus'] },
  { id:'epic', name:'Long Form', parts:['Intro','Verse','Chorus','Verse','Chorus','Bridge','Solo','Breakdown','Chorus','Outro'] }
];
const GENRE_PREF = {
  blues:['blues','simple','jam'], jazz:['jam','ballad','classic'],
  metal:['epic','anthem','jam'], rock:['classic','anthem','shortcut'],
  country:['classic','simple','ballad'], folk:['simple','ballad','classic'],
  funk:['jam','shortcut','simple'], 'neo-classical':['epic','ballad','classic']
};

export const PART_GUIDE = {
  'Intro':'Sets the mood in a few bars. Often the same chord the verse starts on, or a hint of it.',
  'Verse':'Carries the story. Keep it lower energy than the chorus so the chorus has somewhere to go.',
  'Pre-Chorus':'The lift. It should feel unresolved so the chorus lands as an arrival.',
  'Chorus':'The hook, and the loudest idea in the song. This chord will come back every time.',
  'Bridge':'The departure. Go somewhere the rest of the song has not been, then come home.',
  'Solo':'Room to play. Use the scale below and target the chord tones.',
  'Turnaround':'The two bars that send you back round again. It should pull, not sit still.',
  'Groove A':'The main pocket. Simple and repeatable beats clever here.',
  'Groove B':'The contrast groove. Change one thing, not everything.',
  'Breakdown':'Strip it back. Fewer notes, more space, then build again.',
  'Outro':'How it ends. Resolve home, or leave it hanging on purpose.'
};

function pick(a) { return a[Math.floor(Math.random() * a.length)]; }

export function rollTemplate(genre) {
  const prefs = GENRE_PREF[genre];
  if (prefs && Math.random() < 0.75) {
    const t = TEMPLATES.filter(function (x) { return x.id === pick(prefs); })[0];
    if (t) return t;
  }
  return pick(TEMPLATES);
}

export function newSong(template, genre, style) {
  const seen = {};
  const sections = template.parts.map(function (part, i) {
    const echoOf = seen[part] === undefined ? null : seen[part];
    if (echoOf === null) seen[part] = i;
    return { i:i, part:part, echoOf:echoOf, key:null, varied:false };
  });
  return { v:1, template:template.id, templateName:template.name, genre:genre, style:style, createdAt:Date.now(), sections:sections };
}

export function nextOpen(song) {
  for (let i = 0; i < song.sections.length; i++) {
    const s = song.sections[i];
    if (s.key) continue;
    if (s.echoOf !== null && !s.varied && song.sections[s.echoOf].key) continue;
    return i;
  }
  return -1;
}
export function resolvedKey(song, i) {
  const s = song.sections[i];
  if (s.key) return s.key;
  if (s.echoOf !== null && !s.varied) return song.sections[s.echoOf].key;
  return null;
}
export function isComplete(song) {
  return song.sections.every(function (s, i) { return !!resolvedKey(song, i); });
}
export function progress(song) {
  const done = song.sections.filter(function (s, i) { return !!resolvedKey(song, i); }).length;
  return { done:done, total:song.sections.length, pct:Math.round((done / song.sections.length) * 100) };
}
export function diceForStep(song, i) { return i === 0 ? 1 : 2; }

export function setSection(song, i, key) {
  const next = Object.assign({}, song);
  next.sections = song.sections.map(function (s, idx) { return idx === i ? Object.assign({}, s, { key:key }) : s; });
  return next;
}
export function varySection(song, i) {
  const next = Object.assign({}, song);
  next.sections = song.sections.map(function (s, idx) { return idx === i ? Object.assign({}, s, { varied:true, key:null }) : s; });
  return next;
}
export function songText(song, chords) {
  const lines = ['GUITAR DICE - song challenge', song.templateName + ' structure - ' + (song.genre || ''), ''];
  song.sections.forEach(function (s, i) {
    const key = resolvedKey(song, i);
    const c = key && chords ? chords[key] : null;
    lines.push((i + 1) + '. ' + s.part + ': ' + (c ? c.name : '-'));
  });
  lines.push('', 'guitar-dice.vercel.app');
  return lines.join('\n');
}
