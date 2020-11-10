const mysql = require("mysql");
const dotenv = require("dotenv");
let instance = null;
dotenv.config({ path: "./.env" });

const connection = mysql.createConnection({
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE
});

connection.connect((err) => {
	if (err) {
		console.log(err.message);
	}

	console.log("db " + connection.state);
});

class DbService {
	static getDbServiceInstance() {
		return instance ? instance : new DbService();
	}

	async getAllData() {
		try {
			const response = await new Promise((resolve, reject) => {
				const query = "SELECT * FROM users";
				connection.query(query, (err, results) => {
					if (err) reject(new Error(err.message));
					resolve(results);
				});
			});

			console.log(response);
			return response;
		} catch (err) {
			console.log(err);
		}
	}

	async registerUser(email, password, username, fullName) {
		try {
			const insertId = await new Promise((resolve, reject) => {
				const query =
					"INSERT INTO users (user_id, username, email, user_password, fullName) VALUES (?,?,?,?,?); ";

				connection.query(
					query,
					[null, username, email, password, fullName],
					(err, result) => {
						if (err) {
							console.log(err.message);
							reject(new Error(err.message));
						}
						resolve(result.insertId);
					}
				);
			});

			return { insertId, username, email, fullName };
		} catch (err) {
			console.log(err);
		}
	}
	async signIn(username) {
		try {
			const response = await new Promise((resolve, reject) => {
				const query = "SELECT * FROM users WHERE username=?";
				connection.query(query, [username], (err, results) => {
					if (err) reject(new Error(err.message));
					resolve(results);
				});
			});

			console.log(response);
			return response;
		} catch (err) {
			console.log(err);
		}
	}
}

module.exports = DbService;
