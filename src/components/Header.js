import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../styles/index.css';

const Header = () => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/dashboard">
          <h1>Expense Tracker</h1>
        </Link>
        <button
          className="button button--link"
          type="button"
        >
          Logout
        </button>
      </div>
    </div>
  </header>
);

export default connect()(Header);
