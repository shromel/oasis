import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, ChevronDown, Play } from 'lucide-react'
import { LEVELS, WARMUPS, getLevel, type Block, type Exercise } from '../data/program'
import { useStore } from '../store/useStore'

export default function Train() {
  const navigate = useNavigate()
  const currentLevel = useStore((s) => s.currentLevel)
  const getTarget = useStore((s) => s.getTarget)
  const [viewLevel, setViewLevel] = useState(currentLevel)
  const [warmOpen, setWarmOpen] = useState(false)
  const level = getLevel(viewLevel)

  return (
    <div className="space-y-5 pt-4">
      <header>
        <h1 className="heading text-3xl">Train</h1>
        <p className="text-sand-200/60 text-sm mt-1">Your program, imported and ready.</p>
      </header>

      {/* level selector */}
      <div className="flex gap-2 overflow-x-auto -mx-4 px-4 pb-1">
        {LEVELS.map((l) => {
          const active = l.id === viewLevel
          const isCurrent = l.id === currentLevel
          return (
            <button
              key={l.id}
              onClick={() => setViewLevel(l.id)}
              className={`shrink-0 px-4 py-2 rounded-2xl border text-sm transition ${
                active
                  ? 'bg-gold/15 border-gold/50 text-gold'
                  : 'border-sand-700/40 text-sand-200/70 bg-sand-900/30'
              }`}
            >
              <span className="font-semibold">L{l.id}</span>
              <span className="ml-1.5 opacity-80">{l.name}</span>
              {isCurrent && <span className="ml-1.5 text-[9px] align-top text-oasis-palm">●</span>}
            </button>
          )
        })}
      </div>

      <div className="glass p-4">
        <p className="text-sand-200/70 text-sm">{level.tagline}</p>
        <p className="text-xs text-sand-200/50 mt-2">
          <span className="text-sand-100/80 font-medium">Exit:</span> {level.exit.text}
        </p>
      </div>

      {/* warm-up (collapsible) */}
      <div className="glass overflow-hidden">
        <button onClick={() => setWarmOpen((o) => !o)} className="w-full flex items-center justify-between p-4">
          <span className="heading text-base">Warm-up</span>
          <ChevronDown size={18} className={`text-sand-200/60 transition ${warmOpen ? 'rotate-180' : ''}`} />
        </button>
        {warmOpen && (
          <div className="px-4 pb-4 space-y-4">
            {WARMUPS.map((w) => (
              <div key={w.id}>
                <p className="text-sand-100/80 text-sm font-medium mb-2">
                  {w.emoji} {w.label}
                </p>
                <ul className="space-y-1.5">
                  {w.exercises.map((e) => (
                    <li key={e.id} className="flex justify-between text-sm">
                      <span className="text-sand-200/80">{e.name}</span>
                      <span className="text-sand-200/50">{e.scheme}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* blocks */}
      {level.blocks.map((block) => (
        <BlockCard
          key={block.id}
          block={block}
          getTarget={getTarget}
          onStart={() => navigate(`/train/${level.id}/${block.id}`)}
        />
      ))}
    </div>
  )
}

function BlockCard({
  block,
  getTarget,
  onStart,
}: {
  block: Block
  getTarget: (id: string, fb: number | null) => number | null
  onStart: () => void
}) {
  return (
    <section className="glass overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-sand-700/40">
        <div>
          <h2 className="heading text-lg">
            {block.emoji} {block.label}
          </h2>
          {block.subtitle && <p className="text-sand-200/55 text-xs mt-0.5">{block.subtitle}</p>}
        </div>
        <button onClick={onStart} className="btn-gold !px-4 !py-2.5 flex items-center gap-1.5 text-sm">
          <Play size={15} /> Start
        </button>
      </div>
      <ul className="divide-y divide-sand-700/25">
        {block.exercises.map((e) => (
          <ExerciseRow key={e.id} e={e} getTarget={getTarget} />
        ))}
      </ul>
    </section>
  )
}

function ExerciseRow({ e, getTarget }: { e: Exercise; getTarget: (id: string, fb: number | null) => number | null }) {
  const t = getTarget(e.id, e.repsHigh)
  const bumped = t != null && e.repsHigh != null && t > e.repsHigh
  return (
    <li className="px-4 py-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sand-50 font-medium leading-tight">{e.name}</p>
          {e.notes && <p className="text-sand-200/50 text-xs mt-0.5 leading-snug">{e.notes}</p>}
        </div>
        <div className="text-right shrink-0">
          <p className="text-gold font-semibold text-sm whitespace-nowrap">{e.scheme}</p>
          {bumped && (
            <p className="text-oasis-palm text-[10px] mt-0.5">target {t}{e.unit === 'sec' ? 's' : ''} ↑</p>
          )}
        </div>
      </div>
    </li>
  )
}
