const Discord = require('discord.js');
const Command = require('../../Structures/CommandBase');
const { Permissions } = require('discord.js');

class start extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['start activity'],
			description: 'start activties',
			category: 'activities',
			devsOnly: false,
			disabled: false,
			cooldown: 2000,
			subCommands: [
				{
					name: 'yt',
					aliases: ['yt-toghter', 'youtube'],
					description: 'start a yt toghter session',
					usage: ['<prefix>start yt'],
					clientPerms: [Permissions.FLAGS.EMBED_LINKS, Permissions.FLAGS.CREATE_INSTANT_INVITE],
					devsOnly: false,
					disabled: false,
					cooldown: 3000,
				},
				{
					name: 'fishing',
					aliases: ['fishing-game', 'fish'],
					description: 'start a fishing game',
					clientPerms: [Permissions.FLAGS.EMBED_LINKS, Permissions.FLAGS.CREATE_INSTANT_INVITE],
					usage: ['<prefix>start fishing'],
					devsOnly: false,
					disabled: false,
					cooldown: 1000,
				},
				{
					name: 'poker',
					aliases: ['poker-game'],
					description: 'start a poker game',
					clientPerms: [Permissions.FLAGS.EMBED_LINKS, Permissions.FLAGS.CREATE_INSTANT_INVITE],
					usage: ['<prefix>start poker'],
					devsOnly: false,
					disabled: false,
					cooldown: 1000,
				},
			],
		});
	}

	/**
   * @param {Discord.Message} message
   */

	async run(message) {
		message.reply({ content: ':x: please choose a activity \n`<yt/fishing/poker>`' });
	}

	/**
   * @param {Discord.Message} message
   */

	async yt(message) {
		const fetch = require('node-fetch');
		const channel = message.member.voice.channel;
		if(!channel) return message.reply({ content: 'You must be in a vc to start watching youtube' });

		fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
			method: 'POST',
			body: JSON.stringify({
				max_age: 86400,
				max_uses: 0,
				target_application_id: '755600276941176913',
				target_type: 2,
				temporary: false,
				validate: null,
			}),
			headers: {
				'Authorization': `Bot ${this.client.token}`,
				'Content-Type': 'application/json',
			},
		})

			.then(res => res.json())
			.then(invite => {
				if(!invite.code) return message.reply({ content: 'Sadly i cant start a yt together' });

				const e = new Discord.MessageEmbed()
					.setColor(0x5865F2)
					.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
					.setDescription('This function is still in beta! so it won\'t work every time\nClick the Button to start!');


				message.reply({
					embeds: [
						e,
					],


					components:
                [{ type: 1, components:
                    [{ type: 2, style: 5, label: 'Click me!', url: `https://discord.com/invite/${invite.code}` }],
                }],

				});
			});
	}

	/**
   * @param {Discord.Message} message
   */

	async fishing(message) {
		const fetch = require('node-fetch');
		const channel = message.member.voice.channel;
		if(!channel) return message.reply({ content: 'You must be in a vc to start playing fishington.io' });

		fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
			method: 'POST',
			body: JSON.stringify({
				max_age: 86400,
				max_uses: 0,
				target_application_id: '814288819477020702',
				target_type: 2,
				temporary: false,
				validate: null,
			}),
			headers: {
				'Authorization': `Bot ${this.client.token}`,
				'Content-Type': 'application/json',
			},
		})

			.then(res => res.json())
			.then(invite => {
				if(!invite.code) return message.reply({ content: 'Sadly i cant start a fishing game session' });

				const e = new Discord.MessageEmbed()
					.setColor(0x5865F2)
					.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
					.setDescription('This function is still in beta! so it won\'t work every time\nClick the Button to start!');


				message.reply({
					embeds: [
						e,
					],


					components:
                [{ type: 1, components:
                    [{ type: 2, style: 5, label: 'Click me!', url: `https://discord.com/invite/${invite.code}` }],
                }],

				});
			});
	}

	/**
   * @param {Discord.Message} message
   */
	async poker(message) {
		const fetch = require('node-fetch');
		const channel = message.member.voice.channel;
		if(!channel) return message.reply({ content: 'You must be in a vc to start playing poker' });

		fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
			method: 'POST',
			body: JSON.stringify({
				max_age: 86400,
				max_uses: 0,
				target_application_id: '755827207812677713',
				target_type: 2,
				temporary: false,
				validate: null,
			}),
			headers: {
				'Authorization': `Bot ${this.client.token}`,
				'Content-Type': 'application/json',
			},
		})

			.then(res => res.json())
			.then(invite => {
				if(!invite.code) return message.reply({ content: 'Sadly i cant start a poker game session' });

				const e = new Discord.MessageEmbed()
					.setColor(0x5865F2)
					.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
					.setDescription('This function is still in beta! so it won\'t work every time\nClick the Button to start!');


				message.reply({
					embeds: [
						e,
					],


					components:
                [{ type: 1, components:
                    [{ type: 2, style: 5, label: 'Click me!', url: `https://discord.com/invite/${invite.code}` }],
                }],

				});
			});
	}
}

module.exports = start;
