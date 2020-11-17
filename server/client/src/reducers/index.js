import { combineReducers } from "redux";
import usersReducer from "./usersReducer";
import userAuthReducer from "./userAuthReducer";
import postsReducer from "./postsReducer";
import explorePostsReducer from "./explorePostsReducer";
import homePostsReducer from "./homePostsReducer";

export default combineReducers({
	auth: userAuthReducer,
	users: usersReducer,
	posts: postsReducer,
	explorePosts: explorePostsReducer,
	homePosts: homePostsReducer
});
