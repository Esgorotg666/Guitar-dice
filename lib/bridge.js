import { parseChordKey, pitchClass, rootFromPc } from './theory';

const DEVICES = [
  { id:'secondary-dominant', label:'V7 setup', offset:7, suffix:'7',
    why: function (t) { return 'The V7 of ' + t + '. It pulls hard into the next chord - the strongest setup there is.'; } },
  { id:'tritone-sub', label:'Tritone sub', offset:1, suffix:'7',
    why: function (t) { return 'A half step above ' + t + '. Same tension as the V7, but it slides down chromatically instead.'; } },
  { id:'dim-approach', label:'Diminished approach', offset:-1, suffix:'dim7',
    why: function (t) { return 'Walks up into ' + t + ' by a half step. Every note is a leading tone.'; } },
  { id:'ii-chord', label:'ii before the V', offset:2, suffix:'m7',
    why: function (t) { return 'The ii of ' + t + '. Play it, then the V7, and the arrival feels inevitable.'; } },
  { id:'chromatic-slide', label:'Chromatic slide', offset:1, suffix:'m7',
    why: function (t) { return 'Slides down a half step into ' + t + '. Keep the shape, move the whole thing one fret.'; } },
  { id:'backdoor', label:'Backdoor approach', offset:-2, suffix:'7',
    why: function (t) { return 'Comes at ' + t + ' from a whole step below. Softer than the V7 - a side door rather than the front.'; } }
];

export function rollBridge(fromChord, toChord, chords) {
  if (!toChord) return null;
  const targetPc = pitchClass(parseChordKey(toChord.key).root);
  const options = [];
  DEVICES.forEach(function (d) {
    const root = rootFromPc(targetPc + d.offset);
    if (!root) return;
    const key = root + d.suffix;
    if (!chords[key]) return;
    if (fromChord && key === fromChord.key) return;
    if (key === toChord.key) return;
    options.push({
      kind:'bridge', device:d.id, label:d.label, key:key,
      chord: Object.assign({ key:key }, chords[key]),
      why: d.why(toChord.name)
    });
  });
  if (!options.length) return null;
  return options[Math.floor(Math.random() * options.length)];
}

export function defaultSlots(count) {
  const s = [];
  for (let i = 0; i < count; i++) s.push('chord');
  return s;
}
export function sanitiseSlots(slots) {
  const out = slots.slice();
  for (let i = 0; i < out.length; i++) {
    if (out.filter(function (s) { return s === 'chord'; }).length >= 2) break;
    if (out[i] === 'bridge') out[i] = 'chord';
  }
  return out;
}
