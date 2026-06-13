import { Link } from 'react-router-dom'
import { Flame, CalendarCheck, ChevronRight, Sparkles } from 'lucide-react'
import OasisScene from '../components/OasisScene'
import ProgressRing from '../components/ProgressRing'
import { useStore, computeStreak, sessionsThisWeek, levelProgress } from '../store/useStore'
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

  // Oasis growth spans the whole 4-level journey, blooming with exit progress.
  const growth = Math.max(
    0.12,
    Math.min(1, (currentLevel - 1 + pct / 100) / LEVELS.length + Math.min(streak / 30, 0.12)),
  )

  const today = new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <div className="space-y-5 pt-4">
      <header className="flex items-end justify-between">
        <div>
          <p className="text-sand-200/60 text-sm">{today}</p>
          <h1 className="heading text-3xl mt-0.5">
            {greeting()}
            {profile.name ? <span className="gold-text">, {profile.name}</span> : null}
          </h1>
        </div>
      </header>

      {/* Oasis hero */}
      <section className="glass overflow-hidden">
        <div className="relative">
          <OasisScene growth={growth} className="w-full block" />
          <div className="absolute top-3 left-4 right-4 flex items-center justify-between">
            <span className="chip backdrop-blur-md">Level {level.id} · {level.name}</span>
            <span className="chip backdrop-blur-md flex items-center gap-1">
              <Sparkles size={12} className="text-gold" /> {Math.round(growth * 100)}% bloom
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 divide-x divide-sand-700/40 border-t border-sand-700/40">
          <Stat icon={<Flame size={18} className="text-dusk-rose" />} value={streak} label={streak === 1 ? 'day streak' : 'day streak'} />
          <Stat icon={<CalendarCheck size={18} className="text-oasis-palm" />} value={week} label="sessions this week" />
        </div>
      </section>

      {/* Level progress */}
      <section className="glass p-5">
        <div className="flex items-center justify-between mb-1">
          <h2 className="heading text-lg">Path to Level {Math.min(level.id + 1, LEVELS.length)}</h2>
          <Link to="/progress" className="text-gold text-sm flex items-center">
            details <ChevronRight size={16} />
          </Link>
        </div>
        <p className="text-sand-200/60 text-sm mb-4">{level.tagline}</p>

        <div className="flex items-center gap-5">
          <ProgressRing value={pct} label={`${pct}%`} sublabel="exit" size={108} />
          <div className="flex-1 space-y-2.5">
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
        <section className="glass p-5 flex items-center justify-between active:scale-[0.99] transition">
          <div>
            <p className="text-sand-200/60 text-xs uppercase tracking-widest">Today</p>
            <p className="heading text-xl mt-0.5">Start a session</p>
            <p className="text-sand-200/60 text-sm mt-0.5">Outdoor bar · Home floor</p>
          </div>
          <div className="btn-gold !px-4 !py-4 rounded-2xl">
            <ChevronRight size={22} />
          </div>
        </section>
      </Link>
    </div>
  )
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) {
  return (
    <div className="flex items-center gap-3 px-5 py-4">
      <div className="grid place-items-center w-10 h-10 rounded-2xl bg-sand-800/40">{icon}</div>
      <div>
        <p className="font-display text-2xl leading-none text-sand-50">{value}</p>
        <p className="text-sand-200/55 text-xs mt-0.5">{label}</p>
      </div>
    </div>
  )
}

function CriterionBar({ label, current, goal, unit }: { label: string; current: number; goal: number; unit: string }) {
  const pct = Math.min(100, Math.round((current / goal) * 100))
  const done = current >= goal
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
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
