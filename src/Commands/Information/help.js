/* eslint-disable no-unused-vars */
const Command = require('../../Structures/CommandBase');
const { Permissions, Message, MessageEmbed, MessageSelectMenu, MessageActionRow } = require('discord.js');

class Help extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['h'],
			description: 'View command or subcommand help',
			category: 'information',
			usage: ['[command]', '[command subcommand]'],
			devsOnly: false,
			disabled: false,
			cooldown: 2000,
		});
	}

	/**
     * @param {Message} message
     * @param {Array} args
     */

	async run(message, args, prefix) {
		if (args?.length) {

			const command =
                this.client.commands.get(args[0].toLowerCase()) ||
                this.client.commands.get(this.client.aliases.get(args[0].toLowerCase()));

			if (!command) return message.reply({ content: `Command \`${args[0].toLowerCase()}\` doesn't exist` });

			if (args.length > 1 && command.subCommands) {
				const subcommand = args.slice(1).toString().toLowerCase();

				const foundSubcommand = command.subCommands.find((cmd) => {
					return cmd.name === subcommand || cmd.aliases?.includes(subcommand);
				});

				if (!foundSubcommand) return message.reply({ content: `Subcommand \`${subcommand}\` doesn't exist` });

				const helpEmbed = new MessageEmbed()
					.setTitle('Subcommand Help ↷')
					.addField('Name', `\`${foundSubcommand.name}\``, false)
					.addField('Description', `\`${foundSubcommand.description}\``, false);

				if (foundSubcommand.aliases) {helpEmbed.addField('Aliases', `\`${foundSubcommand.aliases.join(', ')}\``, false);}
				if (foundSubcommand.cooldown) {helpEmbed.addField('Cooldown', `\`${foundSubcommand.cooldown / 1000} Seconds\``, false);}
				if (foundSubcommand.usage) {helpEmbed.addField('Usage', `\`${foundSubcommand.usage.join(', ')}\``, false);}

				return message.reply({
					embeds: [helpEmbed],
				});

			}
			else {
				const helpEmbed = new MessageEmbed()
					.setTitle('Command Help ↷')
					.addField('Name', `\`${command.name}\``, false)
					.addField('Description', `\`${command.name}\``, false);
				if (command.subCommands) {helpEmbed.addField('Subcommands', `\`${command.subCommands.map(cmd => cmd.name).join(', ')}\``, false);}
				if (command.aliases) {helpEmbed.addField('Aliases', `\`${command.aliases.join(', ')}\``, false);}
				if (command.cooldown) {helpEmbed.addField('Cooldown', `\`${command.cooldown / 1000} Seconds\``, false);}
				if (command.usage.length) {helpEmbed.addField('Usage', `\`${command.usage.join(', ')}\``, false);}

				return message.reply({ embeds: [helpEmbed] });
			}
		}
		const categorySelects = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('HELP_CATEGORIES')
					.setPlaceholder('Select a category')
					.setMinValues(0)
					.setMaxValues(1)
					.addOptions([
						{
							label: 'Activities',
							description: 'activies commands',
							value: 'activities',
						},
						{
							label: 'Automod',
							description: 'automod commands.',
							value: 'automod',
						},
						{
							label: 'Image',
							description: 'image maker commands.',
							value: 'image',
						},
						{
							label: 'Utility',
							description: 'utility commands',
							value: 'Utility',
						},
						{
							label: 'Settings',
							description: 'Server settings and configuration.',
							value: 'settings',
						},
						{
							label: 'Moderation',
							description: 'Server Moderation',
							value: 'moderation',
						},
					]),
			);

		return message.reply({ embeds: [
			new MessageEmbed()
				.setColor('WHITE')
				.setTitle('Sus bot help')
				.setDescription([
					`The prefix for this server is \`${prefix}\``,
					`Type \`${prefix}help <command>\` to get info about a specific command.`,
					`Type \`${prefix}help <command> <subcommand>\` to get info about a specific subcommand.`].join('\n')),
		], components: [categorySelects, { type: 1, components: [{ type: 2, style: 5, label: 'Support Server', url: 'https://discord.gg/v9QsJYveCs' }] }] });
	}
}

module.exports = Help;