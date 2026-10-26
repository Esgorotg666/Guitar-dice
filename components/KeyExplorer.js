import { useState } from 'react';
import ChordDiagram from './ChordDiagram';
import { NOTE_NAMES, pitchClass, rootFromPc, chordColor, voicingLabel } from '../lib/theory';
import { strumChord } from '../lib/audio';

const MAJOR_INTERVALS = [0, 2, 4, 5, 7, 9, 11];
const MINOR_INTERVALS = [0, 2, 3, 5, 7, 8, 10];
const MAJOR_QUAL = ['', 'm', 'm', '', '', 'm', 'dim'];
const MINOR_QUAL = ['m', 'dim', '', 'm', 'm', '', ''];
const ROMAN_MAJ = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii\u00b0'];
const ROMAN_MIN = ['i', 'ii\u00b0', 'III', 'iv', 'v', 'VI', 'VII'];

function noteName(pc) {
  return rootFromPc(pc) || NOTE_NAMES[((pc % 12) + 12) % 12];
}

function buildKey(root, mode) {
  const rp = pitchClass(root);
  const ivs = mode === 'minor' ? MINOR_INTERVALS : MAJOR_INTERVALS;
  const quals = mode === 'minor' ? MINOR_QUAL : MAJOR_QUAL;
  const romans = mode === 'minor' ? ROMAN_MIN : ROMAN_MAJ;
  return ivs.map(function (iv, i) {
    const pc = (rp + iv) % 12;
    const name = noteName(pc);
    const suffix = quals[i];
    const key = name + suffix;
    return {
      roman: romans[i],
      name: name + (suffix === '' ? '' : suffix === 'm' ? 'm' : suffix),
      key: key,
      degree: i + 1
    };
  });
}

export default function KeyExplorer(props) {
  const data = props.data || { chords: {} };
  const [root, setRoot] = useState('C');
  const [mode, setMode] = useState('major');
  const chords = buildKey(root, mode);
  const relative = mode === 'major'
    ? noteName((pitchClass(root) + 9) % 12) + 'm'
    : noteName((pitchClass(root) + 3) % 12);

  return (
    <div className="card">
      <h3>Key explorer</h3>
      <p className="muted sm">
        Pick a root. See every diatonic chord in that major or minor key. Tap a chord to hear it.
        Relative {mode === 'major' ? 'minor' : 'major'}: <b>{relative}</b>.
      </p>
      <div className="optRow" style={{ marginBottom: 12, flexWrap: 'wrap' }}>
        {NOTE_NAMES.map(function (n) {
          return (
            <button
              key={n}
              className={'chipBtn' + (root === n ? ' on' : '')}
              onClick={function () { setRoot(n); }}
            >{n}</button>
          );
        })}
      </div>
      <div className="optRow" style={{ marginBottom: 16 }}>
        <button className={'chipBtn' + (mode === 'major' ? ' on' : '')} onClick={function () { setMode('major'); }}>Major</button>
        <button className={'chipBtn' + (mode === 'minor' ? ' on' : '')} onClick={function () { setMode('minor'); }}>Minor</button>
      </div>
      <div className="chordRow">
        {chords.map(function (c, i) {
          const raw = data.chords[c.key] || data.chords[c.key + '_barre'];
          const chord = raw ? Object.assign({ key: c.key }, raw) : null;
          const col = chordColor(i);
          return (
            <div
              key={c.roman}
              className="chordCard"
              style={{ borderColor: col.dot }}
              onClick={function () { if (chord) strumChord(chord.positions, true); }}
            >
              <strong>{c.roman}</strong>
              <span style={{ display: 'block', fontSize: '1.1rem' }}>{c.name}</span>
              {chord ? (
                <div>
                  <span className="chordPos">{voicingLabel(chord)}</span>
                  <ChordDiagram chord={chord} accent={col} />
                </div>
              ) : (
                <p className="muted sm">No diagram yet</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
