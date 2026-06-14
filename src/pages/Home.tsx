import { Link } from 'react-router-dom'
import { Flame, CalendarCheck, Dumbbell, TrendingUp, Play } from 'lucide-react'
import LevelTrajectory from '../components/LevelTrajectory'
import ProgressRing from '../components/ProgressRing'
import { Avatar, PageHeader, StatTile, CriterionBar, InfoChip } from '../components/ui'
import { useStore, computeStreak, sessionsThisWeek, levelProgress, bloomScore, levelProgressSeries } from '../store/useStore'
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
  const series = levelProgressSeries(state)
  const nextLevel = Math.min(level.id + 1, LEVELS.length)
  const trajectoryPct = series.length ? series[series.length - 1].pct : pct

  // Today's suggested block (the level's Outdoor block) for the CTA.
  const todayBlock = level.blocks[0]
  const exCount = todayBlock.exercises.length
  const mins = Math.round(exCount * 4.5)
  const today = new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <div className="space-y-3 pt-1">
      <PageHeader
        eyebrow={today}
        title={`${greeting()}${profile.name ? `, ${profile.name}` : ''}`}
        right={<Avatar size={40} />}
      />

      {/* Trajectory hero */}
      <section className="glass overflow-hidden">
        <div className="flex items-start justify-between px-4 pt-4">
          <div>
            <p className="eyebrow">Trajectory · L{nextLevel}</p>
            <p className="font-display text-[2.4rem] leading-none mt-1 gold-text">{trajectoryPct}%</p>
            <p className="text-sand-200/70 text-[0.78rem] mt-0.5">toward L{nextLevel}</p>
          </div>
          {bloom.trendPct != null && bloom.trendPct !== 0 && (
            <InfoChip>
              <TrendingUp size={12} /> {bloom.trendPct >= 0 ? '+' : ''}
              {bloom.trendPct}% trend
            </InfoChip>
          )}
        </div>
        <div className="relative h-[120px] mt-1.5">
          {series.length > 0 && <LevelTrajectory data={series} className="absolute inset-0 w-full h-full" />}
        </div>
      </section>

      {/* 3-up stat row */}
      <section className="glass overflow-hidden">
        <div className="grid grid-cols-3 divide-x divide-sand-700/40">
          <StatTile icon={<Flame size={15} className="text-dusk-rose" />} value={streak} label="day streak" />
          <StatTile icon={<CalendarCheck size={15} className="text-oasis-palm" />} value={week} label="this week" />
          <StatTile icon={<Dumbbell size={15} className="text-gold" />} value={sessions.length} label="sessions" />
        </div>
      </section>

      {/* Path to next level */}
      <section className="glass p-4">
        <p className="eyebrow mb-3">Path to L{nextLevel}</p>
        <div className="flex items-center gap-4">
          <ProgressRing value={pct} label={`${pct}%`} sublabel="exit" size={88} />
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

      {/* Today CTA */}
      <Link to={`/train/${level.id}/${todayBlock.id}`} className="block">
        <section className="glass p-4 flex items-center justify-between active:scale-[0.99] transition">
          <div>
            <p className="font-display text-[1.15rem] text-sand-50 leading-tight">
              Today · {todayBlock.label}
            </p>
            <p className="text-sand-200/60 text-xs mt-1">
              {exCount} exercises · ~{mins} min
            </p>
          </div>
          <span className="btn-gold flex items-center gap-1.5 text-sm !px-4 !py-2.5">
            <Play size={15} /> Start
          </span>
        </section>
      </Link>
    </div>
  )
}
