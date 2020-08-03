import axios from 'axios';

const URL = 'https://trackingapp-api.herokuapp.com/';

const FETCH_REQUEST = 'FETCH_REQUEST';
const FETCH_REQUEST_SUCCESS = 'FETCH_REQUEST_SUCCESS';
const FETCH_REQUEST_FAILURE = 'FETCH_REQUEST_FAILURE';
const USER_CREATE = 'USER_CREATE';
const USER_LOGIN = 'USER_LOGIN';
const USER_LOGOUT = 'USER_LOGOUT';

const fetchRequest = () => ({
  type: FETCH_REQUEST,
});

const fetchRequestSuccess = response => ({
  type: FETCH_REQUEST_SUCCESS,
  response,
});

const fetchRequestFailure = (response, form = '') => ({
  type: FETCH_REQUEST_FAILURE,
  response,
  form,
});

const userCreateSuccess = (user, loggedIn) => ({
  type: USER_CREATE,
  response: { ...user, logged_in: loggedIn },
});

const userLoginSuccess = (user, loggedIn) => ({
  type: USER_LOGIN,
  response: { ...user, logged_in: loggedIn },
});

const userLogoutSuccess = user => ({
  type: USER_LOGOUT,
  response: { ...user, logged_in: false },
});

// Register User
const createNewUser = user => dispatch => {
  dispatch(fetchRequest());
  axios.post(`${URL}registrations`, { user }, { withCredentials: true })
    .then(response => {
      const newUser = response.data.user;

      dispatch(fetchRequestSuccess(response.data.status));
      dispatch(userCreateSuccess(newUser, true));
    })
    .catch(error => {
      const errorMsg = error.response.data.error || [`${error.response.statusText}`];
      dispatch(fetchRequestFailure(errorMsg, 'registrationForm'));
    });
};

// User Login
const userLogin = user => dispatch => {
  dispatch(fetchRequest());
  axios.post(`${URL}sessions`, { user }, { withCredentials: true })
    .then(response => {
      const retrievedUser = response.data.user;
      const userLoggedIn = response.data.logged_in;

      dispatch(fetchRequestSuccess(response.data.status));
      dispatch(userLoginSuccess(retrievedUser, userLoggedIn));
    })
    .catch(error => {
      const errorMsg = error.response.data.error || [`${error.response.statusText}`];
      dispatch(fetchRequestFailure(errorMsg, 'loginForm'));
    });
};

// Is User Still Logged In?
const userLoggedIn = () => dispatch => {
  dispatch(fetchRequest());
  axios.get(`${URL}logged_in`, { withCredentials: true })
    .then(response => {
      const retrievedUser = response.data.user || {};
      const userLoggedIn = response.data.logged_in;

      dispatch(fetchRequestSuccess('User still Logged in'));
      dispatch(userLoginSuccess(retrievedUser, userLoggedIn));
    })
    .catch(error => {
      const userLoggedIn = error.response.data.logged_in;
      dispatch(userLoginSuccess({}, userLoggedIn));
      const errorMsg = error.response.data.status || [`${error.response.statusText}`];
      dispatch(fetchRequestFailure(errorMsg, 'logoutForm'));
    });
};

// User Logout
const userLogout = () => dispatch => {
  dispatch(fetchRequest());
  axios.delete(`${URL}logout`, { withCredentials: true })
    .then(response => {
      const clearUser = { username: '', email: '', password_digest: '' };

      dispatch(fetchRequestSuccess(response.data.status));
      dispatch(userLogoutSuccess(clearUser, response.data.logged_out));
    })
    .catch(error => {
      const errorMsg = error.response.data.status || [`${error.response.statusText}`];
      dispatch(fetchRequestFailure(errorMsg, 'logoutForm'));
    });
};

export {
  USER_LOGIN, USER_LOGOUT, USER_CREATE,
  FETCH_REQUEST, FETCH_REQUEST_SUCCESS, FETCH_REQUEST_FAILURE,
  createNewUser, userLogin, userLoggedIn, userLogout,
 }
