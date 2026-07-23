import { useEffect, useState } from 'react'

export function useScrollSpy(ids) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    function update() {
      // A section counts as current once it crosses a line 35% down the viewport.
      const marker = window.scrollY + window.innerHeight * 0.35
      let index = 0

      ids.forEach((id, i) => {
        const section = document.getElementById(id)
        if (!section) return
        const top = section.getBoundingClientRect().top + window.scrollY
        if (top <= marker) index = i
      })

      // The last section is often too short to reach the marker line, so once
      // we're at the bottom of the page it wins outright.
      const atBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2
      if (atBottom) index = ids.length - 1

      setActiveIndex(index)
    }

    // Coalesce scroll events into one update per frame.
    let ticking = false
    function onScroll() {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        update()
        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids])

  return activeIndex
}
