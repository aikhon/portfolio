import { Section } from "../components/Section.jsx";
import { PhotoGrid } from "../components/PhotoGrid.jsx";
import { photos } from "../data/photos.js";

export function About() {
  return (
    <Section id="about" title="About">
      <div className="mt-6 space-y-4 leading-relaxed">
        <p>
          a cool guy with ambitions on life. an acute listener and a fast
          learner. adaptive.
        </p>
        <p>
          i spend most of my time at the laptop, learning stuff. devops,
          backend, system design. siding with vibecoding.
        </p>
      </div>

      <PhotoGrid photos={photos} />
    </Section>
  );
}
