const client = require('./configs/server-config')

client.on('ready', () => console.log('Bot is running'))
client.login(process.env.DISCORD_TOKEN)
