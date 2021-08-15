/* eslint-disable no-unused-vars */
const Command = require('../../Structures/CommandBase');
const { Permissions, Message, MessageEmbed } = require('discord.js');

class roleinfo extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['ri'],
			description: 'roleinfo command',
			category: 'Utility',
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
		const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
		if (!role) {
			message.reply({ content: '**Please Enter A Valid Role!**' });
			return;
		}

		const status = {
			false: 'No',
			true: 'Yes',
		};

		const roleembed = new MessageEmbed()
			.setColor('#2F3136')
			.setTitle(`Role Info: \`[  ${role.name}  ]\``)
			.setThumbnail(message.guild.iconURL())
			.addField('**ID**', `\`${role.id}\``, true)
			.addField('**Name**', role.name.toString(), true)
			.addField('**Hex**', role.hexColor.toString(), true)
			.addField('**Members**', role.members.size.toString(), true)
			.addField('**Position**', role.position.toString(), true)
			.addField('**Mentionable**', status[role.mentionable].toString(), true)
			.setFooter(message.member.displayName.toString(), message.author.displayAvatarURL());
		message.reply({ embeds: [roleembed] });
	}


}

module.exports = roleinfo;