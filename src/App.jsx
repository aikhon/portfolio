import { useEffect, useState } from 'react'
import { MobileBar } from './components/MobileBar.jsx'
import { Sidebar } from './components/Sidebar.jsx'
import { navItems, site } from './data/site.js'
import { useScrollSpy } from './hooks/useScrollSpy.js'
import { Hero } from './sections/Hero.jsx'
import { Work } from './sections/Work.jsx'
import { Education } from './sections/Education.jsx'
import { About } from './sections/About.jsx'

// Defined out here so the array identity is stable across renders — otherwise
// useScrollSpy would tear down and re-add its listeners every time.
const NAV_IDS = navItems.map((item) => item.id)

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const activeIndex = useScrollSpy(NAV_IDS)

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-60 focus:rounded-md focus:bg-heading focus:px-4 focus:py-2 focus:text-canvas"
      >
        Skip to content
      </a>

      <MobileBar open={menuOpen} onOpen={() => setMenuOpen(true)} />

      <div
        onClick={closeMenu}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 lg:hidden ${
          menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <Sidebar open={menuOpen} onClose={closeMenu} activeIndex={activeIndex} />

      <div className="lg:pl-64">
        <main id="main" className="mx-auto max-w-2xl px-6">
          <Hero />
          <Work />
          <Education />
          <About />
        </main>

        <footer className="border-t border-rule">
          <div className="mx-auto max-w-2xl px-6 py-8 text-sm text-muted">
            &copy; {new Date().getFullYear()} {site.name}
          </div>
        </footer>
      </div>
    </>
  )
}
