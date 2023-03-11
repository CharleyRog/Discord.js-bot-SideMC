// IMPORT MODULES

import config from '../config/config.json' assert { type: 'json' }
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import commands from '../commands/commands.js'
import { TOKEN, CLIENT_ID } from './devModeChecker.js'

// registerCommands CODE

const registerCommands = async (): Promise<void> => {
  const rest = new REST({ version: '10' }).setToken(TOKEN)
  console.log('Started refreshing application (/) commands.')
  await rest.put(Routes.applicationGuildCommands(CLIENT_ID, config.GUILD_ID), { body: commands })
  console.log('Successfully reloaded application (/) commands.')
}

export default registerCommands
