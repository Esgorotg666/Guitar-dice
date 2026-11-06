import { bodyLook, hardwareLook, guardLook } from '../lib/locker';
import { boardKind, inlayPath } from '../lib/inlayMark';

function MiniMark(props) {
  const shape = inlayPath(props.kind, props.cx, props.cy, 2);
  if (props.kind === 'blank' || !shape) return null;
  if (shape.type === 'path') return <path d={shape.d} fill={props.fill} opacity="0.7" />;
  if (shape.type === 'poly') return <polygon points={shape.points} fill={props.fill} opacity="0.7" />;
  if (shape.type === 'rect') return <rect x={shape.x} y={shape.y} width={shape.w} height={shape.h} rx={0.3} fill={props.fill} opacity="0.6" />;
  return <circle cx={props.cx} cy={props.cy} r={1.3} fill={props.fill} opacity="0.5" />;
}

export default function GuitarPreview(props) {
  const g = (props.locker && props.locker.guitar) || { body: 'natural', guard: 'none', hardware: 'chrome', inlay: 'dots', layout: 'dots' };
  const body = bodyLook(g.body);
  const hw = hardwareLook(g.hardware);
  const guard = guardLook(g.guard);
  const kind = boardKind(g);
  const w = props.width || 170;
  const h = Math.round(w * 0.4);

  return (
    <svg className="guitarPreview" width={w} height={h} viewBox="0 0 260 104" aria-hidden="true">
      {/* neck */}
      <rect x="138" y="46" width="108" height="11" rx="2" fill="#c9b48a" />
      <rect x="242" y="40" width="14" height="23" rx="2" fill={hw.fill} />
      {[150, 166, 182, 198, 214].map(function (x) {
        return <line key={x} x1={x} y1="46" x2={x} y2="57" stroke="#8a7a60" strokeWidth="0.7" />;
      })}
      {[0,1,2,3,4,5].map(function (i) {
        return <line key={i} x1="138" y1={48.4 + i * 1.4} x2="242" y2={48.4 + i * 1.4} stroke={hw.fill} strokeWidth="0.4" opacity="0.75" />;
      })}
      {[158, 178, 198].map(function (x) {
        return <MiniMark key={x} kind={kind} cx={x} cy={51.5} fill={hw.fill} />;
      })}

      {/* body - more shaped */}
      <path d="M22 52c0-22 20-32 48-32 18 0 32 6 40 14 4-8 16-14 30-14 28 0 48 14 48 32s-20 32-48 32c-14 0-26-6-30-14-8 8-22 14-40 14-28 0-48-14-48-32z" fill={body.wood} stroke={body.edge} strokeWidth="2.2" />

      {/* sound hole */}
      <ellipse cx="88" cy="52" rx="17" ry="17" fill="#0a0a0a" stroke={hw.fill} strokeWidth="2" />
      <ellipse cx="88" cy="52" rx="12" ry="12" fill="#111" />

      {/* pickguard */}
      {guard.fill ? <ellipse cx="88" cy="52" rx="28" ry="23" fill={guard.fill} opacity="0.48" /> : null}

      {/* bridge */}
      <rect x="126" y="44" width="16" height="16" rx="1.5" fill={body.edge} />
      <rect x="128" y="48" width="12" height="8" rx="1" fill={hw.fill} opacity="0.55" />

      {/* pickup */}
      <rect x="104" y="48" width="10" height="8" rx="1" fill="#1a1a1a" stroke={hw.fill} strokeWidth="0.6" />
    </svg>
  );
}
