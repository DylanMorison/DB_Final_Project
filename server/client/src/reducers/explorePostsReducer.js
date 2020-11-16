import { ADD_EXPLORE_POST } from "../actions/types";

const initialState = {
  allPostUids: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_EXPLORE_POST:
      return {
        ...state,
        allPostUids: [...state.allPostUids, action.payload.postUid],
      };
    default:
      return state;
  }
}
