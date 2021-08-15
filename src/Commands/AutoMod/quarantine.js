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
					description: 'enable auto quarantine module',
					clientPerms: [Permissions.FLAGS.MANAGE_ROLES],
					devsOnly: false,
					disabled: false,
					cooldown: 3000,
				},
				{
					name: 'disable',
					aliases: ['e', 'ex'],
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
		const data = await data.findOne({ guildId: message.guild.id });
		if(data.AutoQuarantine) {
			return message.reply({
				embeds: [
					this.client.utils.ErrorEmbed(message, 'auto quarantine is already enabled'),
				],
			});
		}
		else {
			data.AutoQuarantine = true;
			data.save();
			this.client.db.cache.clear(`GUILD_${message.guild.id}`);
			return message.reply({
				embeds: [
					this.client.utils.SuccessEmbed(message, 'auto quarantine was enabled successfully'),
				],
			});
		}
	}
}

module.exports = Ping;