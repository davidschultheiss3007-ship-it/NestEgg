import { useTheme } from '../theme/ThemeProvider'

/**
 * Theme toggle. No entrance/exit animation on the icons themselves beyond a
 * quick crossfade — it's a frequently-used control, so it stays instant and
 * unfussy. The track has a subtle thumb slide.
 */
export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Zu hellem Design wechseln' : 'Zu dunklem Design wechseln'}
    >
      <span className="theme-toggle__track" data-dark={isDark}>
        <span className="theme-toggle__thumb">
          <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
            {isDark ? (
              <path
                d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"
                fill="currentColor"
              />
            ) : (
              <g fill="currentColor">
                <circle cx="12" cy="12" r="4.2" />
                <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <line x1="12" y1="2.5" x2="12" y2="5" />
                  <line x1="12" y1="19" x2="12" y2="21.5" />
                  <line x1="2.5" y1="12" x2="5" y2="12" />
                  <line x1="19" y1="12" x2="21.5" y2="12" />
                  <line x1="5.1" y1="5.1" x2="6.9" y2="6.9" />
                  <line x1="17.1" y1="17.1" x2="18.9" y2="18.9" />
                  <line x1="5.1" y1="18.9" x2="6.9" y2="17.1" />
                  <line x1="17.1" y1="6.9" x2="18.9" y2="5.1" />
                </g>
              </g>
            )}
          </svg>
        </span>
      </span>
    </button>
  )
}
