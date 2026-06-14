import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { revenues, b2c, b2b } from '../data/businessPlan'
import { SectionHead, Panel, DataTable } from '../components/Primitives'
import { Tabs } from '../components/Tabs'
import { Reveal } from '../components/Reveal'
import { usePrefersReducedMotion } from '../lib/hooks'

export function Model() {
  const [active, setActive] = useState(0)
  const reduced = usePrefersReducedMotion()
  const r = revenues[active]

  return (
    <section id="model" className="section" data-section>
      <div className="container">
        <Reveal>
          <SectionHead num="06" kicker="Geschäftsmodell" title="Nicht nur AuM. Mehrkanal-Umsatz als Stabilitätsanker.">
            Premium, B2B2C, Partner-Revenue, White-Label und langfristiger AuM-Share machen das
            Modell robuster.
          </SectionHead>
        </Reveal>

        <div className="model-layout">
          <Reveal>
            <Tabs
              layoutGroup="revenue"
              ariaLabel="Umsatzquellen"
              vertical
              active={String(active)}
              onChange={(id) => setActive(Number(id))}
              items={revenues.map((rev, i) => ({
                id: String(i),
                label: (
                  <>
                    {rev.title}
                    <small>{rev.value}</small>
                  </>
                ),
              }))}
            />
          </Reveal>

          <Reveal delay={60}>
            <Panel padLg className="revenue-feature">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={reduced ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }}
                >
                  <p className="eyebrow">Umsatzquelle</p>
                  <h3>{r.title}</h3>
                  <strong className="revenue-feature__value">{r.value}</strong>
                  <p>{r.body}</p>
                </motion.div>
              </AnimatePresence>
            </Panel>
          </Reveal>
        </div>

        <div className="split" style={{ marginTop: 'var(--s-5)' }}>
          <Reveal>
            <Panel padLg>
              <h3>B2C Pricing</h3>
              <DataTable rows={b2c} caption="B2C Pricing" />
            </Panel>
          </Reveal>
          <Reveal delay={70}>
            <Panel padLg>
              <h3>B2B Pricing</h3>
              <DataTable rows={b2b} caption="B2B Pricing" />
            </Panel>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
