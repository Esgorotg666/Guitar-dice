import { OPEN_PC, pitchClass, NOTE_NAMES, SINGLE_INLAYS, DOUBLE_INLAYS } from '../lib/theory';
import { bodyLook, hardwareLook, loadLocker } from '../lib/locker';
import InlayLayer from './InlayLayer';

function teachWood(hex) {
  const h = String(hex || '').replace('#', '');
  if (h.length < 6) return '#5a3a24';
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const lum = (0.22 * r + 0.7 * g + 0.08 * b);
  return lum < 48 ? '#5a3a24' : hex;
}

export default function Fretboard(props) {
  const mode = props.mode;
  if (!mode) return null;
  const frets = props.frets || 15;
  const overlays = props.overlays || [];
  const idx = pitchClass(props.root);
  const inScale = {};
  mode.intervals.forEach(function (iv) { inScale[(idx+iv) % 12] = true; });
  const W = 900, H = 230, padL = 42, padT = 26;
  const gw = W - padL - 20, gh = H - padT - 44;
  const dx = gw / frets, dy = gh / 5;
  const STRINGS = ['e','B','G','D','A','E'];
  const guitar = props.guitar || (typeof window === 'undefined'
    ? { body: 'natural', hardware: 'chrome', layout: 'dots' }
    : loadLocker().guitar);
  const wood = bodyLook(guitar.body);
  const hw = hardwareLook(guitar.hardware);
  const board = teachWood(wood.wood || '#5a3a24');
  const edge = wood.edge || '#39485a';
  const stringCol = hw && hw.fill === '#2a3036' ? '#d7c7a2' : (hw.fill || '#c5d0da');

  function colorFor(pc) {
    for (let i = 0; i < overlays.length; i++) if (overlays[i].pcs[pc]) return overlays[i].color;
    return null;
  }

  return (
    <div className="boardScroll">
      <svg viewBox={'0 0 ' + W + ' ' + H} width="100%" style={{ minWidth:'100%', background: board }} role="img" aria-label={props.root + ' ' + mode.name}>
        <rect x={padL} y={padT} width={gw} height={gh} fill={board} rx={4} />
        <InlayLayer guitar={guitar} padL={padL} padT={padT} dx={dx} gh={gh} frets={frets} />
        {Array.from({ length:frets+1 }).map(function (_, f) {
          return <line key={'fr'+f} x1={padL+dx*f} y1={padT} x2={padL+dx*f} y2={padT+gh} stroke={f===0?'#f3efe6':edge} strokeWidth={f===0?4:1.2} />;
        })}
        {STRINGS.map(function (nm, s) {
          return (
            <g key={'st'+s}>
              <line x1={padL} y1={padT+dy*s} x2={padL+gw} y2={padT+dy*s} stroke={stringCol} strokeWidth={0.7+s*0.22} opacity="0.9" />
              <text x={padL-26} y={padT+dy*s+4} fontSize={13} fill="#e8dcc8" fontWeight={600}>{nm}</text>
            </g>
          );
        })}
        {OPEN_PC.map(function (openNote, s) {
          return Array.from({ length:frets+1 }).map(function (_, f) {
            const pc = (openNote + f) % 12;
            if (!inScale[pc]) return null;
            const isRoot = pc === idx;
            const degIdx = mode.intervals.indexOf((pc - idx + 12) % 12);
            const col = colorFor(pc);
            const cx = f === 0 ? padL-11 : padL+dx*(f-0.5);
            const cy = padT + dy*(5-s);
            const fill = isRoot ? '#e8eef5' : (col ? col.dot : '#7dffa8');
            const txt = isRoot ? '#08121c' : (col ? col.text : '#062016');
            const r = isRoot ? 12 : (col ? 11.5 : 9);
            return (
              <g key={'n'+s+'-'+f}>
                <circle cx={cx} cy={cy} r={r} fill={fill} stroke={isRoot?'#3b9dff':'#14532d'} strokeWidth={isRoot?2.5:1} />
                <text x={cx} y={cy+3.8} fontSize={10} fill={txt} textAnchor="middle" fontWeight={700}>
                  {props.showNotes ? NOTE_NAMES[pc] : ((mode.degrees && mode.degrees[degIdx]) || '')}
                </text>
              </g>
            );
          });
        })}
        {Array.from({ length:frets+1 }).map(function (_, f) {
          const marked = f === 0 || SINGLE_INLAYS.indexOf(f) !== -1 || DOUBLE_INLAYS.indexOf(f) !== -1;
          return (
            <text key={'fn'+f} x={f===0?padL-11:padL+dx*(f-0.5)} y={H-14}
              fontSize={marked?13:11} fill={marked?'#f0d37a':'#cbb48a'} textAnchor="middle" fontWeight={marked?700:400}>
              {f === 0 ? 'open' : f}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
