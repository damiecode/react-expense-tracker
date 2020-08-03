import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createNewUser } from '../../redux/actions/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../assets/css/main.css';
import '../../assets/css/utils.css';
import img from '../../assets/images/img-01.png';

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
			password_confirmation: '',
			message: '',
		};
	}

	handleUsernameChange = (e) => {
		this.setState({
			username: e.target.value,
		});
	}

	handleEmailChange = (e) => {
		this.setState({
			email: e.target.value,
		});
	}

	handlePasswordChange = (e) => {
		this.setState({
			password: e.target.value,
		});
	}

	onSubmitHandler = async (e) => {
		e.preventDefault();
		const {
			username, email, password, password_confirmation
		} = this.state;

		const { newUser, user } = this.props;

		await newUser({
			username, email, password, password_confirmation
    });

		if (user.isLogin === true) {
			const { history } = this.props;
			history.push('/');
		} else {
			this.setState(
				{
					message: 'welcome',
				},
			);
		}
	}

render() {
  const { message } = this.state;
	return (
		<div class="limiter">
      	<div class="container-login100">
			    <div class="wrap-login100">
						<div class="login100-pic js-tilt" data-tilt>
							<img src={img} alt="IMG" />
						</div>
            <form onSubmit={this.onSubmitHandler} class="login100-form validate-form" >
              <span class="login100-form-title">
                Sign Up
              </span>
							<h1>{message}</h1>
              <div class="wrap-input100 validate-input">
                <input 
                  placeholder="username"
                  type="text"
                  name="username"
                  onChange={this.handleUsernameChange}
									required
                  />
                <span class="focus-input100"></span>
                <span class="symbol-input100">
									<FontAwesomeIcon icon={["fas", "coffee"]} />
                </span>
              </div>
              <div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                <input 
                  placeholder="email"
                  type="text"
                  name="email"
                  onChange={this.handleEmailChange}
									required
                  />
                <span class="focus-input100"></span>
                <span class="symbol-input100">
									<FontAwesomeIcon icon="envelope" />
                </span>
              </div>
              <div class="wrap-input100 validate-input" data-validate = "Password is required">
                <input
                  placeholder="password"
                  type="password"
                  name="password"
                  onChange={this.handlePasswordChange}
									required
                />    
                <span class="focus-input100"></span>
                <span class="symbol-input100">
                  <i class="fa fa-lock" aria-hidden="true"></i>
                </span>
              </div>
							<div class="wrap-input100 validate-input" data-validate = "Password is required">
                <input
                  placeholder="confirm_password"
                  type="password"
                  name="password_confirmation"
                  onChange={this.handlePasswordChange}
									required
                />    
                <span class="focus-input100"></span>
                <span class="symbol-input100">
                  <i class="fa fa-lock" aria-hidden="true"></i>
                </span>
              </div>        
              <div class="container-login100-form-btn">
                <button class="login100-form-btn">
                  Create Account
                </button>
              </div>    
              <div class="text-center p-t-136">
                <Link to="/login">login
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

const mapStateToProps = state => ({
	user: state.user,
});

const mapDispatchToProps = dispatch => ({
	newUser: estate => dispatch(createNewUser(estate)),
});

Signup.propTypes = {
	newUser: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
