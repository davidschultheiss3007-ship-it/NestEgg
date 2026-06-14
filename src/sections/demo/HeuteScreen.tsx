import { AnimatePresence, motion } from 'framer-motion'
import { useCountUp, usePrefersReducedMotion } from '../../lib/hooks'
import { DEMO_DATE_LABEL, fmtEuro, personaMeta } from './demoData'
import {
  activeGoalOf,
  goalPct,
  usePhone,
  weekDepositedOf,
} from './phoneStore'
import { ProgressRing } from './ProgressRing'

/** Kleine animierte Kennzahl (snap bei reduced motion). */
function StatValue({ value, suffix }: { value: number; suffix: string }) {
  const animated = useCountUp(value)
  return (
    <b>
      {Math.round(animated)}
      {suffix}
    </b>
  )
}

export function HeuteScreen() {
  const { state, dispatch } = usePhone()
  const reduced = usePrefersReducedMotion()
  const goal = activeGoalOf(state)
  const me = personaMeta(state.persona)
  const weekDeposited = weekDepositedOf(state)
  const avail = useCountUp(state.availableThisWeek)

  if (!goal) return null
  const pct = goalPct(goal)
  const showImpulse = state.consent && state.pendingImpulse != null
  const recent = state.activity.slice(0, 2)

  return (
    <div className="pv">
      <header className="pv__greet">
        <h3>Hallo {me.name}</h3>
        <span>{DEMO_DATE_LABEL}</span>
      </header>

      {/* Hero: Ring + große Euro-Zahl → tippen führt zu Zielen */}
      <button className="card hero" onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'ziele' })}>
        <span className="hero__kicker">{goal.label}</span>
        <ProgressRing saved={goal.saved} target={goal.target} pct={pct} label={goal.label} />
        <span className="hero__hint">Ziel ansehen →</span>
      </button>

      {/* Verfügbar diese Woche — zählt beim Bestätigen herunter */}
      <div className="card avail">
        <span>Verfügbar zum Sparen diese Woche</span>
        <strong>{fmtEuro(avail)}</strong>
      </div>

      {/* Drei Mini-Kacheln */}
      <div className="tiles">
        <article>
          <span>Streak</span>
          <StatValue value={state.streakDays} suffix=" T" />
        </article>
        <article>
          <span>Spar-Score</span>
          <StatValue value={state.score} suffix=" %" />
        </article>
        <article>
          <span>Diese Woche</span>
          <b>+{fmtEuro(weekDeposited)}</b>
        </article>
      </div>

      {/* Sparimpuls-Deeplink (nur mit Einwilligung & offenem Impuls) */}
      <AnimatePresence initial={false}>
        {showImpulse && (
          <motion.button
            className="impulse-card"
            onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'coach' })}
            initial={reduced ? false : { opacity: 0, y: 8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="impulse-card__dot" aria-hidden="true" />
            <span className="impulse-card__body">
              <b>Sparimpuls wartet</b>
              <small>{fmtEuro(state.pendingImpulse ?? 0)} für dein {goal.label}</small>
            </span>
            <span className="impulse-card__chev" aria-hidden="true">
              ›
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Ausgaben-Streifen — ausgegraut ohne Einwilligung */}
      <section className="card spend" data-muted={!state.consent}>
        <div className="spend__head">
          <b>Ausgaben diese Woche</b>
          {!state.consent && <small>Kontodaten nötig</small>}
        </div>
        <div className="spend__row">
          {state.categories.map((c) => {
            const max = Math.max(...state.categories.map((x) => x.spent))
            const w = max > 0 ? Math.round((c.spent / max) * 100) : 0
            return (
              <div className="spend__cat" key={c.key}>
                <span className="spend__bar" aria-hidden="true">
                  <i style={{ height: `${w}%`, background: c.viz }} />
                </span>
                <small>{c.label}</small>
                <em>{fmtEuro(c.spent)}</em>
              </div>
            )
          })}
        </div>
      </section>

      {/* Zuletzt gespart — der sichtbare Ausgeben→Sparen-Loop */}
      <section className="activity">
        <b className="activity__title">Zuletzt gespart</b>
        <ul>
          <AnimatePresence initial={false}>
            {recent.map((a) => (
              <motion.li
                key={a.id}
                layout={!reduced}
                initial={reduced ? false : { opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              >
                <span className="activity__icon" aria-hidden="true">↑</span>
                <span className="activity__label">{a.label}</span>
                <span className="activity__goal">{a.goalLabel}</span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </section>
    </div>
  )
}
