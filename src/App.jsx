import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Client_register';
import CoachRegister from './pages/auth/Coach_register';
import Recipes from './pages/Recipes';
import BMRCalculator from './pages/BMR';
import Coaches from './pages/Coaches';
import Dashboardcoach from './pages/dashboard/coach/coach';
import Dashboardadmin from './pages/dashboard/admin/admin';
import Favorites from './pages/Favorites';
import PaymentSuccess from './pages/PaymentSuccess';
import Users from './pages/dashboard/admin/Users';
import PaymentCancel from './pages/PaymentCancel';
import { useLocation } from 'react-router-dom';

function AppContent() {
  const location = useLocation();
  const isDashboardCoach = location.pathname === '/dashboardcoach';
  const isDashboardAdmin = location.pathname === '/dashboardadmin';
  const [userRole, setUserRole] = useState(null);

  

 const Routte = ({ element, requiredRole }) => {
    const token = localStorage.getItem('token');

    if (!token) {
    console.log("here");
      if (userRole === requiredRole) {
        return element;
      } else {
        localStorage.removeItem('token'); 
        localStorage.removeItem('role');  
        return <Navigate to="/login"  />;
      }
    } else {
      localStorage.removeItem('token'); 
      localStorage.removeItem('role');  
      return <Navigate to="/login"  />;
    }
  };

  Routte.propTypes = {
    element: PropTypes.element.isRequired,
    requiredRole: PropTypes.string.isRequired
  };
  useEffect(() => {
    
    const storedRole = localStorage.getItem('role');
    setUserRole(storedRole);
  }, []);

  return (
    <>
      {!isDashboardAdmin && !isDashboardCoach && <Navbar/>}
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/client_register" element={<Register />} />
        <Route path="/coach_register" element={<CoachRegister />} />
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/coaches" element={<Coaches />} />
        <Route path="/BMRCalculator" element={<BMRCalculator />} />
        <Route path="/dashboardcoach" element={<Dashboardcoach />} />
        <Route path="/dashboardadmin" element={<Dashboardadmin />}  />
        <Route path="/Favorites" element={<Favorites />} />
        <Route path="/payment-cancel" element={<PaymentCancel />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
      </Routes>
      {!isDashboardAdmin && !isDashboardCoach && <Footer />}
    </>
  );
}

export default function App() {
  
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
