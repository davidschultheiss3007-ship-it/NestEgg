import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '../../components/Primitives'
import { usePrefersReducedMotion } from '../../lib/hooks'
import { COACH_DISCLAIMER, fmtEuro } from './demoData'
import { STEP_MAX, STEP_MIN, activeGoalOf, usePhone } from './phoneStore'

const PRESETS = [15, 23, 30]

export function CoachScreen() {
  const { state, dispatch } = usePhone()
  const reduced = usePrefersReducedMotion()
  const goal = activeGoalOf(state)
  if (!goal) return null

  const maxAmount = Math.min(STEP_MAX, state.availableThisWeek)
  const amount = state.proposedAmount
  const projected = Math.min(goal.target, goal.saved + amount)
  const remaining = Math.max(0, goal.target - goal.saved)
  const exhausted = state.availableThisWeek < STEP_MIN
  const goalDone = goal.saved >= goal.target
  // Frischer Persona-Impuls vs. „Restbudget" für ein zweites Ziel.
  const freshImpulse = state.pendingImpulse != null

  const setAmount = (n: number) => dispatch({ type: 'SET_PROPOSED_AMOUNT', amount: n })

  /* ---- Zustand A: keine Einwilligung ---- */
  if (!state.consent) {
    return (
      <div className="pv coach">
        <CoachHeader />
        <div className="card coach__gate">
          <div className="coach__gate-icon" aria-hidden="true">🔒</div>
          <b>Kontodaten freigeben, um dein Sparpotenzial zu sehen.</b>
          <p>{COACH_DISCLAIMER}</p>
          <Button variant="primary" full onClick={() => dispatch({ type: 'TOGGLE_CONSENT' })}>
            Kontodaten freigeben
          </Button>
        </div>
      </div>
    )
  }

  /* ---- Zustand C: Erfolg ---- */
  if (state.coachSuccess) {
    return (
      <div className="pv coach">
        <CoachHeader />
        <motion.div
          className="card coach__success"
          initial={reduced ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
        >
          <Checkmark />
          <b>Erledigt.</b>
          <p>
            {goal.label} wächst auf <strong>{fmtEuro(goal.saved)}</strong>.
            {remaining > 0 ? ` Noch ${fmtEuro(remaining)} bis zum Ziel.` : ' Ziel erreicht! 🎉'}
          </p>
          <Button variant="primary" full onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'ziele' })}>
            Zum Fortschritt
          </Button>
        </motion.div>
      </div>
    )
  }

  /* ---- Zustand E: aktives Ziel bereits voll ---- */
  if (goalDone) {
    return (
      <div className="pv coach">
        <CoachHeader />
        <div className="card coach__gate">
          <div className="coach__gate-icon" aria-hidden="true">🎉</div>
          <b>{goal.label} ist erreicht.</b>
          <p>Wähle ein weiteres Ziel, um deinen Spielraum dort einzusetzen.</p>
          <Button variant="primary" full onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'ziele' })}>
            Ziel wählen
          </Button>
        </div>
      </div>
    )
  }

  /* ---- Zustand D: Wochenbudget aufgebraucht ---- */
  if (exhausted) {
    return (
      <div className="pv coach">
        <CoachHeader />
        <div className="card coach__gate">
          <div className="coach__gate-icon" aria-hidden="true">✅</div>
          <b>Diese Woche ist alles gesichert.</b>
          <p>Dein Sparpotenzial für diese Woche ist ausgeschöpft. Schließe die Woche ab — der Coach meldet sich mit dem nächsten Impuls.</p>
          <Button variant="primary" full onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'report' })}>
            Zum Wochenreport
          </Button>
        </div>
      </div>
    )
  }

  /* ---- Zustand B: Impuls (frisch) bzw. Restbudget für weiteres Ziel ---- */
  return (
    <div className="pv coach">
      <CoachHeader />

      <div className="card coach__impulse">
        {state.skipped && (
          <p className="coach__skip-note">Kein Problem — kleinerer Schritt?</p>
        )}
        {freshImpulse ? (
          <h4>Diese Woche sind {fmtEuro(state.pendingImpulse ?? amount)} realistisch.</h4>
        ) : (
          <h4>Noch {fmtEuro(state.availableThisWeek)} Spielraum diese Woche.</h4>
        )}
        <p className="coach__sub">Für dein {goal.label} sichern?</p>

        <button
          className="coach__why"
          onClick={() => dispatch({ type: 'TOGGLE_WHY' })}
          aria-expanded={state.whyOpen}
          aria-controls="coach-rule"
        >
          Warum? <span data-open={state.whyOpen} aria-hidden="true">›</span>
        </button>
        <AnimatePresence initial={false}>
          {state.whyOpen && (
            <motion.div
              id="coach-rule"
              className="coach__rule"
              initial={reduced ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
            >
              <p>{state.impulseRule}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Betrag wählen: Presets + Stepper */}
        <div className="coach__amount">
          <div className="coach__presets">
            {PRESETS.map((p) => (
              <button
                key={p}
                className="coach__chip"
                data-active={amount === p}
                disabled={p > maxAmount}
                onClick={() => setAmount(p)}
              >
                {p} €
              </button>
            ))}
          </div>
          <div className="coach__stepper">
            <button
              aria-label={`5 Euro weniger sichern, aktuell ${fmtEuro(amount)}`}
              onClick={() => setAmount(amount - 5)}
              disabled={amount <= STEP_MIN}
            >
              −
            </button>
            <output aria-live="polite">{fmtEuro(amount)}</output>
            <button
              aria-label={`5 Euro mehr sichern, aktuell ${fmtEuro(amount)}`}
              onClick={() => setAmount(amount + 5)}
              disabled={amount >= maxAmount}
            >
              +
            </button>
          </div>
        </div>

        <p className="coach__projected">
          {goal.label} wächst auf <b>{fmtEuro(projected)}</b>
        </p>

        <Button variant="primary" full onClick={() => dispatch({ type: 'CONFIRM_IMPULSE' })}>
          {fmtEuro(amount)} sichern
        </Button>
        {freshImpulse && (
          <button className="coach__decline" onClick={() => dispatch({ type: 'SKIP_IMPULSE' })}>
            Diesmal nicht
          </button>
        )}

        <p className="coach__disclaimer">{COACH_DISCLAIMER}</p>
      </div>
    </div>
  )
}

function CoachHeader() {
  return (
    <header className="coach__head">
      <span className="coach__spark" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="18" height="18">
          <path
            d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <b>Sparcoach</b>
    </header>
  )
}

/** Eingezeichnetes Häkchen — pathLength 0→1 (voll bei reduced motion). */
function Checkmark() {
  const reduced = usePrefersReducedMotion()
  return (
    <span className="coach__check" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="40" height="40">
        <motion.path
          d="M5 13l4 4L19 7"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
        />
      </svg>
    </span>
  )
}
