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

  // ... (rest of the component from the restored file will be included below in full)
