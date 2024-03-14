import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './Context/context.tsx'
// @ts-ignore
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
