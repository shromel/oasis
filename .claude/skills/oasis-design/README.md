# Oasis — Design System

> *"A golden oasis rising from the barrens."*

**Oasis** is a premium strength‑training & nutrition app — a crossover of **Hevy (training)** × **Cronometer (nutrition)** wrapped in a serene, earthy aesthetic. It tracks calisthenics & strength progression, levels, sessions, macros, calories and micronutrients, with a roadmap toward peptides, blood pressure and heart‑rate tracking. It is an installable, **local‑first PWA** built for iPhone + Mac, dark‑mode‑optimised and iOS‑native in feel.

The mood is **premium luxury wellness** (the tone of Peloton / Apple Fitness+) with an **earthy, natural soul**: dark rich backgrounds, warm sand and terracotta, gold foil, sage and palm greens, turquoise coastal water, and a faint sand grain over everything. Sophisticated minimalism that still feels *warm, organic and alive* — never sterile or cold.

---

## Sources

This system was reverse‑engineered from the product's own codebase. If you have access, explore these to build with higher fidelity:

- **GitHub — `shromel/oasis`** · https://github.com/shromel/oasis (branch `main`)
  - Live PWA: https://shromel.github.io/oasis/
  - Key files studied: `tailwind.config.js` (palette, shadows, keyframes), `src/index.css` (atmosphere, helper classes), `src/pages/{Home,Train,Progress,You,Nourish,SessionLogger}.tsx`, `src/components/{BottomNav,ProgressRing,LevelTrajectory}.tsx`, `ROADMAP.md`.
  - Stack: Vite + React + TypeScript, Tailwind 3, Zustand (persist), React Router (HashRouter), Recharts, **lucide-react** icons.

Nothing here requires the repo to be present — assets and tokens are copied in — but the repo is the source of truth for product behaviour and future surfaces (the Nourish/nutrition half is scaffolded but not yet built).

---

## Products & surfaces

There is **one product**: the Oasis mobile PWA. Its surfaces:

| Surface | What it is |
|---|---|
| **Home** | Dashboard. Hero = a gold‑foil *Level Trajectory* area chart toward the next level; a 3‑stat row (streak / this week / momentum); "Path to next level" ring + criterion bars; a Start‑a‑session CTA. |
| **Train** | Per‑level browser (pills L1–L4). Each level splits into 🏖️ **Outdoor** (bar) and 🏠 **Home** (floor) blocks — the user's real split — with a collapsible warm‑up, per‑exercise schemes and "Start". |
| **Session Logger** | Per‑set steppers, mark‑done toggles, session notes, auto‑progression on save; same‑day lock + edit. |
| **Progress** | Current bests vs the level's exit targets, a multi‑series strength curve (Recharts), a 4‑week retest form, session history. |
| **Nourish** | *(scaffold)* Nutrition diary — barcode scanning, macro/micro rings, a 0–100 nutrition score, calorie balance. Previewed, not yet built. |
| **You** | Profile, weight/height/age/sex, goal (cut/maintain/bulk), level control, data export/import, reset. |

Global chrome: a fixed, floating glass **bottom nav** (Home · Train · Nourish · Progress · You) constrained to a ~448px mobile column.

---

## Content fundamentals

How Oasis writes. The voice is **calm, confident, quietly poetic** — a premium coach who respects you and never shouts.

- **Person & address.** Second person, warm and direct: *"Your program, imported and ready." · "Watch the numbers climb." · "Your stats, your level, your data."* The app refers to itself as "the oasis" sparingly and never with ego.
- **Levels are L1–L4.** Refer to them numerically — *"L1", "Path to L2", "Current bests vs L2"* — never with code-names. (Optional plain descriptors like "Foundation / Strength Base / Muscle-Up Prep / Athletic Peak" may appear as a quiet subtitle, but the level itself is always "L"+number.)
- **Casing.** Sentence case almost everywhere. **Headings** stay sentence-case (*"Path to L2"*, *"Current bests"*, *"4-week retest"*). Tiny **eyebrows** are UPPERCASE with wide tracking (*"LOGGING · L1"*, *"TRAJECTORY · L2"*). Stat labels are lowercase (*streak, this week, sessions*).
- **Length.** Terse. One short line does the work of a paragraph. Microcopy is a few words: *"Done today", "Session saved", "Logged to your progress", "Already logged today".*
- **Tone of encouragement.** Grounded, not hype. "made for the long climb", "the long climb", "Fuel the bloom". Nature‑metaphor where it earns its place (bloom, climb, oasis) — used like seasoning, never a theme park. The team explicitly **de‑cringed** earlier copy: prefer *"Session saved"* over cheerleading.
- **Numbers are the hero.** Big Fraunces numerals carry meaning; words around them stay quiet and small. Progress is framed as *current / goal* (e.g. "6 / 8") so the gap is always legible.
- **No emoji in chrome or marketing voice.** Emoji appear **only** as small functional glyphs labelling program blocks & warm‑ups in data (🦵 legs, 💪 push, etc.), inherited from the user's imported program — treat them as data, not decoration. Don't add new emoji to UI copy.
- **Punctuation.** Mid‑dots `·` separate metadata (*"L1 · Outdoor" · "Jun 12 · 18 sets · 64 reps"*). Em‑dashes for asides. Arrows `↑` to show a bumped target.

**Specimen lines:** *"Good morning, Sam" · "Trajectory · Level 2 — from your training logs" · "Advance when you hit the exit criteria." · "Everything lives on this device." · "Oasis v0.1 · made for the long climb".*

---

## Visual foundations

The whole system is **dark, warm and layered**. Glass cards float above a living landscape; gold is the one bright thing and it is spent carefully.

- **Background / atmosphere.** Never a flat fill. A fixed, full‑bleed gradient stack paints a *golden sun above, emerald jungle glowing at the left & right, turquoise coast pooling at the bottom*, plus a dark vignette for depth — then a **faint SVG sand grain at ~4% opacity** over everything. Use `.oasis-atmosphere` on a full‑height root, or `var(--grad-atmosphere)`. This is the single most identifying trait of the brand.
- **Colour vibe.** Warm and earthy. Neutrals are the **sand** scale (tan → near‑black brown), *not* grey. The accent is **gold** (`#e7b24c`) used as foil gradients. Living accents are sage/palm **green** (success, growth), **turquoise** water (info), and **terracotta dusk‑rose** (`#d98a6a`) for flame/streak/danger. Imagery skews warm, golden‑hour, slightly grainy — never cool, clinical or pure‑white.
- **Type.** Display is **Fraunces** (optical serif) — elegant, serious, set tight with negative tracking; used for headings and big stat numerals. Text/UI is **Inter**, quiet and legible. Gold headline numbers use the `--grad-gold-text` clip. Eyebrows are 10px Inter, uppercase, wide‑tracked, muted.
- **Cards = "glass".** Frosted panels: ~40%‑opacity sand‑900 fill, `backdrop-blur`, a 1px warm hairline border (`rgba(116,80,43,.4)`), generous radius and a soft drop shadow. Two grades: `.glass` (radius 28px, blur‑xl) for primary cards & the nav; `.glass-soft` (radius 24px, blur‑md) for nested tiles. No hard‑edged solid cards.
- **Corner radii.** Everything is rounded and soft. Buttons 20px, inputs/steppers 12px, icon tiles 16px, primary cards 28px, chips & rings fully pill. Nothing sharp.
- **Borders & hairlines.** Warm, low‑contrast: sand‑600 at 25–55% alpha. Dividers inside cards are even fainter (`--border-soft`). Gold borders (`--border-gold`) only mark a selected/active control.
- **Shadows.** Two systems: a **depth** shadow under glass cards (`--shadow-card`, long & soft, near‑black) and a **glow** (`--shadow-glow` / `--shadow-gold`, warm gold halo) reserved for active nav icons, the trajectory endpoint, gold buttons and success moments.
- **Transparency & blur.** Used constantly and deliberately — it's what makes the cards feel like glass over a landscape. Text/borders are expressed as alpha over the warm base so the atmosphere shows through. Always pair `backdrop-filter: blur()` with a translucent fill, never blur with an opaque one.
- **Gradients.** Gold foil is the signature: a 3‑stop `gold-light → gold → gold-deep` for buttons & text, and a `gold → green` ring for progress (achievement blooming into growth). The atmosphere is radial gradients. **Avoid** any blue/purple gradient — off‑brand.
- **Selected / active states.** A control turns gold: tinted gold wash (`rgba(231,178,76,.15)`), a gold border, gold text. Active nav icon gets a gold tile + glow. The *current* level pill carries a tiny palm‑green dot.
- **Hover / press.** This is a touch‑first app — **press** is the primary feedback: `transform: scale(0.97)` on `:active` (cards use `0.99`). On pointer devices, hover lightens text/opacity subtly; destructive controls warm toward dusk‑rose on hover. No dramatic colour inversions.
- **Motion.** Calm and brief. Entrances **float up** (8px + fade, `floatUp 0.4s ease‑out`). Progress bars & rings fill over `0.7s` with `cubic-bezier(0.4,0,0.2,1)`. Ambient flourishes — a slow `glowPulse` on the trajectory endpoint, gentle `shimmer`/`drift`/`sway` — are subtle and infinite only on decorative elements, never on content the user reads. Respect `prefers-reduced-motion`.
- **Layout.** A single centred **mobile column**, max‑width ~448px, vertical rhythm of 12px between cards and 16–20px padding inside. The bottom nav is `fixed` and floating; content reserves safe‑area padding top & bottom. Generous negative space; one idea per card.
- **Data viz.** Charts adopt the palette: gold‑foil area fills with a green→gold line for the *Level Trajectory*; multi‑series strength curves in gold / palm / water; gold→green progress **rings** (SVG, round caps) and thin progress **bars** that flip from gold gradient to solid palm‑green when a goal is met.

---

## Iconography

- **System: `lucide-react`** (the product's only icon set) — clean, rounded‑join **stroke** icons, default ~`2.0` stroke weight, bumped to `~2.4` when active. Sizes are small and consistent: 14–20px inline, 20px in the nav, ~30px in empty‑state medallions.
- **In this design system** Lucide is loaded **from CDN** (`unpkg lucide@latest`) wherever icons appear, matching the exact set the app uses. Reference icons by their Lucide name. Common ones in‑product: `home`, `dumbbell`, `apple`, `trending-up`, `user` (nav); `flame`, `calendar-check`, `chevron-right/up/down`, `play`, `check`, `pencil`, `lock`, `timer`, `plus`, `minus`, `download`, `upload`, `rotate-ccw`, `clipboard-check`, `trash-2`, `scan-barcode`.
- **Colour.** Icons inherit text colour; accent icons are tinted — gold for primary/active, palm‑green for success/done, dusk‑rose for flame/streak & destructive, water‑blue & gold for stats.
- **No icon font, no PNG icon sprite.** Icons are inline SVG (via Lucide). The only raster brand art is the app icon.
- **Emoji** are *not* part of the icon system — they appear only as inherited data glyphs on program blocks/warm‑ups (see Content Fundamentals). Don't introduce emoji as UI icons.
- **Unicode** glyphs used sparingly as micro‑marks: `·` (metadata separator), `↑` (target bumped), `●` (current‑level dot).

### Brand assets (`assets/`)
- `logo-mark.png` / `app-icon.png` (716px) — the Oasis app icon: a golden cavern‑oasis scene (waterfall, palms, ferns, a gold parrot, still pool) inside a gold rounded‑square border. Use on dark backgrounds; CSS‑round the corners for avatars.
- `app-icon-192.png`, `apple-touch-icon.png` — downscaled installable PWA icons. Use for app‑store / home‑screen contexts.

---

## Index / manifest

**Root**
- `styles.css` — the single entry point consumers link. `@import`s only.
- `README.md` — this guide.
- `SKILL.md` — Agent‑Skills front‑matter for use in Claude Code.

**`tokens/`** — `fonts.css` · `colors.css` · `typography.css` · `spacing.css` · `base.css` (atmosphere + helper classes `.glass`, `.heading`, `.gold-text`, `.btn-gold`, `.btn-ghost`, `.chip`, `.input`).

**`assets/`** — `logo-mark.png`, `app-icon*.png`, `apple-touch-icon.png`.

**`guidelines/`** — foundation specimen cards (Type, Colors, Spacing, Brand) shown in the Design System tab.

**`components/`** — reusable React primitives (see the Components group in the Design System tab): Button, Chip/Badge, GlassCard, ProgressRing, StatTile, LevelPill, CriterionBar, Stepper, IconTile.

**`ui_kits/oasis-app/`** — high‑fidelity, click‑through recreation of the mobile app (`index.html` + screen JSX).

> **Font note:** Fraunces & Inter are loaded from the Google Fonts CDN (matching the product). If you need a fully offline/bundled build, drop the `.woff2` files into `tokens/` and add local `@font-face` rules — flagged for the user.
