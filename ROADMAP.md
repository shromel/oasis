# Oasis — Roadmap

A crossover of **Hevy (training)** × **Cronometer (nutrition)** with a "golden oasis rising from the barrens" theme. Built as an installable **PWA** (works on iPhone + MacBook), **local-first** (no backend), data in `localStorage` via Zustand `persist`.

## Stack
- Vite + React + TypeScript, Tailwind 3, Zustand (persist), React Router (HashRouter), Recharts, lucide-react.
- PWA via static `public/manifest.webmanifest` + hand-written `public/sw.js` (we dropped `vite-plugin-pwa` — it crashes on Node 18 with a `workbox-build` dynamic-require bug).
- Run: `npm run dev` (port 5173). Build: `npm run build`.
- Node is 18.15 on this machine — keep deps Node-18 compatible.

## Hosting / deploy
- **Live PWA:** https://shromel.github.io/oasis/ — public repo `shromel/oasis`.
- **Auto-deploys on every push to `main`** via `.github/workflows/deploy.yml` (build → GitHub Pages). So shipping changes = `git push`.
- Vite `base: './'` (relative) so it works under the `/oasis/` subpath. Routing is HashRouter (deep links work on Pages). PWA = static `manifest.webmanifest` + `sw.js` + PNG icons from `scripts/gen-icons.cjs` (sharp@0.32, pinned for Node 18).
- CI uses `npm install` (not `npm ci`) to avoid lockfile-strictness failures across npm versions.
- Install on iPhone: open the URL in Safari → Share → Add to Home Screen.

## Theme tokens (tailwind.config.js)
`sand.50–950`, `gold` (+light/deep), `oasis.green/teal/water/palm`, `dusk.rose/violet`. Helpers in index.css: `.glass`, `.glass-soft`, `.heading`, `.gold-text`, `.btn-gold`, `.btn-ghost`, `.chip`. Signature visual: `src/components/OasisScene.tsx` blooms from barren→lush by a `growth` 0–1 prop.

## ✅ Done (v1 — Workout tracking + Levels)
- Full program imported from the user's checklist → `src/data/program.ts` (4 levels, outdoor/home splits, warm-ups, exit criteria, retest battery, muscle map, timeline). **User starts at Level 1.**
- Store `src/store/useStore.ts`: profile, currentLevel, auto-progressed targets, sessions, retests, bodyweight; selectors for streak, weekly count, level-exit progress, current bests. Export/import JSON (the Mac↔phone bridge).
- Pages: **Oasis** (dashboard: scene, streak, level-exit rings), **Train** (level browser + blocks + warm-up), **SessionLogger** (per-set steppers, mark-done, auto-progression on save), **Progress** (current bests, strength curve chart, 4-week retest form, history), **Nourish** (placeholder previewing nutrition), **You** (profile, level control, export/import, reset).
- Auto-progression rule implemented: hit target top across all sets 2 sessions in a row → target +1.

## ✅ Done (v1.1 — Home redesign + theme overhaul, 2026-06-14)
- **Home compressed to one screen**; the scene is now a slim banner (`h-[112px]`), not a giant block. 3-stat row: streak / this week / **momentum**.
- **"Bloom" is now log-based** → `bloomScore(state)` in the store: per-exercise volume trend (earliest→recent sessions) = "momentum", blended 60/40 with journey progress; falls back to journey before there are ≥2 sessions of an exercise. Drives `OasisScene` growth and shows a momentum % on the dashboard. **(supersedes the old "growth = level+exit%+streak")**
- **Theme → bold Brazilian jungle & coast** (kept the dark-gold + lush-green soul): `OasisScene.tsx` rebuilt from **solid filled shapes** (canopy mounds, palms with real fronds, big leaves, foliage bushes, turquoise sea, golden beach, fireflies) — no more thin line-art. Background palette in `index.css` shifted to saturated emerald + turquoise + gold.
- **New bolder app icon + favicon** (`scripts/icon-source.svg` → `gen-icons.cjs`; `public/favicon.svg`). PNG icons now in manifest.
- **Same-day lock + edit**: a block already logged today shows "✓ Done today" + **Edit** (not Start) in `Train.tsx`; `SessionLogger` blocks duplicate same-day logging (lock screen → Edit) and supports editing via `?edit=<sessionId>`, prefilling saved sets. Store gained `updateSession()`, and selectors `dayKey()`, `todaySessionForBlock()`.

## 👉 START HERE NEXT — Nourish (nutrition) kickoff
The next session builds the **Nourish** half. A typed foundation already exists in **`src/lib/nutrition.ts`** (pure functions, no UI yet): `Food`/`FoodLog` types, `fetchOpenFoodFacts(barcode)`, `mifflinStTdee(profile)`, `rdaTargets(profile)`, `nutritionScore(totals, targets)`. First steps:
1. Add nutrition state to the store: `foodLog: FoodLog[]`, `addFood`, `updateFoodEntry`, `removeFood`; selector `dailyTotals(date)`. Keep in localStorage for now; move to Dexie/IndexedDB only when entries get large.
2. Build the **Nourish diary page** (replace the placeholder): meals (breakfast/lunch/dinner/snack), add-food search/manual, daily kcal + macro rings, micro list vs `rdaTargets`, the 0–100 score, and surplus/deficit vs `mifflinStTdee`.
3. **Barcode scan**: `BarcodeDetector` API where available + `@zxing/browser` fallback for iOS Safari; `getUserMedia({video:{facingMode:'environment'}})` → barcode → `fetchOpenFoodFacts` → confirm serving → log. (Camera works in the installed PWA over HTTPS, which we have.)
4. Then fuse nutrition score + training into the unified **Vitality** number that drives bloom (see item 5 below).
- **Open decision still pending:** food DB = Open Food Facts only, or + USDA FoodData Central (needs free key) for better whole-food micros. Scaffold defaults to Open Food Facts.

## 🔜 Next up (priority order)

### 1. Nutrition core (the "Cronometer" half) — biggest chunk
- **Food DB decision still open** (user said "decide later"). Default plan: **Open Food Facts** (`https://world.openfoodfacts.org/api/v2/product/{barcode}.json`) — free, no key, great barcode coverage + many micros. Consider USDA FoodData Central (needs a free key) as a fallback for whole-food micro accuracy.
- Data model: `Food { id, name, brand, barcode, serving{g/ml}, per100g: { kcal, protein, carbs, fat, fiber, ...micros } }`, `FoodLog { date, foodId, grams, meal }`. Move food logs to **IndexedDB (Dexie)** when volume grows — localStorage is fine until then.
- Diary screen: meals (breakfast/lunch/dinner/snack), add food, edit serving, daily totals.

### 2. Barcode scanning
- Use the browser **`BarcodeDetector` API** where available (Chrome/Android, some iOS) with **`@zxing/browser`** as fallback for iOS Safari. `getUserMedia({ video: { facingMode: 'environment' } })`. Scan → barcode → Open Food Facts lookup → confirm serving → log.

### 3. Macros + micros + nutrition score
- Macro rings (protein/carb/fat) + calorie total on a daily "Nourish" dashboard.
- Micro tracking list (vitamins + minerals) vs RDA targets (compute RDA from profile sex/age).
- **0–100 nutrition score**: Cronometer-style completeness — weight by how many micro targets are met, lightly penalize big macro misses. Put the formula in `src/lib/nutritionScore.ts`.

### 4. Calorie balance (surplus/deficit)
- Compute TDEE: **Mifflin-St Jeor** BMR (profile has weight/height/age/sex) × activity factor; goal (cut/maintain/bulk) sets target delta. Profile + goal fields already exist in the store.
- Daily intake − target → surplus/deficit, themed (bulk = greener/lusher, cut = leaner). Bodyweight log already in store — overlay it.

### 5. Unified "Vitality" score + gamification polish
- Fuse nutrition score + training adherence into one daily Vitality number that drives `OasisScene` growth (currently growth is training-only: level + exit% + streak).
- Streak = "water level"; bloom milestones; level-up celebration animation; 4-week retest reminders; weekly review screen.

### 6. Progress graphs expansion
- Add weight trend, calorie-balance trend, nutrition-score trend, per-lift volume. Recharts already wired in Progress.

### 7. Real cross-device sync (optional, if export/import isn't enough)
- Lightweight option: Supabase (free tier) or a tiny key-value store with a sync token. Only if the user wants automatic sync — export/import covers manual today.

### 8. Nice-to-haves
- Rest timer between sets in SessionLogger. PNG app icons (currently SVG-only manifest). Onboarding flow on first launch to collect profile. "Per side" exercises: log each side separately.

## Notes / gotchas
- Preview tooling in this workspace is scoped to the sibling `Options` project's working dir; an `oasis` config was added to `/Users/ahus/Documents/Options/.claude/launch.json` (runs `npm --prefix /Users/ahus/Documents/Oasis run dev`) so the preview server can serve this app on port 5173.
