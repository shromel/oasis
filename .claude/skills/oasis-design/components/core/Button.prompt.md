**Button** — the action primitive; gold foil CTA, ghost secondary, or bare text link. Use one gold button per view as the primary action.

```jsx
<Button variant="gold" icon={<i data-lucide="play" />}>Start</Button>
<Button variant="ghost" icon={<i data-lucide="pencil" />}>Edit</Button>
<Button variant="text" iconRight={<i data-lucide="chevron-right" />}>details</Button>
```

- `variant`: `gold` (default) · `ghost` · `text`
- `size`: `sm` · `md` (default) · `lg`
- `icon` / `iconRight`: ReactNode (typically a Lucide icon)
- `fullWidth`, `disabled` — gold buttons get a warm glow shadow; all presses shrink to 0.97.
