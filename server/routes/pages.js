const express = require('express');

const router = express.Router();

router.get('/api', (req, res) => {
	res.render('index.hbs');
});

router.get('/auth/register', (req, res) => {
	const { user } = req.body;
});

module.exports = router;
