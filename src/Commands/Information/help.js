/* eslint-disable no-unused-vars */
const Command = require('../../Structures/CommandBase');
const { Permissions, Message, MessageEmbed } = require('discord.js');

class help extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['h', 'commands'],
			description: 'Help command, with all the commands',
			category: 'Information',
			devsOnly: false,
			disabled: false,
			cooldown: 2000,
			subCommands: [
				{
					name: 'activities',
					description: 'The activities help!',
					clientPerms: [Permissions.FLAGS.EMBED_LINKS, Permissions.FLAGS.ADD_REACTIONS],
					devsOnly: false,
					disabled: false,
					cooldown: 3000,
				},
				{
					name: 'automod',
					description: 'auto mod help!',
					clientPerms: [Permissions.FLAGS.EMBED_LINKS, Permissions.FLAGS.ADD_REACTIONS],
					devsOnly: false,
					disabled: false,
					cooldown: 3000,
				},
				{
					name: 'image',
					description: 'Image help!',
					clientPerms: [Permissions.FLAGS.EMBED_LINKS, Permissions.FLAGS.ADD_REACTIONS],
					devsOnly: false,
					disabled: false,
					cooldown: 3000,
				},
				{
					name: 'moderation',
					description: 'Moderation help!',
					clientPerms: [Permissions.FLAGS.EMBED_LINKS, Permissions.FLAGS.ADD_REACTIONS],
					devsOnly: false,
					disabled: false,
					cooldown: 3000,
				},
				{
					name: 'settings',
					description: 'Settings help!',
					clientPerms: [Permissions.FLAGS.EMBED_LINKS, Permissions.FLAGS.ADD_REACTIONS],
					devsOnly: false,
					disabled: false,
					cooldown: 3000,
				},
				{
					name: 'utility',
					description: 'Utility help!',
					clientPerms: [Permissions.FLAGS.EMBED_LINKS, Permissions.FLAGS.ADD_REACTIONS],
					devsOnly: false,
					disabled: false,
					cooldown: 3000,
				},
			],
		});
	}

	/**
   * @param {Message} message
   */

	async run(message) {
		const prefix = process.env.TOKEN;
		const helpEmbed = new MessageEmbed()
			.setTitle('Hi, welcome to the help page!')
            .setDescription(`For more information, use \`${prefix}help {command}\``)
            .addField('Activities ⚽️', `${prefix}help activities`, true)
            .addField('Automod 🔐', `${prefix}help automod`, true)
            .addField('Image 🖼️', `${prefix}help image`, true)
            .addField('Moderation 🛡️', `${prefix}help moderation`, true)
            .addField('Settings ⚙️', `${prefix}help settings`, true)
            .addField('Utility 🛠️', `${prefix}help utility`, true)
            .setColor('RANDOM');
            


		message.reply({ embeds: [helpEmbed] });
	}

	/**
   * @param {Message} message
   */

	async activities(message) {
		
	}

	/**
   * @param {Message} message
   * @param {Array} args
   */

	async extra(message, args) {
		return message.reply({ content: `Pong!! ${[...args]}`, allowedMentions: { parse: [] } });
	}
}

module.exports = help;