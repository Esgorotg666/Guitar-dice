import { OPEN_PC, pitchClass, NOTE_NAMES, SINGLE_INLAYS, DOUBLE_INLAYS } from '../lib/theory';
import { bodyLook, hardwareLook } from '../lib/locker';

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
  const guitar = (props.guitar) || { body: 'natural', hardware: 'chrome', inlay: 'dots' };
  const wood = bodyLook(guitar.body);
  const hw = hardwareLook(guitar.hardware);
  const board = wood.wood || '#0d1319';
  const edge = wood.edge || '#39485a';
  const inlayFill = hw.fill || '#243240';
  const useBlocks = guitar.inlay === 'blocks';

  function colorFor(pc) {
    for (let i = 0; i < overlays.length; i++) if (overlays[i].pcs[pc]) return overlays[i].color;
    return null;
  }

  return (
    <div className="boardScroll">
      <svg viewBox={'0 0 ' + W + ' ' + H} width={W} style={{ minWidth:'100%' }} role="img" aria-label={props.root + ' ' + mode.name}>
        <rect x={padL} y={padT} width={gw} height={gh} fill={board} rx={4} />
        {SINGLE_INLAYS.filter(function (m) { return m <= frets; }).map(function (m) {
          if (useBlocks) {
            return <rect key={'in'+m} x={padL+dx*(m-0.5)-6} y={padT+gh/2-5} width={12} height={10} rx={1} fill={inlayFill} opacity="0.55" />;
          }
          return <circle key={'in'+m} cx={padL+dx*(m-0.5)} cy={padT+gh/2} r={7} fill={inlayFill} opacity="0.45" />;
        })}
        {DOUBLE_INLAYS.filter(function (m) { return m <= frets; }).map(function (m) {
          if (useBlocks) {
            return (
              <g key={'dbl'+m}>
                <rect x={padL+dx*(m-0.5)-6} y={padT+gh*0.27-5} width={12} height={10} rx={1} fill={inlayFill} opacity="0.55" />
                <rect x={padL+dx*(m-0.5)-6} y={padT+gh*0.73-5} width={12} height={10} rx={1} fill={inlayFill} opacity="0.55" />
              </g>
            );
          }
          return (
            <g key={'dbl'+m}>
              <circle cx={padL+dx*(m-0.5)} cy={padT+gh*0.27} r={7} fill={inlayFill} opacity="0.45" />
              <circle cx={padL+dx*(m-0.5)} cy={padT+gh*0.73} r={7} fill={inlayFill} opacity="0.45" />
            </g>
          );
        })}
        {Array.from({ length:frets+1 }).map(function (_, f) {
          return <line key={'fr'+f} x1={padL+dx*f} y1={padT} x2={padL+dx*f} y2={padT+gh} stroke={f===0?hw.fill:edge} strokeWidth={f===0?4:1.2} />;
        })}
        {STRINGS.map(function (nm, s) {
          return (
            <g key={'st'+s}>
              <line x1={padL} y1={padT+dy*s} x2={padL+gw} y2={padT+dy*s} stroke={hw.fill} strokeWidth={0.7+s*0.22} opacity="0.85" />
              <text x={padL-26} y={padT+dy*s+4} fontSize={13} fill="#8b97a3" fontWeight={600}>{nm}</text>
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
            const fill = isRoot ? '#e8eef5' : (col ? col.dot : '#2b3a48');
            const txt = isRoot ? '#08121c' : (col ? col.text : '#8b97a3');
            const r = isRoot ? 12 : (col ? 11.5 : 9);
            return (
              <g key={'n'+s+'-'+f}>
                <circle cx={cx} cy={cy} r={r} fill={fill} stroke={isRoot?'#3b9dff':'none'} strokeWidth={isRoot?2.5:0} />
                <text x={cx} y={cy+3.8} fontSize={10} fill={txt} textAnchor="middle" fontWeight={700}>
                  {props.showNotes ? NOTE_NAMES[pc] : (mode.degrees[degIdx] || '')}
                </text>
              </g>
            );
          });
        })}
        {Array.from({ length:frets+1 }).map(function (_, f) {
          const marked = f === 0 || SINGLE_INLAYS.indexOf(f) !== -1 || DOUBLE_INLAYS.indexOf(f) !== -1;
          return (
            <text key={'fn'+f} x={f===0?padL-11:padL+dx*(f-0.5)} y={H-14}
              fontSize={marked?13:11} fill={marked?'#c3ced9':'#63727f'} textAnchor="middle" fontWeight={marked?700:400}>
              {f === 0 ? 'open' : f}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
