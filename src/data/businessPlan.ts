/* ============================================================
   NestEgg · Business-Plan-Daten (vollständig portiert)
   Quelle: legacy/script.js (BP). Inhalte unverändert übernommen,
   lediglich typisiert und mit sprechenden Feldnamen versehen.
   ============================================================ */

export type Stat = { value: string; label: string }
export type Topic = { title: string; body: string }
export type Table = string[][]

export type Target = {
  title: string
  body: string
  pills: string[]
}

export type Revenue = {
  title: string
  value: string
  body: string
}

export type RoadPhase = {
  phase: string
  title: string
  goal: string
  milestones: string[]
}

export type SwotKey = 'Strengths' | 'Weaknesses' | 'Opportunities' | 'Threats'

export type Scenario = {
  active: number
  premium: number
  b2b: number
  partner: number
  setup: number
  costs: number
}

/* ---------------------------------------------------------- */

export const kpis: Stat[] = [
  { value: '950.000 €', label: 'Kapitalbedarf bis Ende Monat 24' },
  { value: 'Jahr 4/5', label: 'realistischer operativer Break-even' },
  { value: '7,4 Mio. €', label: 'Umsatz Jahr 5' },
  { value: '1,49 Mio. €', label: 'EBITDA Jahr 5' },
]

export const problems: Topic[] = [
  { title: 'Überforderung', body: 'Finanzprodukte, ETF-Sparen und Depotprozesse wirken zu komplex.' },
  { title: 'Aufschieben', body: 'Sparen wird geplant, aber im Alltag nicht umgesetzt.' },
  { title: 'Impulskäufe', body: 'Spontane Ausgaben sabotieren langfristige Ziele.' },
  { title: 'fehlende Routine', body: 'Kontostände werden kontrolliert, aber nicht aktiv gesteuert.' },
  { title: 'geringe Startbeträge', body: 'Viele glauben, Investieren lohne sich erst später.' },
  { title: 'Vertrauensfrage', body: 'Finanzdaten brauchen transparente Kontrolle und klare Grenzen.' },
]

export const flow: string[] = [
  'Ziel wählen',
  'Ausgaben verstehen',
  'Sparimpuls erhalten',
  'Betrag bestätigen',
  'Fortschritt sehen',
  'später über Partner investieren',
]

export const targets: Target[] = [
  {
    title: 'Lena, 22, Studentin',
    body: 'Will sparen, aber Geld verschwindet in Alltag, Essen, Abos und Freizeit. NestEgg startet mit Notgroschen, kleinen Impulsen und einfacher Sprache.',
    pills: ['Nebenjob', 'kein Depot', 'schnelle Empfehlungen'],
  },
  {
    title: 'Max, 27, Berufseinsteiger',
    body: 'Verdient stabil, gibt aber spontan aus und nutzt sein Depot unregelmäßig. NestEgg verbindet Konsumverhalten mit konkreten Monatszielen.',
    pills: ['erstes Vollzeitgehalt', 'Depot vorhanden', 'braucht Routine'],
  },
  {
    title: 'Sara, 31, Angestellte',
    body: 'Hat mehrere Ziele und will Sicherheit ohne ständige Finanzplanung. NestEgg priorisiert Ziele und zeigt klare Fortschritte.',
    pills: ['Notgroschen', 'Urlaub', 'Vorsorge'],
  },
]

export const mvp: Topic[] = [
  { title: 'Onboarding', body: 'Zielauswahl, Finanzverhalten, Datenschutzfreigabe' },
  { title: 'Kontoverbindung', body: 'Ausgabenkategorien und Sparpotenziale über Partner' },
  { title: 'Sparcoach', body: 'Regelbasierte Vorschläge, Erklärungen und Erinnerungen' },
  { title: 'Sparziele', body: 'Notgroschen, Urlaub, Umzug, Ausbildung, Altersvorsorge' },
  { title: 'Wochenreport', body: 'Routine-Feedback und sichtbarer Fortschritt' },
  { title: 'Admin/Security', body: 'Support, Einwilligungen, Datenschutzlogik' },
]

export const markets: Topic[] = [
  { title: 'Junge Menschen', body: 'finanzielle Selbstständigkeit als starkes Ziel' },
  { title: 'Digitale Finanztools', body: 'Alltagskanal ohne neuen Nutzungskontext' },
  { title: 'ETF-Sparpläne', body: 'wachsender Markt für kleine regelmäßige Beträge' },
  { title: 'Ausgabenanalyse', body: 'datenbasierte Finanzanalyse wird praktikabler' },
]

export const marketSize: Table = [
  ['Ebene', 'Definition', 'Wert'],
  ['TAM', 'Digital affine 18–35 in DACH mit Sparinteresse', 'ca. 18 Mio.'],
  ['SAM', 'Erreichbar über Hochschulen/Employer/B2C in 5 Jahren', 'ca. 4,5 Mio.'],
  ['SOM', 'Realistisch adressierter Anteil bis Jahr 5', '450.000 registriert'],
]

export const competition: Table = [
  ['Dimension', 'Bank', 'Neobroker', 'Budgeting-App', 'NestEgg'],
  ['Alltagsnähe', 'mittel', 'niedrig', 'mittel', 'hoch'],
  ['Investmentzugang', 'mittel', 'hoch', 'niedrig', 'über Partner'],
  ['Begleitung', 'niedrig', 'niedrig', 'mittel', 'hoch'],
  ['Einstiegshürde', 'mittel', 'mittel', 'mittel', 'niedrig'],
  ['Routinen', 'niedrig', 'niedrig', 'mittel', 'hoch'],
]

export const competitionWeighted: Table = [
  ['Kriterium', 'Gewicht', 'NestEgg', 'Bank', 'Neobroker', 'Budgeting-App'],
  ['Alltagsintegration', '30 %', '5', '3', '2', '3'],
  ['Verhaltenswirkung', '25 %', '5', '2', '2', '3'],
  ['Regulatorische Klarheit', '20 %', '4', '4', '3', '4'],
  ['Monetarisierbarkeit', '15 %', '4', '4', '4', '2'],
  ['Skalierbarkeit B2B2C', '10 %', '5', '3', '2', '2'],
]

export const revenues: Revenue[] = [
  {
    title: 'Freemium',
    value: '0 € Einstieg',
    body: 'Kostenloser Einstieg zur Nutzergewinnung: Ziele, Basischeck und einfache Sparimpulse.',
  },
  {
    title: 'Premium-Abo',
    value: '3,99–8,99 €/Monat',
    body: 'Reports, Challenges, Abo-Check, Sparregeln, mehrere Ziele, Export und tiefere Analyse.',
  },
  {
    title: 'B2B2C-Lizenzen',
    value: '1,50–4,00 €/aktivem Nutzer',
    body: 'Hochschulen und Arbeitgeber zahlen für Financial-Wellbeing-Zugang. Wichtigster Skalierungshebel.',
  },
  {
    title: 'Partner-Revenue',
    value: 'ab Jahr 2',
    body: 'Regulierte Partner vergüten qualifizierte Nutzeraktivierung. Vergütung bleibt transparent.',
  },
  {
    title: 'White-Label',
    value: '25.000–75.000 € Setup',
    body: 'NestEgg-Sparcoach als Modul für Banken, Broker oder Versicherer.',
  },
  {
    title: 'AuM-Share',
    value: 'langfristig',
    body: 'Zusatzumsatz aus Partner-Investmentvolumen, aber kein tragendes Frühphasenmodell.',
  },
]

export const compliance: Topic[] = [
  {
    title: 'Coaching Layer',
    body: 'Budgeting, Sparziele, Finanzbildung und Routineimpulse. Keine konkrete Wertpapierempfehlung.',
  },
  {
    title: 'Kontodaten Layer',
    body: 'Kontozugriff nur mit Einwilligung, über lizenzierten Kontoinformationsdienst, widerrufbar.',
  },
  {
    title: 'Investment Layer',
    body: 'Depot, Risikoprofil, Produktinformationen und Orderausführung über regulierte Partner.',
  },
  {
    title: 'Audit & Governance',
    body: 'Klare Trennung zwischen Bildung, Coaching und Empfehlung; nachvollziehbare Produktgrenzen.',
  },
]

export const financeKpis: Stat[] = [
  { value: '2.500', label: 'registrierte Nutzer Jahr 1' },
  { value: '450.000', label: 'registrierte Nutzer Jahr 5' },
  { value: '7,4 Mio. €', label: 'Umsatz Jahr 5' },
  { value: '45', label: 'FTE Jahr 5' },
]

export const assumptions: Table = [
  ['Kennzahl', 'J1', 'J2', 'J3', 'J4', 'J5'],
  ['registrierte Nutzer', '2.500', '25.000', '85.000', '210.000', '450.000'],
  ['aktive Nutzer Ø', '1.500', '15.000', '55.000', '140.000', '300.000'],
  ['Premium-Conversion', '3 %', '6 %', '8 %', '9 %', '10 %'],
  ['zahlende B2C-Nutzer Ø', '45', '900', '4.400', '12.600', '30.000'],
  ['B2B aktive Nutzer Ø', '0', '5.000', '22.000', '55.000', '125.000'],
]

export const revenuesTable: Table = [
  ['Umsatzquelle', 'J1', 'J2', 'J3', 'J4', 'J5'],
  ['B2C Premium', '3.000 €', '54.000 €', '266.000 €', '760.000 €', '1.800.000 €'],
  ['B2B Lizenzen', '12.000 €', '175.000 €', '650.000 €', '1.600.000 €', '3.800.000 €'],
  ['Partner-Revenue', '5.000 €', '42.000 €', '165.000 €', '560.000 €', '1.350.000 €'],
  ['Setup/White-Label', '0 €', '0 €', '80.000 €', '200.000 €', '450.000 €'],
  ['Umsatz gesamt', '20.000 €', '271.000 €', '1.161.000 €', '3.120.000 €', '7.400.000 €'],
]

export const pnl: Table = [
  ['Position', 'J1', 'J2', 'J3', 'J4', 'J5'],
  ['Umsatz', '20.000 €', '271.000 €', '1.161.000 €', '3.120.000 €', '7.400.000 €'],
  ['Gesamtkosten', '-480.000 €', '-1.005.000 €', '-1.790.000 €', '-3.250.000 €', '-5.910.000 €'],
  ['EBITDA', '-460.000 €', '-734.000 €', '-629.000 €', '-130.000 €', '1.490.000 €'],
  ['EBITDA-Marge', '-2300 %', '-271 %', '-54 %', '-4 %', '20 %'],
]

export const funding: Table = [
  ['Verwendung', 'Betrag', 'Anteil'],
  ['Produktentwicklung', '260.000 €', '27 %'],
  ['Team', '230.000 €', '24 %'],
  ['Marketing/Vertrieb', '140.000 €', '15 %'],
  ['Compliance/Recht', '120.000 €', '13 %'],
  ['Kontodaten/Partner', '110.000 €', '12 %'],
  ['Betrieb/Tools', '45.000 €', '5 %'],
  ['Reserve', '45.000 €', '5 %'],
]

export const unitEconomics: Table = [
  ['Kennzahl', 'Annahme', 'Interpretation'],
  ['ARPU (B2C p.a.)', '60,36 €', '5,03 €/Monat durchschnittlich über Tarifmix'],
  ['B2B Erlös je aktivem Nutzer p.a.', '30 €', '2,50 €/Monat als konservativer Mittelwert'],
  ['Partner-Revenue je Nutzer p.a.', '13,75 €', 'Nur bei qualifiziertem Partnerpfad'],
  ['Blended CAC (Zielkorridor)', '35–55 €', 'Mischung aus Campus, Employer, Referral'],
  ['Payback-Ziel', '12–18 Monate', 'Abhängig von B2B/B2C-Mix und Aktivität'],
]

export const b2c: Table = [
  ['Tarif', 'Preis', 'Funktionen'],
  ['Free', '0 €', 'Ziele, Basischeck, einfache Sparimpulse'],
  ['Plus Student', '3,99 €/Monat', 'Reports, Challenges, Abo-Check'],
  ['Plus', '5,99 €/Monat', 'alle Plus-Funktionen'],
  ['Pro', '8,99 €/Monat', 'tiefe Analyse, mehrere Ziele, Export'],
]

export const b2b: Table = [
  ['Produkt', 'Preislogik', 'Zielkunde'],
  ['Campus Pilot', '5.000–15.000 € pauschal', 'Hochschulen'],
  ['Campus License', '1,50–2,50 €/aktivem Nutzer/Monat', 'Hochschulen'],
  ['Employer Wellbeing', '2,50–4,00 €/aktivem Nutzer/Monat', 'Arbeitgeber'],
  ['Partner Integration', '25.000–75.000 € Setup + Lizenz', 'Banken/Broker/Versicherer'],
]

export const road: RoadPhase[] = [
  {
    phase: 'M1–3',
    title: 'Validierung & Partnerstruktur',
    goal: 'Klickdemo, 40–60 Interviews, Datenschutzkonzept, Legal-Mapping.',
    milestones: ['Zielgruppeninterviews', 'Kontodaten-Provider auswählen', 'Partnergespräche', 'Pitchdeck finalisieren'],
  },
  {
    phase: 'M4–9',
    title: 'MVP & Beta',
    goal: 'Web-Onboarding, Sparcoach, Sparzielsystem und Hochschulbeta.',
    milestones: ['1.000–2.500 Nutzer', 'Supportprozess', 'Tracking der Kern-KPIs', 'erste Premium-Tests'],
  },
  {
    phase: 'M10–18',
    title: 'Produkt-/Marktvalidierung',
    goal: 'Premium, Kontodatenanalyse, B2B-Piloten und Qualitätskontrolle.',
    milestones: ['B2B-Pilot 1–3', 'Wochen-/Monatsreports', 'Conversion-Optimierung', 'Investmentpartner vorbereiten'],
  },
  {
    phase: 'M19–30',
    title: 'Partner-Investment',
    goal: 'Depoteröffnung, ETF-Sparplan-Weiterleitung und Partner-Revenue.',
    milestones: ['Risikohinweise', 'Partner-KPIs', 'Revenue-Sharing', 'klare UX-Grenzen'],
  },
  {
    phase: 'M31–48',
    title: 'B2B2C-Skalierung',
    goal: 'Hochschul-/Arbeitgeberlizenzen und Break-even-Korridor.',
    milestones: ['Sales-Team', 'Compliance-Ausbau', 'Automatisierung', 'größere B2B-Verträge'],
  },
  {
    phase: 'M49–60',
    title: 'DACH & White-Label',
    goal: 'Expansion, Enterprise-Angebote und API-Produkt.',
    milestones: ['AT/CH-Prüfung', 'White-Label-Sparcoach', 'Enterprise-Partner', 'optional eigene Regulierung prüfen'],
  },
]

export const swot: Record<SwotKey, string[]> = {
  Strengths: ['niedrige Einstiegshürde', 'Behavioral-Finance-Fokus', 'B2B2C-Vertrieb', 'gute Präsentationsstory'],
  Weaknesses: ['Vertrauen muss aufgebaut werden', 'begrenzte Zahlungsbereitschaft', 'Regulatorik komplex', 'Partnerabhängigkeit'],
  Opportunities: ['ETF- und Sparplanmarkt', 'Financial Wellbeing', 'Kontodatenanalyse', 'digitale Finanzroutinen'],
  Threats: ['Neobroker kopieren Features', 'Plattformregeln ändern sich', 'Regulierung strenger', 'Datenschutzvorfall'],
}

export const swotText: Record<SwotKey, string> = {
  Strengths: 'Die Stärken rechtfertigen einen fokussierten Routine-first-MVP mit starker UX und Partnerarchitektur.',
  Weaknesses: 'Die Schwächen werden durch transparente Datenkontrolle, Freemium+B2B-Modell und schlanke Partnernutzung reduziert.',
  Opportunities: 'Die Chancen sprechen für Hochschul- und Arbeitgeberpiloten sowie spätere White-Label-Partnerschaften.',
  Threats: 'Die Risiken machen Compliance, Plattformdiversifikation und Produkt-Governance zu Pflichtbestandteilen.',
}

/** Deutsche Labels für die SWOT-Quadranten (Anzeige, ohne Daten zu verändern). */
export const swotLabels: Record<SwotKey, string> = {
  Strengths: 'Stärken',
  Weaknesses: 'Schwächen',
  Opportunities: 'Chancen',
  Threats: 'Risiken',
}

export const risks: Table = [
  ['Risiko', 'Priorität', 'Gegenmaßnahme'],
  ['Regulatorische Fehlpositionierung', 'sehr hoch', 'Routine-first, Investment nur über Partner, Rechtsgutachten'],
  ['Geringes Vertrauen in Datenfreigabe', 'hoch', 'transparente Einwilligung, Widerruf, Sicherheitskommunikation'],
  ['Premium-Zahlungsbereitschaft gering', 'hoch', 'B2B-Lizenzen und Partnerumsätze stärken'],
  ['B2B-Vertrieb langsamer', 'hoch', 'kleine Piloten, klare KPI-Reports'],
  ['Plattformabhängigkeit', 'mittel-hoch', 'Web-App, E-Mail/Push und später eigene App'],
  ['Unpassende Produktimpulse', 'hoch', 'Plausibilitätschecks, Tests, Support-Eskalation, keine Renditeversprechen'],
]

export const team: Topic[] = [
  { title: 'CEO / Business Development', body: 'Strategie, Fundraising, Partnerschaften, B2B-Vertrieb' },
  { title: 'CTO', body: 'Architektur, Entwicklung, Security, Skalierung' },
  { title: 'CPO / Product Lead', body: 'UX, Nutzerforschung, Roadmap, Conversion' },
  { title: 'Compliance Advisor', body: 'Regulatorik, Datenschutz, Partnerstruktur' },
  { title: 'Growth Lead', body: 'Marketing, Community, Hochschulakquise' },
]

export const fte: Table = [
  ['Jahr', 'FTE', 'Rollen'],
  ['Jahr 1', '5', 'Gründerteam, Fullstack, Product/Growth, Compliance extern'],
  ['Jahr 2', '9', 'Backend, Data, Support, B2B Sales, Marketing'],
  ['Jahr 3', '16', 'Sales, Compliance, Customer Success, Engineering'],
  ['Jahr 4', '28', 'B2B-Team, Partner Management, Data, Support'],
  ['Jahr 5', '45', 'DACH-Skalierung, Enterprise, Security, Operations'],
]

export const scenarios: Record<string, Scenario> = {
  J1: { active: 1500, premium: 3, b2b: 0, partner: 0, setup: 0, costs: 480000 },
  J3: { active: 55000, premium: 8, b2b: 22000, partner: 12000, setup: 80000, costs: 1790000 },
  J5: { active: 300000, premium: 10, b2b: 125000, partner: 100000, setup: 450000, costs: 5910000 },
}

/** Numerische 5-Jahres-Planung (entspricht revenuesTable / pnl, für Charts). */
export const yearlyPlan: { year: string; revenue: number; costs: number; ebitda: number }[] = [
  { year: 'J1', revenue: 20000, costs: 480000, ebitda: -460000 },
  { year: 'J2', revenue: 271000, costs: 1005000, ebitda: -734000 },
  { year: 'J3', revenue: 1161000, costs: 1790000, ebitda: -629000 },
  { year: 'J4', revenue: 3120000, costs: 3250000, ebitda: -130000 },
  { year: 'J5', revenue: 7400000, costs: 5910000, ebitda: 1490000 },
]

/** Prüfungsanker (Appendix). */
export const examAnchors: string[] = [
  'Regulatorik im MVP getrennt: Coaching ≠ Anlageausführung.',
  'Break-even-Korridor Jahr 4/5 statt aggressiver Frühannahmen.',
  'Mehrkanal-Umsatz (B2C, B2B2C, Partner, White-Label) reduziert Risiko.',
  'Risiko-Register mit konkreten Gegenmaßnahmen und Meilensteinen.',
]

/** Demo-Chat-Skript (type, text, gespartes Volumen in €). */
export const demoSteps: { role: 'bot' | 'user'; text: string; saved: number }[] = [
  { role: 'bot', text: 'Wähle dein erstes Ziel: Notgroschen, Ausgaben verstehen oder ETF-Sparen vorbereiten.', saved: 185 },
  { role: 'user', text: 'Notgroschen aufbauen', saved: 185 },
  { role: 'bot', text: 'Gute Wahl. Optional kannst du Bankdaten über einen lizenzierten Partner verbinden.', saved: 185 },
  { role: 'user', text: 'Analyse starten', saved: 185 },
  { role: 'bot', text: 'Diese Woche sind 23 € Sparpotenzial realistisch. 23 € für dein Ziel sichern?', saved: 185 },
  { role: 'user', text: '23 € sichern', saved: 208 },
  { role: 'bot', text: 'Erledigt. Dein Notgroschen wächst auf 208 €. Noch 792 € bis zum Ziel.', saved: 208 },
]

/* ============================================================
   Sektion 12 · Führung (Unternehmens- & Personalführung)
   ============================================================ */

/** Führungsverständnis als nummerierte Prinzip-Karten (layer-card). */
export const leadershipPrinciples: Topic[] = [
  {
    title: 'Werteorientiert',
    body: 'Nutzervertrauen vor Wachstumstempo. Entscheidungen, die das Versprechen „klare Grenzen, keine Renditeversprechen“ verletzen würden, werden nicht getroffen — auch nicht unter Umsatzdruck.',
  },
  {
    title: 'Compliance-first',
    body: 'Bei Produkt-, Partner- und Marketingentscheidungen hat die regulatorische Klarheit Vorrang. Die Trennung Coaching ≠ Anlageberatung ist nicht verhandelbar und wird vor jedem Release geprüft.',
  },
  {
    title: 'Datengetrieben',
    body: 'Geführt wird entlang weniger Kern-KPIs (Aktivierung, Retention, Sparroutine, B2B-Pipeline). Annahmen werden im Beta-Betrieb getestet, nicht im Meeting behauptet.',
  },
  {
    title: 'Schlank & delegierend',
    body: 'Kleines Kernteam, klare Verantwortlichkeiten je Rolle, kurze Wege. Entschieden wird dort, wo die Kompetenz sitzt — die Geschäftsführung setzt Rahmen statt Mikromanagement.',
  },
]

/** Entscheidungslogik: strategisch vs. operativ. */
export const decisionMatrix: Table = [
  ['Entscheidungstyp', 'Beispiel', 'Wer entscheidet'],
  ['Strategisch', 'Fundraising, Rechtsform, Partnerwahl, Pivot', 'Geschäftsführung + Gesellschafter, Beirat berät'],
  ['Compliance-kritisch', 'Funktionsgrenze, Datenfreigabe-Logik, Marketingaussage', 'Geschäftsführung mit Veto des Compliance-Advisors'],
  ['Produkt/Roadmap', 'Feature-Priorisierung, Release-Umfang', 'CPO mit CTO, entlang KPI-Zielen'],
  ['Operativ', 'Sprint, Support, Kampagne, Einstellung im Rahmen', 'Verantwortliche Rolle eigenständig'],
]

/** Governance-Rhythmus: Routinen, die Führung planbar machen. */
export const leadershipCadence: Table = [
  ['Takt', 'Routine', 'Zweck'],
  ['Wöchentlich', 'Team-Sync & KPI-Blick', 'Fortschritt, Blocker, kurzfristige Prioritäten'],
  ['Monatlich', 'Geschäftsführungs-Review', 'KPIs vs. Plan, Liquidität, Risiken, Hiring'],
  ['Quartalsweise', 'Beirats- & Strategiesitzung', 'Roadmap-Check, Meilensteine, Investoren-Update'],
  ['Jährlich', 'Gesellschafterversammlung & Planung', 'Jahresabschluss, Budget, strategische Ziele'],
]

/** Beirat/Advisory: bewusst extern eingekaufte Kompetenz statt Festkosten. */
export const advisory: Topic[] = [
  {
    title: 'Compliance-/Regulatorik-Beirat',
    body: 'Externer Compliance-Advisor begleitet Funktionsgrenzen, Partnerstruktur und Datenschutz. Mit Veto bei compliance-kritischen Entscheidungen.',
  },
  {
    title: 'FinTech-/Partner-Beirat',
    body: 'Erfahrung aus Banking, Brokerage und Plattform-Partnerschaften — wichtig für saubere Verträge mit regulierten Partnern.',
  },
  {
    title: 'Vertriebs-/B2B2C-Beirat',
    body: 'Zugang und Erfahrung im Hochschul- und Arbeitgebervertrieb, dem zentralen Skalierungshebel ab Jahr 2–3.',
  },
]

/** HR-Prinzipien als Karten. */
export const hrPrinciples: Topic[] = [
  {
    title: 'Recruiting über Hochschulnähe',
    body: 'Werkstudierende, Praktika und Junior-Rollen aus dem Hochschulumfeld — dieselbe Nähe, die NestEgg im B2B2C-Vertrieb nutzt. Senior-Rollen gezielt über Netzwerk und Beirat.',
  },
  {
    title: 'Onboarding & Entwicklung',
    body: 'Strukturierte erste 30/60/90 Tage, fester Buddy, klare Rollenprofile. Lernbudget und interne Wissensweitergabe statt teurer externer Schulungen.',
  },
  {
    title: 'Kultur & Werte',
    body: 'Verantwortung, Transparenz und Nutzerfokus. Fehler werden offen besprochen, Entscheidungen dokumentiert. Diversität als Stärke für eine breite Zielgruppe.',
  },
  {
    title: 'Vergütung & Beteiligung',
    body: 'Marktübliche Gehälter im KMU-Rahmen plus virtuelle Anteile (ESOP/VSOP). Reservierter Pool von 12 % bindet Schlüsselpersonen, ohne die Cap-Table früh zu verwässern.',
  },
  {
    title: 'Remote-hybrid',
    body: 'Hybrides Arbeiten mit festen gemeinsamen Tagen. Asynchrone Dokumentation als Standard — passt zu schlankem Team und überregionalem Recruiting in der DACH-Phase.',
  },
  {
    title: 'Motivation & Bindung',
    body: 'Sinnstiftende Mission (finanzielle Selbstständigkeit junger Menschen), Eigenverantwortung und sichtbarer Beitrag zum Produkt. Frühe Mitarbeitende wachsen in Führungsrollen hinein.',
  },
]

/** Werte als Chips (Pills). */
export const cultureValues: string[] = [
  'Nutzervertrauen zuerst',
  'Transparenz',
  'Eigenverantwortung',
  'klare Grenzen',
  'Lernen aus Daten',
  'Verlässlichkeit',
]

/** Wie Führung mit FTE 5 → 45 mitwächst (verweist auf fte / Roadmap). */
export const leadershipPhases: Topic[] = [
  {
    title: 'Phase 1 · 5 FTE (Jahr 1) — Gründer führen direkt',
    body: 'Flache Struktur, Gründerteam entscheidet operativ mit. Compliance extern. Fokus: MVP, Beta, erste Routinen. Führung = gemeinsames Arbeiten am Produkt.',
  },
  {
    title: 'Phase 2 · 9–16 FTE (Jahr 2–3) — erste Teamleads',
    body: 'Engineering, Product, Growth und Support bekommen Verantwortliche. B2B-Sales und Compliance werden intern aufgebaut. Erste delegierte Budgets und KPI-Ziele je Bereich.',
  },
  {
    title: 'Phase 3 · 28 FTE (Jahr 4) — Bereiche & Sales-Team',
    body: 'Mit dem Sales-Team (Roadmap M31–48) und Partner-Management entstehen klar abgegrenzte Bereiche. Geschäftsführung steuert über Bereichsleitungen, nicht mehr einzelne Aufgaben.',
  },
  {
    title: 'Phase 4 · 45 FTE (Jahr 5) — DACH-Organisation',
    body: 'Eigenständige Funktionen für Enterprise, Security und Operations. Führung über definierte Prozesse, Quartalsziele und ein professionelles Beirats-/Reporting-Setup.',
  },
]

/* ============================================================
   Sektion 13 · Organisation (Rechtsform, Gremien, Eigentümer)
   ============================================================ */

/** Rechtsform-Vergleich GbR / UG / GmbH über NestEgg-relevante Kriterien. */
export const legalFormComparison: Table = [
  ['Kriterium', 'GbR', 'UG (haftungsbeschränkt)', 'GmbH'],
  ['Haftung', 'unbeschränkt, persönlich', 'beschränkt', 'beschränkt'],
  ['Mindestkapital', '0 €', '1 €', '25.000 €'],
  ['Investorentauglichkeit', 'gering', 'mittel', 'hoch'],
  ['Partner-/Lizenzfähigkeit', 'gering', 'mittel', 'hoch'],
  ['Cap-Table & Anteile', 'unpraktisch', 'möglich', 'sauber abbildbar'],
  ['Aufwand & Kosten', 'niedrig', 'mittel', 'höher'],
  ['Außenwirkung', 'schwach', 'mittel', 'stark'],
  ['Eignung für NestEgg', 'ungeeignet', 'Übergang', 'Zielform'],
]

/** Begründung der GmbH-Wahl als Karten. */
export const legalFormRationale: Topic[] = [
  {
    title: 'Haftungsbeschränkung',
    body: 'Bei einem regulierungsnahen Finanzprodukt schützt die GmbH die Gründer vor persönlicher Haftung — Grundvoraussetzung, um überhaupt mit Daten und Partnern zu arbeiten.',
  },
  {
    title: 'Stammkapital aus Seed gedeckt',
    body: 'Die 25.000 € Stammkapital sind aus der Seed-Runde (950.000 €) problemlos darstellbar. Die Hürde gegenüber der UG ist im Verhältnis zum Vertrauensgewinn gering.',
  },
  {
    title: 'Saubere Cap-Table',
    body: 'Geschäftsanteile, ESOP-Pool und spätere Investorenanteile lassen sich rechtssicher und übersichtlich abbilden — Voraussetzung für eine professionelle Finanzierungsrunde.',
  },
  {
    title: 'Vertrauenssignal',
    body: 'Regulierte Partner (Banken, Broker, KID-Anbieter) und B2B-Kunden (Hochschulen, Arbeitgeber) erwarten eine GmbH als verlässlichen, etablierten Vertragspartner.',
  },
]

/** Knoten im Organigramm. Eigener Typ, da Hierarchie sich nicht als Topic/Table abbildet. */
export type OrgNode = { label: string; role?: string }

export const orgChart: {
  governance: OrgNode
  management: OrgNode[]
  teams: OrgNode[]
} = {
  governance: { label: 'Gesellschafterversammlung', role: 'Gründer + Seed-Investoren' },
  management: [
    { label: 'Geschäftsführung', role: 'CEO — Strategie, Fundraising, B2B' },
    { label: 'Geschäftsführung', role: 'CTO — Technik, Security, Skalierung' },
  ],
  teams: [
    { label: 'Product', role: 'CPO — UX, Roadmap, Conversion' },
    { label: 'Engineering', role: 'Architektur, Entwicklung, Daten' },
    { label: 'Growth', role: 'Marketing, Community, Hochschulen' },
    { label: 'Compliance', role: 'Regulatorik, Datenschutz, Partner' },
  ],
}

/** Eigentümerstruktur / Cap-Table als Zielbild (illustrativ, konservativ). */
export const capTable: Table = [
  ['Anteilsgruppe', 'Anteil', 'Funktion'],
  ['Gründerteam', '70 %', 'operative Führung, langfristige Bindung'],
  ['ESOP-Pool (virtuell)', '12 %', 'Beteiligung von Schlüsselpersonen'],
  ['Seed-Investoren', '18 %', 'Kapital 950.000 €, Beiratsrecht'],
  ['Gesamt', '100 %', 'Zielbild nach Seed-Runde'],
]
