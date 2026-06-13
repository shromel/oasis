interface Props {
  value: number // 0-100
  size?: number
  stroke?: number
  label?: string
  sublabel?: string
  className?: string
}

export default function ProgressRing({ value, size = 120, stroke = 10, label, sublabel, className = '' }: Props) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const pct = Math.max(0, Math.min(100, value))
  const offset = c - (pct / 100) * c

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
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
          stroke="url(#ringGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.7s cubic-bezier(0.4,0,0.2,1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        {label != null && <span className="font-display text-2xl text-sand-50 leading-none">{label}</span>}
        {sublabel && <span className="text-[10px] uppercase tracking-widest text-sand-200/70 mt-1">{sublabel}</span>}
      </div>
    </div>
  )
}
