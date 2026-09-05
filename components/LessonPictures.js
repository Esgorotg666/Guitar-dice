function Neck(props) {
  const names = ['E', 'A', 'D', 'G', 'B', 'e'];
  const highlight = props.highlight || [];
  return (
    <svg viewBox="0 0 280 160" width="100%" aria-label={props.label || 'Guitar neck'}>
      <rect x="8" y="18" width="264" height="124" rx="8" fill="#1a1410" stroke="#8a6a3a" />
      {[0, 1, 2, 3].map(function (f) {
        return <line key={f} x1={70 + f * 52} y1="22" x2={70 + f * 52} y2="138" stroke="#c4a574" strokeWidth={f === 0 ? 4 : 1.5} />;
      })}
      {names.map(function (nm, i) {
        const y = 30 + i * 18;
        const on = highlight.indexOf(i) >= 0;
        return (
          <g key={nm}>
            <line x1="20" y1={y} x2="260" y2={y} stroke={on ? '#ffc65c' : '#9aa7b3'} strokeWidth={on ? 3 : 1.4} />
            <text x="28" y={y - 4} fontSize="11" fill={on ? '#ffc65c' : '#c3ced9'} fontWeight="700">{nm}</text>
          </g>
        );
      })}
      {props.children}
    </svg>
  );
}

function FingerDot(props) {
  const x = 70 + (props.fret - 0.5) * 52;
  const y = 30 + props.string * 18;
  return (
    <g>
      <circle cx={x} cy={y} r="10" fill={props.barre ? '#e08a3c' : '#35c46b'} stroke="#fff" strokeWidth="2" />
      <text x={x} y={y + 4} textAnchor="middle" fontSize="11" fontWeight="800" fill="#04160c">{props.n}</text>
    </g>
  );
}

function BarreBar(props) {
  const x = 70 + (props.fret - 0.5) * 52;
  const y1 = 30 + (props.from || 0) * 18;
  const y2 = 30 + (props.to || 5) * 18;
  return <rect x={x - 8} y={y1 - 8} width="16" height={y2 - y1 + 16} rx="8" fill="#e08a3c" opacity="0.95" />;
}

function HoldPic() {
  return (
    <svg viewBox="0 0 280 160" width="100%" aria-label="How to hold the guitar">
      <rect width="280" height="160" rx="10" fill="#12181f" />
      <ellipse cx="150" cy="108" rx="70" ry="28" fill="#3b2a1a" />
      <rect x="148" y="28" width="14" height="88" rx="4" fill="#c4a574" transform="rotate(18 155 72)" />
      <circle cx="92" cy="118" r="18" fill="#2a2118" stroke="#c4a574" />
      <text x="140" y="24" textAnchor="middle" fill="#e8eef5" fontSize="13" fontWeight="700">Sit. Neck up. Thumb behind.</text>
      <text x="140" y="152" textAnchor="middle" fill="#8b97a3" fontSize="11">Guitar on your thigh, not hanging off your knee</text>
    </svg>
  );
}

function TunePic() {
  return (
    <svg viewBox="0 0 280 160" width="100%" aria-label="Tuner">
      <rect width="280" height="160" rx="10" fill="#12181f" />
      <rect x="50" y="40" width="180" height="80" rx="10" fill="#0d1319" stroke="#35c46b" />
      <text x="140" y="68" textAnchor="middle" fill="#35c46b" fontSize="28" fontWeight="800">E</text>
      <line x1="140" y1="78" x2="140" y2="108" stroke="#ffc65c" strokeWidth="3" />
      <text x="140" y="148" textAnchor="middle" fill="#c3ced9" fontSize="12">Tools → Tuner. Tiny turns on the peg.</text>
    </svg>
  );
}

const PICS = {
  hold: {
    title: 'Sit and hold',
    caption: 'Chair with no arms. Neck slightly up. Thumb on the back of the neck.',
    node: HoldPic
  },
  strings: {
    title: 'Thickest string is low E',
    caption: 'E A D G B e — fat string is 6, thin string is 1.',
    node: function () { return <Neck label="String names" highlight={[0, 5]} />; }
  },
  tune: {
    title: 'Get the letter in the middle',
    caption: 'One string at a time. Tightening raises the pitch.',
    node: TunePic
  },
  em: {
    title: 'Em — two fingers',
    caption: 'Middle on A fret 2. Ring on D fret 2. Everything else open.',
    node: function () {
      return (
        <Neck label="E minor">
          <FingerDot string={1} fret={2} n="2" />
          <FingerDot string={2} fret={2} n="3" />
        </Neck>
      );
    }
  },
  g: {
    title: 'G — three fingers',
    caption: 'Ring on low E fret 3. Middle on A fret 2. Pinky on high E fret 3.',
    node: function () {
      return (
        <Neck label="G major">
          <FingerDot string={0} fret={3} n="3" />
          <FingerDot string={1} fret={2} n="2" />
          <FingerDot string={5} fret={3} n="4" />
        </Neck>
      );
    }
  },
  switch: {
    title: 'Em four beats, then G four beats',
    caption: 'Move all fingers together. Ugly is fine today.',
    node: function () {
      return (
        <div className="picPair">
          <Neck label="Em">
            <FingerDot string={1} fret={2} n="2" />
            <FingerDot string={2} fret={2} n="3" />
          </Neck>
          <Neck label="G">
            <FingerDot string={0} fret={3} n="3" />
            <FingerDot string={1} fret={2} n="2" />
            <FingerDot string={5} fret={3} n="4" />
          </Neck>
        </div>
      );
    }
  },
  barreIndex: {
    title: 'Index across fret 1',
    caption: 'Orange bar is the index. No other fingers yet.',
    node: function () {
      return (
        <Neck label="Index barre" highlight={[0, 1, 2, 3, 4, 5]}>
          <BarreBar fret={1} from={0} to={5} />
        </Neck>
      );
    }
  },
  barreMini: {
    title: 'Mini F — three strings',
    caption: 'Index on B and high E fret 1. Middle on G fret 2.',
    node: function () {
      return (
        <Neck label="Mini F">
          <BarreBar fret={1} from={4} to={5} />
          <FingerDot string={3} fret={2} n="2" />
        </Neck>
      );
    }
  },
  barreF: {
    title: 'Full F — E shape at fret 1',
    caption: 'Barre 1, middle G2, ring A3, pinky D3.',
    node: function () {
      return (
        <Neck label="F barre">
          <BarreBar fret={1} from={0} to={5} />
          <FingerDot string={1} fret={3} n="3" />
          <FingerDot string={2} fret={3} n="4" />
          <FingerDot string={3} fret={2} n="2" />
        </Neck>
      );
    }
  },
  barreBm: {
    title: 'Bm — Am shape at fret 2',
    caption: 'Skip low E. Index bars from A across fret 2.',
    node: function () {
      return (
        <Neck label="Bm">
          <BarreBar fret={2} from={1} to={5} />
          <FingerDot string={2} fret={4} n="3" />
          <FingerDot string={3} fret={4} n="4" />
          <FingerDot string={4} fret={3} n="2" />
        </Neck>
      );
    }
  },
  barreMove: {
    title: 'Same grip: F then G',
    caption: 'Fret 1 = F. Slide to fret 3 = G. Low E names the chord.',
    node: function () {
      return (
        <div className="picPair">
          <Neck label="F">
            <BarreBar fret={1} from={0} to={5} />
          </Neck>
          <Neck label="G barre">
            <BarreBar fret={3} from={0} to={5} />
          </Neck>
        </div>
      );
    }
  }
};

function kindFromLesson(lesson) {
  const id = String((lesson && lesson.id) || '');
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
  if (id.indexOf('barre-move') === 0) return 'barreMove';
  return null;
}

export default function LessonPictures(props) {
  const kind = kindFromLesson(props.lesson);
  if (!kind || !PICS[kind]) return null;
  const pic = PICS[kind];
  const Node = pic.node;
  return (
    <div className="lessonPics">
      <span className="optLabel">{pic.title}</span>
      <div className="lessonPicFrame">
        <Node />
      </div>
      <p className="muted sm">{pic.caption}</p>
    </div>
  );
}
