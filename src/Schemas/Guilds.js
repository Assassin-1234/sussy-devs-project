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
});

module.exports = model('Guilds', Guilds);