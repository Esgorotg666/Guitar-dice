import { noteAt } from '../lib/theory';
import { fingersFor } from '../lib/chordFingers';
const STRING_LABELS = ['E','A','D','G','B','e'];

export default function ChordDiagram(props) {
  const chord = props.chord;
  if (!chord) return null;
  const accent = props.accent || { dot:'#3b9dff', text:'#04121f' };
  const positions = chord.positions || [];
  const fingers = fingersFor(chord);
  const showFingers = props.fingers !== false;
  const baseFret = chord.fret || 0;
  const fretted = positions.filter(function (p) { return typeof p === 'number' && p > 0; });
  const minFret = fretted.length ? Math.min.apply(null, fretted) : 1;
  const maxFret = fretted.length ? Math.max.apply(null, fretted) : 4;
  const start = baseFret || (maxFret > 5 ? minFret : 1);
  const FRETS = 5, W = 150, H = 190, padX = 26, padTop = 40;
  const gridW = W - padX*2, gridH = 118;
  const dx = gridW / 5, dy = gridH / FRETS;

  let barre = null;
  if (fretted.length >= 3) {
    const counts = {};
    positions.forEach(function (p) { if (typeof p === 'number' && p > 0) counts[p] = (counts[p]||0)+1; });
    const bf = Object.keys(counts).filter(function (f) { return counts[f] >= 3 && Number(f) === minFret; })[0];
    if (bf) {
      const idxs = [];
      positions.forEach(function (p, i) { if (p === Number(bf)) idxs.push(i); });
      if (idxs.length >= 3) barre = { fret:Number(bf), from:Math.min.apply(null,idxs), to:Math.max.apply(null,idxs) };
    }
  }

  return (
    <svg viewBox={'0 0 ' + W + ' ' + H} width="100%" style={{ maxWidth:W, display:'block', margin:'0 auto' }} role="img" aria-label={chord.name}>
      {start <= 1 ? <rect x={padX-1} y={padTop-5} width={gridW+2} height={5} fill="#e8eef5" rx={1} /> : null}
      {start > 1 ? <text x={padX-9} y={padTop+dy*0.72} fontSize={12} fill={accent.dot} textAnchor="end" fontWeight={700}>{start}fr</text> : null}
      {Array.from({ length:FRETS+1 }).map(function (_, i) {
        return <line key={'f'+i} x1={padX} y1={padTop+dy*i} x2={padX+gridW} y2={padTop+dy*i} stroke="#33414f" strokeWidth={1.2} />;
      })}
      {Array.from({ length:6 }).map(function (_, i) {
        return <line key={'s'+i} x1={padX+dx*i} y1={padTop} x2={padX+dx*i} y2={padTop+gridH} stroke="#5c6b7a" strokeWidth={1.1} />;
      })}
      {barre ? (
        <rect x={padX+dx*barre.from-8} y={padTop+dy*(barre.fret-start+0.5)-8}
          width={dx*(barre.to-barre.from)+16} height={16} rx={8} fill={accent.dot} opacity={0.92} />
      ) : null}
      {positions.map(function (p, i) {
        const x = padX + dx*i;
        if (p === 'X' || p === 'x') return <text key={'m'+i} x={x} y={padTop-10} fontSize={14} fill="#6b7a89" textAnchor="middle" fontWeight={700}>x</text>;
        if (p === 0) return <circle key={'o'+i} cx={x} cy={padTop-14} r={5} fill="none" stroke={accent.dot} strokeWidth={2} />;
        const rel = p - start + 1;
        if (rel < 1 || rel > FRETS) return null;
        const cy = padTop + dy*(rel-0.5);
        const finger = fingers && fingers[i];
        const label = (showFingers && finger) ? String(finger) : (noteAt(i, p) || '');
        return (
          <g key={'d'+i}>
            <circle cx={x} cy={cy} r={9} fill={accent.dot} />
            <text x={x} y={cy+3.6} fontSize={10} fill={accent.text} textAnchor="middle" fontWeight={800}>{label}</text>
          </g>
        );
      })}
      {STRING_LABELS.map(function (l, i) {
        return <text key={'l'+i} x={padX+dx*i} y={H-8} fontSize={11} fill="#7c8b9a" textAnchor="middle">{l}</text>;
      })}
    </svg>
  );
}
