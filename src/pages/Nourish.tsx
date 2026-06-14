import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Bookmark, Flame, ChevronRight } from 'lucide-react'
import ProgressRing from '../components/ProgressRing'
import ServingSheet from '../components/ServingSheet'
import { PageHeader, CriterionBar } from '../components/ui'
import { useStore, foodLogForDay, dailyTotals } from '../store/useStore'
import { computeTargets, scaleNutrients, sumNutrients, type Meal, type FoodLog } from '../lib/nutrition'

const MEALS: { id: Meal; label: string }[] = [
  { id: 'breakfast', label: 'Breakfast' },
  { id: 'lunch', label: 'Lunch' },
  { id: 'dinner', label: 'Dinner' },
  { id: 'snack', label: 'Snacks' },
]

export default function Nourish() {
  const { profile, foodLog, savedMeals, removeFoodLog, setFoodGrams, saveMeal } = useStore()
  const [editing, setEditing] = useState<FoodLog | null>(null)
  const targets = computeTargets(profile)
  const totals = dailyTotals(foodLog)
  const today = foodLogForDay(foodLog)

  const kcal = Math.round(totals.kcal ?? 0)
  const target = targets?.calories ?? 0
  const remaining = target - kcal
  const ringPct = target ? (kcal / target) * 100 : 0

  return (
    <div className="space-y-3 pt-1">
      <PageHeader
        eyebrow="Fuel the bloom"
        title="Nourish"
        right={<span className="text-sand-200/50 text-xs">{new Date().toLocaleDateString(undefined, { weekday: 'short', day: 'numeric' })}</span>}
      />

      {/* Daily targets */}
      <section className="glass p-[18px]">
        <div className="flex items-center gap-4">
          <ProgressRing value={ringPct} label={kcal.toLocaleString()} sublabel="kcal" size={92} />
          <div className="flex-1 space-y-2.5">
            <CriterionBar label="Protein" current={Math.round(totals.protein ?? 0)} goal={targets?.protein ?? 1} unit="g" />
            <CriterionBar label="Carbs" current={Math.round(totals.carbs ?? 0)} goal={targets?.carbs ?? 1} unit="g" />
            <CriterionBar label="Fat" current={Math.round(totals.fat ?? 0)} goal={targets?.fat ?? 1} unit="g" />
          </div>
        </div>
        <div className="flex items-center justify-between mt-4 pt-3.5 border-t border-sand-700/40">
          <span className="text-sand-200/70 text-sm flex items-center gap-1.5">
            <Flame size={14} className="text-dusk-rose" /> {kcal.toLocaleString()} of {target.toLocaleString()}
          </span>
          <span className={`font-display text-[1.1rem] ${remaining >= 0 ? 'gold-text' : 'text-dusk-rose'}`}>
            {remaining >= 0 ? `${remaining.toLocaleString()} left` : `${Math.abs(remaining).toLocaleString()} over`}
          </span>
        </div>
      </section>

      {/* Meals */}
      {MEALS.map((m) => {
        const items = today.filter((l) => l.meal === m.id)
        const mealKcal = Math.round(sumNutrients(items).kcal ?? 0)
        return (
          <section key={m.id} className="glass overflow-hidden">
            <div className="flex items-center justify-between px-4 pt-3.5 pb-2">
              <div className="flex items-baseline gap-2">
                <h2 className="heading text-base">{m.label}</h2>
                {mealKcal > 0 && <span className="text-sand-200/50 text-xs">{mealKcal} kcal</span>}
              </div>
              <div className="flex items-center gap-1">
                {items.length > 0 && (
                  <button
                    onClick={() => {
                      const name = prompt(`Save "${m.label}" as a reusable meal — name it:`)
                      if (name?.trim()) saveMeal(name.trim(), items.map((i) => ({ food: i.food, grams: i.grams })))
                    }}
                    className="grid place-items-center w-8 h-8 rounded-xl text-sand-200/55"
                    title="Save as meal"
                  >
                    <Bookmark size={15} />
                  </button>
                )}
                <Link to={`/nourish/add?meal=${m.id}`} className="grid place-items-center w-8 h-8 rounded-xl bg-gold/15 text-gold">
                  <Plus size={17} />
                </Link>
              </div>
            </div>
            {items.length > 0 && (
              <ul className="divide-y divide-sand-700/25 border-t border-sand-700/30">
                {items.map((l) => {
                  const n = scaleNutrients(l.food.per100g, l.grams)
                  return (
                    <li key={l.id}>
                      <button onClick={() => setEditing(l)} className="w-full flex items-center gap-3 px-4 py-2.5 text-left active:bg-sand-800/20 transition">
                        <div className="flex-1 min-w-0">
                          <p className="text-sand-50 text-sm truncate">{l.food.name}</p>
                          <p className="text-sand-200/50 text-xs mt-0.5">
                            {l.grams} g · {Math.round(n.kcal ?? 0)} kcal · P{Math.round(n.protein ?? 0)} C{Math.round(n.carbs ?? 0)} F{Math.round(n.fat ?? 0)}
                          </p>
                        </div>
                        <ChevronRight size={15} className="text-sand-300/30 shrink-0" />
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </section>
        )
      })}

      {savedMeals.length > 0 && (
        <p className="text-center text-sand-200/40 text-xs pt-1">
          {savedMeals.length} saved meal{savedMeals.length > 1 ? 's' : ''} · tap + on a meal to quick-log
        </p>
      )}

      {editing && (
        <ServingSheet
          food={editing.food}
          mode="edit"
          initialGrams={editing.grams}
          onCancel={() => setEditing(null)}
          onConfirm={(g) => { setFoodGrams(editing.id, g); setEditing(null) }}
          onRemove={() => { removeFoodLog(editing.id); setEditing(null) }}
        />
      )}
    </div>
  )
}
