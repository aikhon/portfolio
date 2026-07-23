import { useTheme } from '../hooks/useTheme.js'
import { MoonIcon, SunIcon } from './icons.jsx'

export function ThemeToggle() {
  const { isDark, toggle } = useTheme()

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="mt-6 flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-canvas hover:text-heading"
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
      {isDark ? 'Light' : 'Dark'}
    </button>
  )
}
