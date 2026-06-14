import { problems } from '../data/businessPlan'
import { SectionHead, InfoCard } from '../components/Primitives'
import { Reveal } from '../components/Reveal'

export function Problem() {
  return (
    <section id="problem" className="section" data-section>
      <div className="container">
        <Reveal>
          <SectionHead num="03" kicker="Problem" title="Das Problem ist Verhalten, nicht Information.">
            Junge Menschen wissen oft, dass sie sparen sollten. Die Umsetzung scheitert an Aufschub,
            Impulskäufen, geringer Routine und komplizierten Finanzprodukten.
          </SectionHead>
        </Reveal>
        <div className="grid grid--3">
          {problems.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 60}>
              <InfoCard title={p.title} body={p.body} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
