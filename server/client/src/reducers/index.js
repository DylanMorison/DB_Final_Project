import { combineReducers } from "redux";
import usersReducer from "./usersReducer";
import userAuthReducer from "./userAuthReducer";
import postsReducer from "./postsReducer";
import explorePostsReducer from "./explorePostsReducer";
import homePostsReducer from "./homePostsReducer";
import topPostReducer from "./topPostReducer";
import { USER_LOGIN, USER_LOGOUT , DESTROY_SESSION} from "../actions/types";

export const appReducer = combineReducers({
  auth: userAuthReducer,
  users: usersReducer,
  posts: postsReducer,
  explorePosts: explorePostsReducer,
  homePosts: homePostsReducer,
  topPost: topPostReducer
});

export const rootReducer = (state, action) => {
  if (action.type === DESTROY_SESSION) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
