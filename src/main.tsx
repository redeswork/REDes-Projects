

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/taskManager Database Auth/taskManagerApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
