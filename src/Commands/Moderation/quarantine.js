/* eslint-disable no-unused-vars */
const Command = require('../../Structures/CommandBase');
const { Permissions, Message, MessageEmbed } = require('discord.js');
const schema = require('../../Schemas/Guilds');

class Quarantine extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['pong'],
			description: 'pong!!',
			category: 'Information',
			devsOnly: false,
			disabled: false,
			cooldown: 2000,
		});
	}

	/**
   * @param {Message} message
   * @param {Array} args
   */

	async run(message, args, prefix) {
		if(!args.length) message.reply({ content: 'please provide user mentions to quarantine' });
		const data = await schema.findOne({ guildId: message.guild.id });
		if(data.roles.quarantineRole === 'null' || !data.config.AutoQuarantine) return message.reply({ content: 'quarantine module is not enabled in this server or the role is not setup.' });
		message.mentions.members.forEach(m => {
			setTimeout(() => {
				const botRolePossition = message.guild.me.roles.highest.position;
				const rolePosition = message.guild.members.cache.get(m.id);
				const userRolePossition = message.member.roles.highest.position;
				const quarantineRolePosition = message.guild.roles.cache.get(data.roles.quarantineRole).position;
				if (userRolePossition <= rolePosition) return message.reply({ content: 'Cannot quarantine that member because they have roles that is higher or equal to you.' });
				if (botRolePossition <= rolePosition) return message.reply({ content: 'Cannot quarantine that member because they have roles that is higher or equal to me.' });
				if(quarantineRolePosition <= botRolePossition) return message.reply({ content: 'quarantine role is higher than my highest role. Cannot assign the role' });

				m.roles.cache.add(data.roles.quarantineRole);
				message.reply(`successfully quarantined ${m.user.tag}`);
			}, 1000);
		});
	}
}

module.exports = Quarantine;