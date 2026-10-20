import { useState, useMemo } from 'react';
import ChordDiagram from './ChordDiagram';
import { parseChordKey } from '../lib/theory';

const FILTERS = [
  'all', 'rock', 'folk', 'jazz', 'black-metal', 'death-metal',
  'major', 'minor', '7ths', '9ths', 'diminished', 'suspended', 'augmented', 'power'
];

function genreTags(key, name) {
  const p = parseChordKey(key);
  const suf = (p.suffix || '').toLowerCase();
  const tags = [];
  if (!suf || suf === '' || suf === 'maj' || key.indexOf('_barre') > -1 && name.indexOf('Major') > -1) tags.push('major', 'rock', 'folk');
  if (suf.indexOf('m') === 0 && suf.indexOf('maj') === -1) tags.push('minor', 'rock', 'black-metal', 'death-metal', 'folk');
  if (suf.indexOf('7') > -1 || suf.indexOf('9') > -1 || suf.indexOf('11') > -1 || suf.indexOf('13') > -1) {
    tags.push('7ths', 'jazz', 'rock');
    if (suf.indexOf('9') > -1) tags.push('9ths');
  }
  if (suf.indexOf('dim') > -1) tags.push('diminished', 'jazz', 'black-metal');
  if (suf.indexOf('aug') > -1) tags.push('augmented', 'jazz');
  if (suf.indexOf('sus') > -1) tags.push('suspended', 'rock', 'folk');
  if (name.indexOf('Power') > -1 || key.indexOf('5') > -1) tags.push('power', 'rock', 'black-metal', 'death-metal');
  if (tags.indexOf('jazz') === -1 && (suf.indexOf('maj7') > -1 || suf.indexOf('m7') > -1)) tags.push('jazz');
  return Array.from(new Set(tags));
}

export default function ChordLibrary(props) {
  const chords = props.chords || {};
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [drawer, setDrawer] = useState(false);
  const [selectedKey, setSelectedKey] = useState(null);

  const list = useMemo(function () {
    return Object.keys(chords).map(function (k) {
      const c = chords[k];
      return Object.assign({ key: k, tags: genreTags(k, c.name || '') }, c);
    }).filter(function (c) {
      const q = search.toLowerCase();
      const matchSearch = !q || (c.name || '').toLowerCase().indexOf(q) > -1 || c.key.toLowerCase().indexOf(q) > -1;
      const matchFilter = filter === 'all' || c.tags.indexOf(filter) > -1;
      return matchSearch && matchFilter;
    }).sort(function (a, b) { return (a.name || '').localeCompare(b.name || ''); });
  }, [chords, search, filter]);

  const selected = selectedKey && chords[selectedKey] ? Object.assign({ key: selectedKey }, chords[selectedKey]) : null;

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ padding: 12, borderBottom: '1px solid #1e2a35', display: 'flex', gap: 8 }}>
        <input
          value={search}
          onChange={function (e) { setSearch(e.target.value); }}
          placeholder="Search chords…"
          style={{ flex: 1, background: '#0f1720', border: '1px solid #1e2a35', borderRadius: 8, padding: '8px 12px', color: '#e8eef5' }}
        />
        <button className="btn ghost sm" onClick={function () { setDrawer(true); }}>Filters</button>
      </div>

      {drawer ? (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 50 }} onClick={function () { setDrawer(false); }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 260, background: '#0c1218', padding: 16, overflowY: 'auto' }} onClick={function (e) { e.stopPropagation(); }}>
            <h3 style={{ marginTop: 0 }}>Genre / Type</h3>
            {FILTERS.map(function (f) {
              return (
                <button key={f} className={'btn ghost wide' + (filter === f ? ' primary' : '')} style={{ marginBottom: 6, textAlign: 'left' }}
                  onClick={function () { setFilter(f); setDrawer(false); }}>
                  {f.replace(/-/g, ' ')}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      <div style={{ maxHeight: '60vh', overflowY: 'auto', padding: 8 }}>
        {list.map(function (c) {
          return (
            <button key={c.key} className="btn ghost wide" style={{ marginBottom: 4, textAlign: 'left', justifyContent: 'space-between', display: 'flex' }}
              onClick={function () { setSelectedKey(c.key); }}>
              <span>{c.name}</span>
              <span className="muted sm">{c.tags.slice(0, 2).join(', ')}</span>
            </button>
          );
        })}
        {!list.length ? <p className="muted center">No chords match</p> : null}
      </div>

      {selected ? (
        <div style={{ borderTop: '1px solid #1e2a35', padding: 12 }}>
          <div className="rowBetween">
            <h3>{selected.name}</h3>
            <button className="btn ghost sm" onClick={function () { setSelectedKey(null); }}>Close</button>
          </div>
          <ChordDiagram chord={selected} />
          <p className="muted sm" style={{ marginTop: 8 }}>Key: {selected.key}</p>
        </div>
      ) : null}
    </div>
  );
}
