import { USER_LOGIN, USER_LOGOUT } from "../actions/types";

const initialState = {
  userUid: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        userUid: action.payload.userUid,
      };
    case USER_LOGOUT:
      return {
        ...state = undefined
      };
    default:
      return state;
  }
}


