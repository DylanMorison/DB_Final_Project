import { combineReducers } from "redux";
import usersReducer from "./usersReducer";
import userAuthReducer from "./userAuthReducer";
import postsReducer from "./postsReducer"

export default combineReducers({
	auth: userAuthReducer,
	users: usersReducer,
	posts: postsReducer
});
