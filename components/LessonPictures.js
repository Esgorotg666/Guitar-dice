function Neck(props) {
  const names = ['E', 'A', 'D', 'G', 'B', 'e'];
  const highlight = props.highlight || [];
  const id = 'nk' + String(props.label || 'n').replace(/\W/g, '');
  return (
    <svg viewBox="0 0 300 176" width="100%" aria-label={props.label || 'Guitar neck'}>
      <defs>
        <linearGradient id={id + 'wood'} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6a452c" />
          <stop offset="40%" stopColor="#3f2818" />
          <stop offset="100%" stopColor="#24160e" />
        </linearGradient>
        <linearGradient id={id + 'wire'} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8c7a55" />
          <stop offset="45%" stopColor="#f3ead2" />
          <stop offset="100%" stopColor="#8c7a55" />
        </linearGradient>
      </defs>
      <rect x="36" y="22" width="250" height="132" rx="8" fill={'url(#' + id + 'wood)'} />
      <rect x="36" y="22" width="8" height="132" fill={'url(#' + id + 'wire)'} />
      {[1, 2, 3, 4].map(function (f) {
        return <rect key={f} x={36 + f * 50} y="24" width="3" height="128" fill={'url(#' + id + 'wire)'} opacity="0.95" />;
      })}
      <circle cx="161" cy="88" r="4" fill="#e8d9b0" opacity="0.35" />
      {names.map(function (nm, i) {
        const y = 36 + i * 20;
        const on = highlight.indexOf(i) >= 0;
        return (
          <g key={nm}>
            <line x1="44" y1={y} x2="282" y2={y} stroke={on ? '#ffe08a' : '#ead9b4'} strokeWidth={on ? 2.4 : 1.15 + i * 0.12} opacity="0.92" />
            <text x="18" y={y + 4} fontSize="11" fill={on ? '#ffe08a' : '#d7c7a2'} fontWeight="700">{nm}</text>
          </g>
        );
      })}
      {props.children}
    </svg>
  );
}

function FingerDot(props) {
  const fret = Math.max(0, Number(props.fret) || 0);
  const x = fret === 0 ? 52 : 36 + (Math.min(fret, 4) - 0.5) * 50 + 8;
  const y = 36 + props.string * 20;
  return (
    <g>
      <circle cx={x} cy={y} r="11" fill={props.barre ? '#e08a3c' : '#2ee59d'} stroke="#fff8ea" strokeWidth="1.6" />
      <text x={x} y={y + 4} textAnchor="middle" fontSize="11" fontWeight="800" fill="#062016">{props.n}</text>
    </g>
  );
}

function BarreBar(props) {
  const x = 36 + (props.fret - 0.5) * 50 + 8;
  const y1 = 36 + (props.from || 0) * 20;
  const y2 = 36 + (props.to || 5) * 20;
  return <rect x={x - 9} y={y1 - 9} width="18" height={y2 - y1 + 18} rx="9" fill="#e08a3c" />;
}

function HoldPic() {
  return (
    <svg viewBox="0 0 300 176" width="100%" aria-label="How to hold the guitar">
      <defs>
        <linearGradient id="holdWood" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7a4d2c" />
          <stop offset="100%" stopColor="#2b170e" />
        </linearGradient>
      </defs>
      <rect width="300" height="176" rx="12" fill="#12100d" />
      <ellipse cx="168" cy="118" rx="78" ry="32" fill="url(#holdWood)" />
      <rect x="164" y="28" width="16" height="96" rx="5" fill="#c4a574" transform="rotate(16 172 76)" />
      <circle cx="102" cy="128" r="20" fill="#1a120c" stroke="#c4a574" strokeWidth="2" />
      <text x="150" y="26" textAnchor="middle" fill="#f3efe6" fontSize="14" fontWeight="700">Sit. Neck up. Thumb behind.</text>
      <text x="150" y="164" textAnchor="middle" fill="#cbb48a" fontSize="12">Guitar on your thigh, not hanging off your knee</text>
    </svg>
  );
}

function TunePic() {
  return (
    <svg viewBox="0 0 300 176" width="100%" aria-label="Tuner">
      <rect width="300" height="176" rx="12" fill="#12100d" />
      <rect x="58" y="40" width="184" height="86" rx="12" fill="#0d1319" stroke="#2ee59d" strokeWidth="2" />
      <text x="150" y="78" textAnchor="middle" fill="#2ee59d" fontSize="32" fontWeight="800">E</text>
      <line x1="150" y1="88" x2="150" y2="114" stroke="#ffc65c" strokeWidth="3" />
      <text x="150" y="158" textAnchor="middle" fill="#d7c7a2" fontSize="12">Tools → Tuner. Tiny turns on the peg.</text>
    </svg>
  );
}

function PhrasePic(props) {
  const raw = (props.lesson && props.lesson.notes) || [];
  const seen = {};
  const dots = [];
  raw.forEach(function (n) {
    if (!n || n.beats === 0) return;
    const key = n.string + ':' + n.fret;
    if (seen[key]) return;
    seen[key] = true;
    dots.push(n);
  });
  const show = dots.slice(0, 8);
  if (!show.length) return <Neck label="Lesson map" />;
  return (
    <Neck label="Practice map" highlight={show.map(function (d) { return d.string; })}>
      {show.map(function (d, i) {
        return <FingerDot key={i} string={d.string} fret={d.fret} n={i + 1} />;
      })}
    </Neck>
  );
}

const PICS = {
  hold: { title: 'Sit and hold', caption: 'Chair with no arms. Neck slightly up. Thumb on the back of the neck.', node: HoldPic },
  strings: { title: 'Thickest string is low E', caption: 'E A D G B e — fat string is 6, thin string is 1.', node: function () { return <Neck label="String names" highlight={[0, 5]} />; } },
  tune: { title: 'Get the letter in the middle', caption: 'One string at a time. Tightening raises the pitch.', node: TunePic },
  em: {
    title: 'Em — two fingers',
    caption: 'Middle on A fret 2. Ring on D fret 2. Everything else open.',
    node: function () {
      return (<Neck label="E minor"><FingerDot string={1} fret={2} n="2" /><FingerDot string={2} fret={2} n="3" /></Neck>);
    }
  },
  g: {
    title: 'G — three fingers',
    caption: 'Ring on low E fret 3. Middle on A fret 2. Pinky on high E fret 3.',
    node: function () {
      return (<Neck label="G major"><FingerDot string={0} fret={3} n="3" /><FingerDot string={1} fret={2} n="2" /><FingerDot string={5} fret={3} n="4" /></Neck>);
    }
  },
  switch: {
    title: 'Em four beats, then G four beats',
    caption: 'Move all fingers together. Ugly is fine today.',
    node: function () {
      return (
        <div className="picPair">
          <Neck label="Em"><FingerDot string={1} fret={2} n="2" /><FingerDot string={2} fret={2} n="3" /></Neck>
          <Neck label="G"><FingerDot string={0} fret={3} n="3" /><FingerDot string={1} fret={2} n="2" /><FingerDot string={5} fret={3} n="4" /></Neck>
        </div>
      );
    }
  },
  barreIndex: {
    title: 'Index across fret 1',
    caption: 'Orange bar is the index. No other fingers yet.',
    node: function () {
      return (<Neck label="Index barre" highlight={[0,1,2,3,4,5]}><BarreBar fret={1} from={0} to={5} /></Neck>);
    }
  },
  barreMini: {
    title: 'Mini F — three strings',
    caption: 'Index on B and high E fret 1. Middle on G fret 2.',
    node: function () {
      return (<Neck label="Mini F"><BarreBar fret={1} from={4} to={5} /><FingerDot string={3} fret={2} n="2" /></Neck>);
    }
  },
  barreF: {
    title: 'Full F — E shape at fret 1',
    caption: 'Barre 1, middle G2, ring A3, pinky D3.',
    node: function () {
      return (<Neck label="F barre"><BarreBar fret={1} from={0} to={5} /><FingerDot string={1} fret={3} n="3" /><FingerDot string={2} fret={3} n="4" /><FingerDot string={3} fret={2} n="2" /></Neck>);
    }
  },
  barreBm: {
    title: 'Bm — Am shape at fret 2',
    caption: 'Skip low E. Index bars from A across fret 2.',
    node: function () {
      return (<Neck label="Bm"><BarreBar fret={2} from={1} to={5} /><FingerDot string={2} fret={4} n="3" /><FingerDot string={3} fret={4} n="4" /><FingerDot string={4} fret={3} n="2" /></Neck>);
    }
  },
  barreMove: {
    title: 'Same grip: F then G',
    caption: 'Fret 1 = F. Slide to fret 3 = G. Low E names the chord.',
    node: function () {
      return (
        <div className="picPair">
          <Neck label="F"><BarreBar fret={1} from={0} to={5} /></Neck>
          <Neck label="G barre"><BarreBar fret={3} from={0} to={5} /></Neck>
        </div>
      );
    }
  },
  pent: { title: 'Pentatonic box — two notes per string', caption: 'Climb low to high. Numbered dots are the first pass of the box.', node: PhrasePic },
  bend: { title: 'Bend to a target fret', caption: 'Push the lower fret until it matches the higher target. Then shake.', node: PhrasePic },
  slide: { title: 'Slide between boxes', caption: 'One motion. Do not pick the fret you slide into.', node: PhrasePic }
};

function kindFromLesson(lesson) {
  const id = String((lesson && lesson.id) || '').toLowerCase();
  const title = String((lesson && lesson.title) || '').toLowerCase();
  if (id.indexOf('day1-hold') === 0) return 'hold';
  if (id.indexOf('day1-strings') === 0) return 'strings';
  if (id.indexOf('day1-tune') === 0) return 'tune';
  if (id.indexOf('day1-em') === 0) return 'em';
  if (id.indexOf('day1-g') === 0) return 'g';
  if (id.indexOf('day1-switch') === 0) return 'switch';
  if (id.indexOf('barre-index') === 0) return 'barreIndex';
  if (id.indexOf('barre-mini') === 0) return 'barreMini';
  if (id.indexOf('barre-f') === 0) return 'barreF';
  if (id.indexOf('barre-bm') === 0) return 'barreBm';
  if (id.indexOf('barre-move') === 0 || id.indexOf('barre') === 0) return 'barreMove';
  if (id.indexOf('pent') !== -1 || title.indexOf('pent') !== -1) return 'pent';
  if (id.indexOf('bend') !== -1 || title.indexOf('bend') !== -1) return 'bend';
  if (id.indexOf('slide') !== -1 || title.indexOf('slide') !== -1) return 'slide';
  return 'phrase';
}

export default function LessonPictures(props) {
  const lesson = props.lesson;
  if (!lesson) return null;
  const kind = kindFromLesson(lesson);
  const pic = PICS[kind];
  const Node = pic ? pic.node : PhrasePic;
  const title = pic ? pic.title : (lesson.title || 'Fret map');
  const caption = pic ? pic.caption : 'Green dots are the notes in this run. Play them in order on the big fretboard below.';
  return (
    <div className="lessonPics">
      <span className="optLabel">{title}</span>
      <div className="lessonPicFrame">
        <Node lesson={lesson} />
      </div>
      <p className="muted sm">{caption}</p>
    </div>
  );
}
