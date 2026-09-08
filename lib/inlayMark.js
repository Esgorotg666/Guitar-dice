import { SINGLE_INLAYS, DOUBLE_INLAYS } from './theory';

export function boardKind(guitar) {
  const g = guitar || {};
  return g.layout || g.inlay || 'dots';
}

export function inlayPath(kind, cx, cy, size) {
  const s = size || 7;
  if (kind === 'birds') {
    return {
      type: 'path',
      d: 'M ' + (cx - s) + ' ' + cy +
        ' Q ' + cx + ' ' + (cy - s * 1.35) + ' ' + (cx + s) + ' ' + cy +
        ' Q ' + cx + ' ' + (cy + s * 0.85) + ' ' + (cx - s) + ' ' + cy
    };
  }
  if (kind === 'shark') {
    return {
      type: 'poly',
      points: (cx - s) + ',' + (cy + s * 0.85) + ' ' + cx + ',' + (cy - s * 1.15) + ' ' + (cx + s) + ',' + (cy + s * 0.85)
    };
  }
  if (kind === 'split' || kind === 'blocks') {
    return { type: 'rect', x: cx - s, y: cy - s * 0.7, w: s * 2, h: s * 1.4 };
  }
  return { type: 'circle', r: s };
}

export { SINGLE_INLAYS, DOUBLE_INLAYS };
