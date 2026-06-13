import { Link } from 'react-router-dom'
import { Flame, CalendarCheck, ChevronRight, TrendingUp, Sprout } from 'lucide-react'
import OasisScene from '../components/OasisScene'
import ProgressRing from '../components/ProgressRing'
import { useStore, computeStreak, sessionsThisWeek, levelProgress, bloomScore } from '../store/useStore'
import { getLevel, LEVELS } from '../data/program'

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

export default function Home() {
  const state = useStore()
  const { profile, currentLevel, sessions } = state
  const level = getLevel(currentLevel)
  const streak = computeStreak(sessions)
  const week = sessionsThisWeek(sessions)
  const { pct, items } = levelProgress(state)
  const bloom = bloomScore(state)

  const today = new Date().toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })

  return (
    <div className="space-y-3 pt-3">
      <header className="flex items-baseline justify-between">
        <h1 className="heading text-2xl">
          {greeting()}
          {profile.name ? <span className="gold-text">, {profile.name}</span> : null}
        </h1>
        <p className="text-sand-200/50 text-xs">{today}</p>
      </header>

      {/* Hero: slim jungle-coast banner + momentum stats */}
      <section className="glass overflow-hidden">
        <div className="relative h-[112px]">
          <OasisScene growth={bloom.value} className="absolute inset-0 w-full h-full" />
          <div className="absolute top-2.5 left-3 right-3 flex items-center justify-between">
            <span className="chip backdrop-blur-md">Lv {level.id} · {level.name}</span>
            <span className="chip backdrop-blur-md flex items-center gap-1">
              <Sprout size={12} className="text-oasis-palm" /> {Math.round(bloom.value * 100)}% bloom
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 divide-x divide-sand-700/40 border-t border-sand-700/40">
          <Stat icon={<Flame size={15} className="text-dusk-rose" />} value={`${streak}`} label="streak" />
          <Stat icon={<CalendarCheck size={15} className="text-oasis-palm" />} value={`${week}`} label="this week" />
          <Stat
            icon={<TrendingUp size={15} className="text-gold" />}
            value={bloom.trendPct == null ? '—' : `${bloom.trendPct >= 0 ? '+' : ''}${bloom.trendPct}%`}
            label="momentum"
          />
        </div>
      </section>

      {/* Path to next level */}
      <section className="glass p-4">
        <div className="flex items-center justify-between mb-0.5">
          <h2 className="heading text-base">Path to Level {Math.min(level.id + 1, LEVELS.length)}</h2>
          <Link to="/progress" className="text-gold text-xs flex items-center">
            details <ChevronRight size={14} />
          </Link>
        </div>
        <p className="text-sand-200/55 text-xs mb-3">{level.tagline}</p>

        <div className="flex items-center gap-4">
          <ProgressRing value={pct} label={`${pct}%`} sublabel="exit" size={84} />
          <div className="flex-1 space-y-2">
            {items.length > 0 ? (
              items.map((it) => (
                <CriterionBar key={it.key} label={it.label} current={it.current} goal={it.goal} unit={it.unit} />
              ))
            ) : (
              <p className="text-sand-200/70 text-sm">{level.exit.text}</p>
            )}
          </div>
        </div>
      </section>

      {/* Train CTA */}
      <Link to="/train" className="block">
        <section className="glass p-4 flex items-center justify-between active:scale-[0.99] transition">
          <div>
            <p className="text-sand-200/55 text-[10px] uppercase tracking-widest">Today</p>
            <p className="heading text-lg mt-0.5">Start a session</p>
            <p className="text-sand-200/55 text-xs mt-0.5">Outdoor bar · Home floor</p>
          </div>
          <div className="btn-gold !px-3.5 !py-3.5 rounded-2xl">
            <ChevronRight size={20} />
          </div>
        </section>
      </Link>
    </div>
  )
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-2.5 gap-0.5">
      <div className="flex items-center gap-1.5">
        {icon}
        <span className="font-display text-xl leading-none text-sand-50">{value}</span>
      </div>
      <span className="text-sand-200/50 text-[10px]">{label}</span>
    </div>
  )
}

function CriterionBar({ label, current, goal, unit }: { label: string; current: number; goal: number; unit: string }) {
  const pct = Math.min(100, Math.round((current / goal) * 100))
  const done = current >= goal
  return (
    <div>
      <div className="flex justify-between text-[11px] mb-1">
        <span className="text-sand-100/80">{label}</span>
        <span className={done ? 'text-oasis-palm font-semibold' : 'text-sand-200/70'}>
          {current}{unit} / {goal}{unit}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-sand-800/60 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${pct}%`,
            background: done ? '#5aa469' : 'linear-gradient(90deg,#f6d488,#e7b24c)',
          }}
        />
      </div>
    </div>
  )
}
