import React from 'react';

/**
 * Chip — the small pill for metadata, tags, and status.
 * `tone` tints it: neutral (default), gold (active/selected), or
 * a status colour. Set `active` for the selected gold-wash state.
 */
export function Chip({ tone = 'neutral', active = false, icon = null, children, style, ...rest }) {
  const tones = {
    neutral: { color: 'rgba(236,220,192,0.8)', border: 'var(--border-hairline)', background: 'var(--surface-raised)' },
    gold:    { color: 'var(--text-gold)', border: 'var(--border-gold)', background: 'rgba(231,178,76,0.15)' },
    success: { color: 'var(--status-success)', border: 'rgba(90,164,105,0.4)', background: 'rgba(90,164,105,0.12)' },
    info:    { color: 'var(--status-info)', border: 'rgba(76,196,212,0.4)', background: 'rgba(76,196,212,0.12)' },
    danger:  { color: 'var(--status-danger)', border: 'rgba(217,138,106,0.4)', background: 'rgba(217,138,106,0.12)' },
  };
  const t = active ? tones.gold : tones[tone] || tones.neutral;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.375rem',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-xs)',
        fontWeight: 'var(--weight-medium)',
        lineHeight: 1,
        padding: '0.3rem 0.625rem',
        borderRadius: 'var(--radius-pill)',
        color: t.color,
        background: t.background,
        border: `1px solid ${t.border}`,
        whiteSpace: 'nowrap',
        ...style,
      }}
      {...rest}
    >
      {icon}
      {children}
    </span>
  );
}
