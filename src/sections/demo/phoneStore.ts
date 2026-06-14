/* ============================================================
   NestEgg · In-Phone-Demo — State Store
   Eine einzige Quelle der Wahrheit (useReducer + Context).
   Jede Seite ist eine reine Projektion dieses States, deshalb
   tragen auch nicht sichtbare Tabs bereits korrekte Zahlen —
   useCountUp läuft beim Mount und „kommt an", statt zu springen.
   ============================================================ */

import { createContext, useContext } from 'react'
import type { Dispatch } from 'react'
import {
  GOAL_LABELS,
  GOAL_RATES,
  GOAL_TARGETS,
  PERSONA_SEEDS,
  clamp,
  crossedThreshold,
  scoreDelta,
  weekTotal,
} from './demoData'

/* ---------------- Typen ---------------- */

export type GoalKey = 'notgroschen' | 'urlaub' | 'umzug' | 'ausbildung' | 'altersvorsorge'
export type PersonaKey = 'lena' | 'max' | 'sara'
export type Screen = 'heute' | 'coach' | 'ziele' | 'report'
export type WeekdayKey = 'Mo' | 'Di' | 'Mi' | 'Do' | 'Fr' | 'Sa' | 'So'

export interface Goal {
  key: GoalKey
  label: string
  saved: number
  target: number
  /** Ø €/Woche → ETA = ceil((target − saved) / weeklyRate). */
  weeklyRate: number
  /** Altersvorsorge → gesperrt, im Demo nie befüllt. */
  partnerOnly?: boolean
}

export interface SpendCategory {
  key: 'abos' | 'lieferdienst' | 'freizeit' | 'lebensmittel' | 'transport'
  label: string
  /** € diesen Monat (Kontext für den Ausgaben-Streifen). */
  spent: number
  /** € Sparpotenzial, das der Coach diese Woche heben kann. */
  potential: number
  /** CSS-Token-String, z. B. 'var(--accent)'. */
  viz: string
}

export interface WeekDay {
  day: WeekdayKey
  amount: number
  isToday: boolean
}

export interface ActivityEntry {
  id: string
  label: string
  amount: number
  goalLabel: string
}

export interface Insight {
  id: string
  short: string
  detail: string
}

export interface DemoState {
  persona: PersonaKey
  consent: boolean
  screen: Screen
  onboarded: boolean

  activeGoal: GoalKey
  goals: Partial<Record<GoalKey, Goal>>

  categories: SpendCategory[]
  /** Basis-Wochenpotenzial — für CLOSE_WEEK-Reseed. */
  weeklyPotential: number
  /** € den der Coach noch vorschlagen kann; sinkt beim Bestätigen. */
  availableThisWeek: number
  /** Persona-Basis-Impuls — für CLOSE_WEEK-Reseed. */
  impulseBase: number
  /** Aktuell vorgeschlagener Impuls; null nachdem konsumiert. */
  pendingImpulse: number | null
  /** Stepper-Wert (Default = pendingImpulse). */
  proposedAmount: number
  impulseRule: string
  whyOpen: boolean
  coachSuccess: boolean
  skipped: boolean

  streakDays: number
  score: number
  /** Mo..So Balken für die Report-Sparkline; weekDeposited ist abgeleitet. */
  week: WeekDay[]
  activity: ActivityEntry[]
  insights: Insight[]

  confirmsThisSession: number
  confirmedToday: boolean
  celebrate: boolean
  sheet: null | 'etf'
  /** Das zuletzt befüllte Ziel — steuert den „frisch gespart"-Flash auf genau
   *  dieser Karte. Eigenes Feld (nicht an Navigations-Events gekoppelt), damit
   *  ein Zielwechsel den Flash nicht vorzeitig abreißt. null = kein Flash. */
  fundedGoal: GoalKey | null
  /** Betrag der letzten Bestätigung — für Erfolgs-Toast & Frisch-gespart-Flash. */
  lastConfirmAmount: number
  expandedInsight: string | null
  /** Monoton steigender Zähler für stabile Activity-IDs (kein Date.now/random). */
  activityCounter: number
}

/* ---------------- Actions ---------------- */

export type Action =
  | { type: 'SET_PERSONA'; persona: PersonaKey }
  | { type: 'TOGGLE_CONSENT' }
  | { type: 'SET_SCREEN'; screen: Screen }
  | { type: 'SET_ACTIVE_GOAL'; key: GoalKey }
  | { type: 'SET_PROPOSED_AMOUNT'; amount: number }
  | { type: 'TOGGLE_WHY' }
  | { type: 'CONFIRM_IMPULSE' }
  | { type: 'SKIP_IMPULSE' }
  | { type: 'NEW_GOAL'; key: GoalKey }
  | { type: 'OPEN_SHEET'; sheet: 'etf' }
  | { type: 'CLOSE_SHEET' }
  | { type: 'TOGGLE_INSIGHT'; id: string }
  | { type: 'CLOSE_WEEK' }
  | { type: 'FINISH_ONBOARDING' }
  | { type: 'RESET_DEMO' }
  | { type: 'CLEAR_FLASH' } // löscht fundedGoal (Ziele „frisch gespart")
  | { type: 'CLEAR_CELEBRATE' } // löscht celebrate (Report-Konfetti)

/* ---------------- Helfer ---------------- */

export const STEP_MIN = 5
export const STEP_MAX = 40

const todayIndex = (week: WeekDay[]): number => week.findIndex((d) => d.isToday)

/** Erlaubter Stepper-Korridor: 5 € … min(40 €, verfügbar). */
const proposedBounds = (available: number): [number, number] => [
  STEP_MIN,
  Math.max(STEP_MIN, Math.min(STEP_MAX, available)),
]

/* ---------------- Reducer ---------------- */

export function phoneReducer(state: DemoState, action: Action): DemoState {
  switch (action.type) {
    case 'SET_PERSONA': {
      // Komplette Neu-Seedung; nur die aktuelle Seite bleibt erhalten,
      // damit der Präsentierende dort bleibt, wo er ist.
      const seeded = PERSONA_SEEDS[action.persona]()
      return {
        ...seeded,
        screen: state.screen,
        onboarded: state.onboarded,
      }
    }

    case 'TOGGLE_CONSENT':
      // Der pendingImpulse bleibt bewusst erhalten: „Kontodaten wieder
      // freigeben" soll den Sparimpuls sofort zurückbringen — er wird nur
      // ausgeblendet (Heute/Coach prüfen `consent && pendingImpulse`).
      return { ...state, consent: !state.consent }

    case 'SET_SCREEN': {
      const leavingCoach = state.screen === 'coach' && action.screen !== 'coach'
      return {
        ...state,
        screen: action.screen,
        whyOpen: leavingCoach ? false : state.whyOpen,
      }
    }

    case 'SET_ACTIVE_GOAL': {
      const goal = state.goals[action.key]
      if (!goal || goal.partnerOnly) return state // gesperrt → ignorieren
      const [lo, hi] = proposedBounds(state.availableThisWeek)
      return {
        ...state,
        activeGoal: action.key,
        coachSuccess: false, // ein frisch anvisiertes Ziel ist wieder befüllbar
        proposedAmount: clamp(state.pendingImpulse ?? state.proposedAmount, lo, hi),
      }
    }

    case 'SET_PROPOSED_AMOUNT': {
      const [lo, hi] = proposedBounds(state.availableThisWeek)
      return { ...state, proposedAmount: clamp(action.amount, lo, hi) }
    }

    case 'TOGGLE_WHY':
      return { ...state, whyOpen: !state.whyOpen }

    case 'CONFIRM_IMPULSE': {
      const active = state.goals[state.activeGoal]
      if (!active || active.partnerOnly) return state
      const amount = Math.min(state.proposedAmount, state.availableThisWeek)
      if (amount <= 0) return state

      const newSaved = Math.min(active.target, active.saved + amount)
      const realApplied = newSaved - active.saved // nie übersparen
      if (realApplied <= 0) return state // Ziel bereits voll → kein Phantom-Confirm
      const prevScore = state.score
      const nextScore = clamp(state.score + scoreDelta(realApplied), 0, 100)

      const idx = todayIndex(state.week)
      const week = state.week.map((d, i) =>
        i === idx ? { ...d, amount: d.amount + realApplied } : d,
      )

      const counter = state.activityCounter + 1
      const entry: ActivityEntry = {
        id: `act-${counter}`,
        label: `+${realApplied} € gesichert`,
        amount: realApplied,
        goalLabel: active.label,
      }

      return {
        ...state,
        goals: { ...state.goals, [state.activeGoal]: { ...active, saved: newSaved } },
        availableThisWeek: state.availableThisWeek - realApplied,
        pendingImpulse: null,
        week,
        streakDays: state.confirmedToday ? state.streakDays : state.streakDays + 1,
        score: nextScore,
        confirmsThisSession: state.confirmsThisSession + 1,
        confirmedToday: true,
        activity: [entry, ...state.activity],
        activityCounter: counter,
        coachSuccess: true,
        skipped: false,
        celebrate: crossedThreshold(prevScore, nextScore),
        lastConfirmAmount: realApplied,
        fundedGoal: state.activeGoal,
      }
    }

    case 'SKIP_IMPULSE': {
      if (state.pendingImpulse == null) return state
      const [lo, hi] = proposedBounds(state.availableThisWeek)
      const reduced = clamp(Math.round(state.pendingImpulse * 0.6), lo, hi)
      return {
        ...state,
        skipped: true,
        score: clamp(state.score - 2, 0, 100), // Zahlen bewegen sich in BEIDE Richtungen
        proposedAmount: reduced,
      }
    }

    case 'NEW_GOAL': {
      const existing = state.goals[action.key]
      const goal: Goal =
        existing ??
        {
          key: action.key,
          label: GOAL_LABELS[action.key],
          saved: 0,
          target: GOAL_TARGETS[action.key],
          weeklyRate: GOAL_RATES[action.key],
          partnerOnly: action.key === 'altersvorsorge',
        }
      if (goal.partnerOnly) {
        // Altersvorsorge nicht aktivierbar — nur als gesperrter Eintrag zeigen.
        return { ...state, goals: { ...state.goals, [action.key]: goal } }
      }
      return {
        ...state,
        goals: { ...state.goals, [action.key]: goal },
        activeGoal: action.key,
        coachSuccess: false,
      }
    }

    case 'OPEN_SHEET':
      return { ...state, sheet: action.sheet }

    case 'CLOSE_SHEET':
      return { ...state, sheet: null }

    case 'TOGGLE_INSIGHT':
      return {
        ...state,
        expandedInsight: state.expandedInsight === action.id ? null : action.id,
      }

    case 'CLOSE_WEEK': {
      // Idempotent: eine schon „leere" Woche mit frischem Vollbudget wurde
      // bereits abgeschlossen → Doppel-Tap auf „Woche abschließen" ignorieren
      // (verhindert Streak-Sprung um 2).
      if (weekTotal(state.week) === 0 && state.availableThisWeek === state.weeklyPotential) {
        return state
      }
      // Woche rollt um: Streak +1, frische Sparkline & Impuls, Score bleibt.
      const idx = todayIndex(state.week)
      const nextIdx = (idx + 1) % 7
      const freshWeek = state.week.map((d, i) => ({ ...d, amount: 0, isToday: i === nextIdx }))
      const [lo, hi] = proposedBounds(state.weeklyPotential)
      return {
        ...state,
        streakDays: state.streakDays + 1,
        availableThisWeek: state.weeklyPotential,
        pendingImpulse: state.impulseBase,
        proposedAmount: clamp(state.impulseBase, lo, hi),
        week: freshWeek,
        coachSuccess: false,
        skipped: false,
        confirmedToday: false,
        fundedGoal: null,
      }
    }

    case 'FINISH_ONBOARDING':
      return { ...state, onboarded: true, screen: 'heute' }

    case 'RESET_DEMO': {
      const seeded = PERSONA_SEEDS[state.persona]()
      return { ...seeded, onboarded: true, screen: 'heute' }
    }

    case 'CLEAR_FLASH':
      return { ...state, fundedGoal: null }

    case 'CLEAR_CELEBRATE':
      return { ...state, celebrate: false }

    default:
      return state
  }
}

/* ---------------- Abgeleitete Selektoren ---------------- */

export const activeGoalOf = (s: DemoState): Goal | undefined => s.goals[s.activeGoal]

export const goalPct = (g: Goal): number =>
  g.target > 0 ? clamp(Math.round((g.saved / g.target) * 100), 0, 100) : 0

export const weekDepositedOf = (s: DemoState): number => weekTotal(s.week)

/* ---------------- Context ---------------- */

export interface PhoneContextValue {
  state: DemoState
  dispatch: Dispatch<Action>
}

export const PhoneContext = createContext<PhoneContextValue | null>(null)

export function usePhone(): PhoneContextValue {
  const ctx = useContext(PhoneContext)
  if (!ctx) throw new Error('usePhone must be used within a PhoneProvider')
  return ctx
}
