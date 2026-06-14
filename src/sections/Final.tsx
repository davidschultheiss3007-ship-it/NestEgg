import { Reveal } from '../components/Reveal'

export function Final() {
  return (
    <section className="section final" aria-label="Schlussaussage">
      <div className="container">
        <Reveal>
          <div className="final-card">
            <p className="eyebrow">Schlussaussage</p>
            <h2 className="display">
              NestEgg ist kein weiterer Broker. NestEgg ist der Einstieg davor.
            </h2>
            <p>
              Genau diese Fokussierung macht aus der ursprünglichen Pitch-Idee ein realistisches,
              skalierbares und präsentationsfähiges KMU-Gründungskonzept.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
