
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

// Longer, smoother tail than before - the old one decayed too fast and dry.
function buildImpulse(c, seconds, decay) {
  const rate = c.sampleRate, len = Math.floor(rate * seconds);
  const imp = c.createBuffer(2, len, rate);
  for (let ch = 0; ch < 2; ch++) {
    const d = imp.getChannelData(ch);
    for (let i = 0; i < len; i++) {
      const t = i / len;
      const early = i < rate * 0.02 ? 0.5 : 1;
      d[i] = (Math.random()*2-1) * Math.pow(1-t, decay) * early * (ch === 0 ? 1 : 0.92);
    }
  }
  return imp;
}

function buildBus(c) {
  const input = c.createGain();
  // gentle high shelf cut so the top never gets glassy
  const tame = c.createBiquadFilter();
  tame.type = 'highshelf'; tame.frequency.value = 6500; tame.gain.value = -3.5;
  const dry = c.createGain(); dry.gain.value = 0.8;
  const wet = c.createGain(); wet.gain.value = 0.26;
  const preverb = c.createBiquadFilter();
  preverb.type = 'lowpass'; preverb.frequency.value = 3400;
  const reverb = c.createConvolver(); reverb.buffer = buildImpulse(c, 2.2, 2.4);
  const master = c.createDynamicsCompressor();
  master.threshold.value = -16; master.knee.value = 26; master.ratio.value = 2.6;
  master.attack.value = 0.008; master.release.value = 0.28;
  const out = c.createGain(); out.gain.value = 0.92;
  input.connect(tame);
  tame.connect(dry); dry.connect(master);
  tame.connect(preverb); preverb.connect(reverb); reverb.connect(wet); wet.connect(master);
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

function pluckOn(c, freq, time, dur, gainVal, stringIdx, dest) {
  const target = dest || (bus ? bus.input : c.destination);
  const sr = c.sampleRate;
  const n = Math.max(2, Math.round(sr / freq));
  const len = Math.ceil(sr * Math.min(dur, 4.5));
  const buf = c.createBuffer(1, len, sr);
  const out = buf.getChannelData(0);
  const si = stringIdx === undefined ? 2 : stringIdx;
  // wound low strings sustain longer and lose highs slower
  const decay = Math.min(0.99945, 0.99605 + (5 - si) * 0.00065);

  const line = new Float32Array(n);
  for (let i = 0; i < n; i++) line[i] = Math.random()*2-1;
  // three smoothing passes = softer, fleshier attack than the old two
  for (let pass = 0; pass < 3; pass++) {
    for (let i = 1; i < n; i++) line[i] = (line[i] + line[i-1]) * 0.5;
  }
  let idx = 0, last = 0;
  for (let i = 0; i < len; i++) {
    const cur = line[idx], nxt = line[(idx+1) % n];
    const val = ((cur + nxt) * 0.5 * 0.9 + last * 0.1) * decay;
    line[idx] = val; last = val; out[i] = cur;
    idx = (idx+1) % n;
  }

  const src = c.createBufferSource();
  src.buffer = buf;
  src.playbackRate.value = 1 + (Math.random()-0.5) * 0.0022;

  const lp = c.createBiquadFilter();
  lp.type = 'lowpass'; lp.Q.value = 0.6;
  lp.frequency.setValueAtTime(Math.min(8200, freq * 12 + 1100), time);
  lp.frequency.exponentialRampToValueAtTime(Math.max(620, freq * 3.4), time + Math.min(dur, 1.8));

  // three body resonances - the third adds the wooden midrange that was missing
  const b1 = c.createBiquadFilter();
  b1.type='peaking'; b1.frequency.value=97; b1.Q.value=1.0; b1.gain.value=4.2;
  const b2 = c.createBiquadFilter();
  b2.type='peaking'; b2.frequency.value=208; b2.Q.value=1.3; b2.gain.value=3.2;
  const b3 = c.createBiquadFilter();
  b3.type='peaking'; b3.frequency.value=430; b3.Q.value=1.6; b3.gain.value=1.8;
  const hp = c.createBiquadFilter();
  hp.type='highpass'; hp.frequency.value=72;

  const g = c.createGain();
  const vol = (gainVal === undefined ? 0.5 : gainVal) * (0.94 + Math.random()*0.12);
  g.gain.setValueAtTime(0.0001, time);
  g.gain.exponentialRampToValueAtTime(vol, time + 0.012);
  g.gain.exponentialRampToValueAtTime(vol * 0.55, time + Math.min(dur * 0.35, 0.9));
  g.gain.exponentialRampToValueAtTime(0.0001, time + dur);

  src.connect(lp); lp.connect(b1); b1.connect(b2); b2.connect(b3); b3.connect(hp);

  // slight stereo spread across the strings - low left, high right
  if (canPan(c)) {
    const pan = c.createStereoPanner();
    pan.pan.value = (si - 2.5) / 2.5 * 0.28;
    hp.connect(g); g.connect(pan); pan.connect(target);
  } else {
    hp.connect(g); g.connect(target);
  }

  src.start(time);
  src.stop(time + dur + 0.1);

  // pick transient, softer and shorter than before
  const tlen = Math.floor(sr * 0.009);
  const tbuf = c.createBuffer(1, tlen, sr);
  const td = tbuf.getChannelData(0);
  for (let i = 0; i < tlen; i++) {
    const e = 1 - i / tlen;
    td[i] = (Math.random()*2-1) * e * e;
  }
  const ts = c.createBufferSource(); ts.buffer = tbuf;
  const tf = c.createBiquadFilter();
  tf.type='bandpass'; tf.frequency.value=Math.min(3600, freq * 7); tf.Q.value=0.8;
  const tg = c.createGain(); tg.gain.value = vol * 0.11;
  ts.connect(tf); tf.connect(tg); tg.connect(target);
  ts.start(time); ts.stop(time + 0.04);
}

export async function playNote(stringIdx, fret, dur) {
  const c = await ensureAudio();
  if (!c) return false;
  pluckOn(c, noteFreq(stringIdx, fret), c.currentTime + 0.03, dur || 2.6, 0.5, stringIdx);
  return true;
}

// Plays an arbitrary frequency - used by the tuner reference pitches.
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
    const dur = Math.max(1.0, spb * beats * 2.4);
    // palm muted notes are short and damped; tremolo repeats within the beat
    const tech = nt.tech || [];
    const muted = tech.indexOf('PM') !== -1;
    const vol = muted ? 0.42 : 0.5;
    if (nt.pick === 'T') {
      const reps = Math.max(2, Math.round(beats * 4));
      for (let r = 0; r < reps; r++) {
        pluckOn(c, noteFreq(nt.string, nt.fret), t + r * (spb * beats / reps), spb * beats / reps * 1.8, vol * 0.8, nt.string, gate);
      }
    } else {
      pluckOn(c, noteFreq(nt.string, nt.fret), t, muted ? Math.min(dur, spb * beats * 1.1) : Math.min(dur, 3.2), vol, nt.string, gate);
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
      gate.gain.setValueAtTime(gate.gain.value, now);
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
  const spread = 0.019 + Math.random() * 0.011;
  order.forEach(function (nt, i) {
    pluckOn(c, noteFreq(nt.s, nt.f), t0 + i*spread, 3.0, 0.42 * (downstroke === false ? 0.86 : 1) * (1 - i*0.015), nt.s);
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
      pluckOn(c, noteFreq(nt.s, nt.f), t + i*0.021, Math.max(1.8, gap*2), 0.42, nt.s);
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
      pluckOn(c, noteFreq(nt.s, nt.f), nextTime + i*0.021, Math.min(barLen*1.5, 3.2), 0.38, nt.s, gate);
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
      gate.gain.setValueAtTime(gate.gain.value, now);
      gate.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
      setTimeout(function () { try { gate.disconnect(); } catch (e) {} }, 200);
    } catch (e) {}
    if (onBar) onBar(-1);
  };
}
