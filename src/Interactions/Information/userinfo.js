/* eslint-disable no-unused-vars */
const Command = require('../../Structures/CommandBase');
const { Message, MessageEmbed } = require('discord.js');

module.exports = class Ping extends Command {
	constructor(...args) {
		super(...args, {
			name: 'userinfo',
			type: 'MESSAGE',
		});
	}

	/**
   * @param {Message} message
   * @param {Array} args
   */

	async run(message, args) {
		let member = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
		let user;
		if (member) {
			user = member.user;
		}
		else if (!args[0]) {
			user = message.author;
			member = message.member;
		}
		else if (!member) {
			return message.channel.send('Please use a valid id of a user who belongs in this server.');
		}


		const obj = { false: 'No', true: 'Yes' };
		const roles = member.roles.cache
			.sort((a, b) => b.position - a.position)
			.map(role => role.toString())
			.slice(0, -1);
		const trimArray = (arr, maxLen = 10) => {
			if (arr.length > maxLen) {
				const len = arr.length - maxLen;
				arr = arr.slice(0, maxLen);
				arr.push(` and ${len} more role(s)...`);
			}
			return arr;
		};
		const veryhhighrolelol = member.roles.highest.id === message.guild.id ? '`No roles :/`' : member.roles.highest;
		const roleswhatuserhas = roles.length < 10 ? roles.join(', ') : roles.length > 10 ? trimArray(roles).join(', ') : 'No Roles!';

		const embed = new MessageEmbed()
			.setColor('RANDOM')
			.setTitle(`${[member]} **${member.user.tag}'s User Information**`)
			.setImage(member.user.displayAvatarURL())
			.addField('**User Nickname**', `\`${member.displayName}\``, true)
			.addField('**User Discriminator**', `\`#${member.user.discriminator}\``, true)
			.addField('**User Joined At**', `\`${new Date(member.joinedAt).toLocaleString('en-GB', { dateStyle: 'full' })}\``, true)
			.addField('**User Created At**', `\`${new Date(member.user.createdAt).toLocaleString('en-GB', { dateStyle: 'full' })}\``, true)
			.addField('**Bot User**', `\`${obj[member.user.bot]}\``, true)
			.addField('Highest Role', `${veryhhighrolelol || 'No roles :/'}`, true)
			.addField('Roles', `${roleswhatuserhas || '`No roles!`'} `, false);
		message.channel.send({ embeds: [embed] });
	}
};