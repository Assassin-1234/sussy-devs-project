/* eslint-disable no-unused-vars */
const { Permissions, Intents } = require('discord.js');

module.exports = {
	token: process.env.TOKEN,
	prefix: process.env.PREFIX,
	developers: process.env.DEVS,
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
	],
	defaultClientPerms: [
		Permissions.FLAGS.SEND_MESSAGES,
		Permissions.FLAGS.EMBED_LINKS,
		Permissions.FLAGS.VIEW_CHANNEL,
		Permissions.FLAGS.READ_MESSAGE_HISTORY,
	],
	devMode: true,
	dashboard: process.env.DASHBOARD_URL,
	port: process.env.PORT || 3000,
	id: process.env.BOT_ID,
	secret: process.env.BOT_SECRET,
};
