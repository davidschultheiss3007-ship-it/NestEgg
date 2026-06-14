/* ============================================================
   NestEgg · In-Phone-Demo — Daten & Helfer
   Eine einzige Quelle der Wahrheit für die drei Personas.
   Jede Seed-Funktion liefert einen FRISCHEN State (neue Arrays/
   Objekte), damit der Reducer rein immutabel arbeiten kann.
   Copy ist mit dem restlichen Deck (businessPlan.ts) konsistent.
   ============================================================ */

import type {
  DemoState,
  Goal,
  GoalKey,
  Insight,
  PersonaKey,
  SpendCategory,
  WeekDay,
  WeekdayKey,
} from './phoneStore'

/* ---------------- Formatierung ---------------- */

const euroFormatter = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 })

/** "1.234 €" — wie die Legacy-/Deck-Formatierung, ganze Beträge. */
export const fmtEuro = (n: number): string => `${euroFormatter.format(Math.round(n))} €`

/** Korrekte Pluralisierung: 1 Tag / n Tage. */
export const plural = (n: number, one: string, many: string): string =>
  `${n} ${n === 1 ? one : many}`

export const clamp = (n: number, lo: number, hi: number): number =>
  Math.max(lo, Math.min(hi, n))

/* ---------------- Ziel-Metadaten ---------------- */

export const GOAL_LABELS: Record<GoalKey, string> = {
  notgroschen: 'Notgroschen',
  urlaub: 'Urlaub',
  umzug: 'Umzug',
  ausbildung: 'Ausbildung',
  altersvorsorge: 'Altersvorsorge',
}

export const GOAL_TARGETS: Record<GoalKey, number> = {
  notgroschen: 1000,
  urlaub: 600,
  umzug: 1200,
  ausbildung: 800,
  altersvorsorge: 5000,
}

export const GOAL_RATES: Record<GoalKey, number> = {
  notgroschen: 25,
  urlaub: 20,
  umzug: 40,
  ausbildung: 25,
  altersvorsorge: 0,
}

/** Anzeige-Reihenfolge der Ziele (Object-Key-Reihenfolge ist sonst nicht garantiert). */
export const GOAL_ORDER: GoalKey[] = ['notgroschen', 'urlaub', 'umzug', 'ausbildung', 'altersvorsorge']

/* ---------------- Personas ---------------- */

export interface PersonaMeta {
  key: PersonaKey
  name: string
  age: number
  role: string
  initial: string
}

/** Quelle: businessPlan.ts → targets[]. */
export const PERSONAS: PersonaMeta[] = [
  { key: 'lena', name: 'Lena', age: 22, role: 'Studentin', initial: 'L' },
  { key: 'max', name: 'Max', age: 27, role: 'Berufseinsteiger', initial: 'M' },
  { key: 'sara', name: 'Sara', age: 31, role: 'Angestellte', initial: 'S' },
]

export const personaMeta = (key: PersonaKey): PersonaMeta =>
  PERSONAS.find((p) => p.key === key) ?? PERSONAS[0]

/* ---------------- Datum / Woche ---------------- */

/** Fixes Demo-„Heute" — hält ETAs und das angezeigte Datum stabil. */
export const DEMO_TODAY = new Date(2026, 5, 12) // 12.06.2026 (Freitag-nahe; idx wird je Persona gesetzt)
export const DEMO_DATE_LABEL = '12.06.2026'

export const WEEKDAYS: WeekdayKey[] = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']

/** Baut die 7 Wochentage; `deposits[i]` füllt Tag i, `todayIdx` markiert „heute". */
export function makeWeek(todayIdx: number, deposits: number[]): WeekDay[] {
  return WEEKDAYS.map((day, i) => ({
    day,
    amount: deposits[i] ?? 0,
    isToday: i === todayIdx,
  }))
}

/** Summe der Wocheneinzahlungen — abgeleitet, nie separat gespeichert. */
export const weekTotal = (week: WeekDay[]): number =>
  week.reduce((sum, d) => sum + d.amount, 0)

export const weekMax = (week: WeekDay[]): number =>
  Math.max(1, ...week.map((d) => d.amount))

/** Voraussichtlicher Zielmonat: ceil((Ziel − gespart) / Wochenrate) Wochen ab Demo-Heute. */
export function computeEta(goal: Goal): string {
  if (goal.weeklyRate <= 0) return '—'
  const remaining = Math.max(0, goal.target - goal.saved)
  if (remaining === 0) return 'Ziel erreicht'
  const weeks = Math.ceil(remaining / goal.weeklyRate)
  const eta = new Date(DEMO_TODAY)
  eta.setDate(eta.getDate() + weeks * 7)
  return eta.toLocaleDateString('de-DE', { month: 'short', year: 'numeric' })
}

/* ---------------- Score-Logik ---------------- */

/** Score-Zuwachs pro gesichertem Betrag — deckt sich mit 23 € → +5 (82→87). */
export const scoreDelta = (amount: number): number =>
  Math.min(8, Math.floor(3 + amount / 8))

/** True, wenn der Score eine runde 5er-Schwelle überschritten hat (für die Feier). */
export const crossedThreshold = (prev: number, next: number): boolean =>
  Math.floor(next / 5) > Math.floor(prev / 5)

/* ---------------- Goal-Helfer ---------------- */

const goal = (key: GoalKey, saved: number, target: number, weeklyRate: number, partnerOnly = false): Goal => ({
  key,
  label: GOAL_LABELS[key],
  saved,
  target,
  weeklyRate,
  partnerOnly,
})

const cat = (
  key: SpendCategory['key'],
  label: string,
  spent: number,
  potential: number,
  viz: string,
): SpendCategory => ({ key, label, spent, potential, viz })

const insight = (id: string, short: string, detail: string): Insight => ({ id, short, detail })

/* ---------------- Persona-Seeds ---------------- */

/** Felder, die alle Personas teilen (Sitzungs-/UI-Flags). */
function sessionDefaults(): Pick<
  DemoState,
  | 'screen'
  | 'onboarded'
  | 'whyOpen'
  | 'coachSuccess'
  | 'skipped'
  | 'confirmsThisSession'
  | 'confirmedToday'
  | 'celebrate'
  | 'sheet'
  | 'fundedGoal'
  | 'lastConfirmAmount'
  | 'expandedInsight'
  | 'activityCounter'
> {
  return {
    screen: 'heute',
    onboarded: false,
    whyOpen: false,
    coachSuccess: false,
    skipped: false,
    confirmsThisSession: 0,
    confirmedToday: false,
    celebrate: false,
    sheet: null,
    fundedGoal: null,
    lastConfirmAmount: 0,
    expandedInsight: null,
    activityCounter: 100,
  }
}

const seedLena = (): DemoState => ({
  ...sessionDefaults(),
  persona: 'lena',
  consent: false, // dramatisiert den Einwilligungs-Toggle
  activeGoal: 'notgroschen',
  goals: {
    notgroschen: goal('notgroschen', 208, 1000, 23),
  },
  categories: [
    cat('abos', 'Abos', 34, 14, 'var(--accent)'),
    cat('lieferdienst', 'Lieferdienst', 48, 9, 'var(--viz-2)'),
    cat('freizeit', 'Freizeit', 62, 0, 'var(--viz-3)'),
    cat('lebensmittel', 'Lebensmittel', 140, 0, 'var(--viz-4)'),
  ],
  weeklyPotential: 23,
  availableThisWeek: 23,
  impulseBase: 23,
  pendingImpulse: 23,
  proposedAmount: 23,
  impulseRule: '3 Abos doppelt erkannt · 1× Lieferdienst weniger = 23 €',
  streakDays: 12,
  score: 82,
  week: makeWeek(3, [9, 0, 14]), // heute = Do
  activity: [
    { id: 'a1', label: '+14 € gesichert', amount: 14, goalLabel: 'Notgroschen' },
    { id: 'a2', label: '+9 € gesichert', amount: 9, goalLabel: 'Notgroschen' },
  ],
  insights: [
    insight('i1', 'Abo-Check spart dir ~9 €/Monat', 'Zwei Streaming-Abos überschneiden sich — eines reicht völlig.'),
    insight('i2', 'Lieferdienst 1× weniger = 23 €/Woche', 'Vier Bestellungen letzte Woche; eine selbst gekocht spart konkret.'),
  ],
})

const seedMax = (): DemoState => ({
  ...sessionDefaults(),
  persona: 'max',
  consent: true,
  activeGoal: 'notgroschen',
  goals: {
    notgroschen: goal('notgroschen', 520, 1000, 35),
    urlaub: goal('urlaub', 140, 600, 20),
  },
  categories: [
    cat('abos', 'Abos', 29, 12, 'var(--accent)'),
    cat('lieferdienst', 'Lieferdienst', 70, 16, 'var(--viz-2)'),
    cat('freizeit', 'Freizeit', 95, 8, 'var(--viz-3)'),
    cat('transport', 'Transport', 60, 0, 'var(--viz-4)'),
  ],
  weeklyPotential: 40,
  availableThisWeek: 40,
  impulseBase: 30,
  pendingImpulse: 30,
  proposedAmount: 30,
  impulseRule: 'Spontankauf-Muster erkannt · Round-up + 1 Abo pausiert = 30 €',
  streakDays: 9,
  score: 74,
  week: makeWeek(1, [20]), // heute = Di
  activity: [{ id: 'a1', label: '+20 € gesichert', amount: 20, goalLabel: 'Notgroschen' }],
  insights: [
    insight('i1', 'Round-up sammelt ~12 €/Woche', 'Jede Kartenzahlung wird aufgerundet — fast unbemerkt gespart.'),
    insight('i2', 'Depot-Beitrag erst nach Notgroschen', 'Routine zuerst: drei Monatsausgaben als Puffer, dann investieren.'),
  ],
})

const seedSara = (): DemoState => ({
  ...sessionDefaults(),
  persona: 'sara',
  consent: true,
  activeGoal: 'notgroschen',
  goals: {
    notgroschen: goal('notgroschen', 920, 1000, 30),
    urlaub: goal('urlaub', 380, 600, 25),
    umzug: goal('umzug', 240, 1200, 40),
    altersvorsorge: goal('altersvorsorge', 0, 5000, 0, true),
  },
  categories: [
    cat('abos', 'Abos', 22, 10, 'var(--accent)'),
    cat('lieferdienst', 'Lieferdienst', 40, 8, 'var(--viz-2)'),
    cat('freizeit', 'Freizeit', 80, 7, 'var(--viz-3)'),
    cat('lebensmittel', 'Lebensmittel', 130, 0, 'var(--viz-4)'),
  ],
  weeklyPotential: 35,
  availableThisWeek: 35,
  impulseBase: 25,
  pendingImpulse: 25,
  proposedAmount: 25,
  impulseRule: 'Fixkosten optimiert · 2 Abos gekündigt = 25 €',
  streakDays: 21,
  score: 88,
  week: makeWeek(2, [30, 15]), // heute = Mi
  activity: [
    { id: 'a1', label: '+30 € gesichert', amount: 30, goalLabel: 'Notgroschen' },
    { id: 'a2', label: '+15 € gesichert', amount: 15, goalLabel: 'Urlaub' },
  ],
  insights: [
    insight('i1', 'Zwei Abos gekündigt = 25 €/Monat', 'Selten genutzte Abos automatisch erkannt und vorgeschlagen.'),
    insight('i2', 'Drei Ziele klar priorisiert', 'Notgroschen fast voll — danach rückt Urlaub in den Fokus.'),
  ],
})

export const PERSONA_SEEDS: Record<PersonaKey, () => DemoState> = {
  lena: seedLena,
  max: seedMax,
  sara: seedSara,
}

/* ---------------- ETF-Sheet (gesperrt, rein informativ) ---------------- */
/* Quelle: businessPlan.ts → compliance[2] (Investment Layer) + flow[5]. */
export const ETF_SHEET = {
  title: 'ETF-Sparen über regulierten Partner',
  body:
    'Kommt in einer späteren Phase. Depot, Risikoprofil und Orderausführung laufen über einen ' +
    'regulierten Partner. NestEgg bleibt heute Coaching & Routine — keine Anlageausführung.',
  cta: 'Verstanden',
}

/** Datenschutz-Zeile im Onboarding. Quelle: compliance[1] (Kontodaten Layer). */
export const CONSENT_NOTE = 'Kontodaten nur über lizenzierten Partner · jederzeit widerrufbar'

/** Coach-Disclaimer. Quelle: compliance[0] (Coaching Layer). */
export const COACH_DISCLAIMER = 'Coaching, keine Anlageempfehlung.'
