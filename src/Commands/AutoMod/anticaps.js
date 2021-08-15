/* eslint-disable no-unused-vars */
const Command = require('../../Structures/CommandBase');
const { Permissions, Message, MessageEmbed } = require('discord.js');
const schema = require('../../Schemas/Guilds');

class AntiCaps extends Command {
	constructor(...args) {
		super(...args, {
			description: 'interact with the anticaps module to keep your server safer!',
			category: 'AutoMod',
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
				{
					name: 'whitelist',
					parent: 'anticaps',
					usage: ['<type> <ID>'],
					description: 'whitelist a role / channel from anticaps module',
					clientPerms: [Permissions.FLAGS.EMBED_LINKS, Permissions.FLAGS.ADD_REACTIONS],
					devsOnly: false,
					disabled: false,
					cooldown: 3000,
				},
				{
					name: 'action',
					parent: 'anticaps',
					usage: ['<action>'],
					description: 'set the action which is performed on exceeding the threshold',
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
			await this.client.utils.SuccessEmbed(message, `successfully set caps threshold to ${parseInt(args[1])}`),
		] });
	}

	/**
   * @param {Message} message
   * @param {Array} args
   */
	async enable(message, args, prefix) {
		const data = await schema.findOne({ guildId: message.guild.id });
		if(data.config.AntiCaps == true) {
			return message.reply({ embeds: [
				await this.client.utils.ErrorEmbed(message, 'Anti Caps module is already enabled. Disable it using `.anticaps disable`'),
			] });
		}
		else {
			data.config.CapsThreshold = 10;
			data.config.AntiCaps = true;
			data.save();
			this.client.db.cache.clear(`GUILD_${message.guild.id}`);
			message.reply({ embeds: [
				await this.client.utils.SuccessEmbed(message, 'successfully enabled Anti Caps. Caps threshold set to default as `10`'),
			] });
		}
	}
	async disable(message, args, prefix) {
		const data = await schema.findOne({ guildId: message.guild.id });
		if(data.config.AntiCaps == false) {
			return message.reply({ embeds: [
				await this.client.utils.ErrorEmbed(message, 'Anti Caps module is disabled. Enable it using `.anticaps enable`'),
			] });
		}
		else {
			data.config.CapsThreshold = 0;
			data.config.AntiCaps = false;
			data.save();
			this.client.db.cache.clear(`GUILD_${message.guild.id}`);
			message.reply({ embeds: [
				await this.client.utils.SuccessEmbed(message, 'successfully disabled Anti Caps. Caps threshold set to `0`'),
			] });
		}
	}
	async whitelist(message, args, prefix) {
		const data = await schema.findOne({ guildId: message.guild.id });
		if(data.config.AntiCaps == false) {
			return message.reply({ embeds: [
				await this.client.utils.ErrorEmbed(message, 'Anti Caps module is disabled. Enable it using `.anticaps enable`'),
			] });
		}
		if(!args[1]) return this.client.utils.missingArgs(this.subCommands.find(x => x.name === 'whitelist'), 1, 'please provide a type. i.e role / channel');

		if(args[1].toLowerCase() === 'role') {
			if(!args[2]) return this.client.utils.missingArgs(this.subCommands.find(x => x.name === 'whitelist'), 2, 'please provide role / channel ID');
			const role = message.guild.roles.cache.get(args[2]);
			if(!role) {
				return message.reply({
					embeds: [
						await this.client.utils.ErrorEmbed(message, 'role ID is not valid'),
					],
				});
			}
			if(role) data.whitelists.CapsThreshold.roles.push(role.id);
		}
		if(args[1].toLowerCase() === 'channel') {
			if(!args[2]) return this.client.utils.missingArgs(this.subCommands.find(x => x.name === 'whitelist'), 2, 'please provide role / channel ID');
			const channel = message.guild.channels.cache.get(args[2]);
			if(!channel) {
				return message.reply({
					embeds: [
						await this.client.utils.ErrorEmbed(message, 'channel ID is not valid'),
					],
				});
			}
			if(channel) data.whitelists.CapsThreshold.channels.push(channel.id);
		}
		data.save();
		this.client.db.cache.clear(`GUILD_${message.guild.id}`);
	}
	async actions(message, args, prefix) {
		const data = await schema.findOne({ guildId: message.guild.id });
		if(!args[1]) return this.client.utils.missingArgs(this.subCommands.find(x => x.name === 'actions'), 1, 'please provide an action. i.e ban/kick/mute/quarantine/delete');
		if(!['ban', 'kick', 'mute', 'quarantine', 'delete'].includes(args[1].toLowerCase())) {
			return message.reply({
				embeds: [
					await this.client.utils.ErrorEmbed(message, 'please provide a value action. i.e ban/kick/mute/quarantine/delete'),
				],
			});
		}
		else {
			data.actions.AntiCaps = args[1].toLowerCase();
			this.client.db.cache.clear(`GUILD_${message.guild.id}`);
			message.reply({
				embeds: [
					await this.client.utils.SuccessEmbed(message, `successfully changed the action to ${args[1].toLowerCase()}`),
				],
			});
		}
	}

}

module.exports = AntiCaps;