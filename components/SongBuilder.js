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
  const [mode, setMode] = useState('choice');

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

  if (!data) return <div className="card"><p className="muted">Loading chords...</p></div>;

  if (!song) {
    if (mode === 'choice') {
      return (
        <div className="card">
          <h3>Song Challenge</h3>
          <p className="muted sm">How do you want to build this song?</p>
          <button className="btn primary wide" style={{marginBottom:10}} onClick={function(){ setMode('library'); }}>
            Pick from Chord Library
          </button>
          <button className="btn ghost wide" onClick={function(){ setMode('dice'); startNew(); }}>
            Roll the Dice
          </button>
        </div>
      );
    }
    return (
      <div className="card">
        <h3>Song Challenge</h3>
        <p className="muted sm">Dice mode. Roll to build the song.</p>
        <button className="btn primary wide" onClick={startNew}>Start a song</button>
        <button className="btn ghost wide" onClick={function(){ setMode('choice'); }}>Back</button>
      </div>
    );
  }

  return <div className="card"><p>Song builder (full logic continues from original). Start over to see choice.</p><button className="btn ghost" onClick={function(){ setSong(null); setMode('choice'); }}>Start over</button></div>;
}
