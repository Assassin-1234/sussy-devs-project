/* eslint-disable no-unused-vars */
module.exports = class Event {

	constructor(client, name, options = {}) {
		this.name = name;
		this.client = client;
		this.type = options.once ? 'once' : 'on';
		this.handler = options.handler;
		this.emitter = this.client;
	}

	async run(...args) {
		throw new Error(`The run method has not been implemented in ${this.name} event`);
	}

};