/* eslint-disable no-unused-vars */
const Command = require('../../Structures/CommandBase');
const { Permissions, Message, MessageEmbed } = require('discord.js');
const schema = require('../../Schemas/Guilds');

class AntiLinks extends Command {
	constructor(...args) {
		super(...args, {
			description: 'interact with the antilinks module to keep your server safer!',
			category: 'automod',
			devsOnly: false,
			disabled: false,
			cooldown: 2000,
			userPerms: [Permissions.FLAGS.MANAGE_GUILD],
			subCommands: [
				{
					name: 'enable',
					parent: 'antilinks',
					aliases: ['on', 'yes', 'YAAAAAS'],
					description: 'enable antilinks feature',
					devsOnly: false,
					disabled: false,
					cooldown: 1000,
				},
				{
					name: 'disable',
					parent: 'antilinks',
					aliases: ['off', 'no', 'NOOOOO'],
					description: 'disable antilinks feature',
					devsOnly: false,
					disabled: false,
					cooldown: 1000,
				},
				{
					name: 'whitelist',
					parent: 'antilinks',
					usage: ['<type> <ID>'],
					description: 'whitelist a role / channel from AntiLinks module',
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
		message.channel.send({
			embeds: [
				new MessageEmbed().setTitle('Anti links').setDescription('Anti links detects any links posted in any channels and performs the action selected. \n \n use `.help antilinks` to view the subcommands').setAuthor(message.author.username, message.author.avatarURL({ dynamic: true })).setColor('RANDOM'),
			],
		});
	}

	/**
   * @param {Message} message
   * @param {Array} args
   */
	async enable(message, args, prefix) {
		const data = await schema.findOne({ guildId: message.guild.id });
		if(data.config.AntiLinks) {
			return message.reply({ embeds: [
				await this.client.utils.ErrorEmbed(message, 'Anti Links module is already enabled. Disable it using `.antilinks disable`'),
			] });
		}
		else {
			data.config.AntiLinks = true;
			await schema.findOneAndUpdate({ guildId: message.guild.id }, data, { upset: true });
			this.client.db.cache.clear(`GUILD_${message.guild.id}`);
			message.reply({ embeds: [
				await this.client.utils.SuccessEmbed(message, 'successfully enabled AntiLinks.'),
			] });
		}
	}
	async disable(message, args, prefix) {
		const data = await schema.findOne({ guildId: message.guild.id });
		if(!data.config.AntiLinks) {
			return message.reply({ embeds: [
				await this.client.utils.ErrorEmbed(message, 'Anti Links module is disabled. Enable it using `.antilinks enable`'),
			] });
		}
		else {
			data.config.AntiLinks = false;
			await schema.findOneAndUpdate({ guildId: message.guild.id }, data, { upset: true });
			this.client.db.cache.clear(`GUILD_${message.guild.id}`);
			message.reply({ embeds: [
				await this.client.utils.SuccessEmbed(message, 'successfully disabled Anti Links.'),
			] });
		}
	}
	async whitelist(message, args, prefix) {
		const data = await schema.findOne({ guildId: message.guild.id });
		if(!data.config.AntiLinks) {
			return message.reply({ embeds: [
				await this.client.utils.ErrorEmbed(message, 'Anti Links module is disabled. Enable it using `.antilinks enable`'),
			] });
		}
		if(!args[1]) return this.client.utils.missingArgs(message, 'please provide a type. i.e role / channel');

		if(args[1].toLowerCase() === 'role') {
			if(!args[2]) return this.client.utils.missingArgs(message, 'please provide role / channel ID');
			const role = message.guild.roles.cache.get(args[2]);
			if(!role) {
				return message.reply({
					embeds: [
						await this.client.utils.ErrorEmbed(message, 'role ID is not valid'),
					],
				});
			}
			if(role) data.whitelists.AntiLinks.roles.push(role.id);
		}
		if(args[1].toLowerCase() === 'channel') {
			if(!args[2]) return this.client.utils.missingArgs(message, 'please provide role / channel ID');
			const channel = message.guild.channels.cache.get(args[2]);
			if(!channel) {
				return message.reply({
					embeds: [
						await this.client.utils.ErrorEmbed(message, 'channel ID is not valid'),
					],
				});
			}
			if(channel) data.whitelists.AntiLinks.channels.push(channel.id);
		}
		await schema.findOneAndUpdate({ guildId: message.guild.id }, data, { upset: true });
		this.client.db.cache.clear(`GUILD_${message.guild.id}`);
	}
	async actions(message, args, prefix) {
		const data = await schema.findOne({ guildId: message.guild.id });
		if(!args[1]) return this.client.utils.missingArgs(message, 'please provide an action. i.e ban/kick/mute/quarantine/delete');
		if(!['ban', 'kick', 'mute', 'quarantine'].includes(args[1].toLowerCase())) {
			return message.reply({
				embeds: [
					await this.client.utils.ErrorEmbed(message, 'please provide a value action. i.e ban/kick/mute/quarantine'),
				],
			});
		}
		else {
			data.actions.AntiLinks = args[1].toLowerCase();
			await schema.findOneAndUpdate({ guildId: message.guild.id }, data, { upset: true });
			this.client.db.cache.clear(`GUILD_${message.guild.id}`);
			message.reply({
				embeds: [
					await this.client.utils.SuccessEmbed(message, `successfully changed the action to ${args[1].toLowerCase()}`),
				],
			});
		}
	}

}

module.exports = AntiLinks;