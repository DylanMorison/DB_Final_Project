const express = require('express');

const router = express.Router();

router.get('/api', (req, res) => {
	res.render('index.hbs');
});

router.get('/auth/register', (req, res) => {
	res.render('register.hbs');
});

module.exports = router;