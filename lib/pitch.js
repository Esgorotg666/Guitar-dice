export function detectPitch(buf, sampleRate) {
  const SIZE = buf.length;
  let rms = 0;
  for (let i = 0; i < SIZE; i++) rms += buf[i] * buf[i];
  rms = Math.sqrt(rms / SIZE);
  if (rms < 0.01) return -1;
  let r1 = 0, r2 = SIZE - 1;
  const thres = 0.2;
  for (let i = 0; i < SIZE / 2; i++) { if (Math.abs(buf[i]) < thres) { r1 = i; break; } }
  for (let i = 1; i < SIZE / 2; i++) { if (Math.abs(buf[SIZE - i]) < thres) { r2 = SIZE - i; break; } }
  const trimmed = buf.slice(r1, r2);
  const n = trimmed.length;
  if (n < 128) return -1;
  const c = new Float32Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i; j++) c[i] += trimmed[j] * trimmed[j + i];
  }
  let d = 0;
  while (d < n - 1 && c[d] > c[d + 1]) d++;
  let maxval = -1, maxpos = -1;
  for (let i = d; i < n; i++) { if (c[i] > maxval) { maxval = c[i]; maxpos = i; } }
  let T0 = maxpos;
  if (T0 <= 0) return -1;
  const x1 = c[T0 - 1] || 0, x2 = c[T0], x3 = c[T0 + 1] || 0;
  const a = (x1 + x3 - 2 * x2) / 2, b = (x3 - x1) / 2;
  if (a) T0 = T0 - b / (2 * a);
  const freq = sampleRate / T0;
  if (freq < 70 || freq > 1100) return -1;
  return freq;
}

export function freqToMidi(freq) {
  return 69 + 12 * Math.log2(freq / 440);
}

export function centsOff(freq, target) {
  if (!freq || !target) return 999;
  return Math.round(1200 * Math.log2(freq / target));
}
