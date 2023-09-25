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
import Loader from './features/Loader';
import NoAccess from './features/authentication/admin/NoAccess';

const App = () => {
  const { user, isLoading } = useAuth();
  console.log(user);

  if (isLoading) {
    return <Loader/>;
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage/>} exact={true} />
        <Route path="/cart" element={user ? <Cart/> : <Navigate to="/login" />}/>

        <Route path="/login" element={!user ? <UserLogin/> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <UserRegister/> : <Navigate to="/" />}  />
        <Route path="/orders" element={user ? <Orders/> : <Navigate to="/login" />} />
        <Route path="/profile" element ={user ? <Profile/> : <Navigate to="/login" />}/>
        <Route path="/admin" element ={user && user.hasOwnProperty('admin') ? <AdminHomepage/> : <Navigate to="/noaccess" />}/>
        <Route path="/addproduct" element ={user && user.hasOwnProperty('admin') ? <AddProduct/> : <Navigate to="/noaccess" />}/>
        <Route path="/checkout" element ={user ? <Checkout/> : <Navigate to="/login" />}/>
        <Route path="/orderdetails" element ={user ? <OrderDetails/> : <Navigate to="/login" />}/>
        <Route path="/noaccess" element ={<NoAccess/>}/>
      </Routes>
    </Router>
  );
};

export default App;
