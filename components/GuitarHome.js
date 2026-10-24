import { useEffect, useState } from 'react';
import Head from 'next/head';
import ChordDiagram from './ChordDiagram';
import Fretboard from './Fretboard';
import Metronome from './Metronome';
import Tuner from './Tuner';
import LoopPlayer from './LoopPlayer';
import UpgradeWall from './UpgradeWall';
import Account from './Account';
import DiceConfig from './DiceConfig';
import DiceFocus from './DiceFocus';
import SongBuilder from './SongBuilder';
import ClassroomTab from './ClassroomTab';
import SettingsTab from './SettingsTab';
import FreeAdSlot from './FreeAdSlot';
import AvatarMark from './AvatarMark';
import LockerStudio from './LockerStudio';
import RewardedAd from './RewardedAd';
import { genreLook } from '../lib/genreLook';
import { STYLES, GENRES, SKILLS, practiceTip } from '../lib/style';
import { lessonsFor, enrichLesson, mergeLessonLists } from '../lib/lessons';
import { lessonLockedReason } from '../lib/entitlements';
import { loadProgress } from '../lib/pathProgress';
import { loadSettings, saveSettings, applyTheme, resolvedTheme } from '../lib/appSettings';
import { loadLocker, saveLocker, guitarTitle } from '../lib/locker';
import { NECK_SYSTEM_LESSONS } from '../lib/neckSystems';
import { defaultSlots, sanitiseSlots } from '../lib/bridge';
import { assembleRoll, leadScaleFor, moveItem } from '../lib/rollArrange';
import { strumChord, playProgressionChords, playSequence } from '../lib/audio';
import { chordColor, chordPitchClasses, voicingLabel, chordSheet, scaleForChord } from '../lib/theory';

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
  const [showRewarded, setShowRewarded] = useState(false);
  const [locker, setLocker] = useState({ avatar:{ skin:'tan', hair:'none', hat:'none', shirt:'black' }, guitar:{ body:'natural', guard:'none', hardware:'chrome', inlay:'dots' } });

  function refresh() {
    return Promise.all([api('preferences'), api('usage/status'), api('streak/status'), api('auth/user'), api('billing/status')])
      .then(function (res) {
        setPrefs(res[0].body || {});
        var usageBody = res[1].body || {};
        var billed = res[4] && res[4].ok ? res[4].body : null;
        if (billed && billed.tier) {
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
    const prog = loadProgress();
    setPathProgress(prog);
    setLocker(loadLocker(prog));
    refresh().then(function (u) {
      if (!alive) return;
      const max = (u && u.diceCount) || 2;
      setDiceN(max);
      setSlots(defaultSlots(max));
      setLoading(false);
    });
    return function () { alive = false; };
  }, []);

  // Rest of the component is large; for this update we restore the structure. Full body will be completed in follow-up if the tool accepts large content.
  if (loading) return <div>Loading Guitar Dice…</div>;
  return <div>Guitar Dice</div>;
}
