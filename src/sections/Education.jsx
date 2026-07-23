import { Section } from '../components/Section.jsx'
import { EducationCard } from '../components/EducationCard.jsx'
import { education } from '../data/education.js'

export function Education() {
  return (
    <Section id="education" title="Education">
      <ul className="mt-8 space-y-10">
        {education.map((item) => (
          <EducationCard key={item.school} {...item} />
        ))}
      </ul>
    </Section>
  )
}
