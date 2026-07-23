import { useEffect, useRef, useState } from 'react'

// The initial .dark class is set by the inline script in index.html so the page
// doesn't flash the wrong theme before React boots. This hook reads that as its
// starting value, then keeps the class and localStorage in sync from then on.
export function useTheme() {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains('dark'),
  )
  const isFirstRun = useRef(true)

  useEffect(() => {
    // Skip the first run: writing on mount would persist the OS preference as
    // an explicit choice, so the site would stop following the system theme.
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    }
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  return { isDark, toggle: () => setIsDark((v) => !v) }
}
