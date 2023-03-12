// IMPORT MODULES

import { EmbedBuilder } from '@discordjs/builders'
import embedBuilderFoo from '../../utils/embedBuilderFoo.js'
import client from '../../client.js'
import config from '../../config/config.json' assert { type: 'json' }
import { Channel } from 'discord.js'

// CODE

export default async (sticker: any): Promise<void> => {
  try {
    const embed: EmbedBuilder = embedBuilderFoo({
      title: 'Стикер создан',
      color: '#00FF00',
    })

    embed.addFields([
      { name: 'Имя:', value: `${sticker.name}`, inline: true },
      { name: 'ID:', value: `${sticker.id}`, inline: true },
      { name: 'Пользователь:', value: `<@${sticker.user.id}>`, inline: true },
    ])

    const logChannel: Channel | undefined = client.channels.cache.get(config.CHANNELS_ID.STICKER_LOGS_CHANNEL_ID)
    if (logChannel && logChannel.isTextBased()) {
      await logChannel.send({ embeds: [embed] })
    }
  } catch (error) {
    console.error(error)
  }
}
