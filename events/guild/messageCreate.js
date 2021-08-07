module.exports = async (client, message) => {
    const prefix = process.env.prefix;
    
    if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot) return;
   

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || client.commands.find(r => r.aliases && r.aliases.includes(cmd));
    try {
        if (command) command.executer(client, message, args, cmd);
    } catch (err) {
        message.channel.send(':x: | Got an error... ' + err)
    

    }
}