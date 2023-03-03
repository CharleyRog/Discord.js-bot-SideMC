// IMPORT MODULES

const { EmbedBuilder } = require("discord.js");
const config = require("../config/config.json");

// messageDelete EVENT CODE

module.exports = async (message) => {
  if (!message || !message.guild) return;

  try {
    const messageDeleteChannelID = config.messageDeleteChannelID;
    const logChannel = message.guild.channels.cache.get(messageDeleteChannelID);
    const guildID = config.guildID;
    const deletedTime = message.createdAt;

    const embed = new EmbedBuilder()
      .setColor("#FF0000")
      .setTitle("Сообщение удалено")
      .setURL(`https://discord.com/channels/${guildID}/${message.channel.id}/${message.id}`)
      .addFields(
        { name: "Автор:", value: message.author != null ? `<@${message.author.id}>` : `[oldMessage]`, inline: true },
        { name: "В канале:", value: `${message.channel.toString()}`, inline: true },
        { name: "Дата создания:", value: `${deletedTime}`, inline: true }
      )
      .addFields({
        name: "Содержание:",
        value: message.content != null ? message.content : `[oldMessage]`,
        inline: false,
      });

    await logChannel.send({ embeds: [embed] });
  } catch (error) {
    console.error(error);
  }
};
