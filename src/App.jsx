
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Client_register';
import Coach_register from './pages/auth/Coach_register';
import Recipes from './pages/Recipes';
import BMRCalculator from './pages/BMR';
import Coaches from './pages/Coaches';
import Dashboardcoach from './pages/dashboard/coach';
import Dashboardadmin from './pages/dashboard/admin';
import Favorites from './pages/Favorites';
import Paymentsuccess from './pages/PaymentSuccess';

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();



  const isDashboardCoach = location.pathname === '/dashboardcoach';
  const isDashboardadmin = location.pathname === '/dashboardadmin';

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
        <Route path="/coach_register" element={<Coach_register />} />
        <Route path="/coaches" element={<Coaches />} />
        <Route path="/BMRCalculator" element={<BMRCalculator />} />
        <Route path="/Favorites" element={<Favorites />} />
        <Route path="/payment-success" element={<Paymentsuccess />} />
        
      </Routes>
      {!isDashboardadmin && !isDashboardCoach && <Footer />}
    </>
  );
}
