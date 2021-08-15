const InteractionBase = require('../../Structures/InteractionBase');
const { MessageEmbed, CommandInteraction } = require('discord.js');
module.exports = class serverinfo extends InteractionBase {
	constructor(...args) {
		super(...args, {
			name: 'serverinfo',
			description: 'Get serverinfo!',
		});
	}
	/**
   * @param {CommandInteraction} interaction
   */
	async run(interaction) {

		const vanityCode = interaction.guild.vanityURLCode;
		let vanityInvite = `https://discord.gg/${vanityCode}`;
		if (vanityCode === null) vanityInvite = 'No custom URL';
		const roles = interaction.guild.roles.cache.filter(r => r.id !== interaction.guild.id).map(role => role.toString());
		const embed = new MessageEmbed()
			.setTimestamp()
			.setTitle('**Server Info**')
			.setThumbnail(interaction.guild.iconURL({ dynamic: true }))
			.addField('🎫 Name of server:', interaction.guild.name)
			.addField('ID of server', interaction.guild.id)
			.addField('👑 Owner Name:', `${(await interaction.guild.fetchOwner()).user}`)
			.addField('👥 No. of Members', interaction.guild.memberCount.toString())
			.addField('🤖 No. of Bots:', interaction.guild.members.cache.filter(member => member.user.bot).size.toString())
			.addField('😗 Emojis:', interaction.guild.emojis.cache.size.toString())
			.addField('👻 Animated Emoji\'s:', interaction.guild.emojis.cache.filter(emoji => emoji.animated).size.toString())
			.addField('💬 No. of Text Channel\'s:', interaction.guild.channels.cache.filter(channel => channel.type === 'GUILD_TEXT').size.toString())
			.addField('🎤 No. of Voice Channel\'s:', interaction.guild.channels.cache.filter(channel => channel.type === 'GUILD_VOICE').size.toString())
			.addField('👔 Total Amount of Roles:', interaction.guild.roles.cache.size.toString())
			.addField('🔗 Vanity Inivte Link', `${vanityInvite}`)
			.addField('📶 Server Boost Level', interaction.guild.premiumTier.toString())
			.addField('🐱‍🏍 Total Server Boosts', interaction.guild.premiumSubscriptionCount.toString())
			.addField('🔐 Verification Level', interaction.guild.verificationLevel.toString())
			.addField(`Roles [${roles.length}]`, roles.length < 15 ? roles.join(' | ') : roles.length > 15 ? `${roles.slice(0, 15).join(' | ')} | \`+ ${roles.length - 15} roles...\`` : 'None')
			.setAuthor(`${interaction.guild.name}`);
		interaction.reply({ embeds: [ embed ] });


	}
};
