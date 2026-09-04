import { useEffect, useState } from 'react';
import AvatarMark from './AvatarMark';
import GuitarPreview from './GuitarPreview';
import {
  SKINS, HAIR, HATS, SHIRTS, BODIES, GUARDS, HARDWARE, INLAYS, LAYOUTS,
  isOpen, lockHint, nextUnlocks, clearCount, guitarTitle, hasTier
} from '../lib/locker';
import { LAYOUT_SKUS, formatUsd, cacheOwnedLayouts, ownsLayout } from '../lib/shopLayouts';
import { fetchAppTier } from '../lib/resolveTier';

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
                if (!open) return;
                props.onPick(opt.id);
              }}
            >
              {open ? opt.label : (opt.price || 'Locked')}
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
  const [tier, setTier] = useState(props.tier || 'free');
  const [owned, setOwned] = useState([]);
  const [busy, setBusy] = useState('');
  const [err, setErr] = useState('');
  const coming = nextUnlocks(progress);
  const n = clearCount(progress);

  useEffect(function () {
    fetchAppTier(props.tier).then(function (info) {
      setTier(info.tier);
      setOwned(cacheOwnedLayouts(info.layouts || []));
    });
  }, [props.tier]);

  function patchAvatar(part) {
    props.onChange({ avatar: Object.assign({}, locker.avatar, part), guitar: locker.guitar });
  }
  function patchGuitar(part) {
    props.onChange({ avatar: locker.avatar, guitar: Object.assign({}, locker.guitar, part) });
  }

  function buySku(id) {
    setBusy(id); setErr('');
    fetch('/api/billing/checkout', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sku: id })
    })
      .then(function (r) { return r.json().then(function (b) { return { ok: r.ok, b: b }; }); })
      .then(function (res) {
        if (res.ok && res.b.url) { window.location.href = res.b.url; return; }
        setBusy('');
        if (res.b.needsAccount) {
          setErr('Sign in first so this layout stays on your account.');
          if (props.onNeedAccount) props.onNeedAccount();
          return;
        }
        setErr(res.b.message || 'Could not start checkout.');
      })
      .catch(function () { setBusy(''); setErr('Could not reach Stripe.'); });
  }

  function included(sku) {
    if (hasTier(tier, 'extreme')) return true;
    if (hasTier(tier, 'premium') && (sku.id === 'blank' || sku.id === 'birds' || sku.id === 'split' || sku.id === 'pack-all' && false)) {
      return sku.id !== 'shark' && sku.id !== 'glow' && sku.id !== 'pack-all';
    }
    return ownsLayout(sku.id) || owned.indexOf(sku.id) >= 0;
  }

  return (
    <div className="card lockerCard">
      <h3>Player locker</h3>
      <p className="muted sm">
        {n} challenge{n === 1 ? '' : 's'} cleared. Extreme includes every board layout. Free accounts can still buy one layout at a time.
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
      <p className="muted sm">Extreme already owns these. Equip any layout. A la carte stays for free accounts.</p>
      <ChipRow
        label="Equipped layout"
        kind="layout"
        list={LAYOUTS}
        value={locker.guitar.layout || locker.guitar.inlay || 'dots'}
        progress={progress}
        tier={tier}
        onPick={function (id) { patchGuitar({ layout: id, inlay: id === 'blocks' ? 'blocks' : locker.guitar.inlay }); }}
      />
      {LAYOUT_SKUS.map(function (sku) {
        const mine = included(sku);
        return (
          <div key={sku.id} className="shopPack">
            <div className="rowBetween">
              <div>
                <strong>{sku.label}</strong>
                <p className="muted sm">{sku.blurb}</p>
              </div>
              <span className="tagAmber">{hasTier(tier, 'extreme') ? 'Included' : formatUsd(sku.cents)}</span>
            </div>
            {mine ? (
              <p className="okText sm">Unlocked on your plan. Equip it above.</p>
            ) : (
              <button className="btn primary wide" disabled={!!busy} onClick={function () { buySku(sku.id); }}>
                {busy === sku.id ? 'Opening checkout...' : 'Buy ' + sku.label + ' — ' + formatUsd(sku.cents)}
              </button>
            )}
          </div>
        );
      })}
      {err ? <p className="warn">{err}</p> : null}

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
