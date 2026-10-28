import { skinLook, shirtLook } from '../lib/locker';

export default function AvatarMark(props) {
  const a = (props.locker && props.locker.avatar) || { skin: 'tan', hair: 'none', hat: 'none', shirt: 'black' };
  const skin = skinLook(a.skin).fill;
  const shirt = shirtLook(a.shirt).fill;
  const size = props.size || 44;
  const hairColor = '#1a1410';
  const hairHi = '#3d3228';

  return (
    <svg className="avatarMark" width={size} height={size} viewBox="0 0 96 96" aria-hidden="true">
      <defs>
        <radialGradient id="faceGrad" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor={skin} />
          <stop offset="100%" stopColor={skin} stopOpacity="0.85" />
        </radialGradient>
      </defs>
      <circle cx="48" cy="48" r="46" fill="#0c1016" stroke="var(--accent, #3b9dff)" strokeWidth="2.5" />

      {/* shoulders */}
      <path d="M18 72c2-14 12-20 30-20s28 6 30 20v16H18z" fill={shirt} />
      <path d="M30 54c3 6 8 9 18 9s15-3 18-9" fill={skin} />

      {/* head */}
      <ellipse cx="48" cy="38" rx="18" ry="20" fill="url(#faceGrad)" />

      {/* ears */}
      <ellipse cx="28" cy="40" rx="3.5" ry="5" fill={skin} />
      <ellipse cx="68" cy="40" rx="3.5" ry="5" fill={skin} />
      <ellipse cx="28" cy="40" rx="1.8" ry="3" fill="#c9a07a" opacity="0.4" />
      <ellipse cx="68" cy="40" rx="1.8" ry="3" fill="#c9a07a" opacity="0.4" />

      {/* hair styles */}
      {a.hair === 'short' ? (
        <g>
          <path d="M30 34c2-14 34-14 36 2-8-8-28-8-36-2z" fill={hairColor} />
          <path d="M34 30c4-8 24-8 28 2" fill={hairHi} opacity="0.45" />
        </g>
      ) : null}
      {a.hair === 'mop' ? (
        <g>
          <path d="M26 36c0-18 44-18 44 3-10-10-34-10-44-3z" fill={hairColor} />
          <path d="M30 32c6-10 30-10 34 2" fill={hairHi} opacity="0.3" />
          <path d="M28 38c-2 5 0 10 3 12" stroke={hairColor} strokeWidth="3.5" fill="none" />
          <path d="M68 38c2 5 0 10-3 12" stroke={hairColor} strokeWidth="3.5" fill="none" />
        </g>
      ) : null}
      {a.hair === 'bun' ? (
        <g>
          <path d="M30 32c3-12 33-12 36 2" fill={hairColor} />
          <circle cx="48" cy="14" r="8" fill={hairColor} />
          <circle cx="48" cy="14" r="5" fill={hairHi} opacity="0.5" />
        </g>
      ) : null}
      {a.hair === 'side' ? (
        <g>
          <path d="M28 32c5-16 40-16 40 3-12-9-28-9-40-3z" fill={hairColor} />
          <path d="M36 26c7-6 18-4 22 3" fill={hairHi} opacity="0.35" />
          <path d="M30 36c-1 7 3 12 5 14" stroke={hairColor} strokeWidth="3" fill="none" />
        </g>
      ) : null}
      {a.hair === 'long' ? (
        <g>
          <path d="M24 34c3-18 45-18 48 3v22c-5 5-12 7-20 7s-15-2-20-7c-3-5-5-12-5-18z" fill={hairColor} />
          <path d="M30 30c8-10 28-10 34 3" fill={hairHi} opacity="0.25" />
        </g>
      ) : null}

      {/* eyes */}
      <ellipse cx="40" cy="38" rx="2.6" ry="3" fill="#1a1410" />
      <ellipse cx="56" cy="38" rx="2.6" ry="3" fill="#1a1410" />
      <circle cx="40.8" cy="37.2" r="0.9" fill="#fff" opacity="0.9" />
      <circle cx="56.8" cy="37.2" r="0.9" fill="#fff" opacity="0.9" />

      {/* brows */}
      <path d="M35 33c2.5-2 6-2 8.5 0" stroke="#1a1410" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M52.5 33c2.5-2 6-2 8.5 0" stroke="#1a1410" strokeWidth="1.4" fill="none" strokeLinecap="round" />

      {/* nose */}
      <path d="M46 43c1.2 2.5 2.5 2.5 4 0" stroke="#1a1410" strokeWidth="1.1" fill="none" strokeLinecap="round" opacity="0.5" />

      {/* mouth */}
      <path d="M41 48c3 3 11 3 14 0" stroke="#1a1410" strokeWidth="1.8" fill="none" strokeLinecap="round" />

      {/* hats */}
      {a.hat === 'cap' ? (
        <g>
          <path d="M28 28c4-14 36-14 40 0H28z" fill="#2a5298" />
          <path d="M28 28h40c-1.5 4-5 5-10 5H38c-5 0-8.5-1-10-5z" fill="#1c3a70" />
          <path d="M68 28h12c-2.5 6-8 7-14 5z" fill="#2a5298" />
        </g>
      ) : null}
      {a.hat === 'beanie' ? (
        <g>
          <path d="M28 30c3-16 38-16 40 0v4H28z" fill="#6b2c3a" />
          <path d="M28 30h40v4H28z" fill="#4a1d28" />
          <circle cx="48" cy="16" r="3.5" fill="#6b2c3a" />
        </g>
      ) : null}
    </svg>
  );
}
