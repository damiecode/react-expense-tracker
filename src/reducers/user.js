import { USER_REGISTER, USER_LOGOUT, USER_LOGIN } from '../actions/Index';

const userReducer = (state = { }, action) => {
  switch (action.type) {
    case USER_REGISTER:
      return action.response;
    case USER_LOGIN:
      return action.response;
    case USER_LOGOUT:
      return action.response;
    default:
      return state;
  }
};

export default userReducer;
