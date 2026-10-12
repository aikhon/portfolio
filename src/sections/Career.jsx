import { Section } from "../components/Section.jsx";
import { CareerCard } from "../components/CareerCard.jsx";
import { career } from "../data/career.js";

export function Career({ activeFilter }) {
  const filtered =
    !activeFilter || activeFilter === "all"
      ? career
      : career.filter((item) => item.domain === activeFilter);

  return (
    <Section
      id="career"
      code="02"
      title="career & experience"
      subtitle="Production engineering, enterprise automation & infrastructure roles"
      action={
        <span className="font-mono text-xs text-muted">
          Showing {filtered.length} of {career.length} stations
        </span>
      }
    >
      <ul className="mt-6 space-y-4">
        {filtered.map((item) => (
          <CareerCard key={`${item.company}-${item.role}`} {...item} />
        ))}
      </ul>
    </Section>
  );
}
