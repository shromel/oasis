import { useState } from 'react'
import { ChevronRight, ChevronLeft, Check } from 'lucide-react'
import { useStore, type Sex } from '../store/useStore'
import { computeTargets, ACTIVITY_FACTORS, type ActivityLevel } from '../lib/nutrition'
import { Avatar } from '../components/ui'

const activities: { id: ActivityLevel; label: string; hint: string }[] = [
  { id: 'sedentary', label: 'Sedentary', hint: 'Desk job, little movement, training aside' },
  { id: 'light', label: 'Lightly active', hint: 'Desk job + your training, some walking' },
  { id: 'moderate', label: 'Moderately active', hint: 'On your feet a fair bit + training' },
  { id: 'very', label: 'Very active', hint: 'Physical job or lots of daily movement' },
]

type Dir = 'lose' | 'maintain' | 'gain'
const paces: Record<Exclude<Dir, 'maintain'>, { rate: number; label: string; hint: string }[]> = {
  gain: [
    { rate: 0.25, label: 'Lean', hint: '+0.25 kg/week · minimal fat' },
    { rate: 0.35, label: 'Moderate', hint: '+0.35 kg/week' },
    { rate: 0.5, label: 'Standard', hint: '+0.5 kg/week · faster' },
  ],
  lose: [
    { rate: -0.25, label: 'Gentle', hint: '-0.25 kg/week · preserve muscle' },
    { rate: -0.5, label: 'Moderate', hint: '-0.5 kg/week' },
    { rate: -0.75, label: 'Aggressive', hint: '-0.75 kg/week' },
  ],
}

export default function Onboarding() {
  const { profile, setProfile } = useStore()
  const [step, setStep] = useState(0)

  const [name, setName] = useState(profile.name)
  const [sex, setSex] = useState<Sex>(profile.sex)
  const [age, setAge] = useState(profile.age?.toString() ?? '')
  const [height, setHeight] = useState(profile.heightCm?.toString() ?? '')
  const [weight, setWeight] = useState(profile.weightKg?.toString() ?? '')
  const [activity, setActivity] = useState<ActivityLevel>(profile.activity ?? 'light')
  const [dir, setDir] = useState<Dir>(profile.rateKgPerWeek ? (profile.rateKgPerWeek > 0 ? 'gain' : 'lose') : 'gain')
  const [rate, setRate] = useState<number>(profile.rateKgPerWeek ?? 0.25)
  const [targetWeight, setTargetWeight] = useState(profile.targetWeightKg?.toString() ?? '')
  const [proteinPerKg, setProteinPerKg] = useState(profile.proteinPerKg ?? 2.0)

  const w = Number(weight) || null
  const h = Number(height) || null
  const a = Number(age) || null
  const step0ok = !!(w && h && a)

  const effRate = dir === 'maintain' ? 0 : rate
  const targets = computeTargets({ weightKg: w, heightCm: h, age: a, sex, activity, rateKgPerWeek: effRate, proteinPerKg })

  const tw = Number(targetWeight) || null
  const etaWeeks = tw && w && effRate !== 0 && Math.sign(tw - w) === Math.sign(effRate) ? Math.ceil(Math.abs(tw - w) / Math.abs(effRate)) : null

  const finish = () => {
    setProfile({
      name: name.trim(),
      sex,
      age: a,
      heightCm: h,
      weightKg: w,
      activity,
      rateKgPerWeek: effRate,
      goal: dir === 'gain' ? 'bulk' : dir === 'lose' ? 'cut' : 'maintain',
      targetWeightKg: tw,
      proteinPerKg,
      onboarded: true,
    })
  }

  return (
    <div className="min-h-full mx-auto max-w-md px-5 safe-top safe-bottom flex flex-col">
      {/* progress dots */}
      <div className="flex items-center gap-1.5 pt-5 mb-6">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`h-1 rounded-full flex-1 transition ${i <= step ? 'bg-gold' : 'bg-sand-700/50'}`} />
        ))}
      </div>

      {step === 0 && (
        <Step eyebrow="Welcome to Oasis" title="Let's set you up">
          <p className="text-sand-200/60 text-sm mb-5">A few numbers so the app can build your training & nutrition targets. Stored only on this device.</p>
          <div className="space-y-4">
            <L label="Name">
              <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="What should we call you?" />
            </L>
            <L label="Sex (for calorie maths)">
              <div className="flex gap-2">
                {(['male', 'female'] as Sex[]).map((s) => (
                  <button key={s} onClick={() => setSex(s)} className={tab(sex === s)}>{s[0].toUpperCase() + s.slice(1)}</button>
                ))}
              </div>
            </L>
            <div className="grid grid-cols-3 gap-3">
              <L label="Age"><input className="input" inputMode="numeric" value={age} onChange={(e) => setAge(e.target.value.replace(/\D/g, ''))} placeholder="28" /></L>
              <L label="Height cm"><input className="input" inputMode="numeric" value={height} onChange={(e) => setHeight(e.target.value.replace(/\D/g, ''))} placeholder="180" /></L>
              <L label="Weight kg"><input className="input" inputMode="decimal" value={weight} onChange={(e) => setWeight(e.target.value.replace(/[^0-9.]/g, ''))} placeholder="78" /></L>
            </div>
          </div>
        </Step>
      )}

      {step === 1 && (
        <Step eyebrow="Step 2" title="How active are you?">
          <p className="text-sand-200/60 text-sm mb-5">Day-to-day movement including your workouts. This scales your calorie burn.</p>
          <div className="space-y-2.5">
            {activities.map((act) => (
              <button key={act.id} onClick={() => setActivity(act.id)} className={`w-full text-left glass-soft p-4 border transition ${activity === act.id ? '!border-gold/50 bg-gold/10' : ''}`}>
                <div className="flex items-center justify-between">
                  <span className={`font-medium ${activity === act.id ? 'text-gold' : 'text-sand-50'}`}>{act.label}</span>
                  <span className="text-sand-200/40 text-xs">×{ACTIVITY_FACTORS[act.id]}</span>
                </div>
                <p className="text-sand-200/55 text-xs mt-0.5">{act.hint}</p>
              </button>
            ))}
          </div>
        </Step>
      )}

      {step === 2 && (
        <Step eyebrow="Step 3" title="What's your goal?">
          <div className="flex gap-2 mb-4">
            {(['lose', 'maintain', 'gain'] as Dir[]).map((d) => (
              <button key={d} onClick={() => { setDir(d); if (d !== 'maintain') setRate(paces[d][0].rate) }} className={tab(dir === d)}>
                {d === 'lose' ? 'Lose fat' : d === 'gain' ? 'Build (bulk)' : 'Maintain'}
              </button>
            ))}
          </div>

          {dir !== 'maintain' && (
            <L label="Pace">
              <div className="space-y-2">
                {paces[dir].map((p) => (
                  <button key={p.rate} onClick={() => setRate(p.rate)} className={`w-full text-left glass-soft p-3 border transition ${rate === p.rate ? '!border-gold/50 bg-gold/10' : ''}`}>
                    <span className={`text-sm font-medium ${rate === p.rate ? 'text-gold' : 'text-sand-50'}`}>{p.label}</span>
                    <span className="text-sand-200/55 text-xs ml-2">{p.hint}</span>
                  </button>
                ))}
              </div>
            </L>
          )}

          <div className="grid grid-cols-2 gap-3 mt-4">
            <L label="Goal weight kg (optional)">
              <input className="input" inputMode="decimal" value={targetWeight} onChange={(e) => setTargetWeight(e.target.value.replace(/[^0-9.]/g, ''))} placeholder="—" />
            </L>
            <L label="Protein">
              <div className="flex gap-1.5">
                {[1.8, 2.0, 2.2].map((p) => (
                  <button key={p} onClick={() => setProteinPerKg(p)} className={`flex-1 py-2.5 rounded-xl border text-xs transition ${proteinPerKg === p ? 'bg-gold/15 border-gold/50 text-gold' : 'border-sand-600/40 text-sand-200/70'}`}>{p}</button>
                ))}
              </div>
            </L>
          </div>

          {/* live targets preview */}
          {targets && (
            <div className="glass p-4 mt-5">
              <p className="eyebrow mb-3">Your daily targets</p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="font-display text-3xl gold-text leading-none">{targets.calories.toLocaleString()}</p>
                  <p className="text-sand-200/55 text-xs mt-1">kcal · {targets.deltaKcal >= 0 ? '+' : ''}{targets.deltaKcal} {dir === 'maintain' ? 'maintain' : dir === 'gain' ? 'surplus' : 'deficit'}</p>
                </div>
                <div className="text-right text-sm space-y-0.5">
                  <p className="text-oasis-palm">{targets.protein}g protein</p>
                  <p className="text-oasis-water">{targets.carbs}g carbs</p>
                  <p className="text-gold">{targets.fat}g fat</p>
                </div>
              </div>
              {etaWeeks && <p className="text-sand-200/50 text-xs mt-3 pt-3 border-t border-sand-700/40">≈ {etaWeeks} weeks to {targetWeight} kg at this pace</p>}
            </div>
          )}
        </Step>
      )}

      {/* nav */}
      <div className="mt-auto pt-6 flex items-center gap-3">
        {step > 0 && (
          <button onClick={() => setStep((s) => s - 1)} className="btn-ghost flex items-center gap-1.5">
            <ChevronLeft size={18} /> Back
          </button>
        )}
        {step < 2 ? (
          <button onClick={() => setStep((s) => s + 1)} disabled={step === 0 && !step0ok} className="btn-gold flex-1 flex items-center justify-center gap-1.5 disabled:opacity-40">
            Continue <ChevronRight size={18} />
          </button>
        ) : (
          <button onClick={finish} disabled={!targets} className="btn-gold flex-1 flex items-center justify-center gap-2 disabled:opacity-40">
            <Check size={18} /> Start climbing
          </button>
        )}
      </div>
    </div>
  )
}

function Step({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <div className="animate-floatUp">
      <div className="flex items-center gap-3 mb-1">
        <Avatar size={34} />
        <p className="eyebrow">{eyebrow}</p>
      </div>
      <h1 className="heading text-3xl mb-4">{title}</h1>
      {children}
    </div>
  )
}

function L({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-wider text-sand-200/50 mb-1.5">{label}</label>
      {children}
    </div>
  )
}

const tab = (active: boolean) =>
  `flex-1 py-2.5 rounded-xl border text-sm transition ${active ? 'bg-gold/15 border-gold/50 text-gold' : 'border-sand-600/40 text-sand-200/70'}`
