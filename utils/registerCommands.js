// IMPORT MODULES

const config = require('../config/config.json')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const commands = require('../commands/commands')
const { TOKEN, CLIENT_ID } = require('./devModeChecker')

// registerCommands CODE

const registerCommands = async () => {
  const rest = new REST({ version: '10' }).setToken(TOKEN)

  try {
    console.log('Started refreshing application (/) commands.')
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, config.GUILD_ID), { body: commands })
    console.log('Successfully reloaded application (/) commands.')
  } catch (error) {
    console.error(error)
  }
}

module.exports = registerCommands
