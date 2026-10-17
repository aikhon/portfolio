import { useEffect, useState } from 'react'

export function useTheme() {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'))

  useEffect(() => {
    const preference = window.matchMedia('(prefers-color-scheme: dark)')
    function followSystem(event) {
      try {
        if (localStorage.getItem('theme')) return
      } catch { /* Theme still works when storage is blocked. */ }
      setIsDark(event.matches)
    }
    function syncTabs(event) {
      if (event.key === 'theme' || event.key === null) {
        setIsDark(event.newValue === 'dark' || (!event.newValue && preference.matches))
      }
    }
    preference.addEventListener('change', followSystem)
    window.addEventListener('storage', syncTabs)
    return () => {
      preference.removeEventListener('change', followSystem)
      window.removeEventListener('storage', syncTabs)
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDark ? '#191a18' : '#faf9f6')
  }, [isDark])

  function toggle() {
    const next = !isDark
    setIsDark(next)
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch { /* Persistence is optional; never block the control. */ }
  }

  return { isDark, toggle }
}
