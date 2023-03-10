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

  if (oldRole.name !== newRole.name) {
    embed.addFields([
      { name: 'Старое название:', value: `${oldRole.name}` },
      { name: 'Новое название:', value: `${newRole.name}` },
    ])
  } else {
    embed.addFields([{ name: 'Название:', value: `${newRole.name}` }])
  }

  const logChannel = client.channels.cache.get(config.CHANNELS_ID.ROLE_LOGS_CHANNEL_ID)
  if (isTextChannel(logChannel)) {
    await logChannel.send({ embeds: [embed] })
  }
}
