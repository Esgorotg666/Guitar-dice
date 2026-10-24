import { useState, useMemo } from 'react';
import Fretboard from './Fretboard';
import { LIB_ROOTS } from '../lib/theory';

const EXTRA_SCALES = [
  { id: 'pent-min', name: 'Minor Pentatonic', intervals: [0, 3, 5, 7, 10], degrees: ['1', 'b3', '4', '5', 'b7'], description: 'Classic rock, blues, and metal box' },
  { id: 'pent-maj', name: 'Major Pentatonic', intervals: [0, 2, 4, 7, 9], degrees: ['1', '2', '3', '5', '6'], description: 'Bright, open, folk and country' },
  { id: 'blues', name: 'Blues', intervals: [0, 3, 5, 6, 7, 10], degrees: ['1', 'b3', '4', 'b5', '5', 'b7'], description: 'Minor pentatonic + blue note' },
  { id: 'harm-min', name: 'Harmonic Minor', intervals: [0, 2, 3, 5, 7, 8, 11], degrees: ['1', '2', 'b3', '4', '5', 'b6', '7'], description: 'Exotic, neoclassical, and metal' },
  { id: 'mel-min', name: 'Melodic Minor', intervals: [0, 2, 3, 5, 7, 9, 11], degrees: ['1', '2', 'b3', '4', '5', '6', '7'], description: 'Jazz and modern metal' },
  { id: 'phryg-dom', name: 'Phrygian Dominant', intervals: [0, 1, 4, 5, 7, 8, 10], degrees: ['1', 'b2', '3', '4', '5', 'b6', 'b7'], description: 'Flamenco, Spanish, and metal' },
  { id: 'dorian', name: 'Dorian', intervals: [0, 2, 3, 5, 7, 9, 10], degrees: ['1', '2', 'b3', '4', '5', '6', 'b7'], description: 'Minor with natural 6 – great for rock and funk' },
  { id: 'mixolydian', name: 'Mixolydian', intervals: [0, 2, 4, 5, 7, 9, 10], degrees: ['1', '2', '3', '4', '5', '6', 'b7'], description: 'Dominant sound – rock, blues, and country' },
  { id: 'lydian', name: 'Lydian', intervals: [0, 2, 4, 6, 7, 9, 11], degrees: ['1', '2', '3', '#4', '5', '6', '7'], description: 'Dreamy major with raised 4th' },
  { id: 'phrygian', name: 'Phrygian', intervals: [0, 1, 3, 5, 7, 8, 10], degrees: ['1', 'b2', 'b3', '4', '5', 'b6', 'b7'], description: 'Dark, Spanish, and metal' },
  { id: 'locrian', name: 'Locrian', intervals: [0, 1, 3, 5, 6, 8, 10], degrees: ['1', 'b2', 'b3', '4', 'b5', 'b6', 'b7'], description: 'Diminished and unstable' },
  { id: 'whole', name: 'Whole Tone', intervals: [0, 2, 4, 6, 8, 10], degrees: ['1', '2', '3', '#4', '#5', 'b7'], description: 'Dreamy, augmented, and impressionist' }
];

export default function ScaleLibrary(props) {
  const modes = props.modes || [];
  const [root, setRoot] = useState('C');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const allScales = useMemo(function () {
    const base = modes.map(function (m) {
      return {
        id: m.id,
        name: m.name,
        intervals: m.intervals,
        degrees: m.degrees,
        description: m.description || '',
        isMode: true
      };
    });
    return base.concat(EXTRA_SCALES);
  }, [modes]);

  const list = useMemo(function () {
    const q = search.toLowerCase();
    return allScales.filter(function (s) {
      return !q || s.name.toLowerCase().indexOf(q) > -1 || (s.description || '').toLowerCase().indexOf(q) > -1;
    });
  }, [allScales, search]);

  const scaleObj = selected ? {
    id: selected.id,
    name: selected.name,
    intervals: selected.intervals,
    degrees: selected.degrees,
    description: selected.description
  } : null;

  return (
    <div className="card" style={{ padding: 0 }}>
      <div style={{ padding: 12, borderBottom: '1px solid #1e2a35', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <input
          value={search}
          onChange={function (e) { setSearch(e.target.value); }}
          placeholder="Search scales…"
          style={{ flex: 1, minWidth: 140, background: '#0f1720', border: '1px solid #1e2a35', borderRadius: 8, padding: '8px 12px', color: '#e8eef5' }}
        />
        <select value={root} onChange={function (e) { setRoot(e.target.value); }} style={{ background: '#0f1720', color: '#e8eef5', border: '1px solid #1e2a35', borderRadius: 8, padding: '8px' }}>
          {LIB_ROOTS.map(function (r) { return <option key={r} value={r}>{r}</option>; })}
        </select>
      </div>
      <div style={{ maxHeight: '45vh', overflowY: 'auto', padding: 8 }}>
        {list.map(function (s) {
          return (
            <button key={s.id} className="btn ghost wide" style={{ marginBottom: 4, textAlign: 'left' }}
              onClick={function () { setSelected(s); }}>
              {s.name}
            </button>
          );
        })}
      </div>
      {selected && scaleObj ? (
        <div style={{ borderTop: '1px solid #1e2a35', padding: 12 }}>
          <div className="rowBetween">
            <h3>{root} {selected.name}</h3>
            <button className="btn ghost sm" onClick={function () { setSelected(null); }}>Close</button>
          </div>
          <p className="muted sm">{selected.description}</p>
          <Fretboard root={root} mode={scaleObj} />
          <div className="degRow" style={{ marginTop: 8 }}>
            {(selected.degrees || []).map(function (d) { return <span key={d} className="deg">{d}</span>; })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
