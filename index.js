const discord = require("discord.js");
require("dotenv").config();

const client = new discord.Client({
    allowedMentions: { parse: ['users'], repliedUser: false },
    intents: [discord.Intents.FLAGS.GUILDS, discord.Intents.FLAGS.GUILD_MESSAGES, discord.Intents.FLAGS.DIRECT_MESSAGES, discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, discord.Intents.FLAGS.GUILD_MEMBERS, discord.Intents.FLAGS.GUILD_WEBHOOKS],
    partials: ["MESSAGE", "REACTION", "CHANNEL"]
});
client.commands = new discord.Collection();
let handlers = ["command_handler", "event_handler"];
for (const handler of handlers) {
    require(`./handlers/${handler}`)(client);
};

client.login(process.env.token);