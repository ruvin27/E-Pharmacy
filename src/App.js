import React from 'react';
import UserLogin from './features/authentication/customer/UserLogin';
import UserRegister from './features/authentication/customer/UserRegister';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Homepage from './features/dashboard/homepage';
import { useAuth } from './features/authentication/AuthContext';
import Cart from './features/orders/Cart';
import Orders from './features/orders/Orders';
import Profile from "./features/Profile";
import AdminHomepage from './features/admin/AdminHomepage';
import AddProduct from './features/admin/AddProduct';
import Checkout from './features/orders/Checkout';
import OrderDetails from './features/orders/OrderDetails';

const App = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage/>} exact={true} />
        <Route path="/cart" element={<Cart/>} exact={true}/>

        <Route path="/login" element={!user ? <UserLogin/> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <UserRegister/> : <Navigate to="/" />}  />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element ={<Profile/>}/>
        <Route path="/admin" element ={<AdminHomepage/>}/>
        <Route path="/addproduct" element ={<AddProduct/>}/>
        <Route path="/checkout" element ={<Checkout/>}/>
        <Route path="/orderdetails" element ={<OrderDetails/>}/>
      </Routes>
    </Router>
  );
};

export default App;
