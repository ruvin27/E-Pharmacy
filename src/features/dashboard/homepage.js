import React from 'react';
import HomepageNav from '../navbar';
import { useAuth } from '../authentication/AuthContext';
import ProductList from './ProductList';
//import '../../assets/css/product.css';


function Homepage() {
  const { user } =  useAuth();
  return (
    <div>
     
      <HomepageNav />
      <ProductList/>
   
    </div>
  );
}

export default Homepage;
