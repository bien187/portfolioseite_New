import { useInView } from "../../../hooks/useInView"
import { SectionLabel } from "../../ui/SectionLabel/SectionLabel"
import { ProjRow } from "./ProjRow"
import { PERSONAL_PROJECTS, SNB_PROJECTS } from "../../../data/content"
import styles from "./Projects.module.css"

export function Projects() {
  const [ref, vis] = useInView(0.05)
  const projects = [...PERSONAL_PROJECTS, ...SNB_PROJECTS]
  return (
    <section id="projekte" ref={ref} className={styles.section}>
      <SectionLabel text="Projekte" v={vis} />
      {projects.map((p, i) => (
        <ProjRow key={p.id} p={p} i={i} />
      ))}
      <div className={styles.endLine} />
    </section>
  )
}
