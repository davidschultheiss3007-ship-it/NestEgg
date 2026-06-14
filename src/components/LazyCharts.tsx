import { lazy, Suspense } from 'react'

const EbitdaChartImpl = lazy(() =>
  import('./SimCharts').then((m) => ({ default: m.EbitdaChart })),
)
const RevenueMixChartImpl = lazy(() =>
  import('./SimCharts').then((m) => ({ default: m.RevenueMixChart })),
)

const fallback = (label: string) => (
  <div className="chart-card">
    <p className="chart-card__title">{label}</p>
    <div className="chart-skeleton" aria-hidden="true" />
  </div>
)

export function EbitdaChart() {
  return <Suspense fallback={fallback('EBITDA-Verlauf (5-Jahres-Plan)')}>{<EbitdaChartImpl />}</Suspense>
}

export function RevenueMixChart(props: {
  b2c: number
  b2b: number
  partner: number
  setup: number
}) {
  return <Suspense fallback={fallback('Umsatzmix')}>{<RevenueMixChartImpl {...props} />}</Suspense>
}
