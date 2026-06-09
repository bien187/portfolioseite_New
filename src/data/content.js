// Alle Inhalte der Portfolio-Website — kein Text hardcoded in Komponenten

// ── Web-Apps (Schule / IMS) ──────────────────────────────────────────────────
export const SCHOOL_PROJECTS = [
  {
    id: 1,
    name: "Lachleitung",
    year: "2023",
    tags: [".NET", "React", "Firebase"],
    url: "https://lachleitung.netlify.app",
    desc: "Einfache echtzeit Chat-App mit Google-Authentifizierung und Firebase-Backend.",
  },
  {
    id: 2,
    name: "Ideeninsel",
    year: "2024",
    tags: ["React", "Firebase"],
    url: "https://ideeninsel.netlify.app",
    desc: "Digitale Pinnwand zum Sammeln und Teilen von Ideen — öffentlich und kollaborativ.",
  },
  {
    id: 3,
    name: "Ideeninsel V2",
    year: "2025",
    tags: ["React", "Firebase", "Tailwind"],
    url: "https://ideeninsel2.netlify.app",
    desc: "Neugestaltung der Pinnwand — überarbeitetes Designsystem, Accounts und neue Funktionen.",
  },
]

// ── Eigene Projekte ──────────────────────────────────────────────────────────
export const PERSONAL_PROJECTS = [
  {
    id: 7,
    name: "Peakr",
    year: "2026",
    tags: ["Next.js", "Wetter-API", "Geodaten"],
    url: "https://peakrr.netlify.app",
    img: "/peakr.svg",
    desc: "Eine App, mit der man basierend auf Fahrzeiten, Wetterdaten, Schneeverhältnissen, dem aktuellen oder einem vorgegebenen Standort sowie der Anzahl geöffneter Lifte gezielt Wanderziele (wie Bergseen, Hütten, Gipfel, Aussichtspunkte) oder Skigebiete in der Schweiz filtern und heraussuchen kann.",
  },
]

// ── SNB-Projekte (intern) ────────────────────────────────────────────────────
export const SNB_PROJECTS = [
  {
    id: 4,
    name: "Diverse Betriebsautomatisierungen",
    year: "2025, 2026",
    tags: ["PowerShell", "Windows Server", "Scripting"],
    desc: "Diverse Skripte zur Unterstützung und Optimierung des operativen Betriebs in der Infrastruktur SNB.",
    intern: true,
    ipa: false,
  },
  {
    id: 5,
    name: "Diverse Dashboards",
    year: "2025, 2026",
    tags: ["PowerShell Universal", "Monitoring", "Ops"],
    desc: "Interaktive Dashboards mit PowerShell Universal zur Unterstützung und Optimierung des operativen Betriebs in der Infrastruktur SNB.",
    intern: true,
    ipa: false,
  },
  {
    id: 6,
    name: "IPA — Confluence Backup",
    year: "April - Mai 2026",
    tags: ["PowerShell Universal", "Confluence API", "Backup"],
    desc: "Abschlussprojekt: Dashboard für den systematischen Export und die Sicherung von Confluence Spaces — erstmalig lückenloses Backup dieser Inhalte in der SNB.",
    intern: true,
    ipa: true,
  },
]

// ── Werdegang ────────────────────────────────────────────────────────────────
export const TIMELINE = [
  {
    period: "2025 — heute",
    role: "Praktikant Informatik",
    org: "Schweizerische Nationalbank",
    loc: "Zürich",
    note: "Infrastruktur SNB",
    live: true,
  },
  {
    period: "2022 — heute",
    role: "Informatikmittelschule (IMS)",
    org: "Alte Kantonsschule Aarau/ Berufsbildung Baden",
    loc: "Aarau",
    note: "Applikationsentwicklung EFZ, kaufmännische BM",
    live: false,
  },
  {
    period: "2019 — 2022",
    role: "Sekundarstufe",
    org: "Oberstufenzentrum Lenzhard",
    loc: "Lenzburg",
    note: null,
    live: false,
  },
  {
    period: "2013 — 2019",
    role: "Primarstufe",
    org: "Regionalschule Lenzburg",
    loc: "Lenzburg",
    note: null,
    live: false,
  },
]

// ── Engagement ───────────────────────────────────────────────────────────────
export const ENGAGEMENT = [
  {
    period: "2022 — heute",
    role: "Hilfstrainer",
    org: "LA-Team Lenzburg",
    loc: "Lenzburg",
    note: "J+S Coach 14–18",
    live: false,
  },
  {
    period: "2020 — heute",
    role: "Freiwilliger IT-Support",
    org: "Jugendarbeit Lenzburg",
    loc: "Lenzburg",
    note: "Unterstützung von Senioren im Bereich Informatik",
    live: false,
  },
]

// ── Skills ───────────────────────────────────────────────────────────────────
export const SKILLS = [
  ["HTML / CSS"],
  ["PowerShell"],
  ["PowerShell Universal"],
  [".NET / C#"],
  ["React / JavaScript"],
  ["MySQL"],
  ["FireBase"]
]

// ── Sprachen ─────────────────────────────────────────────────────────────────
export const LANGUAGES = [
  { lang: "Deutsch",     level: "Muttersprache", code: "C2" },
  { lang: "Englisch",    level: "Cambridge",     code: "C1" },
  { lang: "Französisch", level: "Schulkenntnisse", code: "B1" },
]

// ── Interessen ───────────────────────────────────────────────────────────────
export const INTERESTS = [
  "Skifahren & Wandern",
  "Kraftsport",
  "Aviatik",
  "Fotografie",
  "Eigene Projekte",
]
