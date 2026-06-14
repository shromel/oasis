import React from 'react';

/**
 * Oasis Button — the primary action primitive.
 * `gold` is the signature foil CTA; `ghost` is the quiet secondary;
 * `text` is a bare gold link-button. Presses shrink (scale 0.97).
 */
export function Button({
  variant = 'gold',
  size = 'md',
  icon = null,
  iconRight = null,
  fullWidth = false,
  disabled = false,
  type = 'button',
  onClick,
  children,
  style,
  ...rest
}) {
  const pad = {
    sm: '0.5rem 0.875rem',
    md: '0.75rem 1.25rem',
    lg: '0.875rem 1.5rem',
  }[size];
  const fontSize = { sm: 'var(--text-sm)', md: 'var(--text-base)', lg: 'var(--text-lg)' }[size];

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontFamily: 'var(--font-sans)',
    fontWeight: 'var(--weight-semibold)',
    fontSize,
    lineHeight: 1,
    padding: pad,
    borderRadius: 'var(--radius-xl)',
    width: fullWidth ? '100%' : 'auto',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    transition: 'transform var(--dur-fast) var(--ease-out), filter var(--dur-fast) var(--ease-out)',
    WebkitTapHighlightColor: 'transparent',
  };

  const variants = {
    gold: {
      color: 'var(--text-on-gold)',
      border: 'none',
      background: 'var(--grad-gold)',
      boxShadow: 'var(--shadow-gold)',
    },
    ghost: {
      color: 'rgba(236, 220, 192, 0.9)',
      border: '1px solid var(--border-strong)',
      background: 'var(--surface-sunken)',
    },
    text: {
      color: 'var(--text-gold)',
      border: 'none',
      background: 'transparent',
      padding: '0.25rem 0.25rem',
      boxShadow: 'none',
    },
  };

  const onDown = (e) => { if (!disabled) e.currentTarget.style.transform = 'scale(var(--press-scale))'; };
  const onUp = (e) => { e.currentTarget.style.transform = 'scale(1)'; };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onPointerDown={onDown}
      onPointerUp={onUp}
      onPointerLeave={onUp}
      style={{ ...base, ...variants[variant], ...style }}
      {...rest}
    >
      {icon}
      {children}
      {iconRight}
    </button>
  );
}
