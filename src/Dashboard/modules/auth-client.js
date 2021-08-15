const OAuthClient = require('disco-oauth');
const settings = require('../../Structures/BotConfig');
const client = new OAuthClient(settings.id, settings.secret);
client.setRedirect(`${settings.dashboard}/auth`);
client.setScopes('identify', 'guilds');

module.exports = client;
