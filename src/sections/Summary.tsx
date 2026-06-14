import { kpis } from '../data/businessPlan'
import { SectionHead, KpiCard, Panel } from '../components/Primitives'
import { Reveal } from '../components/Reveal'

export function Summary() {
  return (
    <section id="summary" className="section section--tint" data-section>
      <div className="container">
        <Reveal>
          <SectionHead num="02" kicker="Executive Summary" title="Routine-first statt komplizierter Investment-Einstieg.">
            NestEgg ist ein FinTech-Frontend mit Behavioral-Finance-Fokus. Investments werden nicht
            eigenständig erbracht, sondern später über regulierte Partner angebunden.
          </SectionHead>
        </Reveal>

        <div className="grid grid--4">
          {kpis.map((k, i) => (
            <Reveal key={k.label} delay={i * 60}>
              <KpiCard value={k.value} label={k.label} />
            </Reveal>
          ))}
        </div>

        <div className="split" style={{ marginTop: 'var(--s-5)' }}>
          <Reveal>
            <Panel padLg>
              <h3>Businessplan-Kern</h3>
              <p>
                NestEgg verwandelt alltägliche Ausgabenmuster in kleine Sparentscheidungen. Nutzer
                behalten Kontrolle; Kontoverbindung ist optional; Investmentprozesse laufen getrennt
                über Partner.
              </p>
            </Panel>
          </Reveal>
          <Reveal delay={70}>
            <Panel padLg>
              <h3>Warum das Modell überzeugt</h3>
              <p>
                Die Idee verbindet Kundennutzen, Marktpotenzial, Machbarkeit, Regulatorik,
                Finanzierung, Personalplanung, Risiken und Präsentierbarkeit.
              </p>
            </Panel>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
