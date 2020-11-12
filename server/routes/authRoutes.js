const { response } = require("express");
const dbService = require("../dbService");

module.exports = (app) => {
	app.get("/auth/users", async (req, res) => {
		const db = dbService.getDbServiceInstance();
		const result = await db.getAllData();
		if (result) {
			res.send(result);
		}
	});

	app.post("/auth/register", async (req, res) => {
		console.log("test");
		const { email, password, username, fullName } = req.body;
		try {
			const db = dbService.getDbServiceInstance();
			const result = await db.registerUser(email, password, username, fullName);

			if (result) {
				res.send(result);
			}
		} catch (err) {
			console.log(err);
		}
	});

	app.post("/auth/login", async (req, res) => {
		debugger;
		const { username, password } = req.body;
		try {
			const db = dbService.getDbServiceInstance();
			const userResult = await db.signIn(username);
			// this gets a user
			if (userResult) {
				const { user_id, username, email, fullName } = userResult[0];
				const user = { user_id, username, email, fullName };

				const userPostResult = await db.getUserPosts(user_id);

				if (userPostResult.length !== 0) {
					let userPostsUids = [];
					let postDataArray = [];
					await Promise.all(userPostResult.map(async (post) => {
						userPostsUids.push(post.postUid);
						const comments = await db.getComments(post.postUid);
						const usersLiked = await db.getPostLikes(post.postUid);

						let data = {
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
								usersLiked: usersLiked,
								comments: comments
							},
							postUid: post.postUid
						};
						postDataArray.push(data);
					}));
					res.send({ ...user, userPostsUids, postDataArray });
				} else {
					res.send(user);
				}
			}
		} catch (err) {
			res.status(401).send(
				"No username match / or eror with comments, posts or likes"
			);
		}
	});
};
