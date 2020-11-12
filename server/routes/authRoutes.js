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
		console.log("test")
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
		const { username, password } = req.body;
		try {
			const db = dbService.getDbServiceInstance();
			const userResult = await db.signIn(username);

			// this gets a user
			if (userResult) {
				const { user_id, username, email, fullName } = userResult[0];
				const user = { user_id, username, email, fullName };

				const userPostResult = await db.getUserPosts(user_id);

				if (userPostResult.length !== 0){
					res.send({...user, userPosts: userPostResult});
				}
				res.send({...user, userPosts: []});
			}
		} catch (err) {
			res.status(401).send("No username match");
		}
	});
};
