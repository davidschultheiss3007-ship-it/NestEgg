const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const euro = (value) =>
  new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);

const fmt = (value) => new Intl.NumberFormat("de-DE").format(Math.round(value));

const BP = {
  kpis: [
    ["950.000 €", "Kapitalbedarf bis Ende Monat 24"],
    ["Jahr 4/5", "realistischer operativer Break-even"],
    ["7,4 Mio. €", "Umsatz Jahr 5"],
    ["1,49 Mio. €", "EBITDA Jahr 5"],
  ],
  problems: [
    ["Überforderung", "Finanzprodukte, ETF-Sparen und Depotprozesse wirken zu komplex."],
    ["Aufschieben", "Sparen wird geplant, aber im Alltag nicht umgesetzt."],
    ["Impulskäufe", "Spontane Ausgaben sabotieren langfristige Ziele."],
    ["fehlende Routine", "Kontostände werden kontrolliert, aber nicht aktiv gesteuert."],
    ["geringe Startbeträge", "Viele glauben, Investieren lohne sich erst später."],
    ["Vertrauensfrage", "Finanzdaten brauchen transparente Kontrolle und klare Grenzen."],
  ],
  flow: [
    "Ziel wählen",
    "Ausgaben verstehen",
    "Sparimpuls erhalten",
    "Betrag bestätigen",
    "Fortschritt sehen",
    "später über Partner investieren",
  ],
  targets: [
    {
      t: "Lena, 22, Studentin",
      d: "Will sparen, aber Geld verschwindet in Alltag, Essen, Abos und Freizeit. NestEgg startet mit Notgroschen, kleinen Impulsen und einfacher Sprache.",
      p: ["Nebenjob", "kein Depot", "schnelle Empfehlungen"],
    },
    {
      t: "Max, 27, Berufseinsteiger",
      d: "Verdient stabil, gibt aber spontan aus und nutzt sein Depot unregelmäßig. NestEgg verbindet Konsumverhalten mit konkreten Monatszielen.",
      p: ["erstes Vollzeitgehalt", "Depot vorhanden", "braucht Routine"],
    },
    {
      t: "Sara, 31, Angestellte",
      d: "Hat mehrere Ziele und will Sicherheit ohne ständige Finanzplanung. NestEgg priorisiert Ziele und zeigt klare Fortschritte.",
      p: ["Notgroschen", "Urlaub", "Vorsorge"],
    },
  ],
  mvp: [
    ["Onboarding", "Zielauswahl, Finanzverhalten, Datenschutzfreigabe"],
    ["Kontoverbindung", "Ausgabenkategorien und Sparpotenziale über Partner"],
    ["Sparcoach", "Regelbasierte Vorschläge, Erklärungen und Erinnerungen"],
    ["Sparziele", "Notgroschen, Urlaub, Umzug, Ausbildung, Altersvorsorge"],
    ["Wochenreport", "Routine-Feedback und sichtbarer Fortschritt"],
    ["Admin/Security", "Support, Einwilligungen, Datenschutzlogik"],
  ],
  markets: [
    ["Junge Menschen", "finanzielle Selbstständigkeit als starkes Ziel"],
    ["Digitale Finanztools", "Alltagskanal ohne neuen Nutzungskontext"],
    ["ETF-Sparpläne", "wachsender Markt für kleine regelmäßige Beträge"],
    ["Ausgabenanalyse", "datenbasierte Finanzanalyse wird praktikabler"],
  ],
  marketSize: [
    ["Ebene", "Definition", "Wert"],
    ["TAM", "Digital affine 18–35 in DACH mit Sparinteresse", "ca. 18 Mio."],
    ["SAM", "Erreichbar über Hochschulen/Employer/B2C in 5 Jahren", "ca. 4,5 Mio."],
    ["SOM", "Realistisch adressierter Anteil bis Jahr 5", "450.000 registriert"],
  ],
  competition: [
    ["Dimension", "Bank", "Neobroker", "Budgeting-App", "NestEgg"],
    ["Alltagsnähe", "mittel", "niedrig", "mittel", "hoch"],
    ["Investmentzugang", "mittel", "hoch", "niedrig", "über Partner"],
    ["Begleitung", "niedrig", "niedrig", "mittel", "hoch"],
    ["Einstiegshürde", "mittel", "mittel", "mittel", "niedrig"],
    ["Routinen", "niedrig", "niedrig", "mittel", "hoch"],
  ],
  competitionWeighted: [
    ["Kriterium", "Gewicht", "NestEgg", "Bank", "Neobroker", "Budgeting-App"],
    ["Alltagsintegration", "30 %", "5", "3", "2", "3"],
    ["Verhaltenswirkung", "25 %", "5", "2", "2", "3"],
    ["Regulatorische Klarheit", "20 %", "4", "4", "3", "4"],
    ["Monetarisierbarkeit", "15 %", "4", "4", "4", "2"],
    ["Skalierbarkeit B2B2C", "10 %", "5", "3", "2", "2"],
  ],
  revenues: [
    {
      t: "Freemium",
      v: "0 € Einstieg",
      d: "Kostenloser Einstieg zur Nutzergewinnung: Ziele, Basischeck und einfache Sparimpulse.",
    },
    {
      t: "Premium-Abo",
      v: "3,99–8,99 €/Monat",
      d: "Reports, Challenges, Abo-Check, Sparregeln, mehrere Ziele, Export und tiefere Analyse.",
    },
    {
      t: "B2B2C-Lizenzen",
      v: "1,50–4,00 €/aktivem Nutzer",
      d: "Hochschulen und Arbeitgeber zahlen für Financial-Wellbeing-Zugang. Wichtigster Skalierungshebel.",
    },
    {
      t: "Partner-Revenue",
      v: "ab Jahr 2",
      d: "Regulierte Partner vergüten qualifizierte Nutzeraktivierung. Vergütung bleibt transparent.",
    },
    {
      t: "White-Label",
      v: "25.000–75.000 € Setup",
      d: "NestEgg-Sparcoach als Modul für Banken, Broker oder Versicherer.",
    },
    {
      t: "AuM-Share",
      v: "langfristig",
      d: "Zusatzumsatz aus Partner-Investmentvolumen, aber kein tragendes Frühphasenmodell.",
    },
  ],
  compliance: [
    ["Coaching Layer", "Budgeting, Sparziele, Finanzbildung und Routineimpulse. Keine konkrete Wertpapierempfehlung."],
    ["Kontodaten Layer", "Kontozugriff nur mit Einwilligung, über lizenzierten Kontoinformationsdienst, widerrufbar."],
    ["Investment Layer", "Depot, Risikoprofil, Produktinformationen und Orderausführung über regulierte Partner."],
    ["Audit & Governance", "Klare Trennung zwischen Bildung, Coaching und Empfehlung; nachvollziehbare Produktgrenzen."],
  ],
  financeKpis: [
    ["2.500", "registrierte Nutzer Jahr 1"],
    ["450.000", "registrierte Nutzer Jahr 5"],
    ["7,4 Mio. €", "Umsatz Jahr 5"],
    ["45", "FTE Jahr 5"],
  ],
  assumptions: [
    ["Kennzahl", "J1", "J2", "J3", "J4", "J5"],
    ["registrierte Nutzer", "2.500", "25.000", "85.000", "210.000", "450.000"],
    ["aktive Nutzer Ø", "1.500", "15.000", "55.000", "140.000", "300.000"],
    ["Premium-Conversion", "3 %", "6 %", "8 %", "9 %", "10 %"],
    ["zahlende B2C-Nutzer Ø", "45", "900", "4.400", "12.600", "30.000"],
    ["B2B aktive Nutzer Ø", "0", "5.000", "22.000", "55.000", "125.000"],
  ],
  revenuesTable: [
    ["Umsatzquelle", "J1", "J2", "J3", "J4", "J5"],
    ["B2C Premium", "3.000 €", "54.000 €", "266.000 €", "760.000 €", "1.800.000 €"],
    ["B2B Lizenzen", "12.000 €", "175.000 €", "650.000 €", "1.600.000 €", "3.800.000 €"],
    ["Partner-Revenue", "5.000 €", "42.000 €", "165.000 €", "560.000 €", "1.350.000 €"],
    ["Setup/White-Label", "0 €", "0 €", "80.000 €", "200.000 €", "450.000 €"],
    ["Umsatz gesamt", "20.000 €", "271.000 €", "1.161.000 €", "3.120.000 €", "7.400.000 €"],
  ],
  pnl: [
    ["Position", "J1", "J2", "J3", "J4", "J5"],
    ["Umsatz", "20.000 €", "271.000 €", "1.161.000 €", "3.120.000 €", "7.400.000 €"],
    ["Gesamtkosten", "-480.000 €", "-1.005.000 €", "-1.790.000 €", "-3.250.000 €", "-5.910.000 €"],
    ["EBITDA", "-460.000 €", "-734.000 €", "-629.000 €", "-130.000 €", "1.490.000 €"],
    ["EBITDA-Marge", "-2300 %", "-271 %", "-54 %", "-4 %", "20 %"],
  ],
  funding: [
    ["Verwendung", "Betrag", "Anteil"],
    ["Produktentwicklung", "260.000 €", "27 %"],
    ["Team", "230.000 €", "24 %"],
    ["Marketing/Vertrieb", "140.000 €", "15 %"],
    ["Compliance/Recht", "120.000 €", "13 %"],
    ["Kontodaten/Partner", "110.000 €", "12 %"],
    ["Betrieb/Tools", "45.000 €", "5 %"],
    ["Reserve", "45.000 €", "5 %"],
  ],
  unitEconomics: [
    ["Kennzahl", "Annahme", "Interpretation"],
    ["ARPU (B2C p.a.)", "60,36 €", "5,03 €/Monat durchschnittlich über Tarifmix"],
    ["B2B Erlös je aktivem Nutzer p.a.", "30 €", "2,50 €/Monat als konservativer Mittelwert"],
    ["Partner-Revenue je Nutzer p.a.", "13,75 €", "Nur bei qualifiziertem Partnerpfad"],
    ["Blended CAC (Zielkorridor)", "35–55 €", "Mischung aus Campus, Employer, Referral"],
    ["Payback-Ziel", "12–18 Monate", "Abhängig von B2B/B2C-Mix und Aktivität"],
  ],
  b2c: [
    ["Tarif", "Preis", "Funktionen"],
    ["Free", "0 €", "Ziele, Basischeck, einfache Sparimpulse"],
    ["Plus Student", "3,99 €/Monat", "Reports, Challenges, Abo-Check"],
    ["Plus", "5,99 €/Monat", "alle Plus-Funktionen"],
    ["Pro", "8,99 €/Monat", "tiefe Analyse, mehrere Ziele, Export"],
  ],
  b2b: [
    ["Produkt", "Preislogik", "Zielkunde"],
    ["Campus Pilot", "5.000–15.000 € pauschal", "Hochschulen"],
    ["Campus License", "1,50–2,50 €/aktivem Nutzer/Monat", "Hochschulen"],
    ["Employer Wellbeing", "2,50–4,00 €/aktivem Nutzer/Monat", "Arbeitgeber"],
    ["Partner Integration", "25.000–75.000 € Setup + Lizenz", "Banken/Broker/Versicherer"],
  ],
  road: [
    {
      p: "M1–3",
      t: "Validierung & Partnerstruktur",
      g: "Klickdemo, 40–60 Interviews, Datenschutzkonzept, Legal-Mapping.",
      m: ["Zielgruppeninterviews", "Kontodaten-Provider auswählen", "Partnergespräche", "Pitchdeck finalisieren"],
    },
    {
      p: "M4–9",
      t: "MVP & Beta",
      g: "Web-Onboarding, Sparcoach, Sparzielsystem und Hochschulbeta.",
      m: ["1.000–2.500 Nutzer", "Supportprozess", "Tracking der Kern-KPIs", "erste Premium-Tests"],
    },
    {
      p: "M10–18",
      t: "Produkt-/Marktvalidierung",
      g: "Premium, Kontodatenanalyse, B2B-Piloten und Qualitätskontrolle.",
      m: ["B2B-Pilot 1–3", "Wochen-/Monatsreports", "Conversion-Optimierung", "Investmentpartner vorbereiten"],
    },
    {
      p: "M19–30",
      t: "Partner-Investment",
      g: "Depoteröffnung, ETF-Sparplan-Weiterleitung und Partner-Revenue.",
      m: ["Risikohinweise", "Partner-KPIs", "Revenue-Sharing", "klare UX-Grenzen"],
    },
    {
      p: "M31–48",
      t: "B2B2C-Skalierung",
      g: "Hochschul-/Arbeitgeberlizenzen und Break-even-Korridor.",
      m: ["Sales-Team", "Compliance-Ausbau", "Automatisierung", "größere B2B-Verträge"],
    },
    {
      p: "M49–60",
      t: "DACH & White-Label",
      g: "Expansion, Enterprise-Angebote und API-Produkt.",
      m: ["AT/CH-Prüfung", "White-Label-Sparcoach", "Enterprise-Partner", "optional eigene Regulierung prüfen"],
    },
  ],
  swot: {
    Strengths: ["niedrige Einstiegshürde", "Behavioral-Finance-Fokus", "B2B2C-Vertrieb", "gute Präsentationsstory"],
    Weaknesses: ["Vertrauen muss aufgebaut werden", "begrenzte Zahlungsbereitschaft", "Regulatorik komplex", "Partnerabhängigkeit"],
    Opportunities: ["ETF- und Sparplanmarkt", "Financial Wellbeing", "Kontodatenanalyse", "digitale Finanzroutinen"],
    Threats: ["Neobroker kopieren Features", "Plattformregeln ändern sich", "Regulierung strenger", "Datenschutzvorfall"],
  },
  swotText: {
    Strengths: "Die Stärken rechtfertigen einen fokussierten Routine-first-MVP mit starker UX und Partnerarchitektur.",
    Weaknesses: "Die Schwächen werden durch transparente Datenkontrolle, Freemium+B2B-Modell und schlanke Partnernutzung reduziert.",
    Opportunities: "Die Chancen sprechen für Hochschul- und Arbeitgeberpiloten sowie spätere White-Label-Partnerschaften.",
    Threats: "Die Risiken machen Compliance, Plattformdiversifikation und Produkt-Governance zu Pflichtbestandteilen.",
  },
  risks: [
    ["Risiko", "Priorität", "Gegenmaßnahme"],
    ["Regulatorische Fehlpositionierung", "sehr hoch", "Routine-first, Investment nur über Partner, Rechtsgutachten"],
    ["Geringes Vertrauen in Datenfreigabe", "hoch", "transparente Einwilligung, Widerruf, Sicherheitskommunikation"],
    ["Premium-Zahlungsbereitschaft gering", "hoch", "B2B-Lizenzen und Partnerumsätze stärken"],
    ["B2B-Vertrieb langsamer", "hoch", "kleine Piloten, klare KPI-Reports"],
    ["Plattformabhängigkeit", "mittel-hoch", "Web-App, E-Mail/Push und später eigene App"],
    ["Unpassende Produktimpulse", "hoch", "Plausibilitätschecks, Tests, Support-Eskalation, keine Renditeversprechen"],
  ],
  team: [
    ["CEO / Business Development", "Strategie, Fundraising, Partnerschaften, B2B-Vertrieb"],
    ["CTO", "Architektur, Entwicklung, Security, Skalierung"],
    ["CPO / Product Lead", "UX, Nutzerforschung, Roadmap, Conversion"],
    ["Compliance Advisor", "Regulatorik, Datenschutz, Partnerstruktur"],
    ["Growth Lead", "Marketing, Community, Hochschulakquise"],
  ],
  fte: [
    ["Jahr", "FTE", "Rollen"],
    ["Jahr 1", "5", "Gründerteam, Fullstack, Product/Growth, Compliance extern"],
    ["Jahr 2", "9", "Backend, Data, Support, B2B Sales, Marketing"],
    ["Jahr 3", "16", "Sales, Compliance, Customer Success, Engineering"],
    ["Jahr 4", "28", "B2B-Team, Partner Management, Data, Support"],
    ["Jahr 5", "45", "DACH-Skalierung, Enterprise, Security, Operations"],
  ],
  scenarios: {
    J1: { active: 1500, premium: 3, b2b: 0, partner: 0, setup: 0, costs: 480000 },
    J3: { active: 55000, premium: 8, b2b: 22000, partner: 12000, setup: 80000, costs: 1790000 },
    J5: { active: 300000, premium: 10, b2b: 125000, partner: 100000, setup: 450000, costs: 5910000 },
  },
};

function renderTable(selector, rows) {
  const table = $(selector);
  if (!table) return;

  table.innerHTML = rows
    .map((row, rowIndex) => {
      const cells = row
        .map((cell) => (rowIndex ? `<td>${cell}</td>` : `<th>${cell}</th>`))
        .join("");
      return `<tr>${cells}</tr>`;
    })
    .join("");
}

function renderCards(selector, items, template) {
  const target = $(selector);
  if (!target) return;
  target.innerHTML = items.map(template).join("");
}

function render() {
  renderCards("#kpis", BP.kpis, (item) => `<article class="kpi-card"><strong>${item[0]}</strong><span>${item[1]}</span></article>`);
  renderCards("#problems", BP.problems, (item) => `<article class="info-card"><h3>${item[0]}</h3><p>${item[1]}</p></article>`);
  renderCards(
    "#flow",
    BP.flow,
    (item, index) => `<article class="flow-card"><b>${String(index + 1).padStart(2, "0")}</b><h3>${item}</h3><p>${index < 5 ? "Routine-Logik" : "regulierter Partnerpfad"}</p></article>`,
  );
  renderCards("#mvp", BP.mvp, (item) => `<article class="info-card"><h3>${item[0]}</h3><p>${item[1]}</p></article>`);
  renderCards("#marketCards", BP.markets, (item) => `<article class="info-card"><h3>${item[0]}</h3><p>${item[1]}</p></article>`);
  renderCards("#layers", BP.compliance, (item) => `<article class="layer-card"><h3>${item[0]}</h3><p>${item[1]}</p></article>`);
  renderCards("#financeKpis", BP.financeKpis, (item) => `<article class="kpi-card"><strong>${item[0]}</strong><span>${item[1]}</span></article>`);
  renderCards("#teamGrid", BP.team, (item) => `<article class="info-card"><h3>${item[0]}</h3><p>${item[1]}</p></article>`);

  renderTable("#competition", BP.competition);
  renderTable("#marketSize", BP.marketSize);
  renderTable("#competitionWeighted", BP.competitionWeighted);
  renderTable("#b2c", BP.b2c);
  renderTable("#b2b", BP.b2b);
  renderTable("#unitEconomics", BP.unitEconomics);
  renderTable("#assumptions", BP.assumptions);
  renderTable("#revenues", BP.revenuesTable);
  renderTable("#pnl", BP.pnl);
  renderTable("#funding", BP.funding);
  renderTable("#risks", BP.risks);
  renderTable("#fte", BP.fte);
}

function initTabs() {
  let activeTarget = 0;
  const targetTabs = $("#targetTabs");
  const targetPanel = $("#targetPanel");

  function drawTargets() {
    targetTabs.innerHTML = BP.targets
      .map((target, index) => `<button class="${index === activeTarget ? "active" : ""}" data-i="${index}">${target.t.split(",")[0]}</button>`)
      .join("");

    const target = BP.targets[activeTarget];
    targetPanel.innerHTML = `<h3>${target.t}</h3><p>${target.d}</p><div class="pills">${target.p.map((pill) => `<span>${pill}</span>`).join("")}</div>`;
    $$("[data-i]", targetTabs).forEach((button) => {
      button.onclick = () => {
        activeTarget = Number(button.dataset.i);
        drawTargets();
      };
    });
  }

  let activeRevenue = 0;
  const revenueTabs = $("#revenueTabs");
  const revenuePanel = $("#revenuePanel");

  function drawRevenue() {
    revenueTabs.innerHTML = BP.revenues
      .map((revenue, index) => `<button class="${index === activeRevenue ? "active" : ""}" data-r="${index}">${revenue.t}<br><small>${revenue.v}</small></button>`)
      .join("");

    const revenue = BP.revenues[activeRevenue];
    revenuePanel.innerHTML = `<p class="tag">Umsatzquelle</p><h3>${revenue.t}</h3><strong>${revenue.v}</strong><p>${revenue.d}</p>`;
    $$("[data-r]", revenueTabs).forEach((button) => {
      button.onclick = () => {
        activeRevenue = Number(button.dataset.r);
        drawRevenue();
      };
    });
  }

  drawTargets();
  drawRevenue();
}

function initDemo() {
  const steps = [
    ["bot", "Wähle dein erstes Ziel: Notgroschen, Ausgaben verstehen oder ETF-Sparen vorbereiten.", 185],
    ["user", "Notgroschen aufbauen", 185],
    ["bot", "Gute Wahl. Optional kannst du Bankdaten über einen lizenzierten Partner verbinden.", 185],
    ["user", "Analyse starten", 185],
    ["bot", "Diese Woche sind 23 € Sparpotenzial realistisch. 23 € für dein Ziel sichern?", 185],
    ["user", "23 € sichern", 208],
    ["bot", "Erledigt. Dein Notgroschen wächst auf 208 €. Noch 792 € bis zum Ziel.", 208],
  ];

  let index = 0;
  const chat = $("#chat");

  function addMessage(type, text) {
    const message = document.createElement("div");
    message.className = `msg ${type}`;
    message.textContent = text;
    chat.appendChild(message);
    chat.scrollTop = chat.scrollHeight;
  }

  function updateStats(value) {
    $("#saved").textContent = `${value} €`;
    $("#savedBar").style.width = `${Math.round(value / 10)}%`;
    $("#savedLabel").textContent = `${Math.round(value / 10)} % von 1.000 €`;
    $("#streak").textContent = index > 5 ? "13 Tage" : "12 Tage";
    $("#score").textContent = index > 5 ? "87 %" : "82 %";
  }

  function nextStep() {
    if (index >= steps.length) {
      index = 0;
      chat.innerHTML = "";
    }

    const [type, text, value] = steps[index];
    index += 1;
    addMessage(type, text);
    updateStats(value);
  }

  $("#choices").innerHTML = ["Notgroschen", "Ausgaben verstehen", "ETF vorbereiten"]
    .map((choice) => `<button>${choice}</button>`)
    .join("");
  $("#nextDemo").onclick = nextStep;
  nextStep();
}

function initSimulator() {
  const scenarios = $("#scenarios");
  const controls = $("#controls");
  const results = $("#results");
  let state = { ...BP.scenarios.J3 };

  const meta = {
    active: { label: "Aktive Nutzer", help: "Monatlich aktive Nutzer im gewählten Jahr.", min: 1000, max: 450000, step: 1000, kind: "count", group: "reichweite" },
    premium: { label: "Premium-Conversion", help: "Anteil der aktiven Nutzer mit Premium-Abo.", min: 1, max: 18, step: 0.5, kind: "percent", group: "reichweite" },
    b2b: { label: "B2B-Nutzer", help: "Nutzer über Unternehmen, Hochschulen oder Arbeitgeber.", min: 0, max: 160000, step: 1000, kind: "count", group: "kanal" },
    partner: { label: "Partnernutzer", help: "Nutzer mit partnerbasierten Investment-Impulsen.", min: 0, max: 140000, step: 1000, kind: "count", group: "kanal" },
    setup: { label: "Setup-/White-Label", help: "Einmalige Projekt- und Integrationsumsätze.", min: 0, max: 600000, step: 5000, kind: "currency", group: "finanzen" },
    costs: { label: "Gesamtkosten", help: "Operative Kosten inkl. Team, Produkt und Wachstum.", min: 200000, max: 6500000, step: 10000, kind: "currency", group: "finanzen" },
  };

  const groups = {
    reichweite: "1) Nutzerbasis",
    kanal: "2) Erlöskanäle",
    finanzen: "3) Kosten & Setup",
  };

  const formatValue = (key, value) => {
    const kind = meta[key].kind;
    if (kind === "percent") return `${value} %`;
    if (kind === "count") return fmt(value);
    return euro(value);
  };

  function calculate() {
    const premiumUsers = (state.active * state.premium) / 100;
    const b2c = premiumUsers * 60.36;
    const b2b = state.b2b * 30;
    const partner = state.partner * 13.75;
    const revenue = b2c + b2b + partner + state.setup;
    const ebitda = revenue - state.costs;

    return {
      premiumUsers,
      b2c,
      b2b,
      partner,
      setup: state.setup,
      costs: state.costs,
      revenue,
      ebitda,
      margin: revenue ? (ebitda / revenue) * 100 : 0,
      arpuMix: state.active ? revenue / state.active : 0,
    };
  }

  function markScenario(key) {
    $$("[data-scenario]", scenarios).forEach((button) => {
      button.classList.toggle("active", button.dataset.scenario === key);
    });
  }

  function drawResults() {
    const r = calculate();
    const revenueMix = r.revenue
      ? `B2C ${Math.round((r.b2c / r.revenue) * 100)}% · B2B ${Math.round((r.b2b / r.revenue) * 100)}% · Partner ${Math.round((r.partner / r.revenue) * 100)}%`
      : "Noch keine Umsätze";

    results.innerHTML = `
      <div class="result result-hero ${r.ebitda < 0 ? "neg" : "pos"}">
        <span>EBITDA</span><b>${euro(r.ebitda)}</b>
        <small>Marge: ${Math.round(r.margin)} % · Umsatz pro aktivem Nutzer: ${euro(r.arpuMix)}</small>
      </div>
      <div class="result-group">
        <div class="result"><span>Zahlende Nutzer</span><b>${fmt(r.premiumUsers)}</b></div>
        <div class="result"><span>Umsatz gesamt</span><b>${euro(r.revenue)}</b></div>
        <div class="result"><span>Gesamtkosten</span><b>${euro(r.costs)}</b></div>
      </div>
      <div class="result result-note"><span>Umsatzmix</span><div class="mix-bar"><i class="mix-b2c" style="width:${r.revenue ? (r.b2c / r.revenue) * 100 : 0}%"></i><i class="mix-b2b" style="width:${r.revenue ? (r.b2b / r.revenue) * 100 : 0}%"></i><i class="mix-partner" style="width:${r.revenue ? (r.partner / r.revenue) * 100 : 0}%"></i></div><b>${revenueMix}</b></div>
    `;
  }

  const updateSliderUI = (input) => {
    const key = input.dataset.sim;
    const value = Number(input.value);
    const pct = ((value - Number(input.min)) / (Number(input.max) - Number(input.min))) * 100;
    input.style.setProperty("--fill", `${pct}%`);
    const output = input.closest(".control")?.querySelector("output");
    if (output) output.textContent = formatValue(key, value);
  };

  function drawControls() {
    controls.innerHTML = Object.keys(groups)
      .map((groupKey) => {
        const items = Object.entries(meta)
          .filter(([, cfg]) => cfg.group === groupKey)
          .map(([key, cfg]) => `
            <div class="control">
              <div class="control-head">
                <label for="sim-${key}">${cfg.label}</label>
                <output id="sim-${key}-value" for="sim-${key}">${formatValue(key, state[key])}</output>
              </div>
              <p class="control-help">${cfg.help}</p>
              <input id="sim-${key}" type="range" min="${cfg.min}" max="${cfg.max}" step="${cfg.step}" value="${state[key]}" data-sim="${key}">
              <div class="control-scale"><span>${formatValue(key, cfg.min)}</span><span>${formatValue(key, cfg.max)}</span></div>
            </div>`)
          .join("");
        return `<section class="control-group"><h4>${groups[groupKey]}</h4>${items}</section>`;
      })
      .join("");

    $$("[data-sim]", controls).forEach((input) => {
      updateSliderUI(input);
      input.oninput = () => {
        state[input.dataset.sim] = Number(input.value);
        updateSliderUI(input);
        drawResults();
        markScenario();
      };
    });
  }

  scenarios.innerHTML = Object.keys(BP.scenarios)
    .map((key) => `<button data-scenario="${key}" class="${key === "J3" ? "active" : ""}">${key} Szenario</button>`)
    .join("");

  $$("[data-scenario]", scenarios).forEach((button) => {
    button.onclick = () => {
      state = { ...BP.scenarios[button.dataset.scenario] };
      drawControls();
      drawResults();
      markScenario(button.dataset.scenario);
    };
  });

  drawControls();
  drawResults();
}

function initRoadmap() {
  let active = 1;
  const buttons = $("#roadBtns");
  const panel = $("#roadPanel");

  function draw() {
    buttons.innerHTML = BP.road
      .map((road, index) => `<button class="${index === active ? "active" : ""}" data-road="${index}"><b>${road.p}</b><br>${road.t}</button>`)
      .join("");

    const road = BP.road[active];
    panel.innerHTML = `<p class="tag">${road.p}</p><h3>${road.t}</h3><p>${road.g}</p><ul>${road.m.map((item) => `<li>${item}</li>`).join("")}</ul>`;
    $$("[data-road]", buttons).forEach((button) => {
      button.onclick = () => {
        active = Number(button.dataset.road);
        draw();
      };
    });
  }

  draw();
}

function initSwot() {
  let active = "Strengths";
  const grid = $("#swotGrid");
  const text = $("#swotText");

  function draw() {
    grid.innerHTML = Object.entries(BP.swot)
      .map(([key, values]) => `<button class="${key === active ? "active" : ""}" data-swot="${key}"><h3>${key}</h3><ul>${values.map((value) => `<li>${value}</li>`).join("")}</ul></button>`)
      .join("");

    text.innerHTML = `<p class="tag">Strategische Konsequenz</p><h3>${active}</h3><p>${BP.swotText[active]}</p>`;
    $$("[data-swot]", grid).forEach((button) => {
      button.onclick = () => {
        active = button.dataset.swot;
        draw();
      };
    });
  }

  draw();
}

function go(id) {
  const target = $(`#${id}`);
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth" });
  history.replaceState(null, "", `#${id}`);
}

function initNav() {
  $$("[data-enter]").forEach((button) => {
    button.onclick = () => go(button.dataset.enter);
  });

  const navScroller = $(".nav nav");
  const links = $$(".nav nav a");
  const setActiveLink = (sectionId) => {
    links.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${sectionId}`;
      link.classList.toggle("active", isActive);
      if (isActive) link.scrollIntoView({ inline: "center", block: "nearest" });
    });
  };

  links.forEach((link) => {
    link.onclick = (event) => {
      event.preventDefault();
      const sectionId = link.getAttribute("href").slice(1);
      setActiveLink(sectionId);
      go(sectionId);
    };
  });

  let activeSectionId = null;
  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (!visibleEntries.length) return;

      const nextEntry = visibleEntries.reduce((best, current) => (
        current.intersectionRatio > best.intersectionRatio ? current : best
      ));

      const nextSectionId = nextEntry.target.id;
      if (nextSectionId === activeSectionId) return;
      activeSectionId = nextSectionId;
      setActiveLink(nextSectionId);
    },
    { rootMargin: "-35% 0px -55%", threshold: [0.2, 0.4, 0.6, 0.8] },
  );

  $$("[data-section]").forEach((section) => observer.observe(section));

  if (navScroller) {
    navScroller.addEventListener("wheel", (event) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      navScroller.scrollLeft += event.deltaY;
      event.preventDefault();
    }, { passive: false });
  }

  const initialId = (location.hash || "#cover").slice(1);
  const initialLink = links.find((link) => link.getAttribute("href") === `#${initialId}`);
  if (initialLink) {
    setActiveLink(initialId);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Navigation/entry must always remain functional, even if one content module fails.
  initNav();

  const boot = [render, initTabs, initDemo, initSimulator, initRoadmap, initSwot];
  boot.forEach((fn) => {
    try {
      fn();
    } catch (error) {
      console.error(`[NestEgg] Modul konnte nicht initialisiert werden: ${fn.name}`, error);
    }
  });
});
