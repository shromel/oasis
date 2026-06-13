interface Props {
  /** 0 = barren cavern, 1 = lush bioluminescent oasis */
  growth: number
  className?: string
}

/**
 * Lushwater Oasis × Wailing Caverns. As `growth` climbs the barren cavern
 * floods with a teal spring, vines and ferns overgrow the dunes, palms rise,
 * and bioluminescent spores drift through a warm shaft of gold light.
 */
export default function OasisScene({ growth, className = '' }: Props) {
  const g = Math.max(0, Math.min(1, growth))
  const palms = Math.round(g * 4)
  const vines = Math.round(2 + g * 5)
  const ferns = Math.round(g * 5)
  const spores = Math.round(g * 8)
  const water = Math.min(1, Math.max(0, (g - 0.08) / 0.45))
  const green = Math.min(1, g * 1.25)

  return (
    <svg viewBox="0 0 400 220" className={className} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Your oasis">
      <defs>
        <radialGradient id="lightShaft" cx="50%" cy="-10%" r="90%">
          <stop offset="0%" stopColor="#fbe6ab" stopOpacity={0.3 + g * 0.35} />
          <stop offset="45%" stopColor="#e7b24c" stopOpacity={0.1} />
          <stop offset="100%" stopColor="#e7b24c" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fbe6ab" />
          <stop offset="60%" stopColor="#e7b24c" />
          <stop offset="100%" stopColor="#c8902f" />
        </radialGradient>
        <linearGradient id="duneFar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9c7a44" />
          <stop offset="100%" stopColor="#4a3a22" />
        </linearGradient>
        <linearGradient id="duneNear" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c2a064" />
          <stop offset="100%" stopColor="#6b4d27" />
        </linearGradient>
        <linearGradient id="mossRim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5aa469" stopOpacity={green} />
          <stop offset="100%" stopColor="#2f6b4a" stopOpacity={green} />
        </linearGradient>
        <radialGradient id="pool" cx="50%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#7fe6e0" />
          <stop offset="45%" stopColor="#2f9d92" />
          <stop offset="100%" stopColor="#0c3b3a" />
        </radialGradient>
        <radialGradient id="spore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#bffbe6" />
          <stop offset="40%" stopColor="#7ff0c0" />
          <stop offset="100%" stopColor="#7ff0c0" stopOpacity="0" />
        </radialGradient>
        <filter id="soft"><feGaussianBlur stdDeviation="2.2" /></filter>
      </defs>

      {/* cavern depth + warm shaft of light */}
      <rect x="0" y="0" width="400" height="220" fill="url(#lightShaft)" />

      {/* cavern arch silhouette framing the top */}
      <path d="M0 0 H400 V20 Q 300 70 200 60 Q 100 70 0 20 Z" fill="#0a0e0b" opacity="0.55" />

      {/* sun glow rising through the opening */}
      <circle cx="200" cy={132 - g * 52} r={22 + g * 8} fill="url(#sun)" opacity={0.5 + g * 0.45} />
      <circle cx="200" cy={132 - g * 52} r={22 + g * 8} fill="none" stroke="#f6d488" strokeOpacity={g * 0.3} strokeWidth="10" filter="url(#soft)" />

      {/* hanging vines from the cavern ceiling */}
      {Array.from({ length: vines }).map((_, i) => {
        const x = 20 + (360 / (vines - 1 || 1)) * i + (i % 2 ? 6 : -6)
        const len = 26 + ((i * 37) % 40) + g * 26
        return <Vine key={i} x={x} len={len} green={green} delay={(i % 5) * 0.6} />
      })}

      {/* far mossy dune */}
      <path d="M0 150 Q 90 112 200 140 T 400 132 L400 220 L0 220 Z" fill="url(#duneFar)" opacity="0.9" />
      <path d="M0 150 Q 90 112 200 140 T 400 132" fill="none" stroke="url(#mossRim)" strokeWidth="6" opacity={green * 0.8} />

      {/* the spring — deep teal cavern water */}
      <ellipse cx="200" cy="188" rx={84} ry={17} fill="url(#pool)" opacity={water} />
      <ellipse cx="200" cy="183" rx={84} ry={12} fill="#cffaf3" opacity={water * 0.22} />
      {/* ripple rings */}
      {water > 0.4 && (
        <>
          <ellipse cx="178" cy="190" rx="10" ry="3" fill="none" stroke="#bffbe6" strokeOpacity="0.5" strokeWidth="0.8" className="animate-ripple" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
          <ellipse cx="222" cy="186" rx="8" ry="2.5" fill="none" stroke="#bffbe6" strokeOpacity="0.4" strokeWidth="0.8" className="animate-ripple" style={{ transformBox: 'fill-box', transformOrigin: 'center', animationDelay: '1.5s' }} />
        </>
      )}

      {/* mossy green bed around the pool */}
      <path d="M108 190 Q 200 166 292 190 Q 200 206 108 190 Z" fill="#3f8a5b" opacity={green} />

      {/* reeds at the water's edge */}
      {green > 0.2 &&
        [128, 142, 262, 276].map((x, i) => <Reed key={x} x={x} green={green} flip={i > 1} />)}

      {/* near dune */}
      <path d="M0 176 Q 120 150 200 172 T 400 166 L400 220 L0 220 Z" fill="url(#duneNear)" />

      {/* ferns sprouting from the near dune */}
      {Array.from({ length: ferns }).map((_, i) => {
        const xs = [70, 120, 300, 330, 95]
        return <Fern key={i} x={xs[i] ?? 80 + i * 30} y={182} green={green} />
      })}

      {/* palms */}
      {Array.from({ length: palms }).map((_, i) => {
        const positions = [
          { x: 150, s: 1 },
          { x: 250, s: 0.92 },
          { x: 116, s: 0.78 },
          { x: 286, s: 0.7 },
        ]
        const p = positions[i]
        return <Palm key={i} x={p.x} baseY={186} scale={p.s} grow={green} />
      })}

      {/* bioluminescent spores drifting in the dark */}
      {Array.from({ length: spores }).map((_, i) => {
        const x = 40 + ((i * 71) % 320)
        const y = 70 + ((i * 53) % 110)
        const r = 2 + (i % 3)
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={r}
            fill="url(#spore)"
            className="animate-drift"
            style={{ animationDelay: `${(i % 7) * 0.9}s`, transformBox: 'fill-box', transformOrigin: 'center' }}
          />
        )
      })}
    </svg>
  )
}

function Vine({ x, len, green, delay }: { x: number; len: number; green: number; delay: number }) {
  const leaves = Math.max(2, Math.round(len / 12))
  return (
    <g opacity={0.35 + green * 0.55} style={{ transformOrigin: `${x}px 0px` }} className="animate-sway">
      <path d={`M${x} 0 q 6 ${len * 0.5} 0 ${len}`} stroke="#3f7a4a" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {Array.from({ length: leaves }).map((_, i) => {
        const t = (i + 1) / (leaves + 1)
        const ly = len * t
        const dir = i % 2 ? 1 : -1
        return (
          <ellipse
            key={i}
            cx={x + dir * 4}
            cy={ly}
            rx="3.2"
            ry="1.6"
            fill="#5aa469"
            opacity={green}
            transform={`rotate(${dir * 35} ${x + dir * 4} ${ly})`}
          />
        )
      })}
      <circle cx={x} cy={len} r="2.2" fill="#7ff0c0" opacity={green * 0.8} className="animate-glowPulse" style={{ animationDelay: `${delay}s` }} />
    </g>
  )
}

function Reed({ x, green, flip }: { x: number; green: number; flip: boolean }) {
  const d = flip ? -1 : 1
  return (
    <g opacity={green} style={{ transformOrigin: `${x}px 190px` }} className="animate-sway">
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${x + i * 3 * d} 192 q ${d * (4 + i)} ${-16 - i * 4} ${d * (2 + i)} ${-26 - i * 5}`}
          stroke="#4f8a3f"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />
      ))}
    </g>
  )
}

function Fern({ x, y, green }: { x: number; y: number; green: number }) {
  return (
    <g opacity={Math.min(1, green * 1.2)} className="animate-floatUp">
      {[-1, 1].map((dir) =>
        [0, 1, 2].map((j) => {
          const len = 12 + j * 3
          return (
            <path
              key={`${dir}-${j}`}
              d={`M${x} ${y} q ${dir * len * 0.7} ${-len * 0.5 - j * 3} ${dir * len} ${-len - j * 4}`}
              stroke={j === 1 ? '#6f8f3f' : '#3f7a4a'}
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
            />
          )
        }),
      )}
    </g>
  )
}

function Palm({ x, baseY, scale, grow }: { x: number; baseY: number; scale: number; grow: number }) {
  const h = 48 * scale
  return (
    <g opacity={Math.min(1, grow * 1.4)} className="animate-floatUp">
      <path d={`M${x} ${baseY} q ${4 * scale} ${-h * 0.6} ${1 * scale} ${-h}`} stroke="#6b4a2a" strokeWidth={3.4 * scale} fill="none" strokeLinecap="round" />
      {[-1, 1].map((dir) =>
        [0, 1, 2].map((j) => {
          const ty = baseY - h
          const len = (16 + j * 4) * scale
          const droop = (10 + j * 6) * scale
          return (
            <path
              key={`${dir}-${j}`}
              d={`M${x + dir} ${ty} q ${dir * len * 0.6} ${-6} ${dir * len} ${droop}`}
              stroke="#5aa469"
              strokeWidth={2.6 * scale}
              fill="none"
              strokeLinecap="round"
            />
          )
        }),
      )}
      <circle cx={x + 1} cy={baseY - h} r={2.4 * scale} fill="#3f8a5b" />
    </g>
  )
}
