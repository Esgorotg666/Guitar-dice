# Guitar Dice

Web app: dice-based guitar practice (chords, scales, classroom lessons).

Live: https://guitar-dice.vercel.app

## Repo layout

- `pages/` — Next.js pages (`index.js` is the app)
- `components/` — UI (LessonPlayer, Tuner, Metronome, etc.)
- `lib/` — theory, audio, lesson sorting, style/genre logic
- `styles/` — global CSS
- `public/data/` — source of truth for lessons and chord data
  - `lessons-v2.json`
  - `musicdata.json`

API, billing, and auth still proxy to Supabase functions via `next.config.js`.
Files in `public/data/` override the old Supabase storage copies.
