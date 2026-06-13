import { useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Minus, Plus, Check, Timer } from 'lucide-react'
import { getLevel, type Exercise } from '../data/program'
import { useStore } from '../store/useStore'

type Logs = Record<string, number[]> // exerciseId -> reps/sec per set

export default function SessionLogger() {
  const { levelId, blockId } = useParams()
  const navigate = useNavigate()
  const getTarget = useStore((s) => s.getTarget)
  const saveSession = useStore((s) => s.saveSession)

  const level = getLevel(Number(levelId))
  const block = level.blocks.find((b) => b.id === blockId)

  const initial = useMemo<Logs>(() => {
    const o: Logs = {}
    block?.exercises.forEach((e) => {
      const setCount = e.sets ?? 3
      const target = getTarget(e.id, e.repsHigh) ?? (e.unit === 'sec' ? 30 : 8)
      o[e.id] = Array.from({ length: setCount }, () => target)
    })
    return o
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockId])

  const [logs, setLogs] = useState<Logs>(initial)
  const [done, setDone] = useState<Record<string, boolean>>({})
  const [note, setNote] = useState('')
  const [saved, setSaved] = useState(false)

  if (!block) {
    return (
      <div className="pt-10 text-center text-sand-200/70">
        Block not found.
        <button onClick={() => navigate('/train')} className="block mx-auto mt-4 btn-ghost">
          Back to Train
        </button>
      </div>
    )
  }

  const setVal = (id: string, i: number, v: number) =>
    setLogs((l) => ({ ...l, [id]: l[id].map((x, j) => (j === i ? Math.max(0, v) : x)) }))
  const addSet = (id: string) => setLogs((l) => ({ ...l, [id]: [...l[id], l[id][l[id].length - 1] ?? 0] }))
  const removeSet = (id: string) =>
    setLogs((l) => ({ ...l, [id]: l[id].length > 1 ? l[id].slice(0, -1) : l[id] }))

  const completedCount = Object.values(done).filter(Boolean).length

  const finish = () => {
    const entries = block.exercises.map((e) => ({
      exerciseId: e.id,
      name: e.name,
      unit: e.unit,
      perSide: e.perSide,
      target: getTarget(e.id, e.repsHigh),
      sets: logs[e.id] ?? [],
    }))
    saveSession({
      level: level.id,
      blockId: block.id,
      blockLabel: `${level.name} · ${block.label}`,
      emoji: block.emoji,
      entries,
      note: note.trim() || undefined,
    })
    setSaved(true)
    setTimeout(() => navigate('/'), 1100)
  }

  if (saved) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center animate-floatUp">
        <div className="w-20 h-20 rounded-full bg-oasis-palm/20 grid place-items-center mb-5 shadow-glow">
          <Check size={40} className="text-oasis-palm" />
        </div>
        <h2 className="heading text-2xl">Session banked</h2>
        <p className="text-sand-200/60 mt-1">The oasis drinks it in.</p>
      </div>
    )
  }

  return (
    <div className="pt-4 pb-4">
      <header className="flex items-center gap-3 mb-1">
        <button onClick={() => navigate('/train')} className="grid place-items-center w-10 h-10 rounded-2xl bg-sand-800/40">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="heading text-xl leading-tight">
            {block.emoji} {block.label}
          </h1>
          <p className="text-sand-200/55 text-xs">Level {level.id} · {level.name}</p>
        </div>
      </header>

      <p className="text-sand-200/50 text-xs mb-4 ml-1">
        {completedCount}/{block.exercises.length} marked done · tap a set to adjust reps
      </p>

      <div className="space-y-3">
        {block.exercises.map((e) => (
          <ExerciseLogger
            key={e.id}
            e={e}
            sets={logs[e.id] ?? []}
            target={getTarget(e.id, e.repsHigh)}
            done={!!done[e.id]}
            onToggleDone={() => setDone((d) => ({ ...d, [e.id]: !d[e.id] }))}
            onSet={(i, v) => setVal(e.id, i, v)}
            onAdd={() => addSet(e.id)}
            onRemove={() => removeSet(e.id)}
          />
        ))}
      </div>

      <textarea
        value={note}
        onChange={(ev) => setNote(ev.target.value)}
        placeholder="Session notes — how did it feel?"
        className="w-full mt-4 glass-soft p-4 text-sm bg-sand-900/30 placeholder:text-sand-200/40 resize-none outline-none focus:border-gold/40"
        rows={2}
      />

      <button onClick={finish} className="btn-gold w-full mt-4 flex items-center justify-center gap-2 text-base">
        <Check size={20} /> Finish session
      </button>
    </div>
  )
}

function ExerciseLogger({
  e,
  sets,
  target,
  done,
  onToggleDone,
  onSet,
  onAdd,
  onRemove,
}: {
  e: Exercise
  sets: number[]
  target: number | null
  done: boolean
  onToggleDone: () => void
  onSet: (i: number, v: number) => void
  onAdd: () => void
  onRemove: () => void
}) {
  const unitLabel = e.unit === 'sec' ? 's' : ''
  return (
    <section className={`glass p-4 transition ${done ? 'opacity-60' : ''}`}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <p className="text-sand-50 font-medium leading-tight">{e.name}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="chip">{e.scheme}</span>
            {target != null && (
              <span className="text-[11px] text-gold/90 flex items-center gap-1">
                <Timer size={11} /> target {target}
                {unitLabel}
                {e.perSide ? '/side' : ''}
              </span>
            )}
          </div>
        </div>
        <button
          onClick={onToggleDone}
          className={`shrink-0 w-9 h-9 rounded-xl grid place-items-center border transition ${
            done ? 'bg-oasis-palm/25 border-oasis-palm/60 text-oasis-palm' : 'border-sand-600/50 text-sand-300/60'
          }`}
        >
          <Check size={18} />
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {sets.map((v, i) => (
          <Stepper key={i} index={i + 1} value={v} unit={unitLabel} onChange={(nv) => onSet(i, nv)} />
        ))}
        <div className="flex items-center gap-1">
          <button onClick={onAdd} className="w-9 h-[52px] rounded-xl bg-sand-800/40 border border-sand-600/40 grid place-items-center text-sand-200/70">
            <Plus size={16} />
          </button>
          {sets.length > 1 && (
            <button onClick={onRemove} className="w-9 h-[52px] rounded-xl bg-sand-800/30 border border-sand-600/30 grid place-items-center text-sand-200/50">
              <Minus size={16} />
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

function Stepper({ index, value, unit, onChange }: { index: number; value: number; unit: string; onChange: (v: number) => void }) {
  const step = unit === 's' ? 5 : 1
  return (
    <div className="rounded-xl bg-sand-800/40 border border-sand-600/40 px-1 py-1 flex flex-col items-center w-[58px]">
      <span className="text-[9px] uppercase tracking-wider text-sand-200/40">Set {index}</span>
      <div className="flex items-center">
        <button onClick={() => onChange(value - step)} className="w-5 text-sand-300/60 text-lg leading-none">
          −
        </button>
        <input
          inputMode="numeric"
          value={value}
          onChange={(e) => onChange(Number(e.target.value.replace(/\D/g, '')) || 0)}
          className="w-7 bg-transparent text-center font-display text-lg text-sand-50 outline-none"
        />
        <button onClick={() => onChange(value + step)} className="w-5 text-gold text-lg leading-none">
          +
        </button>
      </div>
      <span className="text-[8px] text-sand-200/35 -mt-0.5">{unit === 's' ? 'sec' : 'reps'}</span>
    </div>
  )
}
