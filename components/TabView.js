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

  if (!notes.length) return null;

  // Build bars (assume 4 beats per bar for display)
  const bars = [];
  let beat = 0;
  let bar = [];
  notes.forEach(function (n, i) {
    bar.push(Object.assign({ _i: i }, n));
    beat += n.beats || 1;
    if (beat >= 4) {
      bars.push(bar);
      bar = [];
      beat = 0;
    }
  });
  if (bar.length) bars.push(bar);

  return (
    <div className="tabView" ref={scrollRef} style={{ overflowX: 'auto', background: '#0e141b', borderRadius: 8, padding: 8, margin: '8px 0' }}>
      <div style={{ display: 'flex', minWidth: 'max-content' }}>
        {bars.map(function (b, bi) {
          return (
            <div key={bi} style={{ borderRight: '1px solid #2a3544', padding: '4px 8px', minWidth: 80 }}>
              <div style={{ fontSize: 10, color: '#6b7a8d', marginBottom: 2 }}>Bar {bi + 1}</div>
              {STRINGS.map(function (s, si) {
                const stringNotes = b.filter(function (n) { return n.string === (5 - si); });
                return (
                  <div key={s} style={{ fontFamily: 'monospace', fontSize: 13, lineHeight: '16px', color: '#c8d0d8', whiteSpace: 'nowrap' }}>
                    <span style={{ color: '#6b7a8d', marginRight: 4 }}>{s}|</span>
                    {stringNotes.length ? stringNotes.map(function (n) {
                      const isActive = n._i === active;
                      const tech = (n.tech || []).join('');
                      return (
                        <span key={n._i} data-active={isActive ? '1' : '0'} style={{
                          background: isActive ? '#3b9dff' : 'transparent',
                          color: isActive ? '#fff' : '#c8d0d8',
                          padding: '0 3px',
                          borderRadius: 2,
                          marginRight: 2
                        }}>
                          {n.fret}{tech ? <sup style={{ fontSize: 9 }}>{tech}</sup> : null}
                        </span>
                      );
                    }) : <span style={{ opacity: 0.3 }}>—</span>}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
