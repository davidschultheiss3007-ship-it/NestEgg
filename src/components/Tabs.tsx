import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { usePrefersReducedMotion } from '../lib/hooks'

export type TabItem = {
  id: string
  label: ReactNode
}

type TabsProps = {
  items: TabItem[]
  active: string
  onChange: (id: string) => void
  vertical?: boolean
  /** Unique id so multiple tab groups don't share a layout indicator. */
  layoutGroup: string
  ariaLabel?: string
}

/**
 * Segmented tabs with a shared sliding indicator (framer-motion layoutId).
 * The indicator morphs between tabs and is interruptible — a spring-backed
 * equivalent of the clip-path color-swap technique. Active text colour swaps
 * via a normal transition under the moving pill.
 */
export function Tabs({
  items,
  active,
  onChange,
  vertical,
  layoutGroup,
  ariaLabel,
}: TabsProps) {
  const reduced = usePrefersReducedMotion()

  return (
    <div
      className={`tabs ${vertical ? 'tabs--vertical' : ''}`.trim()}
      role="tablist"
      aria-label={ariaLabel}
      aria-orientation={vertical ? 'vertical' : 'horizontal'}
    >
      {items.map((item) => {
        const isActive = item.id === active
        return (
          <button
            key={item.id}
            role="tab"
            aria-selected={isActive}
            className="tab"
            data-active={isActive}
            onClick={() => onChange(item.id)}
          >
            {isActive && !reduced && (
              <motion.span
                layoutId={`tab-indicator-${layoutGroup}`}
                className="tab__indicator"
                transition={{ type: 'spring', duration: 0.3, bounce: 0.16 }}
              />
            )}
            <span className="tab__label">{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}
