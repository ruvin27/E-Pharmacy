import React from 'react';
import ReactDOM from 'react-dom/client';
import UserLogin from './features/authentication/customer/UserLogin';
import UserRegister from './features/authentication/customer/UserRegister';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './features/dashboard/homepage';
import { AuthProvider } from './features/authentication/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <Router>
        <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
      </Routes>
  </Router>
  </AuthProvider>
);
