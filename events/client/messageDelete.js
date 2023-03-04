// IMPORT MODULES

const config = require('../../config/config.json')
const embedBuilderFoo = require('../../utils/embedBuilderFoo')

// CODE

module.exports = async (message) => {
  if (!message || !message.guild) return

  try {
    const messageDeleteChannelID = config.CHANNELS_ID.MESSAGE_DELETE_CHANNEL_ID
    const logChannel = message.guild.channels.cache.get(messageDeleteChannelID)
    const guildID = config.GUILD_ID
    const deletedTime = message.createdAt

    const embed = embedBuilderFoo({
      color: '#FF0000',
      title: 'Сообщение удалено',
      url: `https://discord.com/channels/${guildID}/${message.channel.id}/${message.id}`,
    })

    embed
      .addFields(
        {
          name: 'Автор:',
          value: message.author != null ? `<@${message.author.id}>` : `[oldMessage]`,
          inline: true,
        },
        {
          name: 'В канале:',
          value: `${message.channel.toString()}`,
          inline: true,
        },
        { name: 'Дата создания:', value: `${deletedTime}`, inline: true },
      )
      .addFields({
        name: 'Содержание:',
        value: message.content != null ? message.content : `[oldMessage]`,
        inline: false,
      })

    await logChannel.send({ embeds: [embed] })
  } catch (error) {
    console.error(error)
  }
}
