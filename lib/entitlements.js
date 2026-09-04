export const TIER_ORDER = ['free', 'premium', 'extreme'];

export function normalizeTier(tier) {
  const s = String(tier || 'free').toLowerCase();
  if (s.indexOf('extreme') >= 0 || s === 'pro' || s === 'full' || s === 'unlimited') return 'extreme';
  if (s.indexOf('premium') >= 0 || s === 'paid' || s === 'plus') return 'premium';
  return 'free';
}

export function tierRank(tier) {
  const i = TIER_ORDER.indexOf(normalizeTier(tier));
  return i < 0 ? 0 : i;
}

export function hasTier(tier, min) {
  return tierRank(tier) >= tierRank(min);
}

export function bestTier() {
  var best = 'free';
  for (var i = 0; i < arguments.length; i++) {
    if (tierRank(arguments[i]) > tierRank(best)) best = normalizeTier(arguments[i]);
  }
  return best;
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
  bridgeDice: 'extreme',
  theoryIntermediate: 'premium',
  theoryAdvanced: 'extreme',
  techIntermediate: 'premium',
  techAdvanced: 'extreme',
  fretLayouts: 'premium',
  fretLayoutsPro: 'extreme'
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
  if (hasTier(tier, 'extreme')) return null;
  const id = String(lesson.id || '');
  if (id.indexOf('neck-') === 0 && !can(tier, 'neckSystems')) {
    return 'Neck systems are on Extreme.';
  }
  const lvl = String(lesson.level || 'entry').toLowerCase();
  if ((lvl === 'intermediate' || lvl === 'inter') && !can(tier, 'lessonsIntermediate')) {
    return 'Intermediate lessons unlock on the first paid plan.';
  }
  if ((lvl === 'advanced' || lvl === 'master' || lvl === 'expert' || lvl === 'pro') && !can(tier, 'lessonsAdvanced')) {
    return 'Advanced and master lessons are on Extreme.';
  }
  return null;
}

export function guideLockedReason(guide, tier) {
  if (!guide) return null;
  if (hasTier(tier, 'extreme')) return null;
  const id = String(guide.id || '');
  const lvl = String(guide.level || 'entry').toLowerCase();
  const isTech = id.indexOf('tech-') === 0;
  if (lvl === 'entry' || lvl === 'beginner') return null;
  if (lvl === 'intermediate') {
    if (isTech && !can(tier, 'techIntermediate')) return 'Setup measurements unlock on Premium.';
    if (!isTech && !can(tier, 'theoryIntermediate')) return 'This theory page unlocks on Premium.';
  }
  if (lvl === 'advanced' || lvl === 'master' || lvl === 'expert' || lvl === 'pro') {
    if (isTech && !can(tier, 'techAdvanced')) return 'Floyd, wiring maps, and EMG are on Extreme.';
    if (!isTech && !can(tier, 'theoryAdvanced')) return 'Advanced theory is on Extreme.';
  }
  return null;
}

export const TIER_COPY = {
  free: {
    label: 'Free',
    gets: ['2 dice, random key and mode', 'Entry classroom lessons', 'Tuner, basic metronome, entry theory and string-change tech', 'Standard dot fretboard']
  },
  premium: {
    label: 'Premium',
    gets: [
      'Lock a key signature on the dice',
      'Lock a mode on the dice',
      'Intermediate lessons',
      'Crafted chord-and-scale phrases',
      'Loop player',
      'Blank, bird, and split-block layouts included',
      'Intermediate theory and setup (relief, intonation, pickup height)'
    ]
  },
  extreme: {
    label: 'Extreme',
    gets: [
      'Everything in Premium',
      'Advanced and master lessons',
      'CAGED / 3NPS / octave / jazz neck systems',
      'Bridge dice between chords',
      'Every fretboard layout included',
      'ii-V-I theory, Floyd Rose, wiring maps, EMG'
    ]
  }
};
