const { Schema, model } = require('mongoose');

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
		default: null,
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
			CapsThreshold: 0,
		},
	},
	whitelists: {
		type: Object,
		default: {
			antiLinks: {
				channels: [],
				roles: [],
				servers: [],
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
			CapsThresHold: 'kick',
		},
	},
	roles: {
		staffroles: {
			type: Array,
			default: [],
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