/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { userLoggedIn } from '../actions/Index';

export const PublicRoute = ({
  userLoggedIn,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={props => (
      userLoggedIn ? (
        <Redirect to="/dashboard" exact />
      ) : (
        <Component {...props} />
      )
    )}
  />
);

PublicRoute.defaultProps = {
  userLoggedIn: () => {},
};

PublicRoute.propTypes = {
  userLoggedIn: PropTypes.func,
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

export default connect(mapStateToProps, mapDispatchToProps)(PublicRoute);
