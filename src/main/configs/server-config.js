const { Intents } = require('discord.js')
const DiscordJs = require('discord.js')
const loader = require('./messages-dictionary')
require('dotenv').config()

const client = new DiscordJs.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ]
})

client.on('messageCreate', message => loader.readMessage(message))

module.exports = client
