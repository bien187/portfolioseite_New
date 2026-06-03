import { motion } from "framer-motion"
import styles from "./GroupLabel.module.css"

export function GroupLabel({ text, v, delay = 0 }) {
  return (
    <motion.p
      className={styles.label}
      initial={{ opacity: 0 }}
      animate={{ opacity: v ? 1 : 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {text}
    </motion.p>
  )
}
