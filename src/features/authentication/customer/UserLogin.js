import React, { useState } from "react";
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
  
    const navigate = useNavigate();
    
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

  
  
    const handleLogin = async (event) => {
      event.preventDefault();
      try {
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password );
       const userId = userCredential.user.uid;
       console.log(userId);

        const db = getDatabase();
        const userRef = ref(db, `users/${userId}`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          const userData = snapshot.val();
          userData.uid = userId;
          console.log('User data:', userData);
          await login(userData);
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

  return (
    <div>
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand href='/' style={{ color: 'white' }}>UTA E-Pharmacy</Navbar.Brand>
        </Container>
      </Navbar>
      <div className='center-container'>
        <form className='center-content' onSubmit={handleLogin}>
          <div className="form-outline mb-4">
            <input type="email" name="email" value={formData.email}  onChange={handleInputChange} className="form-control" required/>
            <label className="form-label" htmlFor="form2Example1">Email address</label>
          </div>

          <div className="form-outline mb-4">
            <input type="password" name="password" value={formData.password}  onChange={handleInputChange} className="form-control" required/>
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
            <button type="submit"  className="btn btn-primary btn-block mb-4">Sign in</button>

          <div className="text-center">
            <p>Not a member? <Link to="/register" style={{ textDecoration: 'none' }}>Register</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}
export default UserLogin;
