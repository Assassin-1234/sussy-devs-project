const { Schema, model } = require('mongoose');
const Messages = new Schema(
	{
		messageID: {
			type: String,
			unique: true,
		},
		text: { type: String },
		userID: String,
		username: String,
		guildID: String,
		channelID: String,
	},
	{
		timestamps: true,
	},
);
module.exports = model(
	'message',
	Messages,
);
