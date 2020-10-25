const express = require('express');
const path = require('path');
const mysql = require('mysql');
const dotenv = require('dotenv');
const hbs = require('hbs');

dotenv.config({ path: './.env' });

const app = express();

const db = mysql.createConnection({
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE
});

// __dirname gives access to current directory
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
app.set('view engine', 'hbs');

db.connect((err) => {
	if (err) console.log(err);
	console.log('Connected to the DB');
});

app.get('/', (req, res) => {
	// res.send('<h1>Home Page</h1>');
	res.render('index.hbs');
});

app.listen(5000, () => {
	console.log('server started on port 5000');
});
