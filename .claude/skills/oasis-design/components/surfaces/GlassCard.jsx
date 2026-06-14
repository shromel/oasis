import React from 'react';

/**
 * GlassCard — the frosted panel that is the core surface of Oasis.
 * `soft` switches to the lighter nested grade (.glass-soft).
 * `interactive` adds the press-shrink used on tappable cards.
 */
export function GlassCard({ soft = false, interactive = false, as = 'section', padding = 'var(--space-4)', children, style, ...rest }) {
  const Tag = as;
  const base = soft
    ? {
        background: 'var(--surface-card-soft)',
        backdropFilter: 'blur(var(--blur-soft))',
        WebkitBackdropFilter: 'blur(var(--blur-soft))',
        border: '1px solid var(--border-soft)',
        borderRadius: 'var(--radius-2xl)',
      }
    : {
        background: 'var(--surface-card)',
        backdropFilter: 'blur(var(--blur-card))',
        WebkitBackdropFilter: 'blur(var(--blur-card))',
        border: '1px solid var(--border-hairline)',
        borderRadius: 'var(--radius-3xl)',
        boxShadow: 'var(--shadow-card)',
      };

  const onDown = (e) => { if (interactive) e.currentTarget.style.transform = 'scale(0.99)'; };
  const onUp = (e) => { if (interactive) e.currentTarget.style.transform = 'scale(1)'; };

  return (
    <Tag
      onPointerDown={onDown}
      onPointerUp={onUp}
      onPointerLeave={onUp}
      style={{
        padding,
        transition: 'transform var(--dur-fast) var(--ease-out)',
        ...base,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
