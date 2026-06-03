import { useState, useEffect } from "react"

// Returns true when the element's center is within the middle band of the viewport.
// Uses a narrow rootMargin so only one row is active at a time during normal scroll.
export function useCenterInView(ref, band = "43%") {
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: `-${band} 0px -${band} 0px`, threshold: 0 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref, band])

  return active
}
