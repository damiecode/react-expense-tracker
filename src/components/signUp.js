/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createNewUser } from '../actions/Index';
import Loading from './loading';
import ShowErrors from './errors';
import '../styles/main.css';
import '../styles/utils.css';
import img from '../img-01.png';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.selectForm = React.createRef();
  }

  onSubmitHandler(e) {
    const { createNewUser } = this.props;
    e.preventDefault();
    createNewUser(this.state);
    this.reset();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  reset() {
    this.selectForm.current.scrollIntoView({ behaviour: 'smooth' });
    this.setState({
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
    });
  }

  render() {
    const {
      username, email, password, password_confirmation,
    } = this.state;
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
              <form ref={this.selectForm} onSubmit={this.onSubmitHandler} className="login100-form validate-form">
                <span className="login100-form-title">
                  Sign Up
                  {form === 'registrationForm' && <ShowErrors errors={errors} />}
                </span>
                <div className="wrap-input100 validate-input">
                  <input
                    placeholder="username"
                    type="text"
                    name="username"
                    value={username}
                    onChange={this.handleChange}
                    required
                  />
                  <span className="focus-input100" />
                  <span className="symbol-input100">
                    <i className="fas fa-user" aria-hidden="true" />
                  </span>
                </div>
                <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                  <input
                    placeholder="email"
                    type="text"
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                    required
                  />
                  <span className="focus-input100" />
                  <span className="symbol-input100">
                    <i className="fas fa-envelope" aria-hidden="true" />
                  </span>
                </div>
                <div className="wrap-input100 validate-input" data-validate="Password is required">
                  <input
                    placeholder="password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                    required
                  />
                  <span className="focus-input100" />
                  <span className="symbol-input100">
                    <i className="fas fa-lock" aria-hidden="true" />
                  </span>
                </div>
                <div className="wrap-input100 validate-input" data-validate="Password is required">
                  <input
                    placeholder="confirm_password"
                    type="password"
                    name="password_confirmation"
                    value={password_confirmation}
                    onChange={this.handleChange}
                    required
                  />
                  <span className="focus-input100" />
                  <span className="symbol-input100">
                    <i className="fas fa-lock" aria-hidden="true" />
                  </span>
                </div>
                <div className="container-login100-form-btn">
                  <button className="login100-form-btn" type="submit">
                    Create Account
                  </button>
                </div>
                <div className="text-center p-t-136">
                  <Link to="/login">
                    Already signed up?
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

const mapStateToProps = state => ({
  status: state.status,
});

const mapDispatchToProps = dispatch => ({
  createNewUser: user => {
    dispatch(createNewUser(user));
  },
});

Signup.propTypes = {
  createNewUser: PropTypes.func.isRequired,
  status: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
