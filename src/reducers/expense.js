import { FETCH_EXPENSE } from '../actions/Index';

const selectedExpenseReducer = (state = { }, action) => {
  switch (action.type) {
    case FETCH_EXPENSE:
      return action.response;
    default:
      return state;
  }
};

export default selectedExpenseReducer;
