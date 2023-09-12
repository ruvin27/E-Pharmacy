import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../../assets/css/userAuth.css'
import { Navbar, Container } from 'react-bootstrap';
import '../../../assets/css/homepage.css'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';


function UserRegister() {
    const { user, login } = useAuth();
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
    });
  
    const navigate = useNavigate();
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
     
    };
    console.log(formData);
 
  
    const handleRegistration = async () => {
      try {
        const response = await fetch('http://localhost:4000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

  
        if (response.ok) {
            await login(formData);
            console.log(user);
            navigate('/');
        } else {
          alert('Registration failed. Please try again.');
        }
      } catch (error) {
        alert('Error:', error);
      }
    };
  
    return (
      <div>
        <Navbar expand="lg">
          <Container fluid>
            <Navbar.Brand href='/' style={{ color: 'white' }}>UTA E-Pharmacy</Navbar.Brand>
          </Container>
        </Navbar>
        <div className='center-container'>
          <form className='center-content'>
            <div className="form-outline mb-4">
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="form-control" />
              <label className="form-label" htmlFor="form2Example1">Full Name</label>
            </div>
            <div className="form-outline mb-4">
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="form-control" />
              <label className="form-label" htmlFor="form2Example2">Email address</label>
            </div>
            <div className="form-outline mb-4">
              <input type="password" name="password" value={formData.password} onChange={handleInputChange} className="form-control" />
              <label className="form-label" htmlFor="form2Example3">Password</label>
            </div>
            <div className="row mb-4">
                    <div className="col d-flex justify-content-center">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="form2Example4" checked readOnly/>
                            <label className="form-check-label" htmlFor="form2Example4"> I agree to the terms and conditions</label>
                        </div>
                    </div>
                </div>
            <button type="button" onClick={handleRegistration} className="btn btn-primary btn-block mb-4">Register</button>
            <div className="text-center">
              <p>Already a member? <Link to="/login" style={{ textDecoration: 'none' }}>
                Sign in
              </Link></p>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  export default UserRegister;
  