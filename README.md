# Portfolio-Website

Dies ist meine persönliche Portfolio-Website, auf der ich meine Projekte, meinen beruflichen Werdegang und meine technischen Fähigkeiten präsentiere. Die Website wurde entwickelt, um potenziellen Arbeitgebern und Recruitern einen Eindruck von meiner Arbeit und meinen Fähigkeiten als Entwickler zu vermitteln.

## Versteckte Visitenkarte

Die digitale Visitenkarte (NFC-Karte) ist unter `/contact` erreichbar. Auf der normalen Portfolio-Seite gibt es bewusst keinen Link dorthin. Sie ist zusätzlich mit `noindex` markiert.

- Komponente: `src/pages/Visitenkarte/`
- Assets: `public/visitenfoto.jpg`, `public/resume.pdf`
- Direktaufruf: `http://localhost:5173/contact`
- Hosting: `public/_redirects` (Netlify) und `vercel.json` (Vercel) leiten `/contact` auf die SPA um.

## Technologie-Stack

- React 19
- Vite
- Framer Motion
- ESLint

## Über diese Website

Die Website zeigt eine Auswahl meiner Projekte, meinen beruflichen Hintergrund und meine Fähigkeiten. Sie wurde mit modernen Webtechnologien entwickelt und legt besonderen Wert auf eine gute Benutzererfahrung mit ansprechenden Animationen.
