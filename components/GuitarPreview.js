import { bodyLook, hardwareLook, guardLook } from '../lib/locker';
import { boardKind, inlayPath } from '../lib/inlayMark';

function MiniMark(props) {
  const shape = inlayPath(props.kind, props.cx, props.cy, 2.4);
  if (props.kind === 'blank' || !shape) return null;
  if (shape.type === 'path') return <path d={shape.d} fill={props.fill} opacity="0.8" />;
  if (shape.type === 'poly') return <polygon points={shape.points} fill={props.fill} opacity="0.8" />;
  if (shape.type === 'rect') return <rect x={shape.x} y={shape.y} width={shape.w} height={shape.h} rx={0.4} fill={props.fill} opacity="0.7" />;
  return <circle cx={props.cx} cy={props.cy} r={1.6} fill={props.fill} opacity="0.55" />;
}

export default function GuitarPreview(props) {
  const g = (props.locker && props.locker.guitar) || { body: 'natural', guard: 'none', hardware: 'chrome', inlay: 'dots', layout: 'dots' };
  const body = bodyLook(g.body);
  const hw = hardwareLook(g.hardware);
  const guard = guardLook(g.guard);
  const kind = boardKind(g);
  const w = props.width || 160;
  const h = Math.round(w * 0.42);
  return (
    <svg className="guitarPreview" width={w} height={h} viewBox="0 0 220 90" aria-hidden="true">
      <rect x="118" y="40" width="92" height="8" rx="2" fill="#cbb48a" />
      <rect x="206" y="34" width="10" height="20" rx="2" fill={hw.fill} />
      {[0,1,2,3,4,5].map(function (i) {
        return <line key={i} x1="118" y1={42 + i * 1.1} x2="206" y2={42 + i * 1.1} stroke={hw.fill} strokeWidth="0.4" />;
      })}
      {[138, 158, 178].map(function (x) {
        return <MiniMark key={x} kind={kind} cx={x} cy={44} fill={hw.fill} />;
      })}
      <ellipse cx="62" cy="46" rx="54" ry="34" fill={body.wood} stroke={body.edge} strokeWidth="3" />
      <ellipse cx="78" cy="46" rx="18" ry="18" fill="#111" stroke={hw.fill} strokeWidth="2" />
      {guard.fill ? <ellipse cx="78" cy="46" rx="28" ry="24" fill={guard.fill} opacity="0.55" /> : null}
      <rect x="108" y="38" width="12" height="16" rx="2" fill={body.edge} />
    </svg>
  );
}
