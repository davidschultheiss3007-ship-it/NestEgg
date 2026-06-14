import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './theme/tokens.css'
import './theme/base.css'
import './components/primitives.css'
import './components/features.css'
import './sections/sections.css'
import './App.css'
import { ThemeProvider } from './theme/ThemeProvider'
import { App } from './App'

const root = document.getElementById('root')
if (!root) throw new Error('Root element #root not found')

createRoot(root).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
