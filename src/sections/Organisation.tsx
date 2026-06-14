import { legalFormComparison, legalFormRationale, orgChart, capTable } from '../data/businessPlan'
import { SectionHead, Panel, DataTable } from '../components/Primitives'
import { Reveal } from '../components/Reveal'

export function Organisation() {
  return (
    <section id="organisation" className="section" data-section>
      <div className="container">
        <Reveal>
          <SectionHead
            num="13"
            kicker="Organisation"
            title="GmbH als Zielform / klare Gremien / saubere Cap-Table."
          >
            Rechtsform und Organisationsstruktur sind auf Investoren- und Partnerfähigkeit
            ausgelegt — beschränkte Haftung, klare Entscheidungsgremien und eine nachvollziehbare
            Eigentümerstruktur.
          </SectionHead>
        </Reveal>

        {/* --- Rechtsform-Vergleich --- */}
        <Reveal>
          <Panel padLg>
            <h3>Rechtsformvergleich</h3>
            <DataTable rows={legalFormComparison} caption="Rechtsformvergleich GbR / UG / GmbH" />
          </Panel>
        </Reveal>

        <div className="grid grid--4" style={{ marginTop: 'var(--s-5)' }}>
          {legalFormRationale.map((r, i) => (
            <Reveal key={r.title} delay={i * 60}>
              <article className="layer-card">
                <span className="layer-card__index">{String(i + 1).padStart(2, '0')}</span>
                <h3>{r.title}</h3>
                <p>{r.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* --- Org-Chart / Gremien --- */}
        <Reveal>
          <Panel padLg style={{ marginTop: 'var(--s-5)' }}>
            <h3>Organisation & Gremien</h3>
            <div className="org-chart">
              <div className="org-chart__level org-chart__level--top">
                <article className="org-node org-node--gov">
                  <strong>{orgChart.governance.label}</strong>
                  {orgChart.governance.role && <span>{orgChart.governance.role}</span>}
                </article>
              </div>

              <div className="org-chart__level org-chart__level--mgmt">
                {orgChart.management.map((m, i) => (
                  <article key={i} className="org-node org-node--mgmt">
                    <strong>{m.label}</strong>
                    {m.role && <span>{m.role}</span>}
                  </article>
                ))}
              </div>

              <div className="org-chart__level org-chart__level--teams">
                {orgChart.teams.map((t) => (
                  <article key={t.label} className="org-node">
                    <strong>{t.label}</strong>
                    {t.role && <span>{t.role}</span>}
                  </article>
                ))}
              </div>
            </div>
          </Panel>
        </Reveal>

        {/* --- Eigentümerstruktur / Cap-Table --- */}
        <div className="split" style={{ marginTop: 'var(--s-5)' }}>
          <Reveal>
            <Panel padLg>
              <h3>Eigentümerstruktur (Zielbild)</h3>
              <DataTable rows={capTable} caption="Cap-Table Zielbild nach Seed-Runde" />
            </Panel>
          </Reveal>
          <Reveal delay={70}>
            <Panel padLg>
              <h3>Lesart der Cap-Table</h3>
              <p>
                Die Werte sind ein konservatives, illustratives Zielbild für die Zeit nach der
                Seed-Runde — keine fixierte Zusage. Das Gründerteam behält mit 70 % die
                unternehmerische Führung. Der ESOP-Pool von 12 % bindet Schlüsselpersonen, ohne früh
                zu verwässern. Die 18 % für Seed-Investoren entsprechen 950.000 € Kapital bei einer
                realistischen Frühphasen-Bewertung und sichern ein Beiratsrecht statt operativer
                Kontrolle.
              </p>
            </Panel>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
