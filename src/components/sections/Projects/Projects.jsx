import { useInView } from "../../../hooks/useInView"
import { SectionLabel } from "../../ui/SectionLabel/SectionLabel"
import { GroupLabel } from "../../ui/GroupLabel/GroupLabel"
import { ProjRow } from "./ProjRow"
import { SCHOOL_PROJECTS, SNB_PROJECTS } from "../../../data/content"
import styles from "./Projects.module.css"

export function Projects() {
  const [ref, vis] = useInView(0.05)
  return (
    <section id="projekte" ref={ref} className={styles.section}>
      <SectionLabel text="Ausgewählte Projekte" v={vis} />

      <div className={styles.group}>
        <GroupLabel text="Schulprojekte · IMS Aarau" v={vis} delay={0.05} />
        {SCHOOL_PROJECTS.map((p, i) => (
          <ProjRow key={p.id} p={p} i={i} small />
        ))}
        <div className={styles.endLine} />
      </div>

      <div className={styles.group}>
        <GroupLabel text="SNB · FE RZ-Dienste" v={vis} delay={0.15} />
        {SNB_PROJECTS.map((p, i) => (
          <ProjRow key={p.id} p={p} i={SCHOOL_PROJECTS.length + i} />
        ))}
        <div className={styles.endLine} />
      </div>
    </section>
  )
}
