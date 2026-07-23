import { site } from '../data/site.js'
import { MenuIcon } from './icons.jsx'

// Only visible below lg, where the sidebar is off-canvas.
export function MobileBar({ open, onOpen }) {
  return (
    <div className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-canvas/90 px-4 py-3 backdrop-blur lg:hidden">
      <span className="font-medium text-heading">{site.shortName}</span>
      <button
        type="button"
        onClick={onOpen}
        aria-label="Open menu"
        aria-expanded={open}
        className="rounded-md p-2 hover:bg-surface"
      >
        <MenuIcon />
      </button>
    </div>
  )
}
