import { useState, useMemo } from 'react';
import Fretboard from './Fretboard';
import { LIB_ROOTS } from '../lib/theory';

const EXTRA_SCALES = [
  { id: 'pent-min', name: 'Minor Pentatonic', intervals: [0, 3, 5, 7, 10], degrees: ['1', 'b3', '4', '5', 'b7'], description: 'The classic rock/blues/metal box', genres: ['rock', 'blues', 'black-metal', 'death-metal'] },
  { id: 'pent-maj', name: 'Major Pentatonic', intervals: [0, 2, 4, 7, 9], degrees: ['1', '2', '3', '5', '6'], description: 'Bright, open, country/folk', genres: ['folk', 'rock', 'country'] },
  { id: 'blues', name: 'Blues', intervals: [0, 3, 5, 6, 7, 10], degrees: ['1', 'b3', '4', 'b5', '5', 'b7'], description: 'Minor pent + blue note', genres: ['blues', 'rock'] },
  { id: 'harm-min', name: 'Harmonic Minor', intervals: [0, 2, 3, 5, 7, 8, 11], degrees: ['1', '2', 'b3', '4', '5', 'b6', '7'], description: 'Exotic, metal, neoclassical', genres: ['black-metal', 'death-metal', 'jazz', 'neo-classical'] },
  { id: 'mel-min', name: 'Melodic Minor', intervals: [0, 2, 3, 5, 7, 9, 11], degrees: ['1', '2', 'b3', '4', '5', '6', '7'], description: 'Jazz and modern metal', genres: ['jazz', 'metal'] },
  { id: 'phryg-dom', name: 'Phrygian Dominant', intervals: [0, 1, 4, 5, 7, 8, 10], degrees: ['1', 'b2', '3', '4', '5', 'b6', 'b7'], description: 'Spanish/flamenco and metal', genres: ['flamenco', 'black-metal', 'jazz'] },
  { id: 'dim', name: 'Diminished (half-whole)', intervals: [0, 1, 3, 4, 6, 7, 9, 10], degrees: ['1', 'b2', 'b3', '3', 'b5', '5', '6', 'b7'], description: 'Symmetrical diminished scale', genres: ['jazz', 'metal'] }
];

const FILTERS = ['all', 'major', 'minor', 'modes', 'pentatonic', 'blues', 'harmonic', 'jazz', 'rock', 'black-metal', 'folk'];

export default function ScaleLibrary(props) {
  const modes = props.modes || [];
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [drawer, setDrawer] = useState(false);
  const [root, setRoot] = useState('C');
  const [selected, setSelected] = useState(null);

  const allScales = useMemo(function () {
    const base = modes.map(function (m) {
      return {
        id: m.id,
        name: m.name,
        intervals: m.intervals,
        degrees: m.degrees,
        description: m.description,
        genres: m.quality === 'major' ? ['major', 'rock', 'folk', 'jazz'] : ['minor', 'rock', 'black-metal', 'modes'],
        isMode: true
      };
    });
    return base.concat(EXTRA_SCALES);
  }, [modes]);

  const list = useMemo(function () {
    return allScales.filter(function (s) {
      const q = search.toLowerCase();
      const matchSearch = !q || s.name.toLowerCase().indexOf(q) > -1;
      const matchFilter = filter === 'all' ||
        (s.genres && s.genres.indexOf(filter) > -1) ||
        (filter === 'modes' && s.isMode) ||
        (filter === 'pentatonic' && s.id.indexOf('pent') > -1);
      return matchSearch && matchFilter;
    });
  }, [allScales, search, filter]);

  const scaleObj = selected ? { id: selected.id, name: selected.name, intervals: selected.intervals, degrees: selected.degrees, description: selected.description } : null;

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
        <button className="btn ghost sm" onClick={function () { setDrawer(true); }}>Filters</button>
      </div>

      {drawer ? (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 50 }} onClick={function () { setDrawer(false); }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 260, background: '#0c1218', padding: 16, overflowY: 'auto' }} onClick={function (e) { e.stopPropagation(); }}>
            <h3 style={{ marginTop: 0 }}>Type / Style</h3>
            {FILTERS.map(function (f) {
              return (
                <button key={f} className={'btn ghost wide' + (filter === f ? ' primary' : '')} style={{ marginBottom: 6, textAlign: 'left' }}
                  onClick={function () { setFilter(f); setDrawer(false); }}>
                  {f}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      <div style={{ maxHeight: '50vh', overflowY: 'auto', padding: 8 }}>
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
