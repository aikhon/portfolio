import { site } from '../data/site.js'
import { CloseIcon } from './icons.jsx'
import { SidebarNav } from './SidebarNav.jsx'
import { ThemeToggle } from './ThemeToggle.jsx'

// Fixed panel at lg and up; below that it slides in as a drawer.
export function Sidebar({ open, onClose, activeIndex }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-line bg-surface px-6 py-8 transition-transform duration-200 lg:translate-x-0 ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close menu"
        className="absolute right-4 top-4 rounded-md p-2 hover:bg-canvas lg:hidden"
      >
        <CloseIcon />
      </button>

      <div>
        <p className="text-lg font-semibold tracking-tight text-heading">
          {site.name}
        </p>
        <p className="mt-1 text-sm text-muted">{site.tagline}</p>
      </div>

      <SidebarNav activeIndex={activeIndex} onNavigate={onClose} />
      
      <div className="flex-1" />

      <ThemeToggle />
    </aside>
  )
}
