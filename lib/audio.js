
const OPEN_FREQ = [82.41,110.0,146.83,196.0,246.94,329.63];
let ctx = null, unlocked = false, bus = null;

export function audioSupported() {
  if (typeof window === 'undefined') return false;
  return !!(window.AudioContext || window.webkitAudioContext);
}
function rawCtx() {
  if (typeof window === 'undefined') return null;
  const C = window.AudioContext || window.webkitAudioContext;
  if (!C) return null;
  if (!ctx) ctx = new C();
  return ctx;
}

function buildImpulse(c, seconds, decay) {
  const rate = c.sampleRate, len = Math.floor(rate * seconds);
  const imp = c.createBuffer(2, len, rate);
  for (let ch = 0; ch < 2; ch++) {
    const d = imp.getChannelData(ch);
    for (let i = 0; i < len; i++) {
      const t = i / len;
      const early = i < rate * 0.018 ? 0.55 : 1;
      d[i] = (Math.random()*2-1) * Math.pow(1-t, decay) * early * (ch === 0 ? 1 : 0.9);
    }
  }
  return imp;
}

function buildBus(c) {
  const input = c.createGain();
  const tame = c.createBiquadFilter();
  tame.type = 'highshelf'; tame.frequency.value = 5800; tame.gain.value = -4.2;
  const air = c.createBiquadFilter();
  air.type = 'peaking'; air.frequency.value = 2800; air.Q.value = 0.7; air.gain.value = 1.4;
  const dry = c.createGain(); dry.gain.value = 0.78;
  const wet = c.createGain(); wet.gain.value = 0.22;
  const preverb = c.createBiquadFilter();
  preverb.type = 'lowpass'; preverb.frequency.value = 3100;
  const reverb = c.createConvolver(); reverb.buffer = buildImpulse(c, 1.85, 2.55);
  const master = c.createDynamicsCompressor();
  master.threshold.value = -18; master.knee.value = 24; master.ratio.value = 2.2;
  master.attack.value = 0.006; master.release.value = 0.22;
  const out = c.createGain(); out.gain.value = 0.9;
  input.connect(tame); tame.connect(air);
  air.connect(dry); dry.connect(master);
  air.connect(preverb); preverb.connect(reverb); reverb.connect(wet); wet.connect(master);
  master.connect(out); out.connect(c.destination);
  return { input:input, dry:dry, wet:wet, master:master, out:out };
}

export async function ensureAudio() {
  const c = rawCtx();
  if (!c) return null;
  if (c.state === 'suspended') { try { await c.resume(); } catch (e) {} }
  if (!unlocked) {
    try {
      const b = c.createBuffer(1,1,c.sampleRate);
      const s = c.createBufferSource();
      s.buffer = b; s.connect(c.destination); s.start(0);
      unlocked = true;
    } catch (e) {}
  }
  if (!bus) bus = buildBus(c);
  return c.state === 'running' ? c : null;
}

export function noteFreq(stringIdx, fret) {
  return (OPEN_FREQ[stringIdx] || OPEN_FREQ[0]) * Math.pow(2, fret/12);
}

function canPan(c) { return typeof c.createStereoPanner === 'function'; }
function hasTech(list, code) { return (list || []).indexOf(code) !== -1; }

function pluckOn(c, freq, time, dur, gainVal, stringIdx, dest, opts) {
  opts = opts || {};
  const target = dest || (bus ? bus.input : c.destination);
  const sr = c.sampleRate;
  const n = Math.max(2, Math.round(sr / freq));
  const len = Math.ceil(sr * Math.min(dur, opts.muted ? 1.1 : 4.2));
  const buf = c.createBuffer(1, len, sr);
  const out = buf.getChannelData(0);
  const si = stringIdx === undefined ? 2 : stringIdx;
  const decay = opts.muted
    ? 0.985
    : Math.min(0.9995, 0.9962 + (5 - si) * 0.0007);

  const line = new Float32Array(n);
  const pickAt = Math.max(1, Math.floor(n * (opts.legato ? 0.12 : 0.22)));
  for (let i = 0; i < n; i++) {
    const burst = Math.abs(i - pickAt) < n * 0.08 ? 1 : 0.35;
    line[i] = (Math.random()*2-1) * burst * (opts.legato ? 0.45 : 1);
  }
  const passes = opts.legato ? 4 : 3;
  for (let pass = 0; pass < passes; pass++) {
    for (let i = 1; i < n; i++) line[i] = (line[i] + line[i-1]) * 0.5;
  }
  let idx = 0, last = 0;
  for (let i = 0; i < len; i++) {
    const cur = line[idx], nxt = line[(idx+1) % n];
    const val = ((cur + nxt) * 0.5 * 0.88 + last * 0.12) * decay;
    line[idx] = val; last = val; out[i] = cur;
    idx = (idx+1) % n;
  }

  const src = c.createBufferSource();
  src.buffer = buf;
  const startRate = opts.slideFrom && opts.slideFrom > 20 ? (opts.slideFrom / freq) : 1;
  src.playbackRate.setValueAtTime(startRate * (1 + (Math.random()-0.5) * 0.0016), time);
  if (opts.slideFrom && opts.slideFrom > 20) {
    src.playbackRate.exponentialRampToValueAtTime(1, time + Math.min(0.18, dur * 0.35));
  }
  if (opts.bendSemis) {
    const top = Math.pow(2, opts.bendSemis / 12);
    src.playbackRate.linearRampToValueAtTime(top, time + Math.min(0.28, dur * 0.4));
    if (opts.vib) {
      src.playbackRate.linearRampToValueAtTime(top * 1.012, time + dur * 0.55);
      src.playbackRate.linearRampToValueAtTime(top * 0.992, time + dur * 0.7);
      src.playbackRate.linearRampToValueAtTime(top * 1.01, time + dur * 0.85);
    }
  } else if (opts.vib) {
    src.playbackRate.linearRampToValueAtTime(1.01, time + dur * 0.4);
    src.playbackRate.linearRampToValueAtTime(0.992, time + dur * 0.6);
    src.playbackRate.linearRampToValueAtTime(1.008, time + dur * 0.8);
  }

  const lp = c.createBiquadFilter();
  lp.type = 'lowpass'; lp.Q.value = 0.55;
  const openHz = opts.muted ? Math.min(2400, freq * 6 + 400) : Math.min(7800, freq * 11 + 900);
  lp.frequency.setValueAtTime(openHz, time);
  lp.frequency.exponentialRampToValueAtTime(Math.max(480, freq * (opts.muted ? 2.1 : 3.2)), time + Math.min(dur, 1.6));

  const b1 = c.createBiquadFilter();
  b1.type='peaking'; b1.frequency.value=95; b1.Q.value=1.05; b1.gain.value=4.6;
  const b2 = c.createBiquadFilter();
  b2.type='peaking'; b2.frequency.value=210; b2.Q.value=1.25; b2.gain.value=3.4;
  const b3 = c.createBiquadFilter();
  b3.type='peaking'; b3.frequency.value=415; b3.Q.value=1.5; b3.gain.value=2.0;
  const hp = c.createBiquadFilter();
  hp.type='highpass'; hp.frequency.value = opts.muted ? 90 : 68;

  const g = c.createGain();
  const vol = (gainVal === undefined ? 0.5 : gainVal) * (opts.muted ? 0.78 : 1) * (0.95 + Math.random()*0.08);
  g.gain.setValueAtTime(0.0001, time);
  g.gain.exponentialRampToValueAtTime(vol, time + (opts.legato ? 0.006 : 0.011));
  g.gain.exponentialRampToValueAtTime(vol * (opts.muted ? 0.18 : 0.58), time + Math.min(dur * (opts.muted ? 0.18 : 0.35), 0.8));
  g.gain.exponentialRampToValueAtTime(0.0001, time + dur);

  src.connect(lp); lp.connect(b1); b1.connect(b2); b2.connect(b3); b3.connect(hp);

  if (canPan(c)) {
    const pan = c.createStereoPanner();
    pan.pan.value = (si - 2.5) / 2.5 * 0.26;
    hp.connect(g); g.connect(pan); pan.connect(target);
  } else {
    hp.connect(g); g.connect(target);
  }

  src.start(time);
  src.stop(time + dur + 0.08);

  if (!opts.legato && !opts.muted) {
    const tlen = Math.floor(sr * 0.008);
    const tbuf = c.createBuffer(1, tlen, sr);
    const td = tbuf.getChannelData(0);
    for (let i = 0; i < tlen; i++) {
      const e = 1 - i / tlen;
      td[i] = (Math.random()*2-1) * e * e;
    }
    const ts = c.createBufferSource(); ts.buffer = tbuf;
    const tf = c.createBiquadFilter();
    tf.type='bandpass'; tf.frequency.value=Math.min(3200, freq * 6.5); tf.Q.value=0.75;
    const tg = c.createGain(); tg.gain.value = vol * 0.08;
    ts.connect(tf); tf.connect(tg); tg.connect(target);
    ts.start(time); ts.stop(time + 0.035);
  }
}

export async function playNote(stringIdx, fret, dur) {
  const c = await ensureAudio();
  if (!c) return false;
  pluckOn(c, noteFreq(stringIdx, fret), c.currentTime + 0.03, dur || 2.6, 0.5, stringIdx);
  return true;
}

export async function playFreq(freq, stringIdx, dur) {
  const c = await ensureAudio();
  if (!c) return false;
  pluckOn(c, freq, c.currentTime + 0.03, dur || 2.8, 0.5, stringIdx === undefined ? 2 : stringIdx);
  return true;
}

export async function playSequence(notes, bpm, onStep, onEnd) {
  const c = await ensureAudio();
  if (!c) { if (onEnd) onEnd(false); return null; }
  const spb = 60 / bpm;
  const timers = [];
  const gate = c.createGain();
  gate.connect(bus ? bus.input : c.destination);
  let t = c.currentTime + 0.15;
  notes.forEach(function (nt, i) {
    const beats = nt.beats || 1;
    const tech = nt.tech || [];
    const muted = hasTech(tech, 'PM');
    const legato = hasTech(tech, 'H') || hasTech(tech, 'P');
    const slide = hasTech(tech, 'S');
    const bend = hasTech(tech, 'B');
    const vib = hasTech(tech, '~');
    const freq = noteFreq(nt.string, nt.fret);
    const slideFrom = slide ? noteFreq(nt.string, Math.max(0, (nt.fret || 0) - 2)) : 0;
    const dur = muted ? Math.max(0.18, spb * beats * 0.85) : Math.max(0.9, spb * beats * (legato ? 1.8 : 2.3));
    const vol = muted ? 0.4 : (legato ? 0.46 : 0.5);
    const opts = { muted:muted, legato:legato, slideFrom:slideFrom, bendSemis: bend ? 2 : 0, vib:vib };
    if (nt.pick === 'T') {
      const reps = Math.max(2, Math.round(beats * 4));
      for (let r = 0; r < reps; r++) {
        pluckOn(c, freq, t + r * (spb * beats / reps), spb * beats / reps * 1.6, vol * 0.78, nt.string, gate, opts);
      }
    } else {
      pluckOn(c, freq, t, Math.min(dur, muted ? 0.55 : 3.1), vol, nt.string, gate, opts);
    }
    timers.push(setTimeout(function () { if (onStep) onStep(i); }, Math.max(0, (t - c.currentTime) * 1000)));
    t += spb * beats;
  });
  timers.push(setTimeout(function () {
    if (onStep) onStep(-1);
    if (onEnd) onEnd(true);
  }, Math.max(0, (t - c.currentTime) * 1000)));
  return function stop() {
    timers.forEach(clearTimeout);
    try {
      const now = c.currentTime;
      gate.gain.cancelScheduledValues(now);
      gate.gain.setValueAtTime(Math.max(0.0001, gate.gain.value), now);
      gate.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
      setTimeout(function () { try { gate.disconnect(); } catch (e) {} }, 150);
    } catch (e) {}
    if (onStep) onStep(-1);
  };
}

export async function strumChord(positions, downstroke) {
  const c = await ensureAudio();
  if (!c) return false;
  const t0 = c.currentTime + 0.05;
  const order = [];
  positions.forEach(function (p, i) { if (p !== 'X' && p !== 'x') order.push({ s:i, f:p }); });
  if (downstroke === false) order.reverse();
  const spread = 0.016 + Math.random() * 0.01;
  order.forEach(function (nt, i) {
    pluckOn(c, noteFreq(nt.s, nt.f), t0 + i*spread, 2.85, 0.4 * (downstroke === false ? 0.86 : 1) * (1 - i*0.014), nt.s);
  });
  return true;
}

export async function playProgressionChords(chords, gapMs) {
  const c = await ensureAudio();
  if (!c) return false;
  const gap = (gapMs || 900) / 1000;
  let t = c.currentTime + 0.06;
  chords.forEach(function (ch, ci) {
    if (!ch) return;
    const order = [];
    (ch.positions || []).forEach(function (p, i) { if (p !== 'X' && p !== 'x') order.push({ s:i, f:p }); });
    const seq = ci % 2 === 0 ? order : order.slice().reverse();
    seq.forEach(function (nt, i) {
      pluckOn(c, noteFreq(nt.s, nt.f), t + i*0.018, Math.max(1.7, gap*1.9), 0.4, nt.s);
    });
    t += gap;
  });
  return true;
}

export const CLICK_SOUNDS = [
  { value:'click', label:'Click', free:true },
  { value:'wood', label:'Wood block', free:false },
  { value:'snare', label:'Snare', free:false },
  { value:'rim', label:'Rimshot', free:false },
  { value:'cowbell', label:'Cowbell', free:false },
  { value:'hat', label:'Hi-hat', free:false }
];

function noiseBuffer(c, seconds) {
  const len = Math.floor(c.sampleRate * seconds);
  const b = c.createBuffer(1, len, c.sampleRate);
  const d = b.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random()*2-1;
  return b;
}

export function playClick(c, time, accent, sound, dest) {
  const target = dest || (bus ? bus.input : c.destination);
  const lvl = accent ? 1 : 0.62;
  function tone(freq, dur, type, vol) {
    const o = c.createOscillator(), g = c.createGain();
    o.type = type || 'sine';
    o.frequency.setValueAtTime(freq, time);
    g.gain.setValueAtTime(vol * lvl, time);
    g.gain.exponentialRampToValueAtTime(0.001, time + dur);
    o.connect(g); g.connect(target);
    o.start(time); o.stop(time + dur + 0.02);
  }
  function noise(dur, ft, freq, q, vol) {
    const s = c.createBufferSource();
    s.buffer = noiseBuffer(c, dur + 0.02);
    const f = c.createBiquadFilter();
    f.type = ft; f.frequency.value = freq; f.Q.value = q;
    const g = c.createGain();
    g.gain.setValueAtTime(vol * lvl, time);
    g.gain.exponentialRampToValueAtTime(0.001, time + dur);
    s.connect(f); f.connect(g); g.connect(target);
    s.start(time); s.stop(time + dur + 0.02);
  }
  if (sound === 'wood') { tone(accent?1050:820, 0.045, 'square', 0.16); noise(0.03,'bandpass',accent?1900:1500,5,0.3); }
  else if (sound === 'snare') { noise(accent?0.14:0.1,'highpass',1500,0.8,0.34); tone(accent?250:200,0.06,'triangle',0.14); }
  else if (sound === 'rim') { tone(accent?1700:1400,0.028,'square',0.14); noise(0.022,'bandpass',2600,6,0.26); }
  else if (sound === 'cowbell') { tone(accent?835:700,0.16,'square',0.11); tone(accent?555:470,0.16,'square',0.11); }
  else if (sound === 'hat') { noise(accent?0.06:0.035,'highpass',7000,1,0.26); }
  else { tone(accent?1500:1000, 0.045, 'sine', 0.42); }
}

export async function startLoop(chords, bpm, barsPerChord, withClick, onBar, clickSound, beatsPerBar) {
  const c = await ensureAudio();
  if (!c) return null;
  const spb = 60 / bpm;
  const bpb = beatsPerBar || 4;
  const barLen = spb * bpb * (barsPerChord || 1);
  const gate = c.createGain();
  gate.gain.value = 1;
  gate.connect(bus ? bus.input : c.destination);
  let idx = 0, nextTime = c.currentTime + 0.15, stopped = false;
  const timers = [];
  function scheduleOne() {
    if (stopped) return;
    const ch = chords[idx % chords.length];
    const order = [];
    (ch.positions || []).forEach(function (p, i) { if (p !== 'X' && p !== 'x') order.push({ s:i, f:p }); });
    const seq = idx % 2 === 0 ? order : order.slice().reverse();
    seq.forEach(function (nt, i) {
      pluckOn(c, noteFreq(nt.s, nt.f), nextTime + i*0.018, Math.min(barLen*1.4, 3.0), 0.36, nt.s, gate);
    });
    if (withClick) {
      for (let b = 0; b < bpb * (barsPerChord || 1); b++) {
        playClick(c, nextTime + b*spb, b % bpb === 0, clickSound || 'click', gate);
      }
    }
    const which = idx % chords.length;
    timers.push(setTimeout(function () { if (onBar) onBar(which); }, Math.max(0, (nextTime - c.currentTime) * 1000)));
    idx++;
    nextTime += barLen;
  }
  scheduleOne();
  const pump = setInterval(function () {
    if (stopped) return;
    while (nextTime < c.currentTime + barLen * 0.9) scheduleOne();
  }, 120);
  return function stop() {
    stopped = true;
    clearInterval(pump);
    timers.forEach(clearTimeout);
    try {
      const now = c.currentTime;
      gate.gain.cancelScheduledValues(now);
      gate.gain.setValueAtTime(Math.max(0.0001, gate.gain.value), now);
      gate.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
      setTimeout(function () { try { gate.disconnect(); } catch (e) {} }, 200);
    } catch (e) {}
    if (onBar) onBar(-1);
  };
}
