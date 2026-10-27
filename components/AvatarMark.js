import { skinLook, shirtLook } from '../lib/locker';

export default function AvatarMark(props) {
  const a = (props.locker && props.locker.avatar) || { skin: 'tan', hair: 'none', hat: 'none', shirt: 'black' };
  const skin = skinLook(a.skin).fill;
  const shirt = shirtLook(a.shirt).fill;
  const size = props.size || 44;
  const hairColor = '#1c1612';
  const hairHighlight = '#3a2e24';

  return (
    <svg className="avatarMark" width={size} height={size} viewBox="0 0 80 80" aria-hidden="true">
      <circle cx="40" cy="40" r="38" fill="#0e141b" stroke="var(--accent, #3b9dff)" strokeWidth="2.5" />

      {/* neck / shoulders */}
      <path d="M22 58c0-8 6-12 18-12s18 4 18 12v14H22z" fill={shirt} />
      <path d="M28 46c2 4 6 6 12 6s10-2 12-6" fill={skin} />

      {/* head */}
      <ellipse cx="40" cy="32" rx="16" ry="18" fill={skin} />

      {/* ears */}
      <ellipse cx="24" cy="34" rx="3.2" ry="4.5" fill={skin} />
      <ellipse cx="56" cy="34" rx="3.2" ry="4.5" fill={skin} />

      {/* hair base layer so it sits under hat cleanly */}
      {a.hair !== 'none' ? (
        <path d="M24 30c1-14 31-14 32 0-4-6-28-6-32 0z" fill={hairColor} />
      ) : null}

      {/* short hair */}
      {a.hair === 'short' ? (
        <g>
          <path d="M23 28c2-12 32-12 34 1-6-7-28-7-34-1z" fill={hairColor} />
          <path d="M26 26c3-8 25-8 28 1" fill={hairHighlight} opacity="0.5" />
        </g>
      ) : null}

      {/* mop / shaggy */}
      {a.hair === 'mop' ? (
        <g>
          <path d="M20 32c0-16 40-16 40 2-8-9-32-9-40-2z" fill={hairColor} />
          <path d="M22 30c4-10 32-10 36 1" fill={hairHighlight} opacity="0.35" />
          <path d="M24 34c-2 4-1 8 2 10" stroke={hairColor} strokeWidth="3" fill="none" />
          <path d="M56 34c2 4 1 8-2 10" stroke={hairColor} strokeWidth="3" fill="none" />
        </g>
      ) : null}

      {/* bun */}
      {a.hair === 'bun' ? (
        <g>
          <path d="M24 28c2-11 30-11 32 1" fill={hairColor} />
          <circle cx="40" cy="12" r="7" fill={hairColor} />
          <circle cx="40" cy="12" r="4.5" fill={hairHighlight} opacity="0.6" />
        </g>
      ) : null}

      {/* eyes */}
      <ellipse cx="33" cy="32" rx="2.2" ry="2.6" fill="#1a1410" />
      <ellipse cx="47" cy="32" rx="2.2" ry="2.6" fill="#1a1410" />
      <circle cx="33.6" cy="31.4" r="0.7" fill="#fff" opacity="0.8" />
      <circle cx="47.6" cy="31.4" r="0.7" fill="#fff" opacity="0.8" />

      {/* brows */}
      <path d="M29 28c2-1.5 5-1.5 7 0" stroke="#1a1410" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M44 28c2-1.5 5-1.5 7 0" stroke="#1a1410" strokeWidth="1.2" fill="none" strokeLinecap="round" />

      {/* nose */}
      <path d="M38 36c1 2 2 2 4 0" stroke="#1a1410" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6" />

      {/* mouth */}
      <path d="M34 40c2.5 2.5 9.5 2.5 12 0" stroke="#1a1410" strokeWidth="1.6" fill="none" strokeLinecap="round" />

      {/* hat: cap */}
      {a.hat === 'cap' ? (
        <g>
          <path d="M22 24c3-12 33-12 36 0H22z" fill="#2c5aa0" />
          <path d="M22 24h36c-1 3-4 4-8 4H30c-4 0-7-1-8-4z" fill="#1e4078" />
          <path d="M58 24h10c-2 5-7 6-12 4z" fill="#2c5aa0" />
        </g>
      ) : null}

      {/* hat: beanie */}
      {a.hat === 'beanie' ? (
        <g>
          <path d="M22 26c2-14 34-14 36 0v3H22z" fill="#6b2c3a" />
          <path d="M22 26h36v3H22z" fill="#4a1d28" />
          <circle cx="40" cy="14" r="3" fill="#6b2c3a" />
        </g>
      ) : null}
    </svg>
  );
}
