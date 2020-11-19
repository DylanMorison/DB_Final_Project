import { ADD_HOME_POSTS, CLEAR_HOME } from "../actions/types";

const initialState = {
  allPostUids: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_HOME_POSTS:
      return {
        ...state,
        allPostUids: [...state.allPostUids, action.payload.postUid],
      };
      case CLEAR_HOME:
        return {
          ...state = undefined
        };
    default:
      return state;
  }
}
