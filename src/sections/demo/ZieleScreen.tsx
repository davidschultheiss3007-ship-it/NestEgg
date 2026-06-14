import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../../lib/hooks'
import {
  GOAL_LABELS,
  GOAL_ORDER,
  computeEta,
  fmtEuro,
} from './demoData'
import {
  goalPct,
  usePhone,
  type Goal,
  type GoalKey,
} from './phoneStore'

export function ZieleScreen() {
  const { state, dispatch } = usePhone()
  const reduced = usePrefersReducedMotion()
  const [picking, setPicking] = useState(false)

  // Aktives Ziel zuerst, dann übrige; gesperrte ans Ende.
  const present = GOAL_ORDER.map((k) => state.goals[k]).filter(Boolean) as Goal[]
  const sorted = [...present].sort((a, b) => {
    if (a.partnerOnly !== b.partnerOnly) return a.partnerOnly ? 1 : -1
    if (a.key === state.activeGoal) return -1
    if (b.key === state.activeGoal) return 1
    return 0
  })

  // Ziele, die man noch hinzufügen kann.
  const addable = GOAL_ORDER.filter((k) => !state.goals[k])

  return (
    <div className="pv">
      <header className="pv__title">
        <h3>Deine Sparziele</h3>
      </header>

      <div className="goals">
        {sorted.map((g) => {
          const active = g.key === state.activeGoal && !g.partnerOnly
          const pct = goalPct(g)
          const justFunded = state.fundedGoal === g.key
          return (
            <motion.button
              key={g.key}
              layout={!reduced}
              layoutId={reduced ? undefined : `goal-${g.key}`}
              className="goal-card"
              data-active={active}
              data-locked={g.partnerOnly || false}
              onClick={() =>
                g.partnerOnly
                  ? dispatch({ type: 'OPEN_SHEET', sheet: 'etf' })
                  : dispatch({ type: 'SET_ACTIVE_GOAL', key: g.key })
              }
              transition={{ type: 'spring', duration: 0.4, bounce: 0.16 }}
            >
              <div className="goal-card__top">
                <b>{g.label}</b>
                {active && <span className="goal-card__tag">Aktiv</span>}
                {g.partnerOnly && (
                  <span className="goal-card__lock" aria-hidden="true">🔒</span>
                )}
              </div>

              {g.partnerOnly ? (
                <p className="goal-card__partner">über regulierten Partner · später</p>
              ) : (
                <>
                  <div className="goal-card__nums">
                    <span>
                      {fmtEuro(g.saved)} <em>/ {fmtEuro(g.target)}</em>
                    </span>
                    <span className="goal-card__pct">{pct} %</span>
                  </div>
                  <div className="bar">
                    <motion.span
                      initial={false}
                      animate={{ width: `${pct}%` }}
                      transition={reduced ? { duration: 0 } : { type: 'spring', duration: 0.6, bounce: 0.1 }}
                    />
                  </div>
                  <div className="goal-card__eta">
                    {pct >= 100 ? 'Ziel erreicht 🎉' : `Ziel erreicht ~ ${computeEta(g)}`}
                  </div>
                </>
              )}

              <AnimatePresence>
                {justFunded && (
                  <motion.span
                    className="goal-card__flash"
                    initial={{ opacity: 0, y: 6, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  >
                    frisch gespart +{fmtEuro(state.lastConfirmAmount)}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          )
        })}

        {/* Neues Ziel */}
        {addable.length > 0 && !picking && (
          <button className="goal-add" onClick={() => setPicking(true)}>
            + Neues Ziel
          </button>
        )}

        <AnimatePresence>
          {picking && (
            <motion.div
              className="goal-picker"
              initial={reduced ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
            >
              <small>Ziel auswählen</small>
              <div className="goal-picker__chips">
                {addable.map((k) => (
                  <button
                    key={k}
                    className="goal-chip"
                    data-locked={k === 'altersvorsorge'}
                    onClick={() => {
                      dispatch({ type: 'NEW_GOAL', key: k as GoalKey })
                      setPicking(false)
                    }}
                  >
                    {GOAL_LABELS[k]}
                    {k === 'altersvorsorge' && <span aria-hidden="true"> 🔒</span>}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
