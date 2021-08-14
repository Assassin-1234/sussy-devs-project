const express = require('express');
const moment = require('moment');
const Message = require('../../Schemas/logs');
const { validateGuild } = require('../modules/middleware');
const client = require('../../../index');
const log = require('../modules/audit-logs');
const logs = require('../../Utilities/Logs');
const router = express.Router();
const GuildModel = require('../../Schemas/Guilds');

router.get('/dashboard', (req, res) => {
	res.render('dashboard/index');
});

router.get('/servers/:id', validateGuild, async (req, res) => {
	async function getInfo() {
		const guild = await GuildModel.findOne({ guildId: req.params.id });
		const hourlyMessages = Message.aggregate([
			{
				$match: {
					guildID: req.params.id,
					createdAt: {
						$gte: moment(Date.now()).subtract(7, 'days').toDate(),
					},
				},
			},
			{
				$project: {
					y: { $year: '$createdAt' },
					m: { $month: '$createdAt' },
					d: { $dayOfMonth: '$createdAt' },
					h: { $hour: '$createdAt' },
				},
			},
			{
				$group: {
					_id: { year: '$y', month: '$m', day: '$d', hour: '$h' },
					count: { $sum: 1 },
				},
			},
		]);
		const messageCounts = Message.aggregate([
			{
				$match: {
					guildID: req.params.id,
					createdAt: {
						$gte: moment(Date.now()).subtract(14, 'days').toDate(),
					},
				},
			},
			{
				$group: {
					_id: {
						$dayOfWeek: '$updatedAt',
					},
					count: {
						$sum: 1,
					},
				},
			},
			{
				$sort: {
					_id: 1,
				},
			},
		]);

		const info = {
			guild: guild,
			hourlyMessages: await hourlyMessages,
			messageCounts: await messageCounts,
		};
		return info;
	}

	const data = await getInfo();
	const ownerData = await client.guilds.cache.get(req.params.id).fetchOwner();
	const owner = ownerData.user.username;

	res.render('dashboard/show', {
		savedGuild: data.guild,
		hourlyMessages: data.hourlyMessages,
		messageCounts: data.messageCounts,
		users: client.users.cache,
		owner,
		savedLog: await logs.get(req.params.id),
	});
});
router.put('/servers/:id/:module', validateGuild, async (req, res) => {
	try {
		const { id, module } = req.params;

		const guild = await GuildModel.findOne({ GuildId: req.params.id });
		if (module == 'general') {
			const settings = {};

			// Prefix
			settings.prefix = req.body.prefix;
			await guild.updateOne(settings);
		}
		await log.change(id, {
			at: new Date(),
			by: res.locals.user.id,
			module,
			new: guild[module],
			old: req.body[module],
		});
		client.db.cache.clear(`GUILD_${req.params.id}`);
		res.redirect(`/servers/${id}`);
	}
	catch (err) {
		res.render('errors/400');
		console.error(err);
	}
});

module.exports = router;
