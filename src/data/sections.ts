/** Einzige Quelle der Wahrheit für Sektions-Reihenfolge, Nav, Scroll-Spy,
 *  Command-Palette und Präsentationsmodus. */

export type SectionDef = {
  id: string
  /** Kurzlabel für die Navigation. */
  nav: string
  /** Nummer im Eyebrow (z. B. "01"). */
  num: string
  /** Vollständiger Titel für Palette/Präsentation. */
  title: string
}

export const SECTIONS: SectionDef[] = [
  { id: 'demo', nav: 'Demo', num: '01', title: 'Produktdemo' },
  { id: 'summary', nav: 'Summary', num: '02', title: 'Executive Summary' },
  { id: 'problem', nav: 'Problem', num: '03', title: 'Problem' },
  { id: 'product', nav: 'Produkt', num: '04', title: 'Produkt' },
  { id: 'market', nav: 'Markt', num: '05', title: 'Markt & Wettbewerb' },
  { id: 'model', nav: 'Modell', num: '06', title: 'Geschäftsmodell' },
  { id: 'compliance', nav: 'Compliance', num: '07', title: 'Compliance' },
  { id: 'finance', nav: 'Finanzen', num: '08', title: 'Finanzplanung & Simulator' },
  { id: 'roadmap', nav: 'Roadmap', num: '09', title: 'Roadmap' },
  { id: 'swot', nav: 'SWOT', num: '10', title: 'SWOT & Risiken' },
  { id: 'team', nav: 'Team', num: '11', title: 'Team & Gründer' },
  { id: 'fuehrung', nav: 'Führung', num: '12', title: 'Führung' },
  { id: 'organisation', nav: 'Organisation', num: '13', title: 'Organisation' },
  { id: 'appendix', nav: 'Appendix', num: '14', title: 'Appendix' },
]
