import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getLevel, LEVELS } from '../data/program'
import { sumNutrients, type Food, type FoodLog, type Meal, type SavedMeal, type Nutrients, type ActivityLevel } from '../lib/nutrition'

export type Goal = 'cut' | 'maintain' | 'bulk'
export type Sex = 'male' | 'female'

export interface Profile {
  name: string
  weightKg: number | null
  heightCm: number | null
  age: number | null
  sex: Sex
  goal: Goal
  startedAt: string // ISO date the journey began
  // Nutrition / goal questionnaire (added v0.2; optional for back-compat)
  activity?: ActivityLevel
  rateKgPerWeek?: number // + gain, - lose, 0 maintain
  targetWeightKg?: number | null
  proteinPerKg?: number
  onboarded?: boolean
}

export interface LoggedEntry {
  exerciseId: string
  name: string
  unit: 'reps' | 'sec'
  perSide: boolean
  target: number | null // top of range at time of logging
  sets: number[] // value per set (reps or seconds)
}

export interface Session {
  id: string
  date: string // ISO
  level: number
  blockId: string
  blockLabel: string
  emoji: string
  entries: LoggedEntry[]
  note?: string
  durationMin?: number
}

export interface Retest {
  id: string
  date: string
  values: Record<string, number>
}

export interface BodyweightEntry {
  date: string
  kg: number
}

interface TargetState {
  reps: number
  hitStreak: number
}

export interface OasisState {
  profile: Profile
  currentLevel: number
  targets: Record<string, TargetState> // exerciseId -> auto-progressed target
  sessions: Session[]
  retests: Retest[]
  bodyweight: BodyweightEntry[]
  // Nutrition (v0.2)
  foodLog: FoodLog[]
  savedFoods: Food[]
  savedMeals: SavedMeal[]

  setProfile: (p: Partial<Profile>) => void
  setLevel: (level: number) => void
  getTarget: (exerciseId: string, fallback: number | null) => number | null
  saveSession: (s: Omit<Session, 'id' | 'date'> & { date?: string }) => void
  updateSession: (id: string, patch: { entries: LoggedEntry[]; note?: string }) => void
  deleteSession: (id: string) => void
  addRetest: (values: Record<string, number>, date?: string) => void
  logBodyweight: (kg: number, date?: string) => void
  // Nutrition actions
  addFoodLog: (meal: Meal, food: Food, grams: number, date?: string) => void
  removeFoodLog: (id: string) => void
  setFoodGrams: (id: string, grams: number) => void
  toggleSavedFood: (food: Food) => void
  saveMeal: (name: string, items: { food: Food; grams: number }[]) => void
  deleteMeal: (id: string) => void
  logSavedMeal: (mealId: string, slot: Meal, date?: string) => void
  exportData: () => string
  importData: (json: string) => boolean
  resetAll: () => void
}

const todayISO = () => new Date().toISOString()
const uid = () => Math.random().toString(36).slice(2, 10)

const DEFAULT_PROFILE: Profile = {
  name: '',
  weightKg: null,
  heightCm: null,
  age: null,
  sex: 'male',
  goal: 'maintain',
  startedAt: todayISO(),
  activity: 'moderate',
  rateKgPerWeek: 0,
  targetWeightKg: null,
  proteinPerKg: 2.0,
  onboarded: false,
}

export const useStore = create<OasisState>()(
  persist(
    (set, get) => ({
      profile: DEFAULT_PROFILE,
      currentLevel: 1,
      targets: {},
      sessions: [],
      retests: [],
      bodyweight: [],
      foodLog: [],
      savedFoods: [],
      savedMeals: [],

      setProfile: (p) => set((s) => ({ profile: { ...s.profile, ...p } })),

      setLevel: (level) =>
        set(() => ({ currentLevel: Math.min(Math.max(level, 1), LEVELS.length) })),

      getTarget: (exerciseId, fallback) => {
        const t = get().targets[exerciseId]
        return t ? t.reps : fallback
      },

      saveSession: (input) => {
        const session: Session = { id: uid(), date: input.date ?? todayISO(), ...input }
        set((s) => {
          // Auto-progression: if every working set met the target top, bump streak.
          const targets = { ...s.targets }
          for (const entry of session.entries) {
            if (entry.target == null || entry.sets.length === 0) continue
            const allHit = entry.sets.every((v) => v >= (entry.target as number))
            const prev = targets[entry.exerciseId] ?? { reps: entry.target, hitStreak: 0 }
            if (allHit) {
              const hitStreak = prev.hitStreak + 1
              if (hitStreak >= 2) {
                targets[entry.exerciseId] = { reps: prev.reps + 1, hitStreak: 0 }
              } else {
                targets[entry.exerciseId] = { reps: prev.reps, hitStreak }
              }
            } else {
              targets[entry.exerciseId] = { reps: prev.reps, hitStreak: 0 }
            }
          }
          return { sessions: [session, ...s.sessions], targets }
        })
      },

      // Editing an existing session only revises the recorded numbers/note.
      // Auto-progression targets are intentionally left untouched (they were
      // settled when the session was first banked) to avoid double-counting.
      updateSession: (id, patch) =>
        set((s) => ({
          sessions: s.sessions.map((x) =>
            x.id === id ? { ...x, entries: patch.entries, note: patch.note } : x,
          ),
        })),

      deleteSession: (id) =>
        set((s) => ({ sessions: s.sessions.filter((x) => x.id !== id) })),

      addRetest: (values, date) =>
        set((s) => ({
          retests: [{ id: uid(), date: date ?? todayISO(), values }, ...s.retests],
        })),

      logBodyweight: (kg, date) =>
        set((s) => ({
          bodyweight: [{ date: date ?? todayISO(), kg }, ...s.bodyweight],
        })),

      // ----- Nutrition -----
      addFoodLog: (meal, food, grams, date) =>
        set((s) => ({
          foodLog: [{ id: uid(), date: date ?? todayISO(), meal, food, grams }, ...s.foodLog],
        })),

      removeFoodLog: (id) => set((s) => ({ foodLog: s.foodLog.filter((x) => x.id !== id) })),

      setFoodGrams: (id, grams) =>
        set((s) => ({ foodLog: s.foodLog.map((x) => (x.id === id ? { ...x, grams } : x)) })),

      toggleSavedFood: (food) =>
        set((s) => {
          const key = food.barcode ?? food.id
          const exists = s.savedFoods.some((f) => (f.barcode ?? f.id) === key)
          return { savedFoods: exists ? s.savedFoods.filter((f) => (f.barcode ?? f.id) !== key) : [food, ...s.savedFoods] }
        }),

      saveMeal: (name, items) =>
        set((s) => ({ savedMeals: [{ id: uid(), name, items }, ...s.savedMeals] })),

      deleteMeal: (id) => set((s) => ({ savedMeals: s.savedMeals.filter((m) => m.id !== id) })),

      logSavedMeal: (mealId, slot, date) =>
        set((s) => {
          const m = s.savedMeals.find((x) => x.id === mealId)
          if (!m) return {}
          const d = date ?? todayISO()
          const entries: FoodLog[] = m.items.map((it) => ({ id: uid(), date: d, meal: slot, food: it.food, grams: it.grams }))
          return { foodLog: [...entries, ...s.foodLog] }
        }),

      exportData: () => {
        const { profile, currentLevel, targets, sessions, retests, bodyweight, foodLog, savedFoods, savedMeals } = get()
        return JSON.stringify(
          { version: 2, exportedAt: todayISO(), profile, currentLevel, targets, sessions, retests, bodyweight, foodLog, savedFoods, savedMeals },
          null,
          2,
        )
      },

      importData: (json) => {
        try {
          const data = JSON.parse(json)
          if (!data || typeof data !== 'object') return false
          set(() => ({
            profile: { ...DEFAULT_PROFILE, ...(data.profile ?? {}) },
            currentLevel: data.currentLevel ?? 1,
            targets: data.targets ?? {},
            sessions: data.sessions ?? [],
            retests: data.retests ?? [],
            bodyweight: data.bodyweight ?? [],
            foodLog: data.foodLog ?? [],
            savedFoods: data.savedFoods ?? [],
            savedMeals: data.savedMeals ?? [],
          }))
          return true
        } catch {
          return false
        }
      },

      resetAll: () =>
        set(() => ({
          profile: { ...DEFAULT_PROFILE, startedAt: todayISO() },
          currentLevel: 1,
          targets: {},
          sessions: [],
          retests: [],
          bodyweight: [],
          foodLog: [],
          savedFoods: [],
          savedMeals: [],
        })),
    }),
    { name: 'oasis-store-v1' },
  ),
)

// ---------- Derived selectors (pure helpers over state) ----------

export const baselineValues: Record<string, number> = {
  pullups: 3,
  dips: 4,
  pushups: 25,
  plankSec: 60,
  legraises: 10,
}

// Which logged exercises demonstrate each exit-criterion metric (best set ≈ that
// day's demonstrated max). Ids are the slugified exercise names from program.ts.
const METRIC_EXERCISES: Record<string, string[]> = {
  pullups: ['pullups', 'chin-ups', 'weighted-pullups', 'weighted-chin-ups', 'explosive-chest-to-bar-pullups', 'pullup-volume'],
  dips: ['dips', 'weighted-dips', 'straight-bar-dips'],
  pushups: ['pushups', 'decline-pushups'],
  plankSec: ['plank-elbows', 'plank'],
}

/**
 * Best demonstrated value for a metric across baseline, retests, AND logged
 * sessions (best set of any exercise that demonstrates the metric). Baseline is
 * a floor, so low-rep/high-set logging can never drag the estimate below your
 * starting test. Keeps the hero trajectory, the level ring, and the Progress
 * "current bests" all consistent.
 */
export function bestFor(state: OasisState, metric: string): number {
  let best = baselineValues[metric] ?? 0
  for (const r of state.retests) {
    const v = r.values[metric]
    if (typeof v === 'number' && v > best) best = v
  }
  const ids = METRIC_EXERCISES[metric]
  if (ids) {
    for (const s of state.sessions) {
      for (const e of s.entries) {
        if (ids.includes(e.exerciseId) && e.sets.length) {
          const m = Math.max(...e.sets)
          if (m > best) best = m
        }
      }
    }
  }
  return best
}

/** Day streak: consecutive days (ending today or yesterday) with a session. */
export function computeStreak(sessions: Session[]): number {
  if (sessions.length === 0) return 0
  const days = new Set(sessions.map((s) => s.date.slice(0, 10)))
  let streak = 0
  const cursor = new Date()
  // allow today OR yesterday to start the streak so it doesn't reset mid-day
  const todayKey = cursor.toISOString().slice(0, 10)
  if (!days.has(todayKey)) {
    cursor.setDate(cursor.getDate() - 1)
    if (!days.has(cursor.toISOString().slice(0, 10))) return 0
  }
  while (days.has(cursor.toISOString().slice(0, 10))) {
    streak++
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

/** Sessions logged in the last 7 days. */
export function sessionsThisWeek(sessions: Session[]): number {
  const weekAgo = Date.now() - 7 * 864e5
  return sessions.filter((s) => new Date(s.date).getTime() >= weekAgo).length
}

/** Local-day key (YYYY-MM-DD) used to decide whether two sessions are "same day". */
export const dayKey = (iso: string | Date = new Date()): string => {
  const d = typeof iso === 'string' ? new Date(iso) : iso
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

/** The session (if any) already logged today for a given block. */
export function todaySessionForBlock(sessions: Session[], blockId: string): Session | undefined {
  const key = dayKey()
  return sessions.find((s) => s.blockId === blockId && dayKey(s.date) === key)
}

// ---------- Nutrition selectors ----------

/** All food logged on a given local day. */
export function foodLogForDay(log: FoodLog[], date: Date | string = new Date()): FoodLog[] {
  const key = dayKey(date)
  return log.filter((l) => dayKey(l.date) === key)
}

/** Summed macros for a given day's food log. */
export function dailyTotals(log: FoodLog[], date: Date | string = new Date()): Nutrients {
  return sumNutrients(foodLogForDay(log, date))
}

/** Is this food already in saved favourites? */
export function isSavedFood(savedFoods: Food[], food: Food): boolean {
  const key = food.barcode ?? food.id
  return savedFoods.some((f) => (f.barcode ?? f.id) === key)
}

const avg = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0)
const clamp01 = (n: number) => Math.max(0, Math.min(1, n))

export interface ProgressPoint {
  date: string
  pct: number
  label: string
}

/**
 * Trajectory toward the current level's exit, **derived from your logs** (best
 * set per metric, accumulated as running personal bests, also folding in
 * baseline + retests). Distinct from the Progress-tab strength curve, which
 * plots raw retest numbers. Empty for levels whose exit isn't numeric (L3/L4).
 */
export function levelProgressSeries(state: OasisState): ProgressPoint[] {
  const lvl = getLevel(state.currentLevel)
  const exit = lvl.exit as unknown as Record<string, number | undefined>
  const metrics = ['pullups', 'dips', 'pushups', 'plankSec'].filter((m) => exit[m] != null)
  if (metrics.length === 0) return []

  type Ev = { time: number; date: string; metric: string; value: number }
  const events: Ev[] = []
  const startTime = new Date(state.profile.startedAt).getTime()
  for (const m of metrics) {
    events.push({ time: startTime, date: state.profile.startedAt, metric: m, value: baselineValues[m] ?? 0 })
  }
  for (const s of state.sessions) {
    for (const e of s.entries) {
      if (!e.sets.length) continue
      const metric = metrics.find((m) => METRIC_EXERCISES[m]?.includes(e.exerciseId))
      if (!metric) continue
      events.push({ time: new Date(s.date).getTime(), date: s.date, metric, value: Math.max(...e.sets) })
    }
  }
  for (const r of state.retests) {
    for (const m of metrics) {
      const v = r.values[m]
      if (typeof v === 'number') events.push({ time: new Date(r.date).getTime(), date: r.date, metric: m, value: v })
    }
  }
  events.sort((a, b) => a.time - b.time)

  const best: Record<string, number> = {}
  for (const m of metrics) best[m] = baselineValues[m] ?? 0
  const out: ProgressPoint[] = []
  for (const ev of events) {
    best[ev.metric] = Math.max(best[ev.metric] ?? 0, ev.value)
    const pct = Math.round(
      (metrics.reduce((a, m) => a + Math.min(best[m] / (exit[m] as number), 1), 0) / metrics.length) * 100,
    )
    const label = new Date(ev.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    const k = dayKey(ev.date)
    if (out.length && dayKey(out[out.length - 1].date) === k) {
      out[out.length - 1] = { date: ev.date, pct, label }
    } else {
      out.push({ date: ev.date, pct, label })
    }
  }
  return out
}

/**
 * "Bloom" — how lush the oasis is. Driven mainly by *training momentum* read
 * from your logs (is your per-exercise volume trending up?), blended with
 * structural journey progress through the 4 levels. Falls back to journey
 * progress before you have enough logs to show a trend.
 */
export function bloomScore(state: OasisState): { value: number; trendPct: number | null } {
  const { pct } = levelProgress(state)
  const journey = clamp01((state.currentLevel - 1 + pct / 100) / LEVELS.length)

  // Collect per-exercise session volumes (total reps/seconds across sets).
  const byEx = new Map<string, { date: string; vol: number }[]>()
  for (const s of state.sessions) {
    for (const e of s.entries) {
      const vol = e.sets.reduce((a, b) => a + (b || 0), 0)
      if (vol <= 0) continue
      const arr = byEx.get(e.exerciseId) ?? []
      arr.push({ date: s.date, vol })
      byEx.set(e.exerciseId, arr)
    }
  }

  const ratios: number[] = []
  byEx.forEach((arr) => {
    if (arr.length < 2) return
    arr.sort((a, b) => a.date.localeCompare(b.date)) // oldest first
    const early = avg(arr.slice(0, Math.min(2, arr.length - 1)).map((x) => x.vol))
    const recent = avg(arr.slice(-2).map((x) => x.vol))
    if (early > 0) ratios.push(recent / early)
  })

  if (ratios.length === 0) {
    return { value: Math.max(0.08, journey), trendPct: null }
  }

  const meanRatio = avg(ratios)
  const momentum = clamp01((meanRatio - 0.6) / 0.8) // -40% → 0, +40% → 1
  const value = clamp01(0.6 * momentum + 0.4 * journey)
  return { value: Math.max(0.08, value), trendPct: Math.round((meanRatio - 1) * 100) }
}

/** 0-100 progress toward the current level's numeric exit criteria. */
export function levelProgress(state: OasisState): { pct: number; items: { key: string; label: string; current: number; goal: number; unit: string }[] } {
  const lvl = getLevel(state.currentLevel)
  const map: { key: string; label: string; unit: string }[] = [
    { key: 'pullups', label: 'Pullups', unit: '' },
    { key: 'dips', label: 'Dips', unit: '' },
    { key: 'pushups', label: 'Pushups', unit: '' },
    { key: 'plankSec', label: 'Plank', unit: 's' },
  ]
  const exit = lvl.exit as unknown as Record<string, number | undefined>
  const items = map
    .filter((m) => exit[m.key] != null)
    .map((m) => {
      const goal = exit[m.key] as number
      return { ...m, current: bestFor(state, m.key), goal }
    })
  if (items.length === 0) return { pct: 0, items: [] }
  const pct = Math.round(
    (items.reduce((a, i) => a + Math.min(i.current / i.goal, 1), 0) / items.length) * 100,
  )
  return { pct, items }
}
