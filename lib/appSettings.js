const KEY = 'gd-app-settings-v1';
export const A4_PRESETS = [432, 440, 442];
export const THEMES = [
  { id: 'dark', label: 'Dark' },
  { id: 'light', label: 'Light' },
  { id: 'system', label: 'System' }
];

export function defaults() {
  return { theme: 'dark', bpm: 90, a4: 440, tuningId: 'standard' };
}

export function loadSettings() {
  const base = defaults();
  if (typeof window === 'undefined') return base;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return base;
    const p = JSON.parse(raw);
    const bpm = Math.max(40, Math.min(240, Number(p.bpm) || 90));
    const a4 = A4_PRESETS.indexOf(Number(p.a4)) >= 0 ? Number(p.a4) : 440;
    const theme = THEMES.some(function (t) { return t.id === p.theme; }) ? p.theme : 'dark';
    return {
      theme: theme,
      bpm: bpm,
      a4: a4,
      tuningId: p.tuningId || 'standard'
    };
  } catch (e) {
    return base;
  }
}

export function saveSettings(next) {
  const clean = Object.assign(defaults(), next || {});
  if (typeof window !== 'undefined') {
    try { window.localStorage.setItem(KEY, JSON.stringify(clean)); } catch (e) {}
    applyTheme(clean.theme);
  }
  return clean;
}

export function resolvedTheme(theme) {
  if (theme === 'light') return 'light';
  if (theme === 'system' && typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  return 'dark';
}

export function applyTheme(theme) {
  if (typeof document === 'undefined') return;
  const mode = resolvedTheme(theme || 'dark');
  document.documentElement.setAttribute('data-theme', mode);
  const roots = document.querySelectorAll('.themeRoot');
  for (let i = 0; i < roots.length; i++) roots[i].setAttribute('data-theme', mode);
}
