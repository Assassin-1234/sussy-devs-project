require('dotenv').config();
const TCOCClient = require('./src/Structures/TCOCClient');
const config = require('./src/Structures/TCOCConfig');
const client = new TCOCClient(config);
client.connect();