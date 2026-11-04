import { Grain } from "./components/layout/Grain/Grain"
import { CursorGlow } from "./components/layout/CursorGlow/CursorGlow"
import { Hero } from "./components/sections/Hero/Hero"
import { Projects } from "./components/sections/Projects/Projects"
import { Timeline } from "./components/sections/Timeline/Timeline"
import { Skills } from "./components/sections/Skills/Skills"
import { Footer } from "./components/sections/Footer/Footer"
import Visitenkarte from "./pages/Visitenkarte/Visitenkarte"
import styles from "./App.module.css"

// Versteckte Kontakt-/Visitenkarten-Seite — bewusst nirgends verlinkt.
function isContactRoute() {
  return window.location.pathname.replace(/\/+$/, "") === "/contact"
}

export default function App() {
  if (isContactRoute()) return <Visitenkarte />

  return (
    <>
      <Grain />
      <CursorGlow />
      <main className={styles.pageCol}>
        <Hero />
        <Projects />
        <Timeline />
        <Skills />
        <Footer />
      </main>
    </>
  )
}
