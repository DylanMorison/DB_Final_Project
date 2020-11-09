import { ADD_POST, TOGGLE_LIKE, ADD_COMMENT } from "../actions/types";


const initialState = {
  postsByUids: {},
  allPostUids: [],
};



export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
				postsByUids: {...state.postsByUids, [action.payload.postUid] :{...action.payload.postData}},
				allPostUids: [...state.allPostUids, action.payload.postUid],
      };
    case TOGGLE_LIKE:
      return {
        ...state,
      };
    case ADD_COMMENT :
      return {
        ...state,
      };
    default:
      return state;
  }
}
