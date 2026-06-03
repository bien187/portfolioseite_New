import { useState, useEffect } from "react"

export function useScrolled(offset = 52) {
  const [s, setS] = useState(false)
  useEffect(() => {
    const fn = () => setS(window.scrollY > offset)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [offset])
  return s
}
