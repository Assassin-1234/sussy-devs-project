const { Schema, model } = require('mongoose');
const Config = require('../Structures/BotConfig');
const Guilds = new Schema({
	guildId: {
		type: String,
		unique: true,
	},
	registeredAt: {
		type: Number,
		default: Date.now(),
	},
	prefix: {
		type: String,
		default: Config.prefix,
	},
	blacklist: {
		state: {
			type: Boolean,
			default: false,
		},
		reason: {
			type: String,
			default: 'N/A',
		},
		blacklistedAt: {
			type: Number,
			default: 0,
		},
	},
	config: {
		type: Object,
		default: {
			AntiLinks: false,
			AntiRaid: false,
			AntiCaps: false,
			CapsThreshold: 10,
			AutoQuarantine: false,
		},
	},
	whitelists: {
		type: Object,
		default: {
			AntiLinks: {
				channels: [],
				roles: [],
			},
			CapsThreshold: {
				channels: [],
				roles: [],
			},
		},
	},
	actions: {
		type: Object,
		default: {
			AntiLinks: 'delete',
			AntiRaid: 'kick',
			CapsThresHold: 'delete',
		},
	},
	roles: {
		staffroles: {
			type: String,
			default: 'null',
		},
		muterole: {
			type: String,
			default: 'null',
		},
		quarantineRole: {
			type: String,
			default: 'null',
		},
	},
});

module.exports = model('Guilds', Guilds);
