// IMPORT MODULES

import { Guild, TextChannel } from 'discord.js'
import { EmbedBuilder } from '@discordjs/builders'
import embedBuilderFoo from '../../utils/embedBuilderFoo.js'
import client from '../../client.js'
import isTextChannel from '../../utils/isTextChannel.js'
import config from '../../config/config.json' assert { type: 'json' }

// CODE

export default async (thread: any): Promise<void> => {
  try {
    const embed: EmbedBuilder = embedBuilderFoo({
      title: 'Стикер создан',
      color: '#00FF00',
    })

    embed
      .addFields([
        { name: 'Thread ID:', value: thread.id, inline: true },
        { name: 'Thread name:', value: thread.name, inline: true },
        { name: 'Thread type:', value: thread.type, inline: true },
      ])
      .addFields([
        { name: 'Thread owner:', value: thread.owner?.toString() ?? 'None', inline: true },
        { name: 'Thread parent:', value: thread.parent?.toString() ?? 'None', inline: true },
        { name: 'Thread guild:', value: (thread.guild as Guild)?.name ?? 'None', inline: true },
      ])
      .addFields([
        { name: 'Thread rate limit per user:', value: thread.rateLimitPerUser?.toString() ?? 'None', inline: true },
        { name: 'memberCount:', value: thread.memberCount.toString() ?? 'None', inline: true },
      ])
      .addFields([
        { name: 'Thread archived:', value: thread.archived ?? 'None', inline: true },
        { name: 'Thread locked:', value: thread.locked ?? 'None', inline: true },
        { name: 'Thread autoArchiveDuration:', value: thread.autoArchiveDuration.toString() ?? 'None', inline: true },
      ])

    const logChannel = client.channels.cache.get(config.CHANNELS_ID.THREADS_LOGS_CHANNEL_ID) as TextChannel
    if (isTextChannel(logChannel)) {
      await logChannel.send({ embeds: [embed] })
    }
  } catch (error) {
    console.error(error)
  }
}
