// IMPORT MODULES

import config from '../../config/config.json' assert { type: 'json' }
import client from '../../client.js'
import embedBuilderFoo from '../../utils/embedBuilderFoo.js'
import { Channel, EmbedBuilder } from 'discord.js'

// CODE

export default async (reason: any, promise: any): Promise<void> => {
  try {
    console.error('[FATAL] Possibly Unhandled Rejection at: Promise ', promise, ' reason: ', reason.message)

    const embed: EmbedBuilder = embedBuilderFoo({
      title: 'Unhandled Promise Rejection',
      color: '#F00000',
    })

    embed.addFields([
      { name: 'Promise', value: `${promise}` },
      { name: 'Reason', value: `${reason.message}` },
    ])
    const logChannel: Channel | undefined = client.channels.cache.get(config.CHANNELS_ID.ERRORS_CHANNEL_ID)
    if (logChannel && logChannel.isTextBased()) {
      await logChannel.send({ embeds: [embed] })
    }
  } catch (error) {
    console.error(error)
  }
}
