import { USER_ADD_POST, CREATE_USER, FOLLOW_USER, UNFOLLOW_USER, ADD_FOLLOWER, UNADD_FOLLOWER, CLEAR_USERS, UPDATE_AVATAR} from "../actions/types";


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
        case ADD_FOLLOWER:
          return {
            ...state,
            usersByUid: {
              ...state.usersByUid,
              [action.payload.userUid]: {
                ...state.usersByUid[action.payload.userUid],
                followers: [
                  ...state.usersByUid[action.payload.userUid].followers,
                  action.payload.newFollower,
                ],
              },
            },
          };
          case UNADD_FOLLOWER:
            return {
              ...state,
              usersByUid: {
                ...state.usersByUid,
                [action.payload.userUid]: {
                  ...state.usersByUid[action.payload.userUid],
                  followers: [
                    ...state.usersByUid[action.payload.userUid].followers.filter(user => user != action.payload.unFollower),
                  ],
                },
              },
            };
            case USER_ADD_POST:
              return {
                ...state,
                usersByUid: {
                  ...state.usersByUid,
                  [action.payload.userUid]: {
                    ...state.usersByUid[action.payload.userUid],
                    posts: [
                      ...state.usersByUid[action.payload.userUid].posts,
                      action.payload.postUid,
                    ],
                  },
                },
              };
              case UPDATE_AVATAR:
                return {
                  ...state,
                  usersByUid: {
                    ...state.usersByUid,
                    [action.payload.userUid]: {
                      ...state.usersByUid[action.payload.userUid],
                      avatar:  action.payload.avatar,
                    },
                  },
                };
              case CLEAR_USERS:
                return {
                  ...state = undefined
                };
    default:
      return state;
  }
}