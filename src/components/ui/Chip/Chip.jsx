import styles from "./Chip.module.css"

export function Chip({ label }) {
  return <span className={styles.chip}>{label}</span>
}
