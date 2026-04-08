import PageBackground from './components/PageBackground'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import FocusAreas from './components/FocusAreas'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Contact from './components/Contact'

export default function App() {
  return (
    <div className="relative min-h-screen">
      <PageBackground />
      <div className="relative z-10">
        <Nav />
        <main>
          <Hero />
          <About />
          <FocusAreas />
          <Projects />
          <Experience />
          <Skills />
          <Contact />
        </main>
        <footer className="border-t border-gh-border bg-gh-canvas/80 py-8 backdrop-blur-sm">
          <p className="text-center text-sm text-neutral-500">
            &copy; {new Date().getFullYear()} William Nguyen
          </p>
        </footer>
      </div>
    </div>
  )
}
