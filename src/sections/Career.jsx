import { Section } from '../components/Section.jsx'
import { ExternalLink } from '../components/ExternalLink.jsx'
import { career } from '../data/career.js'

export function Career() {
  return (
    <Section id="career" title="Where I’ve been" aside={<span className="section-note">a little more context</span>}>
      <ul className="career-list">
        {career.map((job) => (
          <li key={`${job.company}-${job.role}`}>
            <details className="career-entry">
              <summary>
                <span className="career-period">{job.period}</span>
                <span className="career-name"><span className="company">{job.company}</span><span className="role">{job.role}</span></span>
                <span className="disclosure-icon" aria-hidden="true" />
              </summary>
              <div className="career-detail">
                <p className="career-meta">{job.type} · {job.location}</p>
                {job.highlights?.length > 0 && <ul>{job.highlights.map((item) => <li key={item}>{item}</li>)}</ul>}
                <p className="stack-list">{job.tags.join(' · ')}</p>
                {job.url && <ExternalLink className="text-link" href={job.url}>company website <span aria-hidden="true">↗</span></ExternalLink>}
              </div>
            </details>
          </li>
        ))}
      </ul>
    </Section>
  )
}
