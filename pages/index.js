import { useEffect, useState } from 'react';
import Head from 'next/head';
import ChordDiagram from '../components/ChordDiagram';
import Fretboard from '../components/Fretboard';
import Metronome from '../components/Metronome';
import Tuner from '../components/Tuner';
import LoopPlayer from '../components/LoopPlayer';
import UpgradeWall from '../components/UpgradeWall';
import Account from '../components/Account';
import DiceConfig from '../components/DiceConfig';
import DiceFocus from '../components/DiceFocus';
import SongBuilder from '../components/SongBuilder';
import ClassroomTab from '../components/ClassroomTab';
import SettingsTab from '../components/SettingsTab';
import { STYLES, GENRES, SKILLS, rollProgression, rollScale, practiceTip } from '../lib/style';
import { lessonsFor, enrichLesson, mergeLessonLists } from '../lib/lessons';
import { lessonLockedReason } from '../lib/entitlements';
import { loadProgress } from '../lib/pathProgress';
import { loadSettings, saveSettings, applyTheme, resolvedTheme } from '../lib/appSettings';
import { NECK_SYSTEM_LESSONS } from '../lib/neckSystems';
import { rollBridge, defaultSlots, sanitiseSlots } from '../lib/bridge';
import { strumChord, playProgressionChords } from '../lib/audio';
import { chordColor, chordPitchClasses, voicingLabel, chordSheet, scaleForChord, bridgeScale } from '../lib/theory';

function api(path, opts) {
  const o = Object.assign({ credentials:'include' }, opts || {});
  return fetch('/api/' + path, o).then(function (r) {
    return r.json().catch(function () { return {}; }).then(function (body) {
      return { ok:r.ok, status:r.status, body:body };
    });
  });
}

export default function Home() {
  const [data, setData] = useState(null);
  const [lessonFile, setLessonFile] = useState({ lessons:[], legend:null, legendOrder:null });
  const [prefs, setPrefs] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState({ playingStyle:'', preferredGenre:'', skillLevel:'' });
  const [items, setItems] = useState([]);
  const [scale, setScale] = useState(null);
  const [selected, setSelected] = useState(-1);
  const [tip, setTip] = useState('');
  const [usage, setUsage] = useState(null);
  const [streak, setStreak] = useState(null);
  const [saved, setSaved] = useState([]);
  const [msg, setMsg] = useState('');
  const [rolling, setRolling] = useState(false);
  const [tab, setTab] = useState('roll');
  const [openLesson, setOpenLesson] = useState(null);
  const [showNotes, setShowNotes] = useState(false);
  const [recent, setRecent] = useState([]);
  const [wall, setWall] = useState(false);
  const [audioWarn, setAudioWarn] = useState(false);
  const [diceN, setDiceN] = useState(2);
  const [slots, setSlots] = useState(defaultSlots(2));
  const [rollKey, setRollKey] = useState('');
  const [rollMode, setRollMode] = useState('');
  const [pathProgress, setPathProgress] = useState({ clears:{}, best:{}, badges:{} });
  const [appSettings, setAppSettings] = useState({ theme:'dark', bpm:90, a4:440, tuningId:'standard' });

  function refresh() {
    return Promise.all([api('preferences'), api('usage/status'), api('streak/status'), api('auth/user'), api('billing/status')])
      .then(function (res) {
        setPrefs(res[0].body || {});
        var usageBody = res[1].body || {};
        var billed = res[4] && res[4].ok ? res[4].body : null;
        if (billed && (billed.tier === 'premium' || billed.tier === 'extreme')) {
          usageBody = Object.assign({}, usageBody, {
            tier: billed.tier,
            tierLabel: billed.tierLabel,
            unlimitedRolls: billed.unlimitedRolls,
            diceCount: Math.max(usageBody.diceCount || 2, billed.diceCount || 2),
            loopPlayer: !!(usageBody.loopPlayer || billed.loopPlayer),
            exportSheets: !!(usageBody.exportSheets || billed.exportSheets)
          });
        }
        setUsage(usageBody);
        setStreak(res[2].body || null);
        setUser(res[3].body || null);
        return usageBody;
      });
  }

  useEffect(function () {
    let alive = true;
    fetch('/data/musicdata.json').then(function (r) { return r.json(); }).catch(function () { return null; })
      .then(function (d) { if (alive) setData(d); });
    fetch('/data/lessons-v2.json').then(function (r) { return r.json(); }).catch(function () { return { lessons:[] }; })
      .then(function (d) { if (alive && d) setLessonFile({ lessons:mergeLessonLists(d.lessons || [], NECK_SYSTEM_LESSONS), legend:d.legend || null, legendOrder:d.legendOrder || null }); });
    const st = loadSettings();
    setAppSettings(st);
    applyTheme(st.theme);
    setPathProgress(loadProgress());
    refresh().then(function (u) {
      if (!alive) return;
      const max = (u && u.diceCount) || 2;
      setDiceN(max);
      setSlots(defaultSlots(max));
      setLoading(false);
    });
    return function () { alive = false; };
  }, []);

  const allLessons = lessonFile.lessons;
  const needsOnboarding = prefs && !prefs.hasCompletedOnboarding;
  const style = (prefs && prefs.playingStyle) || 'rhythm';
  const genre = (prefs && prefs.preferredGenre) || 'rock';
  const skill = (prefs && prefs.skillLevel) || 'intermediate';
  const styleMeta = STYLES.filter(function (s) { return s.value === style; })[0] || STYLES[1];
  const genreLabel = (GENRES.filter(function (g) { return g.value === genre; })[0] || {}).label || genre;
  const diceMax = (usage && usage.diceCount) || 2;
  const tier = (usage && usage.tier) || 'free';
  const paid = tier !== 'free';
  const canLoop = !!(usage && usage.loopPlayer);
  const canExport = !!(usage && usage.exportSheets);
  const canBridge = tier === 'extreme';

  function setCount(n) {
    setDiceN(n);
    setSlots(function (prev) {
      const next = prev.slice(0, n);
      while (next.length < n) next.push('chord');
      return sanitiseSlots(next);
    });
  }
  function setSlot(i, val) {
    setSlots(function (prev) {
      const next = prev.slice();
      next[i] = val;
      return sanitiseSlots(next);
    });
  }
  function savePrefs(next) {
    setPrefs(next);
    return api('preferences', { method:'POST', headers:{ 'Content-Type':'application/json' }, body:JSON.stringify(next) });
  }
  function finishOnboarding() {
    if (!draft.skillLevel) { setMsg('Pick a skill level to continue'); return; }
    savePrefs(Object.assign({}, draft, { hasCompletedOnboarding:true })).then(function (res) {
      if (res.ok) {
        setMsg('');
        api('streak/update', { method:'POST' }).then(function (r) { setStreak(r.body); });
      } else setMsg('Could not save, try again');
    });
  }

  function spendRoll(done) {
    api('usage/increment-dice-roll', { method:'POST' }).then(function (res) {
      if (!res.ok) {
        if (res.body && res.body.remainingRolls !== undefined) setUsage(res.body);
        if (res.status === 403) setWall(true);
        else setMsg((res.body && res.body.message) || 'Could not roll');
        done(false, res.body);
        return;
      }
      setUsage(res.body);
      done(true, res.body);
    });
  }

  function doRoll() {
    if (!data) return;
    setRolling(true); setMsg(''); setSelected(-1);
    spendRoll(function (ok, body) {
      if (!ok) { setRolling(false); return; }
      const allowed = Math.min(diceN, body.diceCount || 2);
      const useSlots = canBridge ? sanitiseSlots(slots.slice(0, allowed)) : defaultSlots(allowed);
      setTimeout(function () {
        const chordSlots = useSlots.filter(function (s) { return s === 'chord'; }).length;
        const rolled = rollProgression({
          style:style, genre:genre, skill:skill, chords:data.chords,
          count: Math.max(2, chordSlots), avoid: recent,
          lockRoot: rollKey, lockMode: rollMode
        });
        if (style === 'lead') setScale(rollScale({ genre:genre, skill:skill, modes:data.modes, lockRoot: rollKey, lockMode: rollMode }));
        else setScale(null);
        const out = [];
        let ci = 0;
        useSlots.forEach(function (s) {
          if (s === 'chord') {
            const c = rolled[ci % rolled.length];
            ci++;
            out.push({ kind:'chord', chord:c, key:c.key });
          } else out.push({ kind:'bridge', chord:null, key:null });
        });
        out.forEach(function (it, i) {
          if (it.kind !== 'bridge') return;
          let prev = null, next = null;
          for (let j = i-1; j >= 0; j--) { if (out[j].kind === 'chord') { prev = out[j].chord; break; } }
          for (let j = i+1; j < out.length; j++) { if (out[j].kind === 'chord') { next = out[j].chord; break; } }
          if (!next) { for (let j = 0; j < i; j++) { if (out[j].kind === 'chord') { next = out[j].chord; break; } } }
          const b = rollBridge(prev, next, data.chords);
          if (b) {
            it.chord = b.chord; it.key = b.key; it.why = b.why; it.label = b.label;
            it.from = prev; it.to = next;
            it.link = bridgeScale(prev, b.chord, next, data.modes);
          } else {
            const c = rolled[(ci++) % rolled.length];
            it.kind = 'chord'; it.chord = c; it.key = c.key;
          }
        });
        setItems(out);
        setRecent(out.map(function (x) { return x.key; }).concat(recent).slice(0, 16));
        setTip(practiceTip(style));
        setRolling(false);
      }, 300);
    });
  }

  function watchAd() {
    api('usage/watch-ad-reward', { method:'POST' }).then(function (res) {
      if (res.ok) { setUsage(res.body); setWall(false); setMsg('Plus 3 rolls added'); }
      else setMsg((res.body && res.body.message) || 'No more ad rewards today');
    });
  }
  function saveRecord(payload, done) {
    api('chord-progressions', { method:'POST', headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify(Object.assign({ isFavorite:true }, payload)) })
      .then(function (res) {
        if (res.ok) { refresh(); if (done) done(true, 'Saved.'); }
        else if (done) done(false, (res.body && res.body.message) || 'Could not save');
      });
  }
  function saveProgression() {
    if (!items.length) return;
    saveRecord({ type:style, chords:items.map(function (i) { return i.key; }) }, function (ok, m) { setMsg(m); });
  }
  function exportSheet() {
    const text = chordSheet(items, {
      style:styleMeta.label, genre:genreLabel,
      scale: scale ? scale.root + ' ' + scale.mode.name : null
    });
    if (navigator.share) navigator.share({ title:'Guitar Dice progression', text:text }).catch(function () {});
    else if (navigator.clipboard) { navigator.clipboard.writeText(text); setMsg('Chord sheet copied to your clipboard'); }
  }
  async function hearProgression() {
    const ok = await playProgressionChords(items.map(function (i) { return i.chord; }), 900);
    setAudioWarn(!ok);
  }
  async function tapChord(i) {
    setSelected(selected === i ? -1 : i);
    const ok = await strumChord(items[i].chord.positions, true);
    setAudioWarn(!ok);
  }

  useEffect(function () {
    if (tab !== 'saved') return;
    api('chord-progressions').then(function (res) {
      if (res.ok) setSaved(Array.isArray(res.body) ? res.body : []);
    });
  }, [tab]);
  useEffect(function () { setOpenLesson(null); }, [tab, style, genre]);

  if (loading) {
    return <Shell genre={genre} theme={resolvedTheme(appSettings.theme)}><div className="center"><div className="spinner" /><p className="muted">Loading Guitar Dice...</p></div></Shell>;
  }

  if (needsOnboarding) {
    return (
      <Shell genre={draft.preferredGenre || 'rock'} theme={resolvedTheme(appSettings.theme)}>
        <div className="onboard">
          <div className="steps">{[1,2,3].map(function (n) { return <span key={n} className={'stepDot' + (step >= n ? ' on' : '')} />; })}</div>
          {step === 1 ? (
            <div>
              <h1>Welcome to Guitar Dice</h1>
              <p className="muted">What kind of guitarist are you? This shapes every roll and every lesson.</p>
              <div className="choices">
                {STYLES.map(function (s) {
                  return (
                    <button key={s.value} className={'choice' + (draft.playingStyle === s.value ? ' sel' : '')}
                      onClick={function () { setDraft(Object.assign({}, draft, { playingStyle:s.value })); setMsg(''); }}>
                      <span className="choiceIcon">{s.icon}</span>
                      <span><strong>{s.label}</strong><small>{s.description}</small></span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
          {step === 2 ? (
            <div>
              <h1>Your Musical Style</h1>
              <p className="muted">This weights the chords you get, picks your lessons, and sets the look of the app.</p>
              <div className="grid">
                {GENRES.map(function (g) {
                  return <button key={g.value} className={'tile' + (draft.preferredGenre === g.value ? ' sel' : '')}
                    onClick={function () { setDraft(Object.assign({}, draft, { preferredGenre:g.value })); setMsg(''); }}>{g.label}</button>;
                })}
              </div>
            </div>
          ) : null}
          {step === 3 ? (
            <div>
              <h1>Your Skill Level</h1>
              <p className="muted">This sets how far the chord vocabulary goes.</p>
              <div className="choices">
                {SKILLS.map(function (s) {
                  return (
                    <button key={s.value} className={'choice' + (draft.skillLevel === s.value ? ' sel' : '')}
                      onClick={function () { setDraft(Object.assign({}, draft, { skillLevel:s.value })); setMsg(''); }}>
                      <span><strong>{s.label}</strong><small>{s.description}</small></span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
          {msg ? <p className="warn">{msg}</p> : null}
          <div className="onboardNav">
            {step > 1 ? <button className="btn ghost" onClick={function () { setStep(step-1); }}>Back</button> : null}
            {step < 3 ? (
              <button className="btn primary grow" onClick={function () {
                if (step === 1 && !draft.playingStyle) { setMsg('Pick a playing style'); return; }
                if (step === 2 && !draft.preferredGenre) { setMsg('Pick a genre'); return; }
                setMsg(''); setStep(step+1);
              }}>Next</button>
            ) : <button className="btn primary grow" onClick={finishOnboarding}>Start Playing</button>}
          </div>
        </div>
      </Shell>
    );
  }

  const lessons = lessonsFor(allLessons, style, genre, skill).map(enrichLesson).map(function (l) { return Object.assign({}, l, { gate: lessonLockedReason(l, tier) }); });
  const lesson = openLesson ? lessons.filter(function (l) { return l.id === openLesson; })[0] : null;
  const sel = selected >= 0 && items[selected] ? items[selected] : null;
  const isBridgeSel = sel && sel.kind === 'bridge' && sel.link;
  const selScale = sel ? (isBridgeSel ? sel.link : (data ? scaleForChord(sel.key, data.modes) : null)) : null;
  const selColor = selected >= 0 ? chordColor(selected) : null;

  return (
    <Shell genre={genre} theme={resolvedTheme(appSettings.theme)}>
      {wall ? (
        <UpgradeWall modal outOfRolls usage={usage}
          onClose={function () { setWall(false); }} onWatchAd={watchAd}
          onNeedAccount={function () { setWall(false); setTab('account'); }} />
      ) : null}

      <header className="appHead">
        <div>
          <h1>Guitar Dice</h1>
          <p className="muted sm">{styleMeta.label} - {genreLabel} - {diceN} dice</p>
        </div>
        <div className="stats">
          {paid ? <span className="pill tier">{usage.tierLabel}</span> : null}
          {streak && streak.currentStreak > 0 ? <span className="pill">{streak.currentStreak} day</span> : null}
          <span className="pill">{usage && usage.unlimitedRolls ? 'unlimited' : ((usage && usage.remainingRolls) || 0) + ' rolls'}</span>
        </div>
      </header>

      <nav className="tabs">
        {[['roll','Roll'],['song','Song'],['classroom','Class'],['tools','Tools'],['saved','Saved'],['settings','Settings'],['plans','Plans'],['account','Account']].map(function (t) {
          return <button key={t[0]} className={'tab' + (tab === t[0] ? ' on' : '')} onClick={function () { setTab(t[0]); }}>{t[1]}</button>;
        })}
      </nav>

      {tab === 'song' ? (
        <SongBuilder data={data} genre={genre} style={style} skill={skill} canLoop={canLoop}
          onRoll={spendRoll} onSave={saveRecord} />
      ) : null}

      {tab === 'roll' ? (
        <div>
          <button className={'rollBtn' + (rolling ? ' rolling' : '')} onClick={doRoll} disabled={rolling}>
            <span className="die">[ ]</span>
            {rolling ? 'Rolling...' : (items.length ? 'Roll Again' : 'Roll the Dice')}
          </button>
          <DiceFocus usage={usage} rollKey={rollKey} rollMode={rollMode}
            onKey={setRollKey} onMode={setRollMode} onUpgrade={function () { setTab('plans'); }} />
          {msg ? <div className="notice"><span>{msg}</span></div> : null}
          {diceMax > 2 ? (
            <DiceConfig max={diceMax} count={diceN} slots={slots} allowBridge={canBridge}
              onCount={setCount} onSlot={setSlot} onUpgrade={function () { setTab('plans'); }} />
          ) : null}
          {items.length ? (
            <div className="card">
              <div className="rowBetween">
                <h3>{scale ? 'Chords to solo over' : 'Progression'}</h3>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <button className="btn ghost sm" onClick={hearProgression}>Hear it</button>
                  <button className="btn ghost sm" onClick={saveProgression}>Save</button>
                  {canExport ? <button className="btn ghost sm" onClick={exportSheet}>Export</button> : null}
                </div>
              </div>
              <div className="chordRow">
                {items.map(function (it, i) {
                  const col = chordColor(i);
                  const isBridge = it.kind === 'bridge';
                  return (
                    <div key={it.key + '-' + i}
                      className={'chordCard' + (isBridge ? ' bridgeCard' : '') + (selected === i ? ' sel' : '')}
                      style={{ borderColor: selected === i ? col.dot : (isBridge ? '#7a5a1e' : '#1e2a35') }}
                      onClick={function () { tapChord(i); }}>
                      {isBridge ? <span className="bridgeTag">{it.label}</span> : null}
                      <strong>
                        <span className="chordIdx" style={{ background:col.dot, color:col.text }}>{i+1}</span>
                        {it.chord.name}
                      </strong>
                      <span className="chordPos">{voicingLabel(it.chord)}</span>
                      <ChordDiagram chord={it.chord} accent={col} />
                    </div>
                  );
                })}
              </div>
              <p className="muted sm" style={{ marginTop:8 }}>
                {audioWarn ? 'No sound? On iPhone the side silent switch mutes web audio.' : 'Tap a chord to hear it and see the scale that fits it.'}
              </p>
            </div>
          ) : null}
          {sel && sel.why ? <div className="tip bridgeTip"><strong>{sel.label}:</strong> {sel.why}</div> : null}
          {sel && selScale ? (
            <div className="card">
              <div className="rowBetween">
                <h3>{selScale.root} {selScale.mode.name}</h3>
                <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                  {isBridgeSel
                    ? <span className="tagAmber">links {sel.from ? sel.from.name : '?'} to {sel.to ? sel.to.name : '?'}</span>
                    : <span className="tagBlue">over {sel.chord.name}</span>}
                  <button className="btn ghost sm" onClick={function () { setShowNotes(!showNotes); }}>
                    {showNotes ? 'Show degrees' : 'Show notes'}
                  </button>
                </div>
              </div>
              <p className="muted sm">{selScale.mode.description}</p>
              <Fretboard root={selScale.root} mode={selScale.mode} showNotes={showNotes}
                overlays={isBridgeSel
                  ? [
                      { color:chordColor(3), pcs:chordPitchClasses(sel.chord.positions) },
                      sel.from ? { color:chordColor(0), pcs:chordPitchClasses(sel.from.positions) } : null,
                      sel.to ? { color:chordColor(1), pcs:chordPitchClasses(sel.to.positions) } : null
                    ].filter(Boolean)
                  : [{ color:selColor, pcs:chordPitchClasses(sel.chord.positions) }]} />
              {isBridgeSel ? (
                <div>
                  <div className="legend">
                    <span className="legendItem"><span className="swatch" style={{ background:'#e8eef5' }} />root ({selScale.root})</span>
                    <span className="legendItem"><span className="swatch" style={{ background:chordColor(3).dot }} />{sel.chord.name} (the bridge)</span>
                    {sel.from ? <span className="legendItem"><span className="swatch" style={{ background:chordColor(0).dot }} />from {sel.from.name}</span> : null}
                    {sel.to ? <span className="legendItem"><span className="swatch" style={{ background:chordColor(1).dot }} />into {sel.to.name}</span> : null}
                  </div>
                  <div className="fitBar"><i style={{ width: (selScale.fit || 0) + '%' }} /></div>
                  <p className="muted sm">This scale covers {selScale.fit}% of the notes across all three chords.</p>
                  <div className="howto">
                    <b>Playing the bridge:</b> stay in this one scale for the whole move. While {sel.from ? sel.from.name : 'the first chord'} rings, favour its colour. As the bridge lands, shift onto the {sel.chord.name} notes - those are what pull the ear forward. Then resolve onto a note of {sel.to ? sel.to.name : 'the next chord'} and the join sounds deliberate rather than accidental.
                    {selScale.note ? ' ' + selScale.note : ''}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="legend">
                    <span className="legendItem"><span className="swatch" style={{ background:'#e8eef5' }} />root ({selScale.root})</span>
                    <span className="legendItem"><span className="swatch" style={{ background:selColor.dot }} />notes in {sel.chord.name}</span>
                    <span className="legendItem"><span className="swatch" style={{ background:'#2b3a48' }} />rest of the scale</span>
                  </div>
                  <div className="howto">
                    <b>How to use this:</b> the coloured dots are the notes inside {sel.chord.name} itself - land on those while this chord is ringing and it will always sound right. The dim dots are the rest of the scale: use them to travel between the coloured ones. White is the root.
                    {selScale.note ? ' ' + selScale.note : ''}
                  </div>
                </div>
              )}
              <div className="degRow">{selScale.mode.degrees.map(function (d) { return <span key={d} className="deg">{d}</span>; })}</div>
              <button className="btn ghost wide" onClick={function () { setSelected(-1); }}>Close</button>
            </div>
          ) : null}
          {items.length && canLoop ? <LoopPlayer chords={items.map(function (i) { return i.chord; })} /> : null}
          {items.length && !canLoop ? (
            <div className="card">
              <h3>Loop player</h3>
              <p className="muted sm">Loop this progression as a backing track to solo over, with adjustable tempo and click sounds. Available on Premium and Extreme.</p>
              <button className="btn primary wide" onClick={function () { setTab('plans'); }}>See plans</button>
            </div>
          ) : null}
          {!sel && scale ? (
            <div className="card">
              <div className="rowBetween">
                <h3>{scale.root} {scale.mode.name}</h3>
                <span className="tagBlue">Lead</span>
              </div>
              <p className="muted sm">{scale.mode.description}</p>
              <Fretboard root={scale.root} mode={scale.mode} showNotes={showNotes}
                overlays={items.map(function (it, i) { return { color:chordColor(i), pcs:chordPitchClasses(it.chord.positions) }; })} />
              <div className="howto"><b>Tip:</b> tap any chord above to see the scale for that one chord on its own - much easier to read while you play over it.</div>
            </div>
          ) : null}
          {tip ? <div className="tip"><strong>Practice this:</strong> {tip}</div> : null}
          {!items.length ? <div className="empty"><p className="muted">Tap the dice for a {styleMeta.label.toLowerCase()} idea in {genreLabel}.</p></div> : null}
        </div>
      ) : null}

      {tab === 'account' ? <Account user={user} onChange={refresh} /> : null}
      {tab === 'plans' ? <div className="card"><UpgradeWall usage={usage} onNeedAccount={function () { setTab('account'); }} /></div> : null}

      {tab === 'classroom' ? (
        <ClassroomTab
          lessons={lessons}
          lesson={lesson}
          data={data}
          style={style}
          progress={pathProgress}
          setProgress={setPathProgress}
          lessonFile={lessonFile}
          onBack={function () { setOpenLesson(null); }}
          onOpen={setOpenLesson}
          onUpgrade={function () { setTab('plans'); }}
        />
      ) : null}

      {tab === 'tools' ? <div><Tuner a4={appSettings.a4} tuningId={appSettings.tuningId} onTuning={function (id) { setAppSettings(saveSettings(Object.assign({}, appSettings, { tuningId:id }))); }} /><Metronome paid={paid} defaultBpm={appSettings.bpm} onBpm={function (n) { setAppSettings(saveSettings(Object.assign({}, appSettings, { bpm:n }))); }} onUpgrade={function () { setTab('plans'); }} /></div> : null}

      {tab === 'saved' ? (
        <div className="card">
          <div className="rowBetween">
            <h3>Saved</h3>
            <span className="muted sm">{usage && usage.savedLimit === -1 ? (usage.savedCount || 0) + ' saved' : (usage ? (usage.savedCount || 0) + ' / ' + usage.savedLimit : '')}</span>
          </div>
          {!saved.length ? <p className="muted">Nothing saved yet. Roll something you like, or finish a song, and tap Save.</p> : null}
          {saved.map(function (s) {
            const isSong = s.chords && !Array.isArray(s.chords) && s.chords.song;
            return (
              <div key={s.id} className="savedRow">
                <span className="tag">{isSong ? 'song' : (s.type || 'progression')}</span>
                <span>
                  {isSong
                    ? (s.chords.templateName || 'Song') + ': ' + (s.chords.parts || []).map(function (p) { return p.part; }).join(' - ')
                    : (Array.isArray(s.chords) ? s.chords.join('  -  ') : '')}
                </span>
              </div>
            );
          })}
        </div>
      ) : null}

      {tab === 'settings' ? (
        <SettingsTab
          settings={appSettings}
          user={user}
          style={style}
          onChange={function (next) { setAppSettings(saveSettings(next)); }}
        >
        <div className="card">
          <h3>Playing Style</h3>
          <p className="muted sm">Affects your voicings and your whole lesson list.</p>
          <div className="choices">
            {STYLES.map(function (s) {
              return (
                <button key={s.value} className={'choice' + (style === s.value ? ' sel' : '')} onClick={function () {
                  setItems([]); setScale(null); setTip(''); setSelected(-1);
                  savePrefs(Object.assign({}, prefs, { playingStyle:s.value, hasCompletedOnboarding:true }));
                }}>
                  <span className="choiceIcon">{s.icon}</span>
                  <span><strong>{s.label}</strong><small>{s.description}</small></span>
                </button>
              );
            })}
          </div>
          <h3 style={{ marginTop:22 }}>Genre</h3>
          <p className="muted sm">Weights the chords you roll, puts matching lessons first, and sets the look of the app.</p>
          <div className="grid">
            {GENRES.map(function (g) {
              return (
                <button key={g.value} className={'tile' + (genre === g.value ? ' sel' : '')} onClick={function () {
                  setItems([]); setScale(null); setSelected(-1);
                  savePrefs(Object.assign({}, prefs, { preferredGenre:g.value }));
                }}>{g.label}</button>
              );
            })}
          </div>
          <h3 style={{ marginTop:22 }}>Skill</h3>
          <p className="muted sm">Sets how far the chord vocabulary goes and which lessons come first.</p>
          <div className="choices">
            {SKILLS.map(function (s) {
              return (
                <button key={s.value} className={'choice' + (skill === s.value ? ' sel' : '')} onClick={function () {
                  setItems([]); setScale(null); setSelected(-1);
                  savePrefs(Object.assign({}, prefs, { skillLevel:s.value }));
                }}>
                  <span><strong>{s.label}</strong><small>{s.description}</small></span>
                </button>
              );
            })}
          </div>
        </div>
        </SettingsTab>
      ) : null}

      <footer className="appFoot"><a href="/privacy">Privacy</a> · <a href="mailto:midnightmechanix@icloud.com">Contact</a></footer>
    </Shell>
  );
}

function Shell(props) {
  return (
    <div className="themeRoot" data-genre={props.genre || 'rock'} data-theme={props.theme || 'dark'}>
      <Head>
        <title>Guitar Dice</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <div className="wrap">{props.children}</div>
    </div>
  );
}
