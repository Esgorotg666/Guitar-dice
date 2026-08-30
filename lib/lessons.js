const ORDER = ['entry','intermediate','advanced','master'];

export function lessonsFor(all, style, genre, skill) {
  const mine = (all || []).filter(function (l) { return l.style === style; });
  const maxIdx = Math.max(0, ORDER.indexOf(skill));
  function rank(l) {
    const lvl = ORDER.indexOf(l.level);
    return {
      reach: lvl > maxIdx ? 1 : 0,
      genre: l.genre === genre ? 0 : ((l.genre === 'any' || !l.genre) ? 1 : 2),
      lvl: lvl
    };
  }
  return mine.slice().sort(function (a, b) {
    const ra = rank(a), rb = rank(b);
    if (ra.reach !== rb.reach) return ra.reach - rb.reach;
    if (ra.genre !== rb.genre) return ra.genre - rb.genre;
    return ra.lvl - rb.lvl;
  });
}
export function isStretch(lesson, skill) {
  return ORDER.indexOf(lesson.level) > Math.max(0, ORDER.indexOf(skill));
}
