import { useEffect, useRef, useState } from 'react';
import { playSequence, playProgressionChords, strumChord } from '../lib/audio';
import { noteAt, SINGLE_INLAYS, DOUBLE_INLAYS } from '../lib/theory';

const STRINGS = ['e','B','G','D','A','E'];
const FALLBACK_LEGEND = {
  D:'Downstroke', U:'Upstroke', T:'Tremolo (rapid alternate)', PM:'Palm muted',
  '3':'Triplet', '2':'Double stop', H:'Hammer-on', P:'Pull-off',
  B:'Bend', S:'Slide', TAP:'Tapped', '~':'Vibrato', L:'Let ring'
};
const FALLBACK_ORDER = ['D','U','T','PM','3','2','H','P','B','S','TAP','~','L'];

function shapeDots(shape) {
  const positions = (shape && shape.positions) || [];
  const out = [];
  positions.forEach(function (p, stringIdx) {
    if (p === 'X' || p === 'x' || p == null) return;
    out.push({ string: stringIdx, fret: Number(p), name: noteAt(stringIdx, Number(p)) });
  });
  return out;
}

function buildGroups(notes) {
  const groups = [];
  const index = {};
  notes.forEach(function (n, i) {
    if (n.group == null) return;
    if (index[n.group] == null) {
      index[n.group] = groups.length;
      groups.push({
        id: n.group,
        role: n.role || 'line',
        label: n.groupLabel || (n.role === 'chord' ? 'Chord' : 'Line'),
        notes: []
      });
    }
    const g = groups[index[n.group]];
    if (n.groupLabel) g.label = n.groupLabel;
    if (n.role) g.role = n.role;
    g.notes.push(Object.assign({ _i:i }, n));
  });
  return groups;
}

export default function LessonPlayer(props) {
  const notes = props.notes || [];
  const groups = buildGroups(notes);
  const grouped = groups.length > 0;
  const passed = (props.shapes || []).filter(function (s) { return s && s.positions; });
  const chordKeys = grouped ? [] : ((props.chordKeys && props.chordKeys.length) ? props.chordKeys : ((notes[0] && notes[0].chordKeys) || []));
  const [loaded, setLoaded] = useState([]);
  const shapes = passed.length ? passed : loaded;
  const chordMode = !grouped && !!(props.chordMode || chordKeys.length >= 2) && shapes.length >= 2;
  const baseBpm = props.bpm || 80;
  const legend = props.legend || FALLBACK_LEGEND;
  const legendOrder = props.legendOrder || FALLBACK_ORDER;
  const [bpm, setBpm] = useState(baseBpm);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const stopRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(function () { setBpm(baseBpm); }, [baseBpm]);
  useEffect(function () { return function () { if (stopRef.current) stopRef.current(); }; }, []);
  useEffect(function () {
    if (grouped || passed.length || chordKeys.length < 2) return;
    var alive = true;
    fetch('/data/musicdata.json').then(function (r) { return r.json(); }).then(function (d) {
      if (!alive || !d || !d.chords) return;
      setLoaded(chordKeys.map(function (k) {
        return d.chords[k] ? Object.assign({ key:k }, d.chords[k]) : null;
      }).filter(Boolean));
    }).catch(function () {});
    return function () { alive = false; };
  }, [chordKeys.join('|')]);

  const currentGroup = grouped ? groups[Math.max(0, Math.min(active, groups.length - 1))] : null;
  const boardNotes = grouped
    ? (currentGroup ? currentGroup.notes : notes)
    : (chordMode ? shapeDots(shapes[Math.max(0, active)] || shapes[0]) : notes);
  const maxFret = boardNotes.reduce(function (m, n) { return Math.max(m, n.fret || 0); }, 0);
  const frets = Math.max(7, Math.min(15, maxFret + 2));
  const W = 880, H = 236, padL = 40, padT = 30;
  const gw = W - padL - 20, gh = H - padT - 56;
  const dx = gw / frets, dy = gh / 5;
  const holdAll = chordMode || (grouped && currentGroup && currentGroup.role === 'chord');

  async function toggle() {
    if (playing) {
      if (stopRef.current) stopRef.current();
      stopRef.current = null;
      setPlaying(false); setActive(0);
      return;
    }
    setPlaying(true); setBlocked(false);
    if (grouped) {
      const spb = 60 / bpm;
      const timers = [];
      let delay = 0;
      groups.forEach(function (g, gi) {
        const start = delay;
        timers.push(setTimeout(function () { setActive(gi); }, start * 1000));
        if (g.role === 'chord') {
          const positions = ['X','X','X','X','X','X'];
          g.notes.forEach(function (nt) { positions[nt.string] = nt.fret; });
          timers.push(setTimeout(function () { strumChord(positions, true); }, start * 1000));
          delay += Math.max(g.notes[0] && g.notes[0].beats ? g.notes[0].beats * spb : 2 * spb, 0.8);
        } else {
          g.notes.forEach(function (nt) { delay += (nt.beats || 0.5) * spb; });
          timers.push(setTimeout(function () { playSequence(g.notes, bpm); }, start * 1000));
        }
      });
      timers.push(setTimeout(function () {
        setPlaying(false); setActive(0); stopRef.current = null;
      }, delay * 1000 + 80));
      stopRef.current = function () { timers.forEach(clearTimeout); };
      return;
    }
    if (chordMode) {
      setActive(0);
      const gap = Math.round((60 / bpm) * 4 * 1000);
      const ok = await playProgressionChords(shapes, gap);
      if (!ok) { setPlaying(false); setBlocked(true); return; }
      const timers = [];
      shapes.forEach(function (_, i) {
        timers.push(setTimeout(function () { setActive(i); }, i * gap));
      });
      timers.push(setTimeout(function () {
        setPlaying(false); setActive(0); stopRef.current = null;
      }, shapes.length * gap));
      stopRef.current = function () { timers.forEach(clearTimeout); };
      return;
    }
    const stop = await playSequence(notes, bpm,
      function (i) { setActive(i); },
      function (ok) { setPlaying(false); stopRef.current = null; if (!ok) setBlocked(true); });
    if (!stop) { setPlaying(false); setBlocked(true); return; }
    stopRef.current = stop;
  }

  function setTempo(v) {
    const next = Math.max(30, Math.min(220, v));
    setBpm(next);
    if (playing && stopRef.current) {
      stopRef.current(); stopRef.current = null;
      setPlaying(false); setActive(0);
    }
  }

  const pct = Math.round((bpm / baseBpm) * 100);
  const usedKeys = {};
  notes.forEach(function (n) {
    if (n.pick) usedKeys[n.pick] = true;
    (n.tech || []).forEach(function (t) { usedKeys[t] = true; });
  });
  const shown = legendOrder.filter(function (k) { return usedKeys[k]; });
  function pickGlyph(p) { return p === 'U' ? 'V' : (p === 'T' ? 'T' : 'M'); }
  const heading = grouped && currentGroup
    ? currentGroup.label
    : (chordMode && shapes[Math.max(0, active)] ? (shapes[Math.max(0, active)].name || shapes[Math.max(0, active)].key) : null);

  return (
    <div className="lessonPlayer">
      {heading ? (
        <p className="lessonKey" style={{ margin:'0 0 8px' }}>
          {grouped && currentGroup && currentGroup.role === 'line'
            ? <span>Connecting line: <strong>{heading}</strong> — use the marked hammer-ons, pull-offs, slides, and mutes.</span>
            : <span>Hold the whole <strong>{heading}</strong> shape, then move.</span>}
        </p>
      ) : null}
      <div className="boardScroll" ref={scrollRef}>
        <svg viewBox={'0 0 ' + W + ' ' + H} width={W} style={{ minWidth:'100%' }} role="img" aria-label="Lesson fretboard">
          <rect x={padL} y={padT} width={gw} height={gh} fill="#0d1319" rx={4} />
          {SINGLE_INLAYS.filter(function (m) { return m <= frets; }).map(function (m) {
            return <circle key={'in'+m} cx={padL+dx*(m-0.5)} cy={padT+gh/2} r={7} fill="#243240" />;
          })}
          {DOUBLE_INLAYS.filter(function (m) { return m <= frets; }).map(function (m) {
            return (
              <g key={'dbl'+m}>
                <circle cx={padL+dx*(m-0.5)} cy={padT+gh*0.27} r={7} fill="#2c3d4d" />
                <circle cx={padL+dx*(m-0.5)} cy={padT+gh*0.73} r={7} fill="#2c3d4d" />
              </g>
            );
          })}
          {Array.from({ length:frets+1 }).map(function (_, f) {
            return <line key={'fr'+f} x1={padL+dx*f} y1={padT} x2={padL+dx*f} y2={padT+gh} stroke={f===0?'#e8eef5':'#39485a'} strokeWidth={f===0?4:1.2} />;
          })}
          {STRINGS.map(function (nm, s) {
            return (
              <g key={'st'+s}>
                <line x1={padL} y1={padT+dy*s} x2={padL+gw} y2={padT+dy*s} stroke="#6d7d8d" strokeWidth={0.9+s*0.25} />
                <text x={padL-24} y={padT+dy*s+4} fontSize={13} fill="#8b97a3" fontWeight={600}>{nm}</text>
              </g>
            );
          })}
          {boardNotes.map(function (n, i) {
            const cx = n.fret === 0 ? padL-11 : padL+dx*(n.fret-0.5);
            const cy = padT + dy*(5-n.string);
            const on = holdAll ? true : (!grouped && !chordMode && active === i);
            const tech = n.tech || [];
            return (
              <g key={'n'+i+'-'+n.string+'-'+n.fret+'-'+(n.group||'x')}>
                {!holdAll && n.pick ? (
                  <text x={cx} y={cy-16} fontSize={on?13:11} fill={on?'#ffc65c':'#7f8fa0'}
                    textAnchor="middle" fontWeight={800}>{pickGlyph(n.pick)}</text>
                ) : null}
                <circle cx={cx} cy={cy} r={on?14:11} fill={on?'#ffc65c':'#35c46b'} stroke={on?'#fff2d4':'#1a5c36'} strokeWidth={on?3:1.5} />
                <text x={cx} y={cy+4} fontSize={on?11:10} fill={on?'#1f1503':'#04160c'} textAnchor="middle" fontWeight={800}>
                  {holdAll ? (noteAt(n.string, n.fret) || '') : (i+1)}
                </text>
                {tech.length ? (
                  <text x={cx} y={cy+24} fontSize={9} fill={on?'#ffc65c':'#8b97a3'} textAnchor="middle" fontWeight={700}>
                    {tech.join(' ')}
                  </text>
                ) : null}
              </g>
            );
          })}
          {Array.from({ length:frets+1 }).map(function (_, f) {
            const marked = f === 0 || SINGLE_INLAYS.indexOf(f) !== -1 || DOUBLE_INLAYS.indexOf(f) !== -1;
            return (
              <text key={'fn'+f} x={f===0?padL-11:padL+dx*(f-0.5)} y={H-8}
                fontSize={marked?13:11} fill={marked?'#c3ced9':'#63727f'} textAnchor="middle" fontWeight={marked?700:400}>
                {f === 0 ? 'open' : f}
              </text>
            );
          })}
        </svg>
      </div>

      {shown.length ? (
        <div className="pickLegend">
          {shown.map(function (k) {
            return (
              <span key={k} className="pickItem">
                <b>{k === 'D' ? 'M' : (k === 'U' ? 'V' : k)}</b>{legend[k] || k}
              </span>
            );
          })}
        </div>
      ) : null}

      <div className="playRow">
        <button className={playing ? 'btn danger' : 'btn primary'} onClick={toggle}>{playing ? 'Stop' : 'Hear it'}</button>
        <div className="tempoBox">
          <button className="btn ghost sm" onClick={function () { setTempo(bpm - 5); }}>-</button>
          <span className="tempoVal"><b>{bpm}</b> BPM{pct !== 100 ? <i>{pct}%</i> : null}</span>
          <button className="btn ghost sm" onClick={function () { setTempo(bpm + 5); }}>+</button>
        </div>
      </div>
      <input className="slider" type="range" min={30} max={220} value={bpm}
        onChange={function (e) { setTempo(Number(e.target.value)); }} />
      <div className="tempoPresets">
        <button className="chipBtn" onClick={function () { setTempo(Math.round(baseBpm*0.5)); }}>Half speed</button>
        <button className="chipBtn" onClick={function () { setTempo(Math.round(baseBpm*0.75)); }}>75%</button>
        <button className="chipBtn" onClick={function () { setTempo(baseBpm); }}>Written tempo</button>
      </div>

      {blocked ? <p className="warn">No sound? On iPhone, flick the silent switch to ring mode, turn the volume up, then tap Hear it again.</p> : null}
      <div className="tabStrip">
        {grouped ? groups.map(function (g, i) {
          return (
            <span key={g.id} className={'tabNote' + (active === i ? ' on' : '')} onClick={function () { setActive(i); }}>
              <b>{g.label}</b>
            </span>
          );
        }) : chordMode ? shapes.map(function (s, i) {
          return (
            <span key={(s.key || s.name || i) + '-' + i}
              className={'tabNote' + (Math.max(0, active) === i ? ' on' : '')}
              onClick={function () { setActive(i); }}>
              <b>{s.name || s.key}</b>
            </span>
          );
        }) : notes.map(function (n, i) {
          return (
            <span key={i} className={'tabNote' + (active === i ? ' on' : '')}>
              <b>{STRINGS[5-n.string]}</b>{n.fret}<i>{noteAt(n.string, n.fret)}</i>
            </span>
          );
        })}
      </div>
    </div>
  );
}
