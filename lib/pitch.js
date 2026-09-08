const MIN_HZ = 70;
const MAX_HZ = 1100;

export const CLARITY = {
  lead: { k: 0.93, min: 0.88 },
  chord: { k: 0.85, min: 0.70 },
  tuner: { k: 0.93, min: 0.90 },
  default: { k: 0.9, min: 0.75 }
};

function profile(mode) {
  return CLARITY[mode] || CLARITY.default;
}

function rmsOf(buf) {
  var s = 0;
  var i;
  for (i = 0; i < buf.length; i++) s += buf[i] * buf[i];
  return Math.sqrt(s / buf.length);
}

function nsdfOf(x, maxTau) {
  var n = x.length;
  var tauMax = Math.min(maxTau, n - 2);
  var out = new Float32Array(tauMax + 1);
  var tau, j, acf, m, last;
  out[0] = 1;
  for (tau = 1; tau <= tauMax; tau++) {
    acf = 0;
    m = 0;
    last = n - tau;
    for (j = 0; j < last; j++) {
      acf += x[j] * x[j + tau];
      m += x[j] * x[j] + x[j + tau] * x[j + tau];
    }
    out[tau] = m > 0 ? (2 * acf) / m : 0;
  }
  return out;
}

function keyMaxima(nsdf, minTau) {
  var peaks = [];
  var i;
  for (i = Math.max(2, minTau); i < nsdf.length - 1; i++) {
    if (nsdf[i] > nsdf[i - 1] && nsdf[i] >= nsdf[i + 1] && nsdf[i] > 0.5) {
      peaks.push(i);
    }
  }
  return peaks;
}

function refineTau(nsdf, tau) {
  var x1 = nsdf[tau - 1] || 0;
  var x2 = nsdf[tau];
  var x3 = nsdf[tau + 1] || 0;
  var a = (x1 + x3 - 2 * x2) / 2;
  var b = (x3 - x1) / 2;
  if (!a) return tau;
  var shift = b / (2 * a);
  if (shift > 1 || shift < -1) return tau;
  return tau - shift;
}

export function detectPitchInfo(buf, sampleRate, mode) {
  var empty = { freq: -1, clarity: 0, mode: mode || 'default' };
  var cfg = profile(mode);
  if (!buf || !sampleRate || buf.length < 128) return empty;
  if (rmsOf(buf) < 0.01) return empty;

  var lo = mode === 'tuner' ? 55 : MIN_HZ;
  var hi = mode === 'tuner' ? 1200 : MAX_HZ;
  var minTau = Math.max(2, Math.floor(sampleRate / hi));
  var maxTau = Math.min(buf.length - 2, Math.ceil(sampleRate / lo));
  if (maxTau <= minTau + 2) return empty;

  var nsdf = nsdfOf(buf, maxTau);
  var peaks = keyMaxima(nsdf, minTau);
  if (!peaks.length) return empty;

  var nMax = 0;
  var p;
  for (p = 0; p < peaks.length; p++) {
    if (nsdf[peaks[p]] > nMax) nMax = nsdf[peaks[p]];
  }
  if (nMax < cfg.min) return empty;

  var chosen = peaks[peaks.length - 1];
  var thresh = cfg.k * nMax;
  for (p = 0; p < peaks.length; p++) {
    if (nsdf[peaks[p]] >= thresh) {
      chosen = peaks[p];
      break;
    }
  }

  var tau = refineTau(nsdf, chosen);
  if (tau <= 0) return empty;
  var freq = sampleRate / tau;
  if (freq < lo || freq > hi) return empty;
  var clarity = Math.min(1, nsdf[chosen]);
  if (clarity < cfg.min) return empty;
  return { freq: freq, clarity: clarity, mode: mode || 'default' };
}

export function detectPitch(buf, sampleRate, mode) {
  return detectPitchInfo(buf, sampleRate, mode).freq;
}

export function freqToMidi(freq) {
  return 69 + 12 * Math.log2(freq / 440);
}

export function centsOff(freq, target) {
  if (!freq || !target) return 999;
  return Math.round(1200 * Math.log2(freq / target));
}

export function centsOffOctave(freq, target) {
  if (!freq || !target) return 999;
  var c = 1200 * Math.log2(freq / target);
  c = ((c % 1200) + 1800) % 1200 - 600;
  return Math.round(c);
}

export function matchesPitch(freq, target, windowCents) {
  return Math.abs(centsOffOctave(freq, target)) <= (windowCents || 70);
}

export function matchesAnyPitch(freq, targets, windowCents) {
  if (!freq || !targets || !targets.length) return false;
  var i;
  for (i = 0; i < targets.length; i++) {
    if (matchesPitch(freq, targets[i], windowCents)) return true;
  }
  return false;
}
