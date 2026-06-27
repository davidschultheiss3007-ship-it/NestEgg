import {
  markets,
  marketSize,
  competition,
  competitionWeighted,
  competitionNamed,
  competitionDefense,
  validationPlan,
} from '../data/businessPlan'
import { SectionHead, InfoCard, Panel, DataTable } from '../components/Primitives'
import { Reveal } from '../components/Reveal'

export function Market() {
  return (
    <section id="market" className="section section--tint" data-section>
      <div className="container">
        <Reveal>
          <SectionHead num="05" kicker="Markt & Wettbewerb" title="Ein Markt, in dem vier Trends zusammenlaufen.">
            Junge Zielgruppe, digitale Finanztools, ETF-Sparpläne und datenbasierte Ausgabenanalyse
            schaffen ein plausibles Marktfenster.
          </SectionHead>
        </Reveal>

        <div className="grid grid--4">
          {markets.map((m, i) => (
            <Reveal key={m.title} delay={i * 60}>
              <InfoCard title={m.title} body={m.body} />
            </Reveal>
          ))}
        </div>

        <div className="split" style={{ marginTop: 'var(--s-5)' }}>
          <Reveal>
            <Panel padLg>
              <h3>TAM / SAM / SOM (DACH, modellhaft)</h3>
              <DataTable rows={marketSize} caption="TAM SAM SOM" />
            </Panel>
          </Reveal>
          <Reveal delay={70}>
            <Panel padLg>
              <h3>Wettbewerb: Gewichtete Bewertung</h3>
              <DataTable rows={competitionWeighted} caption="Gewichtete Wettbewerbsbewertung" />
            </Panel>
          </Reveal>
        </div>

        <Reveal>
          <Panel padLg style={{ marginTop: 'var(--s-5)' }} className="market-compare">
            <h3>Wettbewerbsvergleich</h3>
            <DataTable rows={competition} caption="Wettbewerbsvergleich" />
          </Panel>
        </Reveal>

        <Reveal>
          <Panel padLg style={{ marginTop: 'var(--s-5)' }}>
            <h3>Abgrenzung zu konkreten Alternativen</h3>
            <DataTable rows={competitionNamed} caption="Abgrenzung zu konkreten Wettbewerbern" />
            <p style={{ marginTop: 'var(--s-3)', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              {competitionDefense}
            </p>
          </Panel>
        </Reveal>

        <Reveal>
          <Panel padLg style={{ marginTop: 'var(--s-5)' }}>
            <p className="eyebrow">Validierungsplan — kein abgeschlossener Forschungsstand</p>
            <h3>Validierungslogik</h3>
            <div className="grid grid--4" style={{ marginTop: 'var(--s-3)' }}>
              {validationPlan.map((item) => (
                <div key={item.title}>
                  <strong style={{ display: 'block', marginBottom: 'var(--s-1)' }}>{item.title}</strong>
                  <p style={{ fontSize: '0.875rem' }}>{item.body}</p>
                </div>
              ))}
            </div>
          </Panel>
        </Reveal>
      </div>
    </section>
  )
}
