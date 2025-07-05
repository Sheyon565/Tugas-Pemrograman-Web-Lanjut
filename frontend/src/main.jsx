import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async';
import './index.css'
import App from './App.jsx'
import ThemeProvider from './utils/ThemeContext';

createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StrictMode>
  </HelmetProvider>
)
