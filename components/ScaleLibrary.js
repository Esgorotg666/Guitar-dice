import { useState } from 'react';
import Fretboard from './Fretboard';
import { LIB_ROOTS } from '../lib/theory';

const SCALES = [
  { id: 'ionian', name: 'Major (Ionian)', intervals: [0,2,4,5,7,9,11], degrees: ['1','2','3','4','5','6','7'], description: 'Bright major scale' },
  { id: 'aeolian', name: 'Natural Minor', intervals: [0,2,3,5,7,8,10], degrees: ['1','2','b3','4','5','b6','b7'], description: 'Classic minor' },
  { id: 'pent-min', name: 'Minor Pentatonic', intervals: [0,3,5,7,10], degrees: ['1','b3','4','5','b7'], description: 'Rock/blues/metal box' },
  { id: 'pent-maj', name: 'Major Pentatonic', intervals: [0,2,4,7,9], degrees: ['1','2','3','5','6'], description: 'Bright folk/country' },
  { id: 'blues', name: 'Blues', intervals: [0,3,5,6,7,10], degrees: ['1','b3','4','b5','5','b7'], description: 'Pentatonic + blue note' },
  { id: 'harm-min', name: 'Harmonic Minor', intervals: [0,2,3,5,7,8,11], degrees: ['1','2','b3','4','5','b6','7'], description: 'Metal and neoclassical' },
  { id: 'mel-min', name: 'Melodic Minor', intervals: [0,2,3,5,7,9,11], degrees: ['1','2','b3','4','5','6','7'], description: 'Jazz and modern' },
  { id: 'phryg-dom', name: 'Phrygian Dominant', intervals: [0,1,4,5,7,8,10], degrees: ['1','b2','3','4','5','b6','b7'], description: 'Flamenco and metal' }
];

export default function ScaleLibrary(props) {
  const [root, setRoot] = useState('C');
  const [selected, setSelected] = useState(SCALES[0]);
  const scaleObj = { id: selected.id, name: selected.name, intervals: selected.intervals, degrees: selected.degrees, description: selected.description };
  return (
    <div className="card">
      <h3>Scale Library</h3>
      <select value={root} onChange={function(e){ setRoot(e.target.value); }} style={{marginBottom:8, background:'#0f1720', color:'#e8eef5', padding:6, borderRadius:6}}>
        {LIB_ROOTS.map(function(r){ return <option key={r} value={r}>{r}</option>; })}
      </select>
      <div style={{display:'flex', flexWrap:'wrap', gap:6, marginBottom:12}}>
        {SCALES.map(function(s){
          return <button key={s.id} className={'btn ghost sm' + (selected.id===s.id ? ' primary' : '')} onClick={function(){ setSelected(s); }}>{s.name}</button>;
        })}
      </div>
      <p className="muted sm">{selected.description}</p>
      <Fretboard root={root} mode={scaleObj} />
      <div className="degRow">{selected.degrees.map(function(d){ return <span key={d} className="deg">{d}</span>; })}</div>
    </div>
  );
}
