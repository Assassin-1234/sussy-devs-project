require('dotenv').config();
const BotClient = require('./src/Structures/BotClient');
const config = require('./src/Structures/BotConfig');
const client = new BotClient(config);
client.connect();
module.exports = client;