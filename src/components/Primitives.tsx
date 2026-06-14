import type { ButtonHTMLAttributes, ReactNode } from 'react'
import type { Table } from '../data/businessPlan'
import { useCountUp } from '../lib/hooks'

/* ---------------- Button ---------------- */
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'default'
  big?: boolean
  full?: boolean
}

export function Button({
  variant = 'default',
  big,
  full,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const cls = [
    'btn',
    variant === 'primary' && 'btn--primary',
    variant === 'ghost' && 'btn--ghost',
    big && 'btn--big',
    full && 'btn--full',
    className,
  ]
    .filter(Boolean)
    .join(' ')
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  )
}

/* ---------------- Eyebrow ---------------- */
export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>
}

/* ---------------- SectionHead ---------------- */
export function SectionHead({
  num,
  kicker,
  title,
  children,
}: {
  num: string
  kicker: string
  title: ReactNode
  children?: ReactNode
}) {
  return (
    <header className="section-head">
      <Eyebrow>
        {num} · {kicker}
      </Eyebrow>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </header>
  )
}

/* ---------------- Panel ---------------- */
export function Panel({
  children,
  className = '',
  padLg,
  style,
}: {
  children: ReactNode
  className?: string
  padLg?: boolean
  style?: React.CSSProperties
}) {
  return (
    <div className={`panel ${padLg ? 'panel--pad-lg' : ''} ${className}`.trim()} style={style}>
      {children}
    </div>
  )
}

/* ---------------- InfoCard ---------------- */
export function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <article className="info-card">
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  )
}

/* ---------------- KPI ---------------- */
export function KpiCard({ value, label }: { value: string; label: string }) {
  return (
    <article className="kpi-card">
      <strong>{value}</strong>
      <span>{label}</span>
    </article>
  )
}

/* ---------------- DataTable ---------------- */
type Align = 'left' | 'center' | 'right'

/** A value is "numeric" if it is only digits, separators, a sign and an
 *  optional €/% unit — e.g. "266.000 €", "-54 %", "8". Ranges and prose
 *  ("ca. 18 Mio.", "12–18 Monate") are intentionally excluded. */
const NUMERIC = /^[-−–+]?[\d.,]+\s*(€|%)?$/

/** A row whose label reads as a sum ("Umsatz gesamt", "Summe", "Total") —
 *  the punchline of a finance table, worth a closing emphasis band. */
const TOTAL_LABEL = /\b(gesamt|summe|total)\b/i

/** Negative numeric value — leading minus / en-dash on a number, e.g.
 *  "-480.000 €", "-54 %". Used to tint losses in the GuV. */
const NEGATIVE = /^[-−–]/

/** Derive a per-column alignment so a table reads as intended:
 *  row labels left, numbers right (digits line up), short categorical
 *  values centered (comparison matrices). The first column is always the
 *  row label, so it stays left regardless of its content. */
function columnAligns(head: string[], body: string[][]): Align[] {
  return head.map((_, col) => {
    if (col === 0) return 'left'
    const cells = body.map((row) => (row[col] ?? '').trim()).filter((v) => v.length > 0)
    if (cells.length === 0) return 'left'
    if (cells.every((v) => NUMERIC.test(v))) return 'right'
    if (cells.every((v) => v.length <= 16)) return 'center'
    return 'left'
  })
}

export function DataTable({ rows, caption }: { rows: Table; caption?: string }) {
  const [head, ...body] = rows
  const aligns = columnAligns(head, body)
  return (
    <div className="table-wrap">
      <table>
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr>
            {head.map((cell, i) => (
              <th key={i} scope="col" data-align={aligns[i]}>
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, r) => (
            <tr key={r} data-total={TOTAL_LABEL.test(row[0] ?? '') || undefined}>
              {row.map((cell, c) => {
                const value = (cell ?? '').trim()
                const neg = aligns[c] === 'right' && NEGATIVE.test(value) && NUMERIC.test(value)
                return (
                  <td key={c} data-align={aligns[c]} data-neg={neg || undefined}>
                    {cell}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ---------------- Pills ---------------- */
export function Pills({ items }: { items: string[] }) {
  return (
    <div className="pills">
      {items.map((p) => (
        <span key={p}>{p}</span>
      ))}
    </div>
  )
}

/* ---------------- AnimatedNumber ---------------- */
export function AnimatedNumber({
  value,
  format,
}: {
  value: number
  format: (n: number) => string
}) {
  const animated = useCountUp(value)
  return <>{format(animated)}</>
}
