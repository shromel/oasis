import { useRef, useState } from 'react'
import { Download, Upload, RotateCcw, ChevronUp, ChevronDown, Check } from 'lucide-react'
import { useStore, type Goal, type Sex } from '../store/useStore'
import { LEVELS, getLevel } from '../data/program'

const goals: { id: Goal; label: string; hint: string }[] = [
  { id: 'cut', label: 'Cut', hint: 'lose fat' },
  { id: 'maintain', label: 'Maintain', hint: 'hold steady' },
  { id: 'bulk', label: 'Bulk', hint: 'build mass' },
]

export default function You() {
  const { profile, currentLevel, setProfile, setLevel, exportData, importData, resetAll } = useStore()
  const fileRef = useRef<HTMLInputElement>(null)
  const [toast, setToast] = useState('')

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
    reader.onload = () => {
      const ok = importData(String(reader.result))
      flash(ok ? 'Data restored' : 'Import failed — bad file')
    }
    reader.readAsText(file)
  }

  const level = getLevel(currentLevel)

  return (
    <div className="space-y-5 pt-4">
      <header>
        <h1 className="heading text-3xl">You</h1>
        <p className="text-sand-200/60 text-sm mt-1">Your stats, your level, your data.</p>
      </header>

      {/* Profile */}
      <section className="glass p-5 space-y-4">
        <h2 className="heading text-lg">Profile</h2>
        <Field label="Name">
          <input
            value={profile.name}
            onChange={(e) => setProfile({ name: e.target.value })}
            placeholder="What should the oasis call you?"
            className="input"
          />
        </Field>
        <div className="grid grid-cols-3 gap-3">
          <Field label="Weight (kg)">
            <input className="input" inputMode="decimal" value={profile.weightKg ?? ''} onChange={(e) => setProfile({ weightKg: e.target.value ? Number(e.target.value) : null })} />
          </Field>
          <Field label="Height (cm)">
            <input className="input" inputMode="numeric" value={profile.heightCm ?? ''} onChange={(e) => setProfile({ heightCm: e.target.value ? Number(e.target.value) : null })} />
          </Field>
          <Field label="Age">
            <input className="input" inputMode="numeric" value={profile.age ?? ''} onChange={(e) => setProfile({ age: e.target.value ? Number(e.target.value) : null })} />
          </Field>
        </div>
        <Field label="Sex (for calorie math)">
          <div className="flex gap-2">
            {(['male', 'female'] as Sex[]).map((s) => (
              <button
                key={s}
                onClick={() => setProfile({ sex: s })}
                className={`flex-1 py-2.5 rounded-xl border text-sm capitalize transition ${
                  profile.sex === s ? 'bg-gold/15 border-gold/50 text-gold' : 'border-sand-600/40 text-sand-200/70'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </Field>
        <Field label="Goal">
          <div className="flex gap-2">
            {goals.map((g) => (
              <button
                key={g.id}
                onClick={() => setProfile({ goal: g.id })}
                className={`flex-1 py-2.5 rounded-xl border text-sm transition ${
                  profile.goal === g.id ? 'bg-gold/15 border-gold/50 text-gold' : 'border-sand-600/40 text-sand-200/70'
                }`}
              >
                <span className="block font-medium">{g.label}</span>
                <span className="block text-[10px] opacity-70">{g.hint}</span>
              </button>
            ))}
          </div>
        </Field>
      </section>

      {/* Level control */}
      <section className="glass p-5">
        <h2 className="heading text-lg mb-1">Current level</h2>
        <p className="text-sand-200/55 text-sm mb-4">Advance when you hit the exit criteria.</p>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-display text-2xl text-sand-50">
              L{level.id} · <span className="gold-text">{level.name}</span>
            </p>
            <p className="text-sand-200/55 text-xs mt-1">{level.exit.text}</p>
          </div>
          <div className="flex flex-col gap-1.5">
            <button
              onClick={() => setLevel(currentLevel + 1)}
              disabled={currentLevel >= LEVELS.length}
              className="w-10 h-10 rounded-xl bg-gold/15 border border-gold/40 grid place-items-center text-gold disabled:opacity-30"
            >
              <ChevronUp size={18} />
            </button>
            <button
              onClick={() => setLevel(currentLevel - 1)}
              disabled={currentLevel <= 1}
              className="w-10 h-10 rounded-xl bg-sand-800/40 border border-sand-600/40 grid place-items-center text-sand-200/70 disabled:opacity-30"
            >
              <ChevronDown size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Data */}
      <section className="glass p-5 space-y-3">
        <h2 className="heading text-lg">Data & sync</h2>
        <p className="text-sand-200/55 text-sm">
          Everything lives on this device. To move between phone and Mac, export a backup here and import it on the other.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <button onClick={doExport} className="btn-ghost flex items-center justify-center gap-2">
            <Download size={18} /> Export
          </button>
          <button onClick={() => fileRef.current?.click()} className="btn-ghost flex items-center justify-center gap-2">
            <Upload size={18} /> Import
          </button>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && doImport(e.target.files[0])}
        />
        <button
          onClick={() => {
            if (confirm('Reset all data? This cannot be undone.')) {
              resetAll()
              flash('Everything reset')
            }
          }}
          className="w-full mt-1 text-dusk-rose/80 text-sm flex items-center justify-center gap-2 py-2"
        >
          <RotateCcw size={15} /> Reset all data
        </button>
      </section>

      <p className="text-center text-sand-200/30 text-xs pb-2">Oasis v0.1 · made for the long climb</p>

      {toast && (
        <div className="fixed bottom-28 inset-x-0 flex justify-center z-50 animate-floatUp">
          <div className="glass px-4 py-2.5 flex items-center gap-2 text-sm">
            <Check size={16} className="text-oasis-palm" /> {toast}
          </div>
        </div>
      )}

      <style>{`.input{width:100%;background:rgba(57,39,22,0.4);border:1px solid rgba(116,80,43,0.4);border-radius:0.75rem;padding:0.6rem 0.75rem;color:#f3e6cf;outline:none;font-size:0.95rem}.input:focus{border-color:rgba(231,178,76,0.5)}`}</style>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider text-sand-200/50 mb-1.5">{label}</label>
      {children}
    </div>
  )
}
