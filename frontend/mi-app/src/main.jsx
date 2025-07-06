import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js';

import { stripePromise } from './utils/stripe/stripe';
import { ConectContextProvider } from './context/context_conect_be/context_conect_be';  
import { ModeDarkContextProvider } from './context/mode_dark/modeDark';
import { ContextJsonLoadProvider } from './context/context_json_load/context_json_load';

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <ContextJsonLoadProvider>
        <Elements stripe={stripePromise}>
          <ConectContextProvider>
            <ModeDarkContextProvider> 
              <App />
            </ModeDarkContextProvider>
          </ConectContextProvider>
        </Elements>
      </ContextJsonLoadProvider>
    </Router>
  </StrictMode>,
)
