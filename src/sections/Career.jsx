import { career } from "../data/career.js";
import { ExternalLink, Calendar, MapPin } from "lucide-react";
import { playTactileClick } from "../utils/sound.js";

export function Career() {
  return (
    <section id="experience" className="mt-16 pt-14 border-t border-black/[0.08] dark:border-white/[0.08]">
      <div className="flex items-center justify-between">
        <h2 className="text-xs uppercase text-neutral-400 dark:text-neutral-500 tracking-wider font-medium">
          Experience &amp; Roles
        </h2>
        <span className="font-mono text-xs text-neutral-400 dark:text-neutral-500">
          02 // 04
        </span>
      </div>

      <div className="mt-6 space-y-4">
        {career.map((item) => (
          <div
            key={`${item.company}-${item.role}`}
            className="group rounded-xl border border-black/[0.08] dark:border-white/[0.08] p-5 sm:p-6 transition-all duration-200 hover:border-black/25 dark:hover:border-white/20 hover:bg-black/[0.015] dark:hover:bg-white/[0.02]"
          >
            {/* Header: Company + Period */}
            <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between">
              <div className="flex items-baseline gap-2">
                <h3 className="text-base font-medium text-neutral-900 dark:text-neutral-100">
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => playTactileClick("click")}
                      className="inline-flex items-center gap-1 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                    >
                      <span>{item.company}</span>
                      <ExternalLink className="size-3 text-neutral-400" />
                    </a>
                  ) : (
                    item.company
                  )}
                </h3>
              </div>

              <div className="flex items-center gap-1.5 font-mono text-xs text-neutral-400 dark:text-neutral-500 shrink-0">
                <Calendar className="size-3" />
                <span className="uppercase">{item.period}</span>
              </div>
            </div>

            {/* Role & Domain */}
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {item.role}
              </span>
              {item.domainLabel && (
                <span className="rounded-full border border-black/[0.06] dark:border-white/[0.08] px-2 py-0.2 font-mono text-[10px] text-neutral-500">
                  {item.domainLabel}
                </span>
              )}
            </div>

            {/* Location & Type */}
            {(item.location || item.type) && (
              <p className="mt-1 flex items-center gap-1 font-mono text-[11px] text-neutral-400 dark:text-neutral-500">
                <MapPin className="size-3" />
                <span>{[item.location, item.type].filter(Boolean).join(" · ")}</span>
              </p>
            )}

            {/* Highlights */}
            {item.highlights && item.highlights.length > 0 && (
              <ul className="mt-3.5 space-y-1.5 pt-2 border-t border-black/[0.04] dark:border-white/[0.06]">
                {item.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                    <span className="mt-1.5 size-1 rounded-full bg-neutral-400 dark:bg-neutral-600 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Tags */}
            {item.tags && item.tags.length > 0 && (
              <div className="mt-3.5 flex flex-wrap gap-1.5 pt-2 border-t border-black/[0.04] dark:border-white/[0.06]">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-black/[0.03] dark:bg-white/[0.05] px-2 py-0.5 font-mono text-[10px] text-neutral-500 dark:text-neutral-400"
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
