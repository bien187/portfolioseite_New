import { useRef, useState, useEffect, useCallback } from "react"
import { motion, useTransform } from "framer-motion"
import { Chip } from "../../ui/Chip/Chip"
import { SMOOTH, SPRING, C } from "../../../design/tokens"
import { useCenterProximity } from "../../../hooks/useCenterProximity"
import styles from "./Projects.module.css"

export function ProjRow({ p, i }) {
  const rowRef  = useRef(null)
  const glowRef = useRef(null)
  const [vis, setVis] = useState(false)
  const [hov, setHov] = useState(false)

  const proximity = useCenterProximity(rowRef)
  const scale = useTransform(proximity, [0, 1], [1, 1.04])
  const lift  = useTransform(proximity, [0, 1], [0, -6])

  useEffect(() => {
    const el = rowRef.current
    if (!el) return
    let t
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { obs.disconnect(); t = setTimeout(() => setVis(true), i * 110) }
    }, { threshold: 0.05 })
    obs.observe(el)
    return () => { obs.disconnect(); clearTimeout(t) }
  }, [i])

  const onMove = useCallback((e) => {
    if (!glowRef.current || !rowRef.current) return
    const r = rowRef.current.getBoundingClientRect()
    glowRef.current.style.left = `${e.clientX - r.left}px`
    glowRef.current.style.top  = `${e.clientY - r.top}px`
  }, [])

  const El = p.url ? motion.a : motion.div

  return (
    <El
      ref={rowRef}
      href={p.url || undefined}
      target={p.url ? "_blank" : undefined}
      rel={p.url ? "noopener noreferrer" : undefined}
      className={[
        styles.row,
        p.url ? styles.rowLink : "",
        p.ipa ? styles.rowIpa  : "",
      ].filter(Boolean).join(" ")}
      initial={{ opacity: 0 }}
      animate={{ opacity: vis ? 1 : 0 }}
      transition={SMOOTH}
      style={{ scale, y: lift }}
      whileTap={p.url ? { scale: 0.992 } : {}}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onMouseMove={p.url ? onMove : undefined}
    >
      {p.url && (
        <motion.div
          ref={glowRef}
          className={styles.glow}
          aria-hidden
          animate={{ opacity: hov ? 1 : 0 }}
          transition={{ duration: 0.38 }}
        />
      )}

      <div className={styles.rowInner}>
        <div className={styles.rowContent}>
          <div className={styles.titleRow}>
            <h3 className={styles.nameLg}>{p.name}</h3>
            {p.ipa && <span className={styles.ipaBadge}>IPA</span>}
            <span className={styles.year}>{p.year}</span>
          </div>
          <p className={styles.desc}>{p.desc}</p>
          <div className={styles.tags}>
            {p.tags.map(t => <Chip key={t} label={t} />)}
          </div>
        </div>

        {p.url ? (
          <motion.span
            className={styles.arrow}
            animate={hov
              ? { x: 4, y: -4, color: C.accent }
              : { x: 0, y: 0,  color: C.lo     }}
            transition={SPRING}
          >↗</motion.span>
        ) : (
          <span className={styles.internBadge}>intern</span>
        )}
      </div>
    </El>
  )
}
