import {
  leadershipPrinciples,
  decisionMatrix,
  leadershipCadence,
  advisory,
  hrPrinciples,
  cultureValues,
  leadershipPhases,
} from '../data/businessPlan'
import { SectionHead, Panel, InfoCard, DataTable, Pills } from '../components/Primitives'
import { Reveal } from '../components/Reveal'

export function Fuehrung() {
  return (
    <section id="fuehrung" className="section section--tint" data-section>
      <div className="container">
        <Reveal>
          <SectionHead
            num="12"
            kicker="Führung"
            title="Werteorientiert führen / compliance-first entscheiden."
          >
            Unternehmens- und Personalführung sind bei NestEgg ein System: klare Prinzipien,
            planbare Routinen und eine Struktur, die mit dem Team von 5 auf 45 FTE mitwächst.
          </SectionHead>
        </Reveal>

        {/* --- Unternehmensführung --- */}
        <Reveal>
          <p className="eyebrow">Unternehmensführung</p>
        </Reveal>

        <div className="grid grid--4">
          {leadershipPrinciples.map((p, i) => (
            <Reveal key={p.title} delay={i * 60}>
              <article className="layer-card">
                <span className="layer-card__index">{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="split" style={{ marginTop: 'var(--s-5)' }}>
          <Reveal>
            <Panel padLg>
              <h3>Entscheidungswege</h3>
              <DataTable rows={decisionMatrix} caption="Entscheidungslogik" />
            </Panel>
          </Reveal>
          <Reveal delay={70}>
            <Panel padLg>
              <h3>Governance-Rhythmus</h3>
              <DataTable rows={leadershipCadence} caption="Führungsroutinen" />
            </Panel>
          </Reveal>
        </div>

        <Reveal>
          <Panel padLg style={{ marginTop: 'var(--s-5)' }}>
            <h3>Beirat & Advisory</h3>
            <div className="grid grid--3" style={{ marginTop: 'var(--s-4)' }}>
              {advisory.map((a) => (
                <InfoCard key={a.title} title={a.title} body={a.body} />
              ))}
            </div>
          </Panel>
        </Reveal>

        {/* --- Personalführung --- */}
        <Reveal>
          <p className="eyebrow" style={{ marginTop: 'var(--s-7)' }}>
            Personalführung
          </p>
        </Reveal>

        <div className="grid grid--3">
          {hrPrinciples.map((p, i) => (
            <Reveal key={p.title} delay={i * 60}>
              <InfoCard title={p.title} body={p.body} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <Panel padLg style={{ marginTop: 'var(--s-5)' }}>
            <h3>Kultur & Werte</h3>
            <Pills items={cultureValues} />
          </Panel>
        </Reveal>

        <Reveal>
          <Panel padLg style={{ marginTop: 'var(--s-5)' }}>
            <h3>Führung wächst mit (5 → 45 FTE)</h3>
            <div className="grid grid--2" style={{ marginTop: 'var(--s-4)' }}>
              {leadershipPhases.map((p) => (
                <InfoCard key={p.title} title={p.title} body={p.body} />
              ))}
            </div>
          </Panel>
        </Reveal>
      </div>
    </section>
  )
}
