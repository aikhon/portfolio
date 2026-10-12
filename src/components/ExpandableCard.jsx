import { useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";

export function ExpandableCard({
  title,
  subtitle,
  period,
  url,
  highlights = [],
  tags = [],
  badge,
}) {
  const [open, setOpen] = useState(false);
  const hasDetails = highlights.length > 0 || tags.length > 0;

  return (
    <div className="rounded-lg border border-black/[0.08] dark:border-white/[0.08] transition-colors hover:border-black/25 dark:hover:border-white/25 overflow-hidden">
      <div
        className="group flex items-center justify-between gap-4 px-4 py-3.5 cursor-pointer hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-colors"
        onClick={() => {
          if (hasDetails) {
            setOpen((prev) => !prev);
          } else if (url) {
            window.open(url, "_blank");
          }
        }}
      >
        <span className="min-w-0">
          <span className="block text-[15px] font-medium text-neutral-900 dark:text-neutral-100">
            {title}
            {badge && (
              <span className="ml-2 text-xs font-normal text-neutral-500 dark:text-neutral-400">
                · {badge}
              </span>
            )}
          </span>
          <span className="block text-sm text-neutral-500 dark:text-neutral-400">
            {subtitle}
          </span>
        </span>

        <div className="flex items-center gap-2 shrink-0">
          {period && (
            <span className="text-xs text-neutral-400 dark:text-neutral-500 hidden sm:inline">
              {period}
            </span>
          )}
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1 text-neutral-400 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-white transition-colors"
              title="Open external link"
            >
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ) : (
            <ChevronDown
              className={`h-4 w-4 text-neutral-400 dark:text-neutral-500 transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
            />
          )}
        </div>
      </div>

      {open && hasDetails && (
        <div className="border-t border-black/[0.06] dark:border-white/[0.06] bg-black/[0.015] dark:bg-white/[0.015] px-4 py-3 space-y-2.5 text-xs text-neutral-600 dark:text-neutral-400 animate-fade-in">
          {highlights.length > 0 && (
            <ul className="space-y-1.5 list-disc list-inside">
              {highlights.map((h, i) => (
                <li key={i} className="leading-relaxed">
                  {h}
                </li>
              ))}
            </ul>
          )}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-black/[0.05] dark:bg-white/[0.08] px-2 py-0.5 font-mono text-[10px] text-neutral-700 dark:text-neutral-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          {url && (
            <div className="pt-1">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-neutral-900 dark:text-neutral-100 hover:underline"
              >
                <span>Visit live project</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
