import { combineReducers } from "redux";
import usersReducer from "./usersReducer";
import userAuthReducer from "./userAuthReducer";

export default combineReducers({
	auth: userAuthReducer,
	users: usersReducer
});
