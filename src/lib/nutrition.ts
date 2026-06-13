// Nutrition foundation for the upcoming "Nourish" half. Pure, UI-free helpers:
// types, an Open Food Facts client, TDEE (Mifflin-St Jeor), RDA targets, and a
// 0-100 nutrition score. Wire these into the store + a Nourish page next.
// NOTE: not imported anywhere yet — it's a prepared, compiling scaffold.

import type { Profile, Sex, Goal } from '../store/useStore'

/** Canonical nutrient keys used across foods, targets and scoring. */
export type NutrientKey =
  | 'kcal' | 'protein' | 'carbs' | 'fat' | 'fiber' | 'sugar' | 'sodium'
  | 'vitaminC' | 'vitaminD' | 'vitaminA' | 'vitaminB12' | 'folate'
  | 'calcium' | 'iron' | 'magnesium' | 'potassium' | 'zinc'

export type Nutrients = Partial<Record<NutrientKey, number>>

export interface Food {
  id: string
  name: string
  brand?: string
  barcode?: string
  servingG: number | null // typical serving in grams, if known
  per100g: Nutrients // all values per 100 g (kcal in kcal; vitamins in mg/µg)
}

export type Meal = 'breakfast' | 'lunch' | 'dinner' | 'snack'

export interface FoodLog {
  id: string
  date: string // ISO
  meal: Meal
  food: Food
  grams: number
}

// ---------- Open Food Facts ----------

/** OFF nutriment field (per 100 g) → our key, with a unit multiplier to normalise. */
const OFF_MAP: { off: string; key: NutrientKey; mult: number }[] = [
  { off: 'energy-kcal_100g', key: 'kcal', mult: 1 },
  { off: 'proteins_100g', key: 'protein', mult: 1 },
  { off: 'carbohydrates_100g', key: 'carbs', mult: 1 },
  { off: 'fat_100g', key: 'fat', mult: 1 },
  { off: 'fiber_100g', key: 'fiber', mult: 1 },
  { off: 'sugars_100g', key: 'sugar', mult: 1 },
  { off: 'sodium_100g', key: 'sodium', mult: 1000 }, // g → mg
  { off: 'vitamin-c_100g', key: 'vitaminC', mult: 1000 }, // g → mg
  { off: 'vitamin-d_100g', key: 'vitaminD', mult: 1_000_000 }, // g → µg
  { off: 'vitamin-a_100g', key: 'vitaminA', mult: 1_000_000 }, // g → µg
  { off: 'vitamin-b12_100g', key: 'vitaminB12', mult: 1_000_000 }, // g → µg
  { off: 'vitamin-b9_100g', key: 'folate', mult: 1_000_000 }, // g → µg
  { off: 'calcium_100g', key: 'calcium', mult: 1000 },
  { off: 'iron_100g', key: 'iron', mult: 1000 },
  { off: 'magnesium_100g', key: 'magnesium', mult: 1000 },
  { off: 'potassium_100g', key: 'potassium', mult: 1000 },
  { off: 'zinc_100g', key: 'zinc', mult: 1000 },
]

/** Look up a product by barcode on Open Food Facts. Returns null if not found. */
export async function fetchOpenFoodFacts(barcode: string): Promise<Food | null> {
  const url = `https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(barcode)}.json`
  const res = await fetch(url)
  if (!res.ok) return null
  const data = await res.json()
  if (!data || data.status !== 1 || !data.product) return null
  const p = data.product
  const n = p.nutriments ?? {}
  const per100g: Nutrients = {}
  for (const { off, key, mult } of OFF_MAP) {
    const v = n[off]
    if (typeof v === 'number' && !Number.isNaN(v)) per100g[key] = v * mult
  }
  return {
    id: barcode,
    name: p.product_name || p.generic_name || 'Unknown food',
    brand: p.brands || undefined,
    barcode,
    servingG: typeof p.serving_quantity === 'number' ? p.serving_quantity : null,
    per100g,
  }
}

/** Scale a food's per-100g nutrients to an actual gram amount. */
export function scaleNutrients(per100g: Nutrients, grams: number): Nutrients {
  const out: Nutrients = {}
  const f = grams / 100
  for (const k of Object.keys(per100g) as NutrientKey[]) {
    const v = per100g[k]
    if (typeof v === 'number') out[k] = v * f
  }
  return out
}

/** Sum a day's logged foods into total nutrients. */
export function sumNutrients(logs: FoodLog[]): Nutrients {
  const total: Nutrients = {}
  for (const l of logs) {
    const scaled = scaleNutrients(l.food.per100g, l.grams)
    for (const k of Object.keys(scaled) as NutrientKey[]) {
      total[k] = (total[k] ?? 0) + (scaled[k] ?? 0)
    }
  }
  return total
}

// ---------- Energy / TDEE (Mifflin-St Jeor) ----------

/** PAL multipliers; default assumes the 4x/week calisthenics routine. */
export const ACTIVITY = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725 } as const
export type Activity = keyof typeof ACTIVITY

const GOAL_DELTA: Record<Goal, number> = { cut: -500, maintain: 0, bulk: 300 }

export interface EnergyTargets {
  bmr: number
  maintenance: number
  target: number // maintenance + goal delta
}

/** Mifflin-St Jeor BMR → maintenance (×activity) → goal-adjusted target. */
export function mifflinStTdee(profile: Profile, activity: Activity = 'moderate'): EnergyTargets | null {
  const { weightKg, heightCm, age, sex, goal } = profile
  if (!weightKg || !heightCm || !age) return null
  const s = sex === 'female' ? -161 : 5
  const bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + s
  const maintenance = bmr * ACTIVITY[activity]
  return { bmr: Math.round(bmr), maintenance: Math.round(maintenance), target: Math.round(maintenance + GOAL_DELTA[goal]) }
}

// ---------- RDA targets + nutrition score ----------

export interface Target {
  key: NutrientKey
  label: string
  unit: 'g' | 'mg' | 'µg'
  amount: number
}

/** Simplified adult RDA targets (tunable). Protein/fiber scale with bodyweight/energy. */
export function rdaTargets(profile: Profile): Target[] {
  const female = profile.sex === 'female'
  const weight = profile.weightKg ?? 75
  const proteinG = Math.round(weight * 1.6) // active-person target
  return [
    { key: 'protein', label: 'Protein', unit: 'g', amount: proteinG },
    { key: 'fiber', label: 'Fiber', unit: 'g', amount: female ? 25 : 38 },
    { key: 'vitaminC', label: 'Vitamin C', unit: 'mg', amount: female ? 75 : 90 },
    { key: 'vitaminD', label: 'Vitamin D', unit: 'µg', amount: 15 },
    { key: 'vitaminA', label: 'Vitamin A', unit: 'µg', amount: female ? 700 : 900 },
    { key: 'vitaminB12', label: 'Vitamin B12', unit: 'µg', amount: 2.4 },
    { key: 'folate', label: 'Folate', unit: 'µg', amount: 400 },
    { key: 'calcium', label: 'Calcium', unit: 'mg', amount: 1000 },
    { key: 'iron', label: 'Iron', unit: 'mg', amount: female ? 18 : 8 },
    { key: 'magnesium', label: 'Magnesium', unit: 'mg', amount: female ? 320 : 420 },
    { key: 'potassium', label: 'Potassium', unit: 'mg', amount: female ? 2600 : 3400 },
    { key: 'zinc', label: 'Zinc', unit: 'mg', amount: female ? 8 : 11 },
  ]
}

/**
 * Cronometer-style 0-100 completeness: average of how well each target is met
 * (capped at 100% each so megadosing one nutrient can't carry the score).
 */
export function nutritionScore(totals: Nutrients, targets: Target[]): number {
  if (targets.length === 0) return 0
  const sum = targets.reduce((acc, t) => {
    const have = totals[t.key] ?? 0
    return acc + Math.min(have / t.amount, 1)
  }, 0)
  return Math.round((sum / targets.length) * 100)
}

export type { Sex, Goal }
