import { projects } from "../data/projects.js";
import { ArrowUpRight, Layers, CheckCircle2 } from "lucide-react";
import { playTactileClick } from "../utils/sound.js";

export function Work() {
  return (
    <section id="work" className="pt-14 border-t border-black/[0.08] dark:border-white/[0.08]">
      <div className="flex items-center justify-between">
        <h2 className="text-xs uppercase text-neutral-400 dark:text-neutral-500 tracking-wider font-medium">
          Featured Projects &amp; Systems
        </h2>
        <span className="font-mono text-xs text-neutral-400 dark:text-neutral-500">
          01 // 04
        </span>
      </div>

      <div className="mt-6 space-y-4">
        {projects.map((project) => (
          <div
            key={project.id || project.title}
            className="group rounded-xl border border-black/[0.08] dark:border-white/[0.08] p-5 sm:p-6 transition-all duration-200 hover:border-black/25 dark:hover:border-white/20 hover:bg-black/[0.015] dark:hover:bg-white/[0.02]"
          >
            {/* Header: Title + Badge + External Link */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {project.title}
                  </h3>
                </div>
                {project.subtitle && (
                  <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                    {project.subtitle}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                {project.metrics && (
                  <span className="rounded-full border border-black/[0.06] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.04] px-2.5 py-0.5 font-mono text-[11px] text-neutral-600 dark:text-neutral-300">
                    {project.metrics}
                  </span>
                )}
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => playTactileClick("click")}
                    aria-label={`Visit ${project.title}`}
                    className="p-1 text-neutral-400 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-white transition-colors"
                  >
                    <ArrowUpRight className="size-4.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {project.description}
            </p>

            {/* Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <ul className="mt-3 space-y-1.5 pt-2">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                    <span className="mt-1 size-1 rounded-full bg-neutral-400 dark:bg-neutral-600 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Tech Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5 pt-2 border-t border-black/[0.04] dark:border-white/[0.06]">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-black/[0.03] dark:bg-white/[0.05] px-2 py-0.5 font-mono text-[11px] text-neutral-600 dark:text-neutral-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
