export const GUIDE_GAIN = { current: 1 };

export function setGuideGain(v) {
  GUIDE_GAIN.current = (typeof v === 'number' && v >= 0) ? v : 1;
}
