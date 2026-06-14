import { useEffect, useState } from 'react'
import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts'
import { yearlyPlan } from '../data/businessPlan'
import { euro } from '../lib/format'
import { useTheme } from '../theme/ThemeProvider'

/** Reads resolved CSS custom properties so charts track the active theme. */
function useThemeColors() {
  const { theme } = useTheme()
  const [colors, setColors] = useState({
    accent: '#0d7355',
    neg: '#c63d4e',
    grid: 'rgba(0,0,0,.1)',
    text: '#5a646d',
    surface: '#fff',
    border: 'rgba(0,0,0,.1)',
    viz1: '#0d7355',
    viz2: '#e0a32e',
    viz3: '#4a9fe0',
    viz4: '#b06bd6',
  })

  useEffect(() => {
    const cs = getComputedStyle(document.documentElement)
    const v = (name: string, fallback: string) => cs.getPropertyValue(name).trim() || fallback
    setColors({
      accent: v('--accent', '#0d7355'),
      neg: v('--neg', '#c63d4e'),
      grid: v('--border', 'rgba(0,0,0,.1)'),
      text: v('--text-muted', '#5a646d'),
      surface: v('--surface', '#fff'),
      border: v('--border-strong', 'rgba(0,0,0,.17)'),
      viz1: v('--viz-1', '#0d7355'),
      viz2: v('--viz-2', '#e0a32e'),
      viz3: v('--viz-3', '#4a9fe0'),
      viz4: v('--viz-4', '#b06bd6'),
    })
  }, [theme])

  return colors
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: { name?: string; value?: number; color?: string }[]
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="chart-tip">
      {label && <strong>{label}</strong>}
      {payload.map((p, i) => (
        <span key={i} style={{ color: p.color }}>
          {p.name}: {euro(Number(p.value ?? 0))}
        </span>
      ))}
    </div>
  )
}

/** 5-year EBITDA trajectory with break-even reference line. */
export function EbitdaChart() {
  const c = useThemeColors()
  return (
    <div className="chart-card">
      <p className="chart-card__title">EBITDA-Verlauf (5-Jahres-Plan)</p>
      <div className="chart-card__body">
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={yearlyPlan} margin={{ top: 8, right: 8, bottom: 0, left: 8 }}>
            <defs>
              <linearGradient id="ebitdaFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={c.accent} stopOpacity={0.4} />
                <stop offset="100%" stopColor={c.accent} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="year"
              tick={{ fill: c.text, fontSize: 12 }}
              axisLine={{ stroke: c.grid }}
              tickLine={false}
            />
            <ReferenceLine y={0} stroke={c.grid} strokeDasharray="4 4" />
            <Tooltip content={<ChartTooltip />} cursor={{ stroke: c.grid }} />
            <Area
              type="monotone"
              dataKey="ebitda"
              name="EBITDA"
              stroke={c.accent}
              strokeWidth={2.5}
              fill="url(#ebitdaFill)"
              dot={{ r: 3, fill: c.surface, stroke: c.accent, strokeWidth: 2 }}
              activeDot={{ r: 5 }}
              isAnimationActive
              animationDuration={650}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

/** Live revenue-mix donut driven by the simulator. */
export function RevenueMixChart({
  b2c,
  b2b,
  partner,
  setup,
}: {
  b2c: number
  b2b: number
  partner: number
  setup: number
}) {
  const c = useThemeColors()
  const data = [
    { name: 'B2C', value: Math.max(0, b2c), color: c.viz1 },
    { name: 'B2B', value: Math.max(0, b2b), color: c.viz2 },
    { name: 'Partner', value: Math.max(0, partner), color: c.viz3 },
    { name: 'Setup', value: Math.max(0, setup), color: c.viz4 },
  ].filter((d) => d.value > 0)

  const total = data.reduce((sum, d) => sum + d.value, 0)

  return (
    <div className="chart-card">
      <p className="chart-card__title">Umsatzmix</p>
      <div className="chart-card__body mix-body">
        <div className="mix-chart">
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie
                data={data.length ? data : [{ name: '—', value: 1, color: c.grid }]}
                dataKey="value"
                innerRadius={42}
                outerRadius={64}
                paddingAngle={data.length > 1 ? 2 : 0}
                stroke="none"
                isAnimationActive
                animationDuration={500}
              >
                {(data.length ? data : [{ name: '—', value: 1, color: c.grid }]).map((d, i) => (
                  <Cell key={i} fill={d.color} />
                ))}
              </Pie>
              {data.length > 0 && <Tooltip content={<ChartTooltip />} />}
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="mix-legend">
          {data.map((d) => (
            <li key={d.name}>
              <i style={{ background: d.color }} />
              <span>{d.name}</span>
              <b>{total ? Math.round((d.value / total) * 100) : 0}%</b>
            </li>
          ))}
          {!data.length && <li className="mix-legend__empty">Noch keine Umsätze</li>}
        </ul>
      </div>
    </div>
  )
}
