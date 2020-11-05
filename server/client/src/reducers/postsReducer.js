import { ADD_POST, TOGGLE_LIKE, ADD_COMMENT } from "../actions/types";

const initialState = {
  posts: [],
  status: "load",
  location: "home",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
      case TOGGLE_LIKE:
        return {
          ...state,
        };
    default:
      return state;
  }
}
