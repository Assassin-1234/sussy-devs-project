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
					name: 'whitelist',
					aliases: ['w', 'wl'],
					usage: ['<channel/role/link>'],
					parent: 'guildconf',
					description: 'whitelist a specific channel / role / link',
					clientPerms: [Permissions.FLAGS.EMBED_LINKS, Permissions.FLAGS.ADD_REACTIONS],
					devsOnly: false,
					disabled: false,
					cooldown: 3000,
				},
				{
					name: 'module',
					aliases: ['m', 'mod'],
					description: 'emable a module',
					usage: ['<module>]'],
					parent: 'guildconf',
					clientPerms: [Permissions.FLAGS.EMBED_LINKS, Permissions.FLAGS.ADD_REACTIONS],
					devsOnly: false,
					disabled: false,
					cooldown: 1000,
				},
				{
					name: 'actions',
					aliases: ['a', 'act'],
					description: 'set actions for modules',
					parent: 'guildconf',
					clientPerms: [Permissions.FLAGS.EMBED_LINKS, Permissions.FLAGS.ADD_REACTIONS],
					devsOnly: false,
					disabled: false,
					cooldown: 3000,
				},
			],
		});
	}

	/**
   * @param {Message} message
   * @param {Array} args
   */

	async run(message) {
		// message.reply({ content: 'Ping!' });
	}
}

module.exports = Ping;