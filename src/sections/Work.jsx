import { Section } from '../components/Section.jsx'
import { ExternalLink } from '../components/ExternalLink.jsx'
import { projects } from '../data/projects.js'

export function Work() {
  return (
    <Section id="work" title="Selected work" aside={<span className="section-note">built for real people</span>}>
      <ul className="project-list">
        {projects.map((project, index) => (
          <li key={project.title}>
            <ExternalLink href={project.url} className="project-link">
              <span className="project-number" aria-hidden="true">0{index + 1}</span>
              <div>
                <h3>{project.title} <span className="project-arrow" aria-hidden="true">↗</span></h3>
                <p>{project.description}</p>
                <span className="project-stack">{project.tags.join(' / ')}</span>
                <span className="project-domain">{project.displayUrl} <span aria-hidden="true">↗</span></span>
              </div>
            </ExternalLink>
          </li>
        ))}
      </ul>
    </Section>
  )
}
