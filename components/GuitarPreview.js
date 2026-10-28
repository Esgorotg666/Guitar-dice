import { bodyLook, hardwareLook, guardLook } from '../lib/locker';
import { boardKind, inlayPath } from '../lib/inlayMark';

function MiniMark(props) {
  const shape = inlayPath(props.kind, props.cx, props.cy, 2.2);
  if (props.kind === 'blank' || !shape) return null;
  if (shape.type === 'path') return <path d={shape.d} fill={props.fill} opacity="0.75" />;
  if (shape.type === 'poly') return <polygon points={shape.points} fill={props.fill} opacity="0.75" />;
  if (shape.type === 'rect') return <rect x={shape.x} y={shape.y} width={shape.w} height={shape.h} rx={0.3} fill={props.fill} opacity="0.65" />;
  return <circle cx={props.cx} cy={props.cy} r={1.4} fill={props.fill} opacity="0.5" />;
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
    <svg className="guitarPreview" width={w} height={h} viewBox="0 0 240 100" aria-hidden="true">
      {/* neck */}
      <rect x="128" y="44" width="100" height="10" rx="2" fill="#c9b48a" />
      <rect x="224" y="38" width="12" height="22" rx="2" fill={hw.fill} />
      {/* frets */}
      {[140, 155, 170, 185, 200].map(function (x) {
        return <line key={x} x1={x} y1="44" x2={x} y2="54" stroke="#8a7a60" strokeWidth="0.6" />;
      })}
      {/* strings */}
      {[0,1,2,3,4,5].map(function (i) {
        return <line key={i} x1="128" y1={46.2 + i * 1.3} x2="224" y2={46.2 + i * 1.3} stroke={hw.fill} strokeWidth="0.35" opacity="0.8" />;
      })}
      {/* inlays */}
      {[148, 168, 188].map(function (x) {
        return <MiniMark key={x} kind={kind} cx={x} cy={49} fill={hw.fill} />;
      })}

      {/* body */}
      <ellipse cx="68" cy="50" rx="58" ry="36" fill={body.wood} stroke={body.edge} strokeWidth="2.5" />
      {/* upper bout curve suggestion */}
      <path d="M30 32c8-10 28-12 40-4" fill="none" stroke={body.edge} strokeWidth="1.5" opacity="0.4" />

      {/* sound hole */}
      <ellipse cx="82" cy="50" rx="16" ry="16" fill="#0a0a0a" stroke={hw.fill} strokeWidth="1.8" />
      <ellipse cx="82" cy="50" rx="12" ry="12" fill="#111" />

      {/* pickguard */}
      {guard.fill ? (
        <ellipse cx="82" cy="50" rx="26" ry="22" fill={guard.fill} opacity="0.5" />
      ) : null}

      {/* bridge */}
      <rect x="118" y="42" width="14" height="16" rx="1.5" fill={body.edge} />
      <rect x="120" y="46" width="10" height="8" rx="1" fill={hw.fill} opacity="0.6" />

      {/* pickup suggestion */}
      <rect x="96" y="46" width="8" height="8" rx="1" fill="#1a1a1a" stroke={hw.fill} strokeWidth="0.5" />
    </svg>
  );
}
