// Shared UI primitives matching the oasis-design system mockups
// (PageHeader with eyebrow, brand avatar, stat tile, criterion bar, chips).
import type { ReactNode } from 'react'

export const avatarSrc = import.meta.env.BASE_URL + 'icon-192.png'

export function Avatar({ size = 40, glow = false }: { size?: number; glow?: boolean }) {
  return (
    <div
      className={`rounded-full overflow-hidden border border-gold/50 shrink-0 ${glow ? 'shadow-glow' : ''}`}
      style={{ width: size, height: size }}
    >
      <img src={avatarSrc} alt="" className="w-full h-full object-cover" />
    </div>
  )
}

export function PageHeader({ eyebrow, title, right }: { eyebrow: string; title: string; right?: ReactNode }) {
  return (
    <header className="flex items-end justify-between mt-2 mb-3 px-0.5">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="heading text-[1.875rem] leading-[1.05] mt-1">{title}</h1>
      </div>
      {right}
    </header>
  )
}

export function StatTile({ icon, value, label }: { icon: ReactNode; value: string | number; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-3 gap-0.5">
      <div className="flex items-center gap-1.5">
        {icon}
        <span className="font-display text-xl leading-none text-sand-50">{value}</span>
      </div>
      <span className="text-sand-200/50 text-[10px]">{label}</span>
    </div>
  )
}

export function CriterionBar({
  label,
  current,
  goal,
  unit = '',
}: {
  label: string
  current: number
  goal: number
  unit?: string
}) {
  const pct = Math.min(100, Math.round((current / goal) * 100))
  const done = current >= goal
  return (
    <div>
      <div className="flex justify-between text-[11px] mb-1">
        <span className="text-sand-100/80">{label}</span>
        <span className={done ? 'text-oasis-palm font-semibold' : 'text-sand-200/70'}>
          {current}
          {unit} / {goal}
          {unit}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-sand-800/60 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: done ? '#5aa469' : 'linear-gradient(90deg,#f6d488,#e7b24c)' }}
        />
      </div>
    </div>
  )
}

export function InfoChip({ children, tone = 'info' }: { children: ReactNode; tone?: 'info' | 'gold' }) {
  const cls =
    tone === 'gold'
      ? 'text-gold border-gold/50 bg-gold/10'
      : 'text-oasis-water border-oasis-water/40 bg-oasis-water/5'
  return <span className={`chip ${cls}`}>{children}</span>
}
