import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { swot, swotText, swotLabels, risks, type SwotKey } from '../data/businessPlan'
import { SectionHead, Panel, DataTable } from '../components/Primitives'
import { Reveal } from '../components/Reveal'
import { usePrefersReducedMotion } from '../lib/hooks'

const KEYS = Object.keys(swot) as SwotKey[]

export function Swot() {
  const [active, setActive] = useState<SwotKey>('Strengths')
  const reduced = usePrefersReducedMotion()

  return (
    <section id="swot" className="section" data-section>
      <div className="container">
        <Reveal>
          <SectionHead num="10" kicker="SWOT & Risiken" title="Risiken werden steuerbar gemacht.">
            Klicke auf einen Quadranten, um die strategische Konsequenz zu sehen.
          </SectionHead>
        </Reveal>

        <div className="swot-wrap">
          <Reveal className="swot-grid">
            {KEYS.map((key) => (
              <button
                key={key}
                className="swot-cell"
                data-key={key}
                data-active={key === active}
                onClick={() => setActive(key)}
              >
                <h3>{swotLabels[key]}</h3>
                <ul>
                  {swot[key].map((v) => (
                    <li key={v}>{v}</li>
                  ))}
                </ul>
              </button>
            ))}
          </Reveal>

          <Reveal delay={70}>
            <Panel padLg className="swot-detail">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={reduced ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }}
                >
                  <p className="eyebrow">Strategische Konsequenz</p>
                  <h3>{swotLabels[active]}</h3>
                  <p>{swotText[active]}</p>
                </motion.div>
              </AnimatePresence>
            </Panel>
          </Reveal>
        </div>

        <Reveal>
          <Panel padLg style={{ marginTop: 'var(--s-5)' }}>
            <h3>Hauptrisiken</h3>
            <DataTable rows={risks} caption="Hauptrisiken" />
          </Panel>
        </Reveal>
      </div>
    </section>
  )
}
