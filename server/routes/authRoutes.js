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
			const result = await db.signIn(username);

			if (result) {
				const { user_id, username, email, fullName } = result[0];
				const user = { user_id, username, email, fullName };
				res.send(user);
			}
		} catch (err) {
			res.status(401).send("No username match");
		}
	});
};
