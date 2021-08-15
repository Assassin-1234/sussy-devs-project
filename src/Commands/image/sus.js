/* eslint-disable no-unused-vars */
const Command = require('../../Structures/CommandBase');
const { MessageAttachment, Message } = require('discord.js');
const Canvas = require('canvas');
class sus extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['sussybaka', 'sussy'],
			description: 'Kinda sus',
			category: 'image',
			devsOnly: false,
			disabled: false,
			cooldown: 2000,
		});
	}

	/**
   * @param {Message} message
   * @param {Array<string>} args
   */

	async run(message, args) {
		const the_canvas = Canvas.createCanvas(128 * 2, 128 * 2);
		const ctx = the_canvas.getContext('2d');
		const sussy = await Canvas.loadImage(
			'https://cdn.discordapp.com/attachments/840140272531668992/860526903542415401/852084751388377089.png',
		);
		ctx.drawImage(sussy, 0, 0, the_canvas.width, the_canvas.height);

		// eslint-disable-next-line no-shadow
		const sus = await Canvas.loadImage(
			message.mentions.users.first()?.displayAvatarURL({ format: 'png' }) ||
        this.client.users.cache.get(args[0])?.displayAvatarURL({ format: 'png' }) ||
        message.author.displayAvatarURL({ format: 'png' }),
		);
		ctx.beginPath();
		ctx.arc(100, 100, 90, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.clip();
		ctx.drawImage(sus, 0, 0, 200, 200);

		message.channel.send({
			files: [new MessageAttachment(the_canvas.toBuffer(), 'sus.png')],
		});
	}
}

module.exports = sus;
