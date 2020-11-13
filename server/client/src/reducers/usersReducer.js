import { USER_ADD_POST, CREATE_USER, FOLLOW_USER, UNFOLLOW_USER } from "../actions/types";


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
    case UNFOLLOW_USER:
      return {
        ...state,
        usersByUid: {
          ...state.usersByUid,
          [action.payload.userUid]: {
            ...state.usersByUid[action.payload.userUid],
            following: [
              ...state.usersByUid[action.payload.userUid].following.filter(user => user != action.payload.followedUser),
            ],
          },
        },
      };
      case FOLLOW_USER:
        return {
          ...state,
          usersByUid: {
            ...state.usersByUid,
            [action.payload.userUid]: {
              ...state.usersByUid[action.payload.userUid],
              following: [
                ...state.usersByUid[action.payload.userUid].following,
                action.payload.followedUser,
              ],
            },
          },
        };
    default:
      return state;
  }
}



