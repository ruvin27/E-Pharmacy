import React from 'react';
import HomepageNav from '../navbar';
import ProductList from './ProductList';
//import '../../assets/css/product.css';


function Homepage() {
  return (
    <div>
     
      <HomepageNav />
      <ProductList/>
   
    </div>
  );
}

export default Homepage;
