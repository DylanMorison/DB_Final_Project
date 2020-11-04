import { combineReducers } from "redux";
import usersReducer from "./usersReducer";
import userAuthReducer from "./userAuthReducer";
import homePostsReducer from "./homePostsReducer"

export default combineReducers({
	auth: userAuthReducer,
	users: usersReducer,
	homePosts: homePostsReducer
});
