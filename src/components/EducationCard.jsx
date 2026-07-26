import { useEffect, useState } from 'react'
import { CloseIcon } from './icons.jsx'

export function EducationCard({
  school,
  degree,
  period,
  description,
  hint,
  url,
  milestones = [],
}) {
  const [open, setOpen] = useState(false)

  // Close on Escape and lock page scroll while the popup is open.
  useEffect(() => {
    if (!open) return
    function onKeyDown(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <li className="group relative">
      {hint && (
        <div className="pointer-events-none absolute right-full top-1/2 mr-4 hidden w-75 -translate-y-1/2 opacity-0 transition-all duration-200 ease-out group-hover:mr-6 group-hover:opacity-100 min-[1440px]:block">
          <div className="rounded-lg border border-line bg-surface p-4 shadow-lg">
            <p className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-accent">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-3.5"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 11v5M12 8h.01" />
              </svg>
              About the college
            </p>
            <p className="text-sm leading-relaxed text-body">{hint}</p>
          </div>
        </div>
      )}

      <div className="-mx-4 rounded-lg border border-transparent p-4 transition-all duration-200 ease-out group-hover:border-line group-hover:bg-surface">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-lg font-medium text-heading">
            {url ? (
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 hover:text-accent"
              >
                {school}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                >
                  <path d="M7 17 17 7M9 7h8v8" />
                </svg>
              </a>
            ) : (
              school
            )}
          </h3>
          {period && (
            <span className="shrink-0 text-sm text-muted">{period}</span>
          )}
        </div>

        {degree && <p className="mt-1 text-accent">{degree}</p>}

        {description && <p className="mt-2 leading-relaxed">{description}</p>}

        {milestones.length > 0 && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group/ms relative mt-4 inline-flex cursor-pointer items-center gap-1.5 overflow-hidden rounded-md border border-line px-3 py-1.5 text-sm font-medium text-heading transition-all duration-300 ease-out hover:scale-[1.03] hover:border-transparent hover:text-canvas hover:shadow-md hover:shadow-accent/30 active:scale-95"
          >
            {/* Animated gradient that fades in and sweeps on hover */}
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-[length:200%_auto] opacity-0 transition-opacity duration-300 group-hover/ms:animate-shimmer group-hover/ms:opacity-100 [background-image:linear-gradient(110deg,var(--accent),#e0a060,var(--accent),#e0a060,var(--accent))]"
            />
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="relative size-4 text-accent transition-colors duration-300 group-hover/ms:text-canvas"
            >
              <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
            </svg>
            <span className="relative">Milestones</span>
          </button>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/50"
          />

          {/* Popup widget */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Milestones at ${school}`}
            className="relative z-10 max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl border border-line bg-canvas p-6 shadow-2xl sm:p-8 md:max-w-2xl lg:max-w-3xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-accent">
                  Milestones
                </p>
                <h4 className="mt-1 text-lg font-medium text-heading">
                  {school}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close milestones"
                className="-mr-2 -mt-2 rounded-md p-2 text-muted hover:bg-surface hover:text-heading"
              >
                <CloseIcon />
              </button>
            </div>

            <ol className="mt-6 space-y-6">
              {milestones.map((m, i) => (
                <li key={i} className="flex gap-4">
                  {/* Timeline rail + dot */}
                  <div className="flex flex-col items-center">
                    <span className="mt-1 size-2.5 shrink-0 rounded-full bg-accent" />
                    {i < milestones.length - 1 && (
                      <span className="mt-1 w-px flex-1 bg-line" />
                    )}
                  </div>
                  <div className="pb-1">
                    {m.date && (
                      <p className="text-xs font-medium text-muted">{m.date}</p>
                    )}
                    <p className="font-medium text-heading">{m.title}</p>
                    {m.detail && (
                      <p className="mt-1 text-sm leading-relaxed text-body">
                        {m.detail}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </li>
  )
}
