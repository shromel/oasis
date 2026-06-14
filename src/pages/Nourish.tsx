import { ScanBarcode } from 'lucide-react'
import ProgressRing from '../components/ProgressRing'
import { PageHeader, CriterionBar, InfoChip } from '../components/ui'
import { useStore } from '../store/useStore'
import { mifflinStTdee } from '../lib/nutrition'

// Preview / "soon" state. Nutrition logging arrives in v0.2; the macro numbers
// below are a sample so the surface reads true to the design. The calorie
// target is real (Mifflin-St Jeor from your profile) when your stats are set.
export default function Nourish() {
  const profile = useStore((s) => s.profile)
  const energy = mifflinStTdee(profile)
  const calorieTarget = energy?.target ?? 2400

  return (
    <div className="space-y-3 pt-1">
      <PageHeader eyebrow="Fuel the bloom" title="Nourish" right={<InfoChip tone="gold">soon</InfoChip>} />

      <section className="glass p-[18px]">
        <div className="flex items-center gap-4">
          <ProgressRing value={72} label="72" sublabel="score" size={88} />
          <div className="flex-1 space-y-2.5">
            <CriterionBar label="Protein" current={132} goal={170} unit="g" />
            <CriterionBar label="Carbs" current={180} goal={220} unit="g" />
            <CriterionBar label="Fat" current={54} goal={60} unit="g" />
          </div>
        </div>
        <div className="flex items-center justify-between mt-4 pt-3.5 border-t border-sand-700/40">
          <span className="text-sand-200/70 text-sm">Calories</span>
          <span className="font-display text-[1.1rem]">
            <span className="gold-text">2,040</span>
            <span className="text-sand-200/50 text-sm"> / {calorieTarget.toLocaleString()}</span>
          </span>
        </div>
      </section>

      <button className="btn-gold w-full flex items-center justify-center gap-2 text-base opacity-90">
        <ScanBarcode size={16} /> Scan a food
      </button>

      <p className="text-center text-sand-200/35 text-xs mt-3">
        Diary, micros &amp; calorie balance — coming in v0.2.
      </p>
    </div>
  )
}
