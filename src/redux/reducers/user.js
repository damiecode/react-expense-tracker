import { USER_CREATE, USER_LOGOUT, USER_LOGIN } from '../actions/index';

const userReducer = (state = { }, action) => {
  switch (action.type) {
    case USER_CREATE:
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
