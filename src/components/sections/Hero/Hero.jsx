import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { HeroBtn } from "../../ui/HeroBtn/HeroBtn"
import { useTypewriter } from "../../../hooks/useTypewriter"
import { SMOOTH } from "../../../design/tokens"
import styles from "./Hero.module.css"

export function Hero() {
  const [ready, setReady] = useState(false)
  useEffect(() => { const t = setTimeout(() => setReady(true), 120); return () => clearTimeout(t) }, [])

  // "Ben\nMüller." = 11 chars × 55 ms + 350 ms delay ≈ 955 ms total
  const [typed, done] = useTypewriter("Ben\nMüller.", 150, 350)
  const parts = typed.split("\n")

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

        {/* Headline — animated via typewriter, no Framer entrance */}
        <h1 className={styles.headline}>
          {parts[0]}
          {parts.length > 1 && <br />}
          {parts[1] ?? ""}
          <span
            className={`${styles.cursor} ${done ? styles.cursorHide : ""}`}
            aria-hidden
          >|</span>
        </h1>

        {/* Subline — appears after typing is done */}
        <motion.p
          className={styles.subline}
          initial={{ opacity: 0, y: 26 }}
          animate={done ? { opacity: 1, y: 0 } : {}}
          transition={reveal(0.12)}
        >
          Angehender Informatiker — aktuell im Praktikumsjahr bei der{" "}
          <em className={styles.sublineAccent}>Schweizerischen Nationalbank.</em>
        </motion.p>

        {/* CTAs — appear slightly after subline */}
        <motion.div
          className={styles.ctas}
          initial={{ opacity: 0, y: 26 }}
          animate={done ? { opacity: 1, y: 0 } : {}}
          transition={reveal(0.28)}
        >
          <HeroBtn href="#projekte" solid>Projekte ansehen</HeroBtn>
          <HeroBtn href="#kontakt">Kontakt →</HeroBtn>
        </motion.div>
      </div>

      {/* Scroll indicator — appears after everything */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={done ? { opacity: 0.4 } : {}}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <span className={styles.scrollLabel}>scroll</span>
        <div className={styles.scrollLine} />
      </motion.div>
    </section>
  )
}
