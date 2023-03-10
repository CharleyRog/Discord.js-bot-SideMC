// IMPORT MODULES

import { EmbedBuilder } from '@discordjs/builders'
import embedBuilderFoo from '../../utils/embedBuilderFoo.js'
import client from '../../client.js'
import isTextChannel from '../../utils/isTextChannel.js'
import config from '../../config/config.json' assert { type: 'json' }

// CODE

export default async (oldSticker: any, newSticker: any): Promise<void> => {
  console.log(`stickerUpdate: ${oldSticker} | ${newSticker}`)

  const embed: EmbedBuilder = embedBuilderFoo({
    title: 'Стикер изменен',
    color: '#FF0000',
  })

  embed.addFields([
    { name: 'ID:', value: `${newSticker.id}`, inline: true },
    { name: 'Пользователь:', value: `<@${newSticker.user.id}>`, inline: true },
  ])

  if (oldSticker.name !== newSticker.name) {
    embed.addFields([
      { name: 'Старое название:', value: `${oldSticker.name}`, inline: true },
      { name: 'Новое название:', value: `${newSticker.name}`, inline: true },
    ])
  } else {
    embed.addFields([{ name: 'Название:', value: `${newSticker.name}`, inline: true }])
  }

  const logChannel = client.channels.cache.get(config.CHANNELS_ID.STICKER_LOGS_CHANNEL_ID)
  if (isTextChannel(logChannel)) {
    await logChannel.send({ embeds: [embed] })
  }
}
