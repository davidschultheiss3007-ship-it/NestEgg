import { useEffect, useMemo, useRef, useState } from 'react'
import { SECTIONS } from '../data/sections'
import { useFocusTrap, useScrollLock } from '../lib/hooks'
import { useTheme } from '../theme/ThemeProvider'

export type Command = {
  id: string
  title: string
  hint?: string
  group: string
  run: () => void
}

type PaletteProps = {
  open: boolean
  onClose: () => void
  onNavigate: (id: string) => void
  onPresent: () => void
}

/**
 * Command palette. Keyboard-first and used often → no open/close animation
 * (Emil: frequently-triggered actions should feel instant, not animated).
 */
export function CommandPalette({ open, onClose, onNavigate, onPresent }: PaletteProps) {
  const [query, setQuery] = useState('')
  const [cursor, setCursor] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const trapRef = useFocusTrap<HTMLDivElement>(open)
  const { theme, toggle } = useTheme()

  useScrollLock(open)

  const commands = useMemo<Command[]>(() => {
    const nav: Command[] = SECTIONS.map((s) => ({
      id: `go-${s.id}`,
      title: s.title,
      hint: `Abschnitt ${s.num}`,
      group: 'Springe zu',
      run: () => onNavigate(s.id),
    }))
    const actions: Command[] = [
      {
        id: 'present',
        title: 'Präsentationsmodus starten',
        hint: 'P',
        group: 'Aktionen',
        run: onPresent,
      },
      {
        id: 'theme',
        title: theme === 'dark' ? 'Helles Design' : 'Dunkles Design',
        hint: 'Theme',
        group: 'Aktionen',
        run: toggle,
      },
    ]
    return [...nav, ...actions]
  }, [onNavigate, onPresent, theme, toggle])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter(
      (c) => c.title.toLowerCase().includes(q) || c.group.toLowerCase().includes(q),
    )
  }, [commands, query])

  // Reset state each time it opens; focus the input.
  useEffect(() => {
    if (open) {
      setQuery('')
      setCursor(0)
      // focus after the element is in the DOM
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  useEffect(() => {
    setCursor(0)
  }, [query])

  // Keep the active item scrolled into view.
  useEffect(() => {
    if (!open) return
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx='${cursor}']`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [cursor, open])

  if (!open) return null

  const choose = (cmd: Command | undefined) => {
    if (!cmd) return
    cmd.run()
    onClose()
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setCursor((c) => Math.min(filtered.length - 1, c + 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setCursor((c) => Math.max(0, c - 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      choose(filtered[cursor])
    } else if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    }
  }

  // Group while preserving order.
  const groups: { name: string; items: { cmd: Command; idx: number }[] }[] = []
  filtered.forEach((cmd, idx) => {
    let g = groups.find((x) => x.name === cmd.group)
    if (!g) {
      g = { name: cmd.group, items: [] }
      groups.push(g)
    }
    g.items.push({ cmd, idx })
  })

  return (
    <div className="palette-overlay" onMouseDown={onClose} role="presentation">
      <div
        className="palette"
        role="dialog"
        aria-modal="true"
        aria-label="Befehlspalette"
        ref={trapRef}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="palette__search">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Springe zu Abschnitt oder Aktion…"
            aria-label="Befehlspalette durchsuchen — springe zu Abschnitt oder Aktion"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd>Esc</kbd>
        </div>

        <div className="palette__list" ref={listRef}>
          {filtered.length === 0 && <p className="palette__empty">Kein Treffer für „{query}“.</p>}
          {groups.map((group) => {
            const labelId = `palette-group-${group.name.replace(/\s+/g, '-')}`
            return (
            <div className="palette__group" key={group.name} role="group" aria-labelledby={labelId}>
              <p className="palette__group-label" id={labelId}>
                {group.name}
              </p>
              {group.items.map(({ cmd, idx }) => (
                <button
                  key={cmd.id}
                  data-idx={idx}
                  className="palette__item"
                  data-active={idx === cursor}
                  onMouseEnter={() => setCursor(idx)}
                  onClick={() => choose(cmd)}
                >
                  <span>{cmd.title}</span>
                  {cmd.hint && <small>{cmd.hint}</small>}
                </button>
              ))}
            </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
