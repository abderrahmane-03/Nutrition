import React, { useState } from 'react';
import loading from '../assets/loading.gif';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const [loadingVisible, setLoadingVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't loaded yet
      return;
    }

    const clientSecret = "sk_test_51P96uGRsGbsVRyquYCUoPfCE4a4jXhnkgNfNwFFL2NOymgaeNV1EEY0nuCt23aLIOdCF8Hsh89qP8CgR2e1woXO900kmr3C9Jq";

    // Handle payment submission
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(PaymentElement),
        billing_details: {
          // Include relevant billing details here
        },
      },
    });

    if (result.error) {
      // Payment failed
      console.error(result.error.message);
    } else {
      // Payment successful
      console.log('Payment successful');
    }
  };

  const handlePayNowClick = () => {
    setLoadingVisible(true);

    // Simulating payment processing
    setTimeout(() => {
      setLoadingVisible(false);
      setSuccessVisible(true);

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccessVisible(false);
      }, 3000);
    }, 2000);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button onClick={handlePayNowClick}>PAY NOW</button>
      </form>

      {loadingVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <img src={loading} alt="loading" className="fixed inset-0 m-auto w-52" />
        </div>
      )}

      {successVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-5 rounded-lg text-center">
            <p className="text-green-500 font-semibold">Payment Successful</p>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutForm;
