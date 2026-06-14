/** NestEgg wordmark + mark. The mark is a minimal egg-in-nest glyph. */
export function Logo({ small }: { small?: boolean }) {
  return (
    <span className={`logo ${small ? 'logo--small' : ''}`.trim()}>
      <span className="logo__mark" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none">
          <ellipse cx="12" cy="11" rx="6" ry="7.5" fill="currentColor" opacity="0.92" />
          <path
            d="M4 16.5c2.5 2.6 13.5 2.6 16 0"
            stroke="var(--surface)"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.55"
          />
        </svg>
      </span>
      <b>NestEgg</b>
    </span>
  )
}
