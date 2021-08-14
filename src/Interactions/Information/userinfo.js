/* eslint-disable no-unused-vars */
const InteractionBase = require('../../Structures/InteractionBase');

const { Message, MessageEmbed, CommandInteraction } = require('discord.js');

module.exports = class userinfo extends InteractionBase {
	constructor(...args) {
		super(...args, {
			name: 'userinfo',
			type: 'MESSAGE',
		});
	}

	/**
   * @param {CommandInteraction} interaction
   * @param {Array} args
   */

	async run(interaction, args) {
		if (interaction.inGuild()) {
			let member = interaction.options.getMember("user")
			let user;
			if (member) {
				user = member.user;
			}
			else if (!args[0]) {
				user = interaction.user;
				member = interaction.member;
			}
			else if (!member) {
				return interaction.followUp('Please use a valid id of a user who belongs in this server.');
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
			const veryhhighrolelol = member.roles.highest.id === interaction.guild.id ? '`No roles :/`' : member.roles.highest;
			const roleswhatuserhas = roles.length < 10 ? roles.join(', ') : roles.length > 10 ? trimArray(roles).join(', ') : 'No Roles!';

			const embed = new MessageEmbed()
				.setColor('RANDOM')
				.setTitle(`${[member]} **${member.tag}'s User Information**`)
				.setImage(member.displayAvatarURL())
				.addField('**User Discriminator**', `\`#${member.discriminator}\``, true)
				.addField('**User Joined At**', `\`${new Date(member.joinedAt).toLocaleString('en-GB', { dateStyle: 'full' })}\``, true)
				.addField('**User Created At**', `\`${new Date(member.createdAt).toLocaleString('en-GB', { dateStyle: 'full' })}\``, true)
				.addField('**Bot User**', `\`${obj[member.bot]}\``, true)
				.addField('Highest Role', `${veryhhighrolelol || 'No roles :/'}`, true)
				.addField('Roles', `${roleswhatuserhas || '`No roles!`'} `, false);
			interaction.followUp({ embeds: [embed] });
		}

	}
};