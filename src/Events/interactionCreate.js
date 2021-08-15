/* eslint-disable no-unused-vars */
// const { MessageEmbed } = require('discord.js');
const Event = require('../Structures/EventBase');

module.exports = class extends Event {
	async run(interaction) {

		if (interaction.isCommand()) {
			await this.client.application?.commands
				.fetch(interaction.commandId)
				.catch((e) => { console.log(e);});
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
		if (interaction.isCommand()) {
			this.client.interactions.handleSlash(interaction);
		}

		if (interaction.isSelectMenu() && interaction.customId === 'HELP_CATEGORIES') {
			this.client.utils.handleHelp(interaction);
		}
	}
};
