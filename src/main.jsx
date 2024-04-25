import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51P96uGRsGbsVRyqub8wRpzIp9uNtWr3M8g6oGIl2JfQ6t5fGRuRv43t95PtdABmj9arZqWDsypjBDCB1HSPawr1j009MjGuAzX');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </React.StrictMode>
);
