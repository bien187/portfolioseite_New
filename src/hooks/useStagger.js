import { useState, useEffect } from "react"

export function useStagger(parentVis, i, base = 80, step = 68) {
  const [v, setV] = useState(false)
  useEffect(() => {
    if (!parentVis) return
    const t = setTimeout(() => setV(true), base + i * step)
    return () => clearTimeout(t)
  }, [parentVis, i, base, step])
  return v
}
