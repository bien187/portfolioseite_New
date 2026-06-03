import { useRef, useState, useEffect } from "react"

export function useInView(thr = 0.1) {
  const ref = useRef(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect() } },
      { threshold: thr }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [thr])
  return [ref, v]
}
