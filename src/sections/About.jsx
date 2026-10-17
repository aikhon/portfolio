import { Section } from '../components/Section.jsx'
import { ExternalLink } from '../components/ExternalLink.jsx'
import { socials } from '../data/socials.js'

export function About() {
  const monkeytype = socials.find((social) => social.label === 'Monkeytype')
  return (
    <Section id="about" title="Away from the job titles">
      <div className="prose">
        <p>I like figuring things out. Lately that means going deeper into backend engineering, DevOps, and system design—understanding how everything fits together, beyond getting it to run.</p>
        <p>Outside of that, I run, turn up at hackathons, and spend a little too much time on <ExternalLink href={monkeytype.url}>Monkeytype</ExternalLink>. I’m a good listener, a fast learner, and usually up for trying something new.</p>
      </div>
      <p className="personal-note">still learning. still building.</p>
    </Section>
  )
}
