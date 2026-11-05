import { motion } from "framer-motion"
import styles from "./Projects.module.css"

// Kleines, dezentes Auswahl-Popover einer Projektkarte:
// Live-Projekt bzw. Demo und GitHub-Repository.

function LiveIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden focusable="false">
      <circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <path
        d="M1.75 8h12.5M8 1.75c1.7 1.75 2.5 3.8 2.5 6.25S9.7 12.5 8 14.25M8 1.75C6.3 3.5 5.5 5.55 5.5 8s.8 4.5 2.5 6.25"
        fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"
      />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden focusable="false">
      <path
        fill="currentColor"
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
      />
    </svg>
  )
}

function buildLinks(p) {
  const live = p.live ?? p.url
  return [
    live && {
      key: "live",
      href: live,
      label: p.liveLabel ?? "Live-Projekt",
      hint: p.liveHint ?? "Projekt im Browser öffnen",
      Icon: LiveIcon,
    },
    p.repo && {
      key: "repo",
      href: p.repo,
      label: "GitHub Repository",
      hint: "Quellcode ansehen",
      Icon: GitHubIcon,
    },
  ].filter(Boolean)
}

export function ProjLinks({ id, p, onClose, ref }) {
  const links = buildLinks(p)
  return (
    <motion.div
      ref={ref}
      id={id}
      role="group"
      aria-label={`${p.name}: Ziel wählen`}
      className={styles.popover}
      initial={{ opacity: 0, y: -6, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -4, scale: 0.98, transition: { duration: 0.14, ease: "easeIn" } }}
      transition={{ type: "spring", stiffness: 520, damping: 34, mass: 0.6 }}
    >
      {links.map(({ key, href, label, hint, Icon }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.option}
          onClick={onClose}
        >
          <span className={styles.optionIcon}><Icon /></span>
          <span className={styles.optionText}>
            <span className={styles.optionLabel}>{label}</span>
            <span className={styles.optionHint}>{hint}</span>
          </span>
          <span className={styles.optionExt} aria-hidden>↗</span>
          <span className={styles.srOnly}> (öffnet in neuem Tab)</span>
        </a>
      ))}
    </motion.div>
  )
}
