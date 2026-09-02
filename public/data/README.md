# public/data

Static classroom and chord data shipped with the app.

- `musicdata.json` — chord dictionary and modes (rolls / diagrams)
- `lessons-v2-a.json` + `lessons-v2-b.json` — the 72 classroom lessons, split so they fit in git
- `lessons-v2.json` — optional single-file copy; if missing, the app concatenates a + b

Next serves these first. Supabase remains a fallback in `next.config.js`.
