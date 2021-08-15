/* eslint-disable no-unused-vars */
const Command = require('../../Structures/CommandBase');
const { Permissions, Message, MessageEmbed } = require('discord.js');
const schema = require('../../Schemas/Guilds');

class AntiRaid extends Command {
	constructor(...args) {
		super(...args, {
			description: 'interact with the AntiRaid module to keep your server safer!',
			category: 'AutoMod',
			devsOnly: false,
			disabled: false,
			cooldown: 2000,
			userPerms: [Permissions.FLAGS.MANAGE_GUILD],
			subCommands: [
				{
					name: 'enable',
					parent: 'antiraid',
					aliases: ['on', 'yes', 'YAAAAAS'],
					description: 'enable antiraid feature',
					devsOnly: false,
					disabled: false,
					cooldown: 1000,
				},
				{
					name: 'disable',
					parent: 'antiraid',
					aliases: ['off', 'no', 'NOOOOO'],
					description: 'disable antiraid feature',
					devsOnly: false,
					disabled: false,
					cooldown: 1000,
				},
				{
					name: 'actions',
					parent: 'antiraid',
					aliases: ['off', 'no', 'NOOOOO'],
					description: 'disable Antiraid feature',
					devsOnly: false,
					disabled: false,
					cooldown: 1000,
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

	/**
   * @param {Message} message
   * @param {Array} args
   */
	async enable(message, args, prefix) {
		const data = await schema.findOne({ guildId: message.guild.id });
		if(data.config.AntiRaid) {
			return message.reply({ embeds: [
				await this.client.utils.ErrorEmbed(message, 'antiraid module is already enabled. Disable it using `.AntiRaid disable`'),
			] });
		}
		else {
			data.config.AntiRaid = true;
			await schema.findOneAndUpdate({ guildId: message.guild.id }, data, { upset: true });
			this.client.db.cache.clear(`GUILD_${message.guild.id}`);
			message.reply({ embeds: [
				await this.client.utils.SuccessEmbed(message, 'successfully enabled antiraid.'),
			] });
		}
	}
	async disable(message, args, prefix) {
		const data = await schema.findOne({ guildId: message.guild.id });
		if(!data.config.AntiRaid) {
			return message.reply({ embeds: [
				await this.client.utils.ErrorEmbed(message, 'Anti Raid module is disabled. Enable it using `.AntiRaid enable`'),
			] });
		}
		else {
			data.config.AntiRaid = false;
			await schema.findOneAndUpdate({ guildId: message.guild.id }, data, { upset: true });
			this.client.db.cache.clear(`GUILD_${message.guild.id}`);
			message.reply({ embeds: [
				await this.client.utils.SuccessEmbed(message, 'successfully disabled Anti Raid.'),
			] });
		}
	}
	async actions(message, args, prefix) {
		const data = await schema.findOne({ guildId: message.guild.id });
		if(!args[1]) return this.client.utils.missingArgs(this.subCommands.find(x => x.name === 'actions'), 1, 'please provide an action. i.e ban/kick/mute/quarantine/delete');
		if(!['ban', 'kick', 'mute', 'quarantine'].includes(args[1].toLowerCase())) {
			return message.reply({
				embeds: [
					await this.client.utils.ErrorEmbed(message, 'please provide a value action. i.e ban/kick/mute/quarantine'),
				],
			});
		}
		else {
			data.actions.AntiRaid = args[1].toLowerCase();
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

module.exports = AntiRaid;