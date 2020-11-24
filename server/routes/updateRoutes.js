const { response } = require("express");
const dbService = require("../dbService");

module.exports = (app) => {




	app.post("/api/posts/updatedata", async (req, res) => {
    const { username, postUids, homeUids, exploreUids} = req.body;
    
		try {
			const db = dbService.getDbServiceInstance();
			const userResult = await db.signIn(username);
			const topPostQuery = await db.getTopPost();
			const topPost = topPostQuery[0].postUid
			// this gets a user
			if (userResult) {
				const { user_id, username, email, fullName } = userResult[0];
				const userFollowersQuery = await db.getUsersFollowers(user_id);
				const userFollowingQuery = await db.getUsersFollowing(user_id);
				let userFollowers = [];
				userFollowersQuery.map((follower) => {
					userFollowers.push(follower.followee_id);
				});
				let userFollowing = [];
				userFollowingQuery.map((follower) => {
					userFollowing.push(follower.followee_id);
				});
				const user = {
					user_id,
					username,
					email,
					fullName,
					userFollowers,
					userFollowing, 
					// avatar
				};
				const userPostResult = await db.getUserPosts(user_id);
				const allPosts = await db.getAllPosts();
				const homeFollowers = await db.getUsersFollowing(user_id);
				let homeFollowerCheck = [];
				let homePosts;
				let userHomePostsUids = [];
				let homePostArray = [];

				if (homeFollowers.length !== 0) {
					let followerIDs = [];
					let homeQuery = `SELECT * FROM posts AS p WHERE user_id=${user_id}`;
					let increment = 0;
					let tempString;
					homeFollowers.map((follower) => {
						homeFollowerCheck.push(follower.followee_id);
								tempString = ` OR user_id=${follower.followee_id}`;
								homeQuery = homeQuery.concat(tempString);
								followerIDs.push(follower.followee_id);

					});
					orderString = ` ORDER BY timestamp`;
					homeQuery = homeQuery.concat(orderString); 
					homePosts = await db.getUserHomePosts(followerIDs, homeQuery);

					await Promise.all(
						homePosts.map(async (post) => {
							userHomePostsUids.push(post.postUid);
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
							homePostArray.push(data);
						})
					);
				}

				if (allPosts.length !== 0) {
					let userPostsUids = [];
					let postDataArray = [];
					await Promise.all(
						allPosts.map(async (post) => {
							userPostsUids.push(post.postUid);
							const comments = await db.getComments(post.postUid);
							const usersLiked = await db.getPostLikes(post.postUid);
							let usersLikedArray = []
							usersLiked.map((user) => {
								usersLikedArray.push(user.user_id)
							})

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
									usersLiked: usersLikedArray,
									comments: comments
								},
								postUid: post.postUid
							};
							postDataArray.push(data);
						})
					);
					const nonFollowers = await db.getNonFollowers(user_id);
					let followerIDs = [];
					let exploreQuery = `SELECT * FROM posts AS p WHERE`;
					let increment = 0;
					let tempString;
					nonFollowers.map((nonFollower) => {
						switch (increment) {
							case 0:
								tempString = ` user_id=${nonFollower.followee_id}`;
								exploreQuery = exploreQuery.concat(tempString);
								followerIDs.push(nonFollower.followee_id);
								increment = 1;
								break;
							case 1:
								tempString = ` OR user_id=${nonFollower.followee_id}`;
								exploreQuery = exploreQuery.concat(tempString);
								followerIDs.push(nonFollower.followee_id);
						}
					});
					const explorePosts = await db.getUserExplorePosts(
						followerIDs,
						exploreQuery
					);

					let userExplorePostsUids = [];
					let explorePostArray = [];

					await Promise.all(
						explorePosts.map(async (post) => {
							if (post.user_id === user_id) return;
							if (homeFollowerCheck.includes(post.user_id)) return;
							userExplorePostsUids.push(post.postUid);
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
							explorePostArray.push(data);
						})
					);

					const users = await db.getAllUsers();

					let userData = [];
					let userUids = [];
					await Promise.all(
						users.map(async (tempUser) => {
							userUids.push(tempUser.user_id);
							//db call here for followers, following, and posts
							let following = [];
							let followers = [];
							let posts = [];
							const usersFollowing = await db.getUsersFollowing(
								tempUser.user_id
							);
							if (usersFollowing.length > 0) {
								usersFollowing.forEach((user) => {
									following.push(user.followee_id);
								});
							}
							const usersFollowers = await db.getUsersFollowers(
								tempUser.user_id
							);
							if (usersFollowers.length > 0) {
								usersFollowers.forEach((user) => {
									followers.push(user.follower_id);
								});
							}
							const userPosts = await db.getUserPostIds(tempUser.user_id);
							if (userPosts.length > 0) {
								userPosts.forEach((post) => {
									posts.push(post.postUid);
								});
							}
							// const userPosts = await db.getUserPostIds();
							const data = {
								userData: {
									username: tempUser.username,
									email: tempUser.email,
									userUid: tempUser.user_id,
									fullName: tempUser.fullName,
									followers: followers, //right here populate w users followers
									following: following, //right here populate w users fololwing
									posts: posts, //right here populate w users posts, 
									avatar: tempUser.avatar
								},
								userUid: tempUser.user_id
							};
							userData.push(data);
						})
					);
					//right here query for most popular


					res.send({
						...user,
						userPostsUids,
						postDataArray,
						userExplorePostsUids,
						userHomePostsUids,
						userData,
						userUids,
						userPostResult,
						topPost
					});
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





