import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "../../../hooks/useInView"
import { SMOOTH, SPRING, C } from "../../../design/tokens"
import styles from "./Footer.module.css"

function FootLink({ href, label, ext }) {
  const [hov, setHov] = useState(false)
  return (
    <li>
      <a
        href={href}
        target={ext ? "_blank" : undefined}
        rel={ext ? "noopener noreferrer" : undefined}
        className={styles.link}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        {label}
        <motion.span
          className={styles.linkArrow}
          animate={hov
            ? { opacity: 1, x: 2, y: -2, color: C.accent }
            : { opacity: 0, x: 0, y: 0,  color: C.mid   }}
          transition={SPRING}
        >↗</motion.span>
      </a>
    </li>
  )
}

export function Footer() {
  const [ref, vis] = useInView(0.08)
  return (
    <footer id="kontakt" ref={ref} className={styles.footer}>
      <div className={styles.upper}>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={vis ? { opacity: 1, y: 0 } : {}}
          transition={SMOOTH}
        >
          <h2 className={styles.headline}>Kontaktieren Sie<br />mich.</h2>
          <p className={styles.copy}>
            Sie erreichen mich am besten per E-Mail oder LinkedIn.                                       
          </p>
        </motion.div>

        <motion.ul
          className={styles.links}
          initial={{ opacity: 0 }}
          animate={{ opacity: vis ? 1 : 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <FootLink href="mailto:Ben.Linus.Mueller@outlook.com" label="Ben.Linus.Mueller@outlook.com" />
          <FootLink href="https://www.linkedin.com/in/ben-müller-4b959a273/" label="LinkedIn" ext />
          <FootLink href="https://github.com/bien187"      label="GitHub"   ext />
        </motion.ul>
      </div>

      <div className={styles.colophon}>
        <span className={styles.colophonText}>© 2026 Ben Müller</span>
        <span className={styles.colophonText}>Lenzburg · Schweiz</span>
      </div>
    </footer>
  )
}
