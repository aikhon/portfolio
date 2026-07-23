import { useLayoutEffect, useRef, useState } from 'react'
import { navItems } from '../data/site.js'
import { socials } from '../data/socials.js'

// The nav links plus the bar that slides to whichever section you're in.
export function SidebarNav({ activeIndex, onNavigate }) {
  const linkRefs = useRef([])
  const [bar, setBar] = useState(null)

  // useLayoutEffect (not useEffect) so the bar is placed before the browser
  // paints — otherwise it visibly jumps from 0 on first render.
  useLayoutEffect(() => {
    function place() {
      const el = linkRefs.current[activeIndex]
      if (el) setBar({ top: el.offsetTop, height: el.offsetHeight })
    }

    place()
    // Link geometry shifts when the sidebar reflows.
    window.addEventListener('resize', place)
    return () => window.removeEventListener('resize', place)
  }, [activeIndex])

  return (
    <nav className="mt-10 flex flex-col gap-5" aria-label="Main">
      {/* relative: the indicator is positioned against this list */}
      <ul className="relative space-y-1 text-sm">
        <span
          aria-hidden="true"
          className="absolute left-0 w-0.5 rounded-full bg-accent transition-all duration-300 ease-out motion-reduce:transition-none"
          style={{
            top: bar?.top ?? 0,
            height: bar?.height ?? 0,
            opacity: bar ? 1 : 0,
          }}
        />

        {navItems.map((item, i) => (
          <li key={item.id}>
            <a
              ref={(el) => {
                linkRefs.current[i] = el
              }}
              href={`#${item.id}`}
              onClick={onNavigate}
              aria-current={i === activeIndex ? 'true' : undefined}
              className={`block rounded-md px-3 py-2 transition-colors hover:bg-canvas hover:text-heading ${
                i === activeIndex ? 'font-medium text-heading' : ''
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <ul className="flex text-sm">
        {socials.map(({ label, url, Icon }) => (
          <li key={label}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              className="flex items-center gap-1 rounded-md px-2 py-1.5 text-muted transition-colors hover:text-heading"
            >
              <Icon className="size-4.5 shrink-0" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
