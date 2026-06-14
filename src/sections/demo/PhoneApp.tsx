import { useEffect, useReducer, useRef, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '../../components/Primitives'
import { useFocusTrap, usePrefersReducedMotion, useScrollLock } from '../../lib/hooks'
import { ETF_SHEET, PERSONA_SEEDS } from './demoData'
import {
  PhoneContext,
  phoneReducer,
  usePhone,
  type Screen,
} from './phoneStore'
import { HeuteScreen } from './HeuteScreen'
import { CoachScreen } from './CoachScreen'
import { ZieleScreen } from './ZieleScreen'
import { ReportScreen } from './ReportScreen'
import { Onboarding } from './Onboarding'

/* ---------------- Provider ---------------- */

export function PhoneProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(phoneReducer, undefined, () => PERSONA_SEEDS.lena())
  return <PhoneContext.Provider value={{ state, dispatch }}>{children}</PhoneContext.Provider>
}

/* ---------------- Tab-Bar ---------------- */

type TabDef = { id: Screen; label: string; icon: ReactNode }

const TabIcon = {
  heute: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V20h14V9.5" />
    </svg>
  ),
  coach: (
    <svg viewBox="0 0 24 24" width="20" height="20">
      <path d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6Z" fill="currentColor" />
    </svg>
  ),
  ziele: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  ),
  report: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <rect x="4" y="13" width="3.6" height="6" rx="1.2" />
      <rect x="10.2" y="8" width="3.6" height="11" rx="1.2" />
      <rect x="16.4" y="11" width="3.6" height="8" rx="1.2" />
    </svg>
  ),
}

const TABS: TabDef[] = [
  { id: 'heute', label: 'Heute', icon: TabIcon.heute },
  { id: 'coach', label: 'Coach', icon: TabIcon.coach },
  { id: 'ziele', label: 'Ziele', icon: TabIcon.ziele },
  { id: 'report', label: 'Report', icon: TabIcon.report },
]

function TabBar() {
  const { state, dispatch } = usePhone()
  const reduced = usePrefersReducedMotion()
  return (
    <nav className="phone-tabbar" role="tablist" aria-label="App-Navigation">
      {TABS.map((tab) => {
        const active = state.screen === tab.id
        const badge = tab.id === 'coach' && state.consent && state.pendingImpulse != null
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active}
            className="phone-tab"
            data-active={active}
            onClick={() => dispatch({ type: 'SET_SCREEN', screen: tab.id })}
          >
            {active && (
              <motion.span
                className="phone-tab__pill"
                layoutId={reduced ? undefined : 'phone-tab-indicator'}
                initial={false}
                transition={{ type: 'spring', duration: 0.3, bounce: 0.16 }}
              />
            )}
            <span className="phone-tab__icon">
              {tab.icon}
              {badge && (
                <span className="phone-tab__badge" aria-hidden="true" />
              )}
            </span>
            <span className="phone-tab__label">{tab.label}</span>
            {badge && <span className="sr-only">neuer Sparimpuls</span>}
          </button>
        )
      })}
    </nav>
  )
}

/* ---------------- Status-Bar ---------------- */

function StatusBar() {
  const { dispatch } = usePhone()
  const timer = useRef<number | null>(null)

  // Long-Press (600ms) auf der Status-Bar → Demo zurücksetzen.
  const start = () => {
    timer.current = window.setTimeout(() => dispatch({ type: 'RESET_DEMO' }), 600)
  }
  const cancel = () => {
    if (timer.current !== null) {
      clearTimeout(timer.current)
      timer.current = null
    }
  }

  return (
    <div
      className="phone-statusbar"
      onPointerDown={start}
      onPointerUp={cancel}
      onPointerLeave={cancel}
    >
      <span className="phone-statusbar__time">9:41</span>
      <span className="phone-statusbar__island" aria-hidden="true" />
      <span className="phone-statusbar__sys" aria-hidden="true">
        {/* Signal */}
        <svg viewBox="0 0 18 12" width="17" height="11" fill="currentColor">
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5" width="3" height="7" rx="1" />
          <rect x="10" y="2.5" width="3" height="9.5" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" opacity="0.4" />
        </svg>
        {/* WLAN */}
        <svg viewBox="0 0 16 12" width="15" height="11" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path d="M2 4.5a9 9 0 0 1 12 0" />
          <path d="M4.5 7a5.5 5.5 0 0 1 7 0" />
          <circle cx="8" cy="10" r="0.9" fill="currentColor" stroke="none" />
        </svg>
        {/* Akku */}
        <svg viewBox="0 0 26 12" width="24" height="11" fill="none">
          <rect x="0.5" y="0.5" width="22" height="11" rx="3" stroke="currentColor" opacity="0.4" />
          <rect x="2.5" y="2.5" width="16" height="7" rx="1.5" fill="currentColor" />
          <rect x="24" y="3.5" width="2" height="5" rx="1" fill="currentColor" opacity="0.4" />
        </svg>
      </span>
    </div>
  )
}

/* ---------------- ETF-Sheet ---------------- */

function EtfSheet() {
  const { state, dispatch } = usePhone()
  const reduced = usePrefersReducedMotion()
  const open = state.sheet === 'etf'
  const trapRef = useFocusTrap<HTMLDivElement>(open)
  useScrollLock(open)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dispatch({ type: 'CLOSE_SHEET' })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, dispatch])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="phone-sheet-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => dispatch({ type: 'CLOSE_SHEET' })}
        >
          <motion.div
            ref={trapRef}
            className="phone-sheet"
            role="dialog"
            aria-modal="true"
            aria-label={ETF_SHEET.title}
            initial={reduced ? { opacity: 0 } : { y: '100%' }}
            animate={reduced ? { opacity: 1 } : { y: 0 }}
            exit={reduced ? { opacity: 0 } : { y: '100%' }}
            transition={{ duration: 0.34, ease: [0.32, 0.72, 0, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="phone-sheet__grip" aria-hidden="true" />
            <span className="phone-sheet__lock" aria-hidden="true">🔒</span>
            <h4>{ETF_SHEET.title}</h4>
            <p>{ETF_SHEET.body}</p>
            <Button variant="primary" full onClick={() => dispatch({ type: 'CLOSE_SHEET' })}>
              {ETF_SHEET.cta}
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ---------------- Screen-Router ---------------- */

const SCREENS: Record<Screen, ReactNode> = {
  heute: <HeuteScreen />,
  coach: <CoachScreen />,
  ziele: <ZieleScreen />,
  report: <ReportScreen />,
}

function ScreenRouter() {
  const { state } = usePhone()
  const reduced = usePrefersReducedMotion()
  const label = TABS.find((t) => t.id === state.screen)?.label ?? state.screen
  return (
    <div className="phone-screen" role="tabpanel" aria-label={label}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={state.screen}
          className="phone-view"
          initial={reduced ? false : { opacity: 0, x: 14 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, x: -14 }}
          transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }}
        >
          {SCREENS[state.screen]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/* ---------------- Shell ---------------- */

function PhoneShell() {
  const { state, dispatch } = usePhone()
  const reduced = usePrefersReducedMotion()

  // „frisch gespart"-Flash global nach ~1,4 s abräumen — unabhängig davon, ob
  // gerade die Ziele-Seite gemountet ist (Bestätigen kann auch außerhalb passieren).
  useEffect(() => {
    if (!state.fundedGoal) return
    const t = setTimeout(() => dispatch({ type: 'CLEAR_FLASH' }), 1400)
    return () => clearTimeout(t)
  }, [state.fundedGoal, dispatch])

  return (
    <div className="phone-shell">
      <StatusBar />

      <ScreenRouter />

      <motion.div
        className="phone-tabbar-wrap"
        initial={false}
        animate={{ y: state.onboarded ? 0 : '110%' }}
        transition={reduced ? { duration: 0 } : { duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
      >
        <TabBar />
      </motion.div>

      {/* Onboarding-Overlay */}
      <AnimatePresence>
        {!state.onboarded && (
          <motion.div
            className="phone-onboarding"
            initial={false}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <Onboarding />
          </motion.div>
        )}
      </AnimatePresence>

      <EtfSheet />

      {/* Diskrete Reset-Schaltfläche (Nicht-Touch-Fallback zum Long-Press) */}
      {state.onboarded && (
        <button
          className="phone-reset"
          onClick={() => dispatch({ type: 'RESET_DEMO' })}
          aria-label="Demo neu starten"
          title="Demo neu starten"
        >
          ↻
        </button>
      )}
    </div>
  )
}

export function PhoneApp() {
  return (
    <PhoneProvider>
      <PhoneShell />
    </PhoneProvider>
  )
}
