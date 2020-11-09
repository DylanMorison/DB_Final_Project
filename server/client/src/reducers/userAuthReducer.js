import { USER_LOGIN, USER_LOGOUT, TOGGLE_FOLLOW } from "../actions/types";

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
        ...state,
        userUid: action.payload.userUid,
      };
      case TOGGLE_FOLLOW:
        return {
          ...state,
          userFollowers: action.payload.userFollowers, 
          userFollowing: action.payload.userFollowing,
        };
    default:
      return state;
  }
}
