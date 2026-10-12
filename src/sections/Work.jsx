import { Section } from "../components/Section.jsx";
import { ProjectCard } from "../components/ProjectCard.jsx";
import { projects } from "../data/projects.js";

export function Work({ activeFilter }) {
  const filtered =
    !activeFilter || activeFilter === "all"
      ? projects
      : projects.filter((item) => {
          if (activeFilter === "swe") return item.domain === "fullstack";
          if (activeFilter === "systems") return item.domain === "systems";
          return true;
        });

  return (
    <Section
      id="work"
      code="04"
      title="projects & systems"
      subtitle="Production transit platforms, hospitality suites, and automated pipelines"
      action={
        <span className="font-mono text-xs text-muted">
          {filtered.length} active deployments
        </span>
      }
    >
      <ul className="mt-6 space-y-5">
        {filtered.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </ul>
    </Section>
  );
}
