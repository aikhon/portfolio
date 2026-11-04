import { useEffect, useRef } from 'react'

export function useScrollReveal() {
  const scopeRef = useRef(null)

  useEffect(() => {
    const scope = scopeRef.current
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!scope || preference.matches || !window.IntersectionObserver || !scope.animate) return

    const animations = new Map()
    const reveal = (element) => element.classList.add('is-revealed')
    scope.classList.add('reveal-ready')
    const observer = new window.IntersectionObserver((entries) => {
      for (const { target, isIntersecting } of entries) {
        if (!isIntersecting) continue
        observer.unobserve(target)
        reveal(target)
        if (preference.matches || target.contains(document.activeElement)) continue

        // Animate only on arrival; content stays visible without motion support.
        const animation = target.animate([
          { opacity: 0, transform: 'translateY(10px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ], { duration: 480, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' })
        animations.set(target, animation)
        const release = () => animations.delete(target)
        animation.finished.then(release, release)
      }
    }, { threshold: 0 })

    scope.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element))

    function stop() {
      observer.disconnect()
      scope.querySelectorAll('[data-reveal]').forEach(reveal)
      animations.forEach((animation) => animation.cancel())
      animations.clear()
    }

    function followPreference() {
      if (preference.matches) stop()
    }

    function revealFocusedSection(event) {
      const section = event.target.closest('[data-reveal]')
      if (!section) return
      reveal(section)
      observer.unobserve(section)
      animations.get(section)?.cancel()
      animations.delete(section)
    }

    preference.addEventListener('change', followPreference)
    scope.addEventListener('focusin', revealFocusedSection)
    window.addEventListener('beforeprint', stop)
    return () => {
      stop()
      scope.classList.remove('reveal-ready')
      preference.removeEventListener('change', followPreference)
      scope.removeEventListener('focusin', revealFocusedSection)
      window.removeEventListener('beforeprint', stop)
    }
  }, [])

  return scopeRef
}
