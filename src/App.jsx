import { ThemeToggle } from './components/ThemeToggle.jsx'
import { ExternalLink } from './components/ExternalLink.jsx'
import { site } from './data/site.js'
import { socials } from './data/socials.js'
import { Hero } from './sections/Hero.jsx'
import { Work } from './sections/Work.jsx'
import { Career } from './sections/Career.jsx'
import { Education } from './sections/Education.jsx'
import { About } from './sections/About.jsx'
import { useScrollReveal } from './hooks/useScrollReveal.js'

export default function App() {
  const mainRef = useScrollReveal()

  return (
    <div className="page-shell">
      <a href="#main" className="skip-link">Skip to content</a>
      <header className="site-header">
        <a href="#home" className="wordmark" aria-label="Alikhan Ikhlassov, home">ai<span aria-hidden="true">.</span></a>
        <nav aria-label="Main navigation">
          <a href="#work">work</a>
          <a href="#about">about</a>
          <ExternalLink href={site.resumeUrl}>cv <span aria-hidden="true">↗</span></ExternalLink>
          <ThemeToggle />
        </nav>
      </header>
      <main id="main" ref={mainRef} tabIndex={-1}>
        <Hero />
        <Work />
        <Career />
        <Education />
        <About />
        <section className="contact" data-reveal aria-labelledby="contact-heading">
          <p className="eyebrow">a good place to start</p>
          <h2 id="contact-heading">Let’s build something useful.</h2>
          <p>I’m open to roles in Kazakhstan and remote teams. If my work sounds like a fit, I’d love to hear from you.</p>
          <a className="contact-email" href={`mailto:${site.email}`}>{site.email}<span aria-hidden="true">↗</span></a>
          <nav className="social-links" aria-label="Find me elsewhere">
            {socials.map(({ label, url }) => <ExternalLink key={label} href={url}>{label}</ExternalLink>)}
          </nav>
        </section>
      </main>
      <footer className="site-footer">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <a href="#home">back to top <span aria-hidden="true">↑</span></a>
      </footer>
    </div>
  )
}
