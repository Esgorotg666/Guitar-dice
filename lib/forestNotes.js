export const DAD_LINE = 'Your dad is always thinking about you.';

export const FOREST_QUOTES = [
  'Play one clean note today. Ugly plus time becomes music.',
  'The guitar does not care how you felt yesterday. It only hears this minute.',
  'Slow is how fast players got fast.',
  'Four beats of Em is a win. Stack wins.',
  'Your hands learn while you rest. Put it down when it hurts.',
  'Tune first. Everything after that is easier.',
  'Miss a chord, land on 1 of the next bar, keep going.',
  'You do not need a whole song. You need the next change.',
  'Fingertips get tough. That is the work showing up.',
  'One 8-minute session beats a week of almost.',
  'Hear it slow. Then hear it again. Speed is a side effect.',
  'The dice are just a dare. You decide how it sounds.',
  'Barre chords yield to short holds, not a death grip.',
  'Name the string out loud. The neck gets smaller.',
  'You already started. That is the hard part.'
];

export function quoteForDay(now) {
  const d = now || new Date();
  const start = new Date(d.getFullYear(), 0, 0);
  const day = Math.floor((d - start) / 86400000);
  return FOREST_QUOTES[day % FOREST_QUOTES.length];
}
