import { FETCH_USERS, CREATE_USER, TOGGLE_FOLLOW } from "../actions/types";

const initialState = {
    usersByUid: {},
    allUserUids: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
				usersByUid: {...state.usersByUid, [action.payload.userUid] :{...action.payload.userData}},
				allUserUids: [...state.allUserUids, action.payload.userUid],
      };
    case TOGGLE_FOLLOW:
      return {
        ...state,
      };
    default:
      return state;
  }
}
