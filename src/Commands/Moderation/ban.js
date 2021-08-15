/* eslint-disable no-unused-vars */
const Command = require('../../Structures/CommandBase');
const { Permissions, Message, MessageEmbed } = require('discord.js');

class Ban extends Command {
	constructor(...args) {
		super(...args, {
			description: 'ban a user!!',
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
		if (!message.guild.me.permissions.has('BAN_MEMBERS')) return message.reply({ content: 'I don\'t have the permission to do that! \n Please give me the `BAN MEMBERS ` permission !' });
		if (!message.member.permissions.has('BAN_MEMBERS')) return message.reply({ content: 'You don\'t have the permission to do that!' });
		const reason = (args.find(x => x.name === 'reason')?.value || 'No reason supplied.') + `\nModerator: ${message.user.tag} | ${message.user.id}`;
		const user = message.guild.members.cache.get(args.find(x => x.name === 'user').value);
		if (user.id === message.author.id) return message.reply('I can\'t let you do that bruh 😐');
		if (user.id === this.client.user.id) return message.reply('I refuse to be banned');
		const botRolePossition = message.guild.me.roles.highest.position;
		const rolePosition = message.guild.members.cache.get(user.id).roles.highest.position;
		const userRolePossition = message.member.roles.highest.position;
		if (userRolePossition <= rolePosition) return message.reply('Cannot ban that member because they have roles that is higher or equal to you.');
		if (botRolePossition <= rolePosition) return message.reply('Cannot ban that member because they have roles that is higher or equal to me.');
		if (!user.bannable) {
			message.reply('I cannot ban that member. My role might not be high enough or it\'s an internal error.');
			return;
		}
		else {
			user.user.send({ content: `you were banned in **${message.guild.name}** for \n reason: ${reason}` }).catch(e => {
				console.log(e);
			});
			user.ban({ reason: reason });
			message.reply({ content: `Banned **${user.user.tag}**` });
		}
	}
}

module.exports = Ban;