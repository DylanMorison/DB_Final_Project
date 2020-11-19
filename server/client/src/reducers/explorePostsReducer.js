import { ADD_EXPLORE_POST, CLEAR_EXPLORE } from "../actions/types";

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
      case CLEAR_EXPLORE:
        return {
          ...state = undefined
        };
    default:
      return state;
  }
}
