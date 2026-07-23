import { Section } from '../components/Section.jsx'
import { ProjectCard } from '../components/ProjectCard.jsx'
import { projects } from '../data/projects.js'

export function Work() {
  return (
    <Section id="work" title="Projects">
      <ul className="mt-8 space-y-10">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </ul>
    </Section>
  )
}
