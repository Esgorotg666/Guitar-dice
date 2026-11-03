import { useEffect, useRef } from 'react';

const STRINGS = ['e','B','G','D','A','E'];

export default function TabView(props) {
  const notes = props.notes || [];
  const active = props.active || 0;
  const containerRef = useRef(null);

  useEffect(function () {
    if (!containerRef.current) return;
    const el = containerRef.current.querySelector('[data-active="1"]');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
  }, [active]);

  if (!notes.length) return <div style={{ padding: 8, color: '#6b7a8d' }}>No notes in this lesson.</div>;

  return (
    <div ref={containerRef} style={{ background: '#0e141b', borderRadius: 8, padding: 10, margin: '8px 0', border: '1px solid #2a3544' }}>
      <div style={{ fontSize: 11, color: '#6b7a8d', marginBottom: 6 }}>Full tab — highlight follows playback</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {STRINGS.map(function (s, si) {
          const stringIdx = 5 - si;
          const stringNotes = notes.filter(function (n) { return n.string === stringIdx; });
          return (
            <div key={s} style={{ fontFamily: 'monospace', fontSize: 13, lineHeight: '18px', color: '#c8d0d8', display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ color: '#6b7a8d', marginRight: 4, minWidth: 18 }}>{s}|</span>
              {stringNotes.length ? stringNotes.map(function (n) {
                const idx = notes.indexOf(n);
                const isActive = idx === active;
                const tech = (n.tech || []).join('');
                return (
                  <span key={idx} data-active={isActive ? '1' : '0'} style={{
                    background: isActive ? '#3b9dff' : '#1a2330',
                    color: isActive ? '#fff' : '#d0d8e0',
                    padding: '0 4px',
                    borderRadius: 2,
                    margin: '1px 2px',
                    border: isActive ? '1px solid #5ab0ff' : '1px solid transparent',
                    fontWeight: isActive ? 600 : 400
                  }}>
                    {n.fret}{tech ? <sup style={{ fontSize: 8 }}>{tech}</sup> : null}
                  </span>
                );
              }) : <span style={{ opacity: 0.2, marginLeft: 4 }}>—</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
