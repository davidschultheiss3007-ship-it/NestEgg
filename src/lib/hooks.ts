import { useEffect, useRef, useState } from 'react'

/** True when the user prefers reduced motion. Reactive to changes. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}

/**
 * Reveal-on-scroll. Returns a ref + `shown` flag that flips true once the
 * element scrolls into view (fires once). Margin biases it slightly early.
 */
export function useInView<T extends HTMLElement>(
  options: { once?: boolean; margin?: string; amount?: number } = {},
): [React.RefObject<T | null>, boolean] {
  const { once = true, margin = '0px 0px -12% 0px', amount = 0.15 } = options
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true)
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            setInView(false)
          }
        }
      },
      { rootMargin: margin, threshold: amount },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [once, margin, amount])

  return [ref, inView]
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Traps Tab focus within `ref` while `active`. Restores focus to the
 * previously-focused element on deactivate. Use for modal overlays.
 */
export function useFocusTrap<T extends HTMLElement>(
  active: boolean,
): React.RefObject<T | null> {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!active) return
    const container = ref.current
    if (!container) return

    const previouslyFocused = document.activeElement as HTMLElement | null

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const focusable = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null || el === document.activeElement)
      if (!focusable.length) {
        e.preventDefault()
        return
      }
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const activeEl = document.activeElement

      if (e.shiftKey) {
        if (activeEl === first || !container.contains(activeEl)) {
          e.preventDefault()
          last.focus()
        }
      } else if (activeEl === last || !container.contains(activeEl)) {
        e.preventDefault()
        first.focus()
      }
    }

    container.addEventListener('keydown', onKeyDown)
    return () => {
      container.removeEventListener('keydown', onKeyDown)
      // Restore focus if the trigger still exists in the DOM.
      if (previouslyFocused && document.contains(previouslyFocused)) {
        previouslyFocused.focus()
      }
    }
  }, [active])

  return ref
}

/** Locks body scroll while `locked` is true (for overlays/palette). */
export function useScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return
    // Compensate for the scrollbar that `overflow: hidden` removes, otherwise
    // the page + sticky nav jump right by the gutter width when an overlay
    // opens. On overlay-scrollbar platforms (macOS/touch) the width is 0, so
    // this is a no-op there.
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    const originalOverflow = document.body.style.overflow
    const originalPaddingRight = document.body.style.paddingRight
    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`
    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
    }
  }, [locked])
}

/**
 * Animated number that eases toward `target`. Used for KPI counters.
 * Uses an ease-out curve; respects reduced motion (snaps instantly).
 */
export function useCountUp(target: number, durationMs = 650): number {
  const reduced = usePrefersReducedMotion()
  const [value, setValue] = useState(target)
  const fromRef = useRef(target)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    if (reduced) {
      setValue(target)
      fromRef.current = target
      return
    }

    const from = fromRef.current
    const delta = target - from
    if (delta === 0) return

    startRef.current = null
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now
      const elapsed = now - startRef.current
      const t = Math.min(1, elapsed / durationMs)
      setValue(from + delta * easeOut(t))
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        fromRef.current = target
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      fromRef.current = target
    }
  }, [target, durationMs, reduced])

  return value
}
