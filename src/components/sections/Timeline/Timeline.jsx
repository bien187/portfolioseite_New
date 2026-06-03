import { useInView } from "../../../hooks/useInView"
import { SectionLabel } from "../../ui/SectionLabel/SectionLabel"
import { GroupLabel } from "../../ui/GroupLabel/GroupLabel"
import { TRow } from "./TRow"
import { TIMELINE, ENGAGEMENT } from "../../../data/content"
import styles from "./Timeline.module.css"

export function Timeline() {
  const [ref, vis] = useInView(0.05)
  return (
    <section id="werdegang" ref={ref} className={styles.section}>
      <SectionLabel text="Werdegang" v={vis} />

      <div className={styles.group}>
        <GroupLabel text="Ausbildung & Beruf" v={vis} delay={0.05} />
        {TIMELINE.map((item, i) => <TRow key={i} item={item} i={i} />)}
        <div className={styles.endLine} />
      </div>

      <div className={styles.group}>
        <GroupLabel text="Engagement" v={vis} delay={0.15} />
        {ENGAGEMENT.map((item, i) => (
          <TRow key={i} item={item} i={TIMELINE.length + i} />
        ))}
        <div className={styles.endLine} />
      </div>
    </section>
  )
}
