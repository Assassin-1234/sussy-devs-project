const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'test',
    description: '',
    executer: async(client, message, args, cmd) => {
        return message.channel.send("Test")
    },
};