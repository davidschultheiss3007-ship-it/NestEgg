import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../lib/hooks'
import { Button } from './Primitives'

type CoverProps = {
  onEnter: (id: string) => void
}

const proof = ['950.000 € Kapitalbedarf', 'Break-even Jahr 4/5', '7,4 Mio. € Umsatz J5']

export function Cover({ onEnter }: CoverProps) {
  const reduced = usePrefersReducedMotion()

  // Entrance: ease-out, short stagger. Skipped entirely under reduced motion.
  const fade = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, delay, ease: [0.23, 1, 0.32, 1] as const },
        }

  const stage = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24, scale: 0.97 },
          animate: { opacity: 1, y: 0, scale: 1 },
          transition: { duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] as const },
        }

  return (
    <section className="cover" aria-label="Startseite">
      <div className="cover__veil" aria-hidden="true" />
      <div className="cover__inner">
        <div className="cover__copy">
          <motion.p className="eyebrow" {...fade(0.05)}>
            Routine-first · Partner-later · Premium-FinTech
          </motion.p>

          <motion.h1 className="cover__title display" {...fade(0.12)}>
            Finanzroutinen statt&nbsp;Finanzstress.
          </motion.h1>

          <motion.p className="cover__lead" {...fade(0.2)}>
            Ein digitaler Sparcoach für junge Menschen: Start im Alltag, Analyse mit Zustimmung,
            Sparimpulse mit Bestätigung und spätere Investments ausschließlich über regulierte
            Partner.
          </motion.p>

          <motion.div className="cover__actions" {...fade(0.28)}>
            <Button variant="primary" big onClick={() => onEnter('demo')}>
              Demo starten
            </Button>
            <Button variant="ghost" big onClick={() => onEnter('summary')}>
              Präsentation ansehen →
            </Button>
          </motion.div>

          <motion.ul className="cover__proof" {...fade(0.36)}>
            {proof.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </motion.ul>
        </div>

        <motion.div className="cover__stage" aria-hidden="true" {...stage(0.24)}>
          <div className="mock-phone">
            <div className="mock-phone__head">
              <b>NestEgg</b>
              <small>Routine aktiv</small>
            </div>
            <div className="mock-msg mock-msg--bot">
              Du hast diese Woche 18 € weniger für Lieferdienste ausgegeben. 6 € für dein
              Notgroschen-Ziel vormerken?
            </div>
            <div className="mock-msg mock-msg--user">Ja, aber erst bestätigen.</div>
            <div className="mock-msg mock-msg--bot">Sicherer Web-Flow geöffnet. Du entscheidest.</div>
            <div className="mock-phone__input">
              Antwort schreiben&nbsp;…<span>→</span>
            </div>
          </div>

          <motion.div
            className="mock-dash"
            {...(reduced
              ? {}
              : {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.7, delay: 0.42, ease: [0.23, 1, 0.32, 1] as const },
                })}
          >
            <p>Notgroschen</p>
            <strong>185 €</strong>
            <em>19 % erreicht</em>
            <div className="bar">
              <span style={{ width: '19%' }} />
            </div>
            <div className="mock-spark">
              {[28, 42, 35, 58, 73, 88].map((h, i) => (
                <i key={i} style={{ height: `${h}%` }} />
              ))}
            </div>
          </motion.div>

          <div className="mock-chip mock-chip--a">
            <b>82 %</b>
            <span>Routine&nbsp;Score</span>
          </div>
        </motion.div>
      </div>

      <button className="cover__scroll" onClick={() => onEnter('demo')} aria-label="Weiter scrollen">
        <span />
      </button>
    </section>
  )
}
