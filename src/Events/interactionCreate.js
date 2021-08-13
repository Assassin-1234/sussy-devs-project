/* eslint-disable no-unused-vars */
// const { MessageEmbed } = require('discord.js');
const { CommandInteraction } = require('discord.js');
const Event = require('../Structures/EventBase');

module.exports = class extends Event {
	async run(interaction) {
		if (interaction.isCommand()) {
			await this.client.application?.commands
				.fetch(interaction.commandId)
				.catch(() => { });
			if (!interaction.guildId) return;
			try {
				const command = this.client.interactions.get(interaction.command?.name);
				if (!command) return;
				return await command.run(
					interaction,
					interaction?.options._options.map((value) => value.value),
				);
			}
			catch (err) {
				interaction.reply({
					content: 'Something went terribly wrong.',
					ephemeral: true,
				});
				console.log(err);
			}
		}
		if(interaction.isContextMenu()) {
			await this.client.application?.commands
				.fetch(interaction.commandId)
				.catch(() => { });
			if (!interaction.guildId) return;
			try {
				const command = this.client.interactions.get(interaction.command?.name);
				if (!command) return;
				return await command.run(
					interaction,
				);
			}
			catch (err) {
				interaction.reply({
					content: 'Something went terribly wrong.',
					ephemeral: true,
				});
				console.log(err);
			}
		}
	}
};
