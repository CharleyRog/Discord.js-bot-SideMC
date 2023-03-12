// IMPORT MODULES

import { MessageReaction, User, GuildBasedChannel, Message, PartialMessage, GuildMember } from 'discord.js'
import config from '../../config/config.json' assert { type: 'json' }
import { isAdmin, isAdminsSostav, isBot, isDiscordSostav, isStSostav } from '../../utils/isHavePerm.js'
import embedBuilderFoo from '../../utils/embedBuilderFoo.js'

// CODE

export default async (reaction: MessageReaction, user: User): Promise<void> => {
  if (!user || !reaction || user.bot) return

  const emojiIcon = '🚫'

  if (reaction.emoji.name !== emojiIcon) return

  if (reaction.partial) {
    try {
      await reaction.fetch()
    } catch (error) {
      console.error('Something went wrong when fetching the message:', error)
      return
    }
  }

  const message: Message | PartialMessage = reaction.message
  if (!message.guild || !message.author || !message.attachments) return

  const member: GuildMember | undefined = message.guild.members.cache.get(user.id)

  if (isAdmin(member) || isDiscordSostav(member) || isStSostav(member) || isAdminsSostav(member)) {
    const messageMember = member?.guild.members.cache.get(message.author.id)

    if (!isAdmin(messageMember) && !isBot(messageMember)) {
      const deleteChannelId = config.CHANNELS_ID.DELETE_CHANNEL_ID
      const logChannel: GuildBasedChannel | undefined = message.guild.channels.cache.get(deleteChannelId)

      let imageStickerUrl = message.attachments.size > 0 ? message.attachments.first()?.url : ''
      if (
        !imageStickerUrl &&
        !reaction.partial &&
        reaction.message.content &&
        reaction.message.content.includes('<:')
      ) {
        imageStickerUrl = `https://cdn.discordapp.com/stickers/${reaction.emoji.id}.${
          reaction.emoji.animated ? 'gif' : 'png'
        }`
      }

      const embed: any = embedBuilderFoo({
        color: '#FF0000',
        title: 'Сообщение удалено',
      })

      embed.addFields(
        { name: 'Модератор', value: `<@${user.id}>`, inline: true },
        {
          name: 'В канале',
          value: `${message.channel.toString()}`,
          inline: true,
        },
        {
          name: 'Удалил сообщение пользователя',
          value: `<@${message.author.id}>`,
          inline: true,
        },
      )

      if (message.content !== '') {
        embed.addFields({
          name: `Содержание сообщения:`,
          value: message.content,
        })
      }

      if (imageStickerUrl) {
        embed.setImage(imageStickerUrl)
      }

      await message.delete()
      if (logChannel && logChannel.isTextBased()) {
        await logChannel.send({ embeds: [embed] })
      }
    }
  }
}
