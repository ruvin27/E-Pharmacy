import React from 'react';
import HomepageNav from './navbar';
import { useAuth } from '../authentication/AuthContext';

function Homepage() {
  const { user } =  useAuth();
  console.log(user);
  return (
    <div>
      <HomepageNav />
      {/* <h3>{user.email}</h3> */}
    </div>
  );
}

export default Homepage;
