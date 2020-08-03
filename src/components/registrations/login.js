import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShowErrors from '../errors';
import Loading from '../loading';
import { userLogin } from '../../redux/actions/index';
import '../../assets/css/main.css';
import '../../assets/css/utils.css';
import img from '../../assets/images/img-01.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      loginCreds: '',
      errors: '',
     };

     this.selectForm = React.createRef()
  }
  
  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  };
  
  handleSubmit = (event) => {
    const { userLogin } = this.props;
    const { loginCreds, password} = this.state
    const user = {
      username: loginCreds.toLowerCase(),
      email: loginCreds.toLowerCase(),
      password: password
    }

    event.preventDefault()
    userLogin(user);
    this.reset();
  }

  reset = () => {
    this.selectForm.current.scrollIntoView({ behaviour: 'smooth' });
    this.setState({
      loginCreds: '',
      password: '',
    });
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
    const { loginCreds, password} = this.state
    const { status } = this.props;
    const { isLoading, errors, form} = status;
    
    const renderMain = isLoading 
    ? (
      <Loading />
      )
      : (
      <div class="limiter">
      	<div class="container-login100">
			    <div class="wrap-login100">
            <div class="login100-pic js-tilt" data-tilt>
                <img src={img} alt="IMG" />
            </div>
            <form onSubmit={this.handleSubmit} class="login100-form validate-form" >
              <span class="login100-form-title">
                Login
                {form === 'login' && <ShowErrors errors={errors} />}
              </span>
              <div class="wrap-input100 validate-input">
                <input 
                  placeholder="Username or Email"
                  type="text"
                  name="username"
                  value={loginCreds}
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
                <Link to='/signup'>Not signed up yet?
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
    const { user } = this.props;
    const { logged_in } = user;
    const { redirectTo } = this.props;
    return !logged_in ? renderMain : redirectTo('/expenses');
  }
}

Login.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
  status: PropTypes.instanceOf(Object).isRequired,
  userLogin: PropTypes.func.isRequired,
  redirectTo: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  status: state.status,
});

const mapDispatchToProps = dispatch => ({
  userLogin: user => {
    dispatch(userLogin(user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

