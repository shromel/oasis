**StatTile** — a single metric for the dashboard's 3-up row: icon + big Fraunces value over a lowercase label. Sits inside a `GlassCard`, divided by hairlines.

```jsx
<StatTile icon={<i data-lucide="flame" />} accent="var(--dusk-rose)" value="7" label="streak" />
<StatTile icon={<i data-lucide="calendar-check" />} accent="var(--oasis-palm)" value="3" label="this week" />
<StatTile icon={<i data-lucide="trending-up" />} accent="var(--gold)" value="+12%" label="momentum" />
```
