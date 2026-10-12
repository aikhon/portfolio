import { ExternalLink, MapPin, Calendar, Briefcase, CheckCircle2 } from "lucide-react";
import { playTactileClick } from "../utils/sound.js";

export function CareerCard({
  company,
  role,
  period,
  location,
  type,
  domain,
  domainLabel,
  highlights = [],
  tags = [],
  url,
}) {
  return (
    <li className="group rounded-xl border border-line bg-surface p-5 sm:p-6 transition-all duration-200 hover:border-rule hover:shadow-md">
      {/* Header Bar with Company & Period */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
        <div className="flex items-baseline gap-2">
          <h3 className="font-mono text-base sm:text-lg font-semibold text-heading">
            {url ? (
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                onClick={() => playTactileClick("click")}
                className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
              >
                <span>{company}</span>
                <ExternalLink className="size-3.5 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ) : (
              company
            )}
          </h3>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-muted shrink-0">
          <Calendar className="size-3 text-accent" />
          <span className="font-medium text-heading/80 uppercase">{period}</span>
        </div>
      </div>

      {/* Role and Domain Badge */}
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <p className="font-mono text-xs sm:text-sm font-semibold text-accent uppercase">
          {role}
        </p>
        {domainLabel && (
          <span className="rounded border border-line bg-surface-subtle px-2 py-0.5 font-mono text-[10px] text-muted">
            {domainLabel}
          </span>
        )}
      </div>

      {/* Location & Employment Type Metadata */}
      {(type || location) && (
        <div className="mt-2 flex flex-wrap items-center gap-3 font-mono text-xs text-muted">
          {location && (
            <span className="flex items-center gap-1">
              <MapPin className="size-3 text-muted" />
              <span>{location}</span>
            </span>
          )}
          {type && (
            <span className="flex items-center gap-1">
              <Briefcase className="size-3 text-muted" />
              <span className="capitalize">{type}</span>
            </span>
          )}
        </div>
      )}

      {/* Engineering Highlights */}
      {highlights.length > 0 && (
        <ul className="mt-4 space-y-2 border-t border-line/60 pt-3">
          {highlights.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-sm text-body leading-relaxed">
              <span className="mt-1.5 size-1.5 rounded-full bg-accent shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Tech Stack Chips */}
      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5 pt-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-line/70 bg-surface-subtle px-2 py-0.5 font-mono text-[11px] text-muted transition-colors hover:text-heading hover:border-rule"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </li>
  );
}
