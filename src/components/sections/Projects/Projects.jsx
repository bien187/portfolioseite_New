import { useInView } from "../../../hooks/useInView"
import { SectionLabel } from "../../ui/SectionLabel/SectionLabel"
import { GroupLabel } from "../../ui/GroupLabel/GroupLabel"
import { ProjRow } from "./ProjRow"
import { PERSONAL_PROJECTS, SNB_PROJECTS } from "../../../data/content"
import styles from "./Projects.module.css"

export function Projects() {
  const [ref, vis] = useInView(0.05)
  return (
    <section id="projekte" ref={ref} className={styles.section}>
      <SectionLabel text="Projekte" v={vis} />

      <div className={styles.group}>
        <div className={styles.groupHead}>
          <GroupLabel text="Eigene Projekte" v={vis} delay={0.1} />
        </div>
        {PERSONAL_PROJECTS.map((p, i) => (
          <ProjRow key={p.id} p={p} i={i} />
        ))}
      </div>

      <div className={styles.group}>
        <div className={styles.groupHead}>
          <GroupLabel text="Schweizerische Nationalbank" v={vis} delay={0.15} />
        </div>
        {SNB_PROJECTS.map((p, i) => (
          <ProjRow key={p.id} p={p} i={PERSONAL_PROJECTS.length + i} />
        ))}
      </div>

      <div className={styles.endLine} />
    </section>
  )
}
