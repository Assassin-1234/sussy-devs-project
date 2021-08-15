/* eslint-disable no-unused-vars */
const Command = require('../../Structures/CommandBase');
const { Permissions, Message, MessageEmbed } = require('discord.js');
const schema = require('../../Schemas/Guilds');
class Set extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['config', 'conf', 'settings'],
			description: 'set the guild configurations with this command',
			category: 'Settings',
			devsOnly: false,
			disabled: false,
			cooldown: 2000,
			subCommands: [
				{
					name: 'muterole',
					aliases: ['mr', 'mute', 'mrole'],
					usage: ['<roleID>'],
					parent: 'set',
					description: 'set the muterole in a server by providing an ID. Use --create flag to create one',
					clientPerms: [Permissions.FLAGS.MANAGE_GUILD],
					devsOnly: false,
					disabled: false,
					cooldown: 3000,
				},
				{
					name: 'quarantinerole',
					aliases: ['qr', 'qrole', 'quar'],
					usage: ['<roleID>'],
					parent: 'set',
					description: 'set the quarantine role in a server by providing an ID. Use --create flag to create one. \n \n Quarantining is a safety feature for discord servers where a sus user gets assigned the role, for ex. new accounts',
					clientPerms: [Permissions.FLAGS.MANAGE_GUILD],
					devsOnly: false,
					disabled: false,
					cooldown: 3000,
				},
				{
					name: 'staffrole',
					aliases: ['sr', 'srole', 'staff'],
					usage: ['<roleID>'],
					parent: 'set',
					description: 'set the staff role in a server by providing an ID. Use --create flag to create one',
					clientPerms: [Permissions.FLAGS.MANAGE_GUILD],
					devsOnly: false,
					disabled: false,
					cooldown: 3000,
				},
			],
		});
	}

	/**
   * @param {Message} message
   * @param {Array} args
   */

	async run(message) {
		// message.reply({ content: 'Ping!' });
	}
	async muterole(message, args, prefix) {
		if(!args[1]) return this.client.utils.missingArgs(message, prefix, this.subCommands.find(x => x.name === 'muterole'), 1, 'please provide the muterole or the --create flag to create!');
		const data = await schema.findOne({ guildId: message.guild.id });
		if(args[1] === '--create') {
			try {
				const muteRoleId = await message.guild.roles.create({
					name: 'Muted',
					color: '#484848',
					permissions: [],
					reason: '--create flag was used while setting the muterole',
				});

				message.guild.channels.cache.forEach(async (channel) => {
					await channel.permissionOverwrites.edit(muteRoleId, {
						SEND_MESSAGES: false,
						ADD_REACTIONS: false,
					});
				});
				data.roles.muterole = muteRoleId.id;
				data.save();
				message.reply({
					embeds: [
						await this.client.utils.SuccessEmbed(message, `Successfully created the muterole! ${muteRoleId}`),
					],
				});
			}
			catch (e) {
				console.log(e.stack);
				message.reply({
					embeds: [
						await this.client.utils.ErrorEmbed(message, e),
					],
				});
			}
			return;
		}
		const role = await message.guild.roles.cache.get(args[1]);
		if(!role) {
			return message.reply({
				embeds: [
					await this.client.utils.ErrorEmbed(message, 'role ID is not valid'),
				],
			});
		}
		data.roles.muterole = args[1];
		data.roles.muterole == 'null' ? message.reply({
			embeds: [
				await this.client.utils.SuccessEmbed(message, `successfully set the mute role to \`${role.name}\``),
			],
		}) : message.reply({
			embeds: [
				await this.client.utils.SuccessEmbed(message, `successfully changed the mute role to \`${role.name}\``),
			],
		});
		data.save();
		this.client.db.cache.clear(`GUILD_${message.guild.id}`);
	}
	async quarantinerole(message, args, prefix) {
		if(!args[1]) return this.client.utils.missingArgs(message, prefix, this.subCommands.find(x => x.name === 'quarantinerole'), 1, 'please provide the quarantinerole or the --create flag to create!');
		const data = await schema.findOne({ guildId: message.guild.id });
		if(args[1] === '--create') {
			try {
				const quarantinerole = await message.guild.roles.create({
					name: 'quarantined',
					color: '#484848',
					permissions: [],
					reason: '--create flag was used while setting the quarantinerole',
				});

				message.guild.channels.cache.forEach(async (channel) => {
					await channel.permissionOverwrites.edit(quarantinerole, {
						SEND_MESSAGES: false,
						ADD_REACTIONS: false,
					});
				});
				data.roles.quarantineRole = quarantinerole.id;
				data.save();
				message.reply({
					embeds: [
						await this.client.utils.SuccessEmbed(message, `Successfully created the quarantine role! ${quarantinerole}`),
					],
				});

			}
			catch (e) {
				console.log(e.stack);
				message.reply({
					embeds: [
						await this.client.utils.ErrorEmbed(message, e),
					],
				});
			}
			return;
		}
		const role = await message.guild.roles.cache.get(args[1]);
		if(!role) {
			return message.reply({
				embeds: [
					await this.client.utils.ErrorEmbed(message, 'role ID is not valid'),
				],
			});
		}
		data.roles.quarantineRole = args[1];
		data.roles.quarantineRole == 'null' ? message.reply({
			embeds: [
				await this.client.utils.SuccessEmbed(message, `successfully set the quarantinerole to \`${role.name}\``),
			],
		}) : message.reply({
			embeds: [
				await this.client.utils.SuccessEmbed(message, `successfully changed the quarantine role to \`${role.name}\``),
			],
		});
		data.save();
		this.client.db.cache.clear(`GUILD_${message.guild.id}`);
	}
	async staffrole(message, args, prefix) {
		if(!args[1]) return this.client.utils.missingArgs(message, prefix, this.subCommands.find(x => x.name === 'staffrole'), 1, 'please provide the staff role or the --create flag to create!');
		const data = await schema.findOne({ guildId: message.guild.id });
		if(args[1] === '--create') {
			try {
				const staffrole = await message.guild.roles.create({
					name: 'staff',
					color: '#ffffff',
					permissions: [],
					reason: '--create flag was used while setting the staff role',
				});
				data.roles.staffrole = staffrole.id;
				data.save();
				message.reply({
					embeds: [
						await this.client.utils.SuccessEmbed(message, `Successfully created the staff role! ${staffrole}`),
					],
				});
			}
			catch (e) {
				console.log(e.stack);
				message.reply({
					embeds: [
						await this.client.utils.ErrorEmbed(message, e),
					],
				});
			}
			return;
		}
		const role = await message.guild.roles.cache.get(args[1]);
		if(!role) {
			return message.reply({
				embeds: [
					await this.client.utils.ErrorEmbed(message, 'role ID is not valid'),
				],
			});
		}		data.roles.staffrole = args[1];
		data.roles.staffrole == 'null' ? message.reply({
			embeds: [
				await this.client.utils.SuccessEmbed(message, `successfully set the staff role to \`${role.name}\``),
			],
		}) : message.reply({
			embeds: [
				await this.client.utils.SuccessEmbed(message, `successfully changed the staff role to \`${role.name}\``),
			],
		});
		data.save();
		this.client.db.cache.clear(`GUILD_${message.guild.id}`);
	}
}

module.exports = Set;