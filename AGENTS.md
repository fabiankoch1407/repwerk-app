# Notes for coding agents

- This is a dependency-free installable web app (PWA). Edit files in `src/`, then run `python3 build.py`; commit both `src/` and the generated `index.html` and `sw.js`.
- Hosting: Cloudflare Pages straight from `main`, no build step. Server code lives in `functions/` (Pages Functions); `_routes.json` limits them to `/api/*`.
- AI: the app calls `/api/ai` (see `makeApiSample` in `src/app.js`). Inside Claude (the published prototype artifact) it uses `window.claude` instead; keep both paths working.
- Data is stored in `localStorage` for now. Supabase login and sync come later; keep the state object serialisable.
- UI language is German, with English via `src/i18n.js` (DOM translation). Any new German UI string needs an English entry there, except in `src/smart.js`, which writes both languages inline with `L(de, en)`.
- `src/smart.js` is the smart coach (the USP): day targets for training and rest days (`dayTargets`), the weekly check-in (`checkinCalc`) and load suggestions (`suggestLoad`). Use `dayTargets(k)` or `baseTargets()` instead of `S.targets` in views; `S.targets` is only the formula result before check-in adjustments.
- The Expo version of the app is parked on branch `expo-app`.
