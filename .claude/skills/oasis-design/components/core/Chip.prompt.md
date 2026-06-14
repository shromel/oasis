**Chip** — small pill for metadata, tags and inline status.

```jsx
<Chip>3×8–12</Chip>
<Chip active>L1 · Outdoor</Chip>
<Chip tone="success" icon={<i data-lucide="check" />}>Done today</Chip>
```

- `tone`: `neutral` (default) · `gold` · `success` · `info` · `danger`
- `active`: forces the gold-wash selected state.
- `icon`: optional leading Lucide node.
