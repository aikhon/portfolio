export function Section({ id, code, title, subtitle, action, children }) {
  return (
    <section id={id} className="border-t border-rule pt-14 pb-16">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between pb-6">
        <div>
          <div className="flex items-center gap-2">
            {code && (
              <span className="font-mono text-xs font-semibold text-accent">
                {code} //
              </span>
            )}
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-muted">
              {title}
            </h2>
          </div>
          {subtitle && (
            <p className="mt-1 text-base font-semibold text-heading">
              {subtitle}
            </p>
          )}
        </div>
        {action && <div className="mt-2 sm:mt-0">{action}</div>}
      </div>
      {children}
    </section>
  );
}
