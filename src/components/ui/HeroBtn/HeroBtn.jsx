import { motion } from "framer-motion"
import { SNAPPY } from "../../../design/tokens"
import styles from "./HeroBtn.module.css"

export function HeroBtn({ href, children, solid }) {
  return (
    <motion.a
      href={href}
      className={`${styles.btn} ${solid ? styles.btnSolid : styles.btnGhost}`}
      whileTap={{ scale: 0.963 }}
      transition={SNAPPY}
    >
      {children}
    </motion.a>
  )
}
