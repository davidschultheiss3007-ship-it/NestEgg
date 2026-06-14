import { markets, marketSize, competition, competitionWeighted } from '../data/businessPlan'
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
      </div>
    </section>
  )
}
