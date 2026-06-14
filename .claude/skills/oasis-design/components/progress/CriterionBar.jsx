import React from 'react';

/**
 * CriterionBar — a labelled "current / goal" progress bar. The fill is
 * gold gradient until the goal is met, then flips to solid palm-green.
 */
export function CriterionBar({ label, current, goal, unit = '', style }) {
  const pct = Math.min(100, Math.round((current / goal) * 100));
  const done = current >= goal;
  return (
    <div style={style}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', marginBottom: '0.25rem' }}>
        <span style={{ color: 'rgba(236,220,192,0.8)' }}>{label}</span>
        <span style={{ color: done ? 'var(--oasis-palm)' : 'var(--text-secondary)', fontWeight: done ? 'var(--weight-semibold)' : 'var(--weight-regular)' }}>
          {current}{unit} / {goal}{unit}
        </span>
      </div>
      <div style={{ height: '0.375rem', borderRadius: 'var(--radius-pill)', background: 'var(--surface-sunken)', overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            borderRadius: 'var(--radius-pill)',
            background: done ? 'var(--oasis-palm)' : 'linear-gradient(90deg,#f6d488,#e7b24c)',
            transition: 'width var(--dur-slow) var(--ease-out)',
          }}
        />
      </div>
    </div>
  );
}
