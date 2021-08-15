/* eslint-disable no-unused-vars */
const Command = require('../../Structures/CommandBase');
const { Permissions, Message, MessageEmbed } = require('discord.js');

class Ban extends Command {
	constructor(...args) {
		super(...args, {
			description: 'ban a user!!',
			category: 'moderation',
			devsOnly: false,
			disabled: false,
			cooldown: 2000,
		});
	}

	/**
   * @param {Message} message
   * @param {Array} args
   */

	async run(message, args) {
		if(!args[0]) {
			message.reply('please specify a user');
			return;
		}
		if (!message.guild.me.permissions.has('BAN_MEMBERS')) {
			message.reply({ content: 'I don\'t have the permission to do that! \n Please give me the `BAN MEMBERS ` permission !' });
			return;
		}
		if (!message.member.permissions.has('BAN_MEMBERS')) {
			message.reply({ content: 'You don\'t have the permission to do that!' });
			return;
		}
		const reason = (args.find(x => x.name === 'reason')?.value || 'No reason supplied.') + `\nModerator: ${message.author.tag} | ${message.author.id}`;
		const user = message.guild.members.cache.get(args.find(x => x.name === 'user').value);
		if (user.id === message.author.id) {
			message.reply({ content: 'I can\'t let you do that bruh 😐' });
			return;
		}
		if (user.id === this.client.user.id) {
			message.reply({ content: 'I refuse to be banned' });
			return;
		}
		const botRolePossition = message.guild.me.roles.highest.position;
		const rolePosition = message.guild.members.cache.get(user.id).roles.highest.position;
		const userRolePossition = message.member.roles.highest.position;
		if (userRolePossition <= rolePosition) {
			message.reply({ content: 'Cannot ban that member because they have roles that is higher or equal to you.' });
			return;
		}
		if (botRolePossition <= rolePosition) {
			message.reply({ content: 'Cannot ban that member because they have roles that is higher or equal to me.' });
			return;
		}
		if (!user.bannable) {
			message.reply({ content: 'I cannot ban that member. My role might not be high enough or it\'s an internal error.' });
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