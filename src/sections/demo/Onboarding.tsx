import { Button } from '../../components/Primitives'
import { CONSENT_NOTE, GOAL_LABELS, GOAL_ORDER, PERSONAS } from './demoData'
import { usePhone, type GoalKey } from './phoneStore'

/**
 * Cold-Open-Overlay über dem App-Shell. Persona wählen, Ziel anlegen,
 * Einwilligung setzen — dann „Los geht's". Liegt visuell über den Screens,
 * unter der Dynamic-Island; blendet sich beim Start heraus.
 */
export function Onboarding() {
  const { state, dispatch } = usePhone()

  return (
    <div className="onboard">
      <header className="onboard__brand">
        <b>NestEgg</b>
        <span>Sparcoach</span>
      </header>
      <p className="onboard__intro">Lernen wir dich kennen.</p>

      {/* Persona */}
      <div className="onboard__section">
        <small className="onboard__label">Wer bist du?</small>
        <div className="onboard__personas">
          {PERSONAS.map((p) => (
            <button
              key={p.key}
              className="persona-card"
              data-active={state.persona === p.key}
              onClick={() => dispatch({ type: 'SET_PERSONA', persona: p.key })}
            >
              <span className="persona-card__avatar">{p.initial}</span>
              <b>{p.name}</b>
              <small>
                {p.age} · {p.role}
              </small>
            </button>
          ))}
        </div>
      </div>

      {/* Ziel */}
      <div className="onboard__section">
        <small className="onboard__label">Erstes Ziel</small>
        <div className="onboard__goals">
          {GOAL_ORDER.map((k) => {
            const owned = !!state.goals[k]
            const locked = k === 'altersvorsorge'
            const active = state.activeGoal === k && owned
            return (
              <button
                key={k}
                className="onboard-chip"
                data-active={active}
                data-locked={locked}
                disabled={locked}
                onClick={() =>
                  owned
                    ? dispatch({ type: 'SET_ACTIVE_GOAL', key: k as GoalKey })
                    : dispatch({ type: 'NEW_GOAL', key: k as GoalKey })
                }
              >
                {GOAL_LABELS[k]}
                {locked && <span aria-hidden="true"> 🔒</span>}
              </button>
            )
          })}
        </div>
      </div>

      {/* Einwilligung */}
      <div className="onboard__consent">
        <div className="onboard__consent-text">
          <b>Kontodaten verbinden</b>
          <small>{CONSENT_NOTE}</small>
        </div>
        <button
          className="toggle"
          role="switch"
          aria-checked={state.consent}
          aria-label="Kontodaten freigeben"
          data-on={state.consent}
          onClick={() => dispatch({ type: 'TOGGLE_CONSENT' })}
        >
          <span className="toggle__thumb" />
        </button>
      </div>

      <div className="onboard__cta">
        <Button
          variant="primary"
          full
          disabled={!state.consent}
          onClick={() => dispatch({ type: 'FINISH_ONBOARDING' })}
        >
          Los geht’s
        </Button>
        {!state.consent && (
          <small className="onboard__hint">Einwilligung nötig, um Sparpotenzial zu sehen</small>
        )}
      </div>
    </div>
  )
}
