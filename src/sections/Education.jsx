import { Section } from "../components/Section.jsx";
import { EducationCard } from "../components/EducationCard.jsx";
import { education } from "../data/education.js";

export function Education() {
  return (
    <Section
      id="education"
      code="03"
      title="accolades & education"
      subtitle="Degrees, WorldSkills championships, hackathon grants & specialized campuses"
    >
      <ul className="mt-6 space-y-4">
        {education.map((item) => (
          <EducationCard key={item.school} {...item} />
        ))}
      </ul>
    </Section>
  );
}
