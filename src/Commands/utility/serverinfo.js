/* eslint-disable no-unused-vars */
const Command = require('../../Structures/CommandBase');
const { Permissions, Message, MessageEmbed } = require('discord.js');

class serverinfo extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['si'],
			description: 'avatar command',
			category: 'utility',
			devsOnly: false,
			disabled: false,
			cooldown: 2000,

		});
	}

	/**
   * @param {Message} message
   */

	async run(message) {
		const vanityCode = message.guild.vanityURLCode;
		let vanityInvite = `https://discord.gg/${vanityCode}`;
		if (vanityCode === null) vanityInvite = 'No custom URL';
		const roles = message.guild.roles.cache.filter(r => r.id !== message.guild.id).map(role => role.toString());
		const embed = new MessageEmbed()
			.setTimestamp()
			.setTitle('**Server Info**')
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.addField('🎫 Name of server:', message.guild.name)
			.addField('ID of server', message.guild.id)
			.addField('👑 Owner Name:', `${(await message.guild.fetchOwner()).user}`)
			.addField('👥 No. of Members', message.guild.memberCount.toString())
			.addField('🤖 No. of Bots:', message.guild.members.cache.filter(member => member.user.bot).size.toString())
			.addField('😗 Emojis:', message.guild.emojis.cache.size.toString())
			.addField('👻 Animated Emoji\'s:', message.guild.emojis.cache.filter(emoji => emoji.animated).size.toString())
			.addField('💬 No. of Text Channel\'s:', message.guild.channels.cache.filter(channel => channel.type === 'GUILD_TEXT').size.toString())
			.addField('🎤 No. of Voice Channel\'s:', message.guild.channels.cache.filter(channel => channel.type === 'GUILD_VOICE').size.toString())
			.addField('👔 Total Amount of Roles:', message.guild.roles.cache.size.toString())
			.addField('🔗 Vanity Inivte Link', `${vanityInvite}`)
			.addField('📶 Server Boost Level', message.guild.premiumTier.toString())
			.addField('🐱‍🏍 Total Server Boosts', message.guild.premiumSubscriptionCount.toString())
			.addField('🔐 Verification Level', message.guild.verificationLevel.toString())
			.addField(`Roles [${roles.length}]`, roles.length < 15 ? roles.join(' | ') : roles.length > 15 ? `${roles.slice(0, 15).join(' | ')} | \`+ ${roles.length - 15} roles...\`` : 'None')
			.setAuthor(`${message.guild.name}`);
		message.reply({ embeds: [ embed ] });
	}


}

module.exports = serverinfo;