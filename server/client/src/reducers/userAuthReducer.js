import { USER_LOGIN, USER_LOGOUT } from "../actions/types";

const initialState = {
  username: null,
  email: null,
  uid: null,
  isLoggedIn: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        username: action.payload.username,
        email: action.payload.email,
        uid: action.payload.uid,
        isLoggedIn: action.payload.isLoggedIn,
      };
    case USER_LOGOUT:
      return {
        ...state,
        username: action.payload.username,
        email: action.payload.email,
        uid: action.payload.uid,
        isLoggedIn: action.payload.isLoggedIn,
      };

    default:
      return state;
  }
}
