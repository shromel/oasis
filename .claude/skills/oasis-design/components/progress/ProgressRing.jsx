import React from 'react';

let _ringSeq = 0;

/**
 * ProgressRing — the gold→green achievement ring. An SVG donut with a
 * round cap that fills over 0.7s; centred label + uppercase sublabel.
 */
export function ProgressRing({ value, size = 120, stroke = 10, label, sublabel, className = '', style }) {
  const id = React.useMemo(() => `oasisRing${_ringSeq++}`, []);
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value));
  const offset = c - (pct / 100) * c;

  return (
    <div
      className={className}
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: size, height: size, ...style }}
    >
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f6d488" />
            <stop offset="60%" stopColor="#e7b24c" />
            <stop offset="100%" stopColor="#5aa469" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(116,80,43,0.35)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset var(--dur-slow) var(--ease-out)' }}
        />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        {label != null && (
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', color: 'var(--text-primary)', lineHeight: 1 }}>{label}</span>
        )}
        {sublabel && (
          <span style={{ fontSize: 'var(--text-2xs)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-eyebrow)', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{sublabel}</span>
        )}
      </div>
    </div>
  );
}
