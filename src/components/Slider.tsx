type SliderProps = {
  id: string
  label: string
  help: string
  min: number
  max: number
  step: number
  value: number
  displayValue: string
  minLabel: string
  maxLabel: string
  onChange: (value: number) => void
}

/** Polished range slider: track fill follows the value, accent thumb. */
export function Slider({
  id,
  label,
  help,
  min,
  max,
  step,
  value,
  displayValue,
  minLabel,
  maxLabel,
  onChange,
}: SliderProps) {
  const fill = ((value - min) / (max - min)) * 100

  return (
    <div className="slider">
      <div className="slider__head">
        <label htmlFor={id}>{label}</label>
        <output htmlFor={id}>{displayValue}</output>
      </div>
      <p className="slider__help" id={`${id}-help`}>
        {help}
      </p>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ ['--fill' as string]: `${fill}%` }}
        aria-describedby={`${id}-help`}
      />
      <div className="slider__scale">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  )
}
