/* eslint-disable no-unused-vars */
const Command = require('../../Structures/CommandBase');
const { Permissions, Message, MessageEmbed } = require('discord.js');
const { schema } = require('../../Schemas/Guilds');

class AntiCaps extends Command {
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
					name: 'threshold',
					description: 'set the anticaps threshold',
					clientPerms: [Permissions.FLAGS.EMBED_LINKS, Permissions.FLAGS.ADD_REACTIONS],
					devsOnly: false,
					disabled: false,
					cooldown: 3000,
				},
				{
					name: 'enable',
					aliases: ['on', 'yes', 'YAAAAAS'],
					description: 'enable anticaps feature',
					devsOnly: false,
					disabled: true,
					cooldown: 1000,
				},
				{
					name: 'disable',
					aliases: ['off', 'no', 'NOOOOO'],
					description: 'disable anticaps feature',
					devsOnly: false,
					disabled: false,
					cooldown: 1000,
				},
			],
		});
	}

	/**
   * @param {Message} message
   * @param {Array} args
   */

	async run(message) {
		message.channel.send('please select a subcommand');
	}
	async threshold(message, args, prefix) {
		if(!args[1]) return this.client.utils.missingArgs(this.subCommands.find(x => x.name === 'threshold'), 1, 'please provide a threshold number');
		if(isNaN(parseInt(args[1]))) return message.channel.send('threshold must be a number');
		const data = await schema.findOne({ guildId: message.guild.id });
		data.config.CapsThreshold += parseInt(args[1]);
		data.config.AntiCaps = true;
		data.save();
		this.client.db.cache.clear(`GUILD_${message.guild.id}`);
		message.reply({ embeds: [
			this.client.utils.successEmbed(message, `successfully set caps threshold to ${parseInt(args[1])}`),
		] });
	}

	/**
   * @param {Message} message
   * @param {Array} args
   */
	async enable(message, args, prefix) {
		const data = await schema.findOne({ guildId: message.guild.id });
		data.config.CapsThreshold = 10;
		data.config.AntiCaps = true;
		data.save();
		this.client.db.cache.clear(`GUILD_${message.guild.id}`);
		message.reply({ embeds: [
			this.client.utils.successEmbed(message, 'successfully enabled Anti Caps. Caps threshold set to default as `10`'),
		] });
	}
	async disable(message, args, prefix) {
		const data = await schema.findOne({ guildId: message.guild.id });
		data.config.CapsThreshold = 0;
		data.config.AntiCaps = false;
		data.save();
		this.client.db.cache.clear(`GUILD_${message.guild.id}`);
		message.reply({ embeds: [
			this.client.utils.successEmbed(message, 'successfully disabled Anti Caps. Caps threshold set to `0`'),
		] });
	}

}

module.exports = AntiCaps;