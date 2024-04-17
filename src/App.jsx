import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Coach_register from './pages/Coach_register';
import Writer_register from './pages/Writer_register';
import Recipes from './pages/Recipes';
import Checkout from './pages/Checkout';
import BMRCalculator from './pages/BMR';
import Coaches from './pages/Coaches';

function App() {      
  return (    
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/Recipes" element={<Recipes />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Coach_register" element={<Coach_register/>} />
          <Route path="/Writer_register" element={<Writer_register/>} />
          <Route path="/Coaches" element={<Coaches/>} />
          <Route path="/BMRCalculator" element={<BMRCalculator/>} />
          <Route path="/Checkout" element={<Checkout />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
