const { response } = require("express");
const dbService = require("../dbService");

module.exports = app => {
	app.get("/auth/users", async (req, res) => {
		const db = dbService.getDbServiceInstance();
		const result = await db.getAllData();
		if (result) {
			res.send(result);
		}
	});

	app.post("/auth/register", async (req, res) => {
		const { email, password, username } = req.body;

		const db = dbService.getDbServiceInstance();
		const result = db.registerUser(email, password, username);
		res.send(result);
	});
};
