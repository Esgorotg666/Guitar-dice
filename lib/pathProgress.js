import { BADGES, GOLD_SCORE, PATHS, PASS_SCORE, pathFor } from './path';

const KEY = 'gd-challenge-path-v1';

function empty() {
  return { clears: {}, best: {}, badges: {}, updated: 0 };
}

export function loadProgress() {
  if (typeof window === 'undefined') return empty();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return empty();
    const p = JSON.parse(raw);
    return Object.assign(empty(), p, { clears: p.clears || {}, best: p.best || {}, badges: p.badges || {} });
  } catch (e) {
    return empty();
  }
}

export function saveProgress(p) {
  if (typeof window === 'undefined') return p;
  try { window.localStorage.setItem(KEY, JSON.stringify(p)); } catch (e) {}
  return p;
}

export function isCleared(progress, id) {
  return !!(progress && progress.clears && progress.clears[id]);
}

export function bestScore(progress, id) {
  return (progress && progress.best && progress.best[id]) || 0;
}

export function unlockedIndex(progress, style) {
  const steps = pathFor(style);
  let i = 0;
  while (i < steps.length && isCleared(progress, steps[i].id)) i++;
  return i;
}

export function isUnlocked(progress, style, lessonId, gate) {
  if (gate) return false;
  const steps = pathFor(style);
  const idx = steps.findIndex(function (s) { return s.id === lessonId; });
  if (idx < 0) return true;
  if (idx === 0) return true;
  return isCleared(progress, steps[idx - 1].id);
}

function pathComplete(progress, style) {
  const steps = PATHS[style] || [];
  return steps.length > 0 && steps.every(function (s) { return isCleared(progress, s.id); });
}

export function recordAttempt(progress, lessonId, style, score) {
  const next = {
    clears: Object.assign({}, progress.clears),
    best: Object.assign({}, progress.best),
    badges: Object.assign({}, progress.badges),
    updated: Date.now()
  };
  const prevBest = next.best[lessonId] || 0;
  if (score > prevBest) next.best[lessonId] = score;
  if (score >= PASS_SCORE) next.clears[lessonId] = true;
  const clearedCount = Object.keys(next.clears).length;
  if (clearedCount >= 1) next.badges['first-clear'] = true;
  if (clearedCount >= 3) next.badges['three-deep'] = true;
  if (score >= GOLD_SCORE) next.badges['gold-ear'] = true;
  if (pathComplete(next, 'lead')) next.badges['path-lead'] = true;
  if (pathComplete(next, 'rhythm')) next.badges['path-rhythm'] = true;
  if (pathComplete(next, 'acoustic')) next.badges['path-acoustic'] = true;
  return saveProgress(next);
}

export function earnedBadges(progress) {
  return BADGES.filter(function (b) { return progress && progress.badges && progress.badges[b.id]; });
}
