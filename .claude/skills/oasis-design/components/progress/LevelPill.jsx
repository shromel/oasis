import React from 'react';

/**
 * LevelPill — a tappable pill in the Train level selector.
 * Active = gold wash + gold border + gold text; the *current* level
 * carries a small palm-green dot.
 */
export function LevelPill({ level, name, active = false, current = false, onClick, style, ...rest }) {
  return (
    <button
      onClick={onClick}
      style={{
        flexShrink: 0,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.375rem',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-sm)',
        padding: '0.5rem 1rem',
        borderRadius: 'var(--radius-xl)',
        cursor: 'pointer',
        transition: 'background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)',
        color: active ? 'var(--text-gold)' : 'var(--text-secondary)',
        background: active ? 'rgba(231,178,76,0.15)' : 'var(--surface-card-soft)',
        border: `1px solid ${active ? 'var(--border-gold)' : 'var(--border-hairline)'}`,
        ...style,
      }}
      {...rest}
    >
      <span style={{ fontWeight: 'var(--weight-semibold)' }}>L{level}</span>
      <span style={{ opacity: 0.8 }}>{name}</span>
      {current && <span style={{ color: 'var(--oasis-palm)', fontSize: '0.5rem', alignSelf: 'flex-start' }}>●</span>}
    </button>
  );
}
