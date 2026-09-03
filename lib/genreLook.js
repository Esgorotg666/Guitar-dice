export const GENRE_LOOK = {
  rock: {
    label: 'Rock', tag: 'Stage lights',
    accent: '#3b9dff', accent2: '#ff5f5f', ink: '#04121f',
    line: 'Power and open space. Hit the changes like a chorus drop.'
  },
  blues: {
    label: 'Blues', tag: 'Late room',
    accent: '#4d8cff', accent2: '#c9a46a', ink: '#061018',
    line: 'Shuffle feel. Leave air between the phrases.'
  },
  country: {
    label: 'Country', tag: 'Porch light',
    accent: '#e39a3a', accent2: '#7cb07a', ink: '#1a1206',
    line: 'Keep the boom-chuck honest and the fills small.'
  },
  metal: {
    label: 'Metal', tag: 'Pit',
    accent: '#d4d8de', accent2: '#c62828', ink: '#08080a',
    line: 'Tight muted chugs. The space is part of the riff.'
  },
  jazz: {
    label: 'Jazz', tag: 'After hours',
    accent: '#b57cff', accent2: '#e0b15a', ink: '#14081c',
    line: 'Voice-lead. The next chord is already under your fingers.'
  },
  folk: {
    label: 'Folk', tag: 'Wood room',
    accent: '#6faf6a', accent2: '#c4a36a', ink: '#10180e',
    line: 'Let open strings ring. Thumb stays on the root.'
  },
  funk: {
    label: 'Funk', tag: 'Pocket',
    accent: '#ff7ac0', accent2: '#4fd8e8', ink: '#140814',
    line: 'Ghost notes and the one. Mute everything that is not the hit.'
  },
  'neo-classical': {
    label: 'Neo-Classical', tag: 'Hall',
    accent: '#7b8cff', accent2: '#d4b56a', ink: '#0c1020',
    line: 'Even sixteenths. The run has to land on a chord tone.'
  }
};

export function genreLook(id) {
  return GENRE_LOOK[id] || GENRE_LOOK.rock;
}
