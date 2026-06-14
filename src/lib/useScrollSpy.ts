import { useEffect, useState } from 'react'

/**
 * Tracks which section is currently most prominent in the viewport.
 * Mirrors the legacy IntersectionObserver scroll-spy behaviour.
 */
export function useScrollSpy(ids: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (!elements.length) return

    let current: string | null = null

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (!visible.length) return
        const best = visible.reduce((a, b) =>
          b.intersectionRatio > a.intersectionRatio ? b : a,
        )
        const next = best.target.id
        if (next !== current) {
          current = next
          setActiveId(next)
        }
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0.2, 0.4, 0.6, 0.8] },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return activeId
}
