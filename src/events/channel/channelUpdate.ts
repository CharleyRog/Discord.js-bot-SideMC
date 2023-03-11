// IMPORT MODULES

import typesOfAuditLogs from '../../static/typesOfAuditLogs.js'
import { EmbedBuilder } from '@discordjs/builders'
import embedBuilderFoo from '../../utils/embedBuilderFoo.js'
import client from '../../client.js'
import isTextChannel from '../../utils/isTextChannel.js'
import config from '../../config/config.json' assert { type: 'json' }

// CODE

export default async (oldChannel: any, newChannel: any): Promise<void> => {
  const auditLog = await newChannel.guild
    .fetchAuditLogs({ type: typesOfAuditLogs.CHANNEL_UPDATE })
    .then((audit: { entries: { first: () => any } }) => audit.entries.first())

  const embed: EmbedBuilder = embedBuilderFoo({
    title: 'Канал обновлен',
    color: '#FFFF00',
  })

  if (newChannel.name !== oldChannel.name) {
    embed.addFields([
      { name: 'Старое название:', value: oldChannel.name, inline: true },
      { name: 'Новое название:', value: newChannel.name, inline: true },
    ])
  }

  embed.addFields([
    { name: 'Название:', value: `${newChannel.name}`, inline: true },
    { name: 'ID:', value: `<#${newChannel.id}>`, inline: true },
    { name: 'Пользователь:', value: `<@${auditLog.executor.id}>`, inline: true },
  ])

  const logChannel = client.channels.cache.get(config.CHANNELS_ID.CHANNELS_LOGS_CHANNEL_ID)
  if (isTextChannel(logChannel)) {
    await logChannel.send({ embeds: [embed] })
  }
}
