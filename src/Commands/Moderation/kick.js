/* eslint-disable no-unused-vars */
const Command = require('../../Structures/CommandBase');
const { Permissions, Message, MessageEmbed } = require('discord.js');

class Kick extends Command {
	constructor(...args) {
		super(...args, {
			description: 'kick a user!!',
			category: 'Moderation',
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
		if(!args[0]) return message.reply('please specify a user');
		if (!message.guild.me.permissions.has('KICK_MEMBERS')) return message.reply({ content: 'I don\'t have the permission to do that! \n Please give me the `KICK MEMBERS ` permission !' });
		if (!message.member.permissions.has('KICK_MEMBERS')) return message.reply({ content: 'You don\'t have the permission to do that!' });
		const reason = (args.find(x => x.name === 'reason')?.value || 'No reason supplied.') + `\nModerator: ${message.user.tag} | ${message.user.id}`;
		const user = message.guild.members.cache.get(args.find(x => x.name === 'user').value);
		if (user.id === message.author.id) return message.reply({ content: 'I can\'t let you do that bruh 😐' });
		if (user.id === this.client.user.id) return message.reply({ content: 'I refuse to be kicked' });
		const botRolePossition = message.guild.me.roles.highest.position;
		const rolePosition = message.guild.members.cache.get(user.id).roles.highest.position;
		const userRolePossition = message.member.roles.highest.position;
		if (userRolePossition <= rolePosition) return message.reply({ content: 'Cannot kick that member because they have roles that is higher or equal to you.' });
		if (botRolePossition <= rolePosition) return message.reply({ content: 'Cannot kick that member because they have roles that is higher or equal to me.' });
		if (!user.kickable) {
			message.reply({ content: 'I cannot kick that member. My role might not be high enough or it\'s an internal error.' });
			return;
		}
		else {
			user.user.send({ content: `you were kicked in **${message.guild.name}** for \n reason: ${reason}` }).catch(e => {
				console.log(e);
			});
			user.kick({ reason: reason });
			message.reply({ content: `Kicked **${user.user.tag}**` });
		}
	}
}

module.exports = Kick;