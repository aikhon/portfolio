import { ThemeToggle } from "./components/ThemeToggle.jsx";
import { BannerCanvas } from "./components/BannerCanvas.jsx";
import { Signature } from "./components/Signature.jsx";
import { ExpandableCard } from "./components/ExpandableCard.jsx";
import { PhotoGrid } from "./components/PhotoGrid.jsx";
import { projects } from "./data/projects.js";
import { career } from "./data/career.js";
import { education } from "./data/education.js";
import { photos } from "./data/photos.js";
import { site } from "./data/site.js";

export default function App() {
  const accolades = [
    {
      title: "WorldSkills Kazakhstan",
      subtitle: "1st Place Champion · IT Solutions in Business",
      period: "2024 – 2025",
      badge: "Gold Medal",
      highlights: [
        "Developed full B2C marathon platform for Atyrau Marathon event with integrated payment processing",
        "Awarded 1st place in the national competition category",
      ],
      tags: ["React", "Python", "Stripe", "Full-Stack"],
    },
    {
      title: "Atyrau Youth Hackathon",
      subtitle: "1st Place Case Winner · 300,000 KZT Grant",
      period: "2024 – 2025",
      badge: "Winner",
      highlights: [
        "Built school metrics and applicant tracking platform under hackathon deadline",
        "Won case and received 300,000 KZT project funding",
      ],
      tags: ["EdTech", "Analytics", "React", "Python"],
    },
    {
      title: "Samsung Innovation Campus",
      subtitle: "Certificate of Completion in Big Data",
      period: "2025",
      url: "https://samsung-campus.kz/ru",
      badge: "Samsung Electronics",
      highlights: [
        "Completed rigorous curriculum on practical data engineering and advanced methodologies",
        "Practiced data manipulation, analysis, and algorithmic pipelines with Python",
      ],
      tags: ["Python", "Big Data", "Data Engineering"],
    },
    {
      title: "APEC Petrotechnic",
      subtitle: "Associate Diploma in Software Engineering",
      period: "2022 – 2026",
      url: "https://apec.edu.kz",
      badge: "Higher College",
      highlights: [
        "Top-ranked engineering college in Kazakhstan partnering with premier Asian universities",
        "Studied computer science, calculus, system design, and algorithms",
      ],
      tags: ["Software Engineering", "Algorithms", "Calculus"],
    },
    {
      title: "KazHackStan & Digital Bridge",
      subtitle: "Forum Delegate & PS.kz Prize Winner",
      period: "2025",
      badge: "Almaty / Astana",
      highlights: [
        "Won competition hosted by Kazakhstani cloud provider ps.kz at KazHackStan (Almaty)",
        "Invited delegate to Digital Bridge 2025 international technology forum (Astana)",
      ],
      tags: ["Cybersecurity", "Networking", "Cloud"],
    },
  ];

  return (
    <>
      {/* Floating Theme Toggle (top right, identical to dimash.cc) */}
      <ThemeToggle />

      <main className="min-h-screen">
        <div className="min-h-screen min-h-dvh flex flex-col px-6 py-20 sm:py-28 font-sans">
          <article className="w-full max-w-xl mx-auto flex-1">
            {/* Top Interactive Generative Waveform Banner */}
            <BannerCanvas />

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-medium tracking-[-0.02em] text-neutral-900 dark:text-neutral-100">
              Alikhan (aikhon) Ikhlassov
            </h1>

            {/* Editorial Bio */}
            <div className="mt-6 space-y-5 text-[15px] sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
              <p>
                I'm a software engineer and systems builder from Atyrau, Kazakhstan.
                I started building early and never really stopped; today most of my energy goes into shipping reliable web platforms and practical infrastructure.
              </p>

              <p>
                I build web applications and digital platforms. I developed{" "}
                <a
                  href="https://miyaly-bus.kz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-900 dark:text-neutral-100 dark:decoration-neutral-600 dark:hover:decoration-white"
                >
                  Miyaly Bus
                </a>
                , an intercity transit booking platform serving travelers across the Atyrau region with real-time seat reservation and Kaspi.kz payment processing. Alongside client work, I engineered{" "}
                <span className="font-medium text-neutral-900 dark:text-neutral-100">
                  TheTochka
                </span>
                , an all-in-one hospitality POS system, QR menu with CMS, and automated table reservation suite migrating legacy storage to distributed cloud databases.
              </p>

              <p>
                I work across the full spectrum from application code to physical infrastructure: writing C# (.NET), React, and Python Django backends, while also configuring enterprise local area networks, DHCP, PXE boot environments, and containerized field offices for industrial operations in Western Kazakhstan.
              </p>

              <p>
                Beyond code, I'm an endurance runner training for long distances and a high-speed typist (120+ WPM on Monkeytype). I'd rather ship something real, see how it performs in production, and iterate rapidly than wait for an armchair plan.
              </p>
            </div>

            {/* Handwritten Signature */}
            <Signature />

            {/* Companies & products */}
            <section className="mt-14">
              <h2 className="text-xs uppercase text-neutral-400 dark:text-neutral-500 tracking-wider">
                Companies &amp; products
              </h2>
              <div className="mt-4 space-y-2">
                {projects.map((p) => (
                  <ExpandableCard
                    key={p.title}
                    title={p.title}
                    subtitle={p.subtitle || p.description}
                    url={p.url}
                    highlights={p.highlights}
                    tags={p.tags}
                    badge={p.metrics}
                  />
                ))}
              </div>
            </section>

            {/* Experience */}
            <section className="mt-14">
              <h2 className="text-xs uppercase text-neutral-400 dark:text-neutral-500 tracking-wider">
                Experience
              </h2>
              <div className="mt-4 space-y-2">
                {career.map((c) => (
                  <ExpandableCard
                    key={`${c.company}-${c.role}`}
                    title={c.company}
                    subtitle={`${c.role} · ${c.location}`}
                    period={c.period}
                    url={c.url}
                    highlights={c.highlights}
                    tags={c.tags}
                    badge={c.domainLabel}
                  />
                ))}
              </div>
            </section>

            {/* Accolades & Milestones */}
            <section className="mt-14">
              <h2 className="text-xs uppercase text-neutral-400 dark:text-neutral-500 tracking-wider">
                Accolades &amp; Milestones
              </h2>
              <div className="mt-4 space-y-2">
                {accolades.map((a) => (
                  <ExpandableCard
                    key={a.title}
                    title={a.title}
                    subtitle={a.subtitle}
                    period={a.period}
                    url={a.url}
                    highlights={a.highlights}
                    tags={a.tags}
                    badge={a.badge}
                  />
                ))}
              </div>
            </section>

            {/* Field notes & snapshots */}
            <section className="mt-14">
              <h2 className="text-xs uppercase text-neutral-400 dark:text-neutral-500 tracking-wider">
                Field notes &amp; snapshots
              </h2>
              <div className="mt-4">
                <PhotoGrid photos={photos} />
              </div>
            </section>

            {/* Profiles & social */}
            <section className="mt-14">
              <h2 className="text-xs uppercase text-neutral-400 dark:text-neutral-500 tracking-wider">
                Profiles &amp; social
              </h2>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                <a
                  href="https://linkedin.com/in/ikhlassov"
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="text-sm text-neutral-500 underline-offset-4 transition-colors hover:text-neutral-900 hover:underline dark:text-neutral-400 dark:hover:text-white"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/aikhon"
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="text-sm text-neutral-500 underline-offset-4 transition-colors hover:text-neutral-900 hover:underline dark:text-neutral-400 dark:hover:text-white"
                >
                  GitHub
                </a>
                <a
                  href="https://t.me/ikhlasov"
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="text-sm text-neutral-500 underline-offset-4 transition-colors hover:text-neutral-900 hover:underline dark:text-neutral-400 dark:hover:text-white"
                >
                  Telegram
                </a>
                <a
                  href="https://instagram.com/alikhanikhlasov"
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="text-sm text-neutral-500 underline-offset-4 transition-colors hover:text-neutral-900 hover:underline dark:text-neutral-400 dark:hover:text-white"
                >
                  Instagram
                </a>
                <a
                  href="https://wa.me/87787060150"
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="text-sm text-neutral-500 underline-offset-4 transition-colors hover:text-neutral-900 hover:underline dark:text-neutral-400 dark:hover:text-white"
                >
                  WhatsApp
                </a>
                <a
                  href="https://monkeytype.com/profile/pixeln"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-500 underline-offset-4 transition-colors hover:text-neutral-900 hover:underline dark:text-neutral-400 dark:hover:text-white"
                >
                  Monkeytype
                </a>
                <a
                  href={site.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-500 underline-offset-4 transition-colors hover:text-neutral-900 hover:underline dark:text-neutral-400 dark:hover:text-white"
                >
                  CV (PDF)
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="text-sm text-neutral-500 underline-offset-4 transition-colors hover:text-neutral-900 hover:underline dark:text-neutral-400 dark:hover:text-white"
                >
                  Email
                </a>
              </div>
            </section>

            <div className="mt-16" />
          </article>

          {/* Footer */}
          <footer className="w-full max-w-xl mx-auto mt-20 text-xs text-neutral-400 dark:text-neutral-600">
            &copy; {new Date().getFullYear()} Alikhan Ikhlassov
          </footer>
        </div>
      </main>
    </>
  );
}
