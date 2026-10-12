import { useState, useEffect } from "react";
import {
  ExternalLink,
  Award,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Sparkles,
  Calendar,
  X,
} from "lucide-react";
import { playTactileClick } from "../utils/sound.js";

export function EducationCard({
  school,
  degree,
  period,
  description,
  hint,
  url,
  milestones = [],
}) {
  const [expanded, setExpanded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!modalOpen) return;
    function onKeyDown(e) {
      if (e.key === "Escape") setModalOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  const toggleExpand = () => {
    setExpanded(!expanded);
    playTactileClick("switch");
  };

  return (
    <li className="rounded-xl border border-line bg-surface p-5 sm:p-6 transition-all duration-200 hover:border-rule hover:shadow-md">
      {/* Institution & Period */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
        <div className="flex items-center gap-2">
          <GraduationCap className="size-5 text-accent shrink-0" />
          <h3 className="font-mono text-base sm:text-lg font-semibold text-heading">
            {url ? (
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                onClick={() => playTactileClick("click")}
                className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
              >
                <span>{school}</span>
                <ExternalLink className="size-3.5 text-muted" />
              </a>
            ) : (
              school
            )}
          </h3>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-muted shrink-0">
          <Calendar className="size-3 text-accent" />
          <span className="font-medium text-heading/80 uppercase">{period}</span>
        </div>
      </div>

      {/* Degree title */}
      {degree && (
        <p className="mt-2 font-mono text-xs sm:text-sm font-semibold text-accent uppercase">
          {degree}
        </p>
      )}

      {/* Description */}
      {description && (
        <p className="mt-2 text-sm leading-relaxed text-body">{description}</p>
      )}

      {/* About the institution hint */}
      {hint && (
        <div className="mt-3 rounded-md border border-line/60 bg-surface-subtle p-3 text-xs leading-relaxed text-muted">
          <span className="font-mono font-semibold uppercase text-accent">
            Institutional Context:{" "}
          </span>
          {hint}
        </div>
      )}

      {/* Milestone Highlights Teaser & Expand Toggle */}
      {milestones.length > 0 && (
        <div className="mt-5 border-t border-line/60 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-xs text-heading">
              <Award className="size-4 text-accent" />
              <span className="font-semibold uppercase tracking-wider">
                COMPETITIONS &amp; MILESTONES
              </span>
              <span className="rounded-full bg-surface-subtle border border-line px-2 py-0.2 text-[10px] text-muted">
                {milestones.length}
              </span>
            </div>

            <button
              type="button"
              onClick={toggleExpand}
              className="flex items-center gap-1.5 rounded-md border border-line bg-surface-subtle px-3 py-1.5 font-mono text-xs text-heading hover:bg-surface-active transition-colors"
            >
              <span>{expanded ? "COLLAPSE" : "INSPECT TIMELINE"}</span>
              {expanded ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
            </button>
          </div>

          {/* Inline Expanded Timeline */}
          {expanded && (
            <div className="mt-5 space-y-4 rounded-lg border border-line/60 bg-canvas p-4 sm:p-5">
              <ol className="relative border-l border-line ml-2 space-y-6">
                {milestones.map((m, idx) => (
                  <li key={idx} className="ml-4">
                    <span className="absolute -left-1.5 mt-1.5 size-3 rounded-full border-2 border-canvas bg-accent" />
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span className="font-mono text-[11px] font-semibold uppercase text-accent">
                        {m.date}
                      </span>
                      <h4 className="font-mono text-xs sm:text-sm font-semibold text-heading">
                        {m.title}
                      </h4>
                    </div>
                    {m.detail && (
                      <p className="mt-1 text-xs sm:text-sm text-body leading-relaxed">
                        {m.detail}
                      </p>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}
    </li>
  );
}
