import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { road } from '../data/businessPlan'
import { SectionHead, Panel } from '../components/Primitives'
import { Reveal } from '../components/Reveal'
import { usePrefersReducedMotion } from '../lib/hooks'

export function Roadmap() {
  const [active, setActive] = useState(1)
  const reduced = usePrefersReducedMotion()
  const phase = road[active]

  return (
    <section id="roadmap" className="section section--tint" data-section>
      <div className="container">
        <Reveal>
          <SectionHead
            num="09"
            kicker="Roadmap"
            title="Validierung → MVP → Premium/B2B → Partner-Investment → DACH."
          >
            Sechs Phasen über 60 Monate statt zu früher Profitabilitätsannahme.
          </SectionHead>
        </Reveal>

        <div className="road">
          <Reveal className="road-rail">
            {road.map((r, i) => (
              <button
                key={r.phase}
                className="road-step"
                data-active={i === active}
                onClick={() => setActive(i)}
              >
                <span className="road-step__dot" aria-hidden="true" />
                <span className="road-step__phase">{r.phase}</span>
                <span className="road-step__title">{r.title}</span>
              </button>
            ))}
          </Reveal>

          <Reveal delay={70}>
            <Panel padLg className="road-detail">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={reduced ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }}
                >
                  <p className="eyebrow">{phase.phase}</p>
                  <h3>{phase.title}</h3>
                  <p>{phase.goal}</p>
                  <ul className="checklist">
                    {phase.milestones.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </Panel>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
