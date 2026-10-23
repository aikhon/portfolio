import { ExternalLink } from "../components/ExternalLink.jsx";
import { PhotoStrip } from "../components/PhotoStrip.jsx";
import { site } from "../data/site.js";

export function Hero() {
  return (
    <section id="home" className="intro" aria-labelledby="intro-heading">
      <p className="intro-hello">
        hey, I’m Alikhan{' '}
        <svg className="intro-star" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <g key={angle} transform={`rotate(${angle} 12 12)`}>
              <path className="star-ray" d="M12 10V3" />
            </g>
          ))}
        </svg>
      </p>
      <h1 id="intro-heading">Alikhan Ikhlassov<span className="accent">.</span></h1>
      <p className="intro-description">A full-stack developer, a runner, and a curious person<br className="desktop-break" /> from Atyrau, Kazakhstan.</p>
      <div className="intro-story prose">
        <p>
          I build web products and work on the systems behind them. My work
          spans bus ticketing, restaurant software, and the small automations
          that make someone’s day easier.
        </p>
        <p>
          Currently an IT engineer at{" "}
          <a href="#career">Kaspi Montazh Service</a>. Previously, I built and
          supported three restaurant products at <a href="#career">TheTochka</a>{" "}
          and worked on backend APIs at <a href="#career">Robosoft</a>.
        </p>
      </div>
      <div className="intro-links">
        <a className="text-link" href={`mailto:${site.email}`}>
          say hello <span aria-hidden="true">↗</span>
        </a>
        <ExternalLink className="text-link" href={site.resumeUrl}>
          view my cv <span aria-hidden="true">↗</span>
        </ExternalLink>
        <span className="availability">
          <span className="status-dot" aria-hidden="true" />
          open to opportunities
        </span>
      </div>
      <PhotoStrip />
    </section>
  );
}
