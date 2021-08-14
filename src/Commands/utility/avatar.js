/* eslint-disable no-unused-vars */
const Command = require('../../Structures/CommandBase');
const { Permissions, Message, MessageEmbed } = require('discord.js');

class avatar extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['avatar'],
			description: 'avatar command',
			category: 'utility',
			devsOnly: false,
			disabled: false,
			cooldown: 2000,

		});
	}

	/**
   * @param {Message} message
   * @param {Array} args
   */

	async run(message) {
		const user = message.author || message.member.mentions.first();
		const png = user.displayAvatarURL({ dynamic: false, format: 'png' });
		const jpg = user.displayAvatarURL({ dynamic: false, format: 'jpg' });
		const gif = user.displayAvatarURL({ dynamic: true });

		const avatarembedd = new MessageEmbed()
			.setTitle(`${user.username}'s avatar`)
			.setDescription(`**[png](${png}) | [jpg](${jpg}) | [gif](${gif})**` || `**[png](${png}) | [jpg](${jpg})**`)
			.setImage(gif || png);

		message.reply({ embeds: [avatarembedd] });
	}


}

module.exports = avatar;