const SavedLog = require('../Schemas/logs');

module.exports = new (class {
	async get(id) {
		return (
			(await SavedLog.findOne({ guildID: id })) ||
      (await new SavedLog({ guildID: id }).save())
		);
	}

	async add(id, property) {
		const savedLog = await this.get(id);

		const day = new Date().getDay();
		const loggedLastWeek = savedLog[property][day] > 0;
		loggedLastWeek
			? (savedLog[property][day] = 0)
			: savedLog[property][day - 1]++;

		await savedLog.updateOne(savedLog);
	}
})();
