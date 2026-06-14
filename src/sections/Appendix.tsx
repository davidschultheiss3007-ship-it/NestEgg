import { examAnchors } from '../data/businessPlan'
import { SectionHead, Panel } from '../components/Primitives'
import { Reveal } from '../components/Reveal'

export function Appendix() {
  return (
    <section id="appendix" className="section section--tint" data-section>
      <div className="container">
        <Reveal>
          <SectionHead num="12" kicker="Appendix" title="Backup für Q&A.">
            Diese Seite bündelt die wichtigsten Kennzahlen für Rückfragen in der Diskussion.
          </SectionHead>
        </Reveal>
        <Reveal>
          <Panel padLg>
            <h3>Prüfungsanker</h3>
            <ul className="checklist checklist--lg">
              {examAnchors.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </Panel>
        </Reveal>
      </div>
    </section>
  )
}
