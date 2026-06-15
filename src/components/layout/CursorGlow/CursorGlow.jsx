import { useEffect, useRef } from "react"
import styles from "./CursorGlow.module.css"

/**
 * Seitenweiter „Spotlight" — eine fixe Ebene, deren radialer Schein dem
 * Mauszeiger folgt und die Umgebung darunter aufhellt (mix-blend: screen).
 * Auf Touch-/Coarse-Pointer-Geräten deaktiviert (dort gibt es keinen Cursor).
 */
export function CursorGlow() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(pointer: coarse)").matches) return

    let raf = 0
    const onMove = (e) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${e.clientX}px`)
        el.style.setProperty("--my", `${e.clientY}px`)
        el.style.opacity = "1"
      })
    }
    const onLeave = () => { el.style.opacity = "0" }

    window.addEventListener("mousemove", onMove, { passive: true })
    document.addEventListener("mouseleave", onLeave)
    return () => {
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseleave", onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={ref} aria-hidden className={styles.glow} />
}
