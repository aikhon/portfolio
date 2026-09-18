import { Section } from "../components/Section.jsx";
import { CareerCard } from "../components/CareerCard.jsx";
import { career } from "../data/career.js";

export function Career() {
  return (
    <Section id="career" title="career">
      <ul className="mt-2 space-y-2">
        {career.map((item) => (
          <CareerCard key={`${item.company}-${item.role}`} {...item} />
        ))}
      </ul>
    </Section>
  );
}
