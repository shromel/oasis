// Oasis — real program & log data, from the user's workout_checklist.md.
// Levels are L1–L4. Each level splits into 🏖️ Outdoor (bar) + 🏠 Home (floor).
// Exit criteria & exercises are the user's actual plan.

window.OASIS_DATA = (function () {
  const LEVELS = [
    {
      id: 1,
      subtitle: 'Foundation',
      tagline: 'Build the base — clean reps, honest range, no momentum.',
      exit: { pullups: 8, dips: 10, pushups: 35, plank: 90 },
      exitText: '8 pullups · 10 dips · 35 pushups · 90s plank',
      blocks: [
        {
          id: 'l1-out', place: 'outdoor', emoji: '🏖️', label: 'Outdoor', subtitle: 'Bar',
          exercises: [
            { id: 'pullups', name: 'Pullups', scheme: '5 × 2', repsHigh: 2, unit: 'reps', notes: 'Alternate chin-ups every other session' },
            { id: 'negatives', name: 'Negatives', scheme: '2 × 1', repsHigh: 1, unit: 'reps', notes: 'Jump to top, 5s down' },
            { id: 'rows', name: 'Inverted rows', scheme: '3 × 8', repsHigh: 8, unit: 'reps', notes: 'Body 45°, squeeze blades' },
            { id: 'dips', name: 'Dips', scheme: '3 × 3', repsHigh: 3, unit: 'reps', notes: 'Elbows back, slight lean' },
            { id: 'knee', name: 'Twisting knee raises', scheme: '3 × 8 / side', repsHigh: 8, unit: 'reps' },
            { id: 'legraise', name: 'Leg raises', scheme: 'max', repsHigh: 10, unit: 'reps', notes: 'After each knee-raise set' },
          ],
        },
        {
          id: 'l1-home', place: 'home', emoji: '🏠', label: 'Home', subtitle: 'Floor',
          exercises: [
            { id: 'pushups', name: 'Pushups', scheme: '4 × 15', repsHigh: 15, unit: 'reps', notes: 'Chest to floor, elbows 45°' },
            { id: 'pike', name: 'Pike pushups', scheme: '3 × 8', repsHigh: 8, unit: 'reps', notes: 'Hips high, head toward floor' },
            { id: 'squats', name: 'Squats deep', scheme: '3 × 20', repsHigh: 20, unit: 'reps' },
            { id: 'sideplank', name: 'Side plank', scheme: '3 × 30s / side', repsHigh: 30, unit: 'sec' },
            { id: 'plank', name: 'Plank (elbows)', scheme: '3 × 45s', repsHigh: 45, unit: 'sec' },
            { id: 'calf', name: 'Single-leg calf raises', scheme: '3 × 12 / leg', repsHigh: 12, unit: 'reps' },
          ],
        },
      ],
    },
    {
      id: 2,
      subtitle: 'Strength Base',
      tagline: 'Add load & control — slow eccentrics, first skills.',
      exit: { pullups: 12, dips: 15, pushups: 45, plank: 120 },
      exitText: '12 pullups · 15 dips · 45 pushups · 2 min plank',
      blocks: [
        {
          id: 'l2-out', place: 'outdoor', emoji: '🏖️', label: 'Outdoor', subtitle: 'Bar',
          exercises: [
            { id: 'pullups', name: 'Pullups', scheme: '5 × max-1', repsHigh: 7, unit: 'reps', notes: '40–50 total reps / session' },
            { id: 'rows', name: 'Inverted rows', scheme: '4 × 12', repsHigh: 12, unit: 'reps', notes: 'More horizontal now' },
            { id: 'highpull', name: 'High pulls', scheme: '4 × 5', repsHigh: 5, unit: 'reps', notes: 'Explosive to sternum' },
            { id: 'dips', name: 'Dips', scheme: '4 × 8–12', repsHigh: 12, unit: 'reps' },
            { id: 'handstand', name: 'Wall handstand hold', scheme: '3 × 20–30s', repsHigh: 30, unit: 'sec' },
            { id: 'knee', name: 'Twisting knee raises', scheme: '4 × 10 / side', repsHigh: 10, unit: 'reps' },
          ],
        },
        {
          id: 'l2-home', place: 'home', emoji: '🏠', label: 'Home', subtitle: 'Floor',
          exercises: [
            { id: 'decline', name: 'Decline pushups', scheme: '4 × 20–25', repsHigh: 25, unit: 'reps', notes: 'Feet elevated' },
            { id: 'archer', name: 'Archer pushups', scheme: '3 × 6–8 / side', repsHigh: 8, unit: 'reps' },
            { id: 'bulgarian', name: 'Bulgarian split squats', scheme: '3 × 8–12 / leg', repsHigh: 12, unit: 'reps' },
            { id: 'jumpsquat', name: 'Jump squats', scheme: '3 × 8', repsHigh: 8, unit: 'reps' },
            { id: 'plank', name: 'Plank', scheme: '3 × 90s', repsHigh: 90, unit: 'sec' },
            { id: 'calf', name: 'Single-leg calf raises', scheme: '3 × 15 / leg', repsHigh: 15, unit: 'reps' },
          ],
        },
      ],
    },
    {
      id: 3,
      subtitle: 'Muscle-Up Prep',
      tagline: 'Skill first — explosive pulls, transitions, weighted strength.',
      exit: { text: 'first clean muscle-up' },
      exitText: 'First clean muscle-up',
      blocks: [
        {
          id: 'l3-out', place: 'outdoor', emoji: '🏖️', label: 'Outdoor', subtitle: 'Bar · skill first',
          exercises: [
            { id: 'c2b', name: 'Explosive chest-to-bar', scheme: '5 × 3–5', repsHigh: 5, unit: 'reps', notes: 'Bar hits sternum' },
            { id: 'negmu', name: 'Negative muscle-ups', scheme: '4 × 2–3', repsHigh: 3, unit: 'reps', notes: 'Lower through transition' },
            { id: 'transition', name: 'Transition drills', scheme: '4 × 3–5', repsHigh: 5, unit: 'reps' },
            { id: 'wdips', name: 'Weighted dips', scheme: '4 × 5–8', repsHigh: 8, unit: 'reps' },
            { id: 't2b', name: 'Toes-to-bar', scheme: '4 × 8–10', repsHigh: 10, unit: 'reps' },
          ],
        },
        {
          id: 'l3-home', place: 'home', emoji: '🏠', label: 'Home', subtitle: 'Floor',
          exercises: [
            { id: 'archer', name: 'Archer pushups', scheme: '3 × 10 / side', repsHigh: 10, unit: 'reps' },
            { id: 'planche', name: 'Pseudo planche pushups', scheme: '3 × 6–8', repsHigh: 8, unit: 'reps', notes: 'Hands turned out, lean forward' },
            { id: 'pistol', name: 'Pistol squat progression', scheme: '3 × 3–5 / leg', repsHigh: 5, unit: 'reps' },
            { id: 'plank', name: 'Plank', scheme: '3 × 2 min', repsHigh: 120, unit: 'sec' },
          ],
        },
      ],
    },
    {
      id: 4,
      subtitle: 'Athletic Peak',
      tagline: 'Muscle-ups in sets + full aesthetic development.',
      exit: { text: 'muscle-ups in sets' },
      exitText: 'Muscle-ups in clean sets',
      blocks: [
        {
          id: 'l4-out', place: 'outdoor', emoji: '🏖️', label: 'Outdoor', subtitle: 'Bar',
          exercises: [
            { id: 'muclusters', name: 'Muscle-up clusters', scheme: 'build to 5+', repsHigh: 5, unit: 'reps', notes: '2 reps, 20s rest, repeat' },
            { id: 'wpull', name: 'Weighted pullups', scheme: '4 × 4–6', repsHigh: 6, unit: 'reps', notes: 'Target +20–25kg' },
            { id: 'frontlever', name: 'Front lever progression', scheme: '3 × 10–15s', repsHigh: 15, unit: 'sec' },
            { id: 'wipers', name: 'Hanging windshield wipers', scheme: '3 × 8 / side', repsHigh: 8, unit: 'reps' },
          ],
        },
        {
          id: 'l4-home', place: 'home', emoji: '🏠', label: 'Home', subtitle: 'Floor',
          exercises: [
            { id: 'hspu', name: 'Freestanding HSPU prog.', scheme: '4 × 3–5', repsHigh: 5, unit: 'reps' },
            { id: 'planche', name: 'Pseudo planche pushups', scheme: '4 × 8–10', repsHigh: 10, unit: 'reps' },
            { id: 'fullpistol', name: 'Full pistol squats', scheme: '3 × 5–8 / leg', repsHigh: 8, unit: 'reps' },
            { id: 'wcalf', name: 'Weighted calf raises', scheme: '3 × 15 / leg', repsHigh: 15, unit: 'reps' },
          ],
        },
      ],
    },
  ];

  const WARMUPS = [
    { id: 'wout', place: 'outdoor', label: '🏖️ Before outdoor', exercises: [
      { id: 'scap', name: 'Scapular pulls on bar', scheme: '2 × 8' },
      { id: 'circles', name: 'Arm + wrist circles', scheme: '30s each' },
      { id: 'pikehold', name: 'Pike pushup hold', scheme: '20s' },
    ]},
    { id: 'whome', place: 'home', label: '🏠 Before home', exercises: [
      { id: 'sqwarm', name: 'Slow deep squats', scheme: '10' },
      { id: 'puwarm', name: 'Slow pushups', scheme: '10' },
    ]},
  ];

  // Retest battery (every 4 weeks).
  const RETEST = [
    { id: 'pullups', label: 'Max strict pullups', unit: 'reps' },
    { id: 'dips', label: 'Max dips', unit: 'reps' },
    { id: 'pushups', label: 'Max pushups', unit: 'reps' },
    { id: 'plank', label: 'Plank hold', unit: 'sec' },
    { id: 'legraise', label: 'Max straight leg raises', unit: 'reps' },
  ];

  // Current bests (baseline was 3 / 4 / 25 / 60s / 10).
  const BESTS = { pullups: 6, dips: 7, pushups: 30, plank: 72, legraise: 9 };

  // Accumulated trajectory toward L2 (0–100), derived from logs.
  const TRAJECTORY = [14, 20, 26, 33, 40, 48, 55, 61, 65, 70];

  // Strength curve retests over time.
  const CURVE = [
    { label: 'Base', pullups: 3, dips: 4, pushups: 25 },
    { label: 'Apr 6', pullups: 4, dips: 5, pushups: 27 },
    { label: 'May 4', pullups: 5, dips: 6, pushups: 29 },
    { label: 'Jun 1', pullups: 6, dips: 7, pushups: 30 },
  ];

  const HISTORY = [
    { id: 'h1', emoji: '🏖️', label: 'L1 · Outdoor', date: 'Jun 12', sets: 18, total: 64 },
    { id: 'h2', emoji: '🏠', label: 'L1 · Home', date: 'Jun 12', sets: 18, total: 188 },
    { id: 'h3', emoji: '🏖️', label: 'L1 · Outdoor', date: 'Jun 9', sets: 17, total: 58 },
    { id: 'h4', emoji: '🏠', label: 'L1 · Home', date: 'Jun 9', sets: 18, total: 182 },
  ];

  return { LEVELS, WARMUPS, RETEST, BESTS, TRAJECTORY, CURVE, HISTORY,
    getLevel: (id) => LEVELS.find((l) => l.id === id) || LEVELS[0] };
})();
