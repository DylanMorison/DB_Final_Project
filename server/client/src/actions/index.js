import axios from "axios";

import { FETCH_USER } from "./types";

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
