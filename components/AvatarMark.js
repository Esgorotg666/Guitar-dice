import { skinLook, shirtLook } from '../lib/locker';

export default function AvatarMark(props) {
  const a = (props.locker && props.locker.avatar) || { skin: 'tan', hair: 'none', hat: 'none', shirt: 'black' };
  const skin = skinLook(a.skin).fill;
  const shirt = shirtLook(a.shirt).fill;
  const size = props.size || 48;
  const hair = '#1a1410';
  const hairHi = '#4a3c30';

  return (
    <svg className="avatarMark" width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <radialGradient id="faceG" cx="48%" cy="38%" r="60%">
          <stop offset="0%" stopColor={skin} />
          <stop offset="85%" stopColor={skin} stopOpacity="0.9" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="#0a0e14" stroke="var(--accent, #3b9dff)" strokeWidth="2" />

      {/* shoulders */}
      <path d="M16 78c4-16 14-22 34-22s30 6 34 22v14H16z" fill={shirt} />
      <path d="M32 58c4 7 10 10 18 10s14-3 18-10" fill={skin} />

      {/* head */}
      <ellipse cx="50" cy="40" rx="19" ry="21" fill="url(#faceG)" />

      {/* ears */}
      <ellipse cx="30" cy="42" rx="3.8" ry="5.2" fill={skin} />
      <ellipse cx="70" cy="42" rx="3.8" ry="5.2" fill={skin} />

      {/* hair */}
      {a.hair === 'short' && (
        <g>
          <path d="M31 36c3-15 35-15 38 2-9-9-29-9-38-2z" fill={hair} />
          <path d="M35 32c5-8 25-8 29 2" fill={hairHi} opacity="0.5" />
        </g>
      )}
      {a.hair === 'mop' && (
        <g>
          <path d="M27 38c1-19 46-19 46 3-11-11-35-11-46-3z" fill={hair} />
          <path d="M32 34c7-10 30-10 34 2" fill={hairHi} opacity="0.35" />
          <path d="M29 40c-2 6 1 11 4 13" stroke={hair} strokeWidth="4" fill="none" />
          <path d="M71 40c2 6-1 11-4 13" stroke={hair} strokeWidth="4" fill="none" />
        </g>
      )}
      {a.hair === 'bun' && (
        <g>
          <path d="M32 34c4-13 32-13 36 2" fill={hair} />
          <circle cx="50" cy="15" r="8.5" fill={hair} />
          <circle cx="50" cy="15" r="5" fill={hairHi} opacity="0.45" />
        </g>
      )}
      {a.hair === 'side' && (
        <g>
          <path d="M29 34c6-17 42-17 42 3-13-10-29-10-42-3z" fill={hair} />
          <path d="M38 28c8-6 18-4 22 3" fill={hairHi} opacity="0.4" />
          <path d="M31 38c-1 8 4 13 6 15" stroke={hair} strokeWidth="3.2" fill="none" />
        </g>
      )}
      {a.hair === 'long' && (
        <g>
          <path d="M25 36c4-19 46-19 50 3v24c-6 6-14 8-22 8s-16-2-22-8c-4-6-6-14-6-20z" fill={hair} />
          <path d="M32 32c9-11 28-11 34 3" fill={hairHi} opacity="0.3" />
        </g>
      )}

      {/* eyes */}
      <ellipse cx="42" cy="40" rx="2.8" ry="3.2" fill="#1a1410" />
      <ellipse cx="58" cy="40" rx="2.8" ry="3.2" fill="#1a1410" />
      <circle cx="42.9" cy="39.1" r="1" fill="#fff" opacity="0.85" />
      <circle cx="58.9" cy="39.1" r="1" fill="#fff" opacity="0.85" />

      {/* brows */}
      <path d="M37 35c2.8-2 6.5-2 9 0" stroke="#1a1410" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M54 35c2.8-2 6.5-2 9 0" stroke="#1a1410" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* nose */}
      <path d="M48 45c1.3 2.8 2.6 2.8 4.2 0" stroke="#1a1410" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.45" />

      {/* mouth */}
      <path d="M43 50c3.2 3.2 11.5 3.2 14.5 0" stroke="#1a1410" strokeWidth="1.9" fill="none" strokeLinecap="round" />

      {/* hats */}
      {a.hat === 'cap' && (
        <g>
          <path d="M30 30c5-15 35-15 40 0H30z" fill="#2a5298" />
          <path d="M30 30h40c-2 4.5-6 5.5-11 5.5H41c-5 0-9-1-11-5.5z" fill="#1c3a70" />
          <path d="M70 30h13c-3 7-9 8-15 6z" fill="#2a5298" />
        </g>
      )}
      {a.hat === 'beanie' && (
        <g>
          <path d="M30 32c4-17 36-17 40 0v5H30z" fill="#6b2c3a" />
          <path d="M30 32h40v5H30z" fill="#4a1d28" />
          <circle cx="50" cy="17" r="4" fill="#6b2c3a" />
        </g>
      )}
    </svg>
  );
}
