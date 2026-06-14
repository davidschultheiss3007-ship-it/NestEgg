import type { Scenario } from '../data/businessPlan'

/** Unit-Economics-Konstanten — identisch zur Legacy-Logik. */
export const ARPU_B2C = 60.36
export const ARPU_B2B = 30
export const ARPU_PARTNER = 13.75

export type SimResult = {
  premiumUsers: number
  b2c: number
  b2b: number
  partner: number
  setup: number
  costs: number
  revenue: number
  ebitda: number
  margin: number
  arpuMix: number
}

/** Reine Berechnung — exakt wie `calculate()` in legacy/script.js. */
export function calculate(state: Scenario): SimResult {
  const premiumUsers = (state.active * state.premium) / 100
  const b2c = premiumUsers * ARPU_B2C
  const b2b = state.b2b * ARPU_B2B
  const partner = state.partner * ARPU_PARTNER
  const revenue = b2c + b2b + partner + state.setup
  const ebitda = revenue - state.costs

  return {
    premiumUsers,
    b2c,
    b2b,
    partner,
    setup: state.setup,
    costs: state.costs,
    revenue,
    ebitda,
    margin: revenue ? (ebitda / revenue) * 100 : 0,
    arpuMix: state.active ? revenue / state.active : 0,
  }
}

export type ControlKind = 'count' | 'percent' | 'currency'
export type ControlGroup = 'reichweite' | 'kanal' | 'finanzen'

export type ControlMeta = {
  key: keyof Scenario
  label: string
  help: string
  min: number
  max: number
  step: number
  kind: ControlKind
  group: ControlGroup
}

/** Slider-Definitionen — übernommen aus legacy `meta`. */
export const CONTROLS: ControlMeta[] = [
  { key: 'active', label: 'Aktive Nutzer', help: 'Monatlich aktive Nutzer im gewählten Jahr.', min: 1000, max: 450000, step: 1000, kind: 'count', group: 'reichweite' },
  { key: 'premium', label: 'Premium-Conversion', help: 'Anteil der aktiven Nutzer mit Premium-Abo.', min: 1, max: 18, step: 0.5, kind: 'percent', group: 'reichweite' },
  { key: 'b2b', label: 'B2B-Nutzer', help: 'Nutzer über Unternehmen, Hochschulen oder Arbeitgeber.', min: 0, max: 160000, step: 1000, kind: 'count', group: 'kanal' },
  { key: 'partner', label: 'Partnernutzer', help: 'Nutzer mit partnerbasierten Investment-Impulsen.', min: 0, max: 140000, step: 1000, kind: 'count', group: 'kanal' },
  { key: 'setup', label: 'Setup-/White-Label', help: 'Einmalige Projekt- und Integrationsumsätze.', min: 0, max: 600000, step: 5000, kind: 'currency', group: 'finanzen' },
  { key: 'costs', label: 'Gesamtkosten', help: 'Operative Kosten inkl. Team, Produkt und Wachstum.', min: 200000, max: 6500000, step: 10000, kind: 'currency', group: 'finanzen' },
]

export const GROUP_LABELS: Record<ControlGroup, string> = {
  reichweite: '1) Nutzerbasis',
  kanal: '2) Erlöskanäle',
  finanzen: '3) Kosten & Setup',
}

export const GROUP_ORDER: ControlGroup[] = ['reichweite', 'kanal', 'finanzen']
