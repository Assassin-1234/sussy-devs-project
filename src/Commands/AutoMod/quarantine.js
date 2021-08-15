/* eslint-disable no-unused-vars */
const Command = require('../../Structures/CommandBase');
const { Permissions, Message, MessageEmbed } = require('discord.js');

class Ping extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['pong'],
			description: 'pong!!',
			category: 'Information',
			devsOnly: false,
			disabled: false,
			cooldown: 2000,
			subCommands: [
				{
					name: 'enable',
					aliases: ['m', 'mo'],
					description: 'Check bot latency',
					clientPerms: [Permissions.FLAGS.EMBED_LINKS, Permissions.FLAGS.ADD_REACTIONS],
					devsOnly: false,
					disabled: false,
					cooldown: 3000,
				},
				{
					name: 'disable',
					aliases: ['e', 'ex'],
					description: 'Something Extra',
					usage: ['[message]'],
					devsOnly: false,
					disabled: true,
					cooldown: 1000,
				},
			],
		});
	}
}

module.exports = Ping;