import { motion } from "framer-motion"
import styles from "./SectionLabel.module.css"

export function SectionLabel({ text, v, delay = 0 }) {
  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: v ? 1 : 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <span className={styles.text}>{text}</span>
      <div className={styles.line} />
    </motion.div>
  )
}
