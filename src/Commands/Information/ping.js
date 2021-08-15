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
					name: 'more',
					aliases: ['m', 'mo'],
					description: 'Check bot latency',
					clientPerms: [Permissions.FLAGS.EMBED_LINKS, Permissions.FLAGS.ADD_REACTIONS],
					devsOnly: false,
					disabled: false,
					cooldown: 3000,
				},
				{
					name: 'extra',
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

	/**
   * @param {Message} message
   */

	async run(message) {
		message.reply({ content: 'Ping!' });
	}

	/**
   * @param {Message} message
   */

	async more(message) {
		const msg = await message.reply({
			embeds: [
				new MessageEmbed()
					.setTitle('pinging... 🏓'),
			],
		});
		return msg.edit({
			embeds: [
				new MessageEmbed()
					.setTitle('Pong!')
					.setDescription([
						`API -- ${this.client.utils.codeBlock(Math.round(this.client.ws.ping) + 'ms')}`,
						`Message -- ${this.client.utils.codeBlock(msg.createdTimestamp - message.createdTimestamp + 'ms')}`,
					].join('\n'))
					.setFooter(this.client.user.tag, this.client.user.avatarURL()),
			],
		});

	}

	/**
   * @param {Message} message
   * @param {Array} args
   */

	async extra(message, args) {
		return message.reply({ content: `Pong!! ${[...args]}`, allowedMentions: { parse: [] } });
	}
}

module.exports = Ping;