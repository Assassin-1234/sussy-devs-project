/* eslint-disable no-unused-vars */
const database = require('mongoose');
const { GooseCache } = require('goosecache');
const Guild = require('../Schemas/Guilds');

module.exports = class deFDatabase {
	constructor() {
		this.cache = new GooseCache(database, { engine: 'memory' });
	}
	async loadDatabase() {
		database.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		});

		database.connection.on('connected', () => {
			console.log('[BOOT] Connected to MongoDB!');
		});

		database.connection.on('err', (err) => {
			console.log(`[ERROR] Unable to connect to the MongoDB. Error:\n${err}\n`);
		});

		database.connection.on('disconnected', () => {
			console.log('[INFO] MongoDB connection is disconnected');
		});
	}

	/**
   * @param {string} guildId - Id of the Guild
   */
	async findOrCreateGuild(guildId) {
		if (!guildId) throw new TypeError('Please Provide a Guild ID');
		const guild = await Guild.findOne({ guildId: guildId }).cache(
			60,
			`GUILD_${guildId}`,
		);
		if (!guild) {
			const newGuild = new Guild({ guildId: guildId });
			const { prefix, registeredAt, blacklist, config, whitelists, actions } =
        newGuild;
			await newGuild.save().catch((error) => console.log('Error!', error));

			return newGuild;
		}
		else {
			return guild;
		}
	}
};
