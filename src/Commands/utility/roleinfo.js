/* eslint-disable no-unused-vars */
const Command = require('../../Structures/CommandBase');
const { Permissions, Message, MessageEmbed } = require('discord.js');

class roleinfo extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['ri'],
			description: 'roleinfo command',
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

	async run(message, args) {
		const role = message.mentions.roles.first();
		if (!role) return message.reply({ content: '**Please Enter A Valid Role!**' });

		const status = {
			false: 'No',
			true: 'Yes',
		};

		const roleembed = new MessageEmbed()
			.setColor('#2F3136')
			.setTitle(`Role Info: \`[  ${role.name}  ]\``)
			.setThumbnail(message.guild.iconURL())
			.addField('**ID**', `\`${role.id}\``, true)
			.addField('**Name**', role.name, true)
			.addField('**Hex**', role.hexColor, true)
			.addField('**Members**', role.members.size, true)
			.addField('**Position**', role.position, true)
			.addField('**Mentionable**', status[role.mentionable], true)
			.setFooter(message.member.displayName, message.author.displayAvatarURL(), true);
		message.reply({ embeds: [roleembed] });
	}


}

module.exports = roleinfo;