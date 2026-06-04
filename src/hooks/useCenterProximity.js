import { useMotionValue } from "framer-motion"
import { useEffect } from "react"

// Returns a MotionValue 0→1 where 1 = element center coincides with viewport center.
// Uses rAF-throttled scroll handler so updates happen off the React render cycle.
export function useCenterProximity(ref) {
  const proximity = useMotionValue(0)

  useEffect(() => {
    let raf = null
    const update = () => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const dist = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2)
      const v = Math.max(0, 1 - dist / (window.innerHeight * 0.52))
      proximity.set(v)
      ref.current.style.setProperty("--p", v.toFixed(3))
      raf = null
    }
    const onScroll = () => { if (raf === null) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (raf !== null) cancelAnimationFrame(raf)
    }
  }, [ref, proximity])

  return proximity
}
