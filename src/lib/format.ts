/** Währungs- und Zahlenformatierung — identisch zur Legacy-Logik. */

const euroFormatter = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
})

const numberFormatter = new Intl.NumberFormat('de-DE')

export const euro = (value: number): string => euroFormatter.format(value)

export const fmt = (value: number): string => numberFormatter.format(Math.round(value))
