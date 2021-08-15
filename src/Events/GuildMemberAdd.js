const Event = require('../Structures/EventBase');
const schema = require('../Schemas/Guilds');
module.exports = class extends Event {
	async run(member) {
		const guildData = await schema.findOne({ guildId: member.guild.id });
		if(guildData.config.autoquarantine) {
			if(member.user.createdTimestamp > Date.now() + 604800000) {
				await member.roles.cache.add(guildData.roles.quarantineRole);
			}
		}
		// if(guildData.config.AntiRaid) {
		// 	this.client.utils.doAction('a', guildData.actions.AntiRaid, member, 'anti raid enabled', guildData);
		// }
	}
};