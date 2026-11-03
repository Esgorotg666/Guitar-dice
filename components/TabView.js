import { useEffect, useRef } from 'react';

const STRINGS = ['e','B','G','D','A','E'];

export default function TabView(props) {
  const notes = props.notes || [];
  const active = props.active || 0;
  const scrollRef = useRef(null);

  useEffect(function () {
    if (!scrollRef.current) return;
    const el = scrollRef.current.querySelector('[data-active="1"]');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [active]);

  if (!notes.length) return <div style={{ padding: 8, color: '#6b7a8d' }}>No notes in this lesson.</div>;

  return (
    <div className="tabView" ref={scrollRef} style={{ overflowX: 'auto', background: '#0e141b', borderRadius: 8, padding: 10, margin: '8px 0', border: '1px solid #2a3544' }}>
      <div style={{ fontSize: 11, color: '#6b7a8d', marginBottom: 6 }}>Tab — all notes shown. Highlight follows playback.</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 'max-content' }}>
        {STRINGS.map(function (s, si) {
          const stringIdx = 5 - si;
          const stringNotes = notes.filter(function (n) { return n.string === stringIdx; });
          return (
            <div key={s} style={{ fontFamily: 'monospace', fontSize: 14, lineHeight: '20px', color: '#c8d0d8', whiteSpace: 'nowrap' }}>
              <span style={{ color: '#6b7a8d', marginRight: 6, display: 'inline-block', width: 16 }}>{s}|</span>
              {stringNotes.length ? stringNotes.map(function (n) {
                const isActive = notes.indexOf(n) === active;
                const tech = (n.tech || []).join('');
                return (
                  <span key={notes.indexOf(n)} data-active={isActive ? '1' : '0'} style={{
                    background: isActive ? '#3b9dff' : '#1a2330',
                    color: isActive ? '#fff' : '#d0d8e0',
                    padding: '1px 5px',
                    borderRadius: 3,
                    marginRight: 4,
                    border: isActive ? '1px solid #5ab0ff' : '1px solid #2a3544'
                  }}>
                    {n.fret}{tech ? <sup style={{ fontSize: 9, marginLeft: 1 }}>{tech}</sup> : null}
                  </span>
                );
              }) : <span style={{ opacity: 0.25 }}>—</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
