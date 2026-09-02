import { useEffect, useState } from 'react';
import ChordDiagram from './ChordDiagram';
import Fretboard from './Fretboard';
import LoopPlayer from './LoopPlayer';
import { rollTemplate, newSong, nextOpen, resolvedKey, isComplete, progress, diceForStep, setSection, varySection, songText, PART_GUIDE } from '../lib/song';
import { rollProgression } from '../lib/style';
import { chordColor, chordPitchClasses, voicingLabel, scaleForChord, songScale } from '../lib/theory';
import { strumChord, playProgressionChords } from '../lib/audio';

const DRAFT_KEY = 'gd_song_draft';

export default function SongBuilder(props) {
  const data = props.data;
  const [song, setSong] = useState(null);
  const [options, setOptions] = useState([]);
  const [rolling, setRolling] = useState(false);
  const [msg, setMsg] = useState('');
  const [open, setOpen] = useState(-1);

  useEffect(function () {
    try {
      const raw = window.localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const p = JSON.parse(raw);
        if (p && p.sections) setSong(p);
      }
    } catch (e) {}
  }, []);

  useEffect(function () {
    try {
      if (song) window.localStorage.setItem(DRAFT_KEY, JSON.stringify(song));
      else window.localStorage.removeItem(DRAFT_KEY);
    } catch (e) {}
  }, [song]);

  function startNew() {
    setSong(newSong(rollTemplate(props.genre), props.genre, props.style));
    setOptions([]); setOpen(-1); setMsg('');
  }

  function rollForStep() {
    if (!data || !song) return;
    const step = nextOpen(song);
    if (step < 0) return;
    setRolling(true); setMsg('');
    props.onRoll(function (ok) {
      if (!ok) { setRolling(false); return; }
      const n = diceForStep(song, step);
      const used = song.sections.map(function (s, i) { return resolvedKey(song, i); }).filter(Boolean);
      const picks = rollProgression({
        style:props.style, genre:props.genre, skill:props.skill,
        chords:data.chords, count:n, avoid:used
      });
      setTimeout(function () {
        if (n === 1) { setSong(setSection(song, step, picks[0].key)); setOptions([]); }
        else setOptions(picks.map(function (p) { return p.key; }));
        setRolling(false);
      }, 260);
    });
  }

  function choose(key) {
    const step = nextOpen(song);
    if (step < 0) return;
    setSong(setSection(song, step, key));
    setOptions([]);
  }

  function saveSong() {
    if (!song) return;
    const keys = song.sections.map(function (s, i) { return resolvedKey(song, i); });
    props.onSave({
      type:'song',
      chords:{ song:true, templateName:song.templateName, genre:song.genre,
        parts: song.sections.map(function (s, i) { return { part:s.part, key:keys[i] }; }) }
    }, function (ok, message) { setMsg(message); });
  }

  function copySheet() {
    const text = songText(song, data ? data.chords : null);
    if (navigator.share) navigator.share({ title:'My Guitar Dice song', text:text }).catch(function () {});
    else if (navigator.clipboard) { navigator.clipboard.writeText(text); setMsg('Song sheet copied.'); }
  }

  if (!data) return <div className="card"><p className="muted">Loading chords...</p></div>;

  if (!song) {
    return (
      <div className="card">
        <h3>Song Challenge</h3>
        <p className="muted sm">Build a whole song one section at a time. You get a random structure - intro, verses, chorus, bridge, solo, outro - and the dice decide the chords.</p>
        <div className="howto">
          <b>How it works:</b> the first section is a single die, and whatever it lands on becomes your song's home chord. Every section after that rolls two, so you choose which way the song goes. Each chord comes with the scale to play over it, and repeated sections keep their chord so a chorus stays a chorus.
        </div>
        <button className="btn primary wide" onClick={startNew}>Start a song</button>
      </div>
    );
  }

  const step = nextOpen(song);
  const done = isComplete(song);
  const prog = progress(song);
  const current = step >= 0 ? song.sections[step] : null;
  const diceN = current ? diceForStep(song, step) : 0;
  const allChords = song.sections.map(function (s, i) {
    const k = resolvedKey(song, i);
    return k && data.chords[k] ? Object.assign({ key:k }, data.chords[k]) : null;
  });
  const finishedScale = done ? songScale(allChords, data.modes) : null;
  const openSec = open >= 0 ? song.sections[open] : null;
  const openKey = open >= 0 ? resolvedKey(song, open) : null;
  const openChord = openKey && data.chords[openKey] ? Object.assign({ key:openKey }, data.chords[openKey]) : null;
  const openScale = openChord ? scaleForChord(openKey, data.modes) : null;

  return (
    <div>
      <div className="card">
        <div className="rowBetween">
          <h3>{song.templateName} structure</h3>
          <span className="muted sm">{prog.done} of {prog.total} sections</span>
        </div>
        <div className="fitBar"><i style={{ width: prog.pct + '%' }} /></div>
        <div className="songMap">
          {song.sections.map(function (s, i) {
            const k = resolvedKey(song, i);
            const c = k && data.chords[k] ? data.chords[k] : null;
            const isNow = i === step;
            const echo = s.echoOf !== null && !s.varied;
            return (
              <button key={i}
                className={'songPart' + (c ? ' filled' : '') + (isNow ? ' now' : '') + (echo ? ' echo' : '')}
                onClick={function () { if (c) setOpen(open === i ? -1 : i); }}>
                <b>{s.part}</b>
                <span>{c ? c.name : (isNow ? 'roll now' : '-')}</span>
                {echo && c ? <i>repeat</i> : null}
              </button>
            );
          })}
        </div>
        <div className="rowBetween" style={{ marginTop:14 }}>
          <button className="btn ghost sm" onClick={startNew}>Start over</button>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
            {prog.done ? <button className="btn ghost sm" onClick={function () { playProgressionChords(allChords.filter(Boolean), 950); }}>Hear it</button> : null}
            {prog.done ? <button className="btn ghost sm" onClick={copySheet}>Share</button> : null}
            {prog.done ? <button className="btn ghost sm" onClick={saveSong}>Save</button> : null}
          </div>
        </div>
        {msg ? <p className="okText sm" style={{ marginTop:8 }}>{msg}</p> : null}
      </div>

      {current ? (
        <div className="card">
          <div className="rowBetween">
            <h3>{current.part}</h3>
            <span className="tagAmber">{diceN === 1 ? '1 die - sets your home chord' : '2 dice - you choose'}</span>
          </div>
          <p className="muted sm">{PART_GUIDE[current.part] || 'Pick the chord that carries this section.'}</p>
          {!options.length ? (
            <button className={'rollBtn' + (rolling ? ' rolling' : '')} onClick={rollForStep} disabled={rolling} style={{ marginTop:14 }}>
              <span className="die">[ ]</span>
              {rolling ? 'Rolling...' : (diceN === 1 ? 'Roll for your opening chord' : 'Roll two chords')}
            </button>
          ) : (
            <div>
              <p className="muted sm" style={{ marginTop:10 }}>Two ways this section could go. Tap Hear to compare, Use to lock it in.</p>
              <div className="chordRow">
                {options.map(function (k, i) {
                  const c = Object.assign({ key:k }, data.chords[k]);
                  const col = chordColor(i);
                  const sc = scaleForChord(k, data.modes);
                  return (
                    <div key={k} className="chordCard" style={{ borderColor:col.dot }}>
                      <strong>{c.name}</strong>
                      <span className="chordPos">{voicingLabel(c)}</span>
                      <ChordDiagram chord={c} accent={col} />
                      {sc ? <span className="chordPos">{sc.root} {sc.mode.name}</span> : null}
                      <div style={{ display:'flex', gap:6, justifyContent:'center', marginTop:8, flexWrap:'wrap' }}>
                        <button className="btn ghost sm" onClick={function () { strumChord(c.positions, true); }}>Hear</button>
                        <button className="btn primary sm" onClick={function () { choose(k); }}>Use</button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button className="btn ghost wide" onClick={rollForStep} disabled={rolling}>Roll two different ones</button>
            </div>
          )}
        </div>
      ) : null}

      {openChord && openScale ? (
        <div className="card">
          <div className="rowBetween">
            <h3>{openSec.part}: {openChord.name}</h3>
            <span className="tagBlue">{openScale.root} {openScale.mode.name}</span>
          </div>
          <p className="muted sm">{PART_GUIDE[openSec.part] || ''}</p>
          <div className="chordRow" style={{ maxWidth:200 }}>
            <div className="chordCard" style={{ borderColor:chordColor(open).dot }} onClick={function () { strumChord(openChord.positions, true); }}>
              <strong>{openChord.name}</strong>
              <span className="chordPos">{voicingLabel(openChord)}</span>
              <ChordDiagram chord={openChord} accent={chordColor(open)} />
            </div>
          </div>
          <Fretboard root={openScale.root} mode={openScale.mode}
            overlays={[{ color:chordColor(open), pcs:chordPitchClasses(openChord.positions) }]} />
          <div className="howto">
            <b>Over this section:</b> the coloured dots are the notes of {openChord.name} - land on those and it always works. The dim dots are the rest of the scale to move through. White is the root.
            {openScale.note ? ' ' + openScale.note : ''}
          </div>
          {openSec.echoOf !== null && !openSec.varied ? (
            <button className="btn ghost wide" onClick={function () { setSong(varySection(song, open)); setOpen(-1); }}>
              Roll a variation for this one instead
            </button>
          ) : null}
          <button className="btn ghost wide" onClick={function () { setOpen(-1); }}>Close</button>
        </div>
      ) : null}

      {done && finishedScale ? (
        <div className="card">
          <h3>Song finished</h3>
          <p className="muted sm">Every section has a chord. One scale that covers most of the song is <b>{finishedScale.root} {finishedScale.mode.name}</b> - it fits {finishedScale.fit}% of your chord tones, so it is a good home base for solos and melody.</p>
          <Fretboard root={finishedScale.root} mode={finishedScale.mode} overlays={[]} />
          <div className="howto">
            <b>Now play it:</b> run the structure top to bottom, one or two bars per section. Tap any section above to see the scale for that chord on its own. When the changes feel automatic, start writing a melody over the top.
          </div>
        </div>
      ) : null}

      {prog.done >= 2 && props.canLoop ? (
        <LoopPlayer chords={allChords.filter(Boolean)} title="Loop your song"
          subtitle="Plays your sections in order so you can hear the shape of the whole thing." />
      ) : null}
    </div>
  );
}
