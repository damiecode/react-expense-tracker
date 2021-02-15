import { FETCH_EXPENSELIST } from '../actions/Index';

const expensessReducer = (state = { }, action) => {
  switch (action.type) {
    case FETCH_EXPENSELIST:
      return [...action.response];
    default:
      return state;
  }
};

export default expensessReducer;
