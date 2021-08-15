const InteractionBase = require('../../Structures/InteractionBase');
const { MessageEmbed } = require('discord.js');
module.exports = class userinfo extends InteractionBase {
	constructor(...args) {
		super(...args, {
			name: 'userinfo',
			description: 'userinfo!',
			options: [
				{
					name: 'user',
					type: 'USER',
					description: 'Choose the user.',
					required: true,
				},
			],
		});
	}
	/**
   * @param {Interaction} interaction
   */
	async run(interaction, args) {


		const member = interaction.guild.members.cache.get(args[0]);


		const embed = new MessageEmbed()
			.setDescription(`<@${member.user.id}>`)
			.setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
			.setColor(0x5865F2)
			.setFooter(`ID: ${member.user.id}`)
			.setThumbnail(member.user.displayAvatarURL())
			.setTimestamp()
			.addField('__Created On__', member.user.createdAt.toLocaleString())
			.addField(`\n__Roles [${member.roles.cache.filter(r => r.id !== interaction.guild.id).map(roles => `\`${roles.name}\``).length}]__`, `${member.roles.cache.filter(r => r.id !== interaction.guild.id).map(roles => `<@&${roles.id }>`).join(' **|** ') || 'No Roles'}`);

		interaction.reply({ embeds: [ embed] });
	}
};
