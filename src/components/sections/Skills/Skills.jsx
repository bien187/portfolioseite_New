import { motion } from "framer-motion"
import { useInView } from "../../../hooks/useInView"
import { useStagger } from "../../../hooks/useStagger"
import { SectionLabel } from "../../ui/SectionLabel/SectionLabel"
import { SKILLS, LANGUAGES, INTERESTS } from "../../../data/content"
import { SMOOTH } from "../../../design/tokens"
import styles from "./Skills.module.css"

function SkillRow({ name, pct, i, sv }) {
  const v = useStagger(sv, i, 80, 65)
  return (
    <motion.div
      className={styles.skillRow}
      initial={{ opacity: 0, y: 10 }}
      animate={v ? { opacity: 1, y: 0 } : {}}
      transition={SMOOTH}
    >
      <span className={styles.skillName}>{name}</span>
      <span className={styles.skillValue}>
        {pct}<sup className={styles.skillSup}></sup>
      </span>
    </motion.div>
  )
}

function LangRow({ lang, level, code, i, sv }) {
  const v = useStagger(sv, i, 80, 65)
  return (
    <motion.div
      className={styles.skillRow}
      initial={{ opacity: 0, y: 10 }}
      animate={v ? { opacity: 1, y: 0 } : {}}
      transition={SMOOTH}
    >
      <span className={styles.skillName}>{lang}</span>
      <span className={styles.skillValue}>
        {level}<sup className={styles.skillSup}> {code}</sup>
      </span>
    </motion.div>
  )
}

function InterestRow({ text, i, sv }) {
  const v = useStagger(sv, i, 100, 72)
  return (
    <motion.div
      className={styles.interestOuter}
      initial={{ opacity: 0, y: 10 }}
      animate={v ? { opacity: 1, y: 0 } : {}}
      transition={SMOOTH}
    >
      <div className={styles.interestInner}>{text}</div>
    </motion.div>
  )
}

export function Skills() {
  const [ref, secVis] = useInView(0.08)
  return (
    <section ref={ref} className={styles.section}>
      <SectionLabel text="Kompetenzen & Interessen" v={secVis} />
      <div className={styles.grid}>

        {/* Linke Spalte: Tech-Stack */}
        <div>
          <motion.p
            className={styles.colLabel}
            initial={{ opacity: 0 }}
            animate={{ opacity: secVis ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Stack
          </motion.p>
          {SKILLS.map(([name, pct], i) => (
            <SkillRow key={name} name={name} pct={pct} i={i} sv={secVis} />
          ))}
        </div>

        {/* Rechte Spalte: Interessen + Sprachen */}
        <div>
          <motion.p
            className={styles.colLabel}
            initial={{ opacity: 0 }}
            animate={{ opacity: secVis ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            Interessen
          </motion.p>
          {INTERESTS.map((text, i) => (
            <InterestRow key={text} text={text} i={i} sv={secVis} />
          ))}

          <motion.p
            className={styles.colLabel}
            style={{ marginTop: "2rem" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: secVis ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            Sprachen
          </motion.p>
          {LANGUAGES.map(({ lang, level, code }, i) => (
            <LangRow key={lang} lang={lang} level={level} code={code} i={i} sv={secVis} />
          ))}
        </div>

      </div>
    </section>
  )
}
