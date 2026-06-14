import { team, fte } from '../data/businessPlan'
import { SectionHead, Panel, InfoCard, DataTable } from '../components/Primitives'
import { Reveal } from '../components/Reveal'

export function Team() {
  return (
    <section id="team" className="section" data-section>
      <div className="container">
        <Reveal>
          <SectionHead num="11" kicker="Team & Gründer" title="Schlankes Kernteam, Partner für Infrastruktur.">
            Interne Kompetenz bleibt bei Produkt, Datenmodell, UX, Qualität, Marke und
            Partnersteuerung.
          </SectionHead>
        </Reveal>

        <div className="split">
          <Reveal>
            <Panel padLg>
              <h3>Gründerteam</h3>
              <div className="grid grid--2 team-grid">
                {team.map((member) => (
                  <InfoCard key={member.title} title={member.title} body={member.body} />
                ))}
              </div>
            </Panel>
          </Reveal>
          <Reveal delay={70}>
            <Panel padLg>
              <h3>Personalplanung</h3>
              <DataTable rows={fte} caption="Personalplanung" />
            </Panel>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
