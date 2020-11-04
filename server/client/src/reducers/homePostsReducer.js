import { ADD_POST } from "../actions/types";

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
    default:
      return state;
  }
}
