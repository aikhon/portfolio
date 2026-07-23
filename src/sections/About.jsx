import { Section } from '../components/Section.jsx'
import { PhotoGrid } from '../components/PhotoGrid.jsx'
import { photos } from '../data/photos.js'

export function About() {
  return (
    <Section id="about" title="About">
      <div className="mt-6 space-y-4 leading-relaxed">
        <p>
          A cool guy with nice ambitions on life. An acute listener and a fast learner. Adaptation on top.
        </p>
        <p>
          I predominantly sit at my laptop where I do most of my stuff.
          Learning DevOps, sutdying Calculus for university, and running in my free time.
        </p>
      </div>

      <PhotoGrid photos={photos} />
    </Section>
  )
}
