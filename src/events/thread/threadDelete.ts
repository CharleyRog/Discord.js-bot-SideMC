// IMPORT MODULES

import embedBuilderFoo from '../../utils/embedBuilderFoo.js'
import { Channel, EmbedBuilder } from 'discord.js'
import client from '../../client.js'
import config from '../../config/config.json' assert { type: 'json' }

// CODE

export default async (thread: any): Promise<void> => {
  try {
    const embed: EmbedBuilder = embedBuilderFoo({
      title: 'Стикер создан',
      color: '#FF0000',
    })

    if (thread.id) {
      embed.addFields([{ name: 'Thread ID:', value: thread.id, inline: true }])
    }

    if (thread.name) {
      embed.addFields([{ name: 'Thread name:', value: thread.name, inline: true }])
    }

    if (thread.parent) {
      embed.addFields([{ name: 'Parent ID:', value: thread.parent.id, inline: true }])
    }

    if (thread.guild) {
      embed.addFields([{ name: 'Guild ID:', value: thread.guild.id, inline: true }])
    }

    const logChannel: Channel | undefined = client.channels.cache.get(config.CHANNELS_ID.THREADS_LOGS_CHANNEL_ID)
    if (logChannel && logChannel.isTextBased()) {
      await logChannel.send({ embeds: [embed] })
    }
  } catch (error) {
    console.error(error)
  }
}
