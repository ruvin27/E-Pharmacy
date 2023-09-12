import React from 'react';
import UserLogin from './features/authentication/customer/UserLogin';
import UserRegister from './features/authentication/customer/UserRegister';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Homepage from './features/dashboard/homepage';
import { useAuth } from './features/authentication/AuthContext';
import Cart from './features/orders/Cart';
import Orders from './features/orders/Orders';

const App = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Homepage/> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <UserLogin/> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <UserRegister/> : <Navigate to="/" />}  />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </Router>
  );
};

export default App;
