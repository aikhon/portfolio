import { Section } from '../components/Section.jsx'
import { ExternalLink } from '../components/ExternalLink.jsx'
import { education, highlights } from '../data/education.js'

export function Education() {
  return (
    <Section id="education" title="A few things I’m proud of">
      <ul className="highlight-list">
        {highlights.map((item) => <li key={item.title}><span className="highlight-mark" aria-hidden="true">↳</span><p><strong>{item.title}</strong> {item.detail}</p></li>)}
      </ul>
      <div className="education-summary">
        {education.map((item) => <p key={item.school}><ExternalLink href={item.url}>{item.school}</ExternalLink><span>{item.degree} · {item.period}</span></p>)}
      </div>
      <details className="milestones">
        <summary>The longer story <span className="disclosure-icon" aria-hidden="true" /></summary>
        <ol className="milestone-list">
          {education[0].milestones.map((item) => <li key={item.title}><span className="milestone-date">{item.date}</span><h3>{item.title}</h3><p>{item.detail}</p></li>)}
        </ol>
      </details>
    </Section>
  )
}
