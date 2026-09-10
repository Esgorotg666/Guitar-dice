function n(string, fret, beats, pick, tech, group, label) {
  var o = { string: string, fret: fret, beats: beats == null ? 0.5 : beats, pick: pick || 'D', group: group, role: 'line' };
  if (tech && tech.length) o.tech = tech;
  if (label) o.groupLabel = label;
  return o;
}

function scaleRun(startFret, stringFrom, stringTo, group, label) {
  var out = [];
  var first = true;
  for (var s = stringFrom; s <= stringTo; s++) {
    var frets = [startFret, startFret + 2, startFret + 3];
    if (s === 2 || s === 3) frets = [startFret, startFret + 2, startFret + 4];
    frets.forEach(function (f, i) {
      out.push(n(s, f, 0.5, (out.length % 2 === 0) ? 'D' : 'U', i === 1 ? ['H'] : null, group, first ? label : null));
      first = false;
    });
  }
  for (var s2 = stringTo; s2 >= stringFrom; s2--) {
    var frets2 = [startFret + 3, startFret + 2, startFret];
    if (s2 === 2 || s2 === 3) frets2 = [startFret + 4, startFret + 2, startFret];
    frets2.forEach(function (f) {
      out.push(n(s2, f, 0.5, (out.length % 2 === 0) ? 'D' : 'U', ['P'], group, null));
    });
  }
  return out;
}

function arpCycle(group, label, shapes) {
  var out = [];
  shapes.forEach(function (sh, si) {
    var g = group + si;
    sh.dots.forEach(function (d, i) {
      out.push(n(d[0], d[1], 0.5, i % 2 === 0 ? 'D' : 'U', null, g, i === 0 ? (si === 0 ? label : sh.name) : null));
    });
  });
  return out;
}

function gallopLine(group, label, string, frets) {
  var out = [];
  frets.forEach(function (f, fi) {
    out.push(n(string, f, 0.5, 'D', ['PM'], group + fi, fi === 0 ? label : null));
    out.push(n(string, f, 0.25, 'D', ['PM'], group + fi));
    out.push(n(string, f, 0.25, 'D', ['PM'], group + fi));
    out.push(n(string, f, 0.5, 'D', ['PM'], group + fi));
    out.push(n(string, f, 0.25, 'D', ['PM'], group + fi));
    out.push(n(string, f, 0.25, 'D', null, group + fi));
  });
  return out;
}

function chromBox(group, label, base) {
  var out = [];
  for (var s = 0; s < 6; s++) {
    [0, 1, 2, 3].forEach(function (add, i) {
      out.push(n(s, base + add, 0.5, i % 2 === 0 ? 'D' : 'U', null, group, s === 0 && i === 0 ? label : null));
    });
  }
  for (var s2 = 5; s2 >= 0; s2--) {
    [3, 2, 1, 0].forEach(function (add) {
      out.push(n(s2, base + add, 0.5, (out.length % 2 === 0) ? 'D' : 'U', null, group + 1));
    });
  }
  return out;
}

var KEYS = ['C', 'G', 'D', 'A', 'E', 'Am', 'Em', 'Dm'];
var FOLDERS = ['fingering', 'chords', 'rhythm', 'lead', 'arpeggio', 'legato', 'progressions', 'solo', 'rh', 'bridging'];

var SHAPES = {
  C: { name: 'C', dots: [[1,3],[2,2],[3,0],[4,1],[5,0]] },
  G: { name: 'G', dots: [[0,3],[1,2],[2,0],[3,0],[4,0],[5,3]] },
  D: { name: 'D', dots: [[2,0],[3,2],[4,3],[5,2]] },
  A: { name: 'A', dots: [[1,0],[2,2],[3,2],[4,2],[5,0]] },
  E: { name: 'E', dots: [[0,0],[1,2],[2,2],[3,1],[4,0],[5,0]] },
  Am: { name: 'Am', dots: [[1,0],[2,2],[3,2],[4,1],[5,0]] },
  Em: { name: 'Em', dots: [[0,0],[1,2],[2,2],[3,0],[4,0],[5,0]] },
  Dm: { name: 'Dm', dots: [[2,0],[3,2],[4,3],[5,1]] }
};

function packFor(level, style, count) {
  var bpm = level === 'entry' ? 72 : level === 'intermediate' ? 84 : level === 'advanced' ? 96 : 108;
  var startFret = level === 'entry' ? 0 : level === 'intermediate' ? 3 : level === 'advanced' ? 5 : 7;
  var out = [];
  for (var i = 0; i < count; i++) {
    var folder = FOLDERS[i % FOLDERS.length];
    var key = KEYS[i % KEYS.length];
    var id = 'bank-' + style.slice(0, 3) + '-' + level.slice(0, 3) + '-' + (i + 1);
    var title, notes, summary, steps, chords;
    var kind = i % 4;
    if (kind === 0) {
      title = key + ' scale run — ' + level + ' #' + (i + 1);
      notes = scaleRun(startFret, 0, 5, 0, 'Up').concat(scaleRun(startFret + 2, 0, 3, 1, 'Shift'));
      summary = 'Full six-string run in ' + key + ', then the same cell two frets higher. Hammers up, pull-offs down.';
      steps = ['Alternate pick. Hammer the middle note of each three-note cell.', 'Shift two frets and repeat on the low four strings.', 'End on the root. Do not stop mid-string.'];
      folder = 'lead';
    } else if (kind === 1) {
      var names = key.indexOf('m') >= 0 ? ['Am', 'Dm', 'E', 'Am'] : ['G', 'C', 'D', 'G'];
      if (i % 8 > 3) names = ['A', 'E', 'D', 'A'];
      chords = names.slice();
      title = names.join('–') + ' arpeggio song #' + (i + 1);
      notes = arpCycle(0, names[0], names.map(function (nm) { return SHAPES[nm]; }));
      notes = notes.concat(arpCycle(4, names[0] + ' again', names.map(function (nm) { return SHAPES[nm]; })));
      summary = 'Eight bars of broken chords. Thumb or pick takes the first note of each shape. This is a piece, not one grip.';
      steps = ['Name the chord on beat 1.', 'Keep even eighths through the change.', 'Repeat the four-bar form once.'];
      folder = style === 'lead' ? 'solo' : 'arpeggio';
    } else if (kind === 2) {
      var roots = [0, 3, 5, 7, 8, 5, 3, 0];
      if (level === 'entry') roots = [0, 0, 3, 3, 5, 5, 3, 0];
      title = 'Palm-mute workshop ' + key + ' #' + (i + 1);
      notes = gallopLine(0, 'Gallop', 0, roots);
      summary = 'Long-short-short gallop on the low E, moving through ' + roots.join('-') + '. Mute stays on except the last 16th of each cell.';
      steps = ['Palm on the bridge.', 'Do not turn the gallop into three even 8ths.', 'Change fret on beat 1.'];
      folder = 'rhythm';
      chords = ['E5', 'G5', 'A5'];
    } else {
      title = 'Chromatic box at fret ' + startFret + ' #' + (i + 1);
      notes = chromBox(0, 'Up then down', startFret);
      summary = 'One finger per fret across all six strings, then back down. This is independence, not a lick.';
      steps = ['Plant 1-2-3-4 and leave them.', 'Alternate pick.', 'Do not roll one finger to a new fret inside the box.'];
      folder = 'fingering';
    }
    out.push({
      id: id,
      title: title,
      level: level,
      style: style,
      genre: style === 'rhythm' ? 'metal' : (style === 'acoustic' ? 'folk' : 'rock'),
      folder: folder,
      track: 'study',
      key: key,
      bpm: bpm,
      chords: chords,
      summary: summary,
      watchFor: 'If a note dies, drop 10 BPM before you add speed.',
      goals: ['Play the whole form without stopping.', 'Keep time with a click.', 'Hear the last note as a landing, not a fade.'],
      steps: steps,
      notes: notes
    });
  }
  return out;
}

export const BANK_LESSONS = []
  .concat(packFor('entry', 'lead', 50))
  .concat(packFor('entry', 'rhythm', 50))
  .concat(packFor('entry', 'acoustic', 50))
  .concat(packFor('intermediate', 'lead', 50))
  .concat(packFor('intermediate', 'rhythm', 50))
  .concat(packFor('intermediate', 'acoustic', 50))
  .concat(packFor('advanced', 'lead', 50))
  .concat(packFor('advanced', 'rhythm', 50))
  .concat(packFor('advanced', 'acoustic', 50))
  .concat(packFor('master', 'lead', 50))
  .concat(packFor('master', 'rhythm', 50))
  .concat(packFor('master', 'acoustic', 50));
