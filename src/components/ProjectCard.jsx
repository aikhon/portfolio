export function ProjectCard({ title, description, tags = [], url }) {
  const body = (
    <>
      <h3 className="text-lg font-medium text-heading group-hover:text-accent">
        {title}
      </h3>

      <p className="mt-2 leading-relaxed">{description}</p>

      {tags.length > 0 && (
        <p className="mt-3 flex flex-wrap gap-2 text-xs text-muted">
          {tags.map((tag) => (
            <span key={tag} className="rounded bg-surface px-2 py-1">
              {tag}
            </span>
          ))}
        </p>
      )}
    </>
  )

  return (
    <li>
      {url ? (
        <a
          href={url}
          className="group relative -mx-4 block rounded-lg border border-transparent p-4 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-line hover:bg-surface"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-3 h-4 w-4 rounded-tr-sm border-r-2 border-t-2  transition-all duration-200 ease-out group-hover:right-2 group-hover:top-2 group-hover:border-accent"
          />
          {body}
        </a>
      ) : (
        <div className="p-4 -mx-4">{body}</div>
      )}
    </li>
  )
}
