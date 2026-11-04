/**
 * Visitenkarte.jsx — Digitale Visitenkarte / Contact Card
 *
 * Erreichbar ausschliesslich über /contact. Im Portfolio selbst gibt es
 * bewusst keinen Link auf diese Seite (NFC-Karte / direkter Aufruf).
 *
 * Assets (in public/):
 *   public/visitenfoto.jpg   — Porträtfoto
 *   public/resume.pdf        — Lebenslauf für den Download-Button
 *
 * Design-Tokens aus tokens.css werden via CSS Custom Properties (var(--...)) referenziert.
 */

import { useEffect, useState } from "react"
import styles from "./Visitenkarte.module.css"

// ── Kontaktdaten ──────────────────────────────────────────────────
const CONTACT = {
  name:        "Ben Müller",
  role:        "Informatiker EFZ · Applikationsentwicklung",
  status:      "Software Engineer · Infrastruktur SNB",
  phone:       "+41 77 532 84 61",
  phoneTel:    "tel:+41775328461",
  email:       "Ben.Linus.Mueller@outlook.com",
  portfolio:   "/",
  photo:       "/visitenfoto.jpg",
  resume:      "/resume.pdf",
  resumeName:  "Ben-Mueller-CV.pdf",
}

const DESCRIPTION =
  "Informatiker EFZ · Applikationsentwicklung · Software Engineer bei der Schweizerischen Nationalbank. Kontakt und Lebenslauf."

// ── SVG-Platzhalter wenn kein Foto vorhanden ──────────────────────
function AvatarPlaceholder() {
  return (
    <svg
      viewBox="0 0 100 100"
      className={styles.avatarPlaceholder}
      aria-hidden="true"
    >
      {/* Kopf */}
      <circle
        cx="50" cy="36" r="24"
        fill="rgba(191,168,128,0.12)"
        stroke="rgba(191,168,128,0.28)"
        strokeWidth="0.75"
      />
      {/* Schultern */}
      <ellipse
        cx="50" cy="92" rx="38" ry="22"
        fill="rgba(191,168,128,0.07)"
        stroke="rgba(191,168,128,0.2)"
        strokeWidth="0.75"
      />
    </svg>
  )
}

// ── Einzelne Kontakt-Zeile ────────────────────────────────────────
function ContactRow({ href, label, value }) {
  return (
    <li>
      <a
        href={href}
        className={styles.contactRow}
        aria-label={`${label}: ${value}`}
      >
        <span className={styles.contactLabel}>{label}</span>
        <span className={styles.contactValue}>{value}</span>
      </a>
    </li>
  )
}

// ── Action-Button ─────────────────────────────────────────────────
function ActionBtn({ href, children, solid, download }) {
  const cls = [styles.btn, solid ? styles.btnSolid : styles.btnGhost].join(" ")
  return (
    <a
      href={href}
      download={download || undefined}
      className={cls}
      aria-label={solid ? "Lebenslauf als PDF herunterladen" : "Portfolio-Website öffnen"}
    >
      <span>{children}</span>
      <span className={styles.btnIcon} aria-hidden="true">
        {download ? "↓" : "↗"}
      </span>
    </a>
  )
}

// ── Hauptkomponente ───────────────────────────────────────────────
export default function Visitenkarte() {
  const [photoError, setPhotoError] = useState(false)
  // Auf false setzen wenn kein resume.pdf vorhanden — Button wird deaktiviert
  const [resumeReady] = useState(true)

  // Eigene Meta-Daten für die versteckte Kontaktseite (SEO: noindex)
  useEffect(() => {
    const previousTitle = document.title
    const descriptionEl = document.querySelector('meta[name="description"]')
    const previousDescription = descriptionEl?.getAttribute("content") ?? null

    document.title = "Ben Müller — Digitale Visitenkarte"
    descriptionEl?.setAttribute("content", DESCRIPTION)

    const robots = document.createElement("meta")
    robots.name = "robots"
    robots.content = "noindex, nofollow"
    document.head.appendChild(robots)

    return () => {
      document.title = previousTitle
      if (descriptionEl && previousDescription !== null) {
        descriptionEl.setAttribute("content", previousDescription)
      }
      robots.remove()
    }
  }, [])

  return (
    <div className={styles.root}>
      {/* Grain-Overlay — konsistent mit Portfolio */}
      <div className={styles.grain} aria-hidden="true" />

      {/* Atmosphärischer Gradient */}
      <div className={styles.atmosphere} aria-hidden="true" />

      {/* Haupt-Card */}
      <main
        className={styles.card}
        aria-label="Digitale Visitenkarte Ben Müller"
      >
        {/* Avatar */}
        <div className={styles.avatarWrap}>
          {!photoError ? (
            <img
              src={CONTACT.photo}
              alt="Ben Müller — Porträt"
              className={styles.avatar}
              loading="lazy"
              onError={() => setPhotoError(true)}
            />
          ) : (
            <AvatarPlaceholder />
          )}
        </div>

        {/* Name & Rolle */}
        <header>
          <h1 className={styles.name}>{CONTACT.name}</h1>
          <p className={styles.role}>{CONTACT.role}</p>
          <p className={styles.status}>{CONTACT.status}</p>
        </header>

        {/* Kontakt-Zeilen */}
        <nav aria-label="Kontaktmöglichkeiten">
          <ul className={styles.contacts}>
            <ContactRow
              href={CONTACT.phoneTel}
              label="Telefon"
              value={CONTACT.phone}
            />
            <ContactRow
              href={`mailto:${CONTACT.email}`}
              label="E-Mail"
              value={CONTACT.email}
            />
          </ul>
        </nav>

        {/* Action-Buttons */}
        <div className={styles.actions}>
          {resumeReady ? (
            <ActionBtn
              href={CONTACT.resume}
              download={CONTACT.resumeName}
              solid
            >
              Lebenslauf herunterladen
            </ActionBtn>
          ) : (
            <button
              className={`${styles.btn} ${styles.btnSolid} ${styles.btnDisabled}`}
              disabled
              aria-disabled="true"
              title="Lebenslauf momentan nicht verfügbar"
            >
              <span>Lebenslauf nicht verfügbar</span>
            </button>
          )}

          <ActionBtn href={CONTACT.portfolio}>
            Zur Portfolio-Seite
          </ActionBtn>
        </div>

        {/* Footer / Colophon */}
        <footer className={styles.footer} aria-label="Seitenfuss">
          <span className={styles.footerText}>© 2026 Ben Müller</span>
          <span className={styles.footerText}>Lenzburg · Schweiz</span>
        </footer>
      </main>
    </div>
  )
}
