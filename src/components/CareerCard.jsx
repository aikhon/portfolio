export function CareerCard({
  company,
  role,
  period,
  location,
  type,
  highlights = [],
  tags = [],
  url,
}) {
  // The company name links out when there's a url; the whole card stays a
  // block so the hover surface matches the other sections.
  return (
    <li className="group -mx-4 rounded-lg border border-transparent p-4 transition-all duration-200 ease-out hover:border-line hover:bg-surface">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-lg font-medium text-heading">
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 hover:text-accent"
            >
              {company}
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
            company
          )}
        </h3>
        {period && (
          <span className="shrink-0 text-sm text-muted">{period}</span>
        )}
      </div>

      {role && <p className="mt-1 text-accent">{role}</p>}

      {(type || location) && (
        <p className="mt-1 text-sm text-muted">
          {[type, location].filter(Boolean).join(" · ")}
        </p>
      )}

      {highlights.length > 0 && (
        <ul className="mt-3 space-y-2">
          {highlights.map((item) => (
            <li key={item} className="flex gap-3 leading-relaxed">
              <span
                aria-hidden="true"
                className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
              />
              <span className="text-sm">{item}</span>
            </li>
          ))}
        </ul>
      )}

      {tags.length > 0 && (
        <p className="mt-3 flex flex-wrap gap-2 text-xs text-muted">
          {tags.map((tag) => (
            <span key={tag} className="rounded bg-surface px-2 py-1">
              {tag}
            </span>
          ))}
        </p>
      )}
    </li>
  );
}
