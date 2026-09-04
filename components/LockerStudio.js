import AvatarMark from './AvatarMark';
import GuitarPreview from './GuitarPreview';
import {
  SKINS, HAIR, HATS, SHIRTS, BODIES, GUARDS, HARDWARE, INLAYS, LAYOUTS, SHOP_PACKS,
  isOpen, lockHint, nextUnlocks, clearCount, guitarTitle, hasTier
} from '../lib/locker';

function ChipRow(props) {
  return (
    <div>
      <span className="optLabel">{props.label}</span>
      <div className="optRow">
        {props.list.map(function (opt) {
          const open = props.kind === 'skin' || isOpen(props.kind, opt.id, props.progress, props.tier);
          const on = props.value === opt.id;
          return (
            <button
              key={opt.id}
              className={'chipBtn' + (on ? ' on' : '') + (!open ? ' lockedChip' : '')}
              title={!open ? lockHint(opt, props.progress, props.tier) : opt.label}
              onClick={function () {
                if (!open) {
                  if (opt.shop && props.onUpgrade) props.onUpgrade();
                  return;
                }
                props.onPick(opt.id);
              }}
            >
              {open ? opt.label : (opt.shop ? opt.price : 'Locked')}
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
  const tier = props.tier || 'free';
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
        {n} challenge{n === 1 ? '' : 's'} cleared. Path cosmetics stay free. Board layouts are the shop.
      </p>
      <div className="lockerStage">
        <AvatarMark locker={locker} size={72} />
        <div>
          <strong>{props.name || 'Player'}</strong>
          <small>{guitarTitle(locker)}</small>
        </div>
        <GuitarPreview locker={locker} width={150} />
      </div>

      <h4 className="lockerH">Avatar</h4>
      <ChipRow label="Skin" kind="skin" list={SKINS} value={locker.avatar.skin} progress={progress} tier={tier} onPick={function (id) { patchAvatar({ skin: id }); }} />
      <ChipRow label="Hair" kind="hair" list={HAIR} value={locker.avatar.hair} progress={progress} tier={tier} onPick={function (id) { patchAvatar({ hair: id }); }} />
      <ChipRow label="Hat" kind="hat" list={HATS} value={locker.avatar.hat} progress={progress} tier={tier} onPick={function (id) { patchAvatar({ hat: id }); }} />
      <ChipRow label="Shirt" kind="shirt" list={SHIRTS} value={locker.avatar.shirt} progress={progress} tier={tier} onPick={function (id) { patchAvatar({ shirt: id }); }} />

      <h4 className="lockerH">Guitar</h4>
      <ChipRow label="Body" kind="body" list={BODIES} value={locker.guitar.body} progress={progress} tier={tier} onPick={function (id) { patchGuitar({ body: id }); }} />
      <ChipRow label="Pickguard" kind="guard" list={GUARDS} value={locker.guitar.guard} progress={progress} tier={tier} onPick={function (id) { patchGuitar({ guard: id }); }} />
      <ChipRow label="Hardware" kind="hardware" list={HARDWARE} value={locker.guitar.hardware} progress={progress} tier={tier} onPick={function (id) { patchGuitar({ hardware: id }); }} />
      <ChipRow label="Inlays" kind="inlay" list={INLAYS} value={locker.guitar.inlay} progress={progress} tier={tier} onPick={function (id) { patchGuitar({ inlay: id }); }} />

      <h4 className="lockerH">Shop — fretboard layouts</h4>
      <p className="muted sm">These change the markers on the live neck, not just the locker preview.</p>
      <ChipRow
        label="Equipped layout"
        kind="layout"
        list={LAYOUTS}
        value={locker.guitar.layout || locker.guitar.inlay || 'dots'}
        progress={progress}
        tier={tier}
        onUpgrade={props.onUpgrade}
        onPick={function (id) { patchGuitar({ layout: id, inlay: id === 'blocks' ? 'blocks' : locker.guitar.inlay }); }}
      />
      {SHOP_PACKS.map(function (pack) {
        const owned = hasTier(tier, pack.tier);
        return (
          <div key={pack.id} className="shopPack">
            <div className="rowBetween">
              <div>
                <strong>{pack.title}</strong>
                <p className="muted sm">{pack.blurb}</p>
              </div>
              <span className="tagAmber">{pack.price}</span>
            </div>
            {owned ? (
              <p className="okText sm">Unlocked on your plan. Equip a layout above.</p>
            ) : (
              <button className="btn primary wide" onClick={function () { if (props.onUpgrade) props.onUpgrade(); }}>
                Buy {pack.tier === 'extreme' ? 'Extreme' : 'Premium'}
              </button>
            )}
          </div>
        );
      })}

      {coming.length ? (
        <div className="nextUnlocks">
          <span className="optLabel">Next path unlocks</span>
          {coming.map(function (u) {
            return <p key={u.id} className="muted sm">{u.label} — {u.hint}</p>;
          })}
        </div>
      ) : null}
    </div>
  );
}
