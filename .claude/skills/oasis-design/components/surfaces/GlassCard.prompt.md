**GlassCard** — the frosted panel that is the core surface of Oasis. Default grade for primary cards; `soft` for nested tiles.

```jsx
<GlassCard>
  <span className="eyebrow">Today</span>
  <h2 className="heading">Start a session</h2>
</GlassCard>

<GlassCard soft padding="0.75rem">…</GlassCard>
<GlassCard interactive>…</GlassCard>
```

- `soft`: lighter nested grade · `interactive`: press-shrink · `as`: tag (default `section`) · `padding`.
