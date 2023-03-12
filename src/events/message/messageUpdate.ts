// IMPORT MODULES

import { GuildChannel } from 'discord.js'
import embedBuilderFoo from '../../utils/embedBuilderFoo.js'
import config from '../../config/config.json' assert { type: 'json' }
import { isAdmin, isBot } from '../../utils/isHavePerm.js'

// CODE

export default async (oldMessage: any, newMessage: any): Promise<void> => {
  if (!oldMessage || !newMessage) return

  const user = newMessage.member

  if (!isBot(user) && !isAdmin(user)) {
    const channel = newMessage.channel
    let oldContent = oldMessage.content
    let newContent = newMessage.content
    const messageChangeChannelID = config.CHANNELS_ID.MESSAGE_CHANGE_CHANNEL_ID
    const logChannel: GuildChannel | undefined = newMessage.guild.channels.cache.get(messageChangeChannelID)
    const guildID = config.GUILD_ID

    if (!oldContent) {
      try {
        oldContent = await oldMessage.fetch().content
      } catch (error) {
        console.error(`Error fetching message: ${error}`)
        return
      }
    }

    const embed = embedBuilderFoo({
      color: '#FFFF00',
      title: 'Сообщение изменено',
      url: `https://discord.com/channels/${guildID}/${newMessage.channel.id}/${newMessage.id}`,
    })

    embed.addFields(
      { name: 'Пользователь:', value: `<@${user.id}>`, inline: true },
      { name: 'В канале:', value: `${channel.toString()}`, inline: true },
    )

    if (oldContent) {
      if (oldContent[0] == '<' || oldContent[0] == ':') {
      } else {
        oldContent = `\`\`\`${oldContent}\`\`\``
      }
      embed.addFields({
        name: 'До изменения:',
        value: oldContent,
        inline: false,
      })
    }

    if (newContent[0] !== '<' || newContent[0] !== ':') {
      newContent = `\`\`\`${newContent}\`\`\``
    }

    embed.addFields({
      name: 'После изменения:',
      value: newContent,
      inline: false,
    })

    if (logChannel && logChannel.isTextBased()) {
      await logChannel.send({ embeds: [embed] })
    }
  }
}
