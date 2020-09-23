import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Switch,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';

import './styles/index.css';
import ExpenseDashboardPage from './components/ExpenseDashboardPage';
import AddExpensePage from './components/AddExpensePage';
import EditExpensePage from './components/EditExpensePage';
import NotFoundPage from './components/NotFoundPage';
import LoginPage from './components/LoginPage';
import ChartPage from './components/ChartPage';
import signUp from './components/signUp';
import { userLoggedIn, userLogout } from './actions/Index';
import Header from './components/Header';

const App = ({
  userLoggedIn, userLogout,
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
      <main className="height-main-hidden">
        <Switch>
          <Route exact path="/register" component={signUp} />
          <Route exact path="/" render={() => <LoginPage redirectTo={redirectTo} />} />
          <Route exact path="/login" render={() => <LoginPage redirectTo={redirectTo} />} />
          <Route exact path="/dashboard" render={props => <ExpenseDashboardPage match={props.match} redirectTo={redirectTo} />} />
          <Route exact path="/create" render={props => <AddExpensePage {...props} redirectTo={redirectTo} />} />
          <Route exact path="/edit/:id" render={props => <EditExpensePage {...props} redirectTo={redirectTo} />} />
          <Route exact path="/stat" render={() => <ChartPage redirectTo={redirectTo} />} />
          <Route exact path="/logout" render={() => <Header userLogout={userLogout} redirectTo={redirectTo} />} />
          <Route component={NotFoundPage} />
        </Switch>
      </main>
    </div>
  );
};

App.defaultProps = {
  match: { },
};
App.propTypes = {
  match: PropTypes.instanceOf(Object),
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
