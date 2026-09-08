function pad(n) {
  return n < 10 ? '0' + n : String(n);
}

export function dayKey(now) {
  const d = now ? new Date(now) : new Date();
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(d);
  const y = parts.filter(function (p) { return p.type === 'year'; })[0].value;
  const m = parts.filter(function (p) { return p.type === 'month'; })[0].value;
  const day = parts.filter(function (p) { return p.type === 'day'; })[0].value;
  return y + '-' + m + '-' + day;
}

export function prevDayKey(key) {
  const parts = String(key || '').split('-');
  if (parts.length !== 3) return '';
  const dt = new Date(Date.UTC(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2])));
  dt.setUTCDate(dt.getUTCDate() - 1);
  return dt.getUTCFullYear() + '-' + pad(dt.getUTCMonth() + 1) + '-' + pad(dt.getUTCDate());
}

export function emptyStreak() {
  return { currentStreak: 0, lastDay: '', longest: 0 };
}

export function applyVisit(prev, now) {
  const today = dayKey(now);
  const cur = prev && typeof prev === 'object' ? prev : emptyStreak();
  const last = String(cur.lastDay || '');
  let count = Number(cur.currentStreak) || 0;
  let longest = Number(cur.longest) || 0;
  if (last === today) {
    if (count < 1) count = 1;
  } else if (last && last === prevDayKey(today)) {
    count += 1;
  } else {
    count = 1;
  }
  if (count > longest) longest = count;
  return { currentStreak: count, lastDay: today, longest: longest };
}
