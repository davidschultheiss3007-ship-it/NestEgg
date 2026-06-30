import { useCallback, useEffect, useState } from 'react'
import { SECTIONS } from './data/sections'
import { useScrollSpy } from './lib/useScrollSpy'
import { usePrefersReducedMotion } from './lib/hooks'
import { Cover } from './components/Cover'
import { Nav } from './components/Nav'
import { CommandPalette } from './components/CommandPalette'
import { PresentMode } from './components/PresentMode'
import { Demo } from './sections/Demo'
import { Summary } from './sections/Summary'
import { Problem } from './sections/Problem'
import { Product } from './sections/Product'
import { Market } from './sections/Market'
import { Model } from './sections/Model'
import { Compliance } from './sections/Compliance'
import { Finance } from './sections/Finance'
import { Roadmap } from './sections/Roadmap'
import { Swot } from './sections/Swot'
import { Team } from './sections/Team'
import { Fuehrung } from './sections/Fuehrung'
import { Organisation } from './sections/Organisation'
import { Appendix } from './sections/Appendix'
import { Final } from './sections/Final'

const SECTION_IDS = SECTIONS.map((s) => s.id)

export function App() {
  const activeId = useScrollSpy(SECTION_IDS)
  const reducedMotion = usePrefersReducedMotion()
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [presentOpen, setPresentOpen] = useState(false)

  const scrollTo = useCallback(
    (id: string) => {
      const behavior: ScrollBehavior = reducedMotion ? 'auto' : 'smooth'
      if (id === 'cover') {
        window.scrollTo({ top: 0, behavior })
        history.replaceState(null, '', ' ')
        return
      }
      const el = document.getElementById(id)
      if (!el) return
      el.scrollIntoView({ behavior })
      history.replaceState(null, '', `#${id}`)
    },
    [reducedMotion],
  )

  // Global shortcuts: ⌘K / Ctrl+K palette, P presentation.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((v) => !v)
        return
      }
      // 'P' for presentation — ignore when typing in a field or with modifiers.
      const target = e.target as HTMLElement | null
      const typing =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      if (!typing && !e.metaKey && !e.ctrlKey && !e.altKey && e.key.toLowerCase() === 'p') {
        e.preventDefault()
        setPresentOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // On every (re)load start at the very top — never restore the last-viewed
  // section. Disable the browser's own scroll restoration and strip any hash
  // that in-session navigation left in the URL, then force a non-animated jump
  // to the top ('instant', so it doesn't inherit html { scroll-behavior:
  // smooth } and animate up through the whole deck).
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    if (location.hash) history.replaceState(null, '', location.pathname + location.search)
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  return (
    <>
      <Cover onEnter={scrollTo} />
      <Nav
        activeId={activeId}
        onNavigate={scrollTo}
        onOpenPalette={() => setPaletteOpen(true)}
        onPresent={() => setPresentOpen(true)}
      />

      <main id="app">
        <Demo />
        <Summary />
        <Problem />
        <Product />
        <Market />
        <Model />
        <Compliance />
        <Finance />
        <Roadmap />
        <Swot />
        <Team />
        <Fuehrung />
        <Organisation />
        <Appendix />
        <Final />
      </main>

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onNavigate={scrollTo}
        onPresent={() => {
          setPaletteOpen(false)
          setPresentOpen(true)
        }}
      />
      <PresentMode open={presentOpen} onClose={() => setPresentOpen(false)} startId={activeId} />
    </>
  )
}
