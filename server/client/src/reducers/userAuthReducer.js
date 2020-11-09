import { USER_LOGIN, USER_LOGOUT, } from "../actions/types";

const initialState = {
  username: null,
  email: null,
  uid: null,
  username: null,
  email: null,
  uid: null,
  Fullname: null,
  following: null,
  followers: null,
  isLoggedIn: null,
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
        Fullname: action.payload.Fullname,
        following: action.payload.following,
        followers: action.payload.followers,
        isLoggedIn: action.payload.isLoggedIn,
      };
    case USER_LOGOUT:
      return {
        ...state,
        username: action.payload.username,
        email: action.payload.email,
        uid: action.payload.uid,
        Fullname: action.payload.Fullname,
        following: action.payload.following,
        followers: action.payload.followers,
        isLoggedIn: action.payload.isLoggedIn,
      };

    default:
      return state;
  }
}
