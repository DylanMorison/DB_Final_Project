import {
	ADD_POST,
	DELETE_LIKE,
	ADD_COMMENT,
	ADD_LIKE,
	ADD_EXPLORE_POST, 
	CLEAR_POSTS
} from "../actions/types";

const initialState = {
	postsByUids: {},
	allPostUids: []
};

// 	▼ POSTS	STATE LOOKS LIKE THIS ▼
// const postData = {
//   postData: {
//     title: thisPostData.title,
//     postUid: newPostUid,
//     description: thisPostData.description,
//     file: thisPostData.file,
//     thumbnail: thisPostData.thumbnail,
//     authorUid: thisPostData.authorUid,
//     timestamp: thisPostData.timestamp,
//     numLikes: thisPostData.numLikes,
//     numComments: thisPostData.numComments,
//     usersLiked: thisPostData.usersLiked,
//     comments: thisPostData.comments,
//   },
//   postUid: newPostUid,
// };

export default function (state = initialState, action) {
	switch (action.type) {
		case ADD_POST:
			return {
				...state,
				postsByUids: {
					...state.postsByUids,
					[action.payload.postUid]: { ...action.payload.postData }
				},
				allPostUids: [...state.allPostUids, action.payload.postUid]
			};

		case DELETE_LIKE:
			return {
				...state,
				postsByUids: {
					...state.postsByUids,
					[action.payload.postUid]: {
						...state.postsByUids[action.payload.postUid],
						usersLiked: [
							...state.postsByUids[
								action.payload.postUid
							].usersLiked.filter(
								(user) => user != action.payload.userLiked
							)
						]
					}
				}
			};
		case ADD_COMMENT:
			return {
				...state,
				postsByUids: {
					...state.postsByUids,
					[action.payload.postUid]: {
						...state.postsByUids[action.payload.postUid],
						comments: [
							...state.postsByUids[action.payload.postUid].comments,
							action.payload.commentData
						]
					}
				}
			};
		case ADD_LIKE:
			return {
				...state,
				postsByUids: {
					...state.postsByUids,
					[action.payload.postUid]: {
						...state.postsByUids[action.payload.postUid],
						usersLiked: [
							...state.postsByUids[action.payload.postUid].usersLiked,
							action.payload.userLiked
						]
					}
				}
			};
			case CLEAR_POSTS:
				return {
					...state = undefined,
					
				};
		default:
			return state;
	}
}
