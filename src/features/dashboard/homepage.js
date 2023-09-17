import React from 'react';
import HomepageNav from '../navbar';
import { useAuth } from '../authentication/AuthContext';
import ProductList from './ProductList';
//import '../../assets/css/product.css';

function Homepage() {
  const { user } =  useAuth();
  console.log(user);
  return (
    <div>
      <HomepageNav />

      <ProductList/>
      {/* <h3>{user.email}</h3> */}

    </div>
  );
}

export default Homepage;
