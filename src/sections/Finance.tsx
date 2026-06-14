import { useMemo, useState } from 'react'
import {
  financeKpis,
  scenarios,
  unitEconomics,
  assumptions,
  revenuesTable,
  pnl,
  funding,
  type Scenario,
} from '../data/businessPlan'
import {
  calculate,
  CONTROLS,
  GROUP_LABELS,
  GROUP_ORDER,
  type ControlMeta,
} from '../lib/simulator'
import { euro, fmt } from '../lib/format'
import { SectionHead, KpiCard, Panel, DataTable, AnimatedNumber } from '../components/Primitives'
import { Slider } from '../components/Slider'
import { EbitdaChart, RevenueMixChart } from '../components/LazyCharts'
import { Reveal } from '../components/Reveal'

const SCENARIO_KEYS = Object.keys(scenarios)

function formatControl(meta: ControlMeta, value: number): string {
  if (meta.kind === 'percent') return `${value} %`
  if (meta.kind === 'count') return fmt(value)
  return euro(value)
}

export function Finance() {
  const [activeScenario, setActiveScenario] = useState<string | null>('J3')
  const [state, setState] = useState<Scenario>({ ...scenarios.J3 })
  const [compareKey, setCompareKey] = useState<string>('J5')

  const result = useMemo(() => calculate(state), [state])
  const compareResult = useMemo(() => calculate(scenarios[compareKey]), [compareKey])

  const applyScenario = (key: string) => {
    setState({ ...scenarios[key] })
    setActiveScenario(key)
  }

  const updateControl = (key: keyof Scenario, value: number) => {
    setState((prev) => ({ ...prev, [key]: value }))
    setActiveScenario(null) // free-form once a slider moves
  }

  const mix = (part: number) => (result.revenue ? Math.round((part / result.revenue) * 100) : 0)

  return (
    <section id="finance" className="section" data-section>
      <div className="container">
        <Reveal>
          <SectionHead
            num="08"
            kicker="Finanzplanung"
            title="Kapitalbedarf 950.000 €. Break-even realistisch Jahr 4/5."
          >
            Der Finanzplan bleibt bewusst konservativer als ein früher M18-Break-even und zeigt die
            Skalierung über B2B2C.
          </SectionHead>
        </Reveal>

        <div className="grid grid--4">
          {financeKpis.map((k, i) => (
            <Reveal key={k.label} delay={i * 60}>
              <KpiCard value={k.value} label={k.label} />
            </Reveal>
          ))}
        </div>

        {/* ---- Simulator ---- */}
        <Reveal>
          <div className="sim">
            <div className="sim__intro">
              <div>
                <p className="eyebrow">Live</p>
                <h3>Financial Control Center</h3>
                <p className="sim__lead">
                  Teste Jahr-1-, Jahr-3- und Jahr-5-Logik. Der Simulator rechnet Premium, B2B,
                  Partner- und Setup-Umsatz gegen Kosten.
                </p>
              </div>
              <div className="sim__scenarios" role="group" aria-label="Szenario wählen">
                {SCENARIO_KEYS.map((key) => (
                  <button
                    key={key}
                    className="chip"
                    data-active={activeScenario === key}
                    onClick={() => applyScenario(key)}
                  >
                    {key} Szenario
                  </button>
                ))}
              </div>
            </div>

            <div className="sim__grid">
              {/* Controls */}
              <div className="sim__controls">
                {GROUP_ORDER.map((groupKey) => (
                  <fieldset className="control-group" key={groupKey}>
                    <legend>{GROUP_LABELS[groupKey]}</legend>
                    {CONTROLS.filter((c) => c.group === groupKey).map((c) => (
                      <Slider
                        key={c.key}
                        id={`sim-${c.key}`}
                        label={c.label}
                        help={c.help}
                        min={c.min}
                        max={c.max}
                        step={c.step}
                        value={state[c.key]}
                        displayValue={formatControl(c, state[c.key])}
                        minLabel={formatControl(c, c.min)}
                        maxLabel={formatControl(c, c.max)}
                        onChange={(v) => updateControl(c.key, v)}
                      />
                    ))}
                  </fieldset>
                ))}
              </div>

              {/* Results */}
              <aside className="sim__results">
                <div className={`result-hero ${result.ebitda < 0 ? 'is-neg' : 'is-pos'}`}>
                  <span>EBITDA</span>
                  <b>
                    <AnimatedNumber value={result.ebitda} format={euro} />
                  </b>
                  <small>
                    Marge: {Math.round(result.margin)} % · Umsatz pro aktivem Nutzer:{' '}
                    {euro(result.arpuMix)}
                  </small>
                </div>

                <div className="result-row">
                  <div className="result-cell">
                    <span>Zahlende Nutzer</span>
                    <b>
                      <AnimatedNumber value={result.premiumUsers} format={fmt} />
                    </b>
                  </div>
                  <div className="result-cell">
                    <span>Umsatz gesamt</span>
                    <b>
                      <AnimatedNumber value={result.revenue} format={euro} />
                    </b>
                  </div>
                  <div className="result-cell">
                    <span>Gesamtkosten</span>
                    <b>
                      <AnimatedNumber value={result.costs} format={euro} />
                    </b>
                  </div>
                </div>

                <RevenueMixChart
                  b2c={result.b2c}
                  b2b={result.b2b}
                  partner={result.partner}
                  setup={result.setup}
                />
                <p className="result-mix-text">
                  B2C {mix(result.b2c)}% · B2B {mix(result.b2b)}% · Partner {mix(result.partner)}%
                </p>

                <EbitdaChart />
              </aside>
            </div>

            {/* Scenario A/B compare */}
            <div className="sim__compare">
              <div className="sim__compare-head">
                <h4>Szenario-Vergleich</h4>
                <div className="seg" role="group" aria-label="Vergleichsszenario">
                  {SCENARIO_KEYS.map((key) => (
                    <button
                      key={key}
                      className="seg__btn"
                      data-active={compareKey === key}
                      onClick={() => setCompareKey(key)}
                    >
                      {key}
                    </button>
                  ))}
                </div>
              </div>
              <div className="compare-grid">
                <CompareCol label="Aktuell (eingestellt)" result={result} highlight />
                <CompareCol label={`${compareKey} Szenario`} result={compareResult} />
              </div>
            </div>
          </div>
        </Reveal>

        {/* ---- Unit economics ---- */}
        <Reveal>
          <Panel padLg className="finance-unit-econ">
            <h3>Unit Economics (Kernlogik)</h3>
            <DataTable rows={unitEconomics} caption="Unit Economics" />
          </Panel>
        </Reveal>

        {/* ---- Finance tables ---- */}
        <div className="finance-tables">
          <Reveal>
            <Panel padLg>
              <h3>Kernannahmen</h3>
              <DataTable rows={assumptions} caption="Kernannahmen" />
            </Panel>
          </Reveal>
          <Reveal delay={60}>
            <Panel padLg>
              <h3>Umsatzplanung</h3>
              <DataTable rows={revenuesTable} caption="Umsatzplanung" />
            </Panel>
          </Reveal>
          <Reveal>
            <Panel padLg>
              <h3>GuV</h3>
              <DataTable rows={pnl} caption="Gewinn- und Verlustrechnung" />
            </Panel>
          </Reveal>
          <Reveal delay={60}>
            <Panel padLg>
              <h3>Mittelverwendung</h3>
              <DataTable rows={funding} caption="Mittelverwendung" />
            </Panel>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function CompareCol({
  label,
  result,
  highlight,
}: {
  label: string
  result: ReturnType<typeof calculate>
  highlight?: boolean
}) {
  return (
    <div className="compare-col" data-highlight={!!highlight}>
      <p className="compare-col__label">{label}</p>
      <div className="compare-col__hero" data-neg={result.ebitda < 0}>
        <span>EBITDA</span>
        <b>{euro(result.ebitda)}</b>
      </div>
      <dl>
        <div>
          <dt>Umsatz</dt>
          <dd>{euro(result.revenue)}</dd>
        </div>
        <div>
          <dt>Kosten</dt>
          <dd>{euro(result.costs)}</dd>
        </div>
        <div>
          <dt>Marge</dt>
          <dd>{Math.round(result.margin)} %</dd>
        </div>
        <div>
          <dt>Zahlende Nutzer</dt>
          <dd>{fmt(result.premiumUsers)}</dd>
        </div>
      </dl>
    </div>
  )
}
