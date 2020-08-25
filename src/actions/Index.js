import axios from 'axios';

const URL = 'https://trackingapp-api.herokuapp.com/';

const FETCH_REQUEST = 'FETCH_REQUEST';
const FETCH_REQUEST_SUCCESS = 'FETCH_REQUEST_SUCCESS';
const FETCH_REQUEST_FAILURE = 'FETCH_REQUEST_FAILURE';
const USER_REGISTER = 'USER_REGISTER';
const USER_LOGIN = 'USER_LOGIN';
const USER_LOGOUT = 'USER_LOGOUT';
const FETCH_EXPENSELIST = 'FETCH_EXPENSELIST';
const FETCH_EXPENSE = 'FETCH_EXPENSE';

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

const userRegisterSuccess = (user, loggedIn) => ({
  type: USER_REGISTER,
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

const fetchExpenseListSuccess = expenses => ({
  type: FETCH_EXPENSELIST,
  response: expenses,
});
const fetchExpenseSuccess = expense => ({
  type: FETCH_EXPENSE,
  response: expense,
});

// Register User
const createNewUser = user => dispatch => {
  dispatch(fetchRequest());
  axios.post(`${URL}registrations`, { user }, { withCredentials: true })
    .then(response => {
      const newUser = response.data.user;

      dispatch(fetchRequestSuccess(response.data.status));
      dispatch(userRegisterSuccess(newUser, true));
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

// Grab all expenses from API Database related to current logged in user
const fetchExpenses = () => dispatch => {
  dispatch(fetchRequest());
  axios.get(`${URL}expenses`, { withCredentials: true })
    .then(response => {
      dispatch(fetchRequestSuccess('Showing all expenses for current User...'));
      dispatch(fetchExpenseListSuccess(response.data.expense));
    })
    .catch(error => {
      const errorMsg = error.response.data.error || [`${error.response.statusText}`];
      dispatch(fetchRequestFailure(errorMsg));
    });
};

// Grab one expense from API Database
const fetchExpense = expenseID => dispatch => {
  dispatch(fetchRequest());
  axios.get(`${URL}expenses/${expenseID}`, { withCredentials: true })
    .then(response => {
      dispatch(fetchRequestSuccess(response.data.status));
      dispatch(fetchExpenseSuccess(response.data.selected_expense));
    })
    .catch(error => {
      const errorMsg = error.response.data.error || [`${error.response.statusText}`];
      dispatch(fetchRequestFailure(errorMsg));
    });
};

// Expense requests
const addExpense = expense => dispatch => {
  dispatch(fetchRequest());
  axios.post(`${URL}expenses`, { expense }, { withCredentials: true })
    .then(response => {
      const newExpenseList = response.data.expense;
      dispatch(fetchRequestSuccess(response.data.status));
      dispatch(fetchExpenseListSuccess(newExpenseList));
    })
    .catch(error => {
      const errorMsg = error.response.data.error || [`${error.response.statusText}`];
      dispatch(fetchRequestFailure(errorMsg, 'expenseForm'));
    });
};

const updateExpense = (expenseID, expense) => dispatch => {
  dispatch(fetchRequest());
  axios.patch(`${URL}expenses/${expenseID}`, { expense }, { withCredentials: true })
    .then(response => {
      dispatch(fetchRequestSuccess(response.data.status));
      dispatch(fetchExpenseSuccess(response.data.selected_expense));
    })
    .catch(error => {
      const errorMsg = error.response.data.error || [`${error.response.statusText}`];
      dispatch(fetchRequestFailure(errorMsg, 'modalForm'));
    });
};

const removeExpense = expense => dispatch => {
  dispatch(fetchRequest());
  axios.delete(`${URL}expenses/${expense.id}`, { withCredentials: true })
    .then(response => {
      const newExpenseList = response.data.expense;
      dispatch(fetchRequestSuccess(response.data.status));
      dispatch(fetchExpenseListSuccess(newExpenseList));
    })
    .catch(error => {
      const errorMsg = error.response.data.error || [`${error.response.statusText}`];
      dispatch(fetchRequestFailure(errorMsg));
    });
};

export {
  FETCH_EXPENSELIST, FETCH_EXPENSE,
  USER_LOGIN, USER_LOGOUT, USER_REGISTER,
  FETCH_REQUEST, FETCH_REQUEST_SUCCESS, FETCH_REQUEST_FAILURE,
  createNewUser, userLogin, userLoggedIn, userLogout,
  fetchExpenses, fetchExpense, addExpense, removeExpense, updateExpense,
};
