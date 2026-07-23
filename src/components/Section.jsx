// Shared shell for the Work / Education / About sections: the top rule, the
// vertical rhythm, and the small uppercase label. `id` is what the sidebar
// links to and what the scroll indicator tracks.
export function Section({ id, title, children }) {
  return (
    <section id={id} className="border-t border-rule py-16">
      <h2 className="text-sm font-medium uppercase tracking-wider text-muted">
        {title}
      </h2>
      {children}
    </section>
  )
}
