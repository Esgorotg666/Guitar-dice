import { skinLook, shirtLook } from '../lib/locker';

export default function AvatarMark(props) {
  const a = (props.locker && props.locker.avatar) || { skin: 'tan', hair: 'none', hat: 'none', shirt: 'black' };
  const skin = skinLook(a.skin).fill;
  const shirt = shirtLook(a.shirt).fill;
  const size = props.size || 44;
  return (
    <svg className="avatarMark" width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="31" fill="#12181f" stroke="var(--accent, #3b9dff)" strokeWidth="2" />
      <rect x="14" y="42" width="36" height="22" rx="8" fill={shirt} />
      <circle cx="32" cy="28" r="14" fill={skin} />
      {a.hair === 'short' ? <path d="M18 26c2-10 26-10 28 0v-2c-2-12-26-12-28 0z" fill="#2b2118" /> : null}
      {a.hair === 'mop' ? <path d="M16 30c1-16 31-16 32 1-6-8-26-8-32-1z" fill="#1a1410" /> : null}
      {a.hair === 'bun' ? (
        <g>
          <circle cx="32" cy="10" r="6" fill="#2b2118" />
          <path d="M18 26c2-10 26-10 28 0" fill="#2b2118" />
        </g>
      ) : null}
      <circle cx="27" cy="27" r="1.6" fill="#1a1410" />
      <circle cx="37" cy="27" r="1.6" fill="#1a1410" />
      <path d="M28 34c2 2 6 2 8 0" stroke="#1a1410" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      {a.hat === 'cap' ? <path d="M18 22c3-10 25-10 28 0H18zm28 0h10c-2 4-6 5-10 4z" fill="#2c5aa0" /> : null}
      {a.hat === 'beanie' ? <path d="M18 24c2-12 26-12 28 0v2H18z" fill="#6b2c3a" /> : null}
    </svg>
  );
}
