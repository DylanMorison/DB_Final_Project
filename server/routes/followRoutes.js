const { response } = require("express");
const dbService = require("../dbService");

module.exports = (app) => {

	app.post("/api/posts/followuser", async (req, res) => {
    const { follower_id, followee_id } = req.body;
		try {
			const db = dbService.getDbServiceInstance();
			const result = await db.followUser(follower_id, followee_id);

			if (result) {
				res.send(result);
			}
		} catch (err) {
			console.log(err);
		}
  });
  

  app.post("/api/posts/unfollowuser", async (req, res) => {
    const { follower_id, followee_id } = req.body;
		try {
			const db = dbService.getDbServiceInstance();
			const result = await db.unfollowUser(follower_id, followee_id);

			if (result) {
				res.send(result);
			}
		} catch (err) {
			console.log(err);
		}
	});

};
