import { noteAt } from '../lib/theory';
import { fingersFor } from '../lib/chordFingers';
const STRING_LABELS = ['E','A','D','G','B','e'];

export default function ChordDiagram(props) {
  const chord = props.chord;
  if (!chord) return null;
  const accent = props.accent || { dot:'#2ee59d', text:'#062016' };
  const positions = chord.positions || [];
  const fingers = fingersFor(chord);
  const showFingers = props.fingers !== false;
  const baseFret = chord.fret || 0;
  const fretted = positions.filter(function (p) { return typeof p === 'number' && p > 0; });
  const minFret = fretted.length ? Math.min.apply(null, fretted) : 1;
  const maxFret = fretted.length ? Math.max.apply(null, fretted) : 4;
  const start = baseFret || (maxFret > 5 ? minFret : 1);
  const FRETS = 5, W = 168, H = 210, padX = 28, padTop = 44;
  const gridW = W - padX * 2, gridH = 126;
  const dx = gridW / 5, dy = gridH / FRETS;
  const uid = 'cd' + String(chord.name || 'c').replace(/\W/g, '') + start + String(positions.join(''));

  let barre = null;
  if (fretted.length >= 3) {
    const counts = {};
    positions.forEach(function (p) { if (typeof p === 'number' && p > 0) counts[p] = (counts[p] || 0) + 1; });
    const bf = Object.keys(counts).filter(function (f) { return counts[f] >= 3 && Number(f) === minFret; })[0];
    if (bf) {
      const idxs = [];
      positions.forEach(function (p, i) { if (p === Number(bf)) idxs.push(i); });
      if (idxs.length >= 3) barre = { fret: Number(bf), from: Math.min.apply(null, idxs), to: Math.max.apply(null, idxs) };
    }
  }

  return (
    <svg viewBox={'0 0 ' + W + ' ' + H} width="100%" style={{ maxWidth: W, display: 'block', margin: '0 auto', background: '#3d2618' }} role="img" aria-label={chord.name}>
      <defs>
        <linearGradient id={uid + 'wood'} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6a452c" />
          <stop offset="50%" stopColor="#3d2618" />
          <stop offset="100%" stopColor="#2a1810" />
        </linearGradient>
        <linearGradient id={uid + 'wire'} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4ead4" />
          <stop offset="55%" stopColor="#b7a27a" />
          <stop offset="100%" stopColor="#7d6a48" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width={W} height={H} rx="8" fill="#1a120c" />
      <rect x={padX - 10} y={padTop - 8} width={gridW + 20} height={gridH + 16} rx="6" fill={'url(#' + uid + 'wood)'} />
      {start <= 1 ? <rect x={padX - 3} y={padTop - 7} width={gridW + 6} height={7} rx="1.5" fill={'url(#' + uid + 'wire)'} /> : null}
      {start > 1 ? <text x={padX - 10} y={padTop + dy * 0.7} fontSize={11} fill="#f0d37a" textAnchor="end" fontWeight={700}>{start}fr</text> : null}
      {Array.from({ length: FRETS }).map(function (_, i) {
        const y = padTop + dy * (i + 1);
        return <rect key={'f'+i} x={padX} y={y - 1} width={gridW} height={2} fill={'url(#' + uid + 'wire)'} opacity="0.9" />;
      })}
      {Array.from({ length: 6 }).map(function (_, i) {
        return <line key={'s'+i} x1={padX + dx * i} y1={padTop} x2={padX + dx * i} y2={padTop + gridH} stroke="#e6d7b8" strokeWidth={1.15 + i * 0.12} opacity="0.88" />;
      })}
      {barre ? (
        <rect
          x={padX + dx * barre.from - 9}
          y={padTop + dy * (barre.fret - start + 0.5) - 8}
          width={dx * (barre.to - barre.from) + 18}
          height={16}
          rx={8}
          fill={accent.dot}
          opacity={0.95}
        />
      ) : null}
      {positions.map(function (p, i) {
        const x = padX + dx * i;
        if (p === 'X' || p === 'x') {
          return <text key={'m'+i} x={x} y={padTop - 14} fontSize={13} fill="#c9b89a" textAnchor="middle" fontWeight={800}>X</text>;
        }
        if (p === 0) {
          return <circle key={'o'+i} cx={x} cy={padTop - 16} r={5.5} fill="none" stroke="#f4ead4" strokeWidth={2} />;
        }
        const rel = p - start + 1;
        if (rel < 1 || rel > FRETS) return null;
        const cy = padTop + dy * (rel - 0.5);
        const finger = fingers && fingers[i];
        const label = (showFingers && finger) ? String(finger) : (noteAt(i, p) || '');
        return (
          <g key={'d'+i}>
            <circle cx={x} cy={cy} r={9.5} fill={accent.dot} stroke="#fff8ea" strokeWidth={1.2} />
            <text x={x} y={cy + 3.6} fontSize={10} fill={accent.text} textAnchor="middle" fontWeight={800}>{label}</text>
          </g>
        );
      })}
      <text x={W / 2} y={18} textAnchor="middle" fontSize={13} fontWeight={800} fill="#f3efe6">{chord.name}</text>
      {STRING_LABELS.map(function (l, i) {
        return <text key={'l'+i} x={padX + dx * i} y={H - 10} fontSize={11} fill="#cbb48a" textAnchor="middle">{l}</text>;
      })}
    </svg>
  );
}
