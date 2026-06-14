import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { Trash2, ClipboardCheck, ChevronRight, Timer } from 'lucide-react'
import { useStore, baselineValues, bestFor } from '../store/useStore'
import { RETEST_BATTERY, getLevel } from '../data/program'
import { PageHeader, CriterionBar, InfoChip } from '../components/ui'

const SERIES = [
  { key: 'pullups', label: 'Pullups', color: '#e7b24c' },
  { key: 'dips', label: 'Dips', color: '#5aa469' },
  { key: 'pushups', label: 'Pushups', color: '#4cc4d4' },
]

// Goal for metrics that aren't part of the numeric exit criteria.
const FALLBACK_GOAL: Record<string, number> = { legraises: 15 }

export default function Progress() {
  const state = useStore()
  const { sessions, retests, profile, addRetest, deleteSession } = state
  const [showRetest, setShowRetest] = useState(false)

  const level = getLevel(state.currentLevel)
  const exit = level.exit as unknown as Record<string, number | undefined>
  const chartData = buildChartData(retests, profile.startedAt)

  // Days until the next 4-week retest is due.
  const lastTest = retests[0]?.date ?? profile.startedAt
  const daysSince = Math.floor((Date.now() - new Date(lastTest).getTime()) / 864e5)
  const dueIn = Math.max(0, 28 - daysSince)

  return (
    <div className="space-y-3 pt-1">
      <PageHeader eyebrow={`Level ${level.id} · ${level.name}`} title="Progress" />

      {/* Strength curve */}
      <section className="glass p-[18px]">
        <div className="flex items-center justify-between mb-3">
          <span className="eyebrow">Strength curve</span>
          <div className="flex gap-2.5">
            {SERIES.map((s) => (
              <span key={s.key} className="text-[11px] flex items-center gap-1 text-sand-200/70">
                <span className="w-2 h-2 rounded-full" style={{ background: s.color }} /> {s.label}
              </span>
            ))}
          </div>
        </div>
        {chartData.length <= 1 ? (
          <p className="text-sand-200/50 text-sm py-8 text-center">Log a retest to start your strength curve.</p>
        ) : (
          <div className="h-48 -ml-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 6, right: 8, bottom: 0, left: -10 }}>
                <CartesianGrid stroke="rgba(116,80,43,0.18)" vertical={false} />
                <XAxis dataKey="label" stroke="#b3854b" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#b3854b" fontSize={11} tickLine={false} axisLine={false} width={28} />
                <Tooltip
                  contentStyle={{ background: '#241910', border: '1px solid rgba(231,178,76,0.3)', borderRadius: 12, color: '#f3e6cf' }}
                  labelStyle={{ color: '#e7b24c' }}
                />
                {SERIES.map((s) => (
                  <Line key={s.key} type="monotone" dataKey={s.key} stroke={s.color} strokeWidth={2.4} dot={{ r: 3, fill: s.color }} />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>

      {/* Current bests vs the next level's exit targets */}
      <section className="glass p-[18px]">
        <p className="eyebrow mb-3">Current bests vs L{Math.min(level.id + 1, 4)}</p>
        <div className="space-y-3">
          {RETEST_BATTERY.map((r) => {
            const goal = exit[r.id] ?? FALLBACK_GOAL[r.id]
            if (goal == null) return null
            return (
              <CriterionBar
                key={r.id}
                label={r.label}
                current={bestFor(state, r.id)}
                goal={goal}
                unit={r.unit === 'sec' ? 's' : ''}
              />
            )
          })}
        </div>
      </section>

      {/* 4-week retest */}
      <section className="glass p-[18px]">
        <div className="flex items-center justify-between mb-3">
          <span className="eyebrow">4-week retest {dueIn === 0 ? 'due' : 'in'}</span>
          <InfoChip tone="gold">
            <Timer size={12} /> {dueIn === 0 ? 'due now' : `in ${dueIn} days`}
          </InfoChip>
        </div>
        <button onClick={() => setShowRetest((o) => !o)} className="btn-ghost w-full flex items-center justify-center gap-2">
          <ClipboardCheck size={15} /> {showRetest ? 'Close' : 'Log a retest'}
        </button>
        {showRetest && <RetestForm onSave={(v) => { addRetest(v); setShowRetest(false) }} />}
      </section>

      {/* History */}
      <p className="eyebrow mt-4 mb-2 px-0.5">Session history</p>
      {sessions.length === 0 ? (
        <p className="text-sand-200/50 text-sm py-4 text-center">No sessions logged yet.</p>
      ) : (
        <div className="space-y-2">
          {sessions.slice(0, 30).map((s) => {
            const totalSets = s.entries.reduce((a, e) => a + e.sets.length, 0)
            const totalReps = s.entries.reduce((a, e) => a + e.sets.reduce((x, y) => x + y, 0), 0)
            return (
              <div key={s.id} className="glass-soft p-3 flex items-center gap-3">
                <span className="text-xl">{s.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sand-50 text-sm truncate">{s.blockLabel}</p>
                  <p className="text-sand-200/50 text-xs mt-0.5">
                    {new Date(s.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} · {totalSets} sets · {totalReps} reps
                  </p>
                </div>
                <button onClick={() => deleteSession(s.id)} className="text-sand-300/40 hover:text-dusk-rose p-1.5">
                  <Trash2 size={15} />
                </button>
                <ChevronRight size={15} className="text-sand-300/30" />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function RetestForm({ onSave }: { onSave: (v: Record<string, number>) => void }) {
  const [vals, setVals] = useState<Record<string, string>>({})
  const submit = () => {
    const out: Record<string, number> = {}
    for (const r of RETEST_BATTERY) {
      const n = Number(vals[r.id])
      if (!Number.isNaN(n) && vals[r.id] !== undefined && vals[r.id] !== '') out[r.id] = n
    }
    if (Object.keys(out).length > 0) onSave(out)
  }
  return (
    <div className="pt-4 space-y-3">
      {RETEST_BATTERY.map((r) => (
        <div key={r.id} className="flex items-center justify-between gap-3">
          <label className="text-sm text-sand-100/80">{r.label}</label>
          <div className="flex items-center gap-1">
            <input
              inputMode="numeric"
              value={vals[r.id] ?? ''}
              onChange={(e) => setVals((v) => ({ ...v, [r.id]: e.target.value.replace(/\D/g, '') }))}
              placeholder="—"
              className="w-16 text-center bg-sand-800/40 border border-sand-600/40 rounded-xl py-2 font-display text-lg text-sand-50 outline-none focus:border-gold/50"
            />
            <span className="text-xs text-sand-200/40 w-6">{r.unit === 'sec' ? 'sec' : 'reps'}</span>
          </div>
        </div>
      ))}
      <button onClick={submit} className="btn-gold w-full mt-1">Save retest</button>
    </div>
  )
}

function buildChartData(retests: { date: string; values: Record<string, number> }[], startedAt: string) {
  const points = [
    { label: 'Base', time: new Date(startedAt).getTime(), pullups: baselineValues.pullups, dips: baselineValues.dips, pushups: baselineValues.pushups },
    ...retests.map((r) => ({
      label: new Date(r.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      time: new Date(r.date).getTime(),
      pullups: r.values.pullups,
      dips: r.values.dips,
      pushups: r.values.pushups,
    })),
  ]
  return points.sort((a, b) => a.time - b.time)
}
