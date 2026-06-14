import { SectionHead } from '../components/Primitives'
import { Reveal } from '../components/Reveal'
import { PhoneApp } from './demo/PhoneApp'
import './demo/phoneApp.css'

/** Was die Audience beim Durchtippen sehen soll — reine Begleittexte. */
const captions = [
  {
    n: '01',
    title: 'Eine App, ein Datenstand',
    body: 'Jeder Screen liest denselben Store. Eine Bestätigung im Coach bewegt Ziel, Streak, Score und „verfügbar" gleichzeitig — auch auf den Tabs, die gerade nicht offen sind.',
  },
  {
    n: '02',
    title: 'Routine statt Renditeversprechen',
    body: 'Der Coach erklärt jeden Impuls („Warum?“) und bleibt Coaching — keine Anlageempfehlung. Investieren liegt bewusst hinter einem regulierten Partner.',
  },
  {
    n: '03',
    title: 'Skaliert über Zielgruppen',
    body: 'Persona wechseln (Lena → Max → Sara) skinnt die ganze App neu: andere Ziele, andere Beträge, andere Einwilligung. Dieselbe Logik, drei Nutzer.',
  },
]

export function Demo() {
  return (
    <section id="demo" className="section" data-section>
      <div className="container">
        <Reveal>
          <SectionHead num="01" kicker="Produktdemo" title="Eine vollständige App — live durchtippbar.">
            NestEgg im MVP: Sparziele, Ausgabenmuster und konkrete Routinen sichtbar gemacht.
            Tippe dich durch Heute, Coach, Ziele und Report — alles teilt einen Datenstand.
          </SectionHead>
        </Reveal>

        <div className="demo-app-layout">
          <Reveal className="demo-app-phone">
            <PhoneApp />
          </Reveal>

          <Reveal as="div" delay={60} className="demo-app-notes">
            {captions.map((c) => (
              <article key={c.n} className="demo-note">
                <b>{c.n}</b>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
