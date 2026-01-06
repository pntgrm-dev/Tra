import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Translate from './Translate/Translate.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Translate />
  </StrictMode>,
)
