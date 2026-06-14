**CriterionBar** — a labelled "current / goal" progress bar used for level-exit criteria and current-bests. Fill is gold gradient, flipping to solid palm-green once the goal is reached.

```jsx
<CriterionBar label="Max strict pullups" current={6} goal={8} />
<CriterionBar label="Hollow hold" current={45} goal={45} unit="s" />
```
