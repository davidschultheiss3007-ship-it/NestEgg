import type { ReactNode } from 'react'
import { useInView } from '../lib/hooks'

type RevealProps = {
  children: ReactNode
  /** Stagger delay in ms (kept short — 30–80ms between items). */
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'article' | 'li' | 'header'
}

/**
 * Reveal-on-scroll wrapper. Opacity + small translate, ease-out (compositor-only).
 * Fires once. Reduced-motion users get the content immediately (CSS handles it).
 */
export function Reveal({ children, delay = 0, className = '', as = 'div' }: RevealProps) {
  const [ref, shown] = useInView<HTMLDivElement>()
  const Tag = as as 'div'

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`.trim()}
      data-shown={shown}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  )
}
