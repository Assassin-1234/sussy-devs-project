const InteractionBase = require('../../Structures/InteractionBase');
const { MessageEmbed } = require('discord.js');
module.exports = class PingInteraction extends InteractionBase {
	constructor(...args) {
		super(...args, {
			name: 'ping',
			description: 'Check my ping!',
		});
	}
	/**
   * @param {Interaction} interaction
   */
	async run(interaction) {
		return interaction.reply({
			embeds: [
				new MessageEmbed()
					.setTitle('Pong!')
					.setDescription(
						[
							`API -- ${this.client.utils.codeBlock(
								Math.round(this.client.ws.ping) + 'ms',
							)}`,
						].join('\n'),
					)
					.setFooter(this.client.user.tag, this.client.user.avatarURL()),
			],
		});
	}
};
