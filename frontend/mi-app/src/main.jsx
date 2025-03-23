import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
// import { Elements } from '@stripe/react-stripe-js';

// import { stripePromise } from './utils/stripe/stripe';

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      {/* <Elements stripe={stripePromise}> */}
        <App />
      {/* </Elements> */}
    </Router>
  </StrictMode>,
)
