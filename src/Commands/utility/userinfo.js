/* eslint-disable no-unused-vars */
const Command = require('../../Structures/CommandBase');
const { Permissions, Message, MessageEmbed } = require('discord.js');

class userinfo extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['ui'],
			description: 'userinfo command',
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

		const permissions = [];
		let acknowledgements = 'None';


		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;


		if(member.permissions.has('KICK_MEMBERS')) {
			permissions.push('Kick Members');
		}

		if(member.permissions.has('BAN_MEMBERS')) {
			permissions.push('Ban Members');
		}

		if(member.permissions.has('ADMINISTRATOR')) {
			permissions.push('Administrator');
		}

		if(member.permissions.has('MANAGE_MESSAGES')) {
			permissions.push('Manage Messages');
		}

		if(member.permissions.has('MANAGE_CHANNELS')) {
			permissions.push('Manage Channels');
		}

		if(member.permissions.has('MENTION_EVERYONE')) {
			permissions.push('Mention Everyone');
		}

		if(member.permissions.has('MANAGE_NICKNAMES')) {
			permissions.push('Manage Nicknames');
		}

		if(member.permissions.has('MANAGE_ROLES')) {
			permissions.push('Manage Roles');
		}

		if(member.permissions.has('MANAGE_WEBHOOKS')) {
			permissions.push('Manage Webhooks');
		}

		if(member.permissions.has('MANAGE_EMOJIS_AND_STICKERS')) {
			permissions.push('Manage Emojis and stickers');
		}

		if(permissions.length == 0) {
			permissions.push('No Key Permissions Found');
		}

		if(member.user.id == message.guild.ownerId) {
			acknowledgements = 'Server Owner';
		}


		const embed = new MessageEmbed()
			.setDescription(`<@${member.user.id}>`)
			.setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
			.setColor(0x5865F2)
			.setFooter(`ID: ${message.author.id}`)
			.setThumbnail(member.user.displayAvatarURL())
			.setTimestamp()
			.addField('__Created On__', member.user.createdAt.toLocaleString())
			.addField(`\n__Roles [${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}]__`, `${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id }>`).join(' **|** ') || 'No Roles'}`)
			.addField('\n__Acknowledgements:__ ', `${acknowledgements}`)
			.addField('\n__Permissions:__ ', `${permissions.join(' | ')}`);

		message.reply({ embeds: [ embed] });
	}


}

module.exports = userinfo;