import React from 'react';

/**
 * IconTile — the rounded medallion that holds an icon throughout Oasis
 * (nav active state, empty-state badges, list-row leading icons).
 * `tone="gold"` adds the gold wash + glow used for emphasis.
 */
export function IconTile({ tone = 'sunken', size = 44, glow = false, children, style, ...rest }) {
  const tones = {
    sunken: { background: 'var(--surface-raised)', border: '1px solid var(--border-hairline)', color: 'var(--text-secondary)' },
    gold:   { background: 'rgba(231,178,76,0.15)', border: '1px solid var(--border-gold)', color: 'var(--text-gold)' },
    success:{ background: 'rgba(90,164,105,0.18)', border: '1px solid rgba(90,164,105,0.5)', color: 'var(--status-success)' },
  };
  const t = tones[tone] || tones.sunken;
  return (
    <div
      style={{
        width: size,
        height: size,
        flex: '0 0 auto',
        display: 'grid',
        placeItems: 'center',
        borderRadius: 'var(--radius-lg)',
        boxShadow: glow ? 'var(--shadow-glow)' : 'none',
        ...t,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
