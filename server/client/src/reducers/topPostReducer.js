import { UPDATE_TOP_POST } from "../actions/types";

const initialState = {
  topPostUid: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_TOP_POST:
      return {
        ...state,
        topPostUid: action.payload.postUid
      };
    default:
      return state;
  }
}

