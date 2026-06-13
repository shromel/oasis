interface Props {
  /** 0 = barren coast, 1 = lush Brazilian jungle & turquoise sea */
  growth: number
  className?: string
}

/**
 * A slim banner: deep Brazilian jungle meeting a tropical coast. Barren and
 * sandy at low `growth`; as it climbs the canopy thickens to saturated emerald,
 * the sea floods turquoise, palms and big leaves fill in, and fireflies wake.
 * Built from bold *filled* shapes (no wimpy line-art).
 */
export default function OasisScene({ growth, className = '' }: Props) {
  const g = Math.max(0, Math.min(1, growth))
  const lush = Math.min(1, g * 1.2) // opacity of the green/coast layer
  const palms = Math.max(1, Math.round(g * 4))
  const flies = Math.round(g * 7)

  return (
    <svg viewBox="0 0 400 130" className={className} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Your jungle coast" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10241c" />
          <stop offset="55%" stopColor="#21331f" />
          <stop offset="100%" stopColor="#3c3a1f" />
        </linearGradient>
        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffe6a3" stopOpacity={0.5 + g * 0.4} />
          <stop offset="100%" stopColor="#ffe6a3" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sunDisc" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#fff0c4" />
          <stop offset="60%" stopColor="#f6c45a" />
          <stop offset="100%" stopColor="#e09a35" />
        </radialGradient>
        <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5fe6e0" />
          <stop offset="55%" stopColor="#1aa6bd" />
          <stop offset="100%" stopColor="#0c6f7e" />
        </linearGradient>
        <linearGradient id="sand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0d488" />
          <stop offset="100%" stopColor="#b88f44" />
        </linearGradient>
        <linearGradient id="canopyFar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1f7a52" />
          <stop offset="100%" stopColor="#0f3d2e" />
        </linearGradient>
        <linearGradient id="canopyNear" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2f9e63" />
          <stop offset="100%" stopColor="#15503a" />
        </linearGradient>
      </defs>

      {/* sky + sun */}
      <rect x="0" y="0" width="400" height="130" fill="url(#sky)" />
      <circle cx="300" cy={48 - g * 8} r="46" fill="url(#sunGlow)" />
      <circle cx="300" cy={48 - g * 8} r={17 + g * 4} fill="url(#sunDisc)" opacity={0.55 + g * 0.4} />

      {/* barren distant ridge (always present) */}
      <path d="M0 78 Q 100 58 200 72 T 400 66 L400 130 L0 130 Z" fill="#5a4a2c" />

      {/* ===== lush coast + jungle layer (fades / fills with growth) ===== */}
      <g opacity={lush}>
        {/* turquoise sea */}
        <rect x="0" y="74" width="400" height="22" fill="url(#sea)" />
        {/* surf line */}
        <path d="M0 95 Q 80 90 160 95 T 320 95 T 400 94" fill="none" stroke="#dffaf4" strokeOpacity="0.5" strokeWidth="2" />

        {/* far jungle canopy ridge */}
        <path d="M0 80 Q 60 40 120 60 Q 180 34 250 58 Q 320 36 400 62 L400 80 Z" fill="url(#canopyFar)" />
        {/* near canopy mounds framing the sides */}
        <path d="M0 86 Q 40 44 96 70 Q 130 50 150 84 Z" fill="url(#canopyNear)" />
        <path d="M400 84 Q 356 42 300 70 Q 262 48 250 86 Z" fill="url(#canopyNear)" />
      </g>

      {/* golden beach (always, but richer when lush) */}
      <path d="M0 100 Q 120 90 200 98 T 400 96 L400 130 L0 130 Z" fill="url(#sand)" opacity={0.55 + lush * 0.45} />
      <path d="M0 100 Q 120 90 200 98 T 400 96" fill="none" stroke="#fff0c4" strokeOpacity={lush * 0.35} strokeWidth="1.5" />

      {/* foliage clumps along the beach */}
      <g opacity={lush}>
        {[28, 360, 70, 330].slice(0, 1 + Math.round(g * 3)).map((x, i) => (
          <FoliageClump key={x} x={x} y={108} flip={i % 2 === 1} />
        ))}
        {/* big banana / monstera leaves bursting from the edges */}
        {g > 0.3 && <BigLeaf x={18} y={104} dir={1} scale={0.9 + g * 0.3} />}
        {g > 0.5 && <BigLeaf x={384} y={106} dir={-1} scale={0.9 + g * 0.3} />}
      </g>

      {/* palms on the beach */}
      <g opacity={lush}>
        {Array.from({ length: palms }).map((_, i) => {
          const layout = [
            { x: 150, h: 1 },
            { x: 232, h: 0.86 },
            { x: 110, h: 0.72 },
            { x: 280, h: 0.64 },
          ][i]
          return <Palm key={i} x={layout.x} baseY={104} scale={layout.h} />
        })}
      </g>

      {/* fireflies */}
      {Array.from({ length: flies }).map((_, i) => {
        const x = 30 + ((i * 67) % 340)
        const y = 30 + ((i * 41) % 60)
        return (
          <circle key={i} cx={x} cy={y} r={1.6} fill="#bff7d8" className="animate-glowPulse"
            style={{ animationDelay: `${(i % 5) * 0.8}s`, filter: 'drop-shadow(0 0 3px #7ff0c0)' }} />
        )
      })}
    </svg>
  )
}

/** A solid tropical palm: tapered trunk + bold filled fronds. */
function Palm({ x, baseY, scale }: { x: number; baseY: number; scale: number }) {
  const h = 56 * scale
  const topY = baseY - h
  const lean = 5 * scale
  // filled tapered trunk
  const trunk = `M${x - 2.6 * scale} ${baseY}
    C ${x - 1 * scale} ${baseY - h * 0.5}, ${x + lean - 1.4 * scale} ${topY + 6}, ${x + lean - 1.6 * scale} ${topY}
    L ${x + lean + 1.6 * scale} ${topY}
    C ${x + lean + 1.4 * scale} ${topY + 6}, ${x + 1 * scale} ${baseY - h * 0.5}, ${x + 2.6 * scale} ${baseY} Z`
  const cx = x + lean
  const fronds = [-150, -110, -65, -20, 20, 65, 110, 150]
  return (
    <g>
      <path d={trunk} fill="#6b4a2a" />
      <path d={trunk} fill="#8a6336" opacity="0.5" transform={`translate(${-1 * scale} 0)`} />
      {fronds.map((deg, i) => (
        <Frond key={i} cx={cx} cy={topY} deg={deg} len={(20 + (i % 2) * 4) * scale} />
      ))}
      <circle cx={cx} cy={topY} r={2.4 * scale} fill="#1f7a52" />
      {/* coconuts */}
      <circle cx={cx - 2.5 * scale} cy={topY + 3} r={1.8 * scale} fill="#5a3a20" />
      <circle cx={cx + 2.5 * scale} cy={topY + 3} r={1.8 * scale} fill="#5a3a20" />
    </g>
  )
}

/** One filled, drooping palm frond. */
function Frond({ cx, cy, deg, len }: { cx: number; cy: number; deg: number; len: number }) {
  const rad = (deg * Math.PI) / 180
  const tipX = cx + Math.sin(rad) * len
  const tipY = cy - Math.cos(rad) * len * 0.62 + len * 0.18 // droop
  const midX = (cx + tipX) / 2 + Math.cos(rad) * 3
  const midY = (cy + tipY) / 2
  const w = 4
  return (
    <path
      d={`M${cx} ${cy} Q ${midX - w} ${midY - w} ${tipX} ${tipY} Q ${midX + w} ${midY + w} ${cx} ${cy} Z`}
      fill="#2f9e63"
      stroke="#15503a"
      strokeWidth="0.4"
    />
  )
}

/** A lush bush — overlapping filled leaf blobs. */
function FoliageClump({ x, y, flip }: { x: number; y: number; flip: boolean }) {
  const d = flip ? -1 : 1
  return (
    <g className="animate-sway" style={{ transformOrigin: `${x}px ${y}px` }}>
      <ellipse cx={x} cy={y} rx="18" ry="10" fill="#15503a" />
      <ellipse cx={x - 9 * d} cy={y - 3} rx="11" ry="9" fill="#1f7a52" />
      <ellipse cx={x + 8 * d} cy={y - 2} rx="10" ry="8" fill="#247a4e" />
      <ellipse cx={x} cy={y - 7} rx="12" ry="9" fill="#2f9e63" />
      <ellipse cx={x + 3 * d} cy={y - 10} rx="7" ry="6" fill="#4fc285" />
    </g>
  )
}

/** A big banana/monstera leaf bursting in from an edge. */
function BigLeaf({ x, y, dir, scale }: { x: number; y: number; dir: number; scale: number }) {
  const L = 46 * scale
  const W = 16 * scale
  const tipX = x + dir * L * 0.8
  const tipY = y - L
  return (
    <g className="animate-sway" style={{ transformOrigin: `${x}px ${y}px` }}>
      <path
        d={`M${x} ${y}
           Q ${x + dir * W * 1.4} ${y - L * 0.5} ${tipX} ${tipY}
           Q ${x + dir * W * 0.2} ${y - L * 0.45} ${x} ${y} Z`}
        fill="#247a4e"
        stroke="#15503a"
        strokeWidth="0.6"
      />
      {/* midrib */}
      <path d={`M${x} ${y} Q ${x + dir * W * 0.7} ${y - L * 0.5} ${tipX} ${tipY}`} stroke="#1a5e3c" strokeWidth="1" fill="none" />
    </g>
  )
}
