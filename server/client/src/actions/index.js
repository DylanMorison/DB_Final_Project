import axios from 'axios';

import { FETCH_USER } from './types';

export const createUser = () => async dispatch => {
	debugger;
	const res = await axios.get('/api/login');
	dispatch({ type: FETCH_USER, payload: res.data });
};
