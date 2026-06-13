// The training program, imported from the user's workout checklist.
// Levels 1-4, outdoor (bar) + home (floor) splits, warm-ups, exit criteria,
// retest battery, muscle map and timeline.

export type Unit = 'reps' | 'sec'

export interface Exercise {
  id: string
  name: string
  scheme: string // raw "Sets x Reps" text, shown verbatim
  sets: number | null // null = "max" / "build to" style
  repsLow: number | null
  repsHigh: number | null
  unit: Unit
  perSide: boolean
  notes?: string
}

export interface Block {
  id: string
  label: string
  emoji: string
  subtitle?: string
  exercises: Exercise[]
}

export interface ExitCriteria {
  pullups?: number
  dips?: number
  pushups?: number
  plankSec?: number
  text: string // human readable, used when criteria are non-numeric
}

export interface Level {
  id: number
  name: string
  tagline: string
  exit: ExitCriteria
  blocks: Block[]
}

const ex = (
  name: string,
  scheme: string,
  opts: Partial<Exercise> = {},
): Exercise => ({
  id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  name,
  scheme,
  sets: opts.sets ?? null,
  repsLow: opts.repsLow ?? null,
  repsHigh: opts.repsHigh ?? null,
  unit: opts.unit ?? 'reps',
  perSide: opts.perSide ?? false,
  notes: opts.notes,
})

export const WARMUPS: Block[] = [
  {
    id: 'warmup-outdoor',
    label: 'Before Outdoor',
    emoji: '🏖️',
    exercises: [
      ex('Scapular pulls on bar', '2x8', { sets: 2, repsLow: 8, repsHigh: 8, notes: 'Hang, shrug shoulders DOWN, no arm bend' }),
      ex('Arm + wrist circles', '30 sec each', { sets: 1, repsLow: 30, repsHigh: 30, unit: 'sec' }),
      ex('Pike pushup hold at bottom', '20 sec', { sets: 1, repsLow: 20, repsHigh: 20, unit: 'sec' }),
    ],
  },
  {
    id: 'warmup-home',
    label: 'Before Home',
    emoji: '🏠',
    exercises: [
      ex('Slow deep squats', '10', { sets: 1, repsLow: 10, repsHigh: 10 }),
      ex('Slow pushups', '10', { sets: 1, repsLow: 10, repsHigh: 10 }),
    ],
  },
]

export const LEVELS: Level[] = [
  {
    id: 1,
    name: 'Foundation',
    tagline: 'Build the base. Earn your first patch of green.',
    exit: { pullups: 8, dips: 10, pushups: 35, plankSec: 90, text: '8 pullups / 10 dips / 35 pushups / 90s plank' },
    blocks: [
      {
        id: 'l1-outdoor',
        label: 'Outdoor',
        emoji: '🏖️',
        subtitle: 'Bar work',
        exercises: [
          ex('Pullups', '5x2', { sets: 5, repsLow: 2, repsHigh: 2, notes: 'Alternate: chin-ups (underhand) every other session' }),
          ex('Negatives', '2x1', { sets: 2, repsLow: 1, repsHigh: 1, notes: 'After pullups — jump to top, 5 sec down' }),
          ex('Inverted rows', '3x8', { sets: 3, repsLow: 8, repsHigh: 8, notes: 'Body 45°, squeeze shoulder blades at top' }),
          ex('Dips', '3x3', { sets: 3, repsLow: 3, repsHigh: 3, notes: 'Elbows BACK, slight forward lean' }),
          ex('Pike pushups', '3x8', { sets: 3, repsLow: 8, repsHigh: 8, notes: 'Hips high, lower head toward floor' }),
          ex('Twisting knee raises', '3x8 per side', { sets: 3, repsLow: 8, repsHigh: 8, perSide: true, notes: 'Hang, knees up, rotate to each side controlled' }),
          ex('Leg raises', 'max after each set', { sets: 3, repsLow: null, repsHigh: null, notes: 'Straight legs, whatever you can manage' }),
        ],
      },
      {
        id: 'l1-home',
        label: 'Home',
        emoji: '🏠',
        subtitle: 'Floor work',
        exercises: [
          ex('Pushups', '4x15', { sets: 4, repsLow: 15, repsHigh: 15, notes: 'Chest to floor, elbows 45°, squeeze chest at top' }),
          ex('Squats deep', '3x20', { sets: 3, repsLow: 20, repsHigh: 20, notes: 'Slow and intentional' }),
          ex('Side plank', '3x30 sec per side', { sets: 3, repsLow: 30, repsHigh: 30, unit: 'sec', perSide: true, notes: 'Obliques' }),
          ex('Plank elbows', '3x45 sec', { sets: 3, repsLow: 45, repsHigh: 45, unit: 'sec' }),
          ex('Single-leg calf raises', '3x12 per leg', { sets: 3, repsLow: 12, repsHigh: 12, perSide: true, notes: 'Off a step, full range' }),
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'Strength Base',
    tagline: 'Volume climbs. Muscle-up groundwork begins.',
    exit: { pullups: 12, dips: 15, pushups: 45, plankSec: 120, text: '12 pullups / 15 dips / 45 pushups / 2 min plank' },
    blocks: [
      {
        id: 'l2-outdoor',
        label: 'Outdoor',
        emoji: '🏖️',
        subtitle: 'Bar work',
        exercises: [
          ex('Pullups', '5x max-1', { sets: 5, repsLow: null, repsHigh: null, notes: 'Aim 40-50 total reps/session. Alternate chin-ups' }),
          ex('Inverted rows', '4x12', { sets: 4, repsLow: 12, repsHigh: 12, notes: 'Body more HORIZONTAL now — harder, hits rear delts' }),
          ex('High pulls', '4x5', { sets: 4, repsLow: 5, repsHigh: 5, notes: 'Pull bar explosively to sternum — muscle-up prep begins' }),
          ex('Dips', '4x8-12', { sets: 4, repsLow: 8, repsHigh: 12, notes: 'Full depth, controlled' }),
          ex('Pike pushups', '4x12-15', { sets: 4, repsLow: 12, repsHigh: 15, notes: 'Should feel easy by now — progress below' }),
          ex('Wall handstand hold', '3x20-30 sec', { sets: 3, repsLow: 20, repsHigh: 30, unit: 'sec', notes: 'Kick up to wall, hold — shoulder stability' }),
          ex('Twisting knee raises', '4x10 per side', { sets: 4, repsLow: 10, repsHigh: 10, perSide: true }),
          ex('Straight leg raises', '4x8-12', { sets: 4, repsLow: 8, repsHigh: 12 }),
        ],
      },
      {
        id: 'l2-home',
        label: 'Home',
        emoji: '🏠',
        subtitle: 'Floor work',
        exercises: [
          ex('Decline pushups', '4x20-25', { sets: 4, repsLow: 20, repsHigh: 25, notes: 'Feet on couch/chair, upper chest + delts' }),
          ex('Archer pushups', '3x6-8 per side', { sets: 3, repsLow: 6, repsHigh: 8, perSide: true, notes: 'One arm extended, load shifts to working side' }),
          ex('Bulgarian split squats', '3x8-12 per leg', { sets: 3, repsLow: 8, repsHigh: 12, perSide: true, notes: 'Rear foot on couch/chair, lean slightly forward' }),
          ex('Jump squats', '3x8', { sets: 3, repsLow: 8, repsHigh: 8, notes: 'Explosive, land soft — builds power' }),
          ex('Side plank', '3x45 sec per side', { sets: 3, repsLow: 45, repsHigh: 45, unit: 'sec', perSide: true }),
          ex('Plank', '3x90 sec', { sets: 3, repsLow: 90, repsHigh: 90, unit: 'sec' }),
          ex('Single-leg calf raises', '3x15 per leg', { sets: 3, repsLow: 15, repsHigh: 15, perSide: true }),
        ],
      },
      {
        id: 'l2-muscleup',
        label: 'Muscle-Up Groundwork',
        emoji: '⚡',
        subtitle: '2 of 4 sessions, outdoor, FIRST while fresh',
        exercises: [
          ex('Scapular pullups', '3x8', { sets: 3, repsLow: 8, repsHigh: 8, notes: 'First move of a muscle-up — dead hang, shoulders down only' }),
          ex('High pulls to sternum', '4x5', { sets: 4, repsLow: 5, repsHigh: 5 }),
        ],
      },
    ],
  },
  {
    id: 3,
    name: 'Muscle-Up Prep',
    tagline: 'The flip-over begins. Chase the first clean rep.',
    exit: { text: 'First clean muscle-up' },
    blocks: [
      {
        id: 'l3-skill',
        label: 'Sessions A+B — Skill',
        emoji: '🏖️',
        subtitle: '2x/week, always FIRST',
        exercises: [
          ex('Explosive chest-to-bar pullups', '5x3-5', { sets: 5, repsLow: 3, repsHigh: 5, notes: 'Bar hits sternum every rep' }),
          ex('Negative muscle-ups', '4x2-3', { sets: 4, repsLow: 2, repsHigh: 3, notes: 'Start at top, lower slowly through transition' }),
          ex('Transition drills', '4x3-5', { sets: 4, repsLow: 3, repsHigh: 5, notes: 'Feet assisted, practice the flip-over' }),
          ex('Straight-bar dips', '4x5-8', { sets: 4, repsLow: 5, repsHigh: 8, notes: 'Press out on top of bar — muscle-up finish' }),
        ],
      },
      {
        id: 'l3-strength',
        label: 'Sessions C+D — Strength',
        emoji: '🏖️',
        subtitle: '2x/week',
        exercises: [
          ex('Weighted pullups (backpack)', '4x4-6', { sets: 4, repsLow: 4, repsHigh: 6, notes: 'Start 5kg water bottles' }),
          ex('Weighted chin-ups', '3x4-6', { sets: 3, repsLow: 4, repsHigh: 6 }),
          ex('Weighted dips', '4x5-8', { sets: 4, repsLow: 5, repsHigh: 8 }),
          ex('Pullup volume', '3x max', { sets: 3, repsLow: null, repsHigh: null, notes: 'Keep weekly total reps high' }),
          ex('Toes-to-bar', '4x8-10', { sets: 4, repsLow: 8, repsHigh: 10, notes: 'Straight legs touch the bar' }),
          ex('Twisting knee raises', '4x10 per side', { sets: 4, repsLow: 10, repsHigh: 10, perSide: true }),
        ],
      },
      {
        id: 'l3-push',
        label: 'Push + Shoulders',
        emoji: '🏖️',
        subtitle: 'Every session',
        exercises: [
          ex('Wall handstand pushups', '4x3-5', { sets: 4, repsLow: 3, repsHigh: 5, notes: 'Chest to wall, lower head to floor' }),
          ex('Dips', 'keep in every session', { sets: null, repsLow: null, repsHigh: null }),
        ],
      },
      {
        id: 'l3-home',
        label: 'Home',
        emoji: '🏠',
        subtitle: 'Floor work',
        exercises: [
          ex('Archer pushups', '3x10 per side', { sets: 3, repsLow: 10, repsHigh: 10, perSide: true }),
          ex('Pseudo planche pushups', '3x6-8', { sets: 3, repsLow: 6, repsHigh: 8, notes: 'Hands turned out, lean forward — brutal chest/delt/tricep' }),
          ex('Pistol squat progression', '3x3-5 per leg', { sets: 3, repsLow: 3, repsHigh: 5, perSide: true, notes: 'Assisted → box pistol → full' }),
          ex('Weighted Bulgarian split squats', '3x8 per leg', { sets: 3, repsLow: 8, repsHigh: 8, perSide: true, notes: 'Backpack loaded' }),
          ex('Side plank with hip dips', '3x12 per side', { sets: 3, repsLow: 12, repsHigh: 12, perSide: true }),
          ex('Plank', '3x2 min', { sets: 3, repsLow: 120, repsHigh: 120, unit: 'sec' }),
          ex('Single-leg calf raises weighted', '3x12 per leg', { sets: 3, repsLow: 12, repsHigh: 12, perSide: true, notes: 'Hold backpack' }),
        ],
      },
    ],
  },
  {
    id: 4,
    name: 'Athletic Peak',
    tagline: 'Muscle-ups in sets. Full aesthetic development.',
    exit: { text: 'Muscle-ups in sets + full aesthetic development' },
    blocks: [
      {
        id: 'l4-outdoor',
        label: 'Outdoor',
        emoji: '🏖️',
        subtitle: 'Bar work',
        exercises: [
          ex('Muscle-up clusters', 'build to 5+ unbroken', { sets: null, repsLow: 5, repsHigh: null, notes: '2 reps, 20 sec rest, repeat' }),
          ex('Weighted pullups', '4x4-6', { sets: 4, repsLow: 4, repsHigh: 6, notes: 'Target: bodyweight +20-25kg' }),
          ex('Weighted dips', '4x5-8', { sets: 4, repsLow: 5, repsHigh: 8, notes: 'Target: bodyweight +25-30kg' }),
          ex('Front lever progression', '3x10-15 sec', { sets: 3, repsLow: 10, repsHigh: 15, unit: 'sec', notes: 'Tuck → advanced tuck → single leg → full' }),
          ex('Toes-to-bar', '4x12-15', { sets: 4, repsLow: 12, repsHigh: 15 }),
          ex('Hanging windshield wipers', '3x8 per side', { sets: 3, repsLow: 8, repsHigh: 8, perSide: true, notes: 'Straight legs, rotate — advanced oblique work' }),
        ],
      },
      {
        id: 'l4-home',
        label: 'Home',
        emoji: '🏠',
        subtitle: 'Floor work',
        exercises: [
          ex('Freestanding handstand work', 'daily practice', { sets: null, repsLow: null, repsHigh: null, notes: 'Kick-up practice, balance, wall to free' }),
          ex('Freestanding HSPU progression', '4x3-5', { sets: 4, repsLow: 3, repsHigh: 5, notes: 'Months of wall HSPU required first' }),
          ex('Pseudo planche pushups', '4x8-10', { sets: 4, repsLow: 8, repsHigh: 10 }),
          ex('Full pistol squats', '3x5-8 per leg', { sets: 3, repsLow: 5, repsHigh: 8, perSide: true }),
          ex('Pistol squats weighted', '3x5 per leg', { sets: 3, repsLow: 5, repsHigh: 5, perSide: true, notes: 'Backpack' }),
          ex('Single-leg calf raises weighted', '3x15 per leg', { sets: 3, repsLow: 15, repsHigh: 15, perSide: true }),
        ],
      },
    ],
  },
]

export const BASELINE = '3 pullups / 4 dips / 25 pushups / 60s plank / 10 knee raises'

export const PROGRESSION_RULE =
  'Hit top of rep range 2 sessions in a row → add 1 rep next session.'

export interface RetestItem {
  id: string
  label: string
  unit: Unit
}

export const RETEST_BATTERY: RetestItem[] = [
  { id: 'pullups', label: 'Max strict pullups', unit: 'reps' },
  { id: 'dips', label: 'Max dips', unit: 'reps' },
  { id: 'pushups', label: 'Max pushups', unit: 'reps' },
  { id: 'plankSec', label: 'Plank hold', unit: 'sec' },
  { id: 'legraises', label: 'Max straight leg raises', unit: 'reps' },
]

export const MUSCLE_MAP: { muscle: string; exercise: string; introduced: string }[] = [
  { muscle: 'Lats', exercise: 'Pullups (wide grip)', introduced: 'Level 1' },
  { muscle: 'Biceps', exercise: 'Chin-ups (underhand)', introduced: 'Level 1, alternate' },
  { muscle: 'Triceps', exercise: 'Dips (upright torso)', introduced: 'Level 1' },
  { muscle: 'Chest', exercise: 'Pushups → decline → archer → pseudo planche', introduced: 'Level 1→4' },
  { muscle: 'Front delts', exercise: 'Pike pushups → wall HSPU → freestanding HSPU', introduced: 'Level 1→4' },
  { muscle: 'Side delts', exercise: 'Wall HSPU wide hands', introduced: 'Level 2→4' },
  { muscle: 'Rear delts + rhomboids', exercise: 'Inverted rows (horizontal)', introduced: 'Level 1→4' },
  { muscle: 'Abs', exercise: 'Leg raises → toes-to-bar', introduced: 'Level 1→4' },
  { muscle: 'Obliques', exercise: 'Twisting knee raises → windshield wipers', introduced: 'Level 1→4' },
  { muscle: 'Quads', exercise: 'Squats → Bulgarian → pistol → weighted', introduced: 'Level 1→4' },
  { muscle: 'Glutes', exercise: 'Bulgarian split squats + squats deep', introduced: 'Level 1→4' },
  { muscle: 'Calves', exercise: 'Single-leg calf raises off step', introduced: 'Level 1→4' },
]

export const TIMELINE: { milestone: string; from: string }[] = [
  { milestone: 'Exit Level 1', from: '6-10 weeks' },
  { milestone: 'Exit Level 2', from: '3-5 months' },
  { milestone: 'First wall handstand pushup', from: '3-5 months' },
  { milestone: 'First muscle-up', from: '8-15 months' },
  { milestone: 'Muscle-ups in sets', from: '12-24 months' },
  { milestone: 'Freestanding HSPU', from: '18-36 months' },
]

export const getLevel = (id: number) => LEVELS.find((l) => l.id === id) ?? LEVELS[0]
