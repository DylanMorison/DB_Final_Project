module.exports = async function (userPostResult) {
	let userPostsUids = [];
	userPostResult.map((post) => {
		userPostsUids.push(post.postUid);
		// const comments = await db.getComments(post.postUid);
		// const usersLiked = await db.getPostLikes(post.postUid);
		console.log(usersLiked);

		const postData = {
			postData: {
				title: post.title,
				postUid: post.postUid,
				description: post.description,
				file: post.post_file,
				thumbnail: post.thumbnail,
				authorUid: post.user_id,
				timestamp: post.timestamp,
				numLikes: post.numLikes,
				numComments: post.numComments,
				usersLiked: [],
				comments: []
			},
			postUid: post.postUid
		};
		postDataArray.push(postData);
	});
	return postDataArray;
};
