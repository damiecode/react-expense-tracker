import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Switch, Route } from 'react-router-dom';
import Login from './registrations/login';
import Signup from './registrations/signUp';
import { userLoggedIn, userLogout } from '../redux/actions/index';
import '../App.css';

const App = ({
  user, userLoggedIn, userLogout,
}) => {
  const redirectTo = path => (
    <Redirect push to={{ pathname: path }} />
  );

  useEffect(() => {
    userLoggedIn();
  }, [userLoggedIn]);

  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <div className="App">
      <header className="appHeader">
        <div className="font-header">Expense Tracker</div>
        <div className="capitalize">
          <span>Hi </span>
          {user.username}
          <button title="logout" className="bareBtn" type="button" onClick={userLogout}>
            <i className="fas fa-sign-out-alt" />
          </button>
        </div>
      </header>
      <main className="height-main-hidden">
        <Switch>
          <Route exact path="/login" render={() => <Login redirectTo={redirectTo} />} />
          <Route exact path="/register" component={Signup} />
          {/* <Route exact path="/more" render={() =>
          <MorePage userLogout={userLogout} redirectTo={redirectTo} />} /> */}
          <Route exact path="/" render={() => <Login redirectTo={redirectTo} />} />
        </Switch>
      </main>
    </div>
  );
  /* eslint-enable react/jsx-props-no-spreading */
};

App.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
  userLoggedIn: PropTypes.func.isRequired,
  userLogout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  userLoggedIn: () => {
    dispatch(userLoggedIn());
  },
  userLogout: () => {
    dispatch(userLogout());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
