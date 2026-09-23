import { OPEN_PC, pitchClass } from './theory';

export const EXTRA_SCALES = [
  { id:'minor-pentatonic', name:'Minor Pentatonic', intervals:[0,3,5,7,10],
    degrees:['1','b3','4','5','b7'],
    description:'Five notes, no wrong ones. The backbone of rock and blues lead playing.' },
  { id:'major-pentatonic', name:'Major Pentatonic', intervals:[0,2,4,7,9],
    degrees:['1','2','3','5','6'],
    description:'The bright five. Country, folk and the sweet side of blues.' },
  { id:'blues', name:'Blues Scale', intervals:[0,3,5,6,7,10],
    degrees:['1','b3','4','b5','5','b7'],
    description:'Minor pentatonic with the flat five dropped in - the note that makes it growl.' },
  { id:'harmonic-minor', name:'Harmonic Minor', intervals:[0,2,3,5,7,8,11],
    degrees:['1','2','b3','4','5','b6','7'],
    description:'Minor with a raised seventh. The gap between b6 and 7 is what makes it sound Eastern and neo-classical.' },
  { id:'melodic-minor', name:'Melodic Minor', intervals:[0,2,3,5,7,9,11],
    degrees:['1','2','b3','4','5','6','7'],
    description:'Minor third, major everything else. The jazz minor sound.' },
  { id:'whole-tone', name:'Whole Tone', intervals:[0,2,4,6,8,10],
    degrees:['1','2','3','#4','#5','b7'],
    description:'Six notes, all a whole step apart. No pull, no home - the dream sequence sound.' },
  { id:'phrygian-dominant', name:'Phrygian Dominant', intervals:[0,1,4,5,7,8,10],
    degrees:['1','b2','3','4','5','b6','b7'],
    description:'Major third over a flat second. Flamenco, and the sound over any 7b9 chord.' }
];

export const SCALE_ROOTS = ['A','Bb','B','C','C#','D','Eb','E','F','F#','G','Ab'];

export function scaleMenu(modes) {
  const base = (modes || []).map(function (m) {
    return { id:m.id, name:m.name, intervals:m.intervals, degrees:m.degrees,
             description:m.description, group:'Modes' };
  });
  const extra = EXTRA_SCALES.map(function (s) {
    return Object.assign({}, s, { group: s.intervals.length === 5 ? 'Pentatonic' : 'Other' });
  });
  return base.concat(extra);
}
export function findScale(menu, id) {
  return (menu || []).filter(function (s) { return s.id === id; })[0] || (menu || [])[0] || null;
}

function baseFretFor(root) {
  const rp = pitchClass(root);
  const r = (rp - OPEN_PC[0] + 120) % 12;
  return Math.max(0, Math.min(11, r - 1));
}

export function scaleBox(root, mode, baseFret) {
  if (!mode || !mode.intervals) return [];
  const rp = pitchClass(root || 'A');
  const want = {};
  mode.intervals.forEach(function (iv) { want[((iv % 12) + 12) % 12] = true; });
  const lo = Math.max(0, baseFret === undefined ? baseFretFor(root) : baseFret);
  const hi = lo + 4;
  const out = [];
  OPEN_PC.forEach(function (open, s) {
    for (let f = lo; f <= hi; f++) {
      const iv = (open + f - rp + 120) % 12;
      if (want[iv]) out.push({ string:s, fret:f, degreeIv:iv, isRoot: iv === 0 });
    }
  });
  return out;
}

export function scaleRunNotes(root, mode) {
  if (!mode || !mode.intervals) return [];
  const rp = pitchClass(root || 'A');
  const want = {};
  mode.intervals.forEach(function (iv) { want[iv % 12] = true; });
  const notes = [];
  OPEN_PC.forEach(function (open, s) {
    let found = 0;
    for (let f = 0; f <= 14 && found < 2; f++) {
      const iv = (open + f - rp + 120) % 12;
      if (!want[iv]) continue;
      notes.push({ string:s, fret:f, beats:0.5, role:'line' });
      found += 1;
    }
  });
  return notes;
}

function pick(a) { return a[Math.floor(Math.random() * a.length)]; }

function reflect(i, n) {
  if (n <= 1) return 0;
  const period = 2 * (n - 1);
  let x = ((i % period) + period) % period;
  return x < n ? x : period - x;
}

const CELLS = [
  { id:'run',    label:'straight run' },
  { id:'seq3',   label:'groups of three' },
  { id:'seq4',   label:'groups of four' },
  { id:'thirds', label:'skipping in thirds' },
  { id:'pivot',  label:'pedal against one note' },
  { id:'echo',   label:'repeated cell' }
];

function buildCell(box, start, dir, kind, out) {
  const n = box.length;
  let i = reflect(start, n);
  const pedal = kind === 'pivot';
  const push = function (idx, beats) {
    const b = box[reflect(idx, n)];
    const last = out[out.length - 1];
    if (!pedal && last && last.string === b.string && last.fret === b.fret) return;
    out.push({ string:b.string, fret:b.fret, beats:beats, role:'line' });
  };
  if (kind === 'run') {
    const len = 4 + Math.floor(Math.random() * 4);
    for (let k = 0; k < len; k++) { push(i + dir * k, 0.25); }
    i = i + dir * len;
  } else if (kind === 'seq3') {
    for (let g = 0; g < 3; g++) {
      push(i + dir * g, 0.25); push(i + dir * (g + 1), 0.25); push(i + dir * (g + 2), 0.25);
    }
    i = i + dir * 5;
  } else if (kind === 'seq4') {
    for (let g = 0; g < 2; g++) {
      for (let k = 0; k < 4; k++) push(i + dir * (g + k), 0.25);
    }
    i = i + dir * 5;
  } else if (kind === 'thirds') {
    for (let k = 0; k < 6; k++) push(i + dir * 2 * k, 0.25);
    i = i + dir * 12;
  } else if (kind === 'pivot') {
    const anchor = i;
    for (let k = 1; k <= 4; k++) { push(anchor, 0.25); push(anchor + dir * k, 0.25); }
    i = anchor + dir * 4;
  } else {
    for (let r = 0; r < 2; r++) for (let k = 0; k < 3; k++) push(i + dir * k, 0.25);
    i = i + dir * 2;
  }
  return reflect(i, n);
}

export function randomScalePattern(root, mode, opts) {
  const o = opts || {};
  const box = scaleBox(root, mode, o.baseFret);
  if (box.length < 5) return { notes:[], root:root, mode:mode, devices:[] };

  const rootIdxs = [];
  box.forEach(function (b, i) { if (b.isRoot) rootIdxs.push(i); });
  const lowRoot = rootIdxs.length ? rootIdxs[0] : 0;

  const out = [];
  const devices = [];
  let i = lowRoot;
  let dir = 1;
  const cells = Math.max(2, Math.min(6, o.bars || 4));

  for (let c = 0; c < cells; c++) {
    const kind = pick(CELLS);
    devices.push(kind.label);
    i = buildCell(box, i, dir, kind.id, out);
    if (i <= 1) dir = 1;
    else if (i >= box.length - 2) dir = -1;
    else if (Math.random() < 0.45) dir = -dir;
  }

  let target = rootIdxs.length ? rootIdxs[0] : reflect(i, box.length);
  let best = Infinity;
  rootIdxs.forEach(function (r) {
    const dist = Math.abs(r - i);
    if (dist < best) { best = dist; target = r; }
  });
  const land = box[target];
  out.push({ string:land.string, fret:land.fret, beats:2.5, role:'land', tech:['~'] });

  out.forEach(function (n, idx) { n.pick = idx % 2 === 0 ? 'D' : 'U'; });
  out[out.length - 1].pick = 'D';

  const uniq = [];
  devices.forEach(function (d) { if (uniq.indexOf(d) === -1) uniq.push(d); });
  return { notes:out, root:root, mode:mode, devices:uniq };
}

export function patternSummary(res) {
  if (!res || !res.notes.length) return '';
  return res.root + ' ' + (res.mode && res.mode.name ? res.mode.name : '') +
    ' - ' + res.notes.length + ' notes, ' + res.devices.join(', ');
}

export function moveItem(list, from, dir) {
  const next = (list || []).slice();
  const to = from + dir;
  if (from < 0 || to < 0 || to >= next.length) return next;
  const tmp = next[from];
  next[from] = next[to];
  next[to] = tmp;
  return next;
}
