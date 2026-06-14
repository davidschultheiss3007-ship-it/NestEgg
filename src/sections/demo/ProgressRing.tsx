import { motion } from 'framer-motion'
import { useCountUp, usePrefersReducedMotion } from '../../lib/hooks'
import { fmtEuro } from './demoData'

type ProgressRingProps = {
  saved: number
  target: number
  pct: number
  label: string
  /** Optional kompakte Variante für die aktive Ziel-Karte. */
  size?: number
}

/**
 * Handgezeichneter SVG-Fortschrittsring. Track + Progress, runde Caps,
 * −90° gedreht (Start oben). Der dashoffset wird via framer-motion
 * animiert, sodass der Ring beim Bestätigen sanft aufzieht. Die große
 * Euro-Zahl in der Mitte zählt über useCountUp hoch (snap bei reduced).
 */
export function ProgressRing({ saved, target, pct, label, size = 120 }: ProgressRingProps) {
  const reduced = usePrefersReducedMotion()
  const animated = useCountUp(saved)
  const compact = size < 120

  const r = compact ? 22 : 52
  const stroke = compact ? 5 : 9
  const c = 2 * Math.PI * r
  const offset = c * (1 - pct / 100)
  const box = compact ? 56 : 120
  const center = box / 2

  return (
    <div
      className={`ring ${compact ? 'ring--sm' : ''}`.trim()}
      role="img"
      aria-label={`${label}: ${fmtEuro(saved)} von ${fmtEuro(target)}, ${pct} Prozent`}
    >
      <svg viewBox={`0 0 ${box} ${box}`} className="ring__svg" aria-hidden="true">
        <circle
          className="ring__track"
          cx={center}
          cy={center}
          r={r}
          fill="none"
          strokeWidth={stroke}
        />
        <motion.circle
          className="ring__bar"
          cx={center}
          cy={center}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          transform={`rotate(-90 ${center} ${center})`}
          initial={false}
          animate={{ strokeDashoffset: offset }}
          transition={
            reduced
              ? { duration: 0 }
              : { type: 'spring', duration: 0.7, bounce: 0.12 }
          }
        />
      </svg>
      {!compact && (
        <div className="ring__center">
          <strong>{fmtEuro(animated)}</strong>
          <span>
            {pct} % von {fmtEuro(target)}
          </span>
        </div>
      )}
    </div>
  )
}
