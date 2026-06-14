import { useState } from 'react'
import { Plus, Star, Check, Trash2 } from 'lucide-react'
import { scaleNutrients, type Food } from '../lib/nutrition'

interface Props {
  food: Food
  mode?: 'add' | 'edit'
  initialGrams?: number
  mealLabel?: string
  saved?: boolean
  onToggleSave?: () => void
  onCancel: () => void
  onConfirm: (grams: number) => void
  onRemove?: () => void
}

/**
 * Bottom sheet to choose an amount and see live macros, then add/save a food.
 * Renders ABOVE the bottom nav (z-[60]) so the primary action is never hidden.
 */
export default function ServingSheet({
  food,
  mode = 'add',
  initialGrams,
  mealLabel,
  saved,
  onToggleSave,
  onCancel,
  onConfirm,
  onRemove,
}: Props) {
  const [grams, setGrams] = useState(String(initialGrams ?? food.servingG ?? 100))
  const g = Number(grams) || 0
  const n = scaleNutrients(food.per100g, g)

  // Quick-amount chips: serving multiples if we know a serving, else gram presets.
  const chips: { label: string; grams: number }[] = food.servingG
    ? [
        { label: '½ serving', grams: Math.round(food.servingG * 0.5) },
        { label: '1 serving', grams: food.servingG },
        { label: '2 servings', grams: food.servingG * 2 },
      ]
    : [50, 100, 150, 200].map((x) => ({ label: `${x} g`, grams: x }))

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center" onClick={onCancel}>
      <div className="absolute inset-0 bg-black/55" />
      <div
        className="relative w-full max-w-md glass !rounded-t-3xl !rounded-b-none p-5 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] animate-floatUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 rounded-full bg-sand-600/50 mx-auto mb-4" />

        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="min-w-0">
            <p className="text-sand-50 font-medium leading-tight">{food.name}</p>
            {food.brand && <p className="text-sand-200/50 text-xs mt-0.5">{food.brand}</p>}
          </div>
          {mode === 'add' && onToggleSave && (
            <button
              onClick={onToggleSave}
              className={`grid place-items-center w-9 h-9 rounded-xl border shrink-0 ${saved ? 'bg-gold/15 border-gold/50 text-gold' : 'border-sand-600/40 text-sand-200/60'}`}
              title="Save food"
            >
              <Star size={16} fill={saved ? 'currentColor' : 'none'} />
            </button>
          )}
        </div>

        {/* quick amounts */}
        <div className="flex flex-wrap gap-2 mb-3">
          {chips.map((c) => {
            const active = g === c.grams
            return (
              <button
                key={c.label}
                onClick={() => setGrams(String(c.grams))}
                className={`px-3 py-1.5 rounded-full text-xs border transition ${active ? 'bg-gold/15 border-gold/50 text-gold' : 'border-sand-600/40 text-sand-200/70'}`}
              >
                {c.label}
              </button>
            )
          })}
        </div>

        <label className="block text-[10px] uppercase tracking-wider text-sand-200/50 mb-1.5">Amount (grams)</label>
        <input
          autoFocus
          className="input mb-4 text-lg"
          inputMode="decimal"
          value={grams}
          onChange={(e) => setGrams(e.target.value.replace(/[^0-9.]/g, ''))}
        />

        <div className="grid grid-cols-4 gap-2 text-center mb-5">
          <Macro v={Math.round(n.kcal ?? 0)} l="kcal" c="gold-text" />
          <Macro v={Math.round(n.protein ?? 0)} l="protein" c="text-oasis-palm" />
          <Macro v={Math.round(n.carbs ?? 0)} l="carbs" c="text-oasis-water" />
          <Macro v={Math.round(n.fat ?? 0)} l="fat" c="text-gold" />
        </div>

        {mode === 'edit' ? (
          <div className="flex gap-3">
            <button onClick={onRemove} className="btn-ghost flex items-center gap-2 !text-dusk-rose !border-dusk-rose/40">
              <Trash2 size={17} /> Remove
            </button>
            <button onClick={() => g > 0 && onConfirm(g)} disabled={g <= 0} className="btn-gold flex-1 flex items-center justify-center gap-2 disabled:opacity-40">
              <Check size={18} /> Save
            </button>
          </div>
        ) : (
          <button onClick={() => g > 0 && onConfirm(g)} disabled={g <= 0} className="btn-gold w-full flex items-center justify-center gap-2 disabled:opacity-40">
            <Plus size={18} /> Add{mealLabel ? ` to ${mealLabel}` : ' to diary'}
          </button>
        )}
      </div>
    </div>
  )
}

function Macro({ v, l, c }: { v: number; l: string; c: string }) {
  return (
    <div className="glass-soft py-2.5">
      <p className={`font-display text-lg leading-none ${c}`}>{v}</p>
      <p className="text-sand-200/45 text-[10px] mt-1">{l}</p>
    </div>
  )
}
