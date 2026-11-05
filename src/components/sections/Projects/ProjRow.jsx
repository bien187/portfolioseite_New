import { useRef, useState, useEffect, useCallback, useId } from "react"
import { motion, useTransform, AnimatePresence } from "framer-motion"
import { Chip } from "../../ui/Chip/Chip"
import { SMOOTH, SPRING, C } from "../../../design/tokens"
import { useCenterProximity } from "../../../hooks/useCenterProximity"
import { ProjLinks } from "./ProjLinks"
import styles from "./Projects.module.css"

export function ProjRow({ p, i }) {
  const rowRef     = useRef(null)
  const glowRef    = useRef(null)
  const triggerRef = useRef(null)
  const popRef     = useRef(null)
  const popId      = useId()
  const [vis, setVis]   = useState(false)
  const [hov, setHov]   = useState(false)
  const [open, setOpen] = useState(false)

  const hasLinks = Boolean(p.live || p.url || p.repo)

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

  // Schliessen bei Klick/Tap ausserhalb sowie per Escape
  useEffect(() => {
    if (!open) return
    const onPointer = (e) => {
      if (!rowRef.current?.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key !== "Escape") return
      setOpen(false)
      triggerRef.current?.focus()
    }
    document.addEventListener("pointerdown", onPointer)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("pointerdown", onPointer)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  // Beim Öffnen Fokus auf die erste Option setzen (Tastatur & Screenreader)
  useEffect(() => {
    if (open) popRef.current?.querySelector("a")?.focus({ preventScroll: true })
  }, [open])

  // Schliessen, sobald der Fokus die Karte verlässt (z. B. per Tab)
  const onBlur = useCallback((e) => {
    if (open && !rowRef.current?.contains(e.relatedTarget)) setOpen(false)
  }, [open])

  const onMove = useCallback((e) => {
    if (!glowRef.current || !rowRef.current) return
    const r = rowRef.current.getBoundingClientRect()
    glowRef.current.style.left = `${e.clientX - r.left}px`
    glowRef.current.style.top  = `${e.clientY - r.top}px`
  }, [])

  const active = hov || open

  return (
    <motion.div
      ref={rowRef}
      className={[
        styles.row,
        hasLinks ? styles.rowLink : "",
        open     ? styles.rowOpen : "",
        p.ipa    ? styles.rowIpa  : "",
      ].filter(Boolean).join(" ")}
      initial={{ opacity: 0 }}
      animate={{ opacity: vis ? 1 : 0 }}
      transition={SMOOTH}
      style={{ scale, y: lift, zIndex: open ? 20 : undefined }}
      whileTap={hasLinks && !open ? { scale: 0.992 } : undefined}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onMouseMove={hasLinks ? onMove : undefined}
      onBlur={hasLinks ? onBlur : undefined}
    >
      {hasLinks && (
        <div className={styles.glowClip} aria-hidden>
          <motion.div
            ref={glowRef}
            className={styles.glow}
            animate={{ opacity: active ? 1 : 0 }}
            transition={{ duration: 0.38 }}
          />
        </div>
      )}

      <div className={styles.rowInner}>
        <div className={styles.rowContent}>
          <div className={styles.titleRow}>
            <h3 className={styles.nameLg}>{p.name}</h3>
            {p.img && (
              <img src={p.img} alt="" aria-hidden className={styles.logo} />
            )}
            {p.ipa && <span className={styles.ipaBadge}>IPA</span>}
            <span className={styles.year}>{p.year}</span>
          </div>
          <p className={styles.desc}>{p.desc}</p>
          <div className={styles.tags}>
            {p.tags.map(t => <Chip key={t} label={t} />)}
          </div>
        </div>

        {hasLinks ? (
          <>
            {/* Disclosure-Trigger: per ::after über die gesamte Karte gestreckt */}
            <button
              ref={triggerRef}
              type="button"
              className={styles.trigger}
              aria-expanded={open}
              aria-controls={open ? popId : undefined}
              aria-label={`${p.name}: Live-Projekt oder GitHub öffnen`}
              onClick={() => setOpen(o => !o)}
            >
              <motion.span
                className={styles.arrow}
                aria-hidden
                animate={active
                  ? { x: 4, y: -4, color: C.accent }
                  : { x: 0, y: 0,  color: C.lo     }}
                transition={SPRING}
              >↗</motion.span>
            </button>

            <AnimatePresence>
              {open && (
                <ProjLinks
                  ref={popRef}
                  id={popId}
                  p={p}
                  onClose={() => setOpen(false)}
                />
              )}
            </AnimatePresence>
          </>
        ) : (
          <span className={styles.internBadge}>{p.privat ? "privat" : "intern"}</span>
        )}
      </div>
    </motion.div>
  )
}
