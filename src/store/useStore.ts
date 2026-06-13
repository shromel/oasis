import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getLevel, LEVELS } from '../data/program'

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

  setProfile: (p: Partial<Profile>) => void
  setLevel: (level: number) => void
  getTarget: (exerciseId: string, fallback: number | null) => number | null
  saveSession: (s: Omit<Session, 'id' | 'date'> & { date?: string }) => void
  deleteSession: (id: string) => void
  addRetest: (values: Record<string, number>, date?: string) => void
  logBodyweight: (kg: number, date?: string) => void
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

      exportData: () => {
        const { profile, currentLevel, targets, sessions, retests, bodyweight } = get()
        return JSON.stringify(
          { version: 1, exportedAt: todayISO(), profile, currentLevel, targets, sessions, retests, bodyweight },
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

/** Best recorded value for a metric across baseline + all retests. */
export function bestFor(state: OasisState, metric: string): number {
  let best = baselineValues[metric] ?? 0
  for (const r of state.retests) {
    const v = r.values[metric]
    if (typeof v === 'number' && v > best) best = v
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
