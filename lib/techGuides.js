export const TECH_GUIDES = [
  {
    id: 'tech-safety',
    title: 'Shop rules before you touch screws',
    level: 'entry',
    unit: 'Safety',
    summary: 'Unplug, support the neck, turn one screw a little, then listen. Most ruined necks started as "just a quick tweak."',
    steps: [
      'Unplug the cable. Take the battery out of an active guitar before you open the control cavity.',
      'Work on a towel so the finish and the screws have somewhere to land.',
      'One quarter-turn at a time on a truss rod. Then tune to pitch and wait a minute. Wood moves slow.',
      'If a rod is stuck, stop. That is a tech bench, not a phone-tutorial job.',
      'Intonation and action only mean something at the pitch you actually play. Tune first, measure second.'
    ],
    watchFor: 'Do not force a Floyd post, a rusted claw screw, or a truss rod that does not move.'
  },
  {
    id: 'tech-strings-tune',
    title: 'Strings, stretch, and staying in tune',
    level: 'entry',
    unit: 'Setup',
    summary: 'New strings go sharp for a day if you do not stretch them. Locking tuners and a wound string that is wrapped clean beat any gadget.',
    steps: [
      'Feed the string through the tail, pull slack, then wind down the post so wraps go downward and do not overlap.',
      'At pitch, tug each string an inch off the board in the middle, retune, repeat until it stops dropping.',
      'Cut the excess. A long tag slaps the headstock and sounds like a rattle later.',
      'If you use a locking nut, lock only after the guitar is at pitch and stretched. Fine tuners should sit in the middle of their travel.',
      'Check the Tuner tab. If the 12th-fret harmonic and the fretted 12th disagree, that is intonation, not a bad string.'
    ],
    watchFor: 'A string that keeps slipping usually has a wrap that is climbing the post, not a cursed tuner.'
  },
  {
    id: 'tech-relief-action',
    title: 'Relief, action, and when to stop',
    level: 'intermediate',
    unit: 'Setup',
    summary: 'Relief is the tiny up-bow in the neck. Action is string height. They are related. They are not the same screw.',
    steps: [
      'Capo first fret. Press the low E at the last fret. The gap over fret 7-8 should be about a business card, not a pencil.',
      'Too much gap: tighten the truss rod a quarter turn (usually clockwise as you face the headstock — confirm your guitar). Too flat and buzzing: loosen a quarter turn.',
      'Action at the 12th fret is a separate measurement at the bridge saddles. Low E often sits a little higher than high E.',
      'If the first fret buzzes after the neck looks right, the nut slots may be low. That is a nut file job, not more rod.',
      'Write the measurements. Next string change you will know what "your guitar" was.'
    ],
    watchFor: 'A rod that clicks or refuses to move is done. Stop before you snap it.'
  },
  {
    id: 'tech-intonation',
    title: 'Set intonation at pitch',
    level: 'intermediate',
    unit: 'Setup',
    summary: 'Compare the 12th-fret harmonic to the fretted 12th. Sharp fretted note means the saddle needs to move back. Flat means forward.',
    steps: [
      'Tune the open string dead on at your reference (440 unless you set 432 in Settings).',
      'Play the 12th-fret harmonic, then fret 12. Same letter, should be the same pitch.',
      'Fretted note sharp: lengthen the string — move the saddle toward the tail. Flat: shorten — move toward the neck.',
      'Retune after every saddle move. One string at a time. Heavy strings need more travel than plains.',
      'On a Floyd, unlock, set the saddle screw, lock, put it back at pitch with the fine tuners, then check again.'
    ],
    watchFor: 'Measuring a floppy detuned string is theater. Pitch first.'
  },
  {
    id: 'tech-pickup-height',
    title: 'Pickup height without killing the tone',
    level: 'intermediate',
    unit: 'Pickups',
    summary: 'Closer is louder until the magnets pull the strings out of tune. Start conservative, then raise the quiet pickup.',
    steps: [
      'Fret the last fret. Measure from the bottom of the string to the top of the pole. A common starting window is about 2mm on the bass side and 1.5mm on the treble side for a humbucker — use your ear more than the ruler.',
      'Strum open chords. If notes warble or go sharp as they decay, the pickup is too close. Lower it.',
      'Balance neck and bridge so a toggle flip is a color change, not a volume jump.',
      'Single coils often sit a little closer than humbuckers. EMG actives can sit a bit farther because they do not need magnetic scream for output.',
      'Tighten the height screws evenly so the pickup does not tilt into the strings.'
    ],
    watchFor: 'A Strat middle pickup that eats the G string is almost always too high, not a "bad G."'
  },
  {
    id: 'tech-floyd',
    title: 'Floyd Rose setup that stays at pitch',
    level: 'advanced',
    unit: 'Tremolo',
    summary: 'A floating Floyd is a tug of war: string pull vs claw springs. Tune, lock, then use fine tuners. Chase one problem at a time.',
    steps: [
      'Put the fine tuners in the middle of their travel before you start. You need room later.',
      'Unlock the nut. Stretch the new strings. Get the guitar close to pitch with the tuners at the headstock.',
      'Look at the base plate from the side. It should sit flush with the body on a floating setup, not dive or kick up. If it dives, add spring tension at the claw or go up a half-turn on the claw screws. If it kicks up, ease the claw.',
      'When the plate is level at pitch, lock the nut. From here, only fine tuners.',
      'Intonate one string: unlock nut, tweak that saddle, lock, return to pitch, check 12th fret again.',
      'If one string fights you, check that the nut clamp is actually tight on that pair and that the string sits in the saddle block, not on the edge of it.',
      'Block the trem (a fitted block of wood in the cavity) if you want a hardtail feel while you set action and intonation, then pull the block and rebalance springs.'
    ],
    watchFor: 'Do not file Floyd posts or overtighten a rusty claw. If the knife edges are chipped, that is a parts order, not more spring tension.'
  },
  {
    id: 'tech-wiring-map',
    title: 'How the switch and pots actually talk',
    level: 'advanced',
    unit: 'Wiring',
    summary: 'Pickups make signal. The switch chooses which pickup. Volume pots bleed signal to ground. Tone pots bleed highs to ground through a cap.',
    steps: [
      'Unplug. Remove the control plate or pickguard. Take a photo before you unsolder anything.',
      'Hot from the pickup goes to the switch lug for that position. The switch output goes to the volume pot input (usually the right lug as you face the back of a typical audio pot).',
      'Volume pot middle lug (wiper) goes to the output jack tip. The leftover lug and the pot body go to ground.',
      'Tone pot: wiper to a capacitor, other side of the cap to ground. The remaining lug ties to the volume hot so you are bleeding treble, not muting the whole guitar.',
      'Common cap values: 0.022uF on humbuckers, 0.047uF on single coils. Bigger cap = darker when the tone is rolled off.',
      'Ground every pot case, the claw or bridge, and the jack sleeve to one ground point. A loop of extra grounds is how you get hum.'
    ],
    watchFor: 'Hot and ground swapped at the jack is a dead guitar. Check continuity from sleeve to bridge before you close it up.'
  },
  {
    id: 'tech-toggle-layouts',
    title: 'Toggle and blade layouts you will actually meet',
    level: 'advanced',
    unit: 'Wiring',
    summary: 'The hardware changes. The jobs do not: pick a pickup, set volume, set tone.',
    steps: [
      'Les Paul 3-way toggle: up = neck, middle = both, down = bridge. Two volumes, two tones. Each pickup has its own pair. The toggle output goes to the jack.',
      'Tele 3-way blade: usually neck / both / bridge. One volume, one tone. Simple and loud.',
      'Strat 5-way: 1 bridge, 2 bridge+middle, 3 middle, 4 middle+neck, 5 neck. The extra positions are just two pickups on at once.',
      'Coil split on a humbucker is a switch that grounds one coil so the remaining coil runs as a single. That is not the same as a coil tap, which is a shorter wind on the same coil.',
      'A push-pull pot is just a switch hiding under a knob. Treat the lugs like any other mini switch: document them before you heat the iron.'
    ],
    watchFor: '"Both pickups" with one volume at zero will mute the pair on many Les Paul-style wired-in-series volumes. That is the wiring, not a broken switch.'
  },
  {
    id: 'tech-emg',
    title: 'EMG active setup without frying the pack',
    level: 'advanced',
    unit: 'Wiring',
    summary: 'EMG 81/85 style pickups want 9V, their own solderless headers, and a stereo jack that switches the battery when you plug in. Do not treat them like a passive PAF.',
    steps: [
      'Battery first: snap the clip off before you rearrange headers. A shorted 9V across a shield will cook a preamp.',
      'Use the solderless interconnect that ships with the set. Red is usually +9V, black ground, white or colored leads are signal — follow the card in the box, not a random forum color.',
      'The output jack is stereo on purpose. The ring contact completes the battery negative when a mono guitar cable is inserted. A mono jack left in there means the battery drains in the case.',
      'Do not mix a passive humbucker onto the same volume pot as an EMG without a proper buffer or EMG conversion kit. The impedances fight and one pickup will sound thin or loud.',
      '81 is the tight bridge. 85 is the fatter neck. Height: start farther from the strings than you would with a passive, then sneak up until the amp is loud without magnetic pull.',
      'If the guitar is dead with a fresh battery, check the stereo jack switch and that every header is fully seated. Most "dead EMG" jobs are a half-clicked connector.'
    ],
    watchFor: 'Reverse the 9V and you can kill the preamp. Clip off, look at the snap, then reconnect.'
  }
];
