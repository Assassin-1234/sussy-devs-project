/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
const path = require('path');
const { promisify } = require('util');
const glob = promisify(require('glob'));
const Command = require('./CommandBase.js');
const Event = require('./EventBase.js');
const Interaction = require('./InteractionBase');
const {
	Collection,
	MessageEmbed,
	Message,
	MessageActionRow,
	MessageSelectMenu,
} = require('discord.js');
module.exports = class Tools {
	constructor(client) {
		this.client = client;
	}

	get directory() {
		return `${path.dirname(require.main.filename)}${path.sep}`;
	}

	sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
	removeDupes(array) {
		return [...new Set(array)];
	}

	isClass(input) {
		return (
			typeof input === 'function' &&
      typeof input.prototype === 'object' &&
      input.toString().substring(0, 5) === 'class'
		);
	}

	codeBlock(string, code) {
		if (code) return `\`\`\`${code}\n${string}\n\`\`\``;
		return `\`\`\`\n${string}\n\`\`\``;
	}

	checkDevs(target) {
		return this.client.developers.includes(target);
	}
	capitalise(string) {
		return string
			.split(' ')
			.map((str) => str.slice(0, 1).toUpperCase() + str.slice(1))
			.join(' ');
	}

	formatArray(array, type = 'conjunction') {
		return new Intl.ListFormat('en-GB', { style: 'short', type: type }).format(
			array,
		);
	}
	formatPerms(perm) {
		return perm
			.toLowerCase()
			.replace(/(^|"|_)(\S)/g, (s) => s.toUpperCase())
			.replace(/_/g, ' ')
			.replace(/Guild/g, 'Server')
			.replace(/Use Vad/g, 'Use Voice Acitvity');
	}
	timer(timestamp) {
		const timeLeft = timestamp - Date.now();
		const days = Math.floor(timeLeft / 86400000);
		const hours = Math.floor(timeLeft / 3600000) - days * 24;
		const minutes = Math.floor(timeLeft / 60000) - days * 1440 - hours * 60;
		const seconds =
      Math.floor(timeLeft / 1000) - days * 86400 - hours * 3600 - minutes * 60;
		const mseconds =
      timeLeft / 1000 - days * 86400 - hours * 3600 - minutes * 60;
		let string = '';
		if (days) string = string + `${days} ${days == 1 ? 'day' : 'days'}`;
		if (hours) string = string + `${hours} ${hours == 1 ? 'hour' : 'hours'}`;
		if (minutes) {
			string = string + `${minutes} ${minutes == 1 ? 'minute' : 'minutes'}`;
		}
		if (seconds) {
			string = string + `${seconds} ${seconds == 1 ? 'second' : 'seconds'}`;
		}
		if (!string.length) string = `${mseconds.toFixed(1)} second`;
		return string;
	}

	async checkCommand(message, command, subCommand = false) {
		if (command.devsOnly && !this.checkDevs(message.author.id)) {
			return false;
		}

		if (command.userPerms) {
			const missing = message.channel
				.permissionsFor(message.member)
				.missing(command.userPerms);
			if (missing.length) {
				message.reply({
					content: `You don't have \`${this.formatArray(
						missing.map(this.client.utils.formatPerms),
					)}\` permission to run \`${command.name}\` command!`,
				});
				return false;
			}
		}
		const clientPermCheck = command.clientPerms
			? this.client.defaultClientPerms.add(command.clientPerms)
			: this.client.defaultClientPerms;
		if (clientPermCheck) {
			const missing = message.channel
				.permissionsFor(message.guild.me)
				.missing(clientPermCheck);
			if (missing.length) {
				message.reply({
					content: `I don't have \`${this.formatArray(
						missing.map(this.client.utils.formatPerms),
					)}\` permission to run \`${command.name}\` command!`,
				});
				return false;
			}
		}

		if (command.disabled) {
			message.reply({
				content: [
					`\`${command.name}\` **is globally disabled! Please check back later**`,
				].join('\n'),
				components: [
					{
						type: 1,
						components: [
							{
								type: 2,
								style: 5,
								label: 'Support Server',
								url: 'https://discord.gg/8279tv63yt',
							},
						],
					},
				],
			});
			return false;
		}

		if (!subCommand) {
			if (!message.client.cooldowns.has(command.name)) {
				await message.client.cooldowns.set(command.name, new Collection());
			}
		}
		else if (!message.client.subCommandsCooldowns.has(command.name)) {
			await message.client.subCommandsCooldowns.set(
				command.name,
				new Collection(),
			);
		}

		const now = Date.now();
		const timestamps = !subCommand
			? message.client.cooldowns.get(command.name)
			: message.client.subCommandsCooldowns.get(command.name);
		const cooldownAmount = command.cooldown;
		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
			if (now < expirationTime) {
				const timeLeft = this.timer(expirationTime);
				message
					.reply({
						content: `This command is in cooldown for **${timeLeft}**`,
					})
					.catch(() => {
						// something
					});
				return false;
			}
		}

		timestamps.set(message.author.id, now);
		return setTimeout(
			() => timestamps.delete(message.author.id),
			cooldownAmount,
		);
	}
	/**
   * @param {Message} message - Message Object
   * @param {String} prefix - Guild prefix
   * @param {Object} comamnd - Comamnd ran
   * @param {Number} missingIndex - Missing argument index
   * @param {String} message - Error message
   */
	async missingArgs(message, errorReply) {
		return message.reply({
			embeds: [
				new MessageEmbed()
					.setAuthor(
						message.author.username,
						message.author.avatarURL({ dynamic: true }),
					)
					.setColor('RED')
					.setDescription(errorReply),
			],
		});
	}

	async loadCommands() {
		return glob(`${this.directory}/src/Commands/**/*.js`).then((commands) => {
			for (const commandFile of commands) {
				delete require.cache[commandFile];
				const { name } = path.parse(commandFile);
				const File = require(commandFile);
				if (!this.isClass(File)) {
					throw new TypeError(`Command ${name} doesn't export a class.`);
				}
				const command = new File(this.client, name.toLowerCase());
				if (!(command instanceof Command)) {
					throw new TypeError(`Command ${name} doesn't belong in Commands.`);
				}
				this.client.commands.set(command.name, command);
				if (command.aliases.length) {
					for (const alias of command.aliases) {
						this.client.aliases.set(alias, command.name);
					}
				}
			}
		});
	}
	async loadInteractions() {
		return glob(`${this.directory}/src/Interactions/**/*.js`).then(
			(interactions) => {
				for (const interactionFile of interactions) {
					delete require.cache[interactionFile];
					const { name } = path.parse(interactionFile);
					const File = require(interactionFile);
					if (!this.isClass(File)) {
						throw new TypeError(`Interaction ${name} doesn't export a class.`);
					}
					const interaction = new File(this.client, name.toLowerCase());
					if (!(interaction instanceof Interaction)) {
						throw new TypeError(
							`Interaction ${name} doesn't belong in Interactions directory.`,
						);
					}
					this.client.interactions.set(interaction.name, interaction);
					this.client.devMode
						? this.client.guilds.cache
							.get('873573318836490280')
							.commands.create(interaction)
						: this.client.application?.commands.create(interaction);
				}
			},
		);
	}

	async loadEvents() {
		return glob(`${this.directory}/src/Events/**/*.js`).then((events) => {
			for (const eventFile of events) {
				delete require.cache[eventFile];
				const { name } = path.parse(eventFile);
				const File = require(eventFile);
				if (!this.isClass(File)) {
					throw new TypeError(`Event ${name} doesn't export a class!`);
				}
				const event = new File(this.client, name);
				if (!(event instanceof Event)) {
					throw new TypeError(
						`Event ${name} doesn't belong in Event directory.`,
					);
				}
				this.client.events.set(event.name, event);
				event.emitter[event.type](name, (...args) => event.run(...args));
			}
		});
	}
	async ErrorEmbed(message, description) {
		const embed = new MessageEmbed()
			.setAuthor(
				message.author.username,
				message.author.avatarURL({ dynamic: true }),
			)
			.setTitle('Encountered an error ...')
			.setColor('RED')
			.setDescription(description);
		return embed;
	}
	async SuccessEmbed(message, description) {
		const embed = new MessageEmbed()
			.setAuthor(
				message.author.username,
				message.author.avatarURL({ dynamic: true }),
			)
			.setTitle('Success')
			.setColor('GREEN')
			.setDescription(description);
		return embed;
	}
	async doAction(message, action, user, reason, guildData) {

		 if(action == 'kick') {
		 	if(user.kickable) {user.kick({ reason: reason });}
		 }
		if (action == 'ban') {
			if (user.bannable) {
				user.ban({ reason: reason });
			}
		}
		if (action == 'mute') {
			user.roles.cache.add(guildData.roles.muterole);
		}
		if (action == 'delete') {
			message.delete();
		}
	}
	async handleHelp(interaction) {
		const categorySelects = new MessageActionRow().addComponents(
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

		if (interaction.message.author !== null) {
			return interaction.reply({
				ephemeral: true,
				embeds: [
					new MessageEmbed()
						.setImage(
							'https://images-ext-1.discordapp.net/external/k3HetTxdca_RGQ-oY7TIkVwwWTEFpKG7pFy3N02RlCk/https/i.imgur.com/tnbIcOg.png?width=599&height=8',
						)
						.setColor('WHITE')
						.setTitle(
							`↷₊˚ʚ ${interaction.values.toString()} Commands (${
								this.client.commands.filter(
									(c) => c.category === interaction.values.toString(),
								).size
							})`,
						)
						.setDescription(
							this.client.commands
								.filter((c) => c.category === interaction.values.toString())
								.map((c) => ' ' + `\`${c.name}\``)
								.toString()
								.trim() || '-',
						),
				],
				components: [
					categorySelects,
					{
						type: 1,
						components: [
							{
								type: 2,
								style: 5,
								label: 'Support Server',
								url: 'https://discord.gg/8279tv63yt',
							},
						],
					},
				],
			});
		}
		else {
			await interaction.deferUpdate();
			return interaction.editReply({
				ephemeral: true,
				embeds: [
					new MessageEmbed()
						.setImage(
							'https://images-ext-1.discordapp.net/external/k3HetTxdca_RGQ-oY7TIkVwwWTEFpKG7pFy3N02RlCk/https/i.imgur.com/tnbIcOg.png?width=599&height=8',
						)
						.setColor('WHITE')
						.setTitle(
							`↷₊˚ʚ ${interaction.values.toString()} Commands (${
								this.client.commands.filter(
									(c) => c.category === interaction.values.toString(),
								).size
							})`,
						)
						.setDescription(
							this.client.commands
								.filter((c) => c.category === interaction.values.toString())
								.map((c) => ' ' + `\`${c.name}\``)
								.toString()
								.trim() || '-',
						),
				],
				components: [
					categorySelects,
					{
						type: 1,
						components: [
							{
								type: 2,
								style: 5,
								label: 'Support Server',
								url: 'https://discord.gg/8279tv63yt',
							},
						],
					},
				],
			});
		}
	}
};
