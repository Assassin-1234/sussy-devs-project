/* eslint-disable no-unused-vars */
// const { MessageEmbed } = require('discord.js');
const Event = require('../Structures/EventBase');

module.exports = class extends Event {
	async run(message) {

		const mentionRegexPrefix = RegExp(`^<@!?${this.client.user.id}> `);

		if (!message.guild || message.author.bot) return;

		const guildData = await this.client.db.findOrCreateGuild(message.guild.id);

		if (guildData.blacklist?.state === true) return;

		const customPrefix = guildData.prefix ? guildData.prefix : this.client.prefix;

		const prefix = message.content.match(mentionRegexPrefix)
			? message.content.match(mentionRegexPrefix)[0]
			: customPrefix;

		if (!message.content.startsWith(prefix)) return;

		const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);

		const command =
			this.client.commands.get(cmd.toLowerCase()) ||
			this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));
		if (command) {

			if (command.disabled) {
				message.reply({
					content: [`\`${command.name}\` is globally disabled! Please check back later.`].join('\n'),
					components: [{ type: 1, components: [{ type: 2, style: 5, label: 'Support Server', url: 'https://discord.gg/EcqW7SHWVR' }] }],
				});
				return;
			}

			if (args.length > 0 && command.subCommands) {
				const subcommand = args.slice().shift().toLowerCase();

				const foundSubcommand = command.subCommands.find((subCmd) => {
					return subCmd.name === subcommand || subCmd.aliases?.includes(subcommand);
				});

				if (foundSubcommand) {
					const check = await this.client.utils.checkCommand(message, foundSubcommand, true);
					if (check === false) return;
					return command[foundSubcommand.name](message, args, customPrefix).catch((err) => {
						message.reply({
							content: [`Something went wrong with \`${command.name}\`'s \`${foundSubcommand.name}\` subcommand 😔`].join('\n'),
							components: [{ type: 1, components: [{ type: 2, style: 5, label: 'Support Server', url: 'https://discord.gg/EcqW7SHWVR' }] }],
						});
						console.log(err);
						return;
					});
				}
			}
			const check = await this.client.utils.checkCommand(message, command);
			if (check === false) return;
			return command.run(message, args, customPrefix).catch((err) => {
				message.reply({
					content: [
						`Something went wrong with \`${command.name}\` command 😔`,
					].join('\n'),
					components: [{ type: 1, components: [{ type: 2, style: 5, label: 'Support Server', url: 'https://discord.gg/EcqW7SHWVR' }] }],
				});
				console.log(err);
				return;
			});
		}
	}
};