import axios from "axios";
import { CREATE_USER, FETCH_USERS } from "./types";

export const createUser = (userData) => async dispatch => {

	const res = await axios.post("/auth/register", userData);
	console.log(res);
	dispatch({ type: CREATE_USER, payload: res.data });
};

export const getAllUsers = () => async dispatch => {
	const res = await axios.get("/auth/users");
	dispatch({ type: FETCH_USERS, payload: res.data });
};
