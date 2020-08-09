/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from './loading';
import { loginUser } from '../actions/auth';
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
    const { loginUser } = this.props;
    const { loginCreds, password } = this.state;
    const user = {
      username: loginCreds.toLowerCase(),
      email: loginCreds.toLowerCase(),
      password,
    };

    event.preventDefault();
    loginUser(user);
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
    const { isLoading, form } = status;

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
              <form onSubmit={this.handleSubmit} ref={this.selectForm} className="login100-form validate-form">
                <span className="login100-form-title">
                  Login
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
                  <button className="login100-form-btn" type="button">
                    Login
                  </button>
                </div>
                or
                <div className="text-center p-t-136">
                  <Link to="/signup">
                    Not signed up yet?
                    <i className="fas fa-long-arrow-right m-l-5" aria-hidden="true" />
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    return renderMain;
  }
}

Login.propTypes = {
  status: PropTypes.instanceOf(Object).isRequired,
  loginUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  status: state.status,
});

const mapDispatchToProps = dispatch => ({
  loginUser: user => {
    dispatch(loginUser(user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
