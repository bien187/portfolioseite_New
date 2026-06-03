import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { HeroBtn } from "../../ui/HeroBtn/HeroBtn"
import { useTypewriter } from "../../../hooks/useTypewriter"
import { SMOOTH } from "../../../design/tokens"
import styles from "./Hero.module.css"

const SUBLINE_PLAIN = "Angehender Informatiker — aktuell im Praktikumsjahr bei der "
const SUBLINE_ACCENT = "Schweizerischen Nationalbank."
const SUBLINE = SUBLINE_PLAIN + SUBLINE_ACCENT

export function Hero() {
  const [ready, setReady] = useState(false)
  useEffect(() => { const t = setTimeout(() => setReady(true), 120); return () => clearTimeout(t) }, [])

  const [typedHeadline, headlineDone] = useTypewriter("Ben\nMüller.", 150, 350)
  const [typedSubline, sublineDone] = useTypewriter(SUBLINE, 28, 80, headlineDone)

  const parts = typedHeadline.split("\n")
  const sublineStarted = typedSubline.length > 0

  const reveal = (delay) => ({ ...SMOOTH, delay })

  return (
    <section className={styles.hero}>
      <div aria-hidden className={styles.atmosphere} />

      <div className={styles.content}>
        {/* Status pill — appears immediately on mount */}
        <motion.div
          className={styles.statusPill}
          initial={{ opacity: 0, y: 26 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={reveal(0)}
        >
          <span className={styles.statusDot} />
          <span className={styles.statusText}>SNB · FE RZ-Dienste · Aktuell</span>
        </motion.div>

        {/* Headline — cursor moves to subline once subline starts typing */}
        <h1 className={styles.headline}>
          {parts[0]}
          {parts.length > 1 && <br />}
          {parts[1] ?? ""}
          <span
            className={`${styles.cursor} ${sublineStarted ? styles.cursorHide : ""}`}
            aria-hidden
          >|</span>
        </h1>

        {/* Subline — typed out after headline completes, no fly-in */}
        {headlineDone && (
          <p className={styles.subline}>
            {typedSubline.length < SUBLINE_PLAIN.length
              ? typedSubline
              : <>
                  {SUBLINE_PLAIN}
                  <em className={styles.sublineAccent}>{typedSubline.slice(SUBLINE_PLAIN.length)}</em>
                </>
            }
            {!sublineDone && <span className={styles.cursor} aria-hidden>|</span>}
          </p>
        )}

        {/* CTAs — appear after subline is fully typed */}
        <motion.div
          className={styles.ctas}
          initial={{ opacity: 0, y: 26 }}
          animate={sublineDone ? { opacity: 1, y: 0 } : {}}
          transition={reveal(0.18)}
        >
          <HeroBtn href="#projekte" solid>Projekte ansehen</HeroBtn>
          <HeroBtn href="#kontakt">Kontakt →</HeroBtn>
        </motion.div>
      </div>

      {/* Scroll indicator — appears after everything */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={sublineDone ? { opacity: 0.4 } : {}}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <span className={styles.scrollLabel}>scroll</span>
        <div className={styles.scrollLine} />
      </motion.div>
    </section>
  )
}
