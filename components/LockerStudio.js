import AvatarMark from './AvatarMark';
import GuitarPreview from './GuitarPreview';
import {
  SKINS, HAIR, HATS, SHIRTS, BODIES, GUARDS, HARDWARE, INLAYS,
  isOpen, lockHint, nextUnlocks, clearCount, guitarTitle
} from '../lib/locker';

function ChipRow(props) {
  return (
    <div>
      <span className="optLabel">{props.label}</span>
      <div className="optRow">
        {props.list.map(function (opt) {
          const open = props.kind === 'skin' || isOpen(props.kind, opt.id, props.progress);
          const on = props.value === opt.id;
          return (
            <button
              key={opt.id}
              className={'chipBtn' + (on ? ' on' : '') + (!open ? ' lockedChip' : '')}
              title={!open ? lockHint(opt, props.progress) : opt.label}
              onClick={function () {
                if (!open) return;
                props.onPick(opt.id);
              }}
            >
              {open ? opt.label : 'Locked'}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function LockerStudio(props) {
  const locker = props.locker || {};
  const progress = props.progress || { clears: {}, badges: {} };
  const coming = nextUnlocks(progress);
  const n = clearCount(progress);

  function patchAvatar(part) {
    props.onChange({ avatar: Object.assign({}, locker.avatar, part), guitar: locker.guitar });
  }
  function patchGuitar(part) {
    props.onChange({ avatar: locker.avatar, guitar: Object.assign({}, locker.guitar, part) });
  }

  return (
    <div className="card lockerCard">
      <h3>Player locker</h3>
      <p className="muted sm">
        {n} challenge{n === 1 ? '' : 's'} cleared. Cosmetics unlock from the path, not from a payment.
      </p>
      <div className="lockerStage">
        <AvatarMark locker={locker} size={72} />
        <div>
          <strong>{props.name || 'Player'}</strong>
          <small>{guitarTitle(locker)} guitar equipped</small>
        </div>
        <GuitarPreview locker={locker} width={150} />
      </div>

      <h4 className="lockerH">Avatar</h4>
      <ChipRow label="Skin" kind="skin" list={SKINS} value={locker.avatar.skin} progress={progress} onPick={function (id) { patchAvatar({ skin: id }); }} />
      <ChipRow label="Hair" kind="hair" list={HAIR} value={locker.avatar.hair} progress={progress} onPick={function (id) { patchAvatar({ hair: id }); }} />
      <ChipRow label="Hat" kind="hat" list={HATS} value={locker.avatar.hat} progress={progress} onPick={function (id) { patchAvatar({ hat: id }); }} />
      <ChipRow label="Shirt" kind="shirt" list={SHIRTS} value={locker.avatar.shirt} progress={progress} onPick={function (id) { patchAvatar({ shirt: id }); }} />

      <h4 className="lockerH">Guitar</h4>
      <p className="muted sm">The equipped finish paints the classroom and roll fretboard.</p>
      <ChipRow label="Body" kind="body" list={BODIES} value={locker.guitar.body} progress={progress} onPick={function (id) { patchGuitar({ body: id }); }} />
      <ChipRow label="Pickguard" kind="guard" list={GUARDS} value={locker.guitar.guard} progress={progress} onPick={function (id) { patchGuitar({ guard: id }); }} />
      <ChipRow label="Hardware" kind="hardware" list={HARDWARE} value={locker.guitar.hardware} progress={progress} onPick={function (id) { patchGuitar({ hardware: id }); }} />
      <ChipRow label="Inlays" kind="inlay" list={INLAYS} value={locker.guitar.inlay} progress={progress} onPick={function (id) { patchGuitar({ inlay: id }); }} />

      {coming.length ? (
        <div className="nextUnlocks">
          <span className="optLabel">Next unlocks</span>
          {coming.map(function (u) {
            return <p key={u.id} className="muted sm">{u.label} — {u.hint}</p>;
          })}
        </div>
      ) : <p className="okText sm">Locker complete. Every finish is yours.</p>}
    </div>
  );
}
