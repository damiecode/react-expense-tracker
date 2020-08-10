/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { userLoggedIn } from '../actions/Index';

export const PrivateRoute = ({
  userLoggedIn,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={props => (
      userLoggedIn ? (
        <div>
          <Header />
          <Component {...props} />
        </div>
      ) : (
        <Redirect to="/" />
      )
    )}
  />
);

PrivateRoute.propTypes = {
  userLoggedIn: PropTypes.func.isRequired,
  component: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  userLoggedIn: () => {
    dispatch(userLoggedIn());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
