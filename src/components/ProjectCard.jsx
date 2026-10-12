import { ExternalLink, CheckCircle, Terminal, Layers } from "lucide-react";
import { playTactileClick } from "../utils/sound.js";

export function ProjectCard({
  title,
  subtitle,
  description,
  metrics,
  highlights = [],
  tags = [],
  url,
}) {
  return (
    <li className="group rounded-xl border border-line bg-surface p-5 sm:p-6 transition-all duration-200 hover:border-rule hover:shadow-md">
      {/* Header with Title and Metrics Pill */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-mono text-base sm:text-lg font-semibold text-heading group-hover:text-accent transition-colors">
              {title}
            </h3>
          </div>
          {subtitle && (
            <p className="mt-0.5 font-mono text-xs text-muted">
              {subtitle}
            </p>
          )}
        </div>

        {metrics && (
          <span className="self-start rounded-md border border-line bg-surface-subtle px-2.5 py-1 font-mono text-[10px] font-medium text-heading">
            {metrics}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="mt-3 text-sm leading-relaxed text-body">{description}</p>

      {/* Engineering Highlights */}
      {highlights.length > 0 && (
        <div className="mt-4 space-y-1.5 border-t border-line/60 pt-3">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-muted">
            KEY ARCHITECTURE &amp; HIGHLIGHTS:
          </p>
          <ul className="space-y-1.5">
            {highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-body">
                <span className="mt-1 size-1.5 rounded-full bg-accent shrink-0" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tags and Live URL */}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-line/60 pt-4">
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-line/70 bg-surface-subtle px-2 py-0.5 font-mono text-[11px] text-muted transition-colors hover:text-heading"
            >
              {tag}
            </span>
          ))}
        </div>

        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            onClick={() => playTactileClick("click")}
            className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-md bg-heading px-3 py-1.5 font-mono text-xs font-medium text-canvas hover:opacity-90 transition-opacity"
          >
            <span>LIVE PLATFORM</span>
            <ExternalLink className="size-3" />
          </a>
        ) : (
          <span className="inline-flex items-center gap-1 font-mono text-[11px] text-muted self-start sm:self-auto">
            <span className="size-1.5 rounded-full bg-status-ok" />
            <span>ENTERPRISE / PRIVATE DEPLOY</span>
          </span>
        )}
      </div>
    </li>
  );
}
