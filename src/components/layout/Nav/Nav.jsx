import { useScrolled } from "../../../hooks/useScrolled"
import styles from "./Nav.module.css"

export function Nav() {
  const scrolled = useScrolled()
  const links = [["Projekte", "#projekte"], ["Werdegang", "#werdegang"], ["Kontakt", "#kontakt"]]
  return (
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ""}`}>
      <div className={styles.navInner}>
        <span className={styles.logo}>BM</span>
        <ul className={styles.links}>
          {links.map(([lbl, href]) => (
            <li key={href}>
              <a href={href} className={styles.link}>{lbl}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
