const Command = require('../../Structures/CommandBase');
const { Message } = require('discord.js');
const Canvas = require("canvas");
module.exports = class dababy extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['db'],
            description: 'Less go',
            category: 'Image',
            devsOnly: false,
            disabled: false,
            cooldown: 2000,
        });
    }

    /**
   * @param {Message} message
   * @param {string[]} args
   */

    async run(message, args) {



        const canvas = Canvas.createCanvas(320, 320);
        const ctx = canvas.getContext('2d');
        const background = await Canvas.loadImage('https://media.pitchfork.com/photos/5c7d4c1b4101df3df85c41e5/1:1/w_320/Dababy_BabyOnBaby.jpg');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        const imageURL = await Canvas.loadImage(
            message.mentions.users.first()?.displayAvatarURL({ format: 'png' }) ||
            this.client.users.cache.get(args[0])?.displayAvatarURL({ format: 'png' }) ||
            message.author.displayAvatarURL({ format: 'png' }));
        ctx.beginPath();
        ctx.arc(150, 150, 50, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(imageURL, 50 * 2, 50 * 2, 200 / 2, 200 / 2);

        message.channel.send({ files: [new Discord.MessageAttachment(canvas.toBuffer(), 'DaBaby.png')] })
    }


}

