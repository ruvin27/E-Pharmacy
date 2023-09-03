import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import '../../../assets/css/userAuth.css'

export default class UserLogin extends Component {
  render() {
    return (
    <div>
        <div class="navbar">
        <h5>UTA E-Pharmacy</h5>
        </div>
      <div className='center-container'>
        <form className='center-content'>
      <div class="form-outline mb-4">
        <input type="email" id="form2Example1" class="form-control" />
        <label class="form-label" for="form2Example1">Email address</label>
      </div>
    
      <div class="form-outline mb-4">
        <input type="password" id="form2Example2" class="form-control" />
        <label class="form-label" for="form2Example2">Password</label>
      </div>
    
      <div class="row mb-4">
        <div class="col d-flex justify-content-center">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
            <label class="form-check-label" for="form2Example31"> Remember me </label>
          </div>
        </div>
    
        <div class="col">
          <a href="#!">Forgot password?</a>
        </div>
      </div>
    
      <button type="button" class="btn btn-primary btn-block mb-4">Sign in</button>
    
      <div class="text-center">
        <p>Not a member? <a href="#!">Register</a></p>
      </div>
    </form></div></div>
    )
  }
}
