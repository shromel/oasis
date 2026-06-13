import type { ProgressPoint } from '../store/useStore'

interface Props {
  data: ProgressPoint[]
  className?: string
}

const W = 320
const H = 120
const PAD_T = 34 // headroom above the 100% target line (keeps it clear of the title)
const PAD_B = 6

/** Catmull-Rom → cubic bezier for a silky curve through the points. */
function smoothPath(pts: { x: number; y: number }[]): string {
  if (pts.length === 0) return ''
  if (pts.length === 1) return `M0 ${pts[0].y} L${W} ${pts[0].y}` // flat line
  let d = `M${pts[0].x} ${pts[0].y}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] ?? p2
    const c1x = p1.x + (p2.x - p0.x) / 6
    const c1y = p1.y + (p2.y - p0.y) / 6
    const c2x = p2.x - (p3.x - p1.x) / 6
    const c2y = p2.y - (p3.y - p1.y) / 6
    d += ` C ${c1x} ${c1y} ${c2x} ${c2y} ${p2.x} ${p2.y}`
  }
  return d
}

/**
 * A premium, gold-foil area chart of progress toward the next level — built to
 * stretch into the hero banner (crisp via non-scaling stroke).
 */
export default function LevelTrajectory({ data, className = '' }: Props) {
  const pct = (v: number) => v
  const yFor = (p: number) => PAD_T + (1 - pct(p) / 100) * (H - PAD_T - PAD_B)
  const targetY = yFor(100)

  const pts =
    data.length === 0
      ? [{ x: 0, y: yFor(0) }, { x: W, y: yFor(0) }]
      : data.length === 1
        ? [{ x: 0, y: yFor(data[0].pct) }, { x: W, y: yFor(data[0].pct) }]
        : data.map((d, i) => ({ x: (i / (data.length - 1)) * W, y: yFor(d.pct) }))

  const line = smoothPath(pts)
  const area = `${line} L ${W} ${H} L 0 ${H} Z`
  const last = pts[pts.length - 1]
  const dotLeft = (last.x / W) * 100
  const dotTop = (last.y / H) * 100

  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="trajArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f6d488" stopOpacity="0.42" />
            <stop offset="55%" stopColor="#e7b24c" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#e7b24c" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="trajLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#c8902f" />
            <stop offset="50%" stopColor="#f6d488" />
            <stop offset="100%" stopColor="#fff0c4" />
          </linearGradient>
        </defs>

        {/* 100% = next level — faint dashed gold target line */}
        <line x1="0" y1={targetY} x2={W} y2={targetY} stroke="#f6d488" strokeOpacity="0.28" strokeWidth="1" strokeDasharray="3 4" vectorEffect="non-scaling-stroke" />

        <path d={area} fill="url(#trajArea)" />
        <path d={line} fill="none" stroke="url(#trajLine)" strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>

      {/* crisp, round glowing endpoint as an HTML overlay (immune to stretch) */}
      <span
        className="absolute w-2.5 h-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-light shadow-glow ring-2 ring-gold-deep/60 animate-glowPulse"
        style={{ left: `${dotLeft}%`, top: `${dotTop}%` }}
      />
    </div>
  )
}
