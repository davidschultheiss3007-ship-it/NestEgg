# NestEgg

Interaktive Uni-Präsentation für ein FinTech-Konzept rund um Sparroutinen, Ausgabenanalyse, Partner-Investments und ein skalierbares Geschäftsmodell — als React-App mit hellem und dunklem Design, Finanzsimulator, Befehlspalette und Präsentationsmodus.

## Stack

- **React 19 + TypeScript** über **Vite**
- **Framer Motion** für interruptible UI-Animationen (Tabs, Reveals, Präsentationsmodus)
- **Recharts** für die Simulator-Diagramme (lazy geladen)
- CSS-Variablen-Token-System mit hellem Default und Dark-Toggle

## Start

```bash
npm install
npm run dev      # Dev-Server auf http://localhost:4174
npm run build    # Typecheck + Produktionsbuild nach dist/
npm run preview  # Produktionsbuild lokal ansehen
```

## Bedienung

- **⌘K / Strg+K** — Befehlspalette: zu jedem Abschnitt springen, Szenario/Theme wechseln
- **P** — Präsentationsmodus (Vollbild, Navigation mit ← → / Leertaste, Esc beendet)
- **Theme-Toggle** oben rechts — hell/dunkel, gespeichert in `localStorage`, folgt sonst dem System

## Struktur

- `index.html` — HTML-Hülle + Pre-Paint-Theme-Skript (verhindert Theme-Flackern)
- `src/main.tsx` — Einstiegspunkt, lädt Token-/Base-/Feature-CSS
- `src/theme/` — Token-System (`tokens.css`), Basisstile, `ThemeProvider`
- `src/data/` — typisierte Businessplan-Daten (`businessPlan.ts`) und Sektionsregister (`sections.ts`)
- `src/lib/` — Formatierung, Hooks (Reveal, Count-up, Reduced-Motion), Scroll-Spy, Simulator-Logik
- `src/components/` — Primitive (Button, Panel, Tabelle, Tabs), Nav, Cover, Slider, Charts, Befehlspalette, Präsentationsmodus
- `src/sections/` — die 12 Inhaltsabschnitte + Schlussaussage
- `legacy/` — die ursprüngliche Vanilla-HTML/CSS/JS-Version (Referenz)

## Hinweis

Das Projekt ist für eine Uni-Präsentation gedacht. Die Zahlen und Phasen sind als plausibles Präsentationsszenario formuliert, nicht als finaler, geprüfter Businessplan.
