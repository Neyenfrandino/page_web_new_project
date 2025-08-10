import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js';

import { stripePromise } from './services/stripe/stripe';
import { ConectContextProvider } from './context/context_conect_be/context_conect_be';  
import { ContextJsonLoadProvider } from './context/context_json_load/context_json_load';
import { MethodStatePaymentContextProvider } from './context/method_state_payment/method_state_payment.context';

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <ContextJsonLoadProvider>
        <Elements stripe={stripePromise}>
          <ConectContextProvider>
            <MethodStatePaymentContextProvider>
              <App />
            </MethodStatePaymentContextProvider>
          </ConectContextProvider>
        </Elements>
      </ContextJsonLoadProvider>
    </Router>
  </StrictMode>,
)
