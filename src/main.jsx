import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.jsx'

console.log('Hello world!')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/aplikacja-offshore">
    <App />
    </BrowserRouter>
  </StrictMode>,
)
