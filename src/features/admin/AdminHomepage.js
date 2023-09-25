import React from 'react'
import HomepageNav from '../navbar';
import ProductList from '../dashboard/ProductList';

const AdminHomepage = () => {
    return (
          <div>
          <HomepageNav/>
          <ProductList/>
          </div>
      );
};

export default AdminHomepage;