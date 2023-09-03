import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import '../../../assets/css/userAuth.css'

export default class UserRegister extends Component {
  render() {
    return (
        <div>
        <div class="navbar">
            <h5>UTA E-Pharmacy</h5>
        </div>
        <div class='center-container'>
            <form class='center-content'>
                <div class="form-outline mb-4">
                    <input type="text" id="form2Example1" class="form-control" />
                    <label class="form-label" for="form2Example1">Full Name</label>
                </div>
                <div class="form-outline mb-4">
                    <input type="email" id="form2Example2" class="form-control" />
                    <label class="form-label" for="form2Example2">Email address</label>
                </div>
                <div class="form-outline mb-4">
                    <input type="password" id="form2Example3" class="form-control" />
                    <label class="form-label" for="form2Example3">Password</label>
                </div>
                <div class="row mb-4">
                    <div class="col d-flex justify-content-center">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="form2Example4" checked />
                            <label class="form-check-label" for="form2Example4"> I agree to the terms and conditions</label>
                        </div>
                    </div>
                </div>
                <button type="button" class="btn btn-primary btn-block mb-4">Register</button>
                <div class="text-center">
                    <p>Already a member? <a href="#!">Sign in</a></p>
                </div>
            </form>
        </div>
    </div>
    )
  }
}
