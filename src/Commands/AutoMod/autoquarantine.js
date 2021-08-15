/* eslint-disable no-unused-vars */
const Command = require('../../Structures/CommandBase');
const { Permissions, Message, MessageEmbed } = require('discord.js');
const schema = require('../../Schemas/Guilds');

class Ping extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['pong'],
			description: 'pong!!',
			category: 'automod',
			devsOnly: false,
			disabled: false,
			cooldown: 2000,
			userPerms: [Permissions.FLAGS.MANAGE_GUILD],
			subCommands: [
				{
					name: 'enable',
					description: 'enable auto quarantine module',
					clientPerms: [Permissions.FLAGS.MANAGE_ROLES],
					devsOnly: false,
					disabled: false,
					cooldown: 3000,
				},
				{
					name: 'disable',
					description: 'disable auto quarantine module',
					devsOnly: false,
					disabled: true,
					cooldown: 1000,
				},
			],
		});
	}
	async run(message, args, prefix) {
		return message.reply({
			embeds: [
				new MessageEmbed()
					.setTitle('Auto quarantine')
					.setDescription('Auto quarantine assigns a certain role to someone when they are acting sus, you can manually assign the role to someone by using the `.quarantine @member @member @member... command`')
					.setAuthor(message.author.username, message.author.avatarURL({ dynamic : true }))
					.setColor('RANDOM'),
			],
		});
	}
	async enable(message, args, prefix) {
		const data = await schema.findOne({ guildId: message.guild.id });
		if(data.config.AutoQuarantine) {
			return message.reply({
				embeds: [
					await this.client.utils.ErrorEmbed(message, 'auto quarantine is already enabled'),
				],
			});
		}
		if(!data.config.AuthoQuarantine) {
			data.config.AutoQuarantine = true;
			await schema.findOneAndUpdate({ guildId: message.guild.id }, data, { upset: true });
			this.client.db.cache.clear(`GUILD_${message.guild.id}`);
			message.reply({
				embeds: [
					await this.client.utils.SuccessEmbed(message, 'auto quarantine was enabled successfully'),
				],
			});
		}
	}
}

module.exports = Ping;