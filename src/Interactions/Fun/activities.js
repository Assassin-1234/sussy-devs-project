/* eslint-disable no-unused-vars */
const InteractionBase = require('../../Structures/InteractionBase');
const { Interaction } = require('discord.js');
const ids = {
	youtube: '755600276941176913',
	poker: '755827207812677713',
	betrayal: '773336526917861400',
	fishing: '814288819477020702',
	chess: '832012586023256104',
};

const fetch = require('node-fetch');
const choices = [
	{
		name: 'Youtube',
		value: 'yt',
		return: () => `${ids['youtube']}`,
	},
	{
		name: 'poker',
		value: 'poker',
		return: () => {
			`${ids['poker']}`;
		},
	},
	{
		name: 'betrayal',
		value: 'bet',
		return: () => {
			`${ids['betrayal']}`;
		},
	},
	{
		name: 'fishing',
		value: 'fishing',
		return: () => {
			`${ids['fishing']}`;
		},
	},
	{
		name: 'chess',
		value: 'chess',
		return: () => {
			`${ids['chess']}`;
		},
	},
];
module.exports = class PingInteraction extends InteractionBase {
	constructor(...args) {
		super(...args, {
			name: 'activity',
			description: 'Do something in a voice channel!',
			options: [
				{
					name: 'activity',
					type: 'STRING',
					description: 'Choose the activity.',
					required: true,
					choices: choices.map((choice) => ({
						value: choice.value,
						name: choice.name,
					})),
				},
				{
					name: 'channel',
					type: 'CHANNEL',
					description: 'Choose the channel.',
					required: true,
				},
			],
		});
	}
	/**
   * @param {Interaction} interaction
   * @param {string[]} args
   */
	async run(interaction, args) {
		const choice = choices.find((ch) => ch.value === args[0]);
		const ch = args[1];
		const channel = interaction.guild.channels.cache.get(ch);
		if (channel.type !== 'GUILD_VOICE') {
			return interaction.reply({
				content: 'That is not a valid voice channel!',
				ephemeral: true,
			});
		}
		const data = await fetch(
			`https://discord.com/api/v8/channels/${channel.id}/invites`,
			{
				method: 'POST',
				body: JSON.stringify({
					max_age: 86400,
					max_uses: 0,
					target_application_id: choice.return(),
					target_type: 2,
					temporary: false,
					validate: null,
				}),
				headers: {
					Authorization: `Bot ${this.client.token}`,
					'Content-Type': 'application/json',
				},
			},
		).then((res) => res.json());
		const invite = `https://discord.com/invite/${data.code}`;
		return interaction.reply({
			content: 'Click the button below me to start the activity!',
			components: [
				{
					type: 1,
					components: [
						{
							type: 2,
							style: 5,
							label: 'Click me!',
							url: invite,
						},
					],
				},
			],
		});
	}
};
