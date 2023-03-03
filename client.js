// IMPORT MODULES

const {Client, GatewayIntentBits, Partials} = require("discord.js");

// CLIENT INIT

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildWebhooks,
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

module.exports = client;
