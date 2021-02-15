/* eslint-disable camelcase */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/index.css';

const Header = ({ user, userLogout, redirectTo }) => {
  const renderMain = (
    <header className="header">
      <div className="content-container">
        <div className="header__content">
          <Link className="header__title" to="/dashboard">
            <h1>Expense Tracker</h1>
          </Link>
          <button
            onClick={userLogout}
            className="button button--link"
            type="submit"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
  const { logged_in } = user;
  return logged_in ? renderMain : redirectTo('/login');
};

Header.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
  userLogout: PropTypes.func.isRequired,
  redirectTo: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(Header);
