const express = require('express');
const client = require('../../../index');

const router = express.Router();

router.get('/', (req, res) => {
	res.render('index', {
		subtitle: 'Home',
	});
});

router.get('/commands', (req, res) => {
	const commands = client.commands;
	const categories = client.commands
		.map((c) => c.category)
		.reduce((a, b) => {
			if (a.indexOf(b) < 0) a.push(b);
			return a;
		}, [])
		.sort();
	res.render('commands', {
		subtitle: 'Commands',
		categories: categories,
		commands: [...commands.values()],
	});
});

module.exports = router;
