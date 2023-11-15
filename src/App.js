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
import AdminOrders from "./features/admin/AdminOrders";
import Wishlist from "./features/orders/Wishlist";
import { SearchContextProvider } from './features/dashboard/SearchContext';
const App = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Loader/>;
  }
  return (
    <SearchContextProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Homepage/>} exact={true} />
        <Route path="/cart" element={user && user.admin !== true ? <Cart/> : <Navigate to="/login" />}/>

        <Route path="/login" element={!user ? <UserLogin/> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <UserRegister/> : <Navigate to="/" />}  />
        <Route path="/orders" element={user && !user.admin ? <Orders/> : <Navigate to="/login" />} />
        <Route path="/wishlist" element={user && !user.admin ? <Wishlist/> : <Navigate to="/login" />} />
        <Route path="/profile" element ={user ? <Profile/> : <Navigate to="/login" />}/>
        <Route path="/admin" element ={user && user.admin ? <AdminHomepage/> : <Navigate to="/noaccess" />}/>
        <Route path="/addproduct" element ={user && user.admin ? <AddProduct/> : <Navigate to="/noaccess" />}/>
        <Route path="/checkout" element ={user && !user.admin ? <Checkout/> : <Navigate to="/login" />}/>
        <Route path="/orderdetails" element ={user && !user.admin ? <OrderDetails/> : <Navigate to="/login" />}/>
        <Route path="/noaccess" element ={<NoAccess/>}/>
        <Route path="/adminorders" element={user && user.admin ? <AdminOrders/> : <NoAccess/>}/>
      </Routes>
    </Router>
    </SearchContextProvider>
  );
};

export default App;
