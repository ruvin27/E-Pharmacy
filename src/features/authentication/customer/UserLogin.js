import React, { useState,useEffect } from "react";
import "../../../assets/css/userAuth.css";
import { Navbar, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { getDatabase, ref, get } from "firebase/database";

function UserLogin() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
    const [userDetails, setUserDetails] = useState(null);
  
    const navigate = useNavigate();
    
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

  
  
    const handleLogin = async () => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password );
      //  const userId = userCredential.user.uid;
      const userName = userCredential.user.displayName;
      const userEmail = userCredential.user.email;
      // console.log(userName);
      // console.log(userEmail);
        const db = getDatabase();
        const userRef = ref(db, 'users');
        const snapshot = await get(userRef);
        let foundUser = null;

        snapshot.forEach((childSnapshot) => {
          const user = childSnapshot.val();
          if (user.email === userEmail && user.name === userName) {
             foundUser = user;
            // console.log(foundUser);
          }
        });
    
        if (foundUser) {
          setUserDetails(foundUser);
          await login(foundUser);
          navigate("/");
        } else {
          alert("User not found.");
        }
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode + ': ' + errorMessage);
      }
    };

    useEffect(() => {
      console.log(userDetails)
    },[userDetails])

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
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="form-control" />
            <label className="form-label" htmlFor="form2Example1">Email address</label>
          </div>

          <div className="form-outline mb-4">
            <input type="password" name="password" value={formData.password} onChange={handleInputChange} className="form-control" />
            <label className="form-label" htmlFor="form2Example2">Password</label>
          </div>

          <div className="row mb-4">
            <div className="col d-flex justify-content-center">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="form2Example31" checked readOnly />
                <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
              </div>
            </div>

            <div className="col">
              <a href="#!">Forgot password?</a>
            </div>
          </div>
            <button type="button" onClick={handleLogin} className="btn btn-primary btn-block mb-4">Sign in</button>

          <div className="text-center">
            <p>Not a member? <Link to="/register" style={{ textDecoration: 'none' }}>Register</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}
export default UserLogin;
