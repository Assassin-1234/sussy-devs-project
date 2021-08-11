/* eslint-disable no-unused-vars */
const { Client, Collection, Permissions, Options } = require('discord.js');
const BotDatabase = require('./BotDatabase.js');
const Utils = require('./BotUtils.js');

module.exports = class BotClient extends Client {
	constructor(options = {}) {
		super({
			intents: options.intents,
			allowedMentions: { parse: ['users', 'roles'], repliedUser: false },
			shards: 'auto',
			failIfNotExists: false,
			messageCacheLifetime: 60,
			messageSweepInterval: 1500,
			makeCache: Options.cacheWithLimits({
				MessageManager: 2,
				PresenceManager: 0,
				UserManager: 0,
			}),
		});

		this.validate(options);

		this.commands = new Collection();
		this.aliases = new Collection();
		this.interactions = new Collection();

		this.events = new Collection();

		this.cooldowns = new Collection();
		this.subCommandsCooldowns = new Collection();
		this.slashCooldowns = new Collection();

		this.utils = new Utils(this);
		this.db = new BotDatabase(this);
	}

	validate(options) {
		if (typeof options !== 'object') {
			throw new TypeError('Options should be a type of Object.');
		}

		if (!options.token) {
			throw new Error('You must pass the token for the client.');
		}
		this.token = options.token;

		if (typeof options.prefix !== 'string') {
			throw new TypeError('Prefix should be a type of String.');
		}
		this.prefix = options.prefix;

		if (!options.developers) {
			throw new Error('You must pass a developer id(s) for the client.');
		}
		this.developers = options.developers;

		if (!options.defaultClientPerms) {
			throw new Error('You must pass default permissions for the client.');
		}
		this.defaultClientPerms = new Permissions(
			options.defaultClientPerms,
		).freeze();

		this.devMode = options.devmode;
	}

	async connect(token = this.token) {
		this.db.loadDatabase();
		this.utils.loadEvents();
		this.utils.loadCommands();
		await super.login(token);
	}
};
