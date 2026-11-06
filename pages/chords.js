import { useEffect, useState } from 'react';
import ChordDiagram from '../components/ChordDiagram';

const COMMON = ['G','C','D','Em','Am','E','A','Dm','F','Bm'];

export default function ChordsPage() {
  const [chords, setChords] = useState({});
  const [selected, setSelected] = useState('G');

  useEffect(function () {
    fetch('/data/musicdata.json').then(function (r) { return r.json(); }).then(function (d) {
      if (d && d.chords) setChords(d.chords);
    }).catch(function () {});
  }, []);

  const chord = chords[selected];

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: 16, fontFamily: 'system-ui, sans-serif', color: '#e8eef4', background: '#0b1016', minHeight: '100vh' }}>
      <h1 style={{ fontSize: 24, marginBottom: 4 }}>Free Guitar Chord Charts</h1>
      <p style={{ color: '#8a9bb0', marginTop: 0 }}>Common open chords. Tap one, then practice it in Guitar Dice.</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '12px 0' }}>
        {COMMON.map(function (name) {
          return (
            <button key={name} onClick={function () { setSelected(name); }} style={{
              padding: '8px 14px', borderRadius: 6, border: '1px solid #2a3544',
              background: selected === name ? '#3b9dff' : '#141c26', color: selected === name ? '#fff' : '#c8d0d8',
              cursor: 'pointer', fontSize: 15
            }}>{name}</button>
          );
        })}
      </div>

      {chord ? (
        <div style={{ background: '#121820', borderRadius: 10, padding: 16, marginTop: 8 }}>
          <h2 style={{ margin: '0 0 8px', fontSize: 20 }}>{chord.name || selected}</h2>
          <ChordDiagram chord={chord} />
          <p style={{ color: '#8a9bb0', fontSize: 14, marginTop: 12 }}>
            Practice this chord with real songs and progressions in Guitar Dice.
          </p>
          <a href="/" style={{
            display: 'inline-block', marginTop: 8, padding: '10px 16px', background: '#2ee59d',
            color: '#062016', borderRadius: 6, textDecoration: 'none', fontWeight: 600
          }}>Open in Guitar Dice</a>
        </div>
      ) : (
        <p style={{ color: '#8a9bb0' }}>Loading chords…</p>
      )}

      <p style={{ marginTop: 24, fontSize: 13, color: '#6b7a8d' }}>
        Guitar Dice — dice-based practice, lessons, and tools for guitar players.
      </p>
    </div>
  );
}
