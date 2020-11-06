import { FETCH_USERS, CREATE_USER } from "../actions/types";

const initialState = {
  people: [],
  location: "explore people",
};


export default function (state = initialState, action) {
	switch (action.type) {
		case CREATE_USER:
			return {
        ...state,
        people: [...state.people, action.payload],
      };
		default:
			return state;
	}
}
