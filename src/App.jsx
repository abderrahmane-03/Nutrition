import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Client_register';
import Coach_register from './pages/auth/Coach_register';
import Recipes from './pages/Recipes';
import Checkout from './pages/Checkout';
import BMRCalculator from './pages/BMR';
import Coaches from './pages/Coaches';
import Dashboardcoach from './pages/dashboard/coach';
import Dashboardadmin from './pages/dashboard/admin';
import Favorites from './pages/Favorites';
import ShoppingCart from './components/ShoppingCart'; // Import the ShoppingCart component
import axios from 'axios';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  // Check if the current location is /dashboardcoach
  const isDashboardCoach = location.pathname === '/dashboardcoach';
  const isDashboardadmin = location.pathname === '/dashboardadmin';
  
 

  const [cart, setCart] = useState([]); // State to manage the shopping cart

  // Function to create order and initiate PayPal checkout
  const createOrder = async () => {
    try {
      const response = await axios.post('/create_order', { intent: 'capture' });
      return response.data.order_id; // Return order ID
    } catch (error) {
      console.error('Error creating order:', error);
      throw error; // Rethrow the error
    }
  };

  // Function to complete order after PayPal approval
  const completeOrder = async (orderId) => {
    try {
      const response = await axios.post('/complete_order', { intent: 'capture', order_id: orderId });
      console.log('Order completed successfully:', response.data);
      // Handle order completion, e.g., show success message, update UI, etc.
    } catch (error) {
      console.error('Error completing order:', error);
      // Handle error, e.g., show error message, retry payment, etc.
    }
  };
 if (isDashboardCoach) {
    return <Dashboardcoach />;
  }
  
  if (isDashboardadmin) {
    return <Dashboardadmin />;
  }

  return (
    <>
      {!isDashboardadmin && !isDashboardCoach && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/client_register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/coach_register" element={<Coach_register/>}/>
        <Route path="/coaches" element={<Coaches/>} />
        <Route path="/BMRCalculator" element={<BMRCalculator/>} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/Favorites" element={<Favorites />} />
        <Route
          path="/cart"
          element={<ShoppingCart cart={cart} setCart={setCart} createOrder={createOrder} completeOrder={completeOrder} />}
        />
      </Routes>
      {!isDashboardadmin && !isDashboardCoach && <Footer />}
    </>
  );
}

export default App;
