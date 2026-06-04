import { useRef } from "react"
import { motion, useTransform } from "framer-motion"
import { useCenterProximity } from "../../../hooks/useCenterProximity"
import styles from "./GroupLabel.module.css"

export function GroupLabel({ text, v, delay = 0 }) {
  const ref = useRef(null)
  const proximity = useCenterProximity(ref)
  const lift = useTransform(proximity, [0, 1], [0, -14])

  return (
    <motion.p
      ref={ref}
      className={styles.label}
      initial={{ opacity: 0 }}
      animate={{ opacity: v ? 1 : 0 }}
      transition={{ duration: 0.5, delay }}
      style={{ y: lift }}
    >
      {text}
    </motion.p>
  )
}
