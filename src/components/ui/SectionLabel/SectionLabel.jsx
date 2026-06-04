import { useRef } from "react"
import { motion, useTransform } from "framer-motion"
import { useCenterProximity } from "../../../hooks/useCenterProximity"
import styles from "./SectionLabel.module.css"

export function SectionLabel({ text, v, delay = 0 }) {
  const ref = useRef(null)
  const proximity = useCenterProximity(ref)
  const lift = useTransform(proximity, [0, 1], [0, -14])

  return (
    <motion.div
      ref={ref}
      className={styles.wrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: v ? 1 : 0 }}
      transition={{ duration: 0.6, delay }}
      style={{ y: lift }}
    >
      <span className={styles.text}>{text}</span>
      <div className={styles.line} />
    </motion.div>
  )
}
