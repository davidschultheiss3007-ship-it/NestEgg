import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../../lib/hooks'
import { weekMax } from './demoData'
import type { WeekDay } from './phoneStore'

/**
 * 7-Balken-Wochen-Sparkline (Mo..So). Der heutige Balken ist accent-gefüllt
 * und wächst per framer-motion beim Bestätigen; die übrigen sind ruhig.
 */
export function WeekBars({ week }: { week: WeekDay[] }) {
  const reduced = usePrefersReducedMotion()
  const max = weekMax(week)

  return (
    <div className="weekbars" role="img" aria-label="Sparvolumen je Wochentag">
      {week.map((d, i) => {
        const h = d.amount > 0 ? Math.max(6, (d.amount / max) * 100) : 4
        return (
          <div className="weekbars__col" key={d.day}>
            <div className="weekbars__track">
              <motion.span
                className="weekbars__fill"
                data-today={d.isToday}
                data-empty={d.amount === 0}
                initial={false}
                animate={{ height: `${h}%` }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : { type: 'spring', duration: 0.55, bounce: 0.18, delay: i * 0.015 }
                }
              />
            </div>
            <small data-today={d.isToday}>{d.day}</small>
          </div>
        )
      })}
    </div>
  )
}
