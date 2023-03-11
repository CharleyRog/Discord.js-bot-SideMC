// IMPORT MODULES

import typesOfAuditLogs from '../../static/typesOfAuditLogs.js'
import { EmbedBuilder } from '@discordjs/builders'
import embedBuilderFoo from '../../utils/embedBuilderFoo.js'
import client from '../../client.js'
import isTextChannel from '../../utils/isTextChannel.js'
import config from '../../config/config.json' assert { type: 'json' }

// CODE

export default async (channel: any): Promise<void> => {
  const auditLog = await channel.guild
    .fetchAuditLogs({ type: typesOfAuditLogs.CHANNEL_DELETE })
    .then((audit: { entries: { first: () => any } }) => audit.entries.first())

  const embed: EmbedBuilder = embedBuilderFoo({
    title: 'Канал удален',
    color: '#FF0000',
  })

  embed.addFields([
    { name: 'Название:', value: `${channel.name}`, inline: true },
    { name: 'ID:', value: `<#${channel.id}>`, inline: true },
    { name: 'Пользователь:', value: `<@${auditLog.executor.id}>`, inline: true },
  ])

  const logChannel = client.channels.cache.get(config.CHANNELS_ID.CHANNELS_LOGS_CHANNEL_ID)
  if (isTextChannel(logChannel)) {
    await logChannel.send({ embeds: [embed] })
  }
}
