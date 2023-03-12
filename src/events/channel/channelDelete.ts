// IMPORT MODULES

import typesOfAuditLogs from '../../static/typesOfAuditLogs.js'
import { EmbedBuilder } from '@discordjs/builders'
import embedBuilderFoo from '../../utils/embedBuilderFoo.js'
import client from '../../client.js'
import config from '../../config/config.json' assert { type: 'json' }
import { Channel } from 'discord.js'

// CODE

export default async (channel: any): Promise<void> => {
  try {
    const auditLog = await channel.guild
      .fetchAuditLogs({ type: typesOfAuditLogs.CHANNEL_DELETE })
      .then((audit: { entries: { first: () => any } }) => audit.entries.first())

    const embed: EmbedBuilder = embedBuilderFoo({
      title: 'Канал удален',
      color: '#FF0000',
    })

    embed
      .addFields([
        { name: 'Name:', value: `${channel.name}`, inline: true },
        { name: 'ID:', value: `<#${channel.id}>`, inline: true },
        { name: 'Пользователь:', value: `<@${auditLog.executor.id}>`, inline: true },
      ])
      .addFields([
        { name: 'Type:', value: channel.type, inline: true },
        { name: 'Position:', value: channel.position, inline: true },
        { name: 'Parent ID:', value: channel.parentId, inline: true },
      ])
      .addFields([
        { name: 'Guild ID:', value: channel.guildId, inline: true },
        { name: 'NSFW:', value: channel.nsfw, inline: true },
        { name: 'Topic:', value: channel.topic, inline: true },
      ])
      .addFields([
        { name: 'Created at:', value: channel.createdAt, inline: true },
        {
          name: 'Deleted:',
          value: channel.deleted,
          inline: true,
        },
        { name: 'Deletion date:', value: channel.deletedAt, inline: true },
      ])
      .addFields([
        {
          name: 'Permission overwrites:',
          value: JSON.stringify(channel.permissionOverwrites),
          inline: true,
        },
      ])

    const logChannel: Channel | undefined = client.channels.cache.get(config.CHANNELS_ID.CHANNELS_LOGS_CHANNEL_ID)
    if (logChannel && logChannel.isTextBased()) {
      await logChannel.send({ embeds: [embed] })
    }
  } catch (error) {
    console.error(error)
  }
}
