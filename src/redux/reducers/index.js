import { combineReducers } from 'redux';
import userReducer from './user';
import loaderReducer from './loader';

const rootReducer = combineReducers({
  user: userReducer,
  status: loaderReducer,
});

export default rootReducer;