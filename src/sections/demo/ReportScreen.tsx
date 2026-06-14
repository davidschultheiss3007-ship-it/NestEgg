import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '../../components/Primitives'
import { usePrefersReducedMotion } from '../../lib/hooks'
import { fmtEuro, plural } from './demoData'
import { usePhone, weekDepositedOf } from './phoneStore'
import { WeekBars } from './WeekBars'

const CONFETTI = ['var(--accent)', 'var(--viz-2)', 'var(--viz-3)', 'var(--viz-4)']

export function ReportScreen() {
  const { state, dispatch } = usePhone()
  const reduced = usePrefersReducedMotion()
  const weekDeposited = weekDepositedOf(state)

  return (
    <div className="pv">
      <header className="pv__title">
        <h3>Wochenreport</h3>
      </header>

      {/* Sparkline + Celebration */}
      <div className="card report__chart">
        <AnimatePresence>
          {state.celebrate && !reduced && <Confetti onDone={() => dispatch({ type: 'CLEAR_CELEBRATE' })} />}
        </AnimatePresence>
        <WeekBars week={state.week} />
        <p className="report__headline">
          Diese Woche <b>+{fmtEuro(weekDeposited)}</b> · {plural(state.streakDays, 'Tag', 'Tage')} Streak ·
          Score <b>{state.score} %</b>
        </p>
      </div>

      {/* Insights */}
      <section className="report__insights">
        {state.insights.map((ins) => {
          const open = state.expandedInsight === ins.id
          return (
            <button
              key={ins.id}
              className="insight"
              data-open={open}
              onClick={() => dispatch({ type: 'TOGGLE_INSIGHT', id: ins.id })}
              aria-expanded={open}
              aria-controls={`insight-detail-${ins.id}`}
            >
              <div className="insight__head">
                <span className="insight__bullet" aria-hidden="true" />
                <b>{ins.short}</b>
                <span className="insight__chev" data-open={open} aria-hidden="true">›</span>
              </div>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.p
                    id={`insight-detail-${ins.id}`}
                    className="insight__detail"
                    initial={reduced ? false : { opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
                    transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }}
                  >
                    {ins.detail}
                  </motion.p>
                )}
              </AnimatePresence>
            </button>
          )
        })}
      </section>

      {/* Gesperrter ETF-Teaser */}
      <button className="report__etf" onClick={() => dispatch({ type: 'OPEN_SHEET', sheet: 'etf' })}>
        <span className="report__etf-lock" aria-hidden="true">🔒</span>
        <span className="report__etf-body">
          <b>Bereit für mehr?</b>
          <small>ETF-Sparen über regulierten Partner — kommt später</small>
        </span>
        <span className="report__etf-chev" aria-hidden="true">›</span>
      </button>

      {/* Finale */}
      <Button variant="ghost" full onClick={() => dispatch({ type: 'CLOSE_WEEK' })}>
        Woche abschließen
      </Button>
    </div>
  )
}

/** Zurückhaltendes Konfetti beim Überschreiten einer Score-Schwelle. */
function Confetti({ onDone }: { onDone: () => void }) {
  // 14 kleine Rechtecke; deterministische Streuung (kein Math.random).
  const pieces = Array.from({ length: 14 }, (_, i) => {
    const left = (i * 37) % 100
    const delay = (i % 5) * 0.04
    const rotate = (i % 2 === 0 ? 1 : -1) * (120 + (i % 4) * 40)
    const color = CONFETTI[i % CONFETTI.length]
    return { left, delay, rotate, color, i }
  })
  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((p) => (
        <motion.span
          key={p.i}
          style={{ left: `${p.left}%`, background: p.color }}
          initial={{ opacity: 1, y: -8, rotate: 0 }}
          animate={{ opacity: 0, y: 90, rotate: p.rotate }}
          transition={{ duration: 0.9, ease: 'easeIn', delay: p.delay }}
          onAnimationComplete={p.i === 0 ? onDone : undefined}
        />
      ))}
    </div>
  )
}
