import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './AppRevamp'
import './index.css'
import { LocaleProvider } from './providers/LocaleProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LocaleProvider><App /></LocaleProvider>
  </React.StrictMode>,
)
