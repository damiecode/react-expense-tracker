/* eslint-disable camelcase */
import {
  GET_USER,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  GET_ERRORS,
  CLEAR_ERRORS,
  LOGIN_FAIL,
} from './Types';

export const saveToken = token => {
  localStorage.setItem('token', JSON.stringify(token));
};

export const saveDetails = details => {
  localStorage.setItem('details', JSON.stringify(details));
};

export const getDetails = () => {
  const res = localStorage.getItem('details');
  return JSON.parse(res);
};

export const getToken = () => {
  const res = localStorage.getItem('token');
  return JSON.parse(res);
};

export const LOGIN_USER = payload => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const LOGOUT_USER = () => ({
  type: LOGOUT_SUCCESS,
});

export const FetchUserDetails = payload => ({
  type: GET_USER,
  payload,
});
export const returnErrors = (msg, status = null, id = null) => ({
  type: GET_ERRORS,
  payload: { msg, status, id },
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS,
});

export const fetchUsersError = payload => ({
  type: LOGIN_FAIL,
  payload,
});

export const BASE_URL = 'https://trackingapp-api.herokuapp.com';
