import { useRef } from "react"
import { motion, useTransform } from "framer-motion"
import { useInView } from "../../../hooks/useInView"
import { useStagger } from "../../../hooks/useStagger"
import { useCenterProximity } from "../../../hooks/useCenterProximity"
import { SectionLabel } from "../../ui/SectionLabel/SectionLabel"
import { SKILLS, LANGUAGES, INTERESTS } from "../../../data/content"
import { SMOOTH } from "../../../design/tokens"
import styles from "./Skills.module.css"

function SkillRow({ name, pct, i, sv }) {
  const ref = useRef(null)
  const v = useStagger(sv, i, 80, 65)
  const proximity = useCenterProximity(ref)
  const scale = useTransform(proximity, [0, 1], [1, 1.035])
  const lift  = useTransform(proximity, [0, 1], [0, -3])
  return (
    <motion.div
      ref={ref}
      className={styles.skillRow}
      initial={{ opacity: 0 }}
      animate={{ opacity: v ? 1 : 0 }}
      transition={SMOOTH}
      style={{ scale, y: lift }}
    >
      <span className={styles.skillName}>{name}</span>
      <span className={styles.skillValue}>
        {pct}<sup className={styles.skillSup}></sup>
      </span>
    </motion.div>
  )
}

function LangRow({ lang, level, code, i, sv }) {
  const ref = useRef(null)
  const v = useStagger(sv, i, 80, 65)
  const proximity = useCenterProximity(ref)
  const scale = useTransform(proximity, [0, 1], [1, 1.035])
  const lift  = useTransform(proximity, [0, 1], [0, -3])
  return (
    <motion.div
      ref={ref}
      className={styles.skillRow}
      initial={{ opacity: 0 }}
      animate={{ opacity: v ? 1 : 0 }}
      transition={SMOOTH}
      style={{ scale, y: lift }}
    >
      <span className={styles.skillName}>{lang}</span>
      <span className={styles.skillValue}>
        {level}<sup className={styles.skillSup}> {code}</sup>
      </span>
    </motion.div>
  )
}

function InterestRow({ text, i, sv }) {
  const ref = useRef(null)
  const v = useStagger(sv, i, 100, 72)
  const proximity = useCenterProximity(ref)
  const scale = useTransform(proximity, [0, 1], [1, 1.035])
  const lift  = useTransform(proximity, [0, 1], [0, -3])
  return (
    <motion.div
      ref={ref}
      className={styles.interestOuter}
      initial={{ opacity: 0 }}
      animate={{ opacity: v ? 1 : 0 }}
      transition={SMOOTH}
      style={{ scale, y: lift }}
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

        <div className={styles.col1}>
          <motion.p
            className={styles.colLabel}
            initial={{ opacity: 0 }}
            animate={{ opacity: secVis ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >Stack</motion.p>
          {SKILLS.map(([name, pct], i) => (
            <SkillRow key={name} name={name} pct={pct} i={i} sv={secVis} />
          ))}
        </div>

        <div className={styles.col2}>
          <motion.p
            className={styles.colLabel}
            initial={{ opacity: 0 }}
            animate={{ opacity: secVis ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >Interessen</motion.p>
          {INTERESTS.map((text, i) => (
            <InterestRow key={text} text={text} i={i} sv={secVis} />
          ))}
        </div>

        <div className={styles.col3}>
          <div className={styles.col3Inner}>
            <motion.p
              className={styles.colLabel}
              initial={{ opacity: 0 }}
              animate={{ opacity: secVis ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >Sprachen</motion.p>
            {LANGUAGES.map(({ lang, level, code }, i) => (
              <LangRow key={lang} lang={lang} level={level} code={code} i={i} sv={secVis} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
