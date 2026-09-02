/**
 * Guitar Dice plans in this repo:
 *   free      — 2 random dice, entry lessons only
 *   premium   — first paid tier. Key + mode lock, intermediate lessons, crafted phrases, loop
 *   extreme   — everything. Advanced/master + neck systems + bridge dice
 *
 * Billing still lives on /api/plans. This file is the client map so we do
 * not ship Extreme-only tools to free users before the paywall is in place.
 */

export const TIER_ORDER = ['free', 'premium', 'extreme'];

export function tierRank(tier) {
  const i = TIER_ORDER.indexOf(tier || 'free');
  return i < 0 ? 0 : i;
}

export function hasTier(tier, min) {
  return tierRank(tier) >= tierRank(min);
}

export const FEATURE = {
  lockKey: 'premium',
  lockMode: 'premium',
  lessonsIntermediate: 'premium',
  lessonsAdvanced: 'extreme',
  lessonsMaster: 'extreme',
  craftedPhrases: 'premium',
  neckSystems: 'extreme',
  loopPlayer: 'premium',
  exportSheets: 'premium',
  bridgeDice: 'extreme'
};

export function can(tier, feature) {
  return hasTier(tier, FEATURE[feature] || 'extreme');
}

export function maxLessonLevel(tier) {
  if (hasTier(tier, 'extreme')) return 'master';
  if (hasTier(tier, 'premium')) return 'intermediate';
  return 'entry';
}

export function lessonLockedReason(lesson, tier) {
  if (!lesson) return null;
  const id = String(lesson.id || '');
  if (id.indexOf('neck-') === 0 && !can(tier, 'neckSystems')) {
    return 'Neck systems are on Extreme.';
  }
  const lvl = lesson.level || 'entry';
  if (lvl === 'intermediate' && !can(tier, 'lessonsIntermediate')) {
    return 'Intermediate lessons unlock on the first paid plan.';
  }
  if ((lvl === 'advanced' || lvl === 'master') && !can(tier, 'lessonsAdvanced')) {
    return 'Advanced and master lessons are on Extreme.';
  }
  return null;
}

export const TIER_COPY = {
  free: {
    label: 'Free',
    gets: ['2 dice, random key and mode', 'Entry classroom lessons', 'Tuner and basic metronome']
  },
  premium: {
    label: 'Premium',
    gets: [
      'Lock a key signature on the dice',
      'Lock a mode on the dice',
      'Intermediate lessons',
      'Crafted chord-and-scale phrases',
      'Loop player'
    ]
  },
  extreme: {
    label: 'Extreme',
    gets: [
      'Everything in Premium',
      'Advanced and master lessons',
      'CAGED / 3NPS / octave / jazz neck systems',
      'Bridge dice between chords'
    ]
  }
};
