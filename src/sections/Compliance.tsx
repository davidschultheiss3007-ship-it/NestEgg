import { compliance } from '../data/businessPlan'
import { SectionHead } from '../components/Primitives'
import { Reveal } from '../components/Reveal'

export function Compliance() {
  return (
    <section id="compliance" className="section" data-section>
      <div className="container">
        <Reveal>
          <SectionHead num="07" kicker="Compliance" title="Finanzvertrauen entsteht durch klare Grenzen.">
            Kein Depot, keine Order, keine individuelle Anlageberatung im MVP. Kritische Funktionen
            laufen über lizenzierte Partner.
          </SectionHead>
        </Reveal>
        <div className="grid grid--4">
          {compliance.map((layer, i) => (
            <Reveal key={layer.title} delay={i * 60}>
              <article className="layer-card">
                <span className="layer-card__index">{String(i + 1).padStart(2, '0')}</span>
                <h3>{layer.title}</h3>
                <p>{layer.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
