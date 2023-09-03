import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserLogin from './features/authentication/customer/UserLogin';
import UserRegister from './features/authentication/customer/UserRegister';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <Routes>
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
      </Routes>
  </Router>
);
