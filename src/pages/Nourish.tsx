import { ScanBarcode, Donut, Gauge, Scale } from 'lucide-react'

const previews = [
  { icon: ScanBarcode, title: 'Barcode scanning', desc: 'Point your phone camera at any product — instant macros & micros via Open Food Facts.' },
  { icon: Donut, title: 'Macros & micros', desc: 'Protein / carbs / fat rings plus full vitamin & mineral tracking, Cronometer-style.' },
  { icon: Gauge, title: 'Nutrition score', desc: 'A daily 0–100 quality score from how completely you hit your micronutrient targets.' },
  { icon: Scale, title: 'Calorie balance', desc: 'Surplus / deficit vs a target computed from your stats, themed to your bulk or cut.' },
]

export default function Nourish() {
  return (
    <div className="space-y-5 pt-4">
      <header>
        <h1 className="heading text-3xl">Nourish</h1>
        <p className="text-sand-200/60 text-sm mt-1">The other half of the oasis — arriving next.</p>
      </header>

      <section className="glass p-6 text-center">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gold/15 grid place-items-center shadow-glow mb-4">
          <ScanBarcode size={30} className="text-gold" />
        </div>
        <h2 className="heading text-xl">Fuel the bloom</h2>
        <p className="text-sand-200/60 text-sm mt-2 max-w-xs mx-auto">
          Training grows the oasis; nutrition keeps it alive. This is scaffolded and next on the roadmap.
        </p>
      </section>

      <div className="grid gap-3">
        {previews.map((p) => (
          <div key={p.title} className="glass p-4 flex gap-4 items-start">
            <div className="w-11 h-11 shrink-0 rounded-2xl bg-sand-800/50 grid place-items-center">
              <p.icon size={20} className="text-gold" />
            </div>
            <div>
              <p className="text-sand-50 font-medium">{p.title}</p>
              <p className="text-sand-200/55 text-sm mt-0.5 leading-snug">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
