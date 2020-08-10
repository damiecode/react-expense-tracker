/* eslint-disable camelcase */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/index.css';
import { userLogout } from '../actions/Index';

const Header = ({ user, userLogout }) => {
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
            type="button"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
  return renderMain;
};

Header.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
  userLogout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  userLogout: () => {
    dispatch(userLogout());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
