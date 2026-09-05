import { noteFreq } from './audio';
import { DAY_ONE_PATH } from './dayOne';

export const PASS_SCORE = 80;
export const GOLD_SCORE = 92;

export const PATHS = {
  lead: (DAY_ONE_PATH.lead || []).concat([
    { id: 'lead-alt-1', skill: 'Alternate picking' },
    { id: 'lead-rh-open', skill: 'Open-string D-U motor' },
    { id: 'lead-rh-2nps', skill: 'Two notes per string' },
    { id: 'lead-fifth-shape', skill: 'A fifth two ways' },
    { id: 'lead-pent-1', skill: 'Pentatonic box + legato' },
    { id: 'lead-vib-1', skill: 'Delayed vibrato' },
    { id: 'lead-slide-1', skill: 'Position slides' },
    { id: 'lead-bend-1', skill: 'Bend then shake' },
    { id: 'lead-rh-outside', skill: 'Outside picking' },
    { id: 'lead-rh-inside', skill: 'Inside picking' },
    { id: 'lead-rh-odds', skill: 'Odd-note groupings' },
    { id: 'lead-spider-134', skill: '1-3-2-4 spider' },
    { id: 'lead-spider-stagger', skill: 'Staggered spider' },
    { id: 'lead-spider-wide', skill: 'Wide 1-3-2-4 stretch' },
    { id: 'lead-vib-wide', skill: 'Wide blues vibrato' },
    { id: 'lead-vib-tight', skill: 'Tight rock vibrato' },
    { id: 'lead-251-clock', skill: 'ii-V-I around the clock' },
    { id: 'lead-a7', skill: 'Play the changes' },
    { id: 'lead-cmaj-work', skill: 'C major across the neck' },
    { id: 'lead-legato-neck', skill: 'Legato sequence, multi-position' }
  ]),
  rhythm: (DAY_ONE_PATH.rhythm || []).concat([
    { id: 'rhy-pm-1', skill: 'Palm-muted power chords' },
    { id: 'rhy-145-clock', skill: 'I-IV-V from three hours' },
    { id: 'rhy-country-1', skill: 'Boom-chick' },
    { id: 'rhy-folk-1', skill: 'Bass-strum walk' },
    { id: 'rhy-funk-1', skill: 'Muted 16ths' },
    { id: 'rhy-vib-chord', skill: 'Chord vibrato' },
    { id: 'rhy-aed-drive', skill: 'A E D driving rhythm' },
    { id: 'rhy-cycle-walk', skill: 'Walk five hours C-G-D-A-E' },
    { id: 'rhy-harm-min-trem', skill: 'B harmonic minor tremolo' },
    { id: 'rhy-drone-climb', skill: 'Open-E drone climb' }
  ]),
  acoustic: (DAY_ONE_PATH.acoustic || []).concat([
    { id: 'ac-1', skill: 'G C D with connecting scale' },
    { id: 'ac-rel-minor', skill: 'Inner ring relatives' },
    { id: 'ac-e4', skill: 'Change without stopping' },
    { id: 'ac-finger-1', skill: 'Thumb vs fingers' },
    { id: 'ac-im-open', skill: 'i-m on one string' },
    { id: 'ac-2', skill: 'Strum + chuck + fill' },
    { id: 'ac-vib-classical', skill: 'Around-pitch vibrato' },
    { id: 'ac-roll-aed', skill: 'A E D rolling arpeggios' },
    { id: 'ac-am-roll', skill: 'Am Dm E C finger roll' },
    { id: 'ac-drone-minor', skill: 'Let-ring minor arpeggios' }
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

export function pathFor(style) {
  return PATHS[style] || PATHS.rhythm;
}

export function scoreableNotes(notes) {
  const list = notes || [];
  const out = [];
  list.forEach(function (n, i) {
    if (!n) return;
    if (n.role === 'chord' && n.beats === 0) return;
    if (n.beats === 0 && n.role !== 'line') return;
    out.push({
      i: i,
      string: n.string,
      fret: n.fret,
      beats: n.beats || 0.5,
      freq: noteFreq(n.string, n.fret),
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
    return Object.assign({}, n, { start: start, end: t, window: Math.max(0.16, (n.beats || 0.5) * spb * 0.7) });
  });
}
