import { ADD_EXPLORE_POST } from "../actions/types";

const initialState = {
  postsByUids: {},
  allPostUids: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_EXPLORE_POST:
      return {
        ...state,
        postsByUids: {
          ...state.postsByUids,
          [action.payload.postUid]: { ...action.payload.postData },
        },
        allPostUids: [...state.allPostUids, action.payload.postUid],
      };
    default:
      return state;
  }
}
