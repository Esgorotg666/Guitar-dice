import { noteFreq } from './audio';
import { DAY_ONE_PATH } from './dayOne';
import { BARRE_PATH } from './barreBasics';

export const PASS_SCORE = 70;
export const GOLD_SCORE = 92;

function chain(style, rest) {
  return (DAY_ONE_PATH[style] || []).concat(BARRE_PATH[style] || []).concat(rest);
}

export const PATHS = {
  lead: chain('lead', [
    { id: 'study-chrom-cell', skill: 'Chromatic cell across the neck' },
    { id: 'study-cmaj-run', skill: 'C major as one piece' },
    { id: 'lead-alt-1', skill: 'Alternate picking' },
    { id: 'lead-pent-1', skill: 'Pentatonic box + legato' },
    { id: 'lead-bend-1', skill: 'Bend then shake' },
    { id: 'lead-vib-1', skill: 'Delayed vibrato' },
    { id: 'lead-slide-1', skill: 'Position slides' },
    { id: 'lead-legato-neck', skill: 'Legato across positions' },
    { id: 'lead-251-clock', skill: 'ii-V-I around the clock' },
    { id: 'lead-a7', skill: 'Play the changes' }
  ]),
  rhythm: chain('rhythm', [
    { id: 'rhy-pm-1', skill: 'Palm-muted power chords' },
    { id: 'study-gallop-em', skill: 'E5 gallop workshop' },
    { id: 'rhy-145-clock', skill: 'I-IV-V from three hours' },
    { id: 'rhy-funk-1', skill: 'Muted 16ths' },
    { id: 'study-drone-climb', skill: 'Open-E drone climb' },
    { id: 'study-bm-trem', skill: 'B harmonic minor tremolo' },
    { id: 'rhy-harm-min-trem', skill: 'Harmonic minor rhythm' },
    { id: 'rhy-cycle-walk', skill: 'Walk five hours C-G-D-A-E' }
  ]),
  acoustic: chain('acoustic', [
    { id: 'study-arp-song', skill: 'Open-chord arpeggio song' },
    { id: 'ac-1', skill: 'G C D with connecting scale' },
    { id: 'study-aed-roll', skill: 'A-E-D 16-bar roll' },
    { id: 'study-pima', skill: 'P-i-m-a across two shapes' },
    { id: 'study-bass-treble', skill: 'Bass against treble in G' },
    { id: 'study-drone-hymn', skill: 'Let-ring minor hymn' },
    { id: 'study-campanella', skill: 'Open-string campanella' },
    { id: 'ac-finger-1', skill: 'Thumb vs fingers' }
  ])
};

export const BADGES = [
  { id: 'first-clear', name: 'First clear', hint: 'Pass any path lesson' },
  { id: 'day-one', name: 'Day one', hint: 'Finish the six Day 1 steps' },
  { id: 'three-deep', name: 'Three deep', hint: 'Clear three lessons on one path' },
  { id: 'gold-ear', name: 'Gold ear', hint: 'Score 92% or better' },
  { id: 'path-lead', name: 'Lead path', hint: 'Finish the lead challenge path' },
  { id: 'path-rhythm', name: 'Rhythm path', hint: 'Finish the rhythm challenge path' },
  { id: 'path-acoustic', name: 'Acoustic path', hint: 'Finish the acoustic challenge path' }
];

export function isDayOneLesson(lesson) {
  var id = String((lesson && lesson.id) || lesson || '');
  var track = lesson && lesson.track;
  return track === 'day1' || id.indexOf('day1-') === 0 || id.indexOf('cap-start') === 0;
}

export function pathFor(style, skill) {
  var list = PATHS[style] || PATHS.rhythm;
  if (skill && skill !== 'entry') {
    list = list.filter(function (s) { return String(s.id).indexOf('day1-') !== 0; });
  }
  return list;
}

function uniqFreqs(list) {
  const seen = {};
  const out = [];
  (list || []).forEach(function (f) {
    const k = Math.round(f * 10);
    if (!f || seen[k]) return;
    seen[k] = true;
    out.push(f);
  });
  return out;
}

export function scoreableNotes(notes) {
  const list = notes || [];
  const byGroup = {};
  list.forEach(function (n) {
    if (!n || n.group == null) return;
    if (!byGroup[n.group]) byGroup[n.group] = [];
    byGroup[n.group].push(n);
  });
  const out = [];
  list.forEach(function (n, i) {
    if (!n) return;
    if (n.role === 'chord' && n.beats === 0) return;
    if (n.beats === 0 && n.role !== 'line') return;
    const freqs = [noteFreq(n.string, n.fret)];
    if (n.group != null && byGroup[n.group]) {
      byGroup[n.group].forEach(function (sib) {
        freqs.push(noteFreq(sib.string, sib.fret));
      });
    }
    out.push({
      i: i,
      string: n.string,
      fret: n.fret,
      beats: n.beats || 0.5,
      freq: freqs[0],
      freqs: uniqFreqs(freqs),
      role: n.role || 'line'
    });
  });
  return out;
}

export function scheduleNotes(notes, bpm) {
  const spb = 60 / (bpm || 80);
  const scored = scoreableNotes(notes);
  let t = 0;
  return scored.map(function (n) {
    const start = t;
    t += (n.beats || 0.5) * spb;
    return Object.assign({}, n, { start: start, end: t, window: Math.max(0.28, (n.beats || 0.5) * spb) });
  });
}
