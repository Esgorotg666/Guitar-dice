# App data

Keep these files in GitHub:

- `lessons-v2.json` — classroom lessons
- `musicdata.json` — chord shapes and scales

The app loads them from `/data/...`. Next.js serves `public/` at the site root.
`next.config.js` only falls back to Supabase if a file is missing here.
