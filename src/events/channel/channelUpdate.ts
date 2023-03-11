// IMPORT MODULES

import typesOfAuditLogs from '../../static/typesOfAuditLogs.js'
import { EmbedBuilder } from '@discordjs/builders'
import embedBuilderFoo from '../../utils/embedBuilderFoo.js'
import client from '../../client.js'
import isTextChannel from '../../utils/isTextChannel.js'
import config from '../../config/config.json' assert { type: 'json' }
import { TextChannel } from 'discord.js'

// CODE

export default async (oldChannel: any, newChannel: any): Promise<void> => {
  try {
    const auditLog = await newChannel.guild
      .fetchAuditLogs({ type: typesOfAuditLogs.CHANNEL_UPDATE })
      .then((audit: { entries: { first: () => any } }) => audit.entries.first())

    const embed: EmbedBuilder = embedBuilderFoo({
      title: 'Канал обновлен',
      color: '#FFFF00',
    })

    embed.addFields([
      { name: 'Название:', value: `${oldChannel.name}`, inline: true },
      { name: 'ID:', value: `<#${newChannel.id}>`, inline: true },
      { name: 'Пользователь:', value: `<@${auditLog.executor.id}>`, inline: true },
    ])

    if (oldChannel.name !== newChannel.name) {
      embed.addFields([
        { name: 'oldChannel.name:', value: oldChannel.name, inline: true },
        { name: 'newChannel.name:', value: newChannel.name, inline: true },
      ])
    }

    if (oldChannel.type !== newChannel.type) {
      embed.addFields([
        { name: 'oldChannel.type:', value: oldChannel.type, inline: true },
        { name: 'newChannel.type:', value: newChannel.type, inline: true },
      ])
    }

    if (oldChannel.parentId !== newChannel.parentId) {
      embed.addFields([
        { name: 'oldChannel.parentId:', value: oldChannel.parentId, inline: true },
        { name: 'newChannel.parentId:', value: newChannel.parentId, inline: true },
      ])
    }

    if (oldChannel.rawPosition !== newChannel.rawPosition) {
      embed.addFields([
        { name: 'oldChannel.rawPosition:', value: oldChannel.rawPosition, inline: true },
        { name: 'newChannel.rawPosition:', value: newChannel.rawPosition, inline: true },
      ])
    }

    if (oldChannel?.nsfw !== newChannel?.nsfw) {
      embed.addFields([
        { name: 'oldChannel.nsfw:', value: oldChannel.nsfw, inline: true },
        { name: 'newChannel.nsfw:', value: newChannel.nsfw, inline: true },
      ])
    }

    if (oldChannel.topic !== newChannel.topic) {
      embed.addFields([
        { name: 'oldChannel.topic:', value: oldChannel.topic, inline: true },
        { name: 'newChannel.topic:', value: newChannel.topic, inline: true },
      ])
    }

    if (oldChannel.permissionOverwrites !== newChannel.permissionOverwrites) {
      embed.addFields([
        {
          name: 'Permission overwrites from:',
          value: JSON.stringify(oldChannel.permissionOverwrites),
          inline: true,
        },
        {
          name: 'Permission overwrites to:',
          value: JSON.stringify(newChannel.permissionOverwrites),
          inline: true,
        },
      ])
    }

    if (oldChannel.bitrate !== newChannel.bitrate) {
      embed.addFields([
        { name: 'oldChannel.bitrate:', value: oldChannel.bitrate, inline: true },
        { name: 'newChannel.bitrate:', value: newChannel.bitrate, inline: true },
      ])
    }

    if (oldChannel.userLimit !== newChannel.userLimit) {
      embed.addFields([
        { name: 'oldChannel.userLimit:', value: oldChannel.userLimit, inline: true },
        { name: 'newChannel.userLimit:', value: newChannel.userLimit, inline: true },
      ])
    }

    if (oldChannel.videoQualityMode !== newChannel.videoQualityMode) {
      embed.addFields([
        { name: 'oldChannel.videoQualityMode:', value: oldChannel.videoQualityMode, inline: true },
        { name: 'newChannel.videoQualityMode:', value: newChannel.videoQualityMode, inline: true },
      ])
    }

    const logChannel = client.channels.cache.get(config.CHANNELS_ID.CHANNELS_LOGS_CHANNEL_ID) as TextChannel
    if (isTextChannel(logChannel)) {
      await logChannel.send({ embeds: [embed] })
    }
  } catch (error) {
    console.error(error)
  }
}
