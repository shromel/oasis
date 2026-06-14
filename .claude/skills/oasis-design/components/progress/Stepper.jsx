import React from 'react';

/**
 * Stepper — the per-set rep/second counter from the Session Logger.
 * A small sunken tile: "SET n" label, −/value/+ row, unit caption.
 * Minus is muted, plus is gold. Step is 1 for reps, 5 for seconds.
 */
export function Stepper({ index, value, unit = '', onChange, style }) {
  const isSec = unit === 's' || unit === 'sec';
  const step = isSec ? 5 : 1;
  const set = (v) => onChange && onChange(Math.max(0, v));

  return (
    <div
      style={{
        width: 58,
        padding: '0.25rem',
        borderRadius: 'var(--radius-md)',
        background: 'var(--surface-sunken)',
        border: '1px solid var(--border-hairline)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        ...style,
      }}
    >
      <span style={{ fontSize: '0.5625rem', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)', color: 'var(--text-faint)' }}>Set {index}</span>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button onClick={() => set(value - step)} aria-label="decrease" style={btn('rgba(201,163,110,0.6)')}>−</button>
        <input
          inputMode="numeric"
          value={value}
          onChange={(e) => set(Number(String(e.target.value).replace(/\D/g, '')) || 0)}
          style={{ width: 28, background: 'transparent', textAlign: 'center', fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', color: 'var(--text-primary)', border: 'none', outline: 'none' }}
        />
        <button onClick={() => set(value + step)} aria-label="increase" style={btn('var(--text-gold)')}>+</button>
      </div>
      <span style={{ fontSize: '0.5rem', color: 'var(--text-faint)', marginTop: '-0.125rem' }}>{isSec ? 'sec' : 'reps'}</span>
    </div>
  );
}

function btn(color) {
  return {
    width: 20,
    background: 'transparent',
    border: 'none',
    color,
    fontSize: 'var(--text-lg)',
    lineHeight: 1,
    cursor: 'pointer',
  };
}
