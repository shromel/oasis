# Oasis App — UI Kit

A high-fidelity, click-through recreation of the **Oasis** iOS PWA, built from the product source (`shromel/oasis`). It composes the design-system primitives — it does **not** re-implement them.

## Run
Open `index.html`. It renders an iPhone frame you can drive:

- **Bottom nav** — Home · Train · Nourish · Progress · You.
- **Home** → *Start* opens the **Session Logger** overlay (steppers, mark-done, save).
- **Train** → switch levels (pills), expand the warm-up, *Start* any block.
- **Progress** → strength curve + current-bests bars + history.
- **Nourish** → the scaffolded nutrition diary (macros, score, scan CTA).
- **You** → profile, stats, data export/import.

## Files
| File | Role |
|---|---|
| `index.html` | App shell + tab/overlay state. Loads the DS bundle, Lucide, and the scripts below. |
| `data.js` | Sample program/log data (`window.OASIS_DATA`) mirroring the product's data shape. |
| `kit.jsx` | `Icon` (Lucide helper), `PhoneFrame`, `StatusBar`, `BottomNav`. |
| `Trajectory.jsx` | The gold-foil `Trajectory` area chart + `StrengthCurve` line chart. |
| `ScreensA.jsx` | `HomeScreen`, `TrainScreen`. |
| `ScreensB.jsx` | `ProgressScreen`, `NourishScreen`, `YouScreen`, `SessionLogger`. |

## Components used (from the DS bundle)
`GlassCard · StatTile · ProgressRing · CriterionBar · LevelPill · Stepper · Button · Chip · IconTile`

## Fidelity notes
- Charts are hand-rolled SVG (the product uses Recharts) — same palette and shape, lighter footprint.
- Nourish is intentionally thin: it is a **scaffold** in the product (v0.2), so the kit shows the previewed surface only.
- Icons are Lucide from CDN, matching `lucide-react` in the app.
