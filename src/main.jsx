import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AudioProvider } from './contexts/AudioContext'
import App from './App'
import './index.css'

// Basename detectado na hora: funciona em /, /modulo01/, /modulo01/topico01/, etc.
const getBasename = () => {
  const path = window.location.pathname.replace(/\/index\.html$/i, '')
  return path.endsWith('/') ? path : path + '/'
}
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={getBasename()}>
      <AudioProvider>
        <App />
      </AudioProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
