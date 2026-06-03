import { useState, useEffect } from "react"

export function useTypewriter(text, speed = 55, startDelay = 350) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    let interval
    const start = setTimeout(() => {
      interval = setInterval(() => {
        setIndex(i => {
          if (i >= text.length) { clearInterval(interval); return i }
          return i + 1
        })
      }, speed)
    }, startDelay)
    return () => { clearTimeout(start); clearInterval(interval) }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return [text.slice(0, index), index >= text.length]
}
