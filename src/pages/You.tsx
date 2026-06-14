import { useRef, useState, type ReactNode } from 'react'
import { Download, Upload, RotateCcw, Check, ChevronRight, User, Ruler, Target, Layers, SlidersHorizontal, Camera } from 'lucide-react'
import { useStore, aiScansToday, AI_DAILY_CAP, type Goal, type Sex } from '../store/useStore'
import { LEVELS, getLevel } from '../data/program'
import { computeTargets } from '../lib/nutrition'
import { getApiKey, setApiKey, hasApiKey, type AiModel } from '../lib/ai'
import { PageHeader, Avatar } from '../components/ui'

const goals: { id: Goal; label: string; hint: string; rate: number }[] = [
  { id: 'cut', label: 'Cut', hint: 'lose fat', rate: -0.5 },
  { id: 'maintain', label: 'Maintain', hint: 'hold steady', rate: 0 },
  { id: 'bulk', label: 'Bulk', hint: 'build mass', rate: 0.25 },
]

export default function You() {
  const { profile, currentLevel, sessions, aiModel, aiUsage, setProfile, setLevel, setAiModel, exportData, importData, resetAll } = useStore()
  const fileRef = useRef<HTMLInputElement>(null)
  const [toast, setToast] = useState('')
  const [open, setOpen] = useState<string | null>(null)
  const [aiKey, setAiKey] = useState(getApiKey())
  const [showKeyHelp, setShowKeyHelp] = useState(false)

  const flash = (m: string) => {
    setToast(m)
    setTimeout(() => setToast(''), 1800)
  }

  const doExport = () => {
    const blob = new Blob([exportData()], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `oasis-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    flash('Backup downloaded')
  }

  const doImport = (file: File) => {
    const reader = new FileReader()
    reader.onload = () => flash(importData(String(reader.result)) ? 'Data restored' : 'Import failed — bad file')
    reader.readAsText(file)
  }

  const level = getLevel(currentLevel)
  const targets = computeTargets(profile)
  const since = new Date(profile.startedAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })
  const sexSym = profile.sex === 'female' ? '♀' : '♂'
  const toggle = (id: string) => setOpen((o) => (o === id ? null : id))

  return (
    <div className="space-y-3 pt-1">
      <PageHeader eyebrow="Your account" title="You" />

      {/* Profile header */}
      <section className="glass p-[18px] flex items-center gap-3.5">
        <Avatar size={56} glow />
        <div className="min-w-0">
          <p className="font-display text-[1.4rem] text-sand-50 leading-tight truncate">{profile.name || 'Your name'}</p>
          <p className="text-sand-200/70 text-[0.78rem] mt-0.5">Climbing since {since} · {sessions.length} sessions</p>
        </div>
      </section>

      {/* Summary rows (tap to edit) */}
      <section className="glass p-1.5">
        <Row icon={<User size={16} />} label="Profile" value={`${profile.name || '—'} · ${profile.age ?? '—'} · ${sexSym}`} open={open === 'profile'} onClick={() => toggle('profile')}>
          <Field label="Name">
            <input className="input" value={profile.name} onChange={(e) => setProfile({ name: e.target.value })} placeholder="What should we call you?" />
          </Field>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <Field label="Age">
              <input className="input" inputMode="numeric" value={profile.age ?? ''} onChange={(e) => setProfile({ age: e.target.value ? Number(e.target.value) : null })} />
            </Field>
            <Field label="Sex (calorie math)">
              <div className="flex gap-2">
                {(['male', 'female'] as Sex[]).map((s) => (
                  <button key={s} onClick={() => setProfile({ sex: s })} className={`flex-1 py-2 rounded-xl border text-sm capitalize transition ${profile.sex === s ? 'bg-gold/15 border-gold/50 text-gold' : 'border-sand-600/40 text-sand-200/70'}`}>{s}</button>
                ))}
              </div>
            </Field>
          </div>
        </Row>

        <Row icon={<Ruler size={16} />} label="Height · Weight" value={`${profile.heightCm ?? '—'} cm · ${profile.weightKg ?? '—'} kg`} open={open === 'body'} onClick={() => toggle('body')}>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Height (cm)">
              <input className="input" inputMode="numeric" value={profile.heightCm ?? ''} onChange={(e) => setProfile({ heightCm: e.target.value ? Number(e.target.value) : null })} />
            </Field>
            <Field label="Weight (kg)">
              <input className="input" inputMode="decimal" value={profile.weightKg ?? ''} onChange={(e) => setProfile({ weightKg: e.target.value ? Number(e.target.value) : null })} />
            </Field>
          </div>
        </Row>

        <Row icon={<Target size={16} />} label="Goal" value={goalValue(profile.goal, profile.rateKgPerWeek ?? 0)} open={open === 'goal'} onClick={() => toggle('goal')}>
          <div className="flex gap-2">
            {goals.map((g) => (
              <button key={g.id} onClick={() => setProfile({ goal: g.id, rateKgPerWeek: g.rate })} className={`flex-1 py-2.5 rounded-xl border text-sm transition ${profile.goal === g.id ? 'bg-gold/15 border-gold/50 text-gold' : 'border-sand-600/40 text-sand-200/70'}`}>
                <span className="block font-medium">{g.label}</span>
                <span className="block text-[10px] opacity-70">{g.hint}</span>
              </button>
            ))}
          </div>
          {targets && (
            <p className="text-sand-200/55 text-xs mt-3">
              Targets: <span className="text-gold">{targets.calories.toLocaleString()} kcal</span> · {targets.protein}g P · {targets.carbs}g C · {targets.fat}g F.{' '}
              <button onClick={() => setProfile({ onboarded: false })} className="text-gold underline">Fine-tune in setup</button>
            </p>
          )}
        </Row>

        <Row icon={<Layers size={16} />} label="Level" value={`${level.name} (L${level.id})`} open={open === 'level'} onClick={() => toggle('level')} last>
          <p className="text-sand-200/55 text-xs mb-3">Advance when you hit the exit criteria. {level.exit.text}</p>
          <div className="flex items-center gap-2">
            {LEVELS.map((l) => (
              <button key={l.id} onClick={() => setLevel(l.id)} className={`flex-1 py-2 rounded-xl border text-sm transition ${l.id === currentLevel ? 'bg-gold/15 border-gold/50 text-gold' : 'border-sand-600/40 text-sand-200/70'}`}>L{l.id}</button>
            ))}
          </div>
        </Row>
      </section>

      {/* AI food scanner */}
      <section className="glass p-1.5">
        <Row icon={<Camera size={16} />} label="AI food scanner" value={hasApiKey() ? 'On' : 'Set up'} open={open === 'ai'} onClick={() => toggle('ai')} last>
          <p className="text-sand-200/60 text-xs mb-3 leading-snug">
            Estimate macros from a meal photo using your own Anthropic API key. Stored only on this device, pay-per-use (~0.5¢ per scan on Haiku).
          </p>
          <Field label="Anthropic API key">
            <input
              type="password"
              className="input"
              placeholder="sk-ant-..."
              value={aiKey}
              onChange={(e) => { setAiKey(e.target.value); setApiKey(e.target.value) }}
            />
          </Field>
          <div className="mt-3">
            <label className="block text-[10px] uppercase tracking-wider text-sand-200/50 mb-1.5">Model</label>
            <div className="flex gap-2">
              {(['haiku', 'sonnet', 'opus'] as AiModel[]).map((m) => (
                <button key={m} onClick={() => setAiModel(m)} className={`flex-1 py-2 rounded-xl border text-sm capitalize transition ${aiModel === m ? 'bg-gold/15 border-gold/50 text-gold' : 'border-sand-600/40 text-sand-200/70'}`}>{m}</button>
              ))}
            </div>
            <p className="text-sand-200/40 text-[10px] mt-1.5">Haiku ~0.5¢ · Sonnet ~2¢ · Opus ~3¢ per scan · {aiScansToday(aiUsage)}/{AI_DAILY_CAP} today</p>
          </div>
          <button onClick={() => setShowKeyHelp((o) => !o)} className="text-gold text-xs mt-3">{showKeyHelp ? 'Hide' : 'How do I get a key?'}</button>
          {showKeyHelp && (
            <ol className="text-sand-200/60 text-xs mt-2 space-y-1 list-decimal list-inside leading-relaxed">
              <li>Go to console.anthropic.com and sign up / log in.</li>
              <li>Add a little credit under Billing (e.g. $5 covers hundreds of scans).</li>
              <li>Open API keys → Create key, copy it.</li>
              <li>Paste it above. Optionally set a monthly spend limit in the console as a hard cap.</li>
            </ol>
          )}
        </Row>
      </section>

      {/* Actions */}
      <div className="space-y-2">
        <ActionRow icon={<SlidersHorizontal size={17} />} label="Edit goals & targets" onClick={() => setProfile({ onboarded: false })} />
        <ActionRow icon={<Download size={17} />} label="Export data" onClick={doExport} />
        <ActionRow icon={<Upload size={17} />} label="Import backup" onClick={() => fileRef.current?.click()} />
        <ActionRow icon={<RotateCcw size={17} />} label="Reset progress" danger onClick={() => { if (confirm('Reset all data? This cannot be undone.')) { resetAll(); flash('Everything reset') } }} />
      </div>
      <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={(e) => e.target.files?.[0] && doImport(e.target.files[0])} />

      <p className="text-center text-sand-200/30 text-xs pt-2 pb-1">Oasis v0.1 · made for the long climb · everything lives on this device</p>

      {toast && (
        <div className="fixed bottom-28 inset-x-0 flex justify-center z-50 animate-floatUp">
          <div className="glass px-4 py-2.5 flex items-center gap-2 text-sm">
            <Check size={16} className="text-oasis-palm" /> {toast}
          </div>
        </div>
      )}
    </div>
  )
}

function Row({ icon, label, value, open, onClick, last, children }: { icon: ReactNode; label: string; value: string; open: boolean; onClick: () => void; last?: boolean; children: ReactNode }) {
  return (
    <div className={last ? '' : 'border-b border-sand-700/25'}>
      <button onClick={onClick} className="w-full flex items-center gap-3 px-2.5 py-3 text-left">
        <span className="grid place-items-center w-9 h-9 rounded-2xl bg-sand-800/50 text-sand-200/70 shrink-0">{icon}</span>
        <span className="flex-1 text-sand-50 text-sm">{label}</span>
        <span className="text-sand-200/55 text-sm">{value}</span>
        <ChevronRight size={15} className={`text-sand-300/40 transition ${open ? 'rotate-90' : ''}`} />
      </button>
      {open && <div className="px-2.5 pb-4 pt-1 animate-floatUp">{children}</div>}
    </div>
  )
}

function ActionRow({ icon, label, danger, onClick }: { icon: ReactNode; label: string; danger?: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className="glass-soft w-full p-3.5 flex items-center gap-3 active:scale-[0.99] transition">
      <span className={danger ? 'text-dusk-rose' : 'text-sand-200/70'}>{icon}</span>
      <span className={`text-sm ${danger ? 'text-dusk-rose' : 'text-sand-100'}`}>{label}</span>
    </button>
  )
}

function goalValue(goal: Goal, rate: number): string {
  const label = goal[0].toUpperCase() + goal.slice(1)
  return rate ? `${label} · ${rate > 0 ? '+' : ''}${rate}kg/wk` : label
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-wider text-sand-200/50 mb-1.5">{label}</label>
      {children}
    </div>
  )
}
