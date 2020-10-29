import axios from "axios";
import { FETCH_USER, FETCH_USERS } from "./types";

export const createUser = () => async dispatch => {
	const testUser = {
		email: "test@test.com",
		password: "password",
		username: "username"
	};
	const res = await axios.post("/auth/register", testUser);
	console.log(res);
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const getAllUsers = () => async dispatch => {
	const res = await axios.get("/auth/users");
	dispatch({ type: FETCH_USERS, payload: res.data });
};
