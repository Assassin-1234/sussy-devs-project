const Event = require('../../Structures/EventBase.js');

module.exports = class extends Event {
	constructor(...args) {
		super(...args, {
			once: true,
		});
	}

	async run() {
		this.client.utils.loadInteractions();

		await this.client.utils.sleep(500);
		console.log(
			[
				`Logged in as ${this.client.user.tag}`,
				`Loaded ${this.client.commands.size} commands & ${this.client.events.size} events & ${this.client.interactions.size} interactions!`,
				`Ready in ${this.client.guilds.cache.size} guilds on ${
					this.client.channels.cache.size
				} channels, for a total of ${this.client.guilds.cache.reduce(
					(a, b) => a + b.memberCount,
					0,
				)} users.`,
			].join('\n'),
		);

		this.client.user.setPresence({
			activities: [
				{
					type: 'WATCHING',
					name: `@${this.client.user.username} help | \nServing ${this.client.guilds.cache.size} Servers`,
				},
			],
		});
		require('../../Dashboard/server.js');

		await this.client.utils.sleep(2000);
	}
};
