import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SECTIONS } from '../data/sections'
import { kpis, examAnchors, road, swot, swotLabels, type SwotKey } from '../data/businessPlan'
import { useScrollLock, usePrefersReducedMotion, useFocusTrap } from '../lib/hooks'

type PresentProps = {
  open: boolean
  onClose: () => void
  startId?: string | null
}

/** Compact slide content per section — the talking points, large and calm. */
function slideBody(id: string) {
  switch (id) {
    case 'summary':
      return (
        <ul className="slide__kpis">
          {kpis.map((k) => (
            <li key={k.label}>
              <strong>{k.value}</strong>
              <span>{k.label}</span>
            </li>
          ))}
        </ul>
      )
    case 'roadmap':
      return (
        <ul className="slide__list">
          {road.map((r) => (
            <li key={r.phase}>
              <b>{r.phase}</b> {r.title}
            </li>
          ))}
        </ul>
      )
    case 'swot':
      return (
        <div className="slide__swot">
          {(Object.keys(swot) as SwotKey[]).map((k) => (
            <div key={k}>
              <h4>{swotLabels[k]}</h4>
              <p>{swot[k].join(' · ')}</p>
            </div>
          ))}
        </div>
      )
    case 'appendix':
      return (
        <ul className="slide__list">
          {examAnchors.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      )
    default:
      return null
  }
}

const SUBTITLES: Record<string, string> = {
  demo: 'Der erste Mehrwert entsteht in einem einfachen App-Moment.',
  summary: 'Routine-first statt komplizierter Investment-Einstieg.',
  problem: 'Das Problem ist Verhalten, nicht Information.',
  product: 'Aus Ausgabenmustern werden konkrete nächste Schritte.',
  market: 'Ein Markt, in dem vier Trends zusammenlaufen.',
  model: 'Mehrkanal-Umsatz als Stabilitätsanker.',
  compliance: 'Finanzvertrauen entsteht durch klare Grenzen.',
  finance: 'Kapitalbedarf 950.000 €. Break-even Jahr 4/5.',
  roadmap: 'Validierung → MVP → Premium/B2B → Partner → DACH.',
  swot: 'Risiken werden steuerbar gemacht.',
  team: 'Schlankes Kernteam, Partner für Infrastruktur.',
  fuehrung: 'Werteorientiert, compliance-first, datengetrieben — Führung, die mitwächst.',
  organisation: 'GmbH als Zielform. Klare Gremien, saubere Cap-Table.',
  appendix: 'Backup für Q&A.',
}

export function PresentMode({ open, onClose, startId }: PresentProps) {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const reduced = usePrefersReducedMotion()
  const trapRef = useFocusTrap<HTMLDivElement>(open)
  useScrollLock(open)

  // Sync starting slide when opened.
  useEffect(() => {
    if (!open) return
    const i = SECTIONS.findIndex((s) => s.id === startId)
    setIndex(i >= 0 ? i : 0)
    setDir(1)
  }, [open, startId])

  const go = useCallback(
    (delta: number) => {
      setDir(delta)
      setIndex((i) => Math.min(SECTIONS.length - 1, Math.max(0, i + delta)))
    },
    [],
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault()
        go(1)
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault()
        go(-1)
      } else if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, go, onClose])

  if (!open) return null

  const section = SECTIONS[index]
  const variants = {
    enter: (d: number) => ({ opacity: 0, x: reduced ? 0 : d * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: reduced ? 0 : d * -40 }),
  }

  return (
    <div
      className="present"
      role="dialog"
      aria-modal="true"
      aria-label="Präsentationsmodus"
      ref={trapRef}
    >
      <div className="present__bar">
        <span className="present__brand">NestEgg</span>
        <span
          className="present__counter"
          aria-label={`Folie ${index + 1} von ${SECTIONS.length}`}
        >
          {String(index + 1).padStart(2, '0')} / {String(SECTIONS.length).padStart(2, '0')}
        </span>
        <button className="present__close" onClick={onClose} aria-label="Präsentation beenden">
          Esc ✕
        </button>
      </div>

      <div className="present__stage" aria-live="polite">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={section.id}
            className="slide"
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
          >
            <p className="slide__num">
              {section.num} · {section.title}
            </p>
            <h2 className="slide__title display">{SUBTITLES[section.id] ?? section.title}</h2>
            <div className="slide__body">{slideBody(section.id)}</div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="present__nav">
        <button onClick={() => go(-1)} disabled={index === 0} aria-label="Zurück">
          ←
        </button>
        <div className="present__dots">
          {SECTIONS.map((s, i) => (
            <button
              key={s.id}
              className="present__dot"
              data-active={i === index}
              onClick={() => {
                setDir(i > index ? 1 : -1)
                setIndex(i)
              }}
              aria-label={`Folie ${i + 1}: ${s.title}`}
            />
          ))}
        </div>
        <button onClick={() => go(1)} disabled={index === SECTIONS.length - 1} aria-label="Weiter">
          →
        </button>
      </div>
    </div>
  )
}
