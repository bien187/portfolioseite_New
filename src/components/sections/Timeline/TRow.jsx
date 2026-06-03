import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { SMOOTH } from "../../../design/tokens"
import styles from "./Timeline.module.css"

export function TRow({ item, i }) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let t
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { obs.disconnect(); t = setTimeout(() => setVis(true), i * 100) }
    }, { threshold: 0.08 })
    obs.observe(el)
    return () => { obs.disconnect(); clearTimeout(t) }
  }, [i])

  return (
    <motion.div
      ref={ref}
      className={`${styles.row} ${item.live ? styles.rowLive : ""}`}
      initial={{ opacity: 0, y: 16 }}
      animate={vis ? { opacity: 1, y: 0 } : {}}
      transition={SMOOTH}
    >
      <div className={styles.period}>
        <span className={`${styles.periodText} ${item.live ? styles.periodLive : ""}`}>
          {item.period}
        </span>
      </div>
      <div>
        <div className={styles.roleRow}>
          <span className={`${styles.role} ${item.live ? styles.roleLive : ""}`}>
            {item.role}
          </span>
          {item.live && <span className={styles.liveTag}>Aktuell</span>}
        </div>
        <p className={styles.org}>{item.org}</p>
        <div className={styles.meta}>
          <span className={styles.location}>{item.loc}</span>
          {item.note && <span className={styles.note}>{item.note}</span>}
        </div>
      </div>
    </motion.div>
  )
}
