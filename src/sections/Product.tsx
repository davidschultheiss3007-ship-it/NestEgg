import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { flow, targets, mvp } from '../data/businessPlan'
import { SectionHead, Panel, InfoCard, Pills } from '../components/Primitives'
import { Tabs } from '../components/Tabs'
import { Reveal } from '../components/Reveal'
import { usePrefersReducedMotion } from '../lib/hooks'

export function Product() {
  const [active, setActive] = useState(0)
  const reduced = usePrefersReducedMotion()
  const target = targets[active]

  return (
    <section id="product" className="section" data-section>
      <div className="container">
        <Reveal>
          <SectionHead num="04" kicker="Produkt" title="Aus Ausgabenmustern werden konkrete nächste Schritte.">
            Der Produktpfad ist bewusst phasenweise: Ziel, Analyse, Impuls, Bestätigung, Fortschritt,
            Partner-Investment.
          </SectionHead>
        </Reveal>

        <div className="flow">
          {flow.map((step, i) => (
            <Reveal key={step} delay={(i % 6) * 50} className="flow-card">
              <b>{String(i + 1).padStart(2, '0')}</b>
              <h3>{step}</h3>
              <p>{i < 5 ? 'Routine-Logik' : 'regulierter Partnerpfad'}</p>
            </Reveal>
          ))}
        </div>

        <div className="split" style={{ marginTop: 'var(--s-6)' }}>
          <Reveal>
            <Panel padLg>
              <div className="panel-top">
                <h3>Zielgruppen</h3>
                <span className="tag-chip">Tabs</span>
              </div>
              <Tabs
                layoutGroup="targets"
                ariaLabel="Zielgruppen"
                active={String(active)}
                onChange={(id) => setActive(Number(id))}
                items={targets.map((t, i) => ({ id: String(i), label: t.title.split(',')[0] }))}
              />
              <div className="target-panel">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={reduced ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <h4>{target.title}</h4>
                    <p>{target.body}</p>
                    <Pills items={target.pills} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </Panel>
          </Reveal>

          <Reveal delay={70}>
            <Panel padLg>
              <h3>MVP-Funktionen</h3>
              <div className="grid grid--2 mvp-grid">
                {mvp.map((m) => (
                  <InfoCard key={m.title} title={m.title} body={m.body} />
                ))}
              </div>
            </Panel>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
