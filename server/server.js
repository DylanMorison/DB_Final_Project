const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const app = express();

const db = mysql.createConnection({
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE
});

db.connect((err) => {
	if (err) console.log(err);
	console.log('Connected to the DB');

	let sql =
		'CREATE TABLE movies (id INT AUTO_INCREMENT PRIMARY KEY, movieName VARCHAR(255), movieReview VARCHAR(255))';
	db.query(sql, (err, result) => {
		if (err) throw err;
		console.log('table has been created');
	});
});

app.get('/', (req, res) => {
	res.send('<h1>Home Page</h1>');
});

app.listen(5000, () => {
	console.log('server started on port 5000');
});
