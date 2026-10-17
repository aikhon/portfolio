export function Section({ id, title, aside, children }) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-heading`}>
      <div className="section-heading">
        <h2 id={`${id}-heading`} className="eyebrow">{title}</h2>
        {aside}
      </div>
      {children}
    </section>
  )
}
