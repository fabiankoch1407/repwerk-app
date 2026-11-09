# Notes for coding agents

- This is a dependency-free installable web app (PWA). Edit files in `src/`, then run `python3 build.py`; commit both `src/` and the generated `index.html` and `sw.js`.
- Hosting: Cloudflare Pages straight from `main`, no build step. Server code lives in `functions/` (Pages Functions); `_routes.json` limits them to `/api/*`.
- AI: the app calls `/api/ai` (see `makeApiSample` in `src/app.js`). Inside Claude (the published prototype artifact) it uses `window.claude` instead; keep both paths working.
- Data lives in `localStorage` (`S`, key `repwerk-proto-v2`). `src/cloud.js` adds Supabase login (email code) and sync without an SDK: the whole `S` is one JSON row in `public.user_state` (see `supabase/setup.sql`), newest `S.at` wins, `save()` schedules a push. Config comes from `/api/health` (Cloudflare env `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`). Send the publishable key only in the `apikey` header, never as `Authorization: Bearer`. Keep `S` serialisable.
- UI language is German, with English via `src/i18n.js` (DOM translation). Any new German UI string needs an English entry there, except in `src/smart.js`, `src/cloud.js` and `src/barcode.js`, which write both languages inline with `L(de, en)`.
- `src/smart.js` is the smart coach (the USP): day targets for training and rest days (`dayTargets`), the weekly check-in (`checkinCalc`) and load suggestions (`suggestLoad`). Use `dayTargets(k)` or `baseTargets()` instead of `S.targets` in views; `S.targets` is only the formula result before check-in adjustments.
- `src/barcode.js`: barcode scanning (native `BarcodeDetector` → ZXing WASM ponyfill from jsDelivr → own EAN-13/EAN-8 decoder `decodeImageData`, which works offline) and Open Food Facts via `/api/food` (`functions/api/food.js`, custom User-Agent and edge cache) with a direct fallback. Scanned and self-made foods live in `S.myFoods` and show up first in the food search.
- The Expo version of the app is parked on branch `expo-app`.
