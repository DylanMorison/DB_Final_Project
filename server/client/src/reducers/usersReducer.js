import { USER_ADD_POST, CREATE_USER, TOGGLE_FOLLOW,  } from "../actions/types";

const initialState = {
    usersByUid: {},
    allUserUids: [],
};


// const newUser = {
// 	userData: {
// 		username: newUserData.username,
// 		email: newUserData.email,
// 		userUid: Uid,
// 		fullName: newUserData.fullName,
// 		followers: [],
// 		following: [],
// 		posts: [],
// 	},
// 	userUid: Uid,
// };


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
