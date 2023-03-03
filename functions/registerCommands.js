// IMPORT MODULES

const config = require("../config/config.json");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const commands = require("../commands/commands")

// registerCommands CODE

const registerCommands = async () => {
  const token = config.token;
  const clientID = config.clientID;
  const guildID = config.guildID;

  const rest = new REST({ version: "9" }).setToken(token);

  try {
    console.log("Started refreshing application (/) commands.");
    await rest.put(Routes.applicationGuildCommands(clientID, guildID), { body: commands });
    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
};

module.exports = registerCommands;
