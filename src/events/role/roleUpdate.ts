// IMPORT MODULES

import { EmbedBuilder } from '@discordjs/builders'
import embedBuilderFoo from '../../utils/embedBuilderFoo.js'
import client from '../../client.js'
import isTextChannel from '../../utils/isTextChannel.js'
import config from '../../config/config.json' assert { type: 'json' }

// CODE

export default async (oldRole: any, newRole: any): Promise<void> => {
  console.log(`roleUpdate: ${oldRole} | ${newRole}`)

  const embed: EmbedBuilder = embedBuilderFoo({
    title: 'Роль обновлена',
    color: '#FFFF00',
  })

  embed
    .addFields([
      { name: 'Старое название:', value: `${oldRole.name}`, inline: true },
      { name: 'Новое название:', value: `${newRole.name}`, inline: true },
    ])
    .addFields([
      { name: 'ID:', value: `${newRole.id}`, inline: true },
      { name: 'Пользователь:', value: `<@${newRole.user.id}>`, inline: true },
    ])

  const logChannel = client.channels.cache.get(config.CHANNELS_ID.ROLE_LOGS_CHANNEL_ID)
  if (isTextChannel(logChannel)) {
    await logChannel.send({ embeds: [embed] })
  }
}
