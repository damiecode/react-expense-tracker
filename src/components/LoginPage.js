/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShowErrors from './errors';
import Loading from './loading';
import { userLogin } from '../actions/Index';
import '../styles/main.css';
import '../styles/utils.css';
import img from '../img-01.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginCreds: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectForm = React.createRef();
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    const { userLogin } = this.props;
    const { loginCreds, password } = this.state;
    const user = {
      username: loginCreds.toLowerCase(),
      email: loginCreds.toLowerCase(),
      password,
    };

    event.preventDefault();
    userLogin(user);
    this.reset();
  }

  reset() {
    this.selectForm.current.scrollIntoView({ behaviour: 'smooth' });
    this.setState({
      loginCreds: '',
      password: '',
    });
  }

  render() {
    const { loginCreds, password } = this.state;
    const { status } = this.props;
    const { isLoading, errors, form } = status;

    const renderMain = isLoading
      ? (
        <Loading />
      )
      : (
        <div className="limiter">
          <div className="container-login100">
            <div className="wrap-login100">
              <div className="login100-pic js-tilt" data-tilt>
                <img src={img} alt="IMG" />
              </div>
              <form ref={this.selectForm} onSubmit={this.handleSubmit} className="login100-form validate-form">
                <span className="login100-form-title">
                  Login
                  {form === 'loginForm' && <ShowErrors errors={errors} />}
                </span>
                <div className="wrap-input100 validate-input">
                  <input
                    placeholder="Username or Email"
                    type="text"
                    name="username"
                    value={loginCreds}
                    onChange={this.handleChange}
                  />
                  <span className="focus-input100" />
                  <span className="symbol-input100">
                    <i className="fas fa-user" aria-hidden="true" />
                  </span>
                </div>
                <div className="wrap-input100 validate-input" data-validate="Password is required">
                  <input
                    placeholder="password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                  />
                  <span className="focus-input100" />
                  <span className="symbol-input100">
                    <i className="fas fa-lock" aria-hidden="true" />
                  </span>
                </div>
                <div className="container-login100-form-btn">
                  <button className="login100-form-btn" type="submit">
                    Login
                  </button>
                </div>
                <div className="text-center p-t-136">
                  <Link to="/register">
                    Not signed up yet?
                    <i className="fas fa-long-arrow-right m-l-5" aria-hidden="true" />
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    const { user } = this.props;
    /* eslint-disable camelcase */
    const { logged_in } = user;
    const { redirectTo } = this.props;
    return !logged_in ? renderMain : redirectTo('/dashboard');
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
