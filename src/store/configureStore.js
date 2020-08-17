import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';
import userReducer from '../reducers/user';
import loaderReducer from '../reducers/loader';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer,
      user: userReducer,
      status: loaderReducer,
    }),
    composeEnhancers(applyMiddleware(thunk)),
  );

  return store;
};
