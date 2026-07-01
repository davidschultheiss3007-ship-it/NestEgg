/** NestEgg wordmark + mark: a nest cradling an egg, breaking into a growth arrow. */
export function Logo({ small }: { small?: boolean }) {
  return (
    <span className={`logo ${small ? 'logo--small' : ''}`.trim()}>
      <span className="logo__mark" aria-hidden="true">
        <svg viewBox="0 0 100 100" width="100%" height="100%" fill="none">
          <g stroke="var(--text)" strokeWidth="4.2" strokeLinecap="round">
            <path d="M10 68c12 9 26 12 39 8s19-10 27-18" />
            <path d="M9 75c17 9 45 10 63-6" />
            <path d="M16 81c15 6 38 6 54-5" />
            <path d="M70 60c-9 12-28 22-46 22-8 0-15-2-21-5" />
          </g>
          <path
            d="M62.68 55.36 A27 27 0 1 1 67.37 28.77"
            stroke="var(--text)"
            strokeWidth="6.2"
            strokeLinecap="round"
          />
          <path
            d="M42 65C53 65 60 51 60 39 60 29 53 21 42 21 31 21 24 29 24 39 24 51 31 65 42 65Z"
            stroke="var(--viz-2)"
            strokeWidth="5.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g stroke="var(--accent)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M64 55 84 24" />
            <path d="M68 23 86 23 86 41" />
          </g>
        </svg>
      </span>
      <b>
        Nest<span className="logo__egg">Egg</span>
      </b>
    </span>
  )
}
