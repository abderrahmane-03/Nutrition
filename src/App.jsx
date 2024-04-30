import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'; // Added 'Navigate'

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Client_register';
import CoachRegister from './pages/auth/Coach_register';
import Recipes from './pages/Recipes';
import BMRCalculator from './pages/BMR';
import Coaches from './pages/Coaches';
import Dashboardcoach from './pages/dashboard/coach';
import Dashboardadmin from './pages/dashboard/admin';
import Favorites from './pages/Favorites';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancel from './pages/PaymentCancel';
import { jwtDecode } from 'jwt-decode';


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
  const isDashboardAdmin = location.pathname === '/dashboardadmin';
  const user = getUser(); // Implement this function

  return (
    <>
      {!isDashboardAdmin && !isDashboardCoach && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/client_register" element={<Register />} />
        <Route path="/coach_register" element={<CoachRegister />} />
        <Route path="/" element={<Home />} />
        <Route path="/coaches" element={<Coaches />} />
        <Route path="/BMRCalculator" element={<BMRCalculator />} />
        <Route path="/dashboardcoach" element={<Dashboardcoach />} requiredRole="coach" user={user} />
        <Route path="/dashboardadmin" element={<Dashboardadmin />} requiredRole="admin" user={user} />
        <Route path="/Favorites" element={<Favorites />} requiredRole="client" user={user} />
        <Route path="/payment-cancel" element={<PaymentCancel />} requiredRole="client" user={user} />
        <Route path="/payment-success" element={<PaymentSuccess />} requiredRole="client" user={user} />
      </Routes>
      {!isDashboardAdmin && !isDashboardCoach && <Footer />}
    </>
  );
}

// function PrivateRoute({ element, requiredRole, user }) {
//   if (!user) {
//     // Redirect to login if user not logged in
//     return <Navigate to="/login" />;
//   }

//   if (user.role === requiredRole) {
//     // Render the requested element if user has the required role
//     return element;
//   }

//   // Redirect to unauthorized page or display access denied message
//   return <Navigate to="/unauthorized" />;
// }

// PrivateRoute.propTypes = {
//   element: PropTypes.element.isRequired, // Prop validation for 'element'
//   requiredRole: PropTypes.string.isRequired,
//   user: PropTypes.shape({
//     role: PropTypes.string.isRequired // Prop validation for 'user.role'
//   })
// };

function getUser() {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const decodedToken = jwtDecode(token); // Using decode function instead of jwt_decode
      const role = decodedToken.role;
      return { role };
    } catch (error) {
      console.error('Error decoding token:', error);
      localStorage.removeItem('token');
    }
  }

  return null;
}
