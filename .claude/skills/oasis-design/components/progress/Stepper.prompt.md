**Stepper** — the per-set rep/second counter from the Session Logger. Sunken tile with "SET n", a −/value/+ row (minus muted, plus gold) and a unit caption.

```jsx
<Stepper index={1} value={8} onChange={v => …} />
<Stepper index={2} value={30} unit="s" onChange={v => …} />
```

- Reps step by 1; seconds (`unit="s"`) step by 5.
