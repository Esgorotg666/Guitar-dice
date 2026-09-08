import { loadLocker, bodyLook, hardwareLook } from '../lib/locker';
import { boardKind, inlayPath, SINGLE_INLAYS, DOUBLE_INLAYS } from '../lib/inlayMark';

function Mark(props) {
  const shape = inlayPath(props.kind, props.cx, props.cy, props.size || 7);
  if (props.kind === 'blank' || !shape) return null;
  const fill = props.fill;
  const op = props.kind === 'glow' ? 0.9 : 0.7;
  if (shape.type === 'path') return <path d={shape.d} fill={fill} opacity={op} />;
  if (shape.type === 'poly') return <polygon points={shape.points} fill={fill} opacity={op} />;
  if (shape.type === 'rect') return <rect x={shape.x} y={shape.y} width={shape.w} height={shape.h} rx={1} fill={fill} opacity={0.6} />;
  return <circle cx={props.cx} cy={props.cy} r={props.kind === 'glow' ? shape.r + 1 : shape.r} fill={fill} opacity={props.kind === 'glow' ? 0.85 : 0.45} />;
}

export default function InlayLayer(props) {
  const guitar = props.guitar || (typeof window === 'undefined' ? { layout: 'dots' } : loadLocker().guitar);
  const kind = boardKind(guitar);
  const hw = hardwareLook(guitar.hardware);
  const fill = kind === 'glow' ? '#9be7ff' : (hw.fill || '#c4a574');
  const padL = props.padL;
  const padT = props.padT;
  const dx = props.dx;
  const gh = props.gh;
  const frets = props.frets;
  const size = props.size || 7;

  return (
    <g aria-hidden="true">
      {SINGLE_INLAYS.filter(function (m) { return m <= frets; }).map(function (m) {
        return (
          <g key={'in' + m}>
            <Mark kind={kind} cx={padL + dx * (m - 0.5)} cy={padT + gh / 2} fill={fill} size={size} />
          </g>
        );
      })}
      {DOUBLE_INLAYS.filter(function (m) { return m <= frets; }).map(function (m) {
        return (
          <g key={'dbl' + m}>
            <Mark kind={kind} cx={padL + dx * (m - 0.5)} cy={padT + gh * 0.27} fill={fill} size={size} />
            <Mark kind={kind} cx={padL + dx * (m - 0.5)} cy={padT + gh * 0.73} fill={fill} size={size} />
          </g>
        );
      })}
    </g>
  );
}

export function useBoardGuitar(guitar) {
  if (guitar) return guitar;
  if (typeof window === 'undefined') return { layout: 'dots', hardware: 'chrome', body: 'natural' };
  return loadLocker().guitar;
}

export { bodyLook, hardwareLook, boardKind };
