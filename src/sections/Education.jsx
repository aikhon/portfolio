import { Trophy, Award, GraduationCap, ExternalLink } from "lucide-react";
import { playTactileClick } from "../utils/sound.js";

export function Education() {
  const accolades = [
    {
      title: "WorldSkills Kazakhstan",
      subtitle: "1st Place Champion · IT Solutions in Business",
      period: "2024 – 2025",
      badge: "Gold Medal",
      icon: Trophy,
      highlights:
        "Engineered a full B2C marathon platform for the Atyrau Marathon event with integrated payment processing on Stripe. Took 1st place in the national competition.",
      tags: ["React", "Python", "Stripe", "Full-Stack"],
    },
    {
      title: "Atyrau Youth Hackathon",
      subtitle: "1st Place Winner · 300,000 KZT Grant",
      period: "2024 – 2025",
      badge: "Winner",
      icon: Award,
      highlights:
        "Built an activity metrics and applicant tracking platform for Kazakhstani schools. Won the case and secured 300,000 KZT project funding.",
      tags: ["EdTech", "Analytics", "React", "Python"],
    },
    {
      title: "Samsung Innovation Campus",
      subtitle: "Certificate in Big Data Engineering",
      period: "2025",
      badge: "Samsung Electronics",
      icon: GraduationCap,
      url: "https://samsung-campus.kz/ru",
      highlights:
        "Completed practical data engineering program powered by Samsung Electronics Ltd., covering advanced methodologies and Python data processing libraries.",
      tags: ["Python", "Big Data", "Data Engineering"],
    },
    {
      title: "APEC Petrotechnic Higher College",
      subtitle: "Associate Diploma in Software Engineering",
      period: "2022 – 2026",
      badge: "Associate Degree",
      icon: GraduationCap,
      url: "https://apec.edu.kz",
      highlights:
        "Top-ranked engineering college in Kazakhstan partnering with leading Asian technical institutions. Studied calculus, software architecture, and algorithms.",
      tags: ["Software Engineering", "Algorithms", "Calculus"],
    },
    {
      title: "KazHackStan & Digital Bridge",
      subtitle: "Forum Delegate & PS.kz Security Hack Prize",
      period: "2025",
      badge: "Almaty / Astana",
      icon: Award,
      highlights:
        "Won competitive prize hosted by Kazakhstani cloud provider ps.kz at KazHackStan (Almaty). Invited delegate to Digital Bridge 2025 international technology forum (Astana).",
      tags: ["Cybersecurity", "Networking", "Cloud"],
    },
  ];

  return (
    <section id="accolades" className="mt-16 pt-14 border-t border-black/[0.08] dark:border-white/[0.08]">
      <div className="flex items-center justify-between">
        <h2 className="text-xs uppercase text-neutral-400 dark:text-neutral-500 tracking-wider font-medium">
          Accolades &amp; Education
        </h2>
        <span className="font-mono text-xs text-neutral-400 dark:text-neutral-500">
          03 // 04
        </span>
      </div>

      <div className="mt-6 space-y-3.5">
        {accolades.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="group rounded-xl border border-black/[0.08] dark:border-white/[0.08] p-4 sm:p-5 transition-all duration-200 hover:border-black/25 dark:hover:border-white/20 hover:bg-black/[0.015] dark:hover:bg-white/[0.02]"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex size-8 items-center justify-center rounded-lg border border-black/[0.06] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.04] text-neutral-700 dark:text-neutral-300 shrink-0">
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm sm:text-base font-medium text-neutral-900 dark:text-neutral-100">
                        {item.url ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            onClick={() => playTactileClick("click")}
                            className="inline-flex items-center gap-1 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                          >
                            <span>{item.title}</span>
                            <ExternalLink className="size-3 text-neutral-400" />
                          </a>
                        ) : (
                          item.title
                        )}
                      </h3>
                      {item.badge && (
                        <span className="rounded-full bg-black/[0.04] dark:bg-white/[0.06] px-2 py-0.2 font-mono text-[10px] text-neutral-500">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                <span className="font-mono text-xs text-neutral-400 dark:text-neutral-500 shrink-0 self-start sm:self-auto pl-11 sm:pl-0">
                  {item.period}
                </span>
              </div>

              {item.highlights && (
                <p className="mt-2.5 pl-11 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {item.highlights}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
