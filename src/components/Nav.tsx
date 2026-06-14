import { useEffect, useRef } from 'react'
import { SECTIONS } from '../data/sections'
import { usePrefersReducedMotion } from '../lib/hooks'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'

type NavProps = {
  activeId: string | null
  onNavigate: (id: string) => void
  onOpenPalette: () => void
  onPresent: () => void
}

export function Nav({ activeId, onNavigate, onOpenPalette, onPresent }: NavProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  // Keep the active link in view within the horizontal scroller.
  useEffect(() => {
    if (!activeId || !scrollerRef.current) return
    const link = scrollerRef.current.querySelector<HTMLElement>(`[data-link='${activeId}']`)
    link?.scrollIntoView({
      inline: 'center',
      block: 'nearest',
      behavior: reducedMotion ? 'auto' : 'smooth',
    })
  }, [activeId, reducedMotion])

  // Vertical wheel → horizontal scroll on the nav list.
  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return
      el.scrollLeft += e.deltaY
      e.preventDefault()
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  return (
    <header className="nav">
      <button className="nav__brand" onClick={() => onNavigate('cover')} aria-label="Zum Anfang">
        <Logo small />
      </button>

      <div className="nav__scroller" ref={scrollerRef}>
        <nav aria-label="Abschnitte">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              data-link={s.id}
              className="nav__link"
              data-active={activeId === s.id}
              onClick={() => onNavigate(s.id)}
            >
              {s.nav}
            </button>
          ))}
        </nav>
      </div>

      <div className="nav__actions">
        <button className="nav__cmd" onClick={onOpenPalette} aria-label="Befehlspalette öffnen">
          <span>Suchen</span>
          <kbd>⌘K</kbd>
        </button>
        <button className="btn btn--icon nav__present" onClick={onPresent} aria-label="Präsentationsmodus" title="Präsentationsmodus (P)">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="4" width="18" height="13" rx="2" />
            <path d="M9 21h6M12 17v4" />
          </svg>
        </button>
        <ThemeToggle />
      </div>
    </header>
  )
}
