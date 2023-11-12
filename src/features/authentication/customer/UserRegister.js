import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../../assets/css/userAuth.css'
import { Navbar, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../../firebase";
import { getDatabase, ref, set } from "firebase/database";
import  loginCSS from "../../../assets/css/login.module.css";

function UserRegister() {
  const {  login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    admin: false,
    address: {
      addLine1: "",
      addLine2: "",
      city: "",
      state: "",
      code: ""
    },
    phone: ''
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


  const handleRegistration = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password );
      const userId = userCredential.user.uid;

      const db = getDatabase();
      const userRef = ref(db, `users/${userId}`);
      await set(userRef, formData)
      .then(async () => {
        formData.uid = userId;
        alert("Registration successfull!!")
        await login(formData);
        navigate('/');
      })
   
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode + ': ' + errorMessage);
    }

  };

  return (
    <div className={loginCSS.bgp}>
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand href='/' style={{ color: 'white' }}>UTA E-Pharmacy</Navbar.Brand>
        </Container>
      </Navbar>
      <div>
        <h3 style={{textAlign:'center',marginTop:'50px',fontSize:'35px', fontFamily:"Georgia, 'Times New Roman', Times, serif",fontWeight: 'bold'}}>Welcome to UTA E-Pharmacy</h3>
      </div>
      <div className='center-container'>
        <form className='center-content' onSubmit={handleRegistration}>
        <h4 > Register </h4>
          <div className="form-outline mb-4">
            <input type="text" name="name" value={formData.name}  onChange={handleInputChange} className="form-control" required/>
            <label className="form-label" htmlFor="form2Example1">Full Name</label>
          </div>
          <div className="form-outline mb-4">
            <input type="email" name="email" value={formData.email}  onChange={handleInputChange} className="form-control" 
            pattern="^.+@(.*\.com|.*\.edu)$" title='Please enter your email with .com or .edu' required/>
            <label className="form-label" htmlFor="form2Example2">Email address</label>
          </div>
          <div className="form-outline mb-4">
            <input type="password" name="password" value={formData.password}  onChange={handleInputChange} className="form-control" required/>
            <label className="form-label" htmlFor="form2Example3">Password</label>
          </div>

          <button type="submit"  className="btn btn-primary btn-block mb-4">Register</button>
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
  