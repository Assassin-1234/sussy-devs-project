const { MessageEmbed, MessageAttachment } = require('discord.js');
const Canvas = require("canvas");
module.exports = {
    name: 'sus',
    description: 'Kinda sus',
    executer: async(client, message, args, cmd) => {
        
        
        const the_canvas = Canvas.createCanvas(128 * 2, 128 * 2);
        const ctx = the_canvas.getContext("2d");
        const sussybaka = await Canvas.loadImage("https://cdn.discordapp.com/attachments/840140272531668992/860526903542415401/852084751388377089.png");
        ctx.drawImage(sussybaka, 0, 0, the_canvas.width, the_canvas.height);


        const theSussyBaka = await Canvas.loadImage(message.mentions.users.first()?.displayAvatarURL({ format: 'png' }) || client.users.cache.get(args[0])?.displayAvatarURL({ format: 'png' }) || message.author.displayAvatarURL({ format: "png"}));
        ctx.beginPath();
        ctx.arc(100, 100, 90, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(theSussyBaka, 0, 0, 200, 200);

        message.channel.send({ files: [new MessageAttachment(the_canvas.toBuffer(), 'sussybaka.png')]})
    },
};