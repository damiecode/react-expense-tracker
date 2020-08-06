import { combineReducers } from 'redux';
import userReducer from './user';
import loaderReducer from './loader';
import expensesReducer from './expenses';

const rootReducer = combineReducers({
  user: userReducer,
  status: loaderReducer,
  expenses: expensesReducer,
});

export default rootReducer;
