import React from 'react';
import { Link } from 'react-router-dom';

function ShoppingCart({ setOpenCart }) {
  const products = []; // State to manage products
  const total = 0; // State to manage total

  // Function to handle PayPal checkout
  const handlePayPalCheckout = async () => {
    try {
      // Step 1: Request to create an order
      const response = await fetch('/createOrder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
        body: JSON.stringify(/* Include any necessary data for creating the order */),
      });
      const data = await response.json();

      // Step 2: Extract orderId from response
      const { orderId } = data;
      setOrderId(orderId);

      // Step 3: Redirect to PayPal with orderId
      window.location.href = `/paypal/checkout?orderId=${orderId}`;
    } catch (error) {
      console.error('Error creating order:', error);
      // Handle error
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 flex flex-col w-80 bg-white shadow-lg transition-transform duration-300">
      <div className="flex justify-between items-center px-4 py-2 border-b">
        <h3 className="text-lg font-medium text-gray-900">Shopping Cart</h3>
        <button
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={() => setOpenCart(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-2">
        {/* Render products */}
      </div>
      <div className="px-4 py-2 border-t">
        <div className="flex justify-between">
          <p className="text-lg font-medium text-gray-900">Subtotal</p>
          <p className="text-lg font-medium text-gray-900">$262.00</p>
        </div>
        <div className="mt-2 text-sm text-gray-500">
          <p>Shipping and taxes calculated at checkout.</p>
        </div>
        <div className="mt-6">
          <Link
            onClick={() => setOpenCart(false)}
            to=""
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Pay with PayPal
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
