import React from 'react';

/**
 * StatTile — a single metric in the dashboard's 3-up stat row:
 * an icon + big Fraunces value over a small lowercase label.
 */
export function StatTile({ icon = null, value, label, accent, style, ...rest }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.125rem',
        padding: '0.625rem 0',
        ...style,
      }}
      {...rest}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: accent || 'var(--text-primary)' }}>
        {icon}
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', lineHeight: 1, color: 'var(--text-primary)' }}>
          {value}
        </span>
      </div>
      <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-muted)' }}>{label}</span>
    </div>
  );
}
