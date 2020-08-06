import { FETCH_EXPENSES_LIST } from '../actions/index';

const expensesReducer = (state = { }, action) => {
  switch (action.type) {
    case FETCH_EXPENSES_LIST:
      return [...action.response];
    default:
      return state;
  }
};

export default expensesReducer;
