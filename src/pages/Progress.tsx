import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { Trash2, Plus, ClipboardCheck } from 'lucide-react'
import { useStore, baselineValues, bestFor } from '../store/useStore'
import { RETEST_BATTERY } from '../data/program'

const SERIES = [
  { key: 'pullups', label: 'Pullups', color: '#e7b24c' },
  { key: 'dips', label: 'Dips', color: '#5aa469' },
  { key: 'pushups', label: 'Pushups', color: '#4cc4d4' },
]

export default function Progress() {
  const state = useStore()
  const { sessions, retests, profile, addRetest, deleteSession } = state
  const [showRetest, setShowRetest] = useState(false)

  const chartData = buildChartData(retests, profile.startedAt)

  return (
    <div className="space-y-5 pt-4">
      <header>
        <h1 className="heading text-3xl">Progress</h1>
        <p className="text-sand-200/60 text-sm mt-1">Watch the numbers climb.</p>
      </header>

      {/* Current bests */}
      <section className="glass p-5">
        <h2 className="heading text-lg mb-4">Current bests</h2>
        <div className="grid grid-cols-2 gap-3">
          {RETEST_BATTERY.map((r) => (
            <div key={r.id} className="glass-soft p-3">
              <p className="text-sand-200/55 text-xs">{r.label}</p>
              <p className="font-display text-2xl text-sand-50 mt-1">
                {bestFor(state, r.id)}
                <span className="text-sm text-sand-200/50 ml-1">{r.unit === 'sec' ? 's' : ''}</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Strength chart */}
      <section className="glass p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="heading text-lg">Strength curve</h2>
          <div className="flex gap-3">
            {SERIES.map((s) => (
              <span key={s.key} className="text-[11px] flex items-center gap-1 text-sand-200/70">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} /> {s.label}
              </span>
            ))}
          </div>
        </div>
        {chartData.length <= 1 ? (
          <p className="text-sand-200/50 text-sm py-8 text-center">
            Log a retest to start your strength curve.
          </p>
        ) : (
          <div className="h-52 -ml-3">
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

      {/* Retest */}
      <section className="glass overflow-hidden">
        <button onClick={() => setShowRetest((o) => !o)} className="w-full flex items-center justify-between p-4">
          <span className="heading text-lg flex items-center gap-2">
            <ClipboardCheck size={18} className="text-gold" /> 4-week retest
          </span>
          <Plus size={18} className={`text-sand-200/60 transition ${showRetest ? 'rotate-45' : ''}`} />
        </button>
        {showRetest && <RetestForm onSave={(v) => { addRetest(v); setShowRetest(false) }} />}
      </section>

      {/* History */}
      <section className="glass p-5">
        <h2 className="heading text-lg mb-3">History</h2>
        {sessions.length === 0 ? (
          <p className="text-sand-200/50 text-sm py-4 text-center">No sessions yet — go bank one.</p>
        ) : (
          <ul className="space-y-2.5">
            {sessions.slice(0, 30).map((s) => {
              const totalSets = s.entries.reduce((a, e) => a + e.sets.length, 0)
              const totalReps = s.entries.reduce((a, e) => a + e.sets.reduce((x, y) => x + y, 0), 0)
              return (
                <li key={s.id} className="glass-soft p-3 flex items-center justify-between">
                  <div>
                    <p className="text-sand-50 font-medium text-sm">
                      {s.emoji} {s.blockLabel}
                    </p>
                    <p className="text-sand-200/50 text-xs mt-0.5">
                      {new Date(s.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} ·{' '}
                      {totalSets} sets · {totalReps} total
                    </p>
                  </div>
                  <button onClick={() => deleteSession(s.id)} className="text-sand-300/40 hover:text-dusk-rose p-2">
                    <Trash2 size={16} />
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </section>
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
    <div className="px-4 pb-4 space-y-3">
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

function buildChartData(
  retests: { date: string; values: Record<string, number> }[],
  startedAt: string,
) {
  const points = [
    {
      label: 'Base',
      time: new Date(startedAt).getTime(),
      pullups: baselineValues.pullups,
      dips: baselineValues.dips,
      pushups: baselineValues.pushups,
    },
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
