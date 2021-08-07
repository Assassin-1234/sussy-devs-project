/* eslint-disable no-unused-vars */
/* eslint-disable no-inline-comments */
const { Permissions, Message } = require('discord.js');

module.exports = class Command {
	constructor(client, name, options = {}) {
		this.client = client;
		this.name = options.name || name;
		this.subCommands = options.subCommands || false; // Object array
		this.aliases = options.aliases || [];
		this.description = options.description || 'No description provided.';
		this.category = options.category || 'Utility';
		this.usage = options.usage || [];
		this.example = options.example || 'N/A';
		this.userPerms = new Permissions(options.userPerms).freeze();
		this.clientPerms = new Permissions(options.clientPerms).freeze();
		this.devOnly = options.devOnly || false;
		this.disabled = options.disabled || false;
		this.cooldown = options.cooldown || 2000;
	}
	/**
   * @param {Message} message
   * @param {Array} args
   */
	async run(message, args) {
		throw new Error(`Command ${this.name} doesn't have a run method!`);
	}
};