// IMPORT MODULES

import { EmbedBuilder } from '@discordjs/builders'
import embedBuilderFoo from '../../utils/embedBuilderFoo.js'
import client from '../../client.js'
import isTextChannel from '../../utils/isTextChannel.js'
import config from '../../config/config.json' assert { type: 'json' }
import typesOfAuditLogs from '../../static/typesOfAuditLogs.js'
import { TextChannel } from 'discord.js'

// CODE

export default async (role: any): Promise<void> => {
  try {
    const auditLog = await role.guild
      .fetchAuditLogs({ type: typesOfAuditLogs.ROLE_CREATE })
      .then((audit: { entries: { first: () => any } }) => audit.entries.first())

    const embed: EmbedBuilder = embedBuilderFoo({
      title: 'Роль создана',
      color: '#00FF00',
    })

    embed.addFields([
      { name: 'Название:', value: `${role.name}`, inline: true },
      { name: 'ID:', value: `${role.id}`, inline: true },
      { name: 'Пользователь:', value: `<@${auditLog.executor.id}>`, inline: true },
    ])

    const logChannel = client.channels.cache.get(config.CHANNELS_ID.ROLE_LOGS_CHANNEL_ID) as TextChannel
    if (isTextChannel(logChannel)) {
      await logChannel.send({ embeds: [embed] })
    }
  } catch (error) {
    console.log(error)
  }
}
