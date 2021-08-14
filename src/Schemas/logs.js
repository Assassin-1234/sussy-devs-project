const { model, Schema } = require('mongoose');
const Logs = new Schema(
	{
		guildID: String,
		changes: { type: Array, default: [] },
		leaves: { type: Array, default: [0, 0, 0, 0, 0, 0, 0] },
		joins: { type: Array, default: [0, 0, 0, 0, 0, 0, 0] },
	},
	{
		timestamps: true,
	},
);
module.exports = model(
	'log',
	Logs,
);
