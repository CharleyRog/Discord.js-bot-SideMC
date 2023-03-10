// IMPORT MODULES

import { EmbedBuilder } from '@discordjs/builders'
import embedBuilderFoo from '../../utils/embedBuilderFoo.js'
import client from '../../client.js'
import isTextChannel from '../../utils/isTextChannel.js'
import config from '../../config/config.json' assert { type: 'json' }

// CODE

export default async (role: any): Promise<void> => {
  console.log(`roleDelete: ${role}`)

  const embed: EmbedBuilder = embedBuilderFoo({
    title: 'Роль удалена',
    color: '#FF0000',
  })

  embed.addFields([
    { name: 'Название:', value: `${role.name}`, inline: true },
    { name: 'ID:', value: `${role.id}`, inline: true },
    { name: 'Пользователь:', value: `<@${role.user.id}>`, inline: true },
  ])

  const logChannel = client.channels.cache.get(config.CHANNELS_ID.ROLE_LOGS_CHANNEL_ID)
  if (isTextChannel(logChannel)) {
    await logChannel.send({ embeds: [embed] })
  }
}
