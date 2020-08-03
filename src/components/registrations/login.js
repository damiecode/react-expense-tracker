import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      email: '',
      password: '',
      errors: '',
     };
  }
  
  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  };
  
  handleSubmit = (event) => {
    event.preventDefault()
    const {username, email, password} = this.state
    let user = {
      username: username,
      email: email,
      password: password
    }
    
    axios.post('http://localhost:3000/login', {user}, {withCredentials: true})
      .then(response => {
        if (response.data.logged_in) {
          this.props.handleLogin(response.data)
          this.redirect()
        } else {
          this.setState({
            errors: response.data.errors
          })
        }
      })
      .catch(error => console.log('api errors:', error))
    };
    redirect = () => {
      this.props.history.push('/')
    }
    
    handleErrors = () => {
    return (
      <div>
        <ul>
        {this.state.errors.map(error => {
        return <li key={error}>{error}</li>
          })}
        </ul>
      </div>
    )
  }
  render() {
    const {username, email, password} = this.state
    return (
      <div class="limiter">
      	<div class="container-login100">
			    <div class="wrap-login100">
            <form onSubmit={this.handleSubmit} class="login100-form validate-form" >
              <span class="login100-form-title">
                Login
              </span>
              <div class="wrap-input100 validate-input">
                <input 
                  placeholder="username"
                  type="text"
                  name="username"
                  value={username}
                  onChange={this.handleChange}
                  />
                <span class="focus-input100"></span>
                <span class="symbol-input100">
                  <i class="fa fa-envelope" aria-hidden="true"></i>
                </span>
              </div>
              <div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                <input 
                  placeholder="email"
                  type="text"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  />
                <span class="focus-input100"></span>
                <span class="symbol-input100">
                  <i class="fa fa-envelope" aria-hidden="true"></i>
                </span>
              </div>
              <div class="wrap-input100 validate-input" data-validate = "Password is required">
                <input
                  placeholder="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                />    
                <span class="focus-input100"></span>
                <span class="symbol-input100">
                  <i class="fa fa-lock" aria-hidden="true"></i>
                </span>
              </div>      
              <div class="container-login100-form-btn">
                <button class="login100-form-btn">
                  Login
                </button>
              </div>    
              or 
              <div class="text-center p-t-136">
                <Link to='/signup'>sign up
                <i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                </Link>
              </div>
            </form>
            <div>
              {
                this.state.errors ? this.handleErrors() : null
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
