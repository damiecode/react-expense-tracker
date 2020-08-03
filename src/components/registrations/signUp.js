import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createUser } from '../../redux/actions/action';

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
			username, email, password,
		} = this.state;

		const { newUser, user } = this.props;

		await newUser({
			username, email, password,
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
		<form onSubmit={this.onSubmitHandler} >
			<h1>{message}</h1>
		  <input onChange={this.handleUsernameChange} type="text" required />
			<input onChange={this.handleEmailChange} type="email" required />
			<input onChange={this.handlePasswordChange} type="password" required />
			<input onChange={this.handlePasswordChange} type="password" required />
      <Link to="/login">login</Link>
			<button type="submit">Create Account</button>
		</form>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user,
});

const mapDispatchToProps = dispatch => ({
	newUser: estate => dispatch(createUser(estate)),
});

Signup.propTypes = {
	newUser: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
