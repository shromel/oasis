**ProgressRing** — the gold→green achievement ring. SVG donut with a round cap that fills over 0.7s; centred label + uppercase sublabel.

```jsx
<ProgressRing value={68} label="68%" sublabel="exit" size={84} />
```

- `value` 0–100 · `size` / `stroke` px · `label` (centre) · `sublabel` (caption).
- The gradient runs gold-light → gold → palm-green, so reaching 100% reads as "blooming".
